"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "./Logo";
import { Menu } from "./Menu";

/**
 * Top bar: FoW logo on the left and hamburger on the right.
 * The hamburger opens a full-screen drawer that slides in from the right.
 */
export function Nav({ theme = "dark" }: { theme?: "dark" | "light" }) {
  const [open, setOpen] = useState(false);
  const light = theme === "light";

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-40">
        <div className="container-page flex h-28 items-center justify-between">
          <Link href="/" aria-label="Future of Work — home">
            <Logo className={light ? "brightness-0" : ""} />
          </Link>

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className={`flex h-12 w-12 items-center justify-center transition hover:text-magenta ${
              light ? "text-plum" : "text-cream"
            }`}
          >
            <svg
              viewBox="0 0 32 32"
              className="h-10 w-10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            >
              <path d="M5 11h22" />
              <path d="M5 21h22" />
            </svg>
          </button>
        </div>
      </header>

      <Menu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
