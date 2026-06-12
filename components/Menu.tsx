"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect } from "react";
import { Logo } from "./Logo";

type Item = {
  label: string;
  href: string;
  /** True for external/file links — opens in a new tab. */
  external?: boolean;
};

const ITEMS: Item[] = [
  { label: "FOW 2025 recap",   href: "/fow-2025-recap.pdf", external: true },
  { label: "Register for 2026", href: "/register" },
  { label: "Contact",           href: "/contact" },
];

const SOCIALS: Item[] = [
  { label: "Instagram", href: "#", external: true },
  { label: "LinkedIn",  href: "#", external: true },
  { label: "X",         href: "#", external: true },
];

export function Menu({ open, onClose }: { open: boolean; onClose: () => void }) {
  // Lock body scroll while the menu is open + close on Escape.
  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
      className={`fixed inset-0 z-50 bg-ink transition-transform duration-500 ease-in-out ${
        open ? "translate-x-0" : "translate-x-full pointer-events-none"
      }`}
    >
      <div className="container-page flex h-full flex-col py-10 md:py-12">
        {/* ── Top bar: logo + close button ─────────────────────── */}
        <div className="flex items-center justify-between">
          <Link href="/" onClick={onClose} aria-label="Future of Work — home">
            <Logo />
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-12 w-12 items-center justify-center text-cream transition hover:text-magenta"
          >
            <svg
              viewBox="0 0 32 32"
              className="h-9 w-9"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            >
              <path d="M8 8l16 16" />
              <path d="M24 8L8 24" />
            </svg>
          </button>
        </div>

        {/* ── Body: "Menu" on the left, items on the right ─────── */}
        <div className="flex-1 grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          <h2 className="heading-display text-cream text-7xl md:text-8xl lg:text-9xl">
            Menu
          </h2>

          <ul className="space-y-4 md:space-y-6">
            {ITEMS.map((item) => (
              <li key={item.label}>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                    className="font-display text-3xl font-bold text-cream transition hover:text-magenta md:text-5xl lg:text-6xl"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="font-display text-3xl font-bold text-cream transition hover:text-magenta md:text-5xl lg:text-6xl"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* ── Bottom: socials ──────────────────────────────────── */}
        <div className="flex flex-col gap-3 border-t border-cream/15 pt-6 md:flex-row md:items-center md:justify-between">
          <span className="text-xs uppercase tracking-[0.32em] text-cream/60">
            Socials
          </span>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-cream/80 transition hover:text-magenta md:text-base"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
