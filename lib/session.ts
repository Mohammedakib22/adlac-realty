import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

export type UserRole = "USER" | "AGENT" | "ADMIN";
export type SessionUser = { id: string; name: string; email: string; role: UserRole };
const cookieName = "aldac_session";

function secretKey() {
  const value = process.env.AUTH_SECRET;
  if (!value || value.length < 32) throw new Error("AUTH_SECRET must contain at least 32 characters.");
  return new TextEncoder().encode(value);
}

export async function createSession(user: SessionUser) {
  return new SignJWT(user).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("7d").sign(secretKey());
}

export async function getSession(): Promise<SessionUser | null> {
  const token = (await cookies()).get(cookieName)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey());
    if (typeof payload.id !== "string" || typeof payload.email !== "string" || typeof payload.name !== "string") return null;
    const role = payload.role;
    if (role !== "USER" && role !== "AGENT" && role !== "ADMIN") return null;
    return { id: payload.id, name: payload.name, email: payload.email, role };
  } catch { return null; }
}

export const sessionCookie = { name: cookieName, httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" as const, path: "/", maxAge: 60 * 60 * 24 * 7 };
