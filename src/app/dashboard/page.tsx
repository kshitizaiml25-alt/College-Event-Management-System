
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CalendarDays, Ticket, LogOut, ArrowRight, Clock } from "lucide-react";
import { getUser, logoutUser, type AuthUser } from "@/lib/auth";
import { getRegistrations, type Registration } from "@/lib/registrations";
import { events } from "@/data/events";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const u = getUser();
    if (!u) { router.push("/login"); return; }
    setUser(u);
    setRegistrations(getRegistrations());
    setLoading(false);
  }, [router]);

  function handleLogout() {
    logoutUser();
    router.push("/");
  }

  if (loading) {
    return (
      <section className="section-padding" style={{ minHeight: "calc(100vh - 72px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "40px", height: "40px", border: "3px solid #e5e7eb", borderTopColor: "#7c3aed", borderRadius: "50%", animation: "spin 0.7s linear infinite", margin: "0 auto 16px" }} />
          <p className="muted">Loading your dashboard…</p>
        </div>
      </section>
    );
  }

  if (!user) return null;

  const upcoming = events.filter((e) => !registrations.find((r) => r.eventId === e.id)).slice(0, 3);

  return (
    <section className="section-padding" style={{ background: "#f9fafb", minHeight: "calc(100vh - 72px)" }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "40px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <p style={{ color: "#7c3aed", fontWeight: 600, marginBottom: "6px" }}>Welcome back</p>
            <h1 style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 800, color: "#111827", marginBottom: "4px" }}>
              {user.firstName} {user.lastName}
            </h1>
            <p className="muted" style={{ fontSize: "14px" }}>{user.email}</p>
          </div>
          <button onClick={handleLogout} style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "10px 18px", borderRadius: "10px", border: "1px solid #fecaca", background: "#fef2f2", color: "#ef4444", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}>
            <LogOut size={15} /> Log Out
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "16px", marginBottom: "40px" }}>
          {[
            { label: "My Registrations", value: registrations.length, icon: <Ticket size={20} style={{ color: "#7c3aed" }} />, bg: "#ede9fe" },
            { label: "Upcoming Events",  value: events.length,         icon: <CalendarDays size={20} style={{ color: "#16a34a" }} />, bg: "#dcfce7" },
            { label: "Events This Month",value: 4,                     icon: <Clock size={20} style={{ color: "#d97706" }} />,        bg: "#fef9c3" },
          ].map((stat, i) => (
            <div key={i} style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "14px", padding: "22px", boxShadow: "0 1px 3px #0000000a" }}>
              <div style={{ display: "inline-flex", padding: "10px", borderRadius: "10px", background: stat.bg, marginBottom: "12px" }}>
                {stat.icon}
              </div>
              <div style={{ fontSize: "28px", fontWeight: 800, color: "#111827", marginBottom: "4px" }}>{stat.value}</div>
              <div style={{ fontSize: "13px", color: "#6b7280" }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "28px", alignItems: "start" }}>
          {/* My Registrations */}
          <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "28px", boxShadow: "0 1px 3px #0000000a" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#111827" }}>My Registrations</h2>
              <span style={{ fontSize: "12px", fontWeight: 600, background: "#ede9fe", color: "#7c3aed", padding: "4px 10px", borderRadius: "999px" }}>
                {registrations.length} total
              </span>
            </div>

            {registrations.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <div style={{ fontSize: "40px", marginBottom: "12px" }}>🎟️</div>
                <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "16px" }}>No registrations yet.</p>
                <Link href="/events" className="primary-btn" style={{ fontSize: "13px", padding: "10px 18px" }}>
                  Browse Events <ArrowRight size={14} />
                </Link>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {registrations.map((reg) => (
                  <div key={reg.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "14px", background: "#f9fafb", borderRadius: "10px", border: "1px solid #f3f4f6" }}>
                    <div>
                      <p style={{ fontSize: "14px", fontWeight: 700, color: "#111827", marginBottom: "3px" }}>{reg.eventTitle}</p>
                      <p style={{ fontSize: "12px", color: "#6b7280", marginBottom: "3px" }}>📅 {reg.eventDate}</p>
                      <p style={{ fontSize: "11px", color: "#9ca3af" }}>ID: {reg.confirmationId}</p>
                    </div>
                    <span style={{ fontSize: "11px", fontWeight: 600, background: "#dcfce7", color: "#16a34a", padding: "3px 8px", borderRadius: "999px", flexShrink: 0 }}>
                      Confirmed
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Suggested Events */}
          <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "28px", boxShadow: "0 1px 3px #0000000a" }}>
            <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#111827", marginBottom: "20px" }}>Explore More</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {upcoming.map((event) => (
                <Link key={event.id} href={`/events/${event.id}`} style={{ display: "flex", gap: "12px", alignItems: "center", padding: "12px", borderRadius: "10px", border: "1px solid #f3f4f6", transition: "border-color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#c4b5fd")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#f3f4f6")}
                >
                  <img src={event.image} alt={event.title} style={{ width: "52px", height: "42px", objectFit: "cover", borderRadius: "8px", flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: "13px", fontWeight: 600, color: "#111827", marginBottom: "2px" }}>{event.title}</p>
                    <p style={{ fontSize: "11px", color: "#9ca3af" }}>{event.date}</p>
                  </div>
                </Link>
              ))}
            </div>
            <Link href="/events" style={{ display: "inline-flex", alignItems: "center", gap: "5px", marginTop: "16px", fontSize: "13px", color: "#7c3aed", fontWeight: 600 }}>
              View all events <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
