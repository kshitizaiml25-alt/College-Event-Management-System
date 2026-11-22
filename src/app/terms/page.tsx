import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "CampusHub Terms of Service and Event Participation Rules.",
};

export default function TermsPage() {
  return (
    <section className="section-padding" style={{ minHeight: "calc(100vh - 72px)" }}>
      <div className="container" style={{ maxWidth: "780px" }}>
        <h1 className="section-heading" style={{ marginBottom: "8px" }}>
          Terms &amp; Conditions
        </h1>
        <p className="muted" style={{ marginBottom: "36px", fontSize: "14px" }}>
          Last updated: January 2026
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {[
            {
              title: "1. Acceptance of Terms",
              text: "By accessing or using CampusHub, you agree to be bound by these Terms and all applicable rules set forth by participating colleges and event organizers.",
            },
            {
              title: "2. Student Conduct & Event Rules",
              text: "Attendees must adhere to all code of conduct policies of the host college. Disruption, harassment, or misuse of event tickets will result in immediate registration revocation and campus security intervention.",
            },
            {
              title: "3. Ticket Integrity & Confirmation IDs",
              text: "Confirmation IDs are unique to each registrant. Duplicating, forging, or transferring event confirmation IDs without organizer permission is strictly prohibited.",
            },
            {
              title: "4. Event Changes & Cancellations",
              text: "Organizers reserve the right to modify schedules or venues when necessary. CampusHub will display real-time updates on event details pages.",
            },
          ].map((sec, i) => (
            <div
              key={i}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "16px",
                padding: "24px 28px",
                boxShadow: "var(--card-shadow)",
              }}
            >
              <h2 style={{ fontSize: "17px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "10px" }}>
                {sec.title}
              </h2>
              <p className="muted" style={{ fontSize: "14px", lineHeight: 1.7, margin: 0 }}>
                {sec.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
