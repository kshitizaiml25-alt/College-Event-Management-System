
import { Target, Eye, Heart, Users } from "lucide-react";

const team = [
  { name: "Aryan Mehta",  role: "Founder & CEO",        emoji: "👨‍💻" },
  { name: "Priya Sharma", role: "Head of Design",        emoji: "🎨" },
  { name: "Rahul Verma",  role: "Lead Developer",        emoji: "⚙️" },
  { name: "Sneha Nair",   role: "Community Manager",     emoji: "🤝" },
];

// Icon keys — rendered inside component, not at module level
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
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, #ede9fe, transparent)", textAlign: "center" }}
      >
        <div className="container" style={{ maxWidth: "700px" }}>
          <p style={{ color: "#7c3aed", fontWeight: 600, marginBottom: "10px" }}>About Us</p>
          <h1 className="section-heading">
            Built for <span className="gradient-text">Students</span>,<br />by Students
          </h1>
          <p className="muted" style={{ fontSize: "17px" }}>
            CampusHub was born from a simple idea: college life is rich with experiences —
            hackathons, fests, workshops, sports — but students often miss them. We set out to change that.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding" style={{ background: "#f3f4f6" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "22px" }}>
            {valueData.map((v, i) => (
              <div key={i} style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "30px 26px", boxShadow: "0 1px 3px #0000000a" }}>
                <div style={{ display: "inline-flex", padding: "12px", borderRadius: "10px", background: "#ede9fe", color: "#7c3aed", marginBottom: "16px" }}>
                  <ValueIcon iconKey={v.iconKey} />
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "10px", color: "#111827" }}>{v.title}</h3>
                <p className="muted" style={{ fontSize: "14px" }}>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 className="section-heading">Meet the <span className="gradient-text">Team</span></h2>
            <p className="muted">The passionate people behind CampusHub.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "24px" }}>
            {team.map((member, i) => (
              <div key={i} className="event-card" style={{ padding: "36px 24px", textAlign: "center" }}>
                <div style={{ fontSize: "52px", marginBottom: "16px" }}>{member.emoji}</div>
                <h3 style={{ fontSize: "17px", fontWeight: 700, marginBottom: "6px", color: "#111827" }}>{member.name}</h3>
                <p style={{ color: "#7c3aed", fontSize: "13px", fontWeight: 500 }}>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
