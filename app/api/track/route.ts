/* ============================================================
   POST /api/track — records one anonymous analytics hit.
   Sent by components/Tracker.tsx (page views + link clicks)
   and by the AI test page (its own events). Never stores IPs,
   names or anything typed into forms.
   ============================================================ */

import { K, DAY_TTL, dayEAT, pipeline, storeConfigured } from "@/lib/store";

export const runtime = "nodejs";

const BOT = /bot|crawl|spider|slurp|preview|facebookexternalhit|headless|lighthouse|vercel-screenshot/i;
const KINDS = new Set(["internal", "external", "download", "register", "tel", "mailto", "social"]);

const str = (v: unknown, max: number) => (typeof v === "string" ? v.slice(0, max) : "");

export async function POST(req: Request) {
  if (!storeConfigured() || BOT.test(req.headers.get("user-agent") || "")) {
    return new Response(null, { status: 204 });
  }

  let body: Record<string, unknown>;
  try {
    const text = await req.text();
    if (text.length > 4000) return new Response(null, { status: 413 });
    body = JSON.parse(text);
  } catch {
    return new Response(null, { status: 400 });
  }

  const d = dayEAT();
  const path = str(body.path, 200) || "/";
  if (path.startsWith("/admin")) return new Response(null, { status: 204 });
  const vid = str(body.vid, 64);
  const cmds: (string | number)[][] = [];
  let recent: Record<string, unknown> | null = null;

  if (body.t === "pageview") {
    cmds.push(["HINCRBY", K.day(d), "pv", 1], ["HINCRBY", K.pages(d), path, 1]);
    if (vid) cmds.push(["PFADD", K.uv(d), vid]);
    const ref = str(body.ref, 300);
    try {
      const host = ref ? new URL(ref).hostname.replace(/^www\./, "") : "";
      const self = new URL(req.url).hostname.replace(/^www\./, "");
      cmds.push(["HINCRBY", K.refs(d), host && host !== self ? host : "(direct)", 1]);
    } catch {
      /* bad referrer — skip */
    }
  } else if (body.t === "click") {
    const kind = KINDS.has(str(body.kind, 20)) ? str(body.kind, 20) : "external";
    const href = str(body.href, 300);
    const label = str(body.label, 80).replace(/\s+/g, " ").trim();
    if (!href) return new Response(null, { status: 400 });
    cmds.push(
      ["HINCRBY", K.day(d), "click", 1],
      ["HINCRBY", K.links(d), JSON.stringify({ k: kind, h: href, l: label }), 1],
    );
    if (kind === "download") cmds.push(["HINCRBY", K.day(d), "download", 1]);
    if (kind === "register") cmds.push(["HINCRBY", K.day(d), "register", 1]);
    recent = { type: kind === "download" ? "download" : "click", kind, label: label || href, href };
  } else if (body.t === "event") {
    const name = str(body.name, 60).replace(/[^\w-]/g, "");
    if (!name) return new Response(null, { status: 400 });
    const detail = str(body.detail, 60).replace(/\s+/g, " ").trim();
    cmds.push(["HINCRBY", K.events(d), detail ? `${name} · ${detail}` : name, 1]);
    // The AI test's saved result image counts as a download.
    if (name === "ai_test_share" && detail === "image") cmds.push(["HINCRBY", K.day(d), "download", 1]);
    if (name === "ai_test_register_click") cmds.push(["HINCRBY", K.day(d), "register", 1]);
    recent = { type: "event", label: detail ? `${name} · ${detail}` : name };
  } else {
    return new Response(null, { status: 400 });
  }

  for (const key of [K.day(d), K.pages(d), K.links(d), K.events(d), K.refs(d), K.uv(d)]) {
    if (cmds.some((c) => c[1] === key)) cmds.push(["EXPIRE", key, DAY_TTL]);
  }
  if (recent) {
    cmds.push(
      ["LPUSH", K.recent, JSON.stringify({ ...recent, path, at: new Date().toISOString() })],
      ["LTRIM", K.recent, 0, 199],
    );
  }

  try {
    await pipeline(cmds);
  } catch {
    /* analytics must never break the site */
  }
  return new Response(null, { status: 204 });
}
