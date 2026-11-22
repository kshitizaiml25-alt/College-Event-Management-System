import Link from "next/link";
import { Home, CalendarDays } from "lucide-react";

export default function NotFound() {
  return (
    <section
      className="section-padding"
      style={{
        minHeight: "calc(100vh - 72px)",
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        background: "radial-gradient(ellipse 60% 40% at 50% 0%, var(--hero-glow), transparent)",
      }}
    >
      <div className="container" style={{ maxWidth: "520px" }}>
        <div
          style={{
            fontSize: "96px",
            fontWeight: 900,
            background: "linear-gradient(90deg, #8b5cf6, #ec4899)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1,
            marginBottom: "16px",
          }}
        >
          404
        </div>
        <h1 style={{ fontSize: "26px", fontWeight: 800, marginBottom: "12px", color: "var(--text-primary)" }}>
          Page Not Found
        </h1>
        <p className="muted" style={{ marginBottom: "36px", fontSize: "16px" }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" className="primary-btn">
            <Home size={16} /> Go Home
          </Link>
          <Link href="/events" className="outline-btn">
            <CalendarDays size={16} /> Browse Events
          </Link>
        </div>
      </div>
    </section>
  );
}
