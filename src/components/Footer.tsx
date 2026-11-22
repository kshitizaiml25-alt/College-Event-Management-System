
import Link from "next/link";
import { CalendarDays, Instagram, Linkedin, Github, Mail } from "lucide-react";

const quickLinks = [
  { label: "Home",        href: "/" },
  { label: "Events",      href: "/events" },
  { label: "About Us",    href: "/about" },
  { label: "Contact Us",  href: "/contact" },
  { label: "FAQ",         href: "/faq" },
];

const legalLinks = [
  { label: "Privacy Policy",    href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid #e5e7eb", background: "#f3f4f6" }}>
      <div className="container" style={{ display: "grid", gap: "40px", padding: "56px 0 48px", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>

        {/* Brand */}
        <div style={{ gridColumn: "span 1" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "19px", fontWeight: 800, color: "#111827", marginBottom: "14px" }}>
            <CalendarDays style={{ color: "#7c3aed" }} size={22} />
            CampusHub
          </div>
          <p className="muted" style={{ maxWidth: "260px", fontSize: "14px", marginBottom: "16px" }}>
            Your campus, your community, your events. Discover experiences that bring students together.
          </p>
          <a href="mailto:hello@campushub.in" className="footer-link" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px" }}>
            <Mail size={13} /> hello@campushub.in
          </a>
        </div>

        {/* Quick Links */}
        <div>
          <h3 style={{ marginBottom: "16px", fontWeight: 700, fontSize: "14px", color: "#111827", textTransform: "uppercase", letterSpacing: "0.05em" }}>Quick Links</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {quickLinks.map(({ label, href }) => (
              <Link key={href} href={href} className="footer-link">{label}</Link>
            ))}
          </div>
        </div>

        {/* Legal */}
        <div>
          <h3 style={{ marginBottom: "16px", fontWeight: 700, fontSize: "14px", color: "#111827", textTransform: "uppercase", letterSpacing: "0.05em" }}>Legal</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {legalLinks.map(({ label, href }) => (
              <Link key={href} href={href} className="footer-link">{label}</Link>
            ))}
          </div>
        </div>

        {/* Social */}
        <div>
          <h3 style={{ marginBottom: "16px", fontWeight: 700, fontSize: "14px", color: "#111827", textTransform: "uppercase", letterSpacing: "0.05em" }}>Connect</h3>
          <div style={{ display: "flex", gap: "14px", marginBottom: "14px" }}>
            <Instagram size={20} className="footer-icon" />
            <Linkedin  size={20} className="footer-icon" />
            <Github    size={20} className="footer-icon" />
          </div>
          <p className="muted" style={{ fontSize: "13px" }}>Built for the campus community.</p>
        </div>

      </div>

      <div style={{ borderTop: "1px solid #e5e7eb", padding: "18px 0", display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
        <span style={{ fontSize: "13px", color: "#9ca3af" }}>
          © {new Date().getFullYear()} CampusHub. All rights reserved.
        </span>
        <span style={{ color: "#d1d5db" }}>·</span>
        <Link href="/privacy" className="footer-link" style={{ fontSize: "13px" }}>Privacy</Link>
        <span style={{ color: "#d1d5db" }}>·</span>
        <Link href="/terms"   className="footer-link" style={{ fontSize: "13px" }}>Terms</Link>
      </div>
    </footer>
  );
}
