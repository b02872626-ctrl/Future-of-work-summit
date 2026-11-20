/* ============================================================
   Tiny Redis client for the site's own analytics + form inbox.

   Talks to Upstash Redis over its REST API (no extra package).
   On Vercel, add "Upstash for Redis" from the Storage tab /
   Marketplace and connect it to this project — that sets the
   KV_REST_API_URL + KV_REST_API_TOKEN env vars read below.
   Server-only: never import this from a client component.
   ============================================================ */

type Cmd = (string | number)[];

function creds() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ""), token } : null;
}

export function storeConfigured() {
  return creds() !== null;
}

/** Runs several commands in one round trip; returns each command's result. */
export async function pipeline(cmds: Cmd[]): Promise<unknown[]> {
  const c = creds();
  if (!c || cmds.length === 0) return [];
  const res = await fetch(`${c.url}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${c.token}`, "Content-Type": "application/json" },
    body: JSON.stringify(cmds),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Redis error ${res.status}`);
  const out = (await res.json()) as { result?: unknown; error?: string }[];
  return out.map((r) => (r.error ? null : r.result));
}

/** Upstash returns HGETALL as a flat [k1, v1, k2, v2…] array. */
export function hashToMap(raw: unknown): Record<string, number> {
  const map: Record<string, number> = {};
  if (Array.isArray(raw)) {
    for (let i = 0; i + 1 < raw.length; i += 2) map[String(raw[i])] = Number(raw[i + 1]) || 0;
  } else if (raw && typeof raw === "object") {
    for (const [k, v] of Object.entries(raw)) map[k] = Number(v) || 0;
  }
  return map;
}

/* ---------- Keys ---------- */

export const K = {
  /** Daily totals: pv, click, download, form, register… */
  day: (d: string) => `fow:day:${d}`,
  /** Daily page views by path. */
  pages: (d: string) => `fow:pages:${d}`,
  /** Daily link clicks; field = JSON {k: kind, h: href, l: label}. */
  links: (d: string) => `fow:links:${d}`,
  /** Daily custom events; field = "name" or "name · detail". */
  events: (d: string) => `fow:events:${d}`,
  /** Daily referrer hosts. */
  refs: (d: string) => `fow:refs:${d}`,
  /** Daily unique visitors (HyperLogLog of anonymous browser ids). */
  uv: (d: string) => `fow:uv:${d}`,
  /** Latest raw activity (capped list, newest first). */
  recent: "fow:recent",
  /** Contact form submissions (capped list, newest first). */
  contact: "fow:contact",
};

/** Daily keys are dropped after ~13 months. */
export const DAY_TTL = 60 * 60 * 24 * 400;

/** Calendar day in Addis Ababa time, YYYY-MM-DD. */
export function dayEAT(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Addis_Ababa",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}
