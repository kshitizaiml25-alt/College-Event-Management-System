
"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", subject: "", message: "" });
  }

  return (
    <section className="section-padding">
      <div className="container">
        <div style={{ marginBottom: "52px" }}>
          <p style={{ color: "#7c3aed", fontWeight: 600, marginBottom: "8px" }}>Contact Us</p>
          <h1 className="section-heading">Get in <span className="gradient-text">Touch</span></h1>
          <p className="muted">Have a question or want to partner with us? We'd love to hear from you.</p>
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
                <div style={{ padding: "12px", borderRadius: "10px", background: "#ede9fe", color: "#7c3aed", flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: "13px", color: "#9ca3af", marginBottom: "4px" }}>{item.label}</div>
                  <div style={{ fontSize: "15px", fontWeight: 500, color: "#111827" }}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "18px", padding: "36px", display: "flex", flexDirection: "column", gap: "18px", boxShadow: "0 1px 3px #0000000a" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={labelStyle}>Your Name</label>
                <input className="input-field" placeholder="Aryan Mehta" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div>
                <label style={labelStyle}>Email Address</label>
                <input className="input-field" type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Subject</label>
              <input className="input-field" placeholder="How can we help?" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required />
            </div>
            <div>
              <label style={labelStyle}>Message</label>
              <textarea className="input-field" rows={5} placeholder="Tell us more..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required style={{ resize: "vertical" }} />
            </div>
            <button type="submit" className="primary-btn" style={{ marginTop: "4px" }}>
              {sent ? "✓ Message Sent!" : <><Send size={16} /> Send Message</>}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

const labelStyle: React.CSSProperties = { fontSize: "13px", color: "#6b7280", marginBottom: "8px", display: "block" };
