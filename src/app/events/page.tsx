"use client";

import { useState } from "react";
import EventCard from "@/components/EventCard";
import { events } from "@/data/events";
import { Search, CalendarDays } from "lucide-react";

const categories = ["All", "Technical", "Cultural", "Workshop", "Sports"];

export default function EventsPage() {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState("All");

  const filtered = events.filter((e) => {
    const matchCat = active === "All" || e.category === active;
    const matchSearch =
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.description.toLowerCase().includes(search.toLowerCase()) ||
      e.venue.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <section className="section-padding" style={{ minHeight: "calc(100vh - 72px)" }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <p style={{ color: "var(--primary)", fontWeight: 600, marginBottom: "8px" }}>🗓 All Events</p>
          <h1 className="section-heading">
            Explore <span className="gradient-text">Campus Events</span>
          </h1>
          <p className="muted">Find events that match your passion — tech, culture, workshops, sports and more.</p>
        </div>

        {/* Search + Filter */}
        <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "36px", alignItems: "center" }}>
          <div style={{ position: "relative", flex: "1", minWidth: "240px" }}>
            <Search
              size={16}
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-muted)",
              }}
            />
            <input
              className="input-field"
              placeholder="Search by title, description, or venue…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: "40px" }}
              aria-label="Search events"
            />
          </div>

          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {categories.map((cat) => {
              const isSelected = active === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  style={{
                    padding: "9px 18px",
                    borderRadius: "10px",
                    fontSize: "14px",
                    fontWeight: isSelected ? 600 : 500,
                    border: "1px solid",
                    borderColor: isSelected ? "var(--primary)" : "var(--border)",
                    background: isSelected ? "rgba(124, 58, 237, 0.15)" : "var(--surface)",
                    color: isSelected ? "var(--primary)" : "var(--text-secondary)",
                    transition: "all 0.2s",
                    cursor: "pointer",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Event Grid or Empty State */}
        {filtered.length > 0 ? (
          <div className="event-grid">
            {filtered.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "70px 20px",
              background: "var(--surface)",
              borderRadius: "20px",
              border: "1px dashed var(--border)",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                padding: "16px",
                borderRadius: "50%",
                background: "var(--surface-alt)",
                marginBottom: "16px",
                color: "var(--primary)",
              }}
            >
              <CalendarDays size={32} />
            </div>
            <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "8px", color: "var(--text-primary)" }}>
              No events found
            </h3>
            <p className="muted" style={{ maxWidth: "420px", margin: "0 auto 20px", fontSize: "14px" }}>
              We couldn&apos;t find any events matching &ldquo;{search}&rdquo; in category &ldquo;{active}&rdquo;.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setActive("All");
              }}
              className="outline-btn"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
