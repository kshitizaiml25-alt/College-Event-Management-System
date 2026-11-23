"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle, Copy, Check, Ticket, AlertCircle, Calendar, MapPin, Tag } from "lucide-react";
import type { Event } from "@/data/events";
import { addRegistration, isAlreadyRegistered } from "@/lib/registrations";
import { getUser } from "@/lib/auth";
import { useToast } from "@/context/ToastContext";

interface Props {
  event: Event;
}

const eventQuestions: Record<string, { label: string; options: string[] }> = {
  "1": {
    label: "Hackathon Track / Domain",
    options: ["AI & Machine Learning", "Ed-Tech & Campus Tools", "HealthTech & Wellness", "Sustainability & Green Tech", "Open Innovation"],
  },
  "2": {
    label: "Performance / Participation Category",
    options: ["Solo Singing / Vocal", "Group Dance", "Band / Instrumental Music", "Drama / Street Play", "General Audience Pass"],
  },
  "3": {
    label: "Current Programming / AI Knowledge Level",
    options: ["Beginner (Learning Python)", "Intermediate (Built some projects)", "Advanced (Experience with ML / APIs)"],
  },
  "4": {
    label: "Sports Competition Category",
    options: ["Cricket Tournament", "Football Championship", "Basketball 3x3", "Athletics (100m / 400m)", "Badminton Singles/Doubles", "Chess Tournament"],
  },
  "5": {
    label: "Startup Idea Stage",
    options: ["Early Concept / Idea Stage", "Working Prototype / MVP", "Launched with Early Users"],
  },
  "6": {
    label: "Photography Theme Submission",
    options: ["Campus Life Unseen", "Portraits of Campus", "Architectural Perspectives", "Abstract / Monochromatic"],
  },
};

