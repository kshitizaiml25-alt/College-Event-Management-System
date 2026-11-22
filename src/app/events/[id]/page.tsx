
import { events } from "@/data/events";
import { Calendar, MapPin, Tag, ArrowLeft, Users, Clock, Building2 } from "lucide-react";
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

const categoryBadge: Record<string, React.CSSProperties> = {
  Technical: { background: "#ede9fe", color: "#5b21b6", border: "1px solid #c4b5fd" },
  Cultural:  { background: "#fce7f3", color: "#9d174d", border: "1px solid #fbcfe8" },
  Workshop:  { background: "#fef9c3", color: "#854d0e", border: "1px solid #fde68a" },
  Sports:    { background: "#dcfce7", color: "#15803d", border: "1px solid #bbf7d0" },
};

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = events.find((e) => e.id === id);
  if (!event) notFound();

  const badge = categoryBadge[event.category] ?? { background: "#ede9fe", color: "#5b21b6", border: "1px solid #c4b5fd" };
  const seatsLeft = event.seats - event.registered;
  const pct = Math.round((event.registered / event.seats) * 100);

  return (
    <section className="section-padding">
      <div className="container" style={{ maxWidth: "860px" }}>
        <Link href="/events" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#6b7280", fontSize: "14px", marginBottom: "28px" }}>
          <ArrowLeft size={16} /> Back to Events
        </Link>

        <img src={event.image} alt={event.title} style={{ width: "100%", height: "380px", objectFit: "cover", borderRadius: "18px", marginBottom: "32px", display: "block" }} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "32px", alignItems: "start" }}>
          <div>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "5px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: 600, marginBottom: "16px", ...badge }}>
              <Tag size={11} /> {event.category}
            </span>

            <h1 style={{ fontSize: "clamp(24px, 4vw, 38px)", fontWeight: 800, marginBottom: "14px", lineHeight: 1.2, color: "#111827" }}>
              {event.title}
            </h1>

            {/* Event meta */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
              {[
                { icon: <Calendar size={15} style={{ color: "#7c3aed", flexShrink: 0 }} />, text: event.date },
                { icon: <Clock    size={15} style={{ color: "#7c3aed", flexShrink: 0 }} />, text: `Registration deadline: ${event.deadline}` },
                { icon: <MapPin   size={15} style={{ color: "#7c3aed", flexShrink: 0 }} />, text: event.venue },
                { icon: <Building2 size={15} style={{ color: "#7c3aed", flexShrink: 0 }} />, text: `Organized by: ${event.organizer}` },
                { icon: <Users    size={15} style={{ color: "#7c3aed", flexShrink: 0 }} />, text: `${seatsLeft > 0 ? `${seatsLeft} seats remaining` : "Registration Full"} (${event.registered}/${event.seats})` },
              ].map((item, i) => (
                <span key={i} style={{ display: "flex", alignItems: "center", gap: "10px", color: "#6b7280", fontSize: "14px" }}>
                  {item.icon} {item.text}
                </span>
              ))}
            </div>

            {/* Seat bar */}
            <div style={{ marginBottom: "28px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#9ca3af", marginBottom: "6px" }}>
                <span>Seats filled</span>
                <span>{pct}%</span>
              </div>
              <div style={{ background: "#e5e7eb", borderRadius: "999px", height: "7px", overflow: "hidden" }}>
                <div style={{ height: "100%", borderRadius: "999px", width: `${pct}%`, background: pct >= 90 ? "#ef4444" : pct >= 70 ? "#f59e0b" : "#7c3aed", transition: "width 0.5s ease" }} />
              </div>
            </div>

            {/* Description */}
            <div style={{ background: "#f9fafb", borderRadius: "14px", padding: "24px", marginBottom: "32px", border: "1px solid #e5e7eb" }}>
              <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#111827", marginBottom: "10px" }}>About This Event</h2>
              <p style={{ color: "#6b7280", fontSize: "15px", lineHeight: 1.8, margin: 0 }}>{event.detailedDescription}</p>
            </div>

            {/* Tags */}
            {event.tags && (
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "32px" }}>
                {event.tags.map((tag) => (
                  <span key={tag} style={{ background: "#f3f4f6", color: "#6b7280", fontSize: "12px", fontWeight: 500, padding: "4px 10px", borderRadius: "999px", border: "1px solid #e5e7eb" }}>
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <RegisterButton event={{ id: event.id, title: event.title, date: event.date, venue: event.venue, category: event.category, formUrl: event.formUrl, seats: event.seats, registered: event.registered }} />
              <Link href="/events" style={{ display: "inline-flex", alignItems: "center", padding: "13px 22px", borderRadius: "10px", border: "1px solid #d1d5db", color: "#374151", fontWeight: 600, background: "#ffffff" }}>
                Browse More Events
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
