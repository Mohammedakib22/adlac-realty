import { NextResponse } from "next/server";
import { z } from "zod";
import { connectMongo } from "@/lib/mongodb";
import { getSession } from "@/lib/session";
import Property from "@/models/Property";
import { properties as demoProperties } from "@/data/demo";

export const runtime = "nodejs";
const changes = z.object({ featured: z.boolean().optional(), verified: z.boolean().optional(), status: z.enum(["draft", "active", "pending", "sold", "leased"]).optional(), name: z.string().trim().min(4).max(140).optional(), description: z.string().min(20).max(12000).optional(), location: z.string().trim().min(2).max(120).optional(), city: z.string().trim().min(2).max(80).optional(), price: z.number().positive().optional(), priceLabel: z.string().max(80).optional(), image: z.url().max(2000).optional(), tags: z.array(z.string().max(80)).max(40).optional() }).strict();

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getSession();
  const demo = demoProperties.find(item => item.slug === id || item.id === id);
  if (!process.env.MONGODB_URI) return demo ? NextResponse.json({ property: demo }) : NextResponse.json({ error: "Property not found." }, { status: 404 });
  try {
    await connectMongo();
    const property = /^[a-f\d]{24}$/i.test(id) ? await Property.findById(id).lean() : await Property.findOne({ slug: id }).lean();
    if (!property || (property.status !== "active" && session?.role !== "ADMIN")) return demo ? NextResponse.json({ property: demo }) : NextResponse.json({ error: "Property not found." }, { status: 404 });
    const raw = property as unknown as Record<string, unknown>;
    return NextResponse.json({ property: { ...raw, id: String(raw._id) } });
  } catch { return NextResponse.json({ error: "Property search is unavailable right now." }, { status: 503 }); }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession(); if (session?.role !== "ADMIN") return NextResponse.json({ error: "Administrator access is required." }, { status: 403 });
  const { id } = await params; const parsed = changes.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Those property changes are invalid." }, { status: 400 });
  try { await connectMongo(); const property = await Property.findByIdAndUpdate(id, { $set: parsed.data }, { new: true, runValidators: true }); if (!property) return NextResponse.json({ error: "Property not found." }, { status: 404 }); return NextResponse.json({ property }); }
  catch { return NextResponse.json({ error: "Property services are not available right now." }, { status: 503 }); }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession(); if (session?.role !== "ADMIN") return NextResponse.json({ error: "Administrator access is required." }, { status: 403 });
  const { id } = await params;
  try { await connectMongo(); const property = await Property.findByIdAndDelete(id); if (!property) return NextResponse.json({ error: "Property not found." }, { status: 404 }); return NextResponse.json({ ok: true }); }
  catch { return NextResponse.json({ error: "Property services are not available right now." }, { status: 503 }); }
}
