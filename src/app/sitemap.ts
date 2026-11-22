
import { MetadataRoute } from "next";
import { events } from "@/data/events";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://campushub.in";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base,              lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/events`,  lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
    { url: `${base}/about`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/faq`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    { url: `${base}/terms`,   lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
  ];

  const eventRoutes: MetadataRoute.Sitemap = events.map((e) => ({
    url: `${base}/events/${e.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...eventRoutes];
}
