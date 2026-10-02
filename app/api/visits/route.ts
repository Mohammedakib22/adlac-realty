import { NextResponse } from "next/server";
import { z } from "zod";
import { connectMongo } from "@/lib/mongodb";
import { getSession } from "@/lib/session";
import Visit from "@/models/Visit";

export const runtime = "nodejs";
const schema = z.object({ propertyId: z.string().min(1).max(160), propertyName: z.string().min(2).max(160), name: z.string().trim().min(2).max(120), email: z.email().max(254), phone: z.string().min(8).max(24), date: z.iso.date(), time: z.string().min(2).max(30), message: z.string().max(2000).optional() });
export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Please check the visit request details." }, { status: 400 });
  const date = new Date(`${parsed.data.date}T00:00:00`); if (date <= new Date(new Date().toISOString().slice(0, 10))) return NextResponse.json({ error: "Choose a date in the future." }, { status: 400 });
  try { await connectMongo(); const session = await getSession(); const visit = await Visit.create({ ...parsed.data, date, email: parsed.data.email.toLowerCase(), ...(session && { userId: session.id }) }); return NextResponse.json({ visit: { id: String(visit._id), status: visit.status } }, { status: 201 }); }
  catch { return NextResponse.json({ error: "Visit scheduling is not available right now." }, { status: 503 }); }
}
export async function GET() {
  const session = await getSession(); if (session?.role !== "ADMIN") return NextResponse.json({ error: "Administrator access is required." }, { status: 403 });
  try { await connectMongo(); const visits = await Visit.find().sort({ date: 1 }).limit(200).lean(); return NextResponse.json({ visits }); }
  catch { return NextResponse.json({ error: "Visit scheduling is not available right now." }, { status: 503 }); }
}
