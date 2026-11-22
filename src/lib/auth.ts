// ─────────────────────────────────────────────────────────────
//  Simple localStorage-based auth (replace with real auth later)
// ─────────────────────────────────────────────────────────────

export interface AuthUser {
  firstName: string;
  lastName: string;
  email: string;
}

const KEY = "campushub_user";

export function saveUser(user: AuthUser): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(KEY, JSON.stringify(user));
  }
}

export function getUser(): AuthUser | null {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(KEY);
    return data ? (JSON.parse(data) as AuthUser) : null;
  }
  return null;
}

export function logoutUser(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(KEY);
  }
}

/** Returns "AK" style initials from a full name */
export function getInitials(first: string, last: string): string {
  return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
}
