
"use client";

import { useState } from "react";
import RegisterModal from "@/components/RegisterModal";
import { ExternalLink } from "lucide-react";

interface Props {
  eventTitle: string;
  eventDate: string;
  formUrl: string;
}

export default function RegisterButton({ eventTitle, eventDate, formUrl }: Props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="primary-btn"
        style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
      >
        Register for Event <ExternalLink size={15} />
      </button>

      {showModal && (
        <RegisterModal
          eventTitle={eventTitle}
          eventDate={eventDate}
          formUrl={formUrl}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
