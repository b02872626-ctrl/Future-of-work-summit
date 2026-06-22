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
  {
    label: "FOW 2025 recap",
    href: "https://drive.google.com/file/d/1yPceI1sSNZF5g2FU3aiA0pEVf6j1ck9X/view?usp=drive_link",
    external: true,
  },
  {
    label: "Register for 2026",
    href: "https://forms.gle/e8beQFSUbENCjwzEA",
    external: true,
  },
  { label: "Contact", href: "/contact" },
];

const SOCIALS: Item[] = [
  { label: "Instagram", href: "#", external: true },
  { label: "LinkedIn",  href: "#", external: true },
  { label: "X",         href: "#", external: true },
];

export function Menu({ open, onClose }: { open: boolean; onClose: () => void }) {
  // Lock body scroll while open + close on Escape.
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
      <div className="container-page flex h-full flex-col py-8 md:py-10">
        {/* ── Top bar: logo + close button ─────────────────── */}
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
              className="h-7 w-7"
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

        {/* ── Main: large stacked items, centered vertically ─── */}
        <div className="flex-1 flex flex-col justify-center">
          <ul className="space-y-3 md:space-y-5">
            {ITEMS.map((item) => (
              <li key={item.label}>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                    className="font-display font-bold text-cream transition hover:text-magenta"
                    style={{ fontSize: "clamp(2.25rem, 6vw, 5rem)" }}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="font-display font-bold text-cream transition hover:text-magenta"
                    style={{ fontSize: "clamp(2.25rem, 6vw, 5rem)" }}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* ── Bottom: socials as inline links ──────────────── */}
        <div className="flex justify-end gap-8 text-sm font-medium text-cream/85 md:text-base">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-magenta"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
