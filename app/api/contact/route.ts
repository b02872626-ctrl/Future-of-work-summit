/* ============================================================
   POST /api/contact — saves a "Send a message" submission so it
   shows up in the admin dashboard (/admin).
   ============================================================ */

import { K, DAY_TTL, dayEAT, pipeline, storeConfigured } from "@/lib/store";

export const runtime = "nodejs";

const field = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real people never see or fill this field.
  if (field(body.website, 200)) return Response.json({ ok: true });

  const entry = {
    firstName: field(body.first_name, 80),
    lastName: field(body.last_name, 80),
    contact: field(body.contact, 160),
    message: field(body.message, 4000),
    at: new Date().toISOString(),
  };
  if (!entry.firstName || !entry.contact || !entry.message) {
    return Response.json({ ok: false, error: "Please fill in every field." }, { status: 400 });
  }
  if (!storeConfigured()) {
    return Response.json(
      { ok: false, error: "The form isn't connected yet. Please email or call us instead." },
      { status: 503 },
    );
  }

  const d = dayEAT();
  try {
    await pipeline([
      ["LPUSH", K.contact, JSON.stringify(entry)],
      ["LTRIM", K.contact, 0, 1999],
      ["HINCRBY", K.day(d), "form", 1],
      ["HINCRBY", K.events(d), "form_submit · contact", 1],
      ["EXPIRE", K.day(d), DAY_TTL],
      ["EXPIRE", K.events(d), DAY_TTL],
      [
        "LPUSH",
        K.recent,
        JSON.stringify({ type: "form", label: `Contact form · ${entry.firstName} ${entry.lastName}`.trim(), path: "/contact", at: entry.at }),
      ],
      ["LTRIM", K.recent, 0, 199],
    ]);
  } catch {
    return Response.json({ ok: false, error: "Something went wrong. Please try again." }, { status: 500 });
  }
  return Response.json({ ok: true });
}
