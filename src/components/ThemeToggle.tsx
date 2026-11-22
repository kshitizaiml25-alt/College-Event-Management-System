"use client";

import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        style={{
          width: "38px",
          height: "38px",
          borderRadius: "10px",
          border: "1px solid var(--border)",
          background: "transparent",
        }}
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "38px",
        height: "38px",
        borderRadius: "10px",
        border: "1px solid var(--border)",
        background: "var(--surface)",
        color: isDark ? "#fbbf24" : "#6b7280",
        cursor: "pointer",
        transition: "all 0.25s ease",
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--primary)";
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {isDark ? (
        <Sun size={18} style={{ transition: "transform 0.3s" }} />
      ) : (
        <Moon size={18} style={{ transition: "transform 0.3s" }} />
      )}
    </button>
  );
}
