
import type { Metadata } from "next";

export const metadata: Metadata = { title: "FAQ" };

const faqs = [
  {
    q: "How do I register for an event?",
    a: "Find an event on the Events page, click 'View Details', then click 'Register for Event'. Fill in your details in the registration form and submit. You'll receive a confirmation with your registration ID.",
  },
  {
    q: "Can I cancel my registration?",
    a: "Currently, cancellations must be requested via email at hello@campushub.in at least 48 hours before the event. We're building a self-service cancellation feature.",
  },
  {
    q: "Is CampusHub free to use?",
    a: "Yes! CampusHub is completely free for students to browse events and register. Some events may have a nominal fee set by the organizing club.",
  },
  {
    q: "How do I know if my registration was successful?",
    a: "After submitting the registration form, you'll see a confirmation screen with a unique Confirmation ID (e.g., CH-XXXX-XXXX). Take a screenshot — this is your proof of registration.",
  },
  {
    q: "What if an event is full?",
    a: "If seats are full, the Register button is disabled. Contact the organizer via the event's contact email to be added to the waitlist.",
  },
  {
    q: "How do I create an account?",
    a: "Click 'Get Started' in the navbar, fill in your name, college email, college name and a secure password, then accept the Terms & Conditions.",
  },
  {
    q: "I forgot my password. What do I do?",
    a: "Click 'Forgot password?' on the Login page and enter your registered email. A reset link will be sent (this feature is coming soon — for now, contact support).",
  },
  {
    q: "Can organizers list events on CampusHub?",
    a: "Yes! Clubs and departments can apply to become Organizers. Email hello@campushub.in with your college, club name, and a brief description.",
  },
  {
    q: "Is my data safe?",
    a: "We take privacy seriously. We collect only what's necessary for registration, never sell your data, and use industry-standard encryption. Read our Privacy Policy for full details.",
  },
  {
    q: "Which browsers does CampusHub support?",
    a: "CampusHub works on all modern browsers — Chrome, Firefox, Safari, and Edge — on both desktop and mobile.",
  },
];

export default function FAQPage() {
  return (
    <section className="section-padding">
      <div className="container" style={{ maxWidth: "760px" }}>
        <p style={{ color: "#7c3aed", fontWeight: 600, marginBottom: "8px" }}>Support</p>
        <h1 className="section-heading">Frequently Asked <span className="gradient-text">Questions</span></h1>
        <p className="muted" style={{ marginBottom: "52px" }}>
          Can&apos;t find an answer? Email us at{" "}
          <a href="mailto:hello@campushub.in" style={{ color: "#7c3aed" }}>hello@campushub.in</a>
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "14px", padding: "24px 28px", boxShadow: "0 1px 3px #0000000a" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111827", marginBottom: "10px" }}>
                Q{i + 1}. {faq.q}
              </h3>
              <p style={{ color: "#6b7280", fontSize: "14px", lineHeight: 1.7, margin: 0 }}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
