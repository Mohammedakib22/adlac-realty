import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteApp } from "../site-app";
import { agents, articles, properties } from "@/data/demo";

const knownRoots = new Set(["properties", "buy", "rent", "projects", "agents", "about", "contact", "login", "register", "forgot-password", "reset-password", "dashboard", "saved", "recently-viewed", "inquiries", "visits", "list-property", "compare", "emi-calculator", "admin", "privacy", "terms", "insights", "map", "search", "profile", "settings"]);

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const route = `/${slug.join("/")}`;
  const property = slug[0] === "properties" ? properties.find(item => item.slug === slug[1]) : undefined;
  const agent = slug[0] === "agents" ? agents.find(item => item.name.toLowerCase().replaceAll(" ", "-") === decodeURIComponent(slug[1] ?? "")) : undefined;
  const article = slug[0] === "insights" ? articles.find(item => item.slug === slug[1]) : undefined;
  const titles: Record<string, string> = { "/properties": "Homes for sale and rent in Mumbai", "/buy": "Find a home to buy in Mumbai", "/rent": "Find a considered rental in Mumbai", "/projects": "New residential projects in Mumbai", "/agents": "Meet your local property advisors", "/about": "A more thoughtful way to find home", "/contact": "Talk to Adlac Realty", "/insights": "Notes on finding your place", "/emi-calculator": "Home loan EMI calculator" };
  const title = property ? `${property.name} · ${property.location}` : agent ? `${agent.name} · Adlac property advisor` : article?.title ?? titles[route] ?? "A more considered way home";
  const description = property?.description ?? agent?.bio ?? article?.excerpt ?? "Thoughtfully selected homes and trusted property advice across Mumbai, Thane and Navi Mumbai.";
  const canonical = `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://aldacrealty.com"}${route}`;
  return { title, description, alternates: { canonical }, openGraph: { title, description, url: canonical, type: article ? "article" : "website", images: property ? [{ url: property.image, width: 1400, height: 900, alt: property.name }] : undefined }, twitter: { card: "summary_large_image", title, description } };
}

export default async function RoutedPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  if (!knownRoots.has(slug[0])) notFound();
  return <SiteApp route={`/${slug.join("/")}`} />;
}
