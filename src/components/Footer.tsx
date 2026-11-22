
import Link from "next/link";
import { CalendarDays, Instagram, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid #e5e7eb", background: "#f3f4f6" }}>
      <div
        className="container"
        style={{
          display: "grid",
          gap: "40px",
          padding: "56px 0 48px",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        }}
      >
        {/* Brand */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "20px", fontWeight: 800, color: "#111827" }}>
            <CalendarDays style={{ color: "#7c3aed" }} />
            CampusHub
          </div>
          <p className="muted" style={{ marginTop: "14px", maxWidth: "280px", fontSize: "14px" }}>
            Your campus, your community, your events.
            Discover experiences that bring students together.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h3 style={{ marginBottom: "16px", fontWeight: 700, fontSize: "15px", color: "#111827" }}>
            Quick Links
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <Link href="/"        className="footer-link">Home</Link>
            <Link href="/events"  className="footer-link">Explore Events</Link>
            <Link href="/about"   className="footer-link">About Us</Link>
            <Link href="/contact" className="footer-link">Contact Us</Link>
          </div>
        </div>

        {/* Social */}
        <div>
          <h3 style={{ marginBottom: "16px", fontWeight: 700, fontSize: "15px", color: "#111827" }}>
            Connect With Us
          </h3>
          <div style={{ display: "flex", gap: "16px" }}>
            <Instagram size={20} className="footer-icon" />
            <Linkedin  size={20} className="footer-icon" />
            <Github    size={20} className="footer-icon" />
          </div>
          <p className="muted" style={{ marginTop: "14px", fontSize: "14px" }}>
            Built for the campus community.
          </p>
        </div>
      </div>

      <div style={{ borderTop: "1px solid #e5e7eb", padding: "20px 0", textAlign: "center", fontSize: "13px", color: "#9ca3af" }}>
        © {new Date().getFullYear()} CampusHub. All rights reserved.
      </div>
    </footer>
  );
}
