"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, Menu, Search, Sun, Moon, Monitor, X, ArrowRight } from "lucide-react";
import { Brand } from "@/components/brand";

const links = [["Buy", "/buy"], ["Rent", "/rent"], ["Properties", "/properties"], ["Projects", "/projects"], ["Agents", "/agents"]];

export function SiteHeader({ route, savedCount, dark, themeMode, onTheme, viewer }: { route: string; savedCount: number; dark: boolean; themeMode:"system"|"light"|"dark"; onTheme: () => void; viewer: {name:string;role:string}|null }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 32); onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
  const heroOverlay = route === "/" && !scrolled;
  return <header className={`site-header${scrolled ? " is-scrolled" : ""}${heroOverlay ? " header-overlay" : ""}`}>
    <div className="nav-shell"><Brand light={heroOverlay} />
      <nav className="desktop-nav" aria-label="Main navigation">{links.map(([label, href]) => <Link key={href} href={href} className={route === href || (href === "/properties" && route.startsWith("/properties/")) ? "active" : ""}>{label}</Link>)}</nav>
      <div className="nav-actions"><button className="nav-icon" aria-label="Search properties" onClick={() => setSearchOpen(!searchOpen)}><Search size={18} /></button><Link className="nav-icon favorites-nav" href="/saved" aria-label={`Saved properties, ${savedCount} items`}><Heart size={18} />{savedCount > 0 && <span>{savedCount}</span>}</Link><button className="nav-icon theme-toggle" onClick={onTheme} aria-label={`Theme: ${themeMode}. Activate to cycle theme`} title={`Theme: ${themeMode}`}>{themeMode==="system"?<Monitor size={18}/>:dark?<Sun size={18}/>:<Moon size={18}/>}</button>{viewer?<Link href="/dashboard" className="nav-login nav-user" aria-label={`${viewer.name}'s dashboard`}><span>{viewer.name.slice(0,1)}</span>{viewer.name.split(" ")[0]}</Link>:<Link href="/login" className="nav-login">Sign in</Link>}<Link href="/list-property" className="button button-dark nav-cta">List a home <ArrowRight size={15} /></Link><button className="nav-icon mobile-menu-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={20} /> : <Menu size={20} />}</button></div>
    </div>
    {searchOpen && <form action="/search" className="quick-search"><Search size={18} /><input name="q" placeholder="Search neighbourhoods, homes..." autoFocus aria-label="Search properties" /><button className="button button-dark" type="submit">Search</button></form>}
    <div className={`mobile-nav${open ? " mobile-nav-open" : ""}`} aria-hidden={!open}>{links.map(([label, href]) => <Link key={href} href={href}>{label}<ArrowRight size={16} /></Link>)}<Link href="/about">Our story<ArrowRight size={16} /></Link><Link href="/contact">Contact<ArrowRight size={16} /></Link><Link href={viewer?"/dashboard":"/login"}>{viewer?`Hello, ${viewer.name.split(" ")[0]}`:"Sign in"}<ArrowRight size={16} /></Link><Link href="/saved">Saved homes ({savedCount})<Heart size={15}/></Link><button className="mobile-theme-toggle" onClick={onTheme}>{themeMode==="system"?<Monitor size={16}/>:dark?<Sun size={16}/>:<Moon size={16}/>} Theme: {themeMode} (tap to change)</button><Link href="/list-property" className="button button-dark">List a home <ArrowRight size={15} /></Link></div>
  </header>;
}
