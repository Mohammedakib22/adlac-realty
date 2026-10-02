import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Brand({ light = false }: { light?: boolean }) {
  return <Link href="/" className={`brand${light ? " brand-light" : ""}`} aria-label="Adlac Realty home">
    <span className="brand-mark" aria-hidden="true"><span /><span /><span /></span>
    <span className="brand-wordmark"><strong>ADLAC</strong><small>REALTY</small></span>
  </Link>;
}

export function Eyebrow({ children }: { children: React.ReactNode }) { return <p className="eyebrow"><span />{children}</p>; }

export function SectionHeading({ kicker, title, text, href, linkText }: { kicker?: string; title: string; text?: string; href?: string; linkText?: string }) {
  return <div className="section-heading"><div>{kicker && <Eyebrow>{kicker}</Eyebrow>}<h2>{title}</h2>{text && <p>{text}</p>}</div>{href && <Link href={href} className="text-link">{linkText ?? "Explore all"}<ArrowUpRight size={16} /></Link>}</div>;
}
