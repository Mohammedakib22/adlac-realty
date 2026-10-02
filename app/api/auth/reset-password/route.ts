import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { connectMongo } from "@/lib/mongodb";
import User from "@/models/User";
import PasswordReset from "@/models/PasswordReset";

export const runtime = "nodejs";
const schema = z.object({ token: z.string().length(64), password: z.string().min(10).max(128) });

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "The reset link is invalid or expired." }, { status: 400 });
  try {
    await connectMongo();
    const tokenHash = createHash("sha256").update(parsed.data.token).digest("hex");
    const reset = await PasswordReset.findOne({ tokenHash, expiresAt: { $gt: new Date() } });
    if (!reset) return NextResponse.json({ error: "The reset link is invalid or expired." }, { status: 400 });
    const passwordHash = await bcrypt.hash(parsed.data.password, 12);
    await User.updateOne({ _id: reset.userId }, { $set: { passwordHash } });
    await PasswordReset.deleteMany({ userId: reset.userId });
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ error: "Account services are not available right now." }, { status: 503 }); }
}
