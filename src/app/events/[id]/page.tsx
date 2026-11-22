
import { events } from "@/data/events";
import { Calendar, MapPin, Tag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import RegisterButton from "@/components/RegisterButton";

export function generateStaticParams() {
  return events.map((e) => ({ id: e.id }));
}

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = events.find((e) => e.id === id);
  if (!event) notFound();

  const categoryBadge: Record<string, React.CSSProperties> = {
    Technical: { background: "#ede9fe", color: "#5b21b6", border: "1px solid #c4b5fd" },
    Cultural:  { background: "#fce7f3", color: "#9d174d", border: "1px solid #fbcfe8" },
    Workshop:  { background: "#fef9c3", color: "#854d0e", border: "1px solid #fde68a" },
    Sports:    { background: "#dcfce7", color: "#15803d", border: "1px solid #bbf7d0" },
  };
  const badge = categoryBadge[event.category] || { background: "#ede9fe", color: "#5b21b6", border: "1px solid #c4b5fd" };

  return (
    <section className="section-padding">
      <div className="container" style={{ maxWidth: "820px" }}>
        <Link href="/events" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#6b7280", fontSize: "14px", marginBottom: "28px" }}>
          <ArrowLeft size={16} /> Back to Events
        </Link>

        <img
          src={event.image}
          alt={event.title}
          style={{ width: "100%", height: "360px", objectFit: "cover", borderRadius: "18px", marginBottom: "32px", display: "block" }}
        />

        <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "5px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: 600, marginBottom: "16px", ...badge }}>
          <Tag size={11} /> {event.category}
        </span>

        <h1 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, marginBottom: "16px", lineHeight: 1.2, color: "#111827" }}>
          {event.title}
        </h1>

        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", marginBottom: "28px" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "8px", color: "#6b7280", fontSize: "15px" }}>
            <Calendar size={16} style={{ color: "#7c3aed" }} /> {event.date}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "8px", color: "#6b7280", fontSize: "15px" }}>
            <MapPin size={16} style={{ color: "#7c3aed" }} /> {event.venue}
          </span>
        </div>

        <p className="muted" style={{ fontSize: "17px", lineHeight: "1.8", marginBottom: "36px" }}>
          {event.description}
        </p>

        <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
          <RegisterButton eventTitle={event.title} eventDate={event.date} formUrl={event.formUrl} />
          <Link href="/events" style={{ display: "inline-flex", alignItems: "center", padding: "13px 22px", borderRadius: "10px", border: "1px solid #d1d5db", color: "#374151", fontWeight: 600, background: "#ffffff" }}>
            Browse More Events
          </Link>
        </div>
      </div>
    </section>
  );
}
