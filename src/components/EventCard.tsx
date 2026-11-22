
import Link from "next/link";
import { Calendar, MapPin, Tag, Users } from "lucide-react";
import type { Event } from "@/data/events";

const categoryStyles: Record<string, React.CSSProperties> = {
  Technical: { background: "#ede9fe", color: "#5b21b6", border: "1px solid #c4b5fd" },
  Cultural:  { background: "#fce7f3", color: "#9d174d", border: "1px solid #fbcfe8" },
  Workshop:  { background: "#fef9c3", color: "#854d0e", border: "1px solid #fde68a" },
  Sports:    { background: "#dcfce7", color: "#15803d", border: "1px solid #bbf7d0" },
};

const defaultBadge: React.CSSProperties = {
  background: "#ede9fe", color: "#5b21b6", border: "1px solid #c4b5fd",
};

function getSeatsClass(seats: number, registered: number): string {
  const remaining = seats - registered;
  const pct = remaining / seats;
  if (remaining <= 0)   return "full";
  if (pct <= 0.1)       return "low";
  if (pct <= 0.3)       return "mid";
  return "ok";
}

function getSeatLabel(seats: number, registered: number): string {
  const remaining = seats - registered;
  if (remaining <= 0) return "Full";
  if (remaining <= 10) return `Only ${remaining} left`;
  return `${remaining} seats left`;
}

export default function EventCard({ event }: { event: Event }) {
  const badgeStyle = categoryStyles[event.category] ?? defaultBadge;
  const seatsClass = getSeatsClass(event.seats, event.registered);
  const seatLabel  = getSeatLabel(event.seats, event.registered);
  const isFull     = event.registered >= event.seats;

  return (
    <div className="event-card">
      <div style={{ position: "relative" }}>
        <img src={event.image} alt={event.title} className="event-image" />
        {/* Seats badge on image */}
        <span
          className={`seats-badge ${seatsClass}`}
          style={{ position: "absolute", top: "12px", right: "12px" }}
        >
          <Users size={10} /> {seatLabel}
        </span>
      </div>

      <div style={{ padding: "20px" }}>
        {/* Category + deadline row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "4px 10px", borderRadius: "999px", fontSize: "12px", fontWeight: 600, ...badgeStyle }}>
            <Tag size={10} /> {event.category}
          </span>
          <span style={{ fontSize: "11px", color: "#9ca3af" }}>
            Deadline: {event.deadline}
          </span>
        </div>

        <h3 style={{ fontSize: "16px", fontWeight: 700, margin: "0 0 6px", lineHeight: 1.3, color: "#111827" }}>
          {event.title}
        </h3>

        <p className="muted" style={{ fontSize: "13px", marginBottom: "14px", lineHeight: 1.5 }}>
          {event.description}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "16px" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "7px", fontSize: "13px", color: "#6b7280" }}>
            <Calendar size={13} style={{ color: "#7c3aed", flexShrink: 0 }} /> {event.date}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "7px", fontSize: "13px", color: "#6b7280" }}>
            <MapPin size={13} style={{ color: "#7c3aed", flexShrink: 0 }} /> {event.venue}
          </span>
        </div>

        <Link
          href={`/events/${event.id}`}
          className="primary-btn"
          style={{
            width: "100%", fontSize: "13px", padding: "10px 16px",
            opacity: isFull ? 0.6 : 1,
            pointerEvents: isFull ? "none" : "auto",
          }}
        >
          {isFull ? "Registration Full" : "View Details →"}
        </Link>
      </div>
    </div>
  );
}
