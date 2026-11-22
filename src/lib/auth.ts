// ─────────────────────────────────────────────────────────────
//  CampusHub Authentication & User Registry (Client-side / LocalStorage)
// ─────────────────────────────────────────────────────────────

export interface AuthUser {
  firstName: string;
  lastName: string;
  email: string;
  college?: string;
}

export interface RegisteredUser {
  firstName: string;
  lastName: string;
  email: string;
  college?: string;
  passwordHash: string;
  createdAt: string;
}

const ACTIVE_USER_KEY = "campushub_user";
const ACCOUNTS_KEY = "campushub_accounts";

/** Pre-seeded demo accounts so the system works out-of-the-box */
const DEFAULT_ACCOUNTS: RegisteredUser[] = [
  {
    firstName: "Alex",
    lastName: "Kumar",
    email: "student@college.edu",
    college: "Apex Institute of Technology",
    passwordHash: hashPassword("password123"),
    createdAt: "2026-01-15T09:00:00.000Z",
  },
  {
    firstName: "Priya",
    lastName: "Sharma",
    email: "organizer@college.edu",
    college: "National Tech Club",
    passwordHash: hashPassword("organizer123"),
    createdAt: "2026-02-01T10:30:00.000Z",
  },
];

/** Fast, consistent hashing with salt for client-side storage */
export function hashPassword(password: string): string {
  let hash = 0;
  const salted = `campushub_secure_salt_${password}_2026`;
  for (let i = 0; i < salted.length; i++) {
    const char = salted.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return `ch_${Math.abs(hash).toString(36)}`;
}

/** Retrieve all registered accounts from localStorage */
export function getAccounts(): RegisteredUser[] {
  if (typeof window === "undefined") return DEFAULT_ACCOUNTS;
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    if (!raw) {
      localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(DEFAULT_ACCOUNTS));
      return DEFAULT_ACCOUNTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_ACCOUNTS;
  } catch {
    return DEFAULT_ACCOUNTS;
  }
}

/** Register a new account. Rejects if email already exists. */
export function registerAccount(data: {
  firstName: string;
  lastName: string;
  email: string;
  college: string;
  password: string;
}): { success: boolean; error?: string; user?: AuthUser } {
  if (typeof window === "undefined") {
    return { success: false, error: "Cannot register on server" };
  }

  const emailClean = data.email.trim().toLowerCase();
  const accounts = getAccounts();

  // Check duplicate email
  const existing = accounts.find((acc) => acc.email.toLowerCase() === emailClean);
  if (existing) {
    return {
      success: false,
      error: "An account with this email already exists. Please sign in or use another email.",
    };
  }

  const newAccount: RegisteredUser = {
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    email: emailClean,
    college: data.college.trim(),
    passwordHash: hashPassword(data.password),
    createdAt: new Date().toISOString(),
  };

  const updatedAccounts = [...accounts, newAccount];
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(updatedAccounts));

  const authUser: AuthUser = {
    firstName: newAccount.firstName,
    lastName: newAccount.lastName,
    email: newAccount.email,
    college: newAccount.college,
  };

  saveUser(authUser);
  window.dispatchEvent(new Event("campushub:auth"));

  return { success: true, user: authUser };
}

/** Authenticate user with email and password. Strict match check. */
export function authenticateUser(
  email: string,
  password: string
): { success: boolean; error?: string; user?: AuthUser } {
  if (typeof window === "undefined") {
    return { success: false, error: "Cannot authenticate on server" };
  }

  const emailClean = email.trim().toLowerCase();
  const accounts = getAccounts();

  const account = accounts.find((acc) => acc.email.toLowerCase() === emailClean);

  if (!account) {
    return {
      success: false,
      error: "No account found with this email. Please check your email or sign up.",
    };
  }

  const hashedAttempt = hashPassword(password);
  if (account.passwordHash !== hashedAttempt) {
    return {
      success: false,
      error: "Incorrect password. Please verify your password and try again.",
    };
  }

  const authUser: AuthUser = {
    firstName: account.firstName,
    lastName: account.lastName,
    email: account.email,
    college: account.college,
  };

  saveUser(authUser);
  window.dispatchEvent(new Event("campushub:auth"));

  return { success: true, user: authUser };
}

export function saveUser(user: AuthUser): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(user));
  }
}

export function getUser(): AuthUser | null {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(ACTIVE_USER_KEY);
    return data ? (JSON.parse(data) as AuthUser) : null;
  }
  return null;
}

export function logoutUser(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(ACTIVE_USER_KEY);
    window.dispatchEvent(new Event("campushub:auth"));
  }
}

/** Returns "AK" style initials from a full name */
export function getInitials(first: string, last: string): string {
  const f = first ? first.charAt(0) : "";
  const l = last ? last.charAt(0) : "";
  return `${f}${l}`.toUpperCase() || "U";
}
