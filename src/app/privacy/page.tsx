import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "CampusHub Privacy Policy — how we protect and manage student data.",
};

export default function PrivacyPage() {
  return (
    <section className="section-padding" style={{ minHeight: "calc(100vh - 72px)" }}>
      <div className="container" style={{ maxWidth: "780px" }}>
        <h1 className="section-heading" style={{ marginBottom: "8px" }}>
          Privacy Policy
        </h1>
        <p className="muted" style={{ marginBottom: "36px", fontSize: "14px" }}>
          Last updated: January 2026
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {[
            {
              title: "1. Information We Collect",
              text: "We collect information you provide directly to us when creating an account or registering for an event, including your full name, college email address, contact number, college name, and year of study.",
            },
            {
              title: "2. How We Use Your Information",
              text: "Your information is used solely to generate your event tickets and confirmation IDs, notify you of event updates or venue changes, verify eligibility at the venue desk, and maintain your account dashboard.",
            },
            {
              title: "3. Information Sharing",
              text: "We only share your registration details with the verified organizer of the specific event you registered for. We never sell, rent, or trade student data to third parties or marketing brokers.",
            },
            {
              title: "4. Data Security",
              text: "All passwords and session data are encrypted using standard security hashing. Only authorized student credentials can access protected dashboards.",
            },
            {
              title: "5. Your Rights",
              text: "You can request to view, export, or permanently delete your account and registration records at any time by contacting us at hello@campushub.in.",
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
