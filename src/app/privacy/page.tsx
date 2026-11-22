
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  const sections = [
    {
      title: "1. Information We Collect",
      body: `When you create an account or register for an event, we collect: your name, college email address, phone number, college name, and year of study. We also collect usage data such as pages visited and events viewed to improve our services.`,
    },
    {
      title: "2. How We Use Your Information",
      body: `We use your information to: manage your account, process event registrations, send confirmation notifications, improve our platform, and communicate important updates. We do not use your data for advertising.`,
    },
    {
      title: "3. Data Sharing",
      body: `We share your registration details (name, email, phone, college) with the event organizer for the specific events you register for. We do not sell, rent, or share your data with any third parties outside of this.`,
    },
    {
      title: "4. Data Security",
      body: `We use industry-standard HTTPS encryption for all data transmission. Passwords are hashed using bcrypt and never stored in plain text. We regularly review our security practices.`,
    },
    {
      title: "5. Cookies",
      body: `We use essential cookies to maintain your login session. We do not use advertising or tracking cookies. You can disable cookies in your browser settings, though some features may not work correctly.`,
    },
    {
      title: "6. Your Rights",
      body: `You may request access to, correction of, or deletion of your personal data at any time by emailing hello@campushub.in. We will respond within 7 business days.`,
    },
    {
      title: "7. Data Retention",
      body: `We retain your account data for as long as your account is active. Registration records are kept for 1 year after the event date. You may request deletion at any time.`,
    },
    {
      title: "8. Changes to This Policy",
      body: `We may update this Privacy Policy from time to time. We will notify you by email and display a notice on our platform at least 7 days before changes take effect.`,
    },
    {
      title: "9. Contact Us",
      body: `For privacy-related questions, email privacy@campushub.in or write to: CampusHub, Bengaluru, Karnataka, India.`,
    },
  ];

  return (
    <section className="section-padding">
      <div className="container" style={{ maxWidth: "760px" }}>
        <p style={{ color: "#7c3aed", fontWeight: 600, marginBottom: "8px" }}>Legal</p>
        <h1 className="section-heading">Privacy <span className="gradient-text">Policy</span></h1>
        <p className="muted" style={{ marginBottom: "8px" }}>Last updated: November 23, 2026</p>
        <p className="muted" style={{ marginBottom: "48px" }}>
          CampusHub respects your privacy. This policy explains what data we collect, why, and how we protect it.
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
