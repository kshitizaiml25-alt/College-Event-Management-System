"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CalendarDays, Ticket, LogOut, ArrowRight, Clock, Building, User, Sparkles, ExternalLink } from "lucide-react";
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
    if (!u) {
      router.push("/login");
      return;
    }
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
      <section
        className="section-padding"
        style={{
          minHeight: "calc(100vh - 72px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--background)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "3px solid var(--border)",
              borderTopColor: "var(--primary)",
              borderRadius: "50%",
              animation: "spin 0.7s linear infinite",
              margin: "0 auto 16px",
            }}
          />
          <p className="muted">Loading your dashboard…</p>
        </div>
      </section>
    );
  }

  if (!user) return null;

  const upcoming = events.filter((e) => !registrations.find((r) => r.eventId === e.id)).slice(0, 3);

  return (
    <section className="section-padding" style={{ background: "var(--background)", minHeight: "calc(100vh - 72px)" }}>
      <div className="container">
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "40px",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <p style={{ color: "var(--primary)", fontWeight: 600, marginBottom: "6px" }}>Student Dashboard</p>
            <h1
              style={{
                fontSize: "clamp(24px, 4vw, 36px)",
                fontWeight: 800,
                color: "var(--text-primary)",
                marginBottom: "4px",
              }}
            >
              Welcome, {user.firstName} {user.lastName}!
            </h1>
            <p className="muted" style={{ fontSize: "14px", display: "flex", alignItems: "center", gap: "10px" }}>
              <span>{user.email}</span>
              {user.college && (
                <>
                  <span>•</span>
                  <span>{user.college}</span>
                </>
              )}
            </p>
          </div>
          <button
            onClick={handleLogout}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 18px",
              borderRadius: "10px",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              background: "rgba(239, 68, 68, 0.1)",
              color: "#ef4444",
              fontWeight: 600,
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            <LogOut size={15} /> Log Out
          </button>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            marginBottom: "44px",
          }}
        >
          {[
            { label: "My Registrations", value: registrations.length, icon: <Ticket size={22} color="var(--primary)" /> },
            { label: "Available Events", value: events.length, icon: <CalendarDays size={22} color="#ec4899" /> },
          ].map((st, i) => (
            <div
              key={i}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "16px",
                padding: "24px",
                display: "flex",
                alignItems: "center",
                gap: "18px",
                boxShadow: "var(--card-shadow)",
              }}
            >
              <div
                style={{
                  padding: "14px",
                  borderRadius: "12px",
                  background: "var(--surface-alt)",
                }}
              >
                {st.icon}
              </div>
              <div>
                <div style={{ fontSize: "28px", fontWeight: 800, color: "var(--text-primary)" }}>{st.value}</div>
                <div style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "2px" }}>{st.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* My Registrations */}
        <div style={{ marginBottom: "52px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "18px", color: "var(--text-primary)" }}>
            🎟 My Registered Events
          </h2>

          {registrations.length === 0 ? (
            <div
              style={{
                background: "var(--surface)",
                border: "1px dashed var(--border)",
                borderRadius: "18px",
                padding: "50px 24px",
                textAlign: "center",
              }}
            >
              <Ticket size={36} style={{ color: "var(--text-muted)", margin: "0 auto 12px" }} />
              <p style={{ fontWeight: 600, color: "var(--text-primary)", marginBottom: "6px" }}>
                No events registered yet
              </p>
              <p className="muted" style={{ fontSize: "14px", marginBottom: "20px" }}>
                Browse our upcoming campus events and join the action!
              </p>
              <Link href="/events" className="primary-btn">
                Browse Events <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {registrations.map((reg) => (
                <div
                  key={reg.id}
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "16px",
                    padding: "20px 24px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "14px",
                    boxShadow: "var(--card-shadow)",
                  }}
                >
                  <div>
                    <span
                      style={{
                        display: "inline-block",
                        fontSize: "11px",
                        fontWeight: 700,
                        padding: "2px 8px",
                        borderRadius: "999px",
                        background: "rgba(124, 58, 237, 0.15)",
                        color: "var(--primary)",
                        marginBottom: "6px",
                      }}
                    >
                      {reg.eventCategory}
                    </span>
                    <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>
                      {reg.eventTitle}
                    </h3>
                    <div style={{ display: "flex", gap: "16px", fontSize: "13px", color: "var(--text-muted)", flexWrap: "wrap" }}>
                      <span>📅 {reg.eventDate}</span>
                      <span>📍 {reg.eventVenue}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span
                      style={{
                        display: "inline-block",
                        fontFamily: "monospace",
                        fontSize: "12px",
                        padding: "4px 10px",
                        borderRadius: "6px",
                        background: "var(--surface-alt)",
                        color: "var(--text-secondary)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      ID: {reg.confirmationId}
                    </span>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "4px" }}>
                      Registered on {new Date(reg.registeredAt).toLocaleDateString()}
                    </div>
                    {events.find((e) => e.id === reg.eventId)?.formUrl && (
                      <a
                        href={events.find((e) => e.id === reg.eventId)?.formUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          fontSize: "12px",
                          color: "var(--primary)",
                          fontWeight: 600,
                          marginTop: "6px",
                        }}
                      >
                        Google Form <ExternalLink size={11} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Suggested events */}
        {upcoming.length > 0 && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: 700, color: "var(--text-primary)" }}>
                ✨ Events You Might Like
              </h2>
              <Link
                href="/events"
                style={{ fontSize: "14px", color: "var(--primary)", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "4px" }}
              >
                See all <ArrowRight size={14} />
              </Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
              {upcoming.map((ev) => (
                <div
                  key={ev.id}
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "16px",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxShadow: "var(--card-shadow)",
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        padding: "2px 8px",
                        borderRadius: "999px",
                        background: "rgba(124, 58, 237, 0.15)",
                        color: "var(--primary)",
                        display: "inline-block",
                        marginBottom: "8px",
                      }}
                    >
                      {ev.category}
                    </span>
                    <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>
                      {ev.title}
                    </h3>
                    <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "12px" }}>
                      {ev.date} • {ev.venue}
                    </p>
                  </div>
                  <Link
                    href={`/events/${ev.id}`}
                    className="outline-btn"
                    style={{ fontSize: "12px", padding: "8px 14px", textAlign: "center" }}
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
