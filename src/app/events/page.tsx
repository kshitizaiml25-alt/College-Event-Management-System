
"use client";

import { useState } from "react";
import EventCard from "@/components/EventCard";
import { events } from "@/data/events";
import { Search } from "lucide-react";

const categories = ["All", "Technical", "Cultural", "Workshop", "Sports"];

export default function EventsPage() {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState("All");

  const filtered = events.filter((e) => {
    const matchCat = active === "All" || e.category === active;
    const matchSearch =
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <section className="section-padding">
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: "44px" }}>
          <p style={{ color: "#7c3aed", fontWeight: 600, marginBottom: "8px" }}>🗓 All Events</p>
          <h1 className="section-heading">
            Explore <span className="gradient-text">Campus Events</span>
          </h1>
          <p className="muted">Find events that match your passion — tech, culture, sports and more.</p>
        </div>

        {/* Search + Filter */}
        <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "36px", alignItems: "center" }}>
          <div style={{ position: "relative", flex: "1", minWidth: "220px" }}>
            <Search size={16} style={{ position: "absolute", left: "13px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
            <input
              className="input-field"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: "38px" }}
            />
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                style={{
                  padding: "9px 18px", borderRadius: "8px", fontSize: "14px", fontWeight: 500,
                  border: "1px solid",
                  borderColor: active === cat ? "#7c3aed" : "#d1d5db",
                  background: active === cat ? "#ede9fe" : "#ffffff",
                  color: active === cat ? "#7c3aed" : "#6b7280",
                  transition: "0.2s", cursor: "pointer",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="event-grid">
            {filtered.map((event) => <EventCard key={event.id} event={event} />)}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "80px 20px", color: "#9ca3af" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
            <h3 style={{ fontSize: "20px", marginBottom: "8px", color: "#6b7280" }}>No events found</h3>
            <p>Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </section>
  );
}
