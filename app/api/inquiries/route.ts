import { NextResponse } from "next/server";
import { z } from "zod";
import { connectMongo } from "@/lib/mongodb";
import { getSession } from "@/lib/session";
import Inquiry from "@/models/Inquiry";

export const runtime = "nodejs";
const schema = z.object({ propertyId: z.string().max(160).optional(), propertyName: z.string().max(160).optional(), agent: z.string().max(120).optional(), name: z.string().trim().min(2).max(120), email: z.email().max(254), phone: z.string().max(24).optional(), subject: z.string().max(160).optional(), message: z.string().trim().min(10).max(4000) });
export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Please check the contact details and message." }, { status: 400 });
  try { await connectMongo(); const session = await getSession(); const entry = await Inquiry.create({ ...parsed.data, email: parsed.data.email.toLowerCase(), ...(session && { userId: session.id }) }); return NextResponse.json({ inquiry: { id: String(entry._id), status: entry.status } }, { status: 201 }); }
  catch { return NextResponse.json({ error: "Enquiry services are not available right now." }, { status: 503 }); }
}
export async function GET() {
  const session = await getSession(); if (session?.role !== "ADMIN") return NextResponse.json({ error: "Administrator access is required." }, { status: 403 });
  try { await connectMongo(); const inquiries = await Inquiry.find().sort({ createdAt: -1 }).limit(200).lean(); return NextResponse.json({ inquiries }); }
  catch { return NextResponse.json({ error: "Enquiry services are not available right now." }, { status: 503 }); }
}
