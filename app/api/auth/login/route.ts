import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { connectMongo } from "@/lib/mongodb";
import { createSession, sessionCookie } from "@/lib/session";
import User from "@/models/User";

export const runtime = "nodejs";
const schema = z.object({ email: z.email().max(254), password: z.string().min(1).max(128) });

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Email or password is incorrect." }, { status: 400 });
  try {
    await connectMongo();
    if (!process.env.AUTH_SECRET || process.env.AUTH_SECRET.length < 32) return NextResponse.json({ error: "Authentication is not configured." }, { status: 503 });
    const user = await User.findOne({ email: parsed.data.email.toLowerCase(), active: true }).select("+passwordHash");
    if (!user || !(await bcrypt.compare(parsed.data.password, user.passwordHash))) return NextResponse.json({ error: "Email or password is incorrect." }, { status: 401 });
    const safeUser = { id: String(user._id), name: user.name, email: user.email, role: user.role as "USER" | "AGENT" | "ADMIN" };
    const token = await createSession(safeUser);
    const response = NextResponse.json({ user: safeUser });
    response.cookies.set(sessionCookie.name, token, sessionCookie);
    return response;
  } catch {
    return NextResponse.json({ error: "Account services are not available right now." }, { status: 503 });
  }
}
