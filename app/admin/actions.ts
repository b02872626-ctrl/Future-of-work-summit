"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, passwordMatches, sessionToken } from "@/lib/admin-auth";

export async function login(formData: FormData) {
  const password = String(formData.get("password") || "");
  if (!passwordMatches(password)) {
    // Slow down guessing a little.
    await new Promise((r) => setTimeout(r, 800));
    redirect("/admin?error=1");
  }
  (await cookies()).set(ADMIN_COOKIE, sessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  redirect("/admin");
}

export async function logout() {
  (await cookies()).delete(ADMIN_COOKIE);
  redirect("/admin");
}
