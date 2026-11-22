
// ─────────────────────────────────────────────────────────────
//  Registration helpers — localStorage persistence
//  Replace with real API calls when backend is ready
// ─────────────────────────────────────────────────────────────

export interface Registration {
  id: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventVenue: string;
  eventCategory: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  year: string;
  registeredAt: string;
  confirmationId: string;
}

const KEY = "campushub_registrations";

export function getRegistrations(): Registration[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(KEY);
    return data ? (JSON.parse(data) as Registration[]) : [];
  } catch {
    return [];
  }
}

export function addRegistration(
  reg: Omit<Registration, "id" | "registeredAt" | "confirmationId">
): Registration {
  const all = getRegistrations();
  const newReg: Registration = {
    ...reg,
    id: Date.now().toString(),
    registeredAt: new Date().toISOString(),
    confirmationId: `CH-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Date.now().toString(36).toUpperCase().slice(-4)}`,
  };
  all.push(newReg);
  localStorage.setItem(KEY, JSON.stringify(all));
  return newReg;
}

/** Check if a given email has already registered for an event */
export function isAlreadyRegistered(eventId: string, email: string): boolean {
  return getRegistrations().some(
    (r) => r.eventId === eventId && r.email.toLowerCase() === email.toLowerCase()
  );
}

export function clearRegistrations(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(KEY);
  }
}
