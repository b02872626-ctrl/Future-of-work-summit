import Link from "next/link";
import { Logo } from "./Logo";

/**
 * Top bar exactly as in the design: FoW logo (large) on the left, hamburger icon
 * (large) on the right. No menu items, no CTA. Hamburger is decorative for now.
 */
export function Nav() {
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      {/* Full-width with the same padding as the hero so the logo aligns
          horizontally with the headline's left edge. */}
      <div className="w-full px-8 md:px-16 lg:px-24 flex h-28 items-center justify-between">
        <Link href="/" aria-label="Future of Work — home">
          <Logo />
        </Link>

        <button
          type="button"
          aria-label="Menu"
          className="flex h-12 w-12 items-center justify-center text-cream"
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
  );
}
