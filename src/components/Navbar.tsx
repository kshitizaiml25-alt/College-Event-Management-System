
"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { CalendarDays, Menu, X, ArrowRight, LogOut, ChevronDown, LayoutDashboard } from "lucide-react";
import { getUser, logoutUser, getInitials, type AuthUser } from "@/lib/auth";

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

  useEffect(() => { setUser(getUser()); }, []);
  useEffect(() => { setOpen(false); }, [pathname]);  // close menu on nav

  useEffect(() => {
    function onAuth() { setUser(getUser()); }
    window.addEventListener("campushub:auth", onAuth);
    return () => window.removeEventListener("campushub:auth", onAuth);
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDropOpen(false);
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
    <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(255,255,255,0.97)", backdropFilter: "blur(16px)", borderBottom: "1px solid #e5e7eb", boxShadow: "0 1px 3px #0000000a" }}>
      <nav className="container" style={{ display: "flex", height: "72px", alignItems: "center", justifyContent: "space-between" }}>

        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ background: "#7c3aed", borderRadius: "10px", padding: "8px", display: "inline-flex" }}>
            <CalendarDays size={20} color="white" />
          </span>
          <span style={{ fontSize: "19px", fontWeight: 800, color: "#111827" }}>
            Campus<span style={{ color: "#7c3aed" }}>Hub</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <div style={{ display: "flex", alignItems: "center", gap: "28px" }} className="hidden md:flex">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              style={{
                fontSize: "14px",
                fontWeight: isActive(link.href) ? 600 : 500,
                color: isActive(link.href) ? "#7c3aed" : "#4b5563",
                borderBottom: isActive(link.href) ? "2px solid #7c3aed" : "2px solid transparent",
                paddingBottom: "2px",
                transition: "color 0.2s",
              }}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop right */}
        <div className="hidden md:flex" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {user ? (
            <div ref={dropRef} style={{ position: "relative" }}>
              <button
                onClick={() => setDropOpen(!dropOpen)}
                style={{ display: "flex", alignItems: "center", gap: "10px", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "8px 14px", cursor: "pointer", transition: "0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#7c3aed")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
              >
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "30px", height: "30px", borderRadius: "50%", background: "linear-gradient(135deg,#7c3aed,#db2777)", fontSize: "12px", fontWeight: 700, color: "white", flexShrink: 0 }}>
                  {getInitials(user.firstName, user.lastName)}
                </span>
                <span style={{ fontSize: "14px", fontWeight: 600, color: "#111827" }}>{user.firstName}</span>
                <ChevronDown size={13} style={{ color: "#6b7280", transition: "0.2s", transform: dropOpen ? "rotate(180deg)" : "none" }} />
              </button>

              {dropOpen && (
                <div style={{ position: "absolute", top: "calc(100% + 10px)", right: 0, minWidth: "220px", background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "14px", padding: "8px", boxShadow: "0 16px 48px #0000001a", zIndex: 100 }}>
                  <div style={{ padding: "10px 12px 14px", borderBottom: "1px solid #f3f4f6", marginBottom: "6px" }}>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: "#111827", marginBottom: "2px" }}>{user.firstName} {user.lastName}</p>
                    <p style={{ fontSize: "12px", color: "#9ca3af" }}>{user.email}</p>
                  </div>
                  <Link href="/dashboard" onClick={() => setDropOpen(false)} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "8px", color: "#374151", fontSize: "14px", transition: "0.15s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#f9fafb")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                  >
                    <LayoutDashboard size={15} style={{ color: "#7c3aed" }} /> My Dashboard
                  </Link>
                  <button onClick={handleLogout} style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%", padding: "10px 12px", borderRadius: "8px", background: "none", border: "none", color: "#ef4444", fontSize: "14px", cursor: "pointer", textAlign: "left", transition: "0.15s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#fef2f2")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                  >
                    <LogOut size={15} /> Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" style={{ fontSize: "14px", color: "#4b5563", fontWeight: 500 }}>Login</Link>
              <Link href="/signup" className="primary-btn" style={{ padding: "10px 18px", fontSize: "14px" }}>
                Get Started <ArrowRight size={15} />
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(!open)} className="md:hidden" aria-label="Toggle navigation" style={{ color: "#374151", background: "none", border: "none" }}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="container md:hidden" style={{ display: "flex", flexDirection: "column", gap: "16px", borderTop: "1px solid #e5e7eb", padding: "20px 0 24px" }}>
          {links.map((link) => (
            <Link key={link.name} href={link.href} style={{ color: isActive(link.href) ? "#7c3aed" : "#374151", fontWeight: isActive(link.href) ? 600 : 500 }}>
              {link.name}
            </Link>
          ))}
          {user ? (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", background: "#f9fafb", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg,#7c3aed,#db2777)", fontSize: "14px", fontWeight: 700, color: "white", flexShrink: 0 }}>
                  {getInitials(user.firstName, user.lastName)}
                </span>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 600, color: "#111827" }}>{user.firstName} {user.lastName}</p>
                  <p style={{ fontSize: "12px", color: "#9ca3af" }}>{user.email}</p>
                </div>
              </div>
              <Link href="/dashboard" style={{ color: "#7c3aed", fontWeight: 500, fontSize: "14px" }}>My Dashboard</Link>
              <button onClick={handleLogout} style={{ display: "flex", alignItems: "center", gap: "8px", color: "#ef4444", background: "none", border: "none", cursor: "pointer", fontSize: "14px", padding: 0 }}>
                <LogOut size={15} /> Log Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" style={{ color: "#374151" }}>Login</Link>
              <Link href="/signup" className="primary-btn">Get Started</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
