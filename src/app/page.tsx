
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

// Feature data with icon keys — icons instantiated inside the component
const featureData = [
  { iconKey: "calendar", title: "Discover Events",        desc: "Browse campus events by category, date, or department — all in one place." },
  { iconKey: "users",    title: "Connect & Collaborate",  desc: "Network with peers, join clubs, and find teams for hackathons and competitions." },
  { iconKey: "zap",      title: "Never Miss Out",         desc: "Get real-time updates and reminders so you're always in the loop." },
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
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% -10%, #ede9fe, transparent)", textAlign: "center" }}
      >
        <div className="container">
          <span style={{
            display: "inline-block", marginBottom: "20px",
            padding: "6px 18px", borderRadius: "999px",
            background: "#ede9fe", border: "1px solid #c4b5fd",
            fontSize: "13px", color: "#6d28d9", fontWeight: 600,
          }}>
            🎓 Your Campus. Your Community.
          </span>

          <h1 className="section-heading" style={{ fontSize: "clamp(36px, 6vw, 66px)", marginBottom: "22px", color: "#111827" }}>
            Discover &amp; Join <span className="gradient-text">Campus Events</span>
            <br />Like Never Before
          </h1>

          <p className="muted" style={{ maxWidth: "580px", margin: "0 auto 36px", fontSize: "clamp(15px, 2vw, 18px)" }}>
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
      <section style={{ background: "#f3f4f6", borderTop: "1px solid #e5e7eb", borderBottom: "1px solid #e5e7eb" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))" }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              padding: "32px 20px", textAlign: "center",
              borderRight: i < stats.length - 1 ? "1px solid #e5e7eb" : "none",
            }}>
              <div style={{
                fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 800,
                background: "linear-gradient(90deg,#7c3aed,#db2777)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                {s.value}
              </div>
              <div style={{ color: "#6b7280", fontSize: "14px", marginTop: "4px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Events ── */}
      <section className="section-padding">
        <div className="container">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "40px", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <p style={{ color: "#7c3aed", fontWeight: 600, marginBottom: "8px" }}>📅 Upcoming Events</p>
              <h2 className="section-heading" style={{ margin: 0 }}>
                Featured <span className="gradient-text">Events</span>
              </h2>
            </div>
            <Link href="/events" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#7c3aed", fontWeight: 500, fontSize: "15px" }}>
              View all events <ArrowRight size={16} />
            </Link>
          </div>
          <div className="event-grid">
            {featured.map((event) => <EventCard key={event.id} event={event} />)}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="section-padding" style={{ background: "#f3f4f6" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <h2 className="section-heading">
              Why <span className="gradient-text">CampusHub?</span>
            </h2>
            <p className="muted" style={{ maxWidth: "500px", margin: "0 auto" }}>
              Everything you need to stay connected with campus life — in one beautiful platform.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
            {featureData.map((f, i) => (
              <div key={i} className="event-card" style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "32px 28px" }}>
                <div style={{ display: "inline-flex", padding: "14px", borderRadius: "12px", background: "#ede9fe", color: "#7c3aed", marginBottom: "20px" }}>
                  <FeatureIcon iconKey={f.iconKey} />
                </div>
                <h3 style={{ fontSize: "19px", fontWeight: 700, marginBottom: "10px", color: "#111827" }}>{f.title}</h3>
                <p className="muted" style={{ fontSize: "15px" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-padding">
        <div className="container">
          <div style={{
            background: "linear-gradient(135deg, #ede9fe, #fce7f3)",
            border: "1px solid #c4b5fd",
            borderRadius: "24px", padding: "64px 40px", textAlign: "center",
          }}>
            <h2 className="section-heading">
              Ready to <span className="gradient-text">Get Started?</span>
            </h2>
            <p className="muted" style={{ maxWidth: "480px", margin: "0 auto 32px" }}>
              Join thousands of students already using CampusHub to discover and participate in amazing campus events.
            </p>
            <Link href="/signup" className="primary-btn">
              Join CampusHub Free <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
