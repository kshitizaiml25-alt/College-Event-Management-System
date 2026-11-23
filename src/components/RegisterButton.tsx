"use client";

import { ExternalLink } from "lucide-react";
import type { Event } from "@/data/events";
import { useToast } from "@/context/ToastContext";
import { addRegistration, isAlreadyRegistered } from "@/lib/registrations";
import { getUser } from "@/lib/auth";

interface Props {
  event: Pick<Event, "id" | "title" | "date" | "venue" | "category" | "formUrl" | "seats" | "registered">;
}

export default function RegisterButton({ event }: Props) {
  const { showToast } = useToast();
  const isFull = event.registered >= event.seats;

  function handleClick() {
    if (isFull) return;

    showToast(`Opening Google Form for ${event.title} in a new tab…`, "info");

    // Automatically record in the user's dashboard registrations
    const currentUser = getUser();
    const userEmail = currentUser ? currentUser.email : "student@college.edu";
    const userName = currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : "Registered Student";

    if (!isAlreadyRegistered(event.id, userEmail)) {
      addRegistration({
        eventId: event.id,
        eventTitle: event.title,
        eventDate: event.date,
        eventVenue: event.venue,
        eventCategory: event.category,
        name: userName,
        email: userEmail,
        phone: "+91 98765 43210",
        college: currentUser?.college || "Campus College",
        year: "Student",
      });
    }
  }

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
    <a
      href={event.formUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
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
      title="Opens official Google Form in a new tab"
    >
      <span>Register on Google Form</span>
      <ExternalLink size={16} />
    </a>
  );
}
