import { events } from "@/data/events";
import { Calendar, MapPin, Tag, ArrowLeft, Building2, Clock, ExternalLink } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import RegisterButton from "@/components/RegisterButton";
import type { Metadata } from "next";

export function generateStaticParams() {
  return events.map((e) => ({ id: e.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const event = events.find((e) => e.id === id);
  if (!event) return { title: "Event Not Found" };
  return {
    title: event.title,
    description: event.description,
    openGraph: { title: event.title, description: event.description, images: [event.image] },
  };
}

const categoryStyles: Record<string, { bg: string; color: string; border: string }> = {
  Technical: { bg: "rgba(124, 58, 237, 0.15)", color: "#8b5cf6", border: "rgba(124, 58, 237, 0.3)" },
  Cultural:  { bg: "rgba(219, 39, 119, 0.15)", color: "#ec4899", border: "rgba(219, 39, 119, 0.3)" },
  Workshop:  { bg: "rgba(217, 119, 6, 0.15)",  color: "#f59e0b", border: "rgba(217, 119, 6, 0.3)" },
  Sports:    { bg: "rgba(22, 163, 74, 0.15)",  color: "#22c55e", border: "rgba(22, 163, 74, 0.3)" },
};

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = events.find((e) => e.id === id);
  if (!event) notFound();

  const badge = categoryStyles[event.category] ?? {
    bg: "rgba(124, 58, 237, 0.15)",
    color: "#8b5cf6",
    border: "rgba(124, 58, 237, 0.3)",
  };
  const seatsLeft = event.seats - event.registered;
  const pct = Math.round((event.registered / event.seats) * 100);

  return (
    <section className="section-padding" style={{ minHeight: "calc(100vh - 72px)" }}>
      <div className="container" style={{ maxWidth: "880px" }}>
        <Link
          href="/events"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            color: "var(--text-muted)",
            fontSize: "14px",
            marginBottom: "28px",
            transition: "color 0.2s",
          }}
        >
          <ArrowLeft size={16} /> Back to Events
        </Link>

        <img
          src={event.image}
          alt={event.title}
          style={{
            width: "100%",
            height: "380px",
            objectFit: "cover",
            borderRadius: "20px",
            marginBottom: "32px",
            display: "block",
            boxShadow: "var(--card-shadow)",
          }}
        />

        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "32px", alignItems: "start" }}>
          <div>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                padding: "5px 14px",
                borderRadius: "999px",
                fontSize: "12px",
                fontWeight: 600,
                marginBottom: "16px",
                background: badge.bg,
                color: badge.color,
                border: `1px solid ${badge.border}`,
              }}
            >
              <Tag size={11} /> {event.category}
            </span>

            <h1
              style={{
                fontSize: "clamp(24px, 4vw, 38px)",
                fontWeight: 800,
                marginBottom: "14px",
                lineHeight: 1.2,
                color: "var(--text-primary)",
              }}
            >
              {event.title}
            </h1>

            {/* Event meta */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "9px", fontSize: "14px", color: "var(--text-secondary)" }}>
                <Calendar size={16} style={{ color: "var(--primary)", flexShrink: 0 }} />
                <strong>Date &amp; Time:</strong> {event.date}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "9px", fontSize: "14px", color: "var(--text-secondary)" }}>
                <MapPin size={16} style={{ color: "var(--primary)", flexShrink: 0 }} />
                <strong>Venue:</strong> {event.venue}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "9px", fontSize: "14px", color: "var(--text-secondary)" }}>
                <Building2 size={16} style={{ color: "var(--primary)", flexShrink: 0 }} />
                <strong>Organizer:</strong> {event.organizer}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "9px", fontSize: "14px", color: "var(--text-secondary)" }}>
                <Clock size={16} style={{ color: "var(--primary)", flexShrink: 0 }} />
                <strong>Registration Deadline:</strong> {event.deadline}
              </span>
            </div>

            {/* Description */}
            <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px", color: "var(--text-primary)" }}>
              About This Event
            </h2>
            <p className="muted" style={{ fontSize: "15px", lineHeight: 1.8, marginBottom: "20px" }}>
              {event.detailedDescription || event.description}
            </p>

            {/* Tags */}
            {event.tags && event.tags.length > 0 && (
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "28px" }}>
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: "12px",
                      padding: "4px 10px",
                      borderRadius: "6px",
                      background: "var(--surface-alt)",
                      border: "1px solid var(--border)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Registration Card with Google Form banner */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "18px",
              padding: "26px",
              minWidth: "290px",
              boxShadow: "var(--card-shadow)",
            }}
          >
            <div style={{ marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>Seats Filled</span>
                <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-primary)" }}>
                  {event.registered} / {event.seats} ({pct}%)
                </span>
              </div>
              <div style={{ height: "6px", background: "var(--border)", borderRadius: "999px", overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${Math.min(pct, 100)}%`,
                    background: pct >= 90 ? "#ef4444" : pct >= 70 ? "#f59e0b" : "var(--primary)",
                    borderRadius: "999px",
                    transition: "width 0.3s",
                  }}
                />
              </div>
            </div>

            <p style={{ fontSize: "12px", color: seatsLeft <= 10 ? "#ef4444" : "var(--text-muted)", marginBottom: "18px", fontWeight: seatsLeft <= 10 ? 600 : 400 }}>
              {seatsLeft <= 0 ? "Event is fully booked." : `${seatsLeft} seats remaining.`}
            </p>

            {/* Direct Google Form Registration Note */}
            <div
              style={{
                background: "var(--surface-alt)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                padding: "14px",
                marginBottom: "20px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "6px", fontSize: "13px" }}>
                <span>📝</span> Official Registration
              </div>
              <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "12px", lineHeight: 1.5 }}>
                Registrations are handled directly via Google Forms. Click the button below to register in a new tab.
              </p>
            </div>

            <RegisterButton event={event} />
          </div>
        </div>
      </div>
    </section>
  );
}
