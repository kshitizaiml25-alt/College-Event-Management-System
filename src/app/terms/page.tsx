
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      body: `By creating an account or using CampusHub, you agree to these Terms & Conditions. If you do not agree, please do not use our platform.`,
    },
    {
      title: "2. Eligibility",
      body: `CampusHub is intended for college students, faculty, and staff. You must be at least 16 years old and enrolled in or affiliated with a registered college or university.`,
    },
    {
      title: "3. User Accounts",
      body: `You are responsible for maintaining the confidentiality of your password. You may not share your account with others. CampusHub reserves the right to suspend accounts that violate these terms.`,
    },
    {
      title: "4. Event Registration",
      body: `By registering for an event, you agree to attend and comply with the event organizer's rules. No-shows or misconduct may result in restrictions on future registrations.`,
    },
    {
      title: "5. User Content",
      body: `Any content you submit (profile info, registration details) must be accurate and truthful. Submitting false information is grounds for account termination.`,
    },
    {
      title: "6. Intellectual Property",
      body: `CampusHub's logo, design, and code are the intellectual property of CampusHub. Event posters and content belong to their respective organizers. Do not reproduce without permission.`,
    },
    {
      title: "7. Limitation of Liability",
      body: `CampusHub acts as a platform connecting students with event organizers. We are not responsible for the content, quality, or cancellation of events. All disputes regarding events must be resolved with the organizer directly.`,
    },
    {
      title: "8. Prohibited Conduct",
      body: `You may not: use the platform for spam or harassment; scrape or copy data; attempt to hack or disrupt the platform; impersonate another user or organization; or violate any applicable law.`,
    },
    {
      title: "9. Termination",
      body: `We reserve the right to suspend or terminate accounts for violations of these terms at our sole discretion, with or without prior notice.`,
    },
    {
      title: "10. Changes to Terms",
      body: `We may update these Terms & Conditions at any time. Continued use of CampusHub after changes are posted constitutes your acceptance of the new terms.`,
    },
    {
      title: "11. Governing Law",
      body: `These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Bengaluru, Karnataka.`,
    },
  ];

  return (
    <section className="section-padding">
      <div className="container" style={{ maxWidth: "760px" }}>
        <p style={{ color: "#7c3aed", fontWeight: 600, marginBottom: "8px" }}>Legal</p>
        <h1 className="section-heading">Terms & <span className="gradient-text">Conditions</span></h1>
        <p className="muted" style={{ marginBottom: "8px" }}>Last updated: November 23, 2026</p>
        <p className="muted" style={{ marginBottom: "48px" }}>
          Please read these terms carefully before using CampusHub.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {sections.map((s, i) => (
            <div key={i} style={{ borderLeft: "3px solid #c4b5fd", paddingLeft: "20px" }}>
              <h2 style={{ fontSize: "17px", fontWeight: 700, color: "#111827", marginBottom: "10px" }}>{s.title}</h2>
              <p style={{ color: "#6b7280", fontSize: "15px", lineHeight: 1.75, margin: 0 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
