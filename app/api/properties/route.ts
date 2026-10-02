import { NextResponse } from "next/server";
import { z } from "zod";
import { properties } from "@/data/demo";
import { connectMongo } from "@/lib/mongodb";
import { getSession } from "@/lib/session";
import Property from "@/models/Property";

export const runtime = "nodejs";
const propertySchema = z.object({
  id: z.string().optional(), slug: z.string().trim().min(3).max(160).regex(/^[a-z0-9-]+$/), name: z.string().trim().min(4).max(140), description: z.string().min(20).max(12000),
  location: z.string().trim().min(2).max(120), city: z.string().trim().min(2).max(80), price: z.number().positive(), priceLabel: z.string().max(80),
  type: z.enum(["Apartment", "Villa", "Penthouse", "Studio", "Plot"]), listing: z.enum(["Buy", "Rent"]), beds: z.number().int().min(0).max(20), baths: z.number().int().min(0).max(20), area: z.number().min(50).max(100000), image: z.url().max(2000), images: z.array(z.url().max(2000)).max(30).optional(), tags: z.array(z.string().max(80)).max(40), agent: z.string().max(120), furnishing: z.string().max(40), featured: z.boolean().optional(), verified: z.boolean().optional(), status: z.enum(["draft", "active", "pending", "sold", "leased"]).optional(),
});

export async function GET(request: Request) {
  if (!process.env.MONGODB_URI) return NextResponse.json({ properties });
  try {
    await connectMongo();
    const params = new URL(request.url).searchParams;
    const session = await getSession();
    const query: Record<string, unknown> = session?.role === "ADMIN" ? {} : { status: "active" };
    const listing = params.get("listing"); if (listing === "Buy" || listing === "Rent") query.listing = listing;
    const city = params.get("city"); if (city) query.city = { $regex: city.slice(0, 80), $options: "i" };
    const results = await Property.find(query).sort({ featured: -1, createdAt: -1 }).limit(100).lean();
    const merged = new Map<string, Record<string, unknown>>(properties.map(item => [item.slug, item as unknown as Record<string, unknown>]));
    for (const result of results) { const item = result as unknown as Record<string, unknown>; merged.set(String(item.slug), { ...item, id: String(item._id) }); }
    return NextResponse.json({ properties: [...merged.values()] });
  } catch { return NextResponse.json({ error: "Property search is unavailable right now." }, { status: 503 }); }
}

export async function POST(request: Request) {
  const session = await getSession();
  if (session?.role !== "ADMIN") return NextResponse.json({ error: "Administrator access is required." }, { status: 403 });
  const parsed = propertySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Review the property details and try again." }, { status: 400 });
  try {
    await connectMongo();
    const property = await Property.create({ ...parsed.data, createdBy: session.id, status: parsed.data.status ?? "pending" });
    const saved = property.toObject();
    return NextResponse.json({ property: { ...saved, id: String(property._id) } }, { status: 201 });
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === 11000) return NextResponse.json({ error: "That property URL is already in use." }, { status: 409 });
    return NextResponse.json({ error: "Property services are not available right now." }, { status: 503 });
  }
}
