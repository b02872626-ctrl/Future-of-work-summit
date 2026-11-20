/* GET /admin/export — contact form submissions as a CSV file (admins only). */

import { isAdmin } from "@/lib/admin-auth";
import { K, pipeline } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const cell = (v: unknown) => {
  let s = String(v ?? "");
  if (/^[=+\-@]/.test(s)) s = "'" + s; // stop spreadsheet formula injection
  return `"${s.replace(/"/g, '""')}"`;
};

export async function GET() {
  if (!(await isAdmin())) return new Response("Not found", { status: 404 });
  const [raw] = await pipeline([["LRANGE", K.contact, 0, -1]]);
  const rows = (Array.isArray(raw) ? raw : []).map((r) => {
    try {
      return JSON.parse(String(r));
    } catch {
      return null;
    }
  });
  const lines = [["Received (UTC)", "First name", "Last name", "Email or phone", "Message"].map(cell).join(",")];
  for (const r of rows) if (r) lines.push([r.at, r.firstName, r.lastName, r.contact, r.message].map(cell).join(","));
  return new Response("﻿" + lines.join("\r\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="contact-messages.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
