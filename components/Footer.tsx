/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

type Item = {
  label: string;
  href: string;
  external?: boolean;
};

const PAGES: Item[] = [
  { label: "Home",              href: "/" },
  { label: "FOW 2025 recap",    href: "/fow-2025-recap.pdf", external: true },
  { label: "Register for 2026", href: "/register" },
  { label: "Contact",           href: "/contact" },
];

const SECTIONS: Item[] = [
  { label: "About the summit", href: "/#about" },
  { label: "What was explored", href: "/#explored" },
  { label: "Event recap",       href: "/#recap" },
  { label: "Activities",        href: "/#activities" },
  { label: "What's next",       href: "/#whats-next" },
  { label: "Join the movement", href: "/#join" },
];

const SOCIALS: Item[] = [
  { label: "Instagram", href: "#", external: true },
  { label: "LinkedIn",  href: "#", external: true },
  { label: "X",         href: "#", external: true },
];

const CONTACT = {
  email: "hello@futureofwork.et",
  phone: "+251 000 000 000",
};

function Column({
  heading,
  items,
}: {
  heading: string;
  items: Item[];
}) {
  return (
    <div>
      <h3 className="text-xs uppercase tracking-[0.32em] text-cream/60">
        {heading}
      </h3>
      <ul className="mt-5 space-y-2.5">
        {items.map((item) =>
          item.external ? (
            <li key={item.label}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-medium text-cream/90 transition hover:text-magenta md:text-lg"
              >
                {item.label}
              </a>
            </li>
          ) : (
            <li key={item.label}>
              <Link
                href={item.href}
                className="text-base font-medium text-cream/90 transition hover:text-magenta md:text-lg"
              >
                {item.label}
              </Link>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative bg-ink text-cream">
      <div className="container-page py-16 md:py-24">
        {/* ── Top: big wordmark + link columns ──────────────── */}
        <div className="border-b border-cream/15 pb-12 md:pb-16">
          <img
            src="/svg/logo.svg"
            alt="Future of Work Summit"
            className="h-10 w-auto md:h-14"
            draggable={false}
          />

          <div className="mt-12 grid grid-cols-2 gap-10 md:mt-14 md:grid-cols-4 md:gap-14">
            <Column heading="Index" items={PAGES} />
            <Column heading="Sections" items={SECTIONS} />

            <div>
              <h3 className="text-xs uppercase tracking-[0.32em] text-cream/60">
                Contact
              </h3>
              <ul className="mt-5 space-y-2.5">
                <li>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="text-base font-medium text-cream/90 transition hover:text-magenta md:text-lg"
                  >
                    {CONTACT.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                    className="text-base font-medium text-cream/90 transition hover:text-magenta md:text-lg"
                  >
                    {CONTACT.phone}
                  </a>
                </li>
              </ul>
            </div>

            <Column heading="Social" items={SOCIALS} />
          </div>
        </div>

        {/* ── Bottom strip: copyright + small legal links ──── */}
        <div className="mt-6 flex flex-col gap-3 text-xs text-cream/55 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Future of Work Summit. All rights reserved.
          </p>
          <p>Built in Addis Ababa.</p>
        </div>
      </div>
    </footer>
  );
}
