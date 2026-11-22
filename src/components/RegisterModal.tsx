
"use client";

import { useState } from "react";
import { X, CheckCircle, ExternalLink } from "lucide-react";

interface Props { eventTitle: string; eventDate: string; formUrl: string; onClose: () => void; }
interface RegForm { name: string; email: string; phone: string; year: string; college: string; }
interface RegErrors { name?: string; email?: string; phone?: string; year?: string; college?: string; }

function isRealFormUrl(url: string): boolean {
  return url.startsWith("https://forms.gle/") && !url.includes("your-") && url.length > 25;
}

export default function RegisterModal({ eventTitle, eventDate, formUrl, onClose }: Props) {
  const [form, setForm] = useState<RegForm>({ name: "", email: "", phone: "", year: "", college: "" });
  const [errors, setErrors] = useState<RegErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const hasGoogleForm = isRealFormUrl(formUrl);

  function validate(): RegErrors {
    const e: RegErrors = {};
    if (!form.name.trim()) e.name = "Full name is required.";
    if (!form.email.trim()) { e.email = "Email is required."; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { e.email = "Enter a valid email."; }
    if (!form.phone.trim()) { e.phone = "Phone number is required."; }
    else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ""))) { e.phone = "Enter a valid 10-digit mobile number."; }
    if (!form.year) e.year = "Select your year of study.";
    if (!form.college.trim()) e.college = "College name is required.";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSuccess(true);
  }

  function field(key: keyof RegForm, value: string) {
    setForm((p) => ({ ...p, [key]: value }));
    setErrors((p) => ({ ...p, [key]: undefined }));
  }

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(6px)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "20px", padding: "36px", width: "100%", maxWidth: "500px", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 24px 64px #00000020", animation: "modalIn 0.25s ease" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
          <div>
            <h2 style={{ fontSize: "20px", fontWeight: 800, marginBottom: "4px", color: "#111827" }}>Event Registration</h2>
            <p style={{ fontSize: "13px", color: "#7c3aed", fontWeight: 600 }}>{eventTitle}</p>
            <p style={{ fontSize: "12px", color: "#9ca3af", marginTop: "2px" }}>📅 {eventDate}</p>
          </div>
          <button onClick={onClose} style={{ background: "#f3f4f6", border: "none", borderRadius: "8px", padding: "8px", cursor: "pointer", color: "#6b7280", display: "flex" }}>
            <X size={18} />
          </button>
        </div>

        {success ? (
          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <CheckCircle size={56} style={{ color: "#16a34a", margin: "0 auto 16px" }} />
            <h3 style={{ fontSize: "20px", fontWeight: 800, marginBottom: "8px", color: "#111827" }}>Registered Successfully! 🎉</h3>
            <p className="muted" style={{ marginBottom: "24px", fontSize: "14px" }}>
              You&apos;re in! Confirmation will be sent to <strong style={{ color: "#111827" }}>{form.email}</strong>
            </p>
            {hasGoogleForm && (
              <a href={formUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#7c3aed", marginBottom: "16px" }}>
                Also fill the Google Form <ExternalLink size={13} />
              </a>
            )}
            <br />
            <button onClick={onClose} className="primary-btn" style={{ marginTop: "12px" }}>Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div>
              <label style={ls}>Full Name</label>
              <input className="input-field" placeholder="Aryan Mehta" value={form.name} onChange={(e) => field("name", e.target.value)} style={errors.name ? eb : {}} />
              {errors.name && <p style={et}>{errors.name}</p>}
            </div>
            <div>
              <label style={ls}>Email Address</label>
              <input className="input-field" type="email" placeholder="you@college.edu" value={form.email} onChange={(e) => field("email", e.target.value)} style={errors.email ? eb : {}} />
              {errors.email && <p style={et}>{errors.email}</p>}
            </div>
            <div>
              <label style={ls}>Phone Number</label>
              <input className="input-field" type="tel" placeholder="98765 43210" value={form.phone} onChange={(e) => field("phone", e.target.value)} style={errors.phone ? eb : {}} />
              {errors.phone && <p style={et}>{errors.phone}</p>}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "12px" }}>
              <div>
                <label style={ls}>Year of Study</label>
                <select className="input-field" value={form.year} onChange={(e) => field("year", e.target.value)} style={{ ...(errors.year ? eb : {}), appearance: "none", cursor: "pointer" }}>
                  <option value="">Select</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                  <option value="pg">PG / Other</option>
                </select>
                {errors.year && <p style={et}>{errors.year}</p>}
              </div>
              <div>
                <label style={ls}>College Name</label>
                <input className="input-field" placeholder="Your college" value={form.college} onChange={(e) => field("college", e.target.value)} style={errors.college ? eb : {}} />
                {errors.college && <p style={et}>{errors.college}</p>}
              </div>
            </div>

            {hasGoogleForm && (
              <p style={{ fontSize: "12px", color: "#9ca3af" }}>
                You can also{" "}
                <a href={formUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#7c3aed" }}>register via Google Form ↗</a>
              </p>
            )}

            <button type="submit" className="primary-btn" disabled={loading} style={{ marginTop: "6px", width: "100%", opacity: loading ? 0.75 : 1, cursor: loading ? "not-allowed" : "pointer" }}>
              {loading ? <><span style={sp} /> Submitting…</> : "Confirm Registration"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

const ls: React.CSSProperties = { fontSize: "13px", color: "#6b7280", marginBottom: "7px", display: "block" };
const eb: React.CSSProperties = { borderColor: "#ef4444" };
const et: React.CSSProperties = { color: "#ef4444", fontSize: "12px", marginTop: "4px" };
const sp: React.CSSProperties = { display: "inline-block", width: "13px", height: "13px", border: "2px solid #ffffff55", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" };
