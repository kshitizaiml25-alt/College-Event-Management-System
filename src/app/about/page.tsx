import { Target, Eye, Heart, Users } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about CampusHub's mission to connect college students with events and opportunities.",
};

const valueData = [
  { iconKey: "target", title: "Mission", text: "Empower every student to discover opportunities and make lasting memories through campus events." },
  { iconKey: "eye",    title: "Vision",  text: "A fully connected campus ecosystem where no student misses out on what matters to them." },
  { iconKey: "heart",  title: "Values",  text: "Community, Inclusivity, Innovation — built for students, by students." },
  { iconKey: "users",  title: "Impact",  text: "Over 5,000 students across 30 colleges stay connected through CampusHub every month." },
];

function ValueIcon({ iconKey }: { iconKey: string }) {
  if (iconKey === "target") return <Target size={26} />;
  if (iconKey === "eye")    return <Eye size={26} />;
  if (iconKey === "heart")  return <Heart size={26} />;
  if (iconKey === "users")  return <Users size={26} />;
  return null;
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="section-padding"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 0%, var(--hero-glow), transparent)",
          textAlign: "center",
        }}
      >
        <div className="container" style={{ maxWidth: "720px" }}>
          <p style={{ color: "var(--primary)", fontWeight: 600, marginBottom: "10px" }}>About Us</p>
          <h1 className="section-heading">
            Built for <span className="gradient-text">Students</span>,<br />by Students
          </h1>
          <p className="muted" style={{ fontSize: "17px", lineHeight: 1.7 }}>
            CampusHub was born from a simple idea: college life is rich with experiences —
            hackathons, cultural fests, hands-on workshops, sports tournaments — but students often miss them. We set out to change that with a centralized, verified campus event platform.
          </p>
        </div>
      </section>

      {/* Values */}
      <section
        className="section-padding"
        style={{
          background: "var(--surface-alt)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          transition: "background 0.25s, border-color 0.25s",
        }}
      >
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "22px" }}>
            {valueData.map((v, i) => (
              <div
                key={i}
                style={{
                  background: "var(--card-bg)",
                  border: "1px solid var(--border)",
                  borderRadius: "18px",
                  padding: "32px 26px",
                  boxShadow: "var(--card-shadow)",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    padding: "12px",
                    borderRadius: "12px",
                    background: "rgba(124, 58, 237, 0.12)",
                    color: "var(--primary)",
                    marginBottom: "16px",
                  }}
                >
                  <ValueIcon iconKey={v.iconKey} />
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "10px", color: "var(--text-primary)" }}>
                  {v.title}
                </h3>
                <p className="muted" style={{ fontSize: "14px" }}>
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
