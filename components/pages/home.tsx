"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowUpRight, BadgeCheck, Building2, ChevronDown, ChevronLeft, ChevronRight, Compass, HeartHandshake, KeyRound, MapPin, MoveUpRight, Quote, ShieldCheck, Sparkles, Star, Users, WalletCards } from "lucide-react";
import { motion } from "framer-motion";
import { agents, articles, faqs, locations, properties, testimonials } from "@/data/demo";
import type { Property } from "@/types";
import { Eyebrow, SectionHeading } from "@/components/brand";
import { PropertyCard } from "@/components/property-card";

type Props = { saved: string[]; onSave: (id: string) => void };
const fadeUp = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } };

export function HomePage({ saved, onSave }: Props) {
  return <>
    <section className="hero-home"><div className="hero-photo" /><div className="hero-scrim" />
      <motion.div className="hero-inner" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: .12 } } }}>
        <motion.div variants={fadeUp}><Eyebrow>A HOME FOR WHAT’S NEXT</Eyebrow></motion.div>
        <motion.h1 variants={fadeUp}>A place to<br /><em>become.</em></motion.h1>
        <motion.p variants={fadeUp}>Thoughtful homes. Honest advice.<br />A more considered way to find your place in Mumbai.</motion.p>
        <motion.div className="hero-actions" variants={fadeUp}><Link href="/properties" className="button button-cream">Explore properties <ArrowRight size={16} /></Link><Link href="/list-property" className="button button-outline-cream">List your home <ArrowUpRight size={16} /></Link></motion.div>
      </motion.div>
      <div className="hero-caption"><span>01 / 03</span><span>Homes that hold a little more meaning</span><span>19°03′ N · 72°52′ E</span></div>
      <div className="hero-scroll"><span>SCROLL TO EXPLORE</span><span /></div>
      <SearchPanel />
    </section>
    <main>
      <section className="intro-band section-wrap"><div className="intro-side"><span className="side-index">01</span><span>THE ADLAC APPROACH</span></div><div className="intro-copy"><p>Finding home is more than a search. It’s the start of everything that happens next.</p><span>That’s why we bring together remarkable spaces, local insight and people who listen first. Less noise, better choices—and a little more feeling in every step.</span></div><Link className="round-arrow" href="/about" aria-label="Discover our approach"><ArrowUpRight size={20} /></Link></section>

      <section className="section-wrap featured-section"><SectionHeading kicker="A few worth seeing" title="Places with a little more to them." text="A thoughtful edit of homes we think you’ll love." href="/properties" linkText="Explore every home"/><div className="property-grid">{properties.filter(p => p.featured).slice(0, 3).map(p => <PropertyCard key={p.id} property={p} saved={saved.includes(p.id)} onSave={onSave} />)}</div></section>

      <section className="locations-section"><div className="section-wrap"><SectionHeading kicker="Find your corner of the city" title="A neighbourhood to call yours." text="Each part of the city has its own rhythm. Start with the one that feels like you." href="/properties" linkText="All locations"/><div className="location-grid">{locations.slice(0, 4).map((loc, i) => <Link key={loc.name} href={`/properties?location=${encodeURIComponent(loc.name)}`} className={`location-card location-card-${i + 1}`}><div className="location-image" style={{ backgroundImage: `url("${loc.image}")` }} /><span className="location-meta">{String(i + 1).padStart(2, "0")} / MUMBAI</span><div className="location-name"><div><h3>{loc.name}</h3><p>{loc.count} considered homes</p></div><span className="circle-arrow"><ArrowUpRight size={17} /></span></div></Link>)}</div></div></section>

      <section className="story-section"><div className="story-image" role="img" aria-label="A warm, sunlit modern home interior"/><div className="story-copy"><Eyebrow>GOOD ADVICE, BETTER HOMES</Eyebrow><h2>It’s the little<br />things that make<br /><em>a home.</em></h2><p>Beyond the photographs and floor plans, there’s a feeling. We help you find it—with neighbourhood knowledge, independent perspective and people who care about the detail.</p><Link href="/about" className="text-link">Meet Adlac <ArrowRight size={16} /></Link><span className="story-mark">A / 01</span></div></section>

      <section className="section-wrap benefits-section"><SectionHeading kicker="A little more thought in every step" title="A better way to find home."/><div className="benefit-grid">{[
        [<ShieldCheck key="a" />, "A more trusted search", "Every home is thoughtfully checked. The details you see are the details that matter."],
        [<Compass key="b" />, "Local, lived-in knowledge", "People who know the lanes, morning light and nearest cup of good coffee."],
        [<HeartHandshake key="c" />, "Advice without the noise", "Clear answers, considered options and your best interest at the centre."],
        [<KeyRound key="d" />, "Here, all the way home", "From first conversation to first night in, we’re right beside you."],
      ].map(([icon, title, text], i) => <motion.div className="benefit-item" key={String(title)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} transition={{ delay: i * .08 }}><span className="benefit-number">0{i + 1}</span><span className="benefit-icon">{icon}</span><h3>{title}</h3><p>{text}</p></motion.div>)}</div></section>

      <section className="numbers-section"><div className="numbers-image"/><div className="numbers-wrap"><Eyebrow>A FEW THINGS WE’RE PROUD OF</Eyebrow><h2>Trust takes<br />time. We have<br /><em>plenty of it.</em></h2><div className="numbers-grid"><div><strong>1,200<span>+</span></strong><small>homes found</small></div><div><strong>640<span>+</span></strong><small>happy beginnings</small></div><div><strong>48</strong><small>local advisors</small></div><div><strong>12</strong><small>years in Mumbai</small></div></div></div></section>

      <section className="section-wrap people-section"><div className="testimonial-top"><div><Eyebrow>LET THE STORIES SPEAK</Eyebrow><h2>It feels different<br />when it feels <em>right.</em></h2></div><p>Good homes change how a day feels. These are a few of the people who found theirs with us.</p></div><div className="testimonial-grid">{testimonials.map((t) => <article className="testimonial-card" key={t.name}><Quote size={25} strokeWidth={1.3} /><div className="testimonial-stars" aria-label="Rated five out of five">★★★★★</div><blockquote>“{t.quote}”</blockquote><div className="testimonial-person"><span className="avatar-image" style={{ backgroundImage: `url("${t.image}")` }} /><span><strong>{t.name}</strong><small>{t.role}</small></span></div></article>)}</div></section>

      <section className="section-wrap agents-preview"><div className="agent-preview-title"><div><Eyebrow>PEOPLE WHO KNOW THE WAY</Eyebrow><h2>A familiar face<br />along the way.</h2></div><Link href="/agents" className="text-link">Meet your advisors <ArrowRight size={16} /></Link></div><div className="agent-preview-grid">{agents.slice(0, 3).map(agent => <Link href={`/agents/${encodeURIComponent(agent.name.toLowerCase().replaceAll(" ", "-"))}`} className="agent-preview-card" key={agent.name}><div className="agent-preview-image" style={{ backgroundImage: `url("${agent.image}")` }} /><div><span>{agent.role}</span><h3>{agent.name}</h3><small>{agent.location} · {agent.experience} years</small></div><ArrowUpRight size={18} /></Link>)}</div></section>

      <section className="section-wrap insights-preview"><SectionHeading kicker="Notes from around here" title="A little insight, for the way home." href="/insights" linkText="All insights"/><div className="article-grid">{articles.map(article => <Link href={`/insights/${article.slug}`} key={article.slug} className="article-card"><div className="article-image" style={{ backgroundImage: `url("${article.image}")` }} /><span className="article-category">{article.category}</span><h3>{article.title}</h3><span className="article-date">{article.date} · {article.read}</span></Link>)}</div></section>

      <section className="home-cta"><div className="home-cta-content"><Eyebrow>WHENEVER YOU’RE READY</Eyebrow><h2>Your next chapter<br />has a <em>place.</em></h2><p>A first conversation is all it takes.</p><Link href="/contact" className="button button-cream">Let’s talk <ArrowRight size={16} /></Link></div><div className="home-cta-image"/><span className="cta-index">MUMBAI · SINCE 2014</span></section>

      <section className="faq-section section-wrap" id="faq"><div className="faq-intro"><Eyebrow>GOOD TO KNOW</Eyebrow><h2>A few things<br />you might be<br /><em>wondering.</em></h2><Link href="/contact" className="text-link">Still have questions? <ArrowRight size={16} /></Link></div><div className="faq-list">{faqs.map((f, i) => <details key={f.q} className="faq-item"><summary><span className="faq-number">0{i + 1}</span>{f.q}<ChevronDown size={18} /></summary><p>{f.a}</p></details>)}</div></section>
    </main>
  </>;
}

