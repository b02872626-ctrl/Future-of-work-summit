"use client";

/* ============================================================
   Site-wide tracking, mounted once in app/layout.tsx.
   - Vercel Web Analytics (visitors + page views in Vercel).
   - Our own page views + every link click, sent to /api/track
     so they show up in the admin dashboard (/admin).
   No component needs to opt in: any <a> on the site is counted.
   Add data-track="Some label" to a link to name it explicitly.
   ============================================================ */

import { Analytics } from "@vercel/analytics/next";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const FILE = /\.(pdf|zip|docx?|pptx?|xlsx?|csv|png|jpe?g|mp4|mov)(\?|#|$)/i;
const SOCIAL = /(^|\.)(instagram|linkedin|twitter|x|facebook|t|tiktok|youtube)\.(com|me)$/i;

function visitorId() {
  try {
    let id = localStorage.getItem("fow_vid");
    if (!id) {
      id = Math.random().toString(36).slice(2) + Date.now().toString(36);
      localStorage.setItem("fow_vid", id);
    }
    return id;
  } catch {
    return "";
  }
}

export function send(payload: Record<string, unknown>) {
  const body = JSON.stringify({ ...payload, path: location.pathname, vid: visitorId() });
  try {
    if (navigator.sendBeacon?.("/api/track", new Blob([body], { type: "application/json" }))) return;
  } catch {
    /* fall through */
  }
  fetch("/api/track", { method: "POST", body, keepalive: true, headers: { "Content-Type": "application/json" } }).catch(() => {});
}

function classify(a: HTMLAnchorElement): string {
  const href = a.getAttribute("href") || "";
  if (href.startsWith("tel:")) return "tel";
  if (href.startsWith("mailto:")) return "mailto";
  let url: URL;
  try {
    url = new URL(a.href, location.href);
  } catch {
    return "internal";
  }
  if (url.hostname === "forms.gle" || url.pathname.startsWith("/forms/")) return "register";
  if (a.hasAttribute("download") || FILE.test(url.pathname) || (url.hostname === "drive.google.com" && url.pathname.startsWith("/file/"))) {
    return "download";
  }
  if (url.origin === location.origin) return "internal";
  if (SOCIAL.test(url.hostname.replace(/^www\./, ""))) return "social";
  return "external";
}

function labelOf(a: HTMLAnchorElement) {
  return (a.dataset.track || a.getAttribute("aria-label") || a.textContent || a.title || "").replace(/\s+/g, " ").trim().slice(0, 80);
}

export function Tracker() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  // Page view on every route change.
  useEffect(() => {
    if (isAdmin) return;
    send({ t: "pageview", ref: document.referrer });
  }, [pathname, isAdmin]);

  // One delegated listener catches every link click (mouse, keyboard, middle-click).
  useEffect(() => {
    if (isAdmin) return;
    const onClick = (e: MouseEvent) => {
      if (e.button > 1) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || !(a instanceof HTMLAnchorElement)) return;
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      send({ t: "click", kind: classify(a), href: a.href.startsWith("http") ? a.href : href, label: labelOf(a) });
    };
    document.addEventListener("click", onClick, true);
    document.addEventListener("auxclick", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("auxclick", onClick, true);
    };
  }, [isAdmin]);

  return isAdmin ? null : <Analytics />;
}