export default function EventRegistrationForm({ event }: Props) {
  const router = useRouter();
  const { showToast } = useToast();
  const currentUser = getUser();

  const [form, setForm] = useState({
    name: currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : "",
    email: currentUser ? currentUser.email : "",
    phone: "",
    college: currentUser?.college || "",
    year: "1st Year",
    eventSpecificAnswer: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [confirmationId, setConfirmationId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const extraQuestion = eventQuestions[event.id] || {
    label: "Participation Category",
    options: ["General Attendee", "Active Participant", "Volunteer"],
  };

  function validate() {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Full Name is required.";
    if (!form.email.trim()) {
      errs.email = "Email Address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Enter a valid email address.";
    }
    if (!form.phone.trim()) {
      errs.phone = "Contact Phone Number is required.";
    } else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ""))) {
      errs.phone = "Enter a valid 10-digit mobile number.";
    }
    if (!form.college.trim()) errs.college = "College / University Name is required.";
    if (!form.year) errs.year = "Select your year of study.";
    if (!form.eventSpecificAnswer) errs.eventSpecificAnswer = "Please select an option.";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      showToast("Please fill all required fields correctly.", "error");
      return;
    }

    if (isAlreadyRegistered(event.id, form.email)) {
      showToast("This email is already registered for this event.", "warning");
      setErrors({ email: "This email is already registered for this event." });
      return;
    }

    setErrors({});
    setLoading(true);

    await new Promise((res) => setTimeout(res, 800));

    const reg = addRegistration({
      eventId: event.id,
      eventTitle: event.title,
      eventDate: event.date,
      eventVenue: event.venue,
      eventCategory: event.category,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      college: form.college.trim(),
      year: `${form.year} (${form.eventSpecificAnswer})`,
    });

    setLoading(false);
    setConfirmationId(reg.confirmationId);
    setSubmitted(true);
    showToast(`Registration confirmed for ${event.title}!`, "success");
  }

  function copyId() {
    if (!confirmationId) return;
    navigator.clipboard.writeText(confirmationId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (submitted && confirmationId) {
    return (
      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "40px 16px" }}>
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "20px",
            padding: "44px 36px",
            textAlign: "center",
            boxShadow: "var(--card-shadow)",
          }}
        >
          <CheckCircle size={64} style={{ color: "#16a34a", margin: "0 auto 20px" }} />
          <h1 style={{ fontSize: "26px", fontWeight: 800, color: "var(--text-primary)", marginBottom: "8px" }}>
            Response Recorded! 🎉
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "15px", marginBottom: "26px" }}>
            Your registration for <strong>{event.title}</strong> has been successfully confirmed.
          </p>

          {/* Ticket Card */}
          <div
            style={{
              background: "var(--surface-alt)",
              border: "1px dashed var(--border)",
              borderRadius: "16px",
              padding: "24px",
              marginBottom: "28px",
              textAlign: "left",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <span style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--primary)", fontWeight: 700 }}>
                Official Confirmation Ticket
              </span>
              <button
                onClick={copyId}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "12px",
                  color: "var(--primary)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy ID</>}
              </button>
            </div>

            <div style={{ fontFamily: "monospace", fontSize: "24px", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "0.06em", marginBottom: "14px" }}>
              {confirmationId}
            </div>

            <hr style={{ borderColor: "var(--border)", margin: "14px 0" }} />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", fontSize: "13px", color: "var(--text-secondary)" }}>
              <div><strong>Attendee:</strong> {form.name}</div>
              <div><strong>Email:</strong> {form.email}</div>
              <div><strong>Event:</strong> {event.title}</div>
              <div><strong>Category:</strong> {event.category}</div>
              <div><strong>Date:</strong> {event.date}</div>
              <div><strong>Venue:</strong> {event.venue}</div>
            </div>
          </div>

          <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "28px" }}>
            A copy of this ticket has been saved to your <strong>Student Dashboard</strong>. Please show this Confirmation ID at the event entrance desk.
          </p>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/dashboard" className="primary-btn">
              Go to My Dashboard
            </Link>
            <Link href="/events" className="outline-btn">
              Browse More Events
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "680px", margin: "0 auto", padding: "20px 16px 60px" }}>
      <Link
        href={`/events/${event.id}`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          color: "var(--text-muted)",
          fontSize: "14px",
          marginBottom: "20px",
        }}
      >
        <ArrowLeft size={16} /> Back to Event Details
      </Link>

      <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Header Form Card */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderTop: "8px solid var(--primary)",
            borderRadius: "16px",
            padding: "32px 28px",
            boxShadow: "var(--card-shadow)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                padding: "3px 10px",
                borderRadius: "999px",
                background: "rgba(124, 58, 237, 0.15)",
                color: "var(--primary)",
              }}
            >
              {event.category}
            </span>
            <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
              Official College Registration
            </span>
          </div>

          <h1 style={{ fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 800, color: "var(--text-primary)", margin: "0 0 10px" }}>
            {event.title} Registration
          </h1>

          <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "18px" }}>
            {event.detailedDescription || event.description}
          </p>

          <hr style={{ borderColor: "var(--border)", margin: "16px 0" }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px", color: "var(--text-muted)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Calendar size={14} style={{ color: "var(--primary)" }} /> {event.date}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <MapPin size={14} style={{ color: "var(--primary)" }} /> {event.venue}
            </div>
          </div>

          <div style={{ marginTop: "16px", fontSize: "12px", color: "#ef4444", fontWeight: 600 }}>
            * Indicates required question
          </div>
        </div>

        {/* Question 1: Full Name */}
        <div style={questionCardStyle}>
          <label style={questionLabelStyle}>
            Full Name <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <input
            className="input-field"
            placeholder="e.g. Aryan Mehta"
            value={form.name}
            onChange={(e) => {
              setForm({ ...form, name: e.target.value });
              setErrors({ ...errors, name: "" });
            }}
            style={errors.name ? { borderColor: "#ef4444" } : {}}
          />
          {errors.name && <p style={errorTextStyle}>{errors.name}</p>}
        </div>

        {/* Question 2: Email Address */}
        <div style={questionCardStyle}>
          <label style={questionLabelStyle}>
            Email Address (for confirmation ticket) <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <input
            className="input-field"
            type="email"
            placeholder="you@college.edu"
            value={form.email}
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
              setErrors({ ...errors, email: "" });
            }}
            style={errors.email ? { borderColor: "#ef4444" } : {}}
          />
          <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "6px" }}>
            Your official confirmation ID and entry badge will be linked to this email address.
          </p>
          {errors.email && <p style={errorTextStyle}>{errors.email}</p>}
        </div>

        {/* Question 3: Phone Number */}
        <div style={questionCardStyle}>
          <label style={questionLabelStyle}>
            Contact Mobile Number <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <input
            className="input-field"
            placeholder="10-digit number (e.g. 9876543210)"
            value={form.phone}
            onChange={(e) => {
              setForm({ ...form, phone: e.target.value });
              setErrors({ ...errors, phone: "" });
            }}
            style={errors.phone ? { borderColor: "#ef4444" } : {}}
          />
          {errors.phone && <p style={errorTextStyle}>{errors.phone}</p>}
        </div>

        {/* Question 4: College Name */}
        <div style={questionCardStyle}>
          <label style={questionLabelStyle}>
            College / Institution Name <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <input
            className="input-field"
            placeholder="e.g. Apex Institute of Technology"
            value={form.college}
            onChange={(e) => {
              setForm({ ...form, college: e.target.value });
              setErrors({ ...errors, college: "" });
            }}
            style={errors.college ? { borderColor: "#ef4444" } : {}}
          />
          {errors.college && <p style={errorTextStyle}>{errors.college}</p>}
        </div>

        {/* Question 5: Year of Study */}
        <div style={questionCardStyle}>
          <label style={questionLabelStyle}>
            Current Year of Study <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "8px" }}>
            {["1st Year", "2nd Year", "3rd Year", "4th Year", "Postgraduate / Alumni"].map((yr) => (
              <label key={yr} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "var(--text-primary)", cursor: "pointer" }}>
                <input
                  type="radio"
                  name="year"
                  value={yr}
                  checked={form.year === yr}
                  onChange={(e) => setForm({ ...form, year: e.target.value })}
                  style={{ accentColor: "var(--primary)" }}
                />
                {yr}
              </label>
            ))}
          </div>
        </div>

        {/* Question 6: Event-Specific Question */}
        <div style={questionCardStyle}>
          <label style={questionLabelStyle}>
            {extraQuestion.label} <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "12px" }}>
            Select your specific track or category for {event.title}:
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {extraQuestion.options.map((opt) => (
              <label key={opt} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "var(--text-primary)", cursor: "pointer" }}>
                <input
                  type="radio"
                  name="eventSpecificAnswer"
                  value={opt}
                  checked={form.eventSpecificAnswer === opt}
                  onChange={(e) => {
                    setForm({ ...form, eventSpecificAnswer: e.target.value });
                    setErrors({ ...errors, eventSpecificAnswer: "" });
                  }}
                  style={{ accentColor: "var(--primary)" }}
                />
                {opt}
              </label>
            ))}
          </div>
          {errors.eventSpecificAnswer && <p style={errorTextStyle}>{errors.eventSpecificAnswer}</p>}
        </div>

        {/* Submit Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
          <button
            type="submit"
            className="primary-btn"
            disabled={loading}
            style={{
              padding: "14px 32px",
              fontSize: "15px",
              fontWeight: 700,
              opacity: loading ? 0.75 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Recording Response…" : "Submit Registration"}
          </button>

          <Link href={`/events/${event.id}`} style={{ fontSize: "14px", color: "var(--text-muted)" }}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

const questionCardStyle: React.CSSProperties = {
  background: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: "16px",
  padding: "24px 28px",
  boxShadow: "var(--card-shadow)",
};

const questionLabelStyle: React.CSSProperties = {
  fontSize: "15px",
  fontWeight: 700,
  color: "var(--text-primary)",
  marginBottom: "10px",
  display: "block",
};

const errorTextStyle: React.CSSProperties = {
  color: "#ef4444",
  fontSize: "12px",
  marginTop: "6px",
};