export function SearchPanel() {
  const router = useRouter();
  const doSearch = (formData: FormData) => {
    const p = new URLSearchParams();
    for (const key of ["listing", "location", "type", "min", "max", "beds"]) { const value = String(formData.get(key) ?? ""); if (value) p.set(key, value); }
    router.push(`/properties?${p.toString()}`);
  };
  return <form className="hero-search" action={(formData) => doSearch(formData)}><div className="hero-search-title"><span>LET’S FIND YOUR PLACE</span><span>01 — 06</span></div><div className="search-fields"><label>Looking to<select name="listing" defaultValue="Buy"><option>Buy</option><option>Rent</option></select></label><label>Somewhere in<input name="location" list="locations" placeholder="Neighbourhood or city" /><datalist id="locations"><option>Bandra</option><option>Powai</option><option>Thane</option><option>Juhu</option><option>Andheri</option><option>Navi Mumbai</option></datalist></label><label>Home type<select name="type" defaultValue=""><option value="">Any home</option><option>Apartment</option><option>Villa</option><option>Penthouse</option></select></label><label>Budget<select name="max" defaultValue=""><option value="">Any price</option><option value="20000000">Up to ₹2 Cr</option><option value="40000000">Up to ₹4 Cr</option><option value="70000000">Up to ₹7 Cr</option></select></label><button type="submit" className="button button-dark search-submit"><span>Find a home</span><ArrowRight size={17} /></button></div><div className="search-bottom"><span><Sparkles size={13} /> A good place to begin</span><Link href="/properties">Browse all homes <ArrowRight size={13} /></Link></div></form>;
}
