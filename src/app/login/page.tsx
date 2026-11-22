"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CalendarDays, Eye, EyeOff, Lock, Mail, AlertCircle, Sparkles } from "lucide-react";
import { authenticateUser } from "@/lib/auth";
import { useToast } from "@/context/ToastContext";

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({});

  function validate(): FormErrors {
    const e: FormErrors = {};
    if (!form.email.trim()) {
      e.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Enter a valid email address.";
    }
    if (!form.password) {
      e.password = "Password is required.";
    }
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);

    // Simulate standard network delay
    await new Promise((res) => setTimeout(res, 600));

    // STRICT AUTHENTICATION CHECK
    const result = authenticateUser(form.email, form.password);

    if (!result.success) {
      setLoading(false);
      const msg = result.error || "Authentication failed.";

      if (msg.toLowerCase().includes("email") || msg.toLowerCase().includes("account")) {
        setErrors({ email: msg });
      } else if (msg.toLowerCase().includes("password")) {
        setErrors({ password: msg });
      } else {
        setErrors({ general: msg });
      }

      showToast(msg, "error");
      return;
    }

    showToast(`Welcome back, ${result.user?.firstName}!`, "success");
    setLoading(false);
    router.push("/dashboard");
  }

  function field(key: keyof typeof form, value: string) {
    setForm((p) => ({ ...p, [key]: value }));
    setErrors((p) => ({ ...p, [key]: undefined, general: undefined }));
  }

  function fillDemo(email: string, pass: string) {
    setForm({ email, password: pass });
    setErrors({});
  }

  return (
    <section
      style={{
        minHeight: "calc(100vh - 76px)",
        display: "flex",
        alignItems: "center",
        background: "var(--background)",
        transition: "background 0.25s",
      }}
      className="section-padding"
    >
      <div className="container" style={{ maxWidth: "460px" }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px", justifyContent: "center" }}>
          <span
            style={{
              background: "linear-gradient(135deg, #7c3aed, #db2777)",
              borderRadius: "10px",
              padding: "8px",
              display: "inline-flex",
            }}
          >
            <CalendarDays size={22} color="white" />
          </span>
          <span style={{ fontSize: "22px", fontWeight: 800, color: "var(--text-primary)" }}>
            Campus<span style={{ color: "var(--primary)" }}>Hub</span>
          </span>
        </div>

        {/* Card */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "20px",
            padding: "36px",
            boxShadow: "var(--card-shadow)",
            transition: "background 0.25s, border-color 0.25s",
          }}
        >
          <h1
            style={{
              fontSize: "26px",
              fontWeight: 800,
              marginBottom: "6px",
              textAlign: "center",
              color: "var(--text-primary)",
            }}
          >
            Welcome Back
          </h1>
          <p className="muted" style={{ textAlign: "center", marginBottom: "24px", fontSize: "14px" }}>
            Sign in to your CampusHub account
          </p>

          {errors.general && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 14px",
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                borderRadius: "10px",
                color: "#ef4444",
                fontSize: "13px",
                marginBottom: "16px",
              }}
            >
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{errors.general}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={labelStyle}>Email Address</label>
              <div style={{ position: "relative" }}>
                <input
                  className="input-field"
                  type="email"
                  placeholder="you@college.edu"
                  value={form.email}
                  onChange={(e) => field("email", e.target.value)}
                  style={{
                    paddingLeft: "38px",
                    ...(errors.email ? errorBorder : {}),
                  }}
                />
                <Mail
                  size={16}
                  style={{
                    position: "absolute",
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--text-muted)",
                  }}
                />
              </div>
              {errors.email && <p style={errorText}>{errors.email}</p>}
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <label style={labelStyle}>Password</label>
                <Link
                  href="/faq"
                  style={{ fontSize: "12px", color: "var(--primary)", fontWeight: 500 }}
                >
                  Forgot password?
                </Link>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  className="input-field"
                  type={show ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => field("password", e.target.value)}
                  style={{
                    paddingLeft: "38px",
                    paddingRight: "44px",
                    ...(errors.password ? errorBorder : {}),
                  }}
                />
                <Lock
                  size={16}
                  style={{
                    position: "absolute",
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--text-muted)",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  aria-label={show ? "Hide password" : "Show password"}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    color: "var(--text-muted)",
                    padding: 0,
                    cursor: "pointer",
                  }}
                >
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p style={errorText}>{errors.password}</p>}
            </div>

            <button
              type="submit"
              className="primary-btn"
              disabled={loading}
              style={{
                marginTop: "8px",
                width: "100%",
                opacity: loading ? 0.75 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? (
                <>
                  <span style={spinner} /> Signing In…
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Quick Demo Credentials */}
          <div
            style={{
              marginTop: "22px",
              padding: "12px 14px",
              background: "var(--surface-alt)",
              borderRadius: "12px",
              border: "1px dashed var(--border)",
              fontSize: "12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "6px" }}>
              <Sparkles size={13} style={{ color: "var(--primary)" }} />
              Quick Demo Accounts
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={() => fillDemo("student@college.edu", "password123")}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "6px",
                  padding: "4px 8px",
                  fontSize: "11px",
                  color: "var(--primary)",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Use Student Demo
              </button>
              <button
                type="button"
                onClick={() => fillDemo("organizer@college.edu", "organizer123")}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "6px",
                  padding: "4px 8px",
                  fontSize: "11px",
                  color: "var(--primary)",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Use Organizer Demo
              </button>
            </div>
          </div>

          <p style={{ textAlign: "center", marginTop: "24px", fontSize: "14px", color: "var(--text-muted)" }}>
            Don&apos;t have an account?{" "}
            <Link href="/signup" style={{ color: "var(--primary)", fontWeight: 600 }}>
              Sign up free
            </Link>
          </p>
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

const errorBorder: React.CSSProperties = {
  borderColor: "#ef4444",
};

const errorText: React.CSSProperties = {
  color: "#ef4444",
  fontSize: "12px",
  marginTop: "5px",
};

const spinner: React.CSSProperties = {
  display: "inline-block",
  width: "14px",
  height: "14px",
  border: "2px solid rgba(255, 255, 255, 0.4)",
  borderTopColor: "#fff",
  borderRadius: "50%",
  animation: "spin 0.7s linear infinite",
};
