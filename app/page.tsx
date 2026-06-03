/* eslint-disable @next/next/no-img-element */
import { Nav } from "@/components/Nav";
import { Shard } from "@/components/Shard";
import { IconDivider } from "@/components/IconDivider";
import { ActivitiesSection } from "@/components/ActivitiesSection";

/* ============================================================
   Content (kept in this file because there is no CMS yet)
   ============================================================ */

const EXPLORED = [
  {
    title: "Work, Skills, and Opportunity",
    body:
      "How young people can prepare for changing job markets, build relevant skills, and access meaningful opportunities.",
    image: "/images/explored-1.png",
    alt: "Speaker at the Future of Work summit",
  },
  {
    title: "Innovation and Technology",
    body:
      "How technology is changing the way people work, hire, build, and grow across industries.",
    image: "/images/explored-2.png",
    alt: "Panel discussion on innovation and technology",
  },
  {
    title: "Entrepreneurship and Startups",
    body:
      "How founders, startups, and new ventures are creating jobs, solving problems, and opening new pathways for economic participation.",
    image: "/images/explored-3.png",
    alt: "Founder presenting at the summit",
  },
  {
    title: "Policy, Regulation, and Inclusion",
    body:
      "How systems, institutions, and financial access influence who gets to participate in the future of work.",
    image: "/images/explored-4.png",
    alt: "Policy maker on stage",
  },
  {
    title: "Platforms, Tools, and Career Growth",
    body:
      "How digital platforms, new products, and ecosystem support can help people and organizations move faster.",
    image: "/images/explored-5.png",
    alt: "Panelist sharing perspective on career growth",
  },
];

/* ============================================================
   Card components
   ============================================================ */

function ExploredCard({
  title,
  body,
  image,
  alt,
}: {
  title: string;
  body: string;
  image: string;
  alt: string;
}) {
  return (
    <article className="flex flex-col">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img src={image} alt={alt} className="h-full w-full object-cover" />
      </div>
      <h3 className="mt-6 font-display text-base font-extrabold uppercase tracking-wide text-magenta leading-tight md:text-lg">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-plum md:text-base">{body}</p>
      <a
        href="#"
        className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-plum hover:text-magenta"
      >
        Read more
      </a>
    </article>
  );
}

/* ============================================================
   Page
   ============================================================ */

