import { events } from "@/data/events";
import { notFound } from "next/navigation";
import EventRegistrationForm from "@/components/EventRegistrationForm";
import type { Metadata } from "next";

export function generateStaticParams() {
  return events.map((e) => ({ id: e.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const event = events.find((e) => e.id === id);
  if (!event) return { title: "Register" };
  return {
    title: `Register for ${event.title} | CampusHub`,
    description: `Official registration for ${event.title}. Register online to receive your entry ticket.`,
  };
}

export default async function EventRegisterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = events.find((e) => e.id === id);
  if (!event) notFound();

  return (
    <section className="section-padding" style={{ minHeight: "calc(100vh - 72px)", background: "var(--background)" }}>
      <div className="container">
        <EventRegistrationForm event={event} />
      </div>
    </section>
  );
}
