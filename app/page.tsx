/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Shard } from "@/components/Shard";
import { IconDivider } from "@/components/IconDivider";
import { ActivitiesSection } from "@/components/ActivitiesSection";
import { Footer } from "@/components/Footer";

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
      {/* container-page so the headline's left edge aligns with the
          FoW logo's left edge in the Nav above. */}
      <section className="relative overflow-hidden bg-hero-gradient min-h-screen flex flex-col">
        <div className="container-page relative z-10 flex-1 flex items-center pt-32 pb-20 md:pt-36 md:pb-28">
          <div>
            <h1
              className="font-display font-bold uppercase tracking-tight text-cream leading-[0.95]"
              style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)" }}
            >
              Shaping how<br />
              Ethiopia works,<br />
              Hires, builds, and<br />
              Grows.
            </h1>
            <div className="mt-10 md:mt-14">
              <a
                href="https://forms.gle/e8beQFSUbENCjwzEA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-magenta px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-cream shadow-glow transition hover:brightness-110 md:text-base md:px-9 md:py-4"
              >
                Register for 2026
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── INTRO PARAGRAPH (cream) ─────────────────────── */}
      {/* The burst 3D shape straddles the boundary between hero (dark) and intro (cream) */}
      <section className="relative bg-cream body-on-cream">
        <div className="pointer-events-none absolute right-[-160px] top-[-160px] hidden md:block w-[920px] z-20">
          <Shard variant="burst" className="w-full h-auto" />
        </div>
        <div className="pointer-events-none absolute right-[-80px] top-[-320px] md:hidden w-[420px] z-20">
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

          {/* Real recap video embedded from YouTube */}
          <figure className="relative mx-auto mt-14 max-w-5xl aspect-video overflow-hidden shadow-glow">
            <iframe
              src="https://www.youtube-nocookie.com/embed/BPKx1PhmYpE?rel=0"
              title="Future of Work Summit · Event recap"
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
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

      {/* ─── WHAT'S NEXT (black → magenta → cream gradient) ── */}
      {/* Starts black at the top, ramps through plum and magenta, and ends in
          light pink/cream so it transitions smoothly into the Join section's
          cream background without a hard edge. */}
      <section
        id="whats-next"
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #000000 0%, #1a052b 8%, #2e0846 16%, #4B087C 28%, #89069E 48%, #FD00E0 70%, #ff9ddc 88%, #ffd9f4 100%)",
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

      {/* ─── JOIN THE MOVEMENT (cream) ───────────────────── */}
      {/* Cream/light background that picks up where WHAT'S NEXT ends.
          Planet bleeds UP from this section into the magenta band above,
          so overflow-visible is intentional. Content is LEFT-aligned per
          the design. */}
      <section
        id="join"
        className="relative"
        style={{
          background:
            "linear-gradient(180deg, #ffd9f4 0%, #ffeaf7 40%, #FFF6FE 100%)",
        }}
      >
        <div className="pointer-events-none absolute right-[-40px] -top-44 hidden md:block w-[680px] z-0">
          <Shard variant="planet" className="w-full h-auto" />
        </div>
        <div className="pointer-events-none absolute right-[-20px] -top-24 md:hidden w-[320px] z-0">
          <Shard variant="planet" className="w-full h-auto" />
        </div>

        <div className="container-page relative z-10 pt-32 pb-40 md:pt-40 md:pb-56">
          <div className="max-w-md">
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

      <Footer />
    </main>
  );
}

