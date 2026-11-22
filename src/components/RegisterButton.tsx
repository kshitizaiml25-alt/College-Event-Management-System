
"use client";

import { useState } from "react";
import RegisterModal from "@/components/RegisterModal";
import { ExternalLink } from "lucide-react";
import type { Event } from "@/data/events";

interface Props {
  event: Pick<Event, "id" | "title" | "date" | "venue" | "category" | "formUrl" | "seats" | "registered">;
}

export default function RegisterButton({ event }: Props) {
  const [showModal, setShowModal] = useState(false);
  const isFull = event.registered >= event.seats;

  return (
    <>
      <button
        onClick={() => !isFull && setShowModal(true)}
        className="primary-btn"
        disabled={isFull}
        style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          opacity: isFull ? 0.6 : 1,
          cursor: isFull ? "not-allowed" : "pointer",
        }}
      >
        {isFull ? "Registration Full" : <><ExternalLink size={15} /> Register for Event</>}
      </button>

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
