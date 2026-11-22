
"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue>({ showToast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

const toastColors: Record<ToastType, { bg: string; border: string; icon: string }> = {
  success: { bg: "#f0fdf4", border: "#16a34a", icon: "✓" },
  error:   { bg: "#fef2f2", border: "#dc2626", icon: "✕" },
  info:    { bg: "#eff6ff", border: "#2563eb", icon: "ℹ" },
  warning: { bg: "#fffbeb", border: "#d97706", icon: "⚠" },
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast container — fixed bottom-right */}
      <div
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          pointerEvents: "none",
        }}
      >
        {toasts.map((toast) => {
          const style = toastColors[toast.type];
          return (
            <div
              key={toast.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "14px 18px",
                borderRadius: "12px",
                background: style.bg,
                border: `1px solid ${style.border}`,
                boxShadow: "0 8px 24px #00000018",
                fontSize: "14px",
                fontWeight: 500,
                color: "#111827",
                maxWidth: "360px",
                animation: "toastIn 0.3s ease",
                pointerEvents: "all",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  background: style.border,
                  color: "white",
                  fontSize: "12px",
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {style.icon}
              </span>
              {toast.message}
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
