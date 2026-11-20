/* ============================================================
   /admin — private dashboard: visits, link clicks, downloads,
   registration clicks, AI test activity and contact messages.
   Password: ADMIN_PASSWORD env var. Data: Upstash Redis.
   ============================================================ */

import type { Metadata } from "next";
import Link from "next/link";
import { adminConfigured, isAdmin } from "@/lib/admin-auth";
import { storeConfigured } from "@/lib/store";
import { loadDashboard, type Dashboard, type LinkRow } from "@/lib/admin-data";
import { login, logout } from "./actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Admin · Future of Work Summit",
  robots: { index: false, follow: false },
};

const RANGES = [
  { days: 1, label: "Today" },
  { days: 7, label: "7 days" },
  { days: 30, label: "30 days" },
  { days: 90, label: "90 days" },
];

const KIND_LABEL: Record<string, string> = {
  internal: "Page link",
  external: "External",
  download: "Download",
  register: "Registration",
  tel: "Phone call",
  mailto: "Email",
  social: "Social",
};

const nf = new Intl.NumberFormat("en-US");
const fmt = (n: number) => nf.format(n);

const dateTime = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Addis_Ababa",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));

const shortDay = (d: string) =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", timeZone: "UTC" }).format(new Date(d + "T00:00:00Z"));

/* ---------- Shell ---------- */

function Shell({ children }: { children: React.ReactNode }) {
  return <main className="min-h-screen bg-ink text-cream">{children}</main>;
}

