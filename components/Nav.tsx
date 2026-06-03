import Link from "next/link";
import { Logo } from "./Logo";

/**
 * Top bar exactly as in the design: FoW logo (large) on the left, hamburger icon
 * (large) on the right. No menu items, no CTA. Hamburger is decorative for now.
 */
export function Nav() {
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="container-page flex h-28 items-center justify-between">
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
