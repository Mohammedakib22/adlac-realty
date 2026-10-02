import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { connectMongo } from "@/lib/mongodb";
import { createSession, sessionCookie } from "@/lib/session";
import User from "@/models/User";

export const runtime = "nodejs";
const schema = z.object({ name: z.string().trim().min(2).max(120), email: z.email().max(254), phone: z.string().max(24).optional(), password: z.string().min(10).max(128) });

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Check your details. Passwords must contain at least 10 characters." }, { status: 400 });
  try {
    await connectMongo();
    if (!process.env.AUTH_SECRET || process.env.AUTH_SECRET.length < 32) return NextResponse.json({ error: "Authentication is not configured." }, { status: 503 });
    const email = parsed.data.email.toLowerCase();
    if (await User.exists({ email })) return NextResponse.json({ error: "An account with that email already exists." }, { status: 409 });
    const passwordHash = await bcrypt.hash(parsed.data.password, 12);
    const user = await User.create({ name: parsed.data.name, email, phone: parsed.data.phone, passwordHash, role: "USER" });
    const safeUser = { id: String(user._id), name: user.name, email: user.email, role: user.role as "USER" };
    const token = await createSession(safeUser);
    const response = NextResponse.json({ user: safeUser }, { status: 201 });
    response.cookies.set(sessionCookie.name, token, sessionCookie);
    return response;
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === 11000) return NextResponse.json({ error: "An account with that email already exists." }, { status: 409 });
    return NextResponse.json({ error: "Account services are not available right now." }, { status: 503 });
  }
}
