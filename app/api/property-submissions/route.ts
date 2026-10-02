import { NextResponse } from "next/server";
import { z } from "zod";
import { connectMongo } from "@/lib/mongodb";
import { getSession } from "@/lib/session";
import PropertySubmission from "@/models/PropertySubmission";

export const runtime = "nodejs";
const schema = z.object({ title: z.string().trim().min(5).max(140), description: z.string().trim().min(30).max(12000), listing: z.enum(["Buy", "Rent"]), type: z.enum(["Apartment", "Villa", "Penthouse", "Studio", "Plot"]), building: z.string().max(160).optional(), address: z.string().trim().min(5).max(300), city: z.string().min(2).max(80), locality: z.string().min(2).max(120), pincode: z.string().regex(/^[0-9]{6}$/), price: z.coerce.number().positive(), priceNote: z.string().max(120).optional(), beds: z.coerce.number().int().min(0).max(20), baths: z.coerce.number().int().min(0).max(20), area: z.coerce.number().min(50).max(100000), furnishing: z.string().max(40).optional(), parking: z.string().max(20).optional(), amenities: z.union([z.array(z.string().max(80)), z.string()]).optional(), photos: z.array(z.url().max(2000)).max(30).optional(), contactName: z.string().trim().min(2).max(120), contactEmail: z.email().max(254), contactPhone: z.string().min(8).max(24), contactTime: z.string().max(80).optional(), consent: z.string().optional() });

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null)); if (!parsed.success) return NextResponse.json({ error: "Review your home details and contact information." }, { status: 400 });
  if (parsed.data.consent !== "on") return NextResponse.json({ error: "Consent is required before submitting your property." }, { status: 400 });
  try { await connectMongo(); const session = await getSession(); const { consent, ...input } = parsed.data; void consent; const submission = await PropertySubmission.create({ ...input, amenities: Array.isArray(input.amenities) ? input.amenities : input.amenities ? [input.amenities] : [], contactEmail: input.contactEmail.toLowerCase(), ...(session && { ownerId: session.id }) }); return NextResponse.json({ submission: { id: String(submission._id), status: submission.status } }, { status: 201 }); }
  catch { return NextResponse.json({ error: "Property submissions are not available right now." }, { status: 503 }); }
}

export async function GET() {
  const session = await getSession(); if (session?.role !== "ADMIN") return NextResponse.json({ error: "Administrator access is required." }, { status: 403 });
  try { await connectMongo(); const submissions = await PropertySubmission.find().sort({ createdAt: -1 }).limit(200).lean(); return NextResponse.json({ submissions }); }
  catch { return NextResponse.json({ error: "Property submissions are not available right now." }, { status: 503 }); }
}
