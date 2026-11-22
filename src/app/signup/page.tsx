
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CalendarDays, Eye, EyeOff, ArrowRight, CheckCircle } from "lucide-react";
import { saveUser } from "@/lib/auth";

interface FormData { firstName: string; lastName: string; email: string; college: string; password: string; agreed: boolean; }
interface FormErrors { firstName?: string; lastName?: string; email?: string; college?: string; password?: string; agreed?: string; }

export default function SignupPage() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState<FormData>({ firstName: "", lastName: "", email: "", college: "", password: "", agreed: false });
  const [errors, setErrors] = useState<FormErrors>({});

  function validate(): FormErrors {
    const e: FormErrors = {};
    if (!form.firstName.trim()) e.firstName = "First name is required.";
    if (!form.lastName.trim()) e.lastName = "Last name is required.";
    if (!form.email.trim()) { e.email = "Email is required."; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { e.email = "Enter a valid email address."; }
    if (!form.college.trim()) e.college = "College name is required.";
    if (!form.password) { e.password = "Password is required."; }
    else if (form.password.length < 8) { e.password = "Password must be at least 8 characters."; }
    if (!form.agreed) e.agreed = "You must accept the terms to continue.";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1500));
    saveUser({ firstName: form.firstName, lastName: form.lastName, email: form.email });
    window.dispatchEvent(new Event("campushub:auth"));
    setLoading(false);
    setSuccess(true);
    setTimeout(() => router.push("/login"), 2000);
  }

  function field(key: keyof FormData, value: string | boolean) {
    setForm((p) => ({ ...p, [key]: value }));
    setErrors((p) => ({ ...p, [key]: undefined }));
  }

  if (success) {
    return (
      <section style={{ minHeight: "calc(100vh - 76px)", display: "flex", alignItems: "center", background: "#f9fafb" }} className="section-padding">
        <div className="container" style={{ maxWidth: "460px", textAlign: "center" }}>
          <CheckCircle size={64} style={{ color: "#16a34a", margin: "0 auto 20px" }} />
          <h2 style={{ fontSize: "24px", fontWeight: 800, marginBottom: "10px", color: "#111827" }}>Account Created! 🎉</h2>
          <p className="muted">Redirecting you to login…</p>
        </div>
      </section>
    );
  }

  return (
    <section style={{ minHeight: "calc(100vh - 76px)", display: "flex", alignItems: "center", background: "#f3f4f6" }} className="section-padding">
      <div className="container" style={{ maxWidth: "500px" }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "32px", justifyContent: "center" }}>
          <span style={{ background: "#7c3aed", borderRadius: "10px", padding: "8px", display: "inline-flex" }}><CalendarDays size={22} color="white" /></span>
          <span style={{ fontSize: "22px", fontWeight: 800, color: "#111827" }}>Campus<span style={{ color: "#7c3aed" }}>Hub</span></span>
        </div>

        {/* Card */}
        <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "20px", padding: "36px", boxShadow: "0 4px 24px #0000000d" }}>
          <h1 style={{ fontSize: "26px", fontWeight: 800, marginBottom: "6px", textAlign: "center", color: "#111827" }}>Create Account</h1>
          <p className="muted" style={{ textAlign: "center", marginBottom: "28px", fontSize: "14px" }}>Join thousands of students on CampusHub</p>

          <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <div>
                <label style={ls}>First Name</label>
                <input className="input-field" placeholder="Aryan" value={form.firstName} onChange={(e) => field("firstName", e.target.value)} style={errors.firstName ? eb : {}} />
                {errors.firstName && <p style={et}>{errors.firstName}</p>}
              </div>
              <div>
                <label style={ls}>Last Name</label>
                <input className="input-field" placeholder="Mehta" value={form.lastName} onChange={(e) => field("lastName", e.target.value)} style={errors.lastName ? eb : {}} />
                {errors.lastName && <p style={et}>{errors.lastName}</p>}
              </div>
            </div>

            <div>
              <label style={ls}>College Email</label>
              <input className="input-field" type="email" placeholder="you@college.edu" value={form.email} onChange={(e) => field("email", e.target.value)} style={errors.email ? eb : {}} />
              {errors.email && <p style={et}>{errors.email}</p>}
            </div>

            <div>
              <label style={ls}>College Name</label>
              <input className="input-field" placeholder="e.g. VTU Engineering College" value={form.college} onChange={(e) => field("college", e.target.value)} style={errors.college ? eb : {}} />
              {errors.college && <p style={et}>{errors.college}</p>}
            </div>

            <div>
              <label style={ls}>Password</label>
              <div style={{ position: "relative" }}>
                <input className="input-field" type={show ? "text" : "password"} placeholder="Min. 8 characters" value={form.password} onChange={(e) => field("password", e.target.value)} style={{ paddingRight: "44px", ...(errors.password ? eb : {}) }} />
                <button type="button" onClick={() => setShow(!show)} style={{ position: "absolute", right: "13px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#9ca3af", padding: 0 }}>
                  {show ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
              {errors.password && <p style={et}>{errors.password}</p>}
            </div>

            <div>
              <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "13px", color: "#6b7280", cursor: "pointer" }}>
                <input type="checkbox" checked={form.agreed} onChange={(e) => field("agreed", e.target.checked)} style={{ marginTop: "2px", accentColor: "#7c3aed" }} />
                I agree to the{" "}<Link href="#" style={{ color: "#7c3aed" }}>Terms of Service</Link>{" "}and{" "}<Link href="#" style={{ color: "#7c3aed" }}>Privacy Policy</Link>
              </label>
              {errors.agreed && <p style={{ ...et, marginTop: "6px" }}>{errors.agreed}</p>}
            </div>

            <button type="submit" className="primary-btn" disabled={loading} style={{ marginTop: "8px", width: "100%", opacity: loading ? 0.75 : 1, cursor: loading ? "not-allowed" : "pointer" }}>
              {loading ? <><span style={sp} /> Creating Account…</> : <>Create Account <ArrowRight size={16} /></>}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "24px", fontSize: "14px", color: "#6b7280" }}>
            Already have an account?{" "}<Link href="/login" style={{ color: "#7c3aed", fontWeight: 600 }}>Sign in</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

const ls: React.CSSProperties = { fontSize: "13px", color: "#6b7280", marginBottom: "8px", display: "block" };
const eb: React.CSSProperties = { borderColor: "#ef4444" };
const et: React.CSSProperties = { color: "#ef4444", fontSize: "12px", marginTop: "5px" };
const sp: React.CSSProperties = { display: "inline-block", width: "14px", height: "14px", border: "2px solid #ffffff55", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" };
