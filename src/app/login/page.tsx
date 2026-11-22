
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CalendarDays, Eye, EyeOff } from "lucide-react";
import { saveUser, getUser } from "@/lib/auth";

interface FormErrors { email?: string; password?: string; }

export default function LoginPage() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({});

  function validate(): FormErrors {
    const e: FormErrors = {};
    if (!form.email.trim()) { e.email = "Email is required."; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { e.email = "Enter a valid email address."; }
    if (!form.password) e.password = "Password is required.";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1500));
    const existing = getUser();
    if (!existing || existing.email !== form.email) {
      const namePart = form.email.split("@")[0].replace(/[._]/g, " ");
      const parts = namePart.split(" ");
      const firstName = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
      const lastName = parts[1] ? parts[1].charAt(0).toUpperCase() + parts[1].slice(1) : "·";
      saveUser({ firstName, lastName, email: form.email });
    }
    window.dispatchEvent(new Event("campushub:auth"));
    setLoading(false);
    router.push("/");
  }

  function field(key: keyof typeof form, value: string) {
    setForm((p) => ({ ...p, [key]: value }));
    setErrors((p) => ({ ...p, [key]: undefined }));
  }

  return (
    <section style={{ minHeight: "calc(100vh - 76px)", display: "flex", alignItems: "center", background: "#f3f4f6" }} className="section-padding">
      <div className="container" style={{ maxWidth: "460px" }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "32px", justifyContent: "center" }}>
          <span style={{ background: "#7c3aed", borderRadius: "10px", padding: "8px", display: "inline-flex" }}><CalendarDays size={22} color="white" /></span>
          <span style={{ fontSize: "22px", fontWeight: 800, color: "#111827" }}>Campus<span style={{ color: "#7c3aed" }}>Hub</span></span>
        </div>

        {/* Card */}
        <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "20px", padding: "36px", boxShadow: "0 4px 24px #0000000d" }}>
          <h1 style={{ fontSize: "26px", fontWeight: 800, marginBottom: "6px", textAlign: "center", color: "#111827" }}>Welcome Back</h1>
          <p className="muted" style={{ textAlign: "center", marginBottom: "28px", fontSize: "14px" }}>Sign in to your CampusHub account</p>

          <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={ls}>Email Address</label>
              <input className="input-field" type="email" placeholder="you@college.edu" value={form.email} onChange={(e) => field("email", e.target.value)} style={errors.email ? eb : {}} />
              {errors.email && <p style={et}>{errors.email}</p>}
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <label style={{ fontSize: "13px", color: "#6b7280" }}>Password</label>
                <Link href="#" style={{ fontSize: "13px", color: "#7c3aed" }}>Forgot password?</Link>
              </div>
              <div style={{ position: "relative" }}>
                <input className="input-field" type={show ? "text" : "password"} placeholder="••••••••" value={form.password} onChange={(e) => field("password", e.target.value)} style={{ paddingRight: "44px", ...(errors.password ? eb : {}) }} />
                <button type="button" onClick={() => setShow(!show)} style={{ position: "absolute", right: "13px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#9ca3af", padding: 0 }}>
                  {show ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
              {errors.password && <p style={et}>{errors.password}</p>}
            </div>

            <button type="submit" className="primary-btn" disabled={loading} style={{ marginTop: "8px", width: "100%", opacity: loading ? 0.75 : 1, cursor: loading ? "not-allowed" : "pointer" }}>
              {loading ? <><span style={sp} /> Signing In…</> : "Sign In"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "24px", fontSize: "14px", color: "#6b7280" }}>
            Don&apos;t have an account?{" "}<Link href="/signup" style={{ color: "#7c3aed", fontWeight: 600 }}>Sign up free</Link>
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
