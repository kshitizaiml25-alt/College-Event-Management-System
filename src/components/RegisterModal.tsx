"use client";

import { useState } from "react";
import { X, CheckCircle, ExternalLink, Copy, Check } from "lucide-react";
import { addRegistration, isAlreadyRegistered } from "@/lib/registrations";
import { useToast } from "@/context/ToastContext";

interface Props {
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventVenue: string;
  eventCategory: string;
  formUrl: string;
  onClose: () => void;
}

interface RegForm {
  name: string;
  email: string;
  phone: string;
  year: string;
  college: string;
}

interface RegErrors {
  name?: string;
  email?: string;
  phone?: string;
  year?: string;
  college?: string;
}

function isRealFormUrl(url: string): boolean {
  return url.startsWith("https://forms.gle/") && !url.includes("your-") && url.length > 25;
}

export default function RegisterModal({
  eventId,
  eventTitle,
  eventDate,
  eventVenue,
  eventCategory,
  formUrl,
  onClose,
}: Props) {
  const { showToast } = useToast();
  const [form, setForm] = useState<RegForm>({ name: "", email: "", phone: "", year: "", college: "" });
  const [errors, setErrors] = useState<RegErrors>({});
  const [loading, setLoading] = useState(false);
  const [confirmationId, setConfirmationId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const hasGoogleForm = isRealFormUrl(formUrl);

  function validate(): RegErrors {
    const e: RegErrors = {};
    if (!form.name.trim()) e.name = "Full name is required.";
    if (!form.email.trim()) {
      e.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Enter a valid email.";
    }
    if (!form.phone.trim()) {
      e.phone = "Phone number is required.";
    } else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ""))) {
      e.phone = "Enter a valid 10-digit number.";
    }
    if (!form.year) e.year = "Select your year of study.";
    if (!form.college.trim()) e.college = "College name is required.";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    // Check duplicate registration
    if (isAlreadyRegistered(eventId, form.email)) {
      showToast("You have already registered for this event.", "warning");
      setErrors({ email: "This email is already registered for this event." });
      return;
    }

    setErrors({});
    setLoading(true);

    await new Promise((res) => setTimeout(res, 800));

    const reg = addRegistration({
      eventId,
      eventTitle,
      eventDate,
      eventVenue,
      eventCategory,
      name: form.name,
      email: form.email,
      phone: form.phone,
      college: form.college,
      year: form.year,
    });

    setLoading(false);
    setConfirmationId(reg.confirmationId);
    showToast("Registration successful! Check your confirmation ID.", "success");
  }

  function copyId() {
    if (!confirmationId) return;
    navigator.clipboard.writeText(confirmationId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        background: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(6px)",
      }}
    >
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "500px",
          padding: "32px",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4)",
          animation: "modalIn 0.2s ease-out",
          position: "relative",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "none",
            border: "none",
            color: "var(--text-muted)",
            cursor: "pointer",
            padding: "4px",
          }}
        >
          <X size={20} />
        </button>

        {confirmationId ? (
          /* Confirmation state */
          <div style={{ textAlign: "center", padding: "16px 0 8px" }}>
            <CheckCircle size={56} style={{ color: "#16a34a", margin: "0 auto 16px" }} />
            <h2 style={{ fontSize: "22px", fontWeight: 800, marginBottom: "8px", color: "var(--text-primary)" }}>
              Registration Confirmed! 🎉
            </h2>
            <p className="muted" style={{ fontSize: "14px", marginBottom: "20px" }}>
              You are officially registered for <strong>{eventTitle}</strong>.
            </p>

            {/* Confirmation card */}
            <div
              style={{
                background: "var(--surface-alt)",
                border: "1px solid var(--border)",
                borderRadius: "14px",
                padding: "18px",
                marginBottom: "24px",
                textAlign: "left",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>Confirmation ID</span>
                <button
                  onClick={copyId}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    fontSize: "12px",
                    color: "var(--primary)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  {copied ? <><Check size={13} /> Copied</> : <><Copy size={13} /> Copy</>}
                </button>
              </div>
              <p style={{ fontFamily: "monospace", fontSize: "18px", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "0.05em", margin: 0 }}>
                {confirmationId}
              </p>
              <hr style={{ borderColor: "var(--border)", margin: "12px 0 10px" }} />
              <div style={{ fontSize: "12px", color: "var(--text-muted)", display: "flex", flexDirection: "column", gap: "4px" }}>
                <span>📅 {eventDate}</span>
                <span>📍 {eventVenue}</span>
                <span>👤 {form.name} ({form.email})</span>
              </div>
            </div>

            <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "20px" }}>
              Please take a screenshot of your Confirmation ID to show at the venue desk.
            </p>

            <button onClick={onClose} className="primary-btn" style={{ width: "100%" }}>
              Done
            </button>
          </div>
        ) : (
          /* Form state */
          <>
            <div style={{ marginBottom: "20px" }}>
              <span
                style={{
                  display: "inline-block",
                  fontSize: "11px",
                  fontWeight: 700,
                  padding: "2px 8px",
                  borderRadius: "999px",
                  background: "rgba(124, 58, 237, 0.15)",
                  color: "var(--primary)",
                  marginBottom: "6px",
                }}
              >
                {eventCategory}
              </span>
              <h2 style={{ fontSize: "20px", fontWeight: 800, color: "var(--text-primary)", margin: 0 }}>
                Register for {eventTitle}
              </h2>
              <p className="muted" style={{ fontSize: "13px", marginTop: "4px" }}>
                {eventDate} • {eventVenue}
              </p>
            </div>

            {hasGoogleForm && (
              <div
                style={{
                  padding: "10px 14px",
                  background: "rgba(124, 58, 237, 0.1)",
                  border: "1px solid rgba(124, 58, 237, 0.25)",
                  borderRadius: "10px",
                  marginBottom: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "13px",
                }}
              >
                <span style={{ color: "var(--text-primary)" }}>Prefer Google Form?</span>
                <a
                  href={formUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    color: "var(--primary)",
                    fontWeight: 600,
                  }}
                >
                  Open Form <ExternalLink size={13} />
                </a>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={labelStyle}>Full Name</label>
                <input
                  className="input-field"
                  placeholder="Aryan Mehta"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={errors.name ? errorBorder : {}}
                />
                {errors.name && <p style={errorText}>{errors.name}</p>}
              </div>

              <div>
                <label style={labelStyle}>Email Address</label>
                <input
                  className="input-field"
                  type="email"
                  placeholder="you@college.edu"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={errors.email ? errorBorder : {}}
                />
                {errors.email && <p style={errorText}>{errors.email}</p>}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "12px" }}>
                <div>
                  <label style={labelStyle}>Phone Number</label>
                  <input
                    className="input-field"
                    placeholder="9876543210"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    style={errors.phone ? errorBorder : {}}
                  />
                  {errors.phone && <p style={errorText}>{errors.phone}</p>}
                </div>

                <div>
                  <label style={labelStyle}>Year of Study</label>
                  <select
                    className="input-field"
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: e.target.value })}
                    style={{ ...errors.year ? errorBorder : {}, cursor: "pointer" }}
                  >
                    <option value="">Select Year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="Postgraduate">Postgraduate</option>
                  </select>
                  {errors.year && <p style={errorText}>{errors.year}</p>}
                </div>
              </div>

              <div>
                <label style={labelStyle}>College / Institution Name</label>
                <input
                  className="input-field"
                  placeholder="e.g. VTU Engineering College"
                  value={form.college}
                  onChange={(e) => setForm({ ...form, college: e.target.value })}
                  style={errors.college ? errorBorder : {}}
                />
                {errors.college && <p style={errorText}>{errors.college}</p>}
              </div>

              <button
                type="submit"
                className="primary-btn"
                disabled={loading}
                style={{
                  marginTop: "6px",
                  width: "100%",
                  opacity: loading ? 0.75 : 1,
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "Confirming Registration…" : "Complete Registration"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  fontSize: "12px",
  color: "var(--text-secondary)",
  marginBottom: "6px",
  display: "block",
  fontWeight: 500,
};

const errorBorder: React.CSSProperties = {
  borderColor: "#ef4444",
};

const errorText: React.CSSProperties = {
  color: "#ef4444",
  fontSize: "11px",
  marginTop: "4px",
};
