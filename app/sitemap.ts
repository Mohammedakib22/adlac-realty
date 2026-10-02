import type { MetadataRoute } from "next";
import { agents, articles, properties } from "@/data/demo";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aldacrealty.com";
  const paths = ["", "/properties", "/buy", "/rent", "/projects", "/agents", "/about", "/contact", "/insights", "/privacy", "/terms", "/emi-calculator"];
  const staticPages = paths.map(path => ({ url: `${base.replace(/\/$/, "")}${path}`, lastModified: new Date("2026-10-02"), changeFrequency: path === "" ? "weekly" as const : "monthly" as const, priority: path === "" ? 1 : .6 }));
  const listings = properties.map(property => ({ url: `${base.replace(/\/$/, "")}/properties/${property.slug}`, lastModified: new Date("2026-10-02"), changeFrequency: "weekly" as const, priority: .7 }));
  const people = agents.map(agent => ({ url: `${base.replace(/\/$/, "")}/agents/${agent.name.toLowerCase().replaceAll(" ", "-")}`, lastModified: new Date("2026-10-02"), changeFrequency: "monthly" as const, priority: .5 }));
  const posts = articles.map(article => ({ url: `${base.replace(/\/$/, "")}/insights/${article.slug}`, lastModified: new Date("2026-10-02"), changeFrequency: "yearly" as const, priority: .5 }));
  return [...staticPages, ...listings, ...people, ...posts];
}
