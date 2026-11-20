/* ============================================================
   Password gate for /admin. Set ADMIN_PASSWORD in Vercel
   (Project → Settings → Environment Variables). Changing the
   password signs everyone out.
   ============================================================ */

import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "fow_admin";

function tokenFor(password: string) {
  return createHmac("sha256", password).update("fow-admin-session-v1").digest("hex");
}

function same(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export function adminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function passwordMatches(input: string) {
  const pw = process.env.ADMIN_PASSWORD;
  return Boolean(pw) && same(tokenFor(input), tokenFor(pw!));
}

export function sessionToken() {
  return tokenFor(process.env.ADMIN_PASSWORD || "");
}

export async function isAdmin() {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return false;
  const value = (await cookies()).get(ADMIN_COOKIE)?.value || "";
  return same(value, tokenFor(pw));
}
