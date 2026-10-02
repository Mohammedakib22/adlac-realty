"use client";

import Link from "next/link";
import { ArrowUpRight, BedDouble, Bath, Ruler, Heart, BadgeCheck, Scale } from "lucide-react";
import { motion } from "framer-motion";
import type { Property } from "@/types";

export function PropertyCard({ property, saved, compared, onSave, onCompare, compact = false }: {
  property: Property; saved: boolean; compared?: boolean; onSave: (id: string) => void; onCompare?: (id: string) => void; compact?: boolean;
}) {
  return <motion.article className={`property-card${compact ? " property-card-compact" : ""}`} layout whileHover={{ y: -5 }} transition={{ duration: .22 }}>
    <div className="property-image" style={{ backgroundImage: `url("${property.image}")` }} role="img" aria-label={`${property.name} interior`}>
      <div className="property-badges">{property.featured && <span className="badge badge-featured">Signature</span>}{property.verified && <span className="badge badge-verified"><BadgeCheck size={12} /> Verified</span>}</div>
      <div className="property-actions"><button className={`icon-button heart-button${saved ? " is-saved" : ""}`} aria-label={saved ? "Remove saved property" : "Save property"} aria-pressed={saved} onClick={() => onSave(property.id)}><Heart size={17} fill={saved ? "currentColor" : "none"} /></button>{onCompare && <button className={`icon-button compare-button${compared ? " is-saved" : ""}`} aria-label={compared ? "Remove from comparison" : "Compare property"} aria-pressed={compared} onClick={() => onCompare(property.id)}><Scale size={16} /></button>}</div>
      <span className="photo-count">{property.listing === "Rent" ? "FOR RENT" : "FOR SALE"}</span>
    </div>
    <div className="property-content"><div className="property-price-row"><strong>{property.priceLabel}</strong><span>{property.type}</span></div>
      <Link className="property-title" href={`/properties/${property.slug}`}><h3>{property.name}</h3><ArrowUpRight size={16} /></Link>
      <p className="property-location">{property.location}, {property.city}</p>
      <div className="property-specs"><span><BedDouble size={15} />{property.beds} beds</span><span><Bath size={15} />{property.baths} baths</span><span><Ruler size={15} />{property.area.toLocaleString("en-IN")} sq ft</span></div>
    </div>
  </motion.article>;
}
