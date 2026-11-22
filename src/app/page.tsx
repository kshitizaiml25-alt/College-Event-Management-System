import Link from "next/link";
import { ArrowRight, CalendarDays, Users, Zap } from "lucide-react";
import EventCard from "@/components/EventCard";
import { events } from "@/data/events";

const stats = [
  { label: "Events Hosted", value: "120+" },
  { label: "Active Students", value: "5,000+" },
  { label: "Colleges", value: "30+" },
  { label: "Categories", value: "10+" },
];

const featureData = [
  { iconKey: "calendar", title: "Discover Events",       desc: "Browse campus events by category, date, or department — all in one place." },
  { iconKey: "users",    title: "Connect & Collaborate", desc: "Network with peers, join clubs, and find teams for hackathons and competitions." },
  { iconKey: "zap",      title: "Never Miss Out",        desc: "Get real-time updates and reminders so you're always in the loop." },
];

function FeatureIcon({ iconKey }: { iconKey: string }) {
  if (iconKey === "calendar") return <CalendarDays size={28} />;
  if (iconKey === "users")    return <Users size={28} />;
  if (iconKey === "zap")      return <Zap size={28} />;
  return null;
}

export default function HomePage() {
  const featured = events.slice(0, 3);

  return (
    <>
      {/* ── Hero ── */}
      <section
        className="section-padding"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% -10%, var(--hero-glow), transparent)",
          textAlign: "center",
        }}
      >
        <div className="container">
          <span
            style={{
              display: "inline-block",
              marginBottom: "20px",
              padding: "6px 18px",
              borderRadius: "999px",
              background: "var(--hero-tag-bg)",
              border: "1px solid var(--hero-tag-border)",
              fontSize: "13px",
              color: "var(--hero-tag-text)",
              fontWeight: 600,
            }}
          >
            🎓 Your Campus. Your Community.
          </span>

          <h1
            className="section-heading"
            style={{
              fontSize: "clamp(36px, 6vw, 66px)",
              marginBottom: "22px",
              color: "var(--text-primary)",
            }}
          >
            Discover &amp; Join <span className="gradient-text">Campus Events</span>
            <br />Like Never Before
          </h1>

          <p
            className="muted"
            style={{
              maxWidth: "580px",
              margin: "0 auto 36px",
              fontSize: "clamp(15px, 2vw, 18px)",
            }}
          >
            CampusHub is the all-in-one platform for college students to discover events,
            connect with peers, and make the most of campus life.
          </p>

          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/events" className="primary-btn">
              Explore Events <ArrowRight size={17} />
            </Link>
            <Link href="/signup" className="outline-btn">
              Create Account
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section
        style={{
          background: "var(--surface-alt)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          transition: "background 0.25s, border-color 0.25s",
        }}
      >
        <div
          className="container"
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))" }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              style={{
                padding: "32px 20px",
                textAlign: "center",
                borderRight: i < stats.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              <div
                style={{
                  fontSize: "clamp(26px, 4vw, 36px)",
                  fontWeight: 800,
                  background: "linear-gradient(90deg, #8b5cf6, #ec4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {s.value}
              </div>
              <div style={{ color: "var(--text-muted)", fontSize: "14px", marginTop: "4px" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Events ── */}
      <section className="section-padding">
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: "40px",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div>
              <p style={{ color: "var(--primary)", fontWeight: 600, marginBottom: "8px" }}>
                📅 Upcoming Events
              </p>
              <h2 className="section-heading" style={{ margin: 0 }}>
                Featured <span className="gradient-text">Events</span>
              </h2>
            </div>
            <Link
              href="/events"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                color: "var(--primary)",
                fontWeight: 600,
                fontSize: "15px",
              }}
            >
              View all events <ArrowRight size={16} />
            </Link>
          </div>

          <div className="event-grid">
            {featured.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Why CampusHub ── */}
      <section
        className="section-padding"
        style={{
          background: "var(--surface-alt)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          transition: "background 0.25s, border-color 0.25s",
        }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <p style={{ color: "var(--primary)", fontWeight: 600, marginBottom: "8px" }}>
            ✨ Why CampusHub?
          </p>
          <h2 className="section-heading" style={{ marginBottom: "50px" }}>
            Everything You Need to <span className="gradient-text">Stay Engaged</span>
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "28px" }}>
            {featureData.map((f, i) => (
              <div
                key={i}
                style={{
                  background: "var(--card-bg)",
                  border: "1px solid var(--border)",
                  borderRadius: "20px",
                  padding: "36px 28px",
                  boxShadow: "var(--card-shadow)",
                  textAlign: "left",
                  transition: "transform 0.25s, border-color 0.25s",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "56px",
                    height: "56px",
                    borderRadius: "14px",
                    background: "rgba(124, 58, 237, 0.12)",
                    color: "var(--primary)",
                    marginBottom: "20px",
                  }}
                >
                  <FeatureIcon iconKey={f.iconKey} />
                </div>
                <h3 style={{ fontSize: "19px", fontWeight: 700, marginBottom: "10px", color: "var(--text-primary)" }}>
                  {f.title}
                </h3>
                <p className="muted" style={{ fontSize: "14px" }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="section-padding">
        <div className="container">
          <div
            style={{
              borderRadius: "26px",
              background: "linear-gradient(135deg, #7c3aed 0%, #db2777 100%)",
              padding: "64px 36px",
              textAlign: "center",
              boxShadow: "0 20px 60px rgba(124, 58, 237, 0.35)",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(26px, 4vw, 44px)",
                fontWeight: 800,
                color: "white",
                marginBottom: "14px",
              }}
            >
              Ready to Dive Into Campus Life?
            </h2>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.88)",
                maxWidth: "520px",
                margin: "0 auto 32px",
                fontSize: "17px",
              }}
            >
              Join thousands of students discovering fests, workshops, hackathons, and sports events.
            </p>
            <Link
              href="/signup"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "white",
                color: "#7c3aed",
                padding: "14px 28px",
                borderRadius: "12px",
                fontWeight: 700,
                fontSize: "15px",
                transition: "transform 0.2s, box-shadow 0.2s",
                boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
              }}
            >
              Get Started for Free <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
