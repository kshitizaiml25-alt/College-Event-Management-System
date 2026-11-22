"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CalendarDays, Eye, EyeOff, ArrowRight, CheckCircle, Mail, User, Building, Lock } from "lucide-react";
import { registerAccount } from "@/lib/auth";
import { useToast } from "@/context/ToastContext";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  college: string;
  password: string;
  confirmPassword: string;
  agreed: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  college?: string;
  password?: string;
  confirmPassword?: string;
  agreed?: string;
  general?: string;
}

export default function SignupPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    college: "",
    password: "",
    confirmPassword: "",
    agreed: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  function validate(): FormErrors {
    const e: FormErrors = {};
    if (!form.firstName.trim()) e.firstName = "First name is required.";
    if (!form.lastName.trim()) e.lastName = "Last name is required.";
    if (!form.email.trim()) {
      e.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Enter a valid email address.";
    }
    if (!form.college.trim()) e.college = "College name is required.";
    if (!form.password) {
      e.password = "Password is required.";
    } else if (form.password.length < 8) {
      e.password = "Password must be at least 8 characters.";
    }
    if (form.password !== form.confirmPassword) {
      e.confirmPassword = "Passwords do not match.";
    }
    if (!form.agreed) e.agreed = "You must accept the terms to continue.";
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
    await new Promise((res) => setTimeout(res, 700));

    // Register into the accounts database
    const result = registerAccount({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      college: form.college,
      password: form.password,
    });

    if (!result.success) {
      setLoading(false);
      const msg = result.error || "Registration failed.";
      if (msg.toLowerCase().includes("email")) {
        setErrors({ email: msg });
      } else {
        setErrors({ general: msg });
      }
      showToast(msg, "error");
      return;
    }

    setLoading(false);
    setSuccess(true);
    showToast("Account created successfully! Welcome to CampusHub.", "success");
    setTimeout(() => {
      router.push("/dashboard");
    }, 1800);
  }

  function field(key: keyof FormData, value: string | boolean) {
    setForm((p) => ({ ...p, [key]: value }));
    setErrors((p) => ({ ...p, [key]: undefined, general: undefined }));
  }

  if (success) {
    return (
      <section
        style={{
          minHeight: "calc(100vh - 76px)",
          display: "flex",
          alignItems: "center",
          background: "var(--background)",
        }}
        className="section-padding"
      >
        <div className="container" style={{ maxWidth: "460px", textAlign: "center" }}>
          <CheckCircle size={64} style={{ color: "#16a34a", margin: "0 auto 20px" }} />
          <h2 style={{ fontSize: "26px", fontWeight: 800, marginBottom: "10px", color: "var(--text-primary)" }}>
            Account Created! 🎉
          </h2>
          <p className="muted" style={{ marginBottom: "20px" }}>
            Welcome to CampusHub! Taking you to your student dashboard…
          </p>
          <div
            style={{
              width: "36px",
              height: "36px",
              border: "3px solid var(--border)",
              borderTopColor: "var(--primary)",
              borderRadius: "50%",
              animation: "spin 0.7s linear infinite",
              margin: "0 auto",
            }}
          />
        </div>
      </section>
    );
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
      <div className="container" style={{ maxWidth: "520px" }}>
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
            Create Account
          </h1>
          <p className="muted" style={{ textAlign: "center", marginBottom: "28px", fontSize: "14px" }}>
            Join thousands of students on CampusHub
          </p>

          <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <div>
                <label style={labelStyle}>First Name</label>
                <div style={{ position: "relative" }}>
                  <input
                    className="input-field"
                    placeholder="Aryan"
                    value={form.firstName}
                    onChange={(e) => field("firstName", e.target.value)}
                    style={{
                      paddingLeft: "36px",
                      ...(errors.firstName ? errorBorder : {}),
                    }}
                  />
                  <User
                    size={15}
                    style={{
                      position: "absolute",
                      left: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "var(--text-muted)",
                    }}
                  />
                </div>
                {errors.firstName && <p style={errorText}>{errors.firstName}</p>}
              </div>

              <div>
                <label style={labelStyle}>Last Name</label>
                <input
                  className="input-field"
                  placeholder="Mehta"
                  value={form.lastName}
                  onChange={(e) => field("lastName", e.target.value)}
                  style={errors.lastName ? errorBorder : {}}
                />
                {errors.lastName && <p style={errorText}>{errors.lastName}</p>}
              </div>
            </div>

            <div>
              <label style={labelStyle}>College Email</label>
              <div style={{ position: "relative" }}>
                <input
                  className="input-field"
                  type="email"
                  placeholder="you@college.edu"
                  value={form.email}
                  onChange={(e) => field("email", e.target.value)}
                  style={{
                    paddingLeft: "36px",
                    ...(errors.email ? errorBorder : {}),
                  }}
                />
                <Mail
                  size={15}
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
              <label style={labelStyle}>College / University</label>
              <div style={{ position: "relative" }}>
                <input
                  className="input-field"
                  placeholder="e.g. VTU Engineering College"
                  value={form.college}
                  onChange={(e) => field("college", e.target.value)}
                  style={{
                    paddingLeft: "36px",
                    ...(errors.college ? errorBorder : {}),
                  }}
                />
                <Building
                  size={15}
                  style={{
                    position: "absolute",
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--text-muted)",
                  }}
                />
              </div>
              {errors.college && <p style={errorText}>{errors.college}</p>}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <div>
                <label style={labelStyle}>Password</label>
                <div style={{ position: "relative" }}>
                  <input
                    className="input-field"
                    type={show ? "text" : "password"}
                    placeholder="Min 8 chars"
                    value={form.password}
                    onChange={(e) => field("password", e.target.value)}
                    style={{
                      paddingLeft: "36px",
                      paddingRight: "36px",
                      ...(errors.password ? errorBorder : {}),
                    }}
                  />
                  <Lock
                    size={15}
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
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      color: "var(--text-muted)",
                      padding: 0,
                      cursor: "pointer",
                    }}
                  >
                    {show ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {errors.password && <p style={errorText}>{errors.password}</p>}
              </div>

              <div>
                <label style={labelStyle}>Confirm</label>
                <input
                  className="input-field"
                  type={show ? "text" : "password"}
                  placeholder="Re-enter"
                  value={form.confirmPassword}
                  onChange={(e) => field("confirmPassword", e.target.value)}
                  style={errors.confirmPassword ? errorBorder : {}}
                />
                {errors.confirmPassword && <p style={errorText}>{errors.confirmPassword}</p>}
              </div>
            </div>

            <div>
              <label
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  fontSize: "13px",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={form.agreed}
                  onChange={(e) => field("agreed", e.target.checked)}
                  style={{ marginTop: "2px", accentColor: "var(--primary)" }}
                />
                <span>
                  I agree to the{" "}
                  <Link href="/terms" style={{ color: "var(--primary)", textDecoration: "underline" }}>
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" style={{ color: "var(--primary)", textDecoration: "underline" }}>
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {errors.agreed && <p style={{ ...errorText, marginTop: "6px" }}>{errors.agreed}</p>}
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
                  <span style={spinner} /> Creating Account…
                </>
              ) : (
                <>
                  Create Account <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "24px", fontSize: "14px", color: "var(--text-muted)" }}>
            Already have an account?{" "}
            <Link href="/login" style={{ color: "var(--primary)", fontWeight: 600 }}>
              Sign in
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