export default function HomePage() {
  return (
    <main className="relative">
      <Nav />

      {/* ─── HERO ─────────────────────────────────────────── */}
      {/* Full-viewport-width wrapper (no max-w constraint) so the headline
          can scale up on wide monitors instead of being centered in a 1440px
          column with empty space on the sides. */}
      <section className="relative overflow-hidden bg-hero-gradient min-h-screen flex flex-col">
        <div className="relative z-10 flex-1 flex items-center w-full px-8 md:px-16 lg:px-24 pt-32 pb-20 md:pt-36 md:pb-28">
          <h1
            className="font-display font-bold uppercase tracking-tight text-cream leading-[0.95]"
            style={{ fontSize: "clamp(2.5rem, 8.5vw, 11rem)" }}
          >
            Shaping how<br />
            Ethiopia works,<br />
            Hires, builds, and<br />
            Grows.
          </h1>
        </div>
      </section>

      {/* ─── INTRO PARAGRAPH (cream) ─────────────────────── */}
      {/* The burst 3D shape straddles the boundary between hero (dark) and intro (cream) */}
      <section className="relative bg-cream body-on-cream">
        <div className="pointer-events-none absolute right-[-160px] top-[-160px] hidden md:block w-[920px] z-20">
          <Shard variant="burst" className="w-full h-auto" />
        </div>
        <div className="pointer-events-none absolute right-[-80px] top-[-80px] md:hidden w-[420px] z-20">
          <Shard variant="burst" className="w-full h-auto" />
        </div>

        <div className="container-page grid grid-cols-1 gap-10 py-24 md:grid-cols-12 md:py-28">
          <div className="md:col-span-6">
            <p className="text-xl leading-relaxed text-plum md:text-2xl">
              On <span className="font-bold text-plum">October 17 and 18</span>, Future of
              Work Summit brought together young professionals, students, employers, founders,
              innovators, and ecosystem leaders for two days of conversation,{" "}
              <span className="pill">connection</span> and{" "}
              <span className="pill">opportunity</span>.
            </p>
            <p className="mt-7 text-xl leading-relaxed text-plum md:text-2xl">
              From panels and workshops to product demos, exhibitions, and networking, the
              summit created space for people to{" "}
              <span className="font-bold text-magenta">explore where work is going</span> and{" "}
              <span className="font-bold text-magenta">how Ethiopia can prepare for it.</span>
            </p>
            <p className="mt-7 text-xl leading-relaxed text-plum md:text-2xl">
              Explore the recap, highlights, and moments from the summit.
            </p>
          </div>
        </div>

        <IconDivider />

        {/* ─── WHAT WAS EXPLORED ─────────────────────────── */}
        <div id="explored" className="container-page py-24 md:py-32">
          <div className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-3">
            <div>
              <h2 className="heading-display text-4xl text-plum md:text-5xl lg:text-6xl">
                What was explored
              </h2>
              <p className="mt-8 text-lg text-plum md:text-xl">
                The summit focused on some of the biggest questions shaping the future of work
                today:
              </p>
            </div>

            {EXPLORED.map((card) => (
              <ExploredCard key={card.title} {...card} />
            ))}
          </div>
        </div>

        <IconDivider />

        {/* ─── OUR PARTNERS ──────────────────────────────── */}
        <div className="container-page py-24 md:py-32">
          <h2 className="heading-display text-center text-4xl text-plum md:text-5xl lg:text-6xl">
            Our partners
          </h2>
          <div className="min-h-[260px]" aria-hidden="true" />
        </div>

        <IconDivider />

        {/* ─── ABOUT THE SUMMIT (cream → light pink) ───────── */}
        {/* Text occupies the left half; the arrow 3D shape is large on the
            right and sized so it never bleeds past the section's bottom edge. */}
        <div id="about" className="relative overflow-hidden">
          <div className="pointer-events-none absolute right-[-120px] top-20 hidden md:block w-[760px] lg:w-[860px] xl:w-[920px] z-0">
            <Shard variant="arrow" className="w-full h-auto" />
          </div>
          <div className="pointer-events-none absolute right-[-40px] top-4 md:hidden w-[320px] z-0">
            <Shard variant="arrow" className="w-full h-auto" />
          </div>

          <div className="container-page relative z-10 grid grid-cols-1 gap-12 py-28 md:grid-cols-12 md:py-40 md:pb-56">
            <div className="md:col-span-6">
              <h2 className="heading-display text-5xl text-plum md:text-7xl lg:text-[96px] leading-[0.95]">
                About<br />the summit
              </h2>
              <p className="mt-12 text-xl leading-[1.6] text-plum md:text-2xl">
                <span className="font-bold text-magenta">Future of Work Summit</span> is a
                platform built to bring together the people shaping the next chapter of work
                in Ethiopia.
              </p>
              <p className="mt-8 text-xl leading-[1.6] text-plum md:text-2xl">
                It exists at the intersection of{" "}
                <span className="font-bold text-plum">
                  jobs, skills, technology, innovation, entrepreneurship, and policy
                </span>
                . The goal is simple: create practical conversations and meaningful connections
                that help more people access opportunities and help more organizations prepare
                for a <span className="pill">changing world of work.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── EVENT RECAP (cream → magenta gradient) ────────── */}
      {/* Long, multi-stop gradient so the transition out of the cream About section
          above is gradual rather than abrupt. */}
      <section
        className="relative overflow-hidden pt-24 md:pt-32"
        style={{
          background:
            "linear-gradient(180deg, #FFF6FE 0%, #fff0fa 8%, #ffe0f4 16%, #ffc4ea 24%, #ff9fe0 32%, #ff70d3 40%, #FD00E0 55%, #FD00E0 75%, #89069E 100%)",
        }}
      >
        <div className="container-page relative z-10 pt-20 pb-10 md:pt-28 md:pb-12">
          <h2 className="heading-display text-center text-5xl text-cream md:text-7xl">
            Event recap
          </h2>

          {/* Static recap photo with a faux native video controls bar overlaid,
              per the design. Real video file to be wired later. */}
          <figure className="relative mx-auto mt-14 max-w-5xl aspect-video overflow-hidden shadow-glow">
            <img
              src="/photos/recap.jpg"
              alt="Future of Work Summit recap — panel discussion"
              className="h-full w-full object-cover"
            />
            <FakeVideoControls />
          </figure>
        </div>
      </section>

      {/* ─── DARK BAND — recap follow-up paragraph ─────────── */}
      <section
        className="relative"
        style={{
          background:
            "linear-gradient(180deg, #89069E 0%, #4B087C 50%, #000000 100%)",
        }}
      >
        <div className="container-page pt-10 pb-24 md:pt-12 md:pb-32">
          <div className="mx-auto max-w-3xl space-y-8 text-left text-cream/95 text-xl md:text-2xl leading-relaxed">
            <p>
              Over two days, Future of Work Summit hosted a mix of{" "}
              <span className="font-bold text-cream">
                conversations, learning experiences, and networking
              </span>{" "}
              opportunities designed to bring the topic of work closer to{" "}
              <span className="pill-magenta">real people</span> and{" "}
              <span className="pill-magenta">real opportunities.</span>
            </p>
            <p>
              The event featured panel discussions, workshops, fireside conversations,
              exhibitions, interactive activities, and product showcases. It created a space
              where participants could hear from experts, discover new tools, connect with
              employers and peers, and think more practically about{" "}
              <span className="font-bold text-cream">careers</span>,{" "}
              <span className="font-bold text-cream">hiring</span>, and{" "}
              <span className="font-bold text-cream">innovation</span>.
            </p>
            <p>
              The strongest interest came from{" "}
              <span className="font-bold text-cream">sessions</span> and{" "}
              <span className="font-bold text-cream">activities</span> that gave people direct
              exposure to <span className="font-bold text-cream">opportunities</span>,{" "}
              <span className="font-bold text-cream">practical ideas</span>, and{" "}
              <span className="font-bold text-cream">new connections</span>.
            </p>
          </div>
        </div>
      </section>

      {/* ─── ACTIVITIES (black, interactive tabs) ──────────── */}
      <ActivitiesSection />

      {/* ─── WHAT'S NEXT (black → magenta gradient) ────────── */}
      {/* Starts black at the top so it blends out of the Activities section above,
          ramps through plum into bright magenta at the bottom — the magenta is
          held all the way to the bottom so it matches the top of Join the Movement
          without any hard edge. The planet that visually sits at this boundary is
          owned by the Join the Movement section. */}
      <section
        id="whats-next"
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #000000 0%, #1a052b 8%, #2e0846 16%, #4B087C 28%, #89069E 48%, #FD00E0 72%, #FD00E0 100%)",
        }}
      >
        {/* Sparkle in the top-left corner, large */}
        <div className="pointer-events-none absolute -left-24 -top-12 hidden md:block w-[560px] z-0">
          <Shard variant="sparkle" className="w-full h-auto" />
        </div>
        <div className="pointer-events-none absolute -left-16 -top-6 md:hidden w-[280px] z-0">
          <Shard variant="sparkle" className="w-full h-auto" />
        </div>

        <div className="container-page relative z-10 pt-40 pb-20 md:pt-56 md:pb-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="heading-display text-cream text-5xl md:text-7xl">
              What&apos;s next
            </h2>
            <p className="mt-10 text-xl leading-relaxed text-cream md:text-2xl">
              Future of Work is growing beyond a single event. Upcoming editions will continue
              to create better spaces for:
            </p>
          </div>
        </div>
      </section>

      {/* ─── JOIN THE MOVEMENT (magenta → cream) ─────────── */}
      {/* Bright magenta band at the top fades down to near-white at the bottom.
          Planet shape bleeds in from the top-right corner. Content sits centered. */}
      <section
        id="join"
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #FD00E0 0%, #ff70d3 18%, #ffb8ee 35%, #ffd9f4 55%, #FFF6FE 80%, #FFF6FE 100%)",
        }}
      >
        <div className="pointer-events-none absolute right-[-80px] -top-16 hidden md:block w-[640px] z-0">
          <Shard variant="planet" className="w-full h-auto" />
        </div>
        <div className="pointer-events-none absolute right-[-40px] -top-10 md:hidden w-[320px] z-0">
          <Shard variant="planet" className="w-full h-auto" />
        </div>

        <div className="container-page relative z-10 pt-20 pb-40 md:pt-24 md:pb-56">
          <div className="mx-auto max-w-md">
            <h2 className="heading-display text-5xl text-magenta md:text-6xl">
              Join the<br />movement
            </h2>
            <p className="mt-10 text-2xl leading-[1.6] text-plum md:text-3xl">
              Be part of Ethiopia&apos;s workforce transformation, and help build a future
              that works for everyone.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

