/* Reads and aggregates analytics for the admin dashboard. Server-only. */

import { K, dayEAT, hashToMap, pipeline } from "@/lib/store";

export type LinkRow = { kind: string; href: string; label: string; count: number };
export type Recent = { type: string; kind?: string; label: string; href?: string; path?: string; at: string };
export type Message = { firstName: string; lastName: string; contact: string; message: string; at: string };

export type Dashboard = {
  days: { date: string; pv: number; uv: number; click: number }[];
  totals: { pv: number; uv: number; click: number; download: number; register: number; form: number };
  pages: [string, number][];
  links: LinkRow[];
  events: [string, number][];
  refs: [string, number][];
  recent: Recent[];
  messages: Message[];
  messageCount: number;
};

function lastDays(n: number) {
  const out: string[] = [];
  const now = Date.now();
  for (let i = n - 1; i >= 0; i--) out.push(dayEAT(new Date(now - i * 864e5)));
  return [...new Set(out)];
}

function sum(into: Record<string, number>, from: Record<string, number>) {
  for (const [k, v] of Object.entries(from)) into[k] = (into[k] || 0) + v;
}

const sorted = (m: Record<string, number>) => Object.entries(m).sort((a, b) => b[1] - a[1]);

function parseList<T>(raw: unknown): T[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((r) => {
    try {
      return [JSON.parse(String(r)) as T];
    } catch {
      return [];
    }
  });
}

export async function loadDashboard(range: number): Promise<Dashboard> {
  const dates = lastDays(range);
  const PER_DAY = 6;
  const cmds: (string | number)[][] = [];
  for (const d of dates) {
    cmds.push(
      ["HGETALL", K.day(d)],
      ["HGETALL", K.pages(d)],
      ["HGETALL", K.links(d)],
      ["HGETALL", K.events(d)],
      ["HGETALL", K.refs(d)],
      ["PFCOUNT", K.uv(d)],
    );
  }
  cmds.push(["PFCOUNT", ...dates.map((d) => K.uv(d))], ["LRANGE", K.recent, 0, 59], ["LRANGE", K.contact, 0, 199], ["LLEN", K.contact]);

  const res = await pipeline(cmds);

  const totals = { pv: 0, uv: 0, click: 0, download: 0, register: 0, form: 0 };
  const pages: Record<string, number> = {};
  const linksRaw: Record<string, number> = {};
  const events: Record<string, number> = {};
  const refs: Record<string, number> = {};
  const days: Dashboard["days"] = [];

  dates.forEach((date, i) => {
    const base = i * PER_DAY;
    const day = hashToMap(res[base]);
    sum(pages, hashToMap(res[base + 1]));
    sum(linksRaw, hashToMap(res[base + 2]));
    sum(events, hashToMap(res[base + 3]));
    sum(refs, hashToMap(res[base + 4]));
    const uv = Number(res[base + 5]) || 0;
    totals.pv += day.pv || 0;
    totals.click += day.click || 0;
    totals.download += day.download || 0;
    totals.register += day.register || 0;
    totals.form += day.form || 0;
    days.push({ date, pv: day.pv || 0, uv, click: day.click || 0 });
  });

  const tail = dates.length * PER_DAY;
  totals.uv = Number(res[tail]) || 0;

  const links: LinkRow[] = sorted(linksRaw).flatMap(([field, count]) => {
    try {
      const { k, h, l } = JSON.parse(field) as { k: string; h: string; l: string };
      return [{ kind: k, href: h, label: l, count }];
    } catch {
      return [];
    }
  });

  return {
    days,
    totals,
    pages: sorted(pages),
    links,
    events: sorted(events),
    refs: sorted(refs),
    recent: parseList<Recent>(res[tail + 1]),
    messages: parseList<Message>(res[tail + 2]),
    messageCount: Number(res[tail + 3]) || 0,
  };
}
