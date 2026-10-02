import type { Agent, Property } from "@/types";

const photos = {
  sea: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
  living: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85",
  exterior: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85",
  kitchen: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1400&q=85",
  home: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85",
  tower: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85",
  bedroom: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85",
  pool: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1400&q=85",
  agent1: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=480&q=80",
  agent2: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=480&q=80",
  agent3: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=480&q=80",
  agent4: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=480&q=80",
};

export const properties: Property[] = [
  { id: "p1", slug: "the-serein-bandra", name: "The Serein, Bandra West", location: "Bandra West", city: "Mumbai", price: 48500000, priceLabel: "₹4.85 Cr", type: "Apartment", listing: "Buy", beds: 3, baths: 3, area: 1840, image: photos.sea, tags: ["Sea view", "Concierge", "Gym", "Pool", "Parking"], description: "A serene, light-filled home with uninterrupted Arabian Sea views, finished with natural stone, warm oak and thoughtfully selected fixtures. A private lift opens into the living room, while a generous balcony frames every sunset.", agent: "Mira Kapoor", featured: true, verified: true, furnishing: "Semi-furnished" },
  { id: "p2", slug: "atelier-powai", name: "Atelier One, Powai", location: "Powai", city: "Mumbai", price: 27800000, priceLabel: "₹2.78 Cr", type: "Apartment", listing: "Buy", beds: 3, baths: 2, area: 1580, image: photos.living, tags: ["Lake view", "Clubhouse", "Garden", "Gym", "Parking"], description: "A considered three-bedroom residence in a landmark lakeside community. Expansive glazing, a calm palette and a beautifully planned kitchen make this a home designed for everyday ease.", agent: "Arjun Mehta", featured: true, verified: true, furnishing: "Unfurnished" },
  { id: "p3", slug: "casa-verde-thane", name: "Casa Verde, Thane", location: "Hiranandani Estate", city: "Thane", price: 16400000, priceLabel: "₹1.64 Cr", type: "Apartment", listing: "Buy", beds: 2, baths: 2, area: 1240, image: photos.exterior, tags: ["Garden", "Pool", "Security", "Play area"], description: "A warm, well-proportioned family home surrounded by mature landscaping. The development brings together thoughtful amenities, a welcoming community and excellent connectivity.", agent: "Nikhil Shah", verified: true, furnishing: "Semi-furnished" },
  { id: "p4", slug: "the-reserve-juhu", name: "The Reserve, Juhu", location: "Juhu", city: "Mumbai", price: 62500000, priceLabel: "₹6.25 Cr", type: "Penthouse", listing: "Buy", beds: 4, baths: 4, area: 2650, image: photos.home, tags: ["Private terrace", "Pool", "Valet", "Gym"], description: "A rare duplex penthouse with a landscaped private terrace, luminous double-height living spaces and sunset views across Juhu. Includes two dedicated parking spaces and resident concierge.", agent: "Mira Kapoor", featured: true, verified: true, furnishing: "Furnished" },
  { id: "p5", slug: "maison-andheri", name: "Maison, Andheri East", location: "Andheri East", city: "Mumbai", price: 72000, priceLabel: "₹72,000 / month", type: "Apartment", listing: "Rent", beds: 2, baths: 2, area: 1120, image: photos.kitchen, tags: ["Furnished", "Gym", "Security", "Parking"], description: "A move-in-ready home with generous storage, warm natural finishes and a dedicated work-from-home nook. Minutes from the metro, airport and leading business districts.", agent: "Ananya Rao", verified: true, furnishing: "Furnished" },
  { id: "p6", slug: "shoreline-navi-mumbai", name: "Shoreline Residences", location: "Palm Beach Road", city: "Navi Mumbai", price: 21400000, priceLabel: "₹2.14 Cr", type: "Apartment", listing: "Buy", beds: 3, baths: 3, area: 1710, image: photos.tower, tags: ["Sea view", "Clubhouse", "Pool", "CCTV"], description: "A contemporary residence with a generous wraparound balcony and sweeping water views. Resort-inspired shared spaces and quick access to the upcoming city centre bring everyday life into balance.", agent: "Arjun Mehta", featured: true, verified: true, furnishing: "Unfurnished" },
  { id: "p7", slug: "garden-house-bandra", name: "Garden House, Bandra", location: "Bandra West", city: "Mumbai", price: 145000, priceLabel: "₹1.45 Lakh / month", type: "Villa", listing: "Rent", beds: 4, baths: 4, area: 3100, image: photos.bedroom, tags: ["Private garden", "Pet friendly", "Parking", "Security"], description: "A rare independent home tucked behind old-world greenery. Four generous bedrooms, a sunlit courtyard and a private garden create a peaceful pocket just minutes from Bandra's best cafés.", agent: "Ananya Rao", verified: true, furnishing: "Semi-furnished" },
  { id: "p8", slug: "solstice-worli", name: "Solstice, Worli Sea Face", location: "Worli", city: "Mumbai", price: 89000000, priceLabel: "₹8.9 Cr", type: "Apartment", listing: "Buy", beds: 4, baths: 4, area: 2960, image: photos.pool, tags: ["Sea view", "Concierge", "Pool", "Gym"], description: "An architectural statement above the Worli waterfront, with panoramic ocean views, a residents' spa and beautifully crafted entertaining spaces.", agent: "Mira Kapoor", featured: true, verified: true, furnishing: "Furnished" },
];

