"use client";

import Link from "next/link";
import { Ticket, ArrowRight } from "lucide-react";
import type { Event } from "@/data/events";

interface Props {
  event: Pick<Event, "id" | "title" | "date" | "venue" | "category" | "formUrl" | "seats" | "registered">;
}

export default function RegisterButton({ event }: Props) {
  const isFull = event.registered >= event.seats;

  if (isFull) {
    return (
      <button
        disabled
        className="primary-btn"
        style={{
          width: "100%",
          opacity: 0.6,
          cursor: "not-allowed",
          background: "var(--border)",
          color: "var(--text-muted)",
        }}
      >
        Registration Full
      </button>
    );
  }

  return (
    <Link
      href={`/events/${event.id}/register`}
      className="primary-btn"
      style={{
        width: "100%",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        padding: "13px 20px",
        fontSize: "14px",
        fontWeight: 700,
        borderRadius: "12px",
        boxShadow: "0 6px 20px rgba(124, 58, 237, 0.35)",
        textDecoration: "none",
      }}
    >
      <Ticket size={16} />
      <span>Register for {event.title}</span>
      <ArrowRight size={15} />
    </Link>
  );
}
