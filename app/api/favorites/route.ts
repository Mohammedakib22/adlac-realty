import { NextResponse } from "next/server";
import { z } from "zod";
import { connectMongo } from "@/lib/mongodb";
import { getSession } from "@/lib/session";
import Favorite from "@/models/Favorite";

export const runtime = "nodejs";
const schema = z.object({ propertyId: z.string().min(1).max(160), saved: z.boolean() });
export async function GET() {
  const session = await getSession(); if (!session) return NextResponse.json({ error: "Sign in to load saved homes." }, { status: 401 });
  try { await connectMongo(); const favorites = await Favorite.find({ userId: session.id }).select("propertyId").lean(); return NextResponse.json({ favorites: favorites.map(item => item.propertyId) }); }
  catch { return NextResponse.json({ error: "Saved homes are not available right now." }, { status: 503 }); }
}
export async function POST(request: Request) {
  const session = await getSession(); if (!session) return NextResponse.json({ error: "Sign in to save homes." }, { status: 401 });
  const parsed = schema.safeParse(await request.json().catch(() => null)); if (!parsed.success) return NextResponse.json({ error: "Choose a valid home." }, { status: 400 });
  try { await connectMongo(); if (parsed.data.saved) await Favorite.updateOne({ userId: session.id, propertyId: parsed.data.propertyId }, { $setOnInsert: { userId: session.id, propertyId: parsed.data.propertyId } }, { upsert: true }); else await Favorite.deleteOne({ userId: session.id, propertyId: parsed.data.propertyId }); return NextResponse.json({ ok: true }); }
  catch { return NextResponse.json({ error: "Saved homes are not available right now." }, { status: 503 }); }
}
