"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { CalendarDays, Menu, X, ArrowRight, LogOut, ChevronDown, LayoutDashboard } from "lucide-react";
import { getUser, logoutUser, getInitials, type AuthUser } from "@/lib/auth";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { name: "Home",    href: "/" },
  { name: "Events",  href: "/events" },
  { name: "About",   href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const router   = useRouter();
  const pathname = usePathname();
  const [open,     setOpen]     = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [user,     setUser]     = useState<AuthUser | null>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onAuth() {
      setUser(getUser());
    }
    window.addEventListener("campushub:auth", onAuth);
    return () => window.removeEventListener("campushub:auth", onAuth);
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleLogout() {
    logoutUser();
    setUser(null);
    setDropOpen(false);
    router.push("/");
  }

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "var(--nav-bg)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--border)",
        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.05)",
        transition: "background 0.25s, border-color 0.25s",
      }}
    >
      <nav
        className="container"
        style={{
          display: "flex",
          height: "72px",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
          <span
            style={{
              background: "linear-gradient(135deg, #7c3aed, #db2777)",
              borderRadius: "10px",
              padding: "8px",
              display: "inline-flex",
            }}
          >
            <CalendarDays size={20} color="white" />
          </span>
          <span style={{ fontSize: "19px", fontWeight: 800, color: "var(--text-primary)" }}>
            Campus<span style={{ color: "var(--primary)" }}>Hub</span>
          </span>
        </Link>

        {/* Desktop nav links (hidden on mobile via CSS class) */}
        <div className="nav-desktop-links">
          {links.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                style={{
                  fontSize: "14px",
                  fontWeight: active ? 600 : 500,
                  color: active ? "var(--primary)" : "var(--text-secondary)",
                  borderBottom: active ? "2px solid var(--primary)" : "2px solid transparent",
                  paddingBottom: "2px",
                  transition: "color 0.2s, border-color 0.2s",
                }}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Desktop right (Theme toggle + auth) — hidden on mobile via CSS class */}
        <div className="nav-desktop-actions">
          {/* Exactly ONE theme toggle on desktop */}
          <ThemeToggle />

          {user ? (
            <div ref={dropRef} style={{ position: "relative" }}>
              <button
                onClick={() => setDropOpen(!dropOpen)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  padding: "6px 14px",
                  cursor: "pointer",
                  transition: "0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg,#7c3aed,#db2777)",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "white",
                    flexShrink: 0,
                  }}
                >
                  {getInitials(user.firstName, user.lastName)}
                </span>
                <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>
                  {user.firstName}
                </span>
                <ChevronDown
                  size={14}
                  style={{
                    color: "var(--text-muted)",
                    transition: "transform 0.2s",
                    transform: dropOpen ? "rotate(180deg)" : "none",
                  }}
                />
              </button>

              {dropOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 10px)",
                    right: 0,
                    minWidth: "230px",
                    background: "var(--dropdown-bg)",
                    border: "1px solid var(--border)",
                    borderRadius: "14px",
                    padding: "8px",
                    boxShadow: "0 16px 48px rgba(0,0,0,0.2)",
                    zIndex: 100,
                  }}
                >
                  <div
                    style={{
                      padding: "10px 12px 14px",
                      borderBottom: "1px solid var(--border)",
                      marginBottom: "6px",
                    }}
                  >
                    <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "2px" }}>
                      {user.firstName} {user.lastName}
                    </p>
                    <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>{user.email}</p>
                    {user.college && (
                      <p style={{ fontSize: "11px", color: "var(--primary)", marginTop: "4px" }}>
                        {user.college}
                      </p>
                    )}
                  </div>
                  <Link
                    href="/dashboard"
                    onClick={() => setDropOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px 12px",
                      borderRadius: "8px",
                      color: "var(--text-primary)",
                      fontSize: "14px",
                      transition: "0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-alt)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                  >
                    <LayoutDashboard size={15} style={{ color: "var(--primary)" }} /> My Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: "8px",
                      background: "none",
                      border: "none",
                      color: "#ef4444",
                      fontSize: "14px",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                  >
                    <LogOut size={15} /> Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                style={{
                  fontSize: "14px",
                  color: "var(--text-secondary)",
                  fontWeight: 500,
                  padding: "8px 14px",
                }}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="primary-btn"
                style={{ padding: "9px 18px", fontSize: "14px" }}
              >
                Get Started <ArrowRight size={15} />
              </Link>
            </>
          )}
        </div>

        {/* Mobile controls (Theme toggle + hamburger) — ONLY visible on mobile screens <=768px */}
        <div className="nav-mobile-actions">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation menu"
            style={{
              color: "var(--text-primary)",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "10px",
              padding: "7px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu dropdown */}
      {open && (
        <div
          className="container md:hidden"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            borderTop: "1px solid var(--border)",
            padding: "20px 0 24px",
            background: "var(--nav-bg)",
          }}
        >
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              style={{
                color: isActive(link.href) ? "var(--primary)" : "var(--text-primary)",
                fontWeight: isActive(link.href) ? 600 : 500,
                fontSize: "15px",
              }}
            >
              {link.name}
            </Link>
          ))}

          {user ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", paddingTop: "8px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px",
                  background: "var(--surface-alt)",
                  borderRadius: "12px",
                  border: "1px solid var(--border)",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg,#7c3aed,#db2777)",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "white",
                    flexShrink: 0,
                  }}
                >
                  {getInitials(user.firstName, user.lastName)}
                </span>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>
                    {user.firstName} {user.lastName}
                  </p>
                  <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>{user.email}</p>
                </div>
              </div>
              <Link
                href="/dashboard"
                style={{ color: "var(--primary)", fontWeight: 600, fontSize: "15px" }}
              >
                My Dashboard
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#ef4444",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                  padding: 0,
                }}
              >
                <LogOut size={15} /> Log Out
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", paddingTop: "8px" }}>
              <Link
                href="/login"
                className="outline-btn"
                style={{ textAlign: "center", justifyContent: "center" }}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="primary-btn"
                style={{ textAlign: "center", justifyContent: "center" }}
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