function Card({ title, children, action, className = "" }: { title: string; children: React.ReactNode; action?: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-xl border border-cream/10 bg-cream/[0.03] p-5 md:p-6 ${className}`}>
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-cream/70">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function Empty({ children = "Nothing yet for this period." }: { children?: React.ReactNode }) {
  return <p className="py-6 text-sm text-cream/45">{children}</p>;
}

/* ---------- Login + setup ---------- */

function Login({ error }: { error: boolean }) {
  return (
    <Shell>
      <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-4">
        <h1 className="text-2xl font-bold">Admin dashboard</h1>
        <p className="mt-2 text-sm text-cream/60">Future of Work Summit</p>
        <form action={login} className="mt-8 space-y-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoFocus
            required
            className="w-full rounded-md border border-cream/15 bg-cream/5 px-4 py-3 text-cream outline-none placeholder:text-cream/40 focus:border-magenta focus:ring-2 focus:ring-magenta/30"
          />
          {error && <p className="text-sm text-magenta" role="alert">That password is not right.</p>}
          <button className="w-full rounded-full bg-magenta px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-cream transition hover:brightness-110">
            Sign in
          </button>
        </form>
      </div>
    </Shell>
  );
}

function Setup({ needPassword, needStore }: { needPassword: boolean; needStore: boolean }) {
  return (
    <Shell>
      <div className="mx-auto max-w-xl px-4 py-24">
        <h1 className="text-2xl font-bold">Admin dashboard — setup needed</h1>
        <ol className="mt-6 list-decimal space-y-4 pl-5 text-cream/80">
          {needStore && (
            <li>
              In Vercel, open this project → <b>Storage</b> → add <b>Upstash for Redis</b> (free plan) and connect it to the
              project. That sets <code className="text-magenta">KV_REST_API_URL</code> and{" "}
              <code className="text-magenta">KV_REST_API_TOKEN</code>.
            </li>
          )}
          {needPassword && (
            <li>
              In <b>Settings → Environment Variables</b>, add <code className="text-magenta">ADMIN_PASSWORD</code> with a strong password.
            </li>
          )}
          <li>Redeploy, then come back to /admin.</li>
        </ol>
      </div>
    </Shell>
  );
}

/* ---------- Pieces ---------- */

function Stat({ label, value, hint }: { label: string; value: number; hint?: string }) {
  return (
    <div className="rounded-xl border border-cream/10 bg-cream/[0.03] p-4 md:p-5">
      <p className="text-xs text-cream/60">{label}</p>
      <p className="mt-2 text-3xl font-semibold tabular-nums md:text-4xl">{fmt(value)}</p>
      {hint && <p className="mt-1 text-xs text-cream/45">{hint}</p>}
    </div>
  );
}

function niceMax(n: number) {
  if (n <= 4) return 4;
  const pow = 10 ** Math.floor(Math.log10(n));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * pow).find((s) => s * 4 >= n)!;
  return step * 4;
}

/** Single-series column chart of daily page views, with hover/focus tooltips and a table view. */
function DailyChart({ days }: { days: Dashboard["days"] }) {
  const max = niceMax(Math.max(...days.map((d) => d.pv), 0));
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(max * f));
  const showEvery = Math.ceil(days.length / 6);
  return (
    <div>
      <div className="relative flex h-56 pl-10">
        {/* Gridlines + y ticks */}
        <div className="pointer-events-none absolute inset-0 left-10">
          {ticks.map((t) => (
            <div key={t} className="absolute inset-x-0 border-t border-cream/10" style={{ bottom: `${(t / max) * 100}%` }}>
              <span className="absolute -left-10 -translate-y-1/2 w-8 text-right text-[11px] tabular-nums text-cream/45">{fmt(t)}</span>
            </div>
          ))}
        </div>
        <div className="relative flex flex-1 items-end gap-[2px]">
          {days.map((d) => (
            <div
              key={d.date}
              tabIndex={0}
              className="group relative flex h-full flex-1 items-end justify-center outline-none"
              aria-label={`${shortDay(d.date)}: ${d.pv} page views, ${d.uv} visitors, ${d.click} link clicks`}
            >
              <div
                className="w-full max-w-[24px] rounded-t-[4px] bg-magenta transition-opacity group-hover:opacity-80"
                style={{ height: `${(d.pv / max) * 100}%`, minHeight: d.pv ? 2 : 0 }}
              />
              <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 hidden -translate-x-1/2 whitespace-nowrap rounded-md border border-cream/15 bg-ink px-3 py-2 text-xs shadow-lg group-hover:block group-focus:block">
                <p className="font-semibold">{shortDay(d.date)}</p>
                <p className="text-cream/80">{fmt(d.pv)} page views</p>
                <p className="text-cream/60">{fmt(d.uv)} visitors · {fmt(d.click)} clicks</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 flex gap-[2px] pl-10">
        {days.map((d, i) => (
          <span key={d.date} className="relative h-4 flex-1">
            {(i % showEvery === 0 || days.length <= 6) && (
              <span className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] text-cream/45">{shortDay(d.date)}</span>
            )}
          </span>
        ))}
      </div>
      <details className="mt-4 text-sm">
        <summary className="cursor-pointer text-cream/60 hover:text-cream">Show as table</summary>
        <table className="mt-3 w-full text-left">
          <thead className="text-xs text-cream/50">
            <tr>
              <th className="py-1 font-normal">Day</th>
              <th className="py-1 text-right font-normal">Page views</th>
              <th className="py-1 text-right font-normal">Visitors</th>
              <th className="py-1 text-right font-normal">Link clicks</th>
            </tr>
          </thead>
          <tbody className="tabular-nums">
            {[...days].reverse().map((d) => (
              <tr key={d.date} className="border-t border-cream/10">
                <td className="py-1.5">{shortDay(d.date)}</td>
                <td className="py-1.5 text-right">{fmt(d.pv)}</td>
                <td className="py-1.5 text-right">{fmt(d.uv)}</td>
                <td className="py-1.5 text-right">{fmt(d.click)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </div>
  );
}

/** Ranked list with a thin proportion bar under each row. */
function Ranked({ rows, limit = 10 }: { rows: { key: string; label: React.ReactNode; sub?: React.ReactNode; count: number }[]; limit?: number }) {
  if (!rows.length) return <Empty />;
  const max = rows[0].count || 1;
  return (
    <ul className="space-y-3">
      {rows.slice(0, limit).map((r) => (
        <li key={r.key}>
          <div className="flex items-baseline justify-between gap-4 text-sm">
            <div className="min-w-0">
              <p className="truncate">{r.label}</p>
              {r.sub && <p className="truncate text-xs text-cream/45">{r.sub}</p>}
            </div>
            <span className="shrink-0 tabular-nums text-cream/80">{fmt(r.count)}</span>
          </div>
          <div className="mt-1.5 h-1 rounded-full bg-cream/10">
            <div className="h-1 rounded-full bg-magenta/70" style={{ width: `${(r.count / max) * 100}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

function Badge({ kind }: { kind: string }) {
  return (
    <span className="mr-2 inline-block rounded-full border border-cream/20 px-2 py-0.5 text-[10px] uppercase tracking-wider text-cream/70">
      {KIND_LABEL[kind] || kind}
    </span>
  );
}

function linkRows(links: LinkRow[]) {
  return links.map((l) => ({
    key: `${l.kind}|${l.href}|${l.label}`,
    label: (
      <>
        <Badge kind={l.kind} />
        {l.label || l.href}
      </>
    ),
    sub: l.href.replace(/^https?:\/\/(www\.)?/, ""),
    count: l.count,
  }));
}

const AI_STEPS = [
  { name: "ai_test_start", label: "Started the test" },
  { name: "ai_test_complete", label: "Finished the test" },
  { name: "ai_test_share", label: "Shared or saved result" },
  { name: "ai_test_register_click", label: "Clicked register" },
  { name: "ai_test_retake", label: "Retook the test" },
];

/* ---------- Page ---------- */

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ range?: string; error?: string }> }) {
  const sp = await searchParams;
  const needPassword = !adminConfigured();
  const needStore = !storeConfigured();
  if (needPassword || needStore) return <Setup needPassword={needPassword} needStore={needStore} />;
  if (!(await isAdmin())) return <Login error={sp.error === "1"} />;

  const range = RANGES.find((r) => String(r.days) === sp.range)?.days ?? 7;
  let data: Dashboard;
  try {
    data = await loadDashboard(range);
  } catch {
    return (
      <Shell>
        <p className="p-10">Couldn&apos;t reach the database. Check the Upstash connection in Vercel and reload.</p>
      </Shell>
    );
  }

  const { totals } = data;
  const downloads = data.links.filter((l) => l.kind === "download");
  const outbound = data.links.filter((l) => ["register", "external", "social", "tel", "mailto"].includes(l.kind));
  const aiCount = (name: string) => data.events.filter(([k]) => k === name || k.startsWith(name + " · ")).reduce((s, [, v]) => s + v, 0);
  const aiDetails = data.events.filter(([k]) => k.startsWith("ai_test_") && k.includes(" · "));

  return (
    <Shell>
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">
        {/* Header */}
        <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-cream/50">Future of Work Summit</p>
            <h1 className="mt-2 text-3xl font-bold md:text-4xl">Admin dashboard</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <nav className="flex rounded-full border border-cream/15 p-1" aria-label="Date range">
              {RANGES.map((r) => (
                <Link
                  key={r.days}
                  href={`/admin?range=${r.days}`}
                  aria-current={r.days === range ? "page" : undefined}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                    r.days === range ? "bg-magenta text-cream" : "text-cream/70 hover:text-cream"
                  }`}
                >
                  {r.label}
                </Link>
              ))}
            </nav>
            <form action={logout}>
              <button className="rounded-full border border-cream/15 px-4 py-2 text-xs text-cream/70 hover:text-cream">Sign out</button>
            </form>
          </div>
        </header>

        {/* Stat tiles */}
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          <Stat label="Page views" value={totals.pv} />
          <Stat label="Unique visitors" value={totals.uv} hint="Approximate, per browser" />
          <Stat label="Link clicks" value={totals.click} />
          <Stat label="Downloads" value={totals.download} hint="Files + AI test images" />
          <Stat label="Registration clicks" value={totals.register} hint="Opened the sign-up form" />
          <Stat label="Contact messages" value={totals.form} />
        </div>

        {/* Daily chart */}
        <Card title="Page views per day" className="mt-6">
          <DailyChart days={data.days} />
        </Card>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card title="Top pages">
            <Ranked rows={data.pages.map(([p, c]) => ({ key: p, label: p, count: c }))} />
          </Card>
          <Card title="Where visitors come from">
            <Ranked rows={data.refs.map(([r, c]) => ({ key: r, label: r, count: c }))} />
          </Card>
          <Card title="Most clicked links">
            <Ranked rows={linkRows(data.links)} limit={12} />
          </Card>
          <Card title="Downloads">
            <Ranked
              rows={[
                ...linkRows(downloads),
                ...(aiCount("ai_test_share · image")
                  ? [{ key: "ai-img", label: <><Badge kind="download" />AI test result image</>, sub: "my-ai-skills-result.png", count: aiCount("ai_test_share · image") }]
                  : []),
              ].sort((a, b) => b.count - a.count)}
            />
          </Card>
          <Card title="Registration, social & contact links">
            <Ranked rows={linkRows(outbound)} limit={12} />
          </Card>
          <Card title="AI skills test">
            {aiCount("ai_test_start") + aiCount("ai_test_complete") === 0 ? (
              <Empty />
            ) : (
              <>
                <Ranked rows={AI_STEPS.map((s) => ({ key: s.name, label: s.label, count: aiCount(s.name) }))} />
                {aiDetails.length > 0 && (
                  <details className="mt-4 text-sm">
                    <summary className="cursor-pointer text-cream/60 hover:text-cream">Breakdown by level & share channel</summary>
                    <ul className="mt-3 space-y-1">
                      {aiDetails.map(([k, v]) => (
                        <li key={k} className="flex justify-between border-t border-cream/10 py-1.5">
                          <span>{k.replace(/^ai_test_/, "").replace(/_/g, " ")}</span>
                          <span className="tabular-nums">{fmt(v)}</span>
                        </li>
                      ))}
                    </ul>
                  </details>
                )}
              </>
            )}
          </Card>
        </div>

        {/* Contact messages */}
        <Card
          title={`Contact messages (${fmt(data.messageCount)} total)`}
          className="mt-6"
          action={
            data.messageCount > 0 ? (
              <a href="/admin/export" className="rounded-full border border-cream/15 px-4 py-1.5 text-xs text-cream/80 hover:border-magenta hover:text-cream">
                Download CSV
              </a>
            ) : null
          }
        >
          {data.messages.length === 0 ? (
            <Empty>No messages yet.</Empty>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="text-xs text-cream/50">
                  <tr>
                    <th className="py-2 pr-4 font-normal">Received</th>
                    <th className="py-2 pr-4 font-normal">Name</th>
                    <th className="py-2 pr-4 font-normal">Email / phone</th>
                    <th className="py-2 font-normal">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {data.messages.map((m, i) => (
                    <tr key={m.at + i} className="border-t border-cream/10 align-top">
                      <td className="whitespace-nowrap py-3 pr-4 text-cream/60">{dateTime(m.at)}</td>
                      <td className="whitespace-nowrap py-3 pr-4">{m.firstName} {m.lastName}</td>
                      <td className="py-3 pr-4">{m.contact}</td>
                      <td className="whitespace-pre-wrap py-3 text-cream/85">{m.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        {/* Live feed */}
        <Card title="Latest activity" className="mt-6">
          {data.recent.length === 0 ? (
            <Empty>No clicks, downloads or submissions yet.</Empty>
          ) : (
            <ul className="divide-y divide-cream/10 text-sm">
              {data.recent.map((r, i) => (
                <li key={r.at + i} className="flex items-baseline justify-between gap-4 py-2">
                  <span className="min-w-0 truncate">
                    <Badge kind={r.type === "form" ? "Form" : r.type === "event" ? "Event" : r.kind || r.type} />
                    {r.type === "event" ? r.label.replace(/^ai_test_/, "AI test: ").replace(/_/g, " ") : r.label}
                    {r.path && <span className="text-cream/45"> · on {r.path}</span>}
                  </span>
                  <span className="shrink-0 text-xs text-cream/50">{dateTime(r.at)}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <p className="mt-8 text-xs text-cream/40">
          Times are Addis Ababa time. Visitor counts are also available in Vercel → Analytics. Registrations themselves are in the
          Google Form&apos;s Responses tab.
        </p>
      </div>
    </Shell>
  );
}
