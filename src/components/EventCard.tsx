
import Link from "next/link";
import { Calendar, MapPin, Tag } from "lucide-react";

interface Event {
  id: string;
  title: string;
  category: string;
  date: string;
  venue: string;
  image: string;
  description: string;
}

// Proper typed style objects — no string parsing
const categoryStyles: Record<string, React.CSSProperties> = {
  Technical: { background: "#ede9fe", color: "#5b21b6", border: "1px solid #c4b5fd" },
  Cultural:  { background: "#fce7f3", color: "#9d174d", border: "1px solid #fbcfe8" },
  Workshop:  { background: "#fef9c3", color: "#854d0e", border: "1px solid #fde68a" },
  Sports:    { background: "#dcfce7", color: "#15803d", border: "1px solid #bbf7d0" },
};

const defaultBadge: React.CSSProperties = {
  background: "#ede9fe", color: "#5b21b6", border: "1px solid #c4b5fd",
};

export default function EventCard({ event }: { event: Event }) {
  const badgeStyle = categoryStyles[event.category] ?? defaultBadge;

  return (
    <div className="event-card">
      <img src={event.image} alt={event.title} className="event-image" />

      <div style={{ padding: "20px" }}>
        {/* Category badge */}
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            padding: "4px 10px",
            borderRadius: "999px",
            fontSize: "12px",
            fontWeight: 600,
            ...badgeStyle,
          }}
        >
          <Tag size={11} />
          {event.category}
        </span>

        <h3 style={{ fontSize: "17px", fontWeight: 700, margin: "12px 0 8px", lineHeight: 1.3, color: "#111827" }}>
          {event.title}
        </h3>

        <p className="muted" style={{ fontSize: "13px", marginBottom: "16px" }}>
          {event.description}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "7px", marginBottom: "18px" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "7px", fontSize: "13px", color: "#6b7280" }}>
            <Calendar size={14} style={{ color: "#7c3aed" }} />
            {event.date}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "7px", fontSize: "13px", color: "#6b7280" }}>
            <MapPin size={14} style={{ color: "#7c3aed" }} />
            {event.venue}
          </span>
        </div>

        <Link
          href={`/events/${event.id}`}
          className="primary-btn"
          style={{ width: "100%", fontSize: "14px", padding: "11px 18px" }}
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