export const agents: Agent[] = [
  { name: "Mira Kapoor", role: "Luxury residences", location: "Bandra · Juhu", experience: 12, rating: 4.9, listings: 28, image: photos.agent2, bio: "Mira pairs a deep knowledge of Mumbai's western neighbourhoods with a discreet, relationship-first approach. Her clients return for honest counsel and thoughtful attention to detail." },
  { name: "Arjun Mehta", role: "New developments", location: "Powai · Navi Mumbai", experience: 9, rating: 4.8, listings: 21, image: photos.agent1, bio: "Arjun helps buyers navigate the city's evolving residential market. He brings a data-led perspective to every shortlist, from first homes to long-term investments." },
  { name: "Ananya Rao", role: "Leasing & relocation", location: "Mumbai · Thane", experience: 7, rating: 4.9, listings: 34, image: photos.agent4, bio: "Ananya makes the move to Mumbai feel simple. From a first neighbourhood tour to the final set of keys, she looks after every detail for tenants and landlords." },
  { name: "Nikhil Shah", role: "Family homes", location: "Thane · Mulund", experience: 11, rating: 4.8, listings: 19, image: photos.agent3, bio: "Nikhil has spent more than a decade building relationships in Thane's residential communities and helping families find a place to settle in." },
];

export const projects = [
  { name: "Evara by the Bay", developer: "Meridian Collective", location: "Versova, Mumbai", price: "₹2.4 Cr onwards", status: "New launch", possession: "Dec 2028", image: photos.sea, details: "2, 3 & 4 bedroom residences · Private sky lounge" },
  { name: "The Canopy", developer: "Aurum Living", location: "Powai, Mumbai", price: "₹1.85 Cr onwards", status: "Under construction", possession: "Jun 2027", image: photos.tower, details: "1, 2 & 3 bedroom homes · 2.5 acres of gardens" },
  { name: "Aroha Gardens", developer: "Habitat Works", location: "Ghodbunder Road, Thane", price: "₹98 Lakh onwards", status: "Ready to move", possession: "Ready", image: photos.exterior, details: "2 & 3 bedroom homes · Three landscaped courtyards" },
];

export const testimonials = [
  { name: "Priya & Rohan", role: "Found their home in Bandra", quote: "From the first conversation, the team understood the feeling we were looking for—not just the number of bedrooms. Finding our home felt surprisingly easy.", image: photos.agent4 },
  { name: "Kavita Desai", role: "Moved to Mumbai in 2025", quote: "Ananya made a big city feel smaller. She listened, shortlisted thoughtfully and took care of every detail before I landed.", image: photos.agent2 },
  { name: "Rahul Mehra", role: "First-time buyer in Powai", quote: "Clear advice, patient answers and no pressure. We always knew where we were in the process, right through to handing over the keys.", image: photos.agent1 },
];

export const locations = [
  { name: "Bandra", count: 184, image: photos.sea },
  { name: "Powai", count: 126, image: photos.living },
  { name: "Thane", count: 242, image: photos.exterior },
  { name: "Juhu", count: 96, image: photos.home },
  { name: "Navi Mumbai", count: 158, image: photos.tower },
];

export const faqs = [
  { q: "How does Adlac verify a property?", a: "Our local team checks ownership documentation, listing details and availability before a home is marked verified. We can arrange a guided visit so you can see it for yourself." },
  { q: "Can I schedule a property visit online?", a: "Yes. Use the Schedule a visit form on any listing to share your preferred date and time. An Adlac advisor will confirm the appointment with you." },
  { q: "Are there any fees to work with Adlac?", a: "Browsing listings and speaking with our team is free. Any brokerage or advisory fee is shared clearly before you decide to proceed." },
  { q: "How do I list a home with Adlac?", a: "Start with our guided listing form. An advisor will follow up to verify the details, prepare your listing and help you reach the right audience." },
];

export const articles = [
  { slug: "first-home-mumbai", category: "The buying guide", title: "A thoughtful guide to buying your first home in Mumbai", date: "September 18, 2026", read: "7 min read", image: photos.home, excerpt: "A clearer way to think about neighbourhoods, budgets and the decisions that make a first home feel like yours." },
  { slug: "choosing-neighbourhood", category: "Neighbourhood notes", title: "Finding your corner of the city: a neighbourhood guide", date: "September 04, 2026", read: "5 min read", image: photos.sea, excerpt: "From sea-facing Bandra lanes to Powai's lakeside paths, explore what makes Mumbai's most-loved neighbourhoods distinct." },
  { slug: "renting-checklist", category: "The renting guide", title: "Before you sign: the Mumbai renter's checklist", date: "August 21, 2026", read: "6 min read", image: photos.living, excerpt: "A calm, practical walkthrough of documents, deposits, society rules and the questions worth asking at a viewing." },
];

export const photoSet = photos;
