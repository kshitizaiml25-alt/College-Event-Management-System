import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastProvider } from "@/context/ToastContext";
import { ThemeProvider } from "@/context/ThemeContext";
import "./global.css";

export const metadata: Metadata = {
  title: { default: "CampusHub | College Event Management", template: "%s | CampusHub" },
  description: "Discover, register, and manage college events with CampusHub — the official event platform for students.",
  keywords: ["college events", "campus", "hackathon", "cultural fest", "student events"],
  authors: [{ name: "CampusHub" }],
  openGraph: {
    type: "website",
    siteName: "CampusHub",
    title: "CampusHub | College Event Management",
    description: "Discover and register for college events on CampusHub.",
    images: [{ url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CampusHub | College Event Management",
    description: "Discover and register for college events on CampusHub.",
  },
  icons: {
    icon: "/favicon.svg",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <ToastProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