/* Faux native video controls bar overlay for the recap still image. */
function FakeVideoControls() {
  return (
    <div className="absolute inset-x-0 bottom-0 bg-black/55 px-4 py-3 backdrop-blur-sm">
      <div className="flex items-center gap-4 text-cream">
        {/* volume */}
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="currentColor">
          <path d="M3 10v4h4l5 5V5L7 10H3z" />
          <path
            d="M16 7c1.5 1.2 2.5 3 2.5 5s-1 3.8-2.5 5"
            stroke="currentColor"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
        <div className="h-1 w-20 rounded-full bg-cream/40">
          <div className="h-full w-1/2 rounded-full bg-cream/90" />
        </div>

        {/* play/pause spacer */}
        <div className="ml-auto" />

        {/* center play (pause icon to mirror design's "playing" state) */}
        <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0" fill="currentColor">
          <rect x="6"  y="5" width="4" height="14" rx="1" />
          <rect x="14" y="5" width="4" height="14" rx="1" />
        </svg>

        {/* spacer */}
        <div className="ml-auto" />

        {/* fullscreen */}
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
          <path d="M4 9V5h4M20 9V5h-4M4 15v4h4M20 15v4h-4" />
        </svg>

        {/* picture-in-picture */}
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="3"  y="5"  width="18" height="14" rx="2" />
          <rect x="12" y="12" width="7"  height="5"  rx="1" />
        </svg>

        {/* settings */}
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.6 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1.1 1.7 1.7 0 0 0-.3-1.8L4.3 7a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
        </svg>
      </div>

      <div className="mt-2 flex items-center justify-between text-[11px] text-cream/85 tabular-nums">
        <span>00:03</span>
        <div className="mx-3 h-1 flex-1 rounded-full bg-cream/30">
          <div className="h-full w-[3%] rounded-full bg-cream" />
        </div>
        <span>-01:02</span>
      </div>
    </div>
  );
}
