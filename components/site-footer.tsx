"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, Instagram, Linkedin, Facebook } from "lucide-react";
import { Brand } from "@/components/brand";

const groups = [
  { title: "Discover", links: [["Buy a home", "/buy"], ["Find a rental", "/rent"], ["New projects", "/projects"], ["Explore locations", "/properties"]] },
  { title: "Adlac", links: [["Our story", "/about"], ["Our advisors", "/agents"], ["List your home", "/list-property"], ["Insights", "/insights"]] },
  { title: "Here to help", links: [["Contact us", "/contact"], ["FAQs", "/contact#faq"], ["Privacy policy", "/privacy"], ["Terms of use", "/terms"]] },
];

export function SiteFooter() {
  const [subscribed, setSubscribed] = useState(false);

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const field = form.elements.namedItem("email");
    if (!(field instanceof HTMLInputElement)) return;
    const email = field.value.trim().toLowerCase();
    try {
      const response = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      if (!response.ok) throw new Error("The newsletter service is unavailable.");
    } catch {
      const previous = JSON.parse(localStorage.getItem("aldac.newsletter") ?? "[]") as string[];
      localStorage.setItem("aldac.newsletter", JSON.stringify([...new Set([email, ...previous])].slice(0, 100)));
    }
    setSubscribed(true);
    form.reset();
  }

  return <footer className="site-footer">
    <div className="footer-main">
      <div className="footer-brand-block"><Brand light /><p>A more considered way to find your place in Mumbai.</p><div className="social-links"><a href="https://instagram.com" aria-label="Instagram"><Instagram size={17} /></a><a href="https://linkedin.com" aria-label="LinkedIn"><Linkedin size={17} /></a><a href="https://facebook.com" aria-label="Facebook"><Facebook size={17} /></a></div></div>
      {groups.map(group => <div className="footer-group" key={group.title}><h2>{group.title}</h2>{group.links.map(([label, href]) => <Link key={href} href={href}>{label}<ArrowUpRight size={12} /></Link>)}</div>)}
      <div className="footer-news"><p className="eyebrow eyebrow-light"><span /> A little room to dream</p><h2>Good homes. Good stories.</h2><p>Neighbourhood notes and thoughtful reads, occasionally in your inbox.</p>
        {subscribed ? <p className="newsletter-success" role="status">You’re on the list. We’ll write when there’s something good to share.</p> : <form className="newsletter-form" onSubmit={subscribe}><label className="sr-only" htmlFor="newsletter-email">Email address</label><input id="newsletter-email" name="email" type="email" placeholder="Your email address" required /><button type="submit" aria-label="Subscribe"><ArrowUpRight size={18} /></button></form>}
      </div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Adlac Realty. All rights reserved.</span><span>Thoughtfully finding home across Mumbai · <a href="tel:+912240001920">+91 22 4000 1920</a></span><span>Built around what matters.</span></div>
  </footer>;
}
