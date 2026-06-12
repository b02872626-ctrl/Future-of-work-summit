import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact · Future of Work Summit",
};

const CONTACT = {
  phone: "+251 000 000 000",
  email: "hello@futureofwork.et",
  address: "Bole · Addis Ababa · Ethiopia",
};

/* ============================================================
   Icons (inline so the page stays a single static file)
   ============================================================ */

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 7-8 12-8 12s-8-5-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

/* ============================================================
   Reusable bits
   ============================================================ */

function ContactRow({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  return (
    <div className="flex items-start gap-4">
      <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-magenta/15 text-magenta">
        {icon}
      </span>
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-cream/55">{label}</p>
        {href ? (
          <a href={href} className="mt-1 block text-base font-medium text-cream transition hover:text-magenta md:text-lg">
            {value}
          </a>
        ) : (
          <p className="mt-1 text-base font-medium text-cream md:text-lg">{value}</p>
        )}
      </div>
    </div>
  );
}

const FIELD =
  "w-full rounded-md border border-cream/15 bg-cream/5 px-4 py-3 text-sm text-cream placeholder:text-cream/40 outline-none transition focus:border-magenta focus:bg-cream/10 focus:ring-2 focus:ring-magenta/30 md:text-base";

/* ============================================================
   Page
   ============================================================ */

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-ink flex flex-col">
      <Nav />

      {/* ── Hero header (breadcrumb + page title) ───────────── */}
      <section className="relative overflow-hidden bg-hero-gradient">
        <div className="container-page relative z-10 pt-40 pb-20 md:pt-48 md:pb-28">
          <nav className="text-xs uppercase tracking-[0.32em] text-cream/65" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-magenta">
              Home
            </Link>
            <span className="mx-2 text-cream/40">/</span>
            <span className="text-cream/80">Contact</span>
          </nav>
          <h1
            className="mt-6 font-display font-bold uppercase tracking-tight text-cream leading-[0.95]"
            style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)" }}
          >
            Contact us
          </h1>
        </div>
      </section>

      {/* ── Body: contact info (left) + form (right) ────────── */}
      <section className="bg-ink flex-1">
        <div className="container-page grid grid-cols-1 gap-12 py-20 md:grid-cols-2 md:gap-16 md:py-28">
          {/* LEFT — info */}
          <div>
            <h2 className="heading-display text-3xl text-cream md:text-5xl">
              Need more information?
              <br />
              Get in touch with us.
            </h2>
            <p className="mt-6 max-w-md text-cream/70 md:text-lg">
              We&apos;re building the next chapter of Future of Work in Ethiopia. Reach out
              with questions, partnerships, press, or sponsorship — we&apos;d love to hear
              from you.
            </p>

            <div className="mt-10 space-y-6">
              <ContactRow
                icon={<PhoneIcon />}
                label="Phone"
                value={CONTACT.phone}
                href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
              />
              <ContactRow
                icon={<MailIcon />}
                label="Email"
                value={CONTACT.email}
                href={`mailto:${CONTACT.email}`}
              />
              <ContactRow icon={<PinIcon />} label="Address" value={CONTACT.address} />
            </div>
          </div>

          {/* RIGHT — form */}
          <div className="rounded-2xl border border-cream/10 bg-cream/[0.03] p-6 md:p-10">
            <h2 className="heading-display text-2xl text-cream md:text-3xl">Send a message</h2>
            <p className="mt-3 text-sm text-cream/65 md:text-base">
              Fill out the form below with your details and message and we&apos;ll get back
              to you.
            </p>

            <form className="mt-8 space-y-4" action="#" method="post">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input type="text" name="first_name" placeholder="First name" className={FIELD} required />
                <input type="text" name="last_name" placeholder="Last name" className={FIELD} required />
              </div>
              <input type="text" name="contact" placeholder="Email or phone number" className={FIELD} required />
              <textarea
                name="message"
                placeholder="Write your message here…"
                rows={6}
                className={`${FIELD} resize-none`}
                required
              />

              <button
                type="submit"
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-magenta px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-cream shadow-glow transition hover:brightness-110 sm:w-auto md:text-base md:px-9 md:py-4"
              >
                Send message
                <span aria-hidden="true">→</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
