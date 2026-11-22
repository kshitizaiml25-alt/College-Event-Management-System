"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/context/ToastContext";

export default function ContactPage() {
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((res) => setTimeout(res, 800));
    setLoading(false);
    setSent(true);
    showToast("Message sent! Our team will get back to you shortly.", "success");
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 5000);
  }

  return (
    <section className="section-padding" style={{ minHeight: "calc(100vh - 72px)" }}>
      <div className="container">
        <div style={{ marginBottom: "52px" }}>
          <p style={{ color: "var(--primary)", fontWeight: 600, marginBottom: "8px" }}>Contact Us</p>
          <h1 className="section-heading">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="muted">Have a question or want to list your college club? We&apos;d love to hear from you.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "40px", alignItems: "start" }}>
          {/* Info */}
          <div>
            {[
              { icon: <Mail size={20} />, label: "Email", value: "hello@campushub.in" },
              { icon: <Phone size={20} />, label: "Phone", value: "+91 98765 43210" },
              { icon: <MapPin size={20} />, label: "Location", value: "Bengaluru, Karnataka, India" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "16px", marginBottom: "28px", alignItems: "flex-start" }}>
                <div
                  style={{
                    padding: "12px",
                    borderRadius: "12px",
                    background: "rgba(124, 58, 237, 0.12)",
                    color: "var(--primary)",
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "4px" }}>{item.label}</div>
                  <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-primary)" }}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "20px",
              padding: "36px",
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              boxShadow: "var(--card-shadow)",
            }}
          >
            {sent && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  background: "rgba(34, 197, 94, 0.12)",
                  border: "1px solid rgba(34, 197, 94, 0.3)",
                  color: "#16a34a",
                  fontSize: "14px",
                }}
              >
                <CheckCircle size={18} />
                Message sent successfully! We will reply to your email soon.
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={labelStyle}>Your Name</label>
                <input
                  className="input-field"
                  placeholder="Aryan Mehta"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label style={labelStyle}>Email Address</label>
                <input
                  className="input-field"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Subject</label>
              <input
                className="input-field"
                placeholder="Question about event registration"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                required
              />
            </div>

            <div>
              <label style={labelStyle}>Message</label>
              <textarea
                className="input-field"
                rows={5}
                placeholder="How can we help you?"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                style={{ resize: "vertical" }}
              />
            </div>

            <button
              type="submit"
              className="primary-btn"
              disabled={loading}
              style={{
                width: "fit-content",
                opacity: loading ? 0.75 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Sending…" : <>Send Message <Send size={15} /></>}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

const labelStyle: React.CSSProperties = {
  fontSize: "13px",
  color: "var(--text-secondary)",
  marginBottom: "8px",
  display: "block",
  fontWeight: 500,
};
