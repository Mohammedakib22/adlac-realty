import { createHash, randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { connectMongo } from "@/lib/mongodb";
import { sendPasswordResetEmail } from "@/lib/email";
import User from "@/models/User";
import PasswordReset from "@/models/PasswordReset";

export const runtime = "nodejs";
const schema = z.object({ email: z.email().max(254) });

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  const generic = { message: "If an account exists and email delivery is configured, a reset link will be sent shortly." };
  try {
    await connectMongo();
    const user = await User.findOne({ email: parsed.data.email.toLowerCase(), active: true });
    if (!user) return NextResponse.json(generic);
    const token = randomBytes(32).toString("hex");
    const tokenHash = createHash("sha256").update(token).digest("hex");
    await PasswordReset.deleteMany({ userId: user._id });
    await PasswordReset.create({ userId: user._id, tokenHash, expiresAt: new Date(Date.now() + 30 * 60 * 1000) });
    const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL;
    const origin = configuredOrigin ?? (process.env.NODE_ENV !== "production" ? new URL(request.url).origin : null);
    if (!origin) throw new Error("NEXT_PUBLIC_SITE_URL must be configured for production email links.");
    await sendPasswordResetEmail(user.email, `${origin}/reset-password?token=${token}`);
    return NextResponse.json(generic);
  } catch {
    // Keep responses generic to avoid revealing whether an address has an account.
    return NextResponse.json(generic);
  }
}
