"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, MapPin, Tag, Users, Ticket } from "lucide-react";
import type { Event } from "@/data/events";
import RegisterModal from "@/components/RegisterModal";

const categoryStyles: Record<string, { bg: string; color: string; border: string }> = {
  Technical: { bg: "rgba(124, 58, 237, 0.12)", color: "#8b5cf6", border: "rgba(124, 58, 237, 0.3)" },
  Cultural:  { bg: "rgba(219, 39, 119, 0.12)", color: "#ec4899", border: "rgba(219, 39, 119, 0.3)" },
  Workshop:  { bg: "rgba(217, 119, 6, 0.12)",  color: "#f59e0b", border: "rgba(217, 119, 6, 0.3)" },
  Sports:    { bg: "rgba(22, 163, 74, 0.12)",  color: "#22c55e", border: "rgba(22, 163, 74, 0.3)" },
};

const defaultBadge = {
  bg: "rgba(124, 58, 237, 0.12)", color: "#8b5cf6", border: "rgba(124, 58, 237, 0.3)",
};

function getSeatsClass(seats: number, registered: number): string {
  const remaining = seats - registered;
  const pct = remaining / seats;
  if (remaining <= 0) return "full";
  if (pct <= 0.1) return "low";
  if (pct <= 0.3) return "mid";
  return "ok";
}

function getSeatLabel(seats: number, registered: number): string {
  const remaining = seats - registered;
  if (remaining <= 0) return "Full";
  if (remaining <= 10) return `Only ${remaining} left`;
  return `${remaining} seats left`;
}

export default function EventCard({ event }: { event: Event }) {
  const [showModal, setShowModal] = useState(false);
  const badgeConfig = categoryStyles[event.category] ?? defaultBadge;
  const seatsClass = getSeatsClass(event.seats, event.registered);
  const seatLabel = getSeatLabel(event.seats, event.registered);
  const isFull = event.registered >= event.seats;

  return (
    <>
      <div className="event-card">
        <div style={{ position: "relative" }}>
          <img src={event.image} alt={event.title} className="event-image" />
          {/* Seats badge on image */}
          <span
            className={`seats-badge ${seatsClass}`}
            style={{ position: "absolute", top: "12px", right: "12px" }}
          >
            <Users size={11} /> {seatLabel}
          </span>
        </div>

        <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
          <div>
            {/* Category + deadline row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  padding: "4px 10px",
                  borderRadius: "999px",
                  fontSize: "12px",
                  fontWeight: 600,
                  background: badgeConfig.bg,
                  color: badgeConfig.color,
                  border: `1px solid ${badgeConfig.border}`,
                }}
              >
                <Tag size={10} /> {event.category}
              </span>
              <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                Deadline: {event.deadline}
              </span>
            </div>

            <h3
              style={{
                fontSize: "16px",
                fontWeight: 700,
                margin: "0 0 6px",
                lineHeight: 1.3,
                color: "var(--text-primary)",
              }}
            >
              {event.title}
            </h3>

            <p className="muted" style={{ fontSize: "13px", marginBottom: "14px", lineHeight: 1.5 }}>
              {event.description}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "18px" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "7px", fontSize: "13px", color: "var(--text-secondary)" }}>
                <Calendar size={13} style={{ color: "var(--primary)", flexShrink: 0 }} /> {event.date}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "7px", fontSize: "13px", color: "var(--text-secondary)" }}>
                <MapPin size={13} style={{ color: "var(--primary)", flexShrink: 0 }} /> {event.venue}
              </span>
            </div>
          </div>

          {/* Action buttons: Details + Dedicated Event Registration */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.25fr", gap: "10px", marginTop: "auto" }}>
            <Link
              href={`/events/${event.id}`}
              className="outline-btn"
              style={{
                fontSize: "13px",
                padding: "9px 12px",
                textAlign: "center",
                justifyContent: "center",
              }}
            >
              Details
            </Link>

            <button
              onClick={() => !isFull && setShowModal(true)}
              type="button"
              className="primary-btn"
              disabled={isFull}
              style={{
                fontSize: "13px",
                padding: "9px 12px",
                textAlign: "center",
                justifyContent: "center",
                opacity: isFull ? 0.6 : 1,
                cursor: isFull ? "not-allowed" : "pointer",
                gap: "6px",
              }}
            >
              {isFull ? "Full" : <><Ticket size={13} /> Register</>}
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <RegisterModal
          eventId={event.id}
          eventTitle={event.title}
          eventDate={event.date}
          eventVenue={event.venue}
          eventCategory={event.category}
          formUrl={event.formUrl}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
