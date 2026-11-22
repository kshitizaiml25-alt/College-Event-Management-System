import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about CampusHub events and registrations.",
};

const faqs = [
  {
    q: "How do I register for an event?",
    a: "Find an event on the Events page, click 'View Details', then click 'Register for Event'. Fill in your details in the registration form and submit. You'll receive a confirmation with your unique Confirmation ID.",
  },
  {
    q: "Can I cancel my registration?",
    a: "Currently, cancellations must be requested via email at hello@campushub.in at least 48 hours before the event. We're building a self-service cancellation feature directly in your dashboard.",
  },
  {
    q: "Is CampusHub free to use?",
    a: "Yes! CampusHub is completely free for students to browse events and register. Some events may have a nominal entry fee set by the organizing club or college.",
  },
  {
    q: "How do I know if my registration was successful?",
    a: "After submitting the registration form, you'll see a confirmation screen with a unique Confirmation ID (e.g., CH-XXXX-XXXX). Take a screenshot or copy it — this is your ticket and proof of registration.",
  },
  {
    q: "What if an event is full?",
    a: "When seats reach capacity, the Register button is automatically disabled and marked as 'Registration Full'. You can contact the organizer to be added to their waiting list.",
  },
  {
    q: "How do I create an account?",
    a: "Click 'Get Started' in the navigation bar, enter your name, college email, college name, and create an 8-character password. Accept the terms and you're all set!",
  },
  {
    q: "Why can't I login with a different password?",
    a: "CampusHub enforces strict password verification. Your password is securely encrypted when you create your account. You must enter the exact password you used during registration to sign in.",
  },
  {
    q: "How do I switch between Light and Dark themes?",
    a: "Click the Sun/Moon icon in the top navigation bar at any time! CampusHub saves your preference so it remembers your chosen theme whenever you return.",
  },
  {
    q: "Can college clubs list events on CampusHub?",
    a: "Yes! Clubs, student bodies, and college departments can apply to become verified Organizers. Email hello@campushub.in with your club details.",
  },
  {
    q: "Is my personal information secure?",
    a: "We take student privacy seriously. We only collect details essential for event ticketing and venue desks, never sell your data, and use encryption throughout.",
  },
];

export default function FAQPage() {
  return (
    <section className="section-padding" style={{ minHeight: "calc(100vh - 72px)" }}>
      <div className="container" style={{ maxWidth: "780px" }}>
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <p style={{ color: "var(--primary)", fontWeight: 600, marginBottom: "8px" }}>Got Questions?</p>
          <h1 className="section-heading">Frequently Asked Questions</h1>
          <p className="muted" style={{ fontSize: "16px" }}>
            Everything you need to know about using CampusHub for events and registrations.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {faqs.map((faq, i) => (
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
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "10px" }}>
                {faq.q}
              </h3>
              <p className="muted" style={{ fontSize: "14px", lineHeight: 1.7, margin: 0 }}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
