import { NextResponse } from "next/server";
import { z } from "zod";
import { connectMongo } from "@/lib/mongodb";
import { getSession } from "@/lib/session";
import PropertySubmission from "@/models/PropertySubmission";

const schema = z.object({ status: z.enum(["approved", "declined", "pending"]) });
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) { const session = await getSession(); if (session?.role !== "ADMIN") return NextResponse.json({ error: "Administrator access is required." }, { status: 403 }); const parsed = schema.safeParse(await request.json().catch(() => null)); if (!parsed.success) return NextResponse.json({ error: "Choose a valid review status." }, { status: 400 }); try { await connectMongo(); const { id } = await params; const result = await PropertySubmission.findByIdAndUpdate(id, { $set: { status: parsed.data.status } }, { new: true }); if (!result) return NextResponse.json({ error: "Submission not found." }, { status: 404 }); return NextResponse.json({ submission: result }); } catch { return NextResponse.json({ error: "Property submissions are not available right now." }, { status: 503 }); } }
