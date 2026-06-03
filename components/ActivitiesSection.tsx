"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { Shard } from "./Shard";

type TabKey =
  | "panels"
  | "workshops"
  | "exhibitions"
  | "networking"
  | "product-showcase"
  | "job-fair";

const TABS: { key: TabKey; label: string }[] = [
  { key: "panels",           label: "Panels" },
  { key: "workshops",        label: "Workshops" },
  { key: "exhibitions",      label: "Exhibitions" },
  { key: "networking",       label: "Networking" },
  { key: "product-showcase", label: "Product Showcase" },
  { key: "job-fair",         label: "Job Fair" },
];

const TAGLINES: Record<TabKey, string> = {
  panels:
    "Conversations on work, technology, startups, policy, and opportunity.",
  workshops:
    "Practical learning sessions focused on skills, ideas, and emerging changes in the labor market.",
  exhibitions:
    "Interactive spaces where attendees explored products, platforms, and opportunities.",
  networking:
    "Conversations between attendees, employers, founders, speakers, and ecosystem players.",
  "product-showcase":
    "A live opportunity to experience new tools and ideas shaping the future of work.",
  "job-fair":
    "A space for employers and job seekers to connect around roles, internships, and future possibilities.",
};

const PANEL_CARDS = [
  "Future of Work: Trends, Challenges, Opportunities",
  "Policy, Regulation & Financial Inclusion",
  "Innovation and Technology",
  "Startup Ecosystem as Driver of Change",
];

const PANEL_CARD_BODY =
  "How technology is changing the way people work, hire, build, and grow across industries.";

const TAB_IMAGE: Record<TabKey, string | string[]> = {
  panels:            "/photos/panels.jpg",
  workshops:         "/photos/workshops.jpg",
  exhibitions:       "/photos/exhibitions.jpg",
  networking:        "/photos/networking-2.jpg",
  "product-showcase": "/photos/product-showcase.jpg",
  "job-fair":        ["/photos/job-fair-1.jpg", "/photos/networking-1.jpg"],
};

function PanelCard({ title }: { title: string }) {
  return (
    <article className="flex flex-col">
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <img src="/photos/panels.jpg" alt="" className="h-full w-full object-cover" />
      </div>
      <h4 className="mt-5 font-display text-base font-extrabold uppercase tracking-wide text-magenta leading-tight">
        {title}
      </h4>
      <p className="mt-3 text-sm leading-relaxed text-cream/80">{PANEL_CARD_BODY}</p>
      <a
        href="#"
        className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/80 hover:text-magenta"
      >
        Read more
      </a>
    </article>
  );
}

function PanelsContent() {
  return (
    <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2">
      {PANEL_CARDS.map((title) => (
        <PanelCard key={title} title={title} />
      ))}
    </div>
  );
}

function ImageBlock({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden">
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </div>
  );
}

function ContentBlock({ tab, reverse = false }: { tab: TabKey; reverse?: boolean }) {
  const image = TAB_IMAGE[tab];
  return (
    <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
      <div className={`space-y-6 ${reverse ? "md:order-2" : ""}`}>
        {Array.isArray(image) ? (
          image.map((src) => <ImageBlock key={src} src={src} alt="" />)
        ) : (
          <ImageBlock src={image} alt="" />
        )}
      </div>
      <div className={`flex flex-col justify-center ${reverse ? "md:order-1" : ""}`}>
        <h3 className="font-display text-lg font-extrabold uppercase tracking-wide text-magenta md:text-xl">
          {TABS.find((t) => t.key === tab)?.label.toUpperCase()}
        </h3>
        <p className="mt-6 italic text-cream/85 text-base md:text-lg">[TEXT WILL BE REPLCED]</p>
      </div>
    </div>
  );
}

function AfriworkBlock() {
  return (
    <section className="relative bg-ink">
      {/* ── Top half: just the STEEP V of the chevron — its diagonals start
            from the section's very top corners and meet at the V-tip at the
            section's bottom-center. The SVG has shallow "shoulders" at the
            top (segments from corners to kinks at y=377); we scale & shift
            the SVG so those shoulders go off-screen, leaving only the steep
            portion visible.
              - SVG natural viewBox: 1928×1342
              - Kinks at SVG (558, 377) and (1370, 377)
              - V-tip at SVG (964, 924)
              - Steep-V width: 1370-558 = 812 SVG units
            We scale the SVG so 812 SVG units = full container width:
              scale = 1928/812 ≈ 237% (bg-size width)
            and offset so SVG (558, 377) lands at container (0, 0). ──────── */}
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "1928 / 1300" }}
      >
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            backgroundImage: "url('/svg/afriwork-bg.svg')",
            backgroundSize: "237% auto",
            backgroundPosition: "50% 47.5%",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="absolute inset-x-0 top-0 flex flex-col items-center pt-[5%]">
          <div className="flex items-center justify-center gap-4">
            <span className="font-display text-2xl font-extrabold uppercase text-cream md:text-3xl">
              Meet
            </span>
            <img
              src="/images/afriwork-ai-logo.png"
              alt="Afriwork AI"
              className="h-9 w-auto md:h-12"
              draggable={false}
            />
          </div>
          <img
            src="/images/afriwork-ai-star.png"
            alt=""
            aria-hidden="true"
            className="mt-[3%] w-[22%] max-w-[400px]"
            draggable={false}
          />
        </div>
      </div>

      {/* ── Bottom: gray fading to black so the transition into the next
            section (which is pure black) is seamless instead of a hard line. ─ */}
      <div
        style={{
          background:
            "linear-gradient(180deg, #212022 0%, #212022 55%, #14131a 80%, #000000 100%)",
        }}
      >
        <div className="container-page py-12 md:py-16 text-center">
          <h3 className="heading-display text-3xl text-cream md:text-5xl">
            Your job search,
            <br />
            made <span className="text-ai">smarter.</span>
          </h3>

          <p className="mx-auto mt-6 max-w-xl text-cream/80 md:text-lg">
            We&apos;ve built AI tools that help you create tailored profiles for all your
            different skills in seconds, so you can apply to work that truly fits you.
          </p>

          {/* CTA button — teal→purple gradient pill (rounded is intentional
              here per the Afriwork AI sub-brand button style). */}
          <a
            href="#"
            className="mt-10 inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold text-cream shadow-glow transition hover:brightness-110"
            style={{
              background: "linear-gradient(90deg, #3DD8E8 0%, #6c4cf5 60%, #a04cf5 100%)",
            }}
          >
            See How It Works
          </a>
        </div>
      </div>
    </section>
  );
}

/** Bottom content block on the Product Showcase tab — mirror layout
    ("[TEXT WILL BE REPLCED]" on the left, image on the right) shown in the
    design after the Meet Afriwork AI block. */
function ProductShowcaseBottomBlock() {
  return (
    <section className="relative bg-ink">
      <div className="container-page pb-24 md:pb-32">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-2">
          <div className="space-y-4">
            <p className="text-cream/85">
              <span className="pill-magenta">TEXT WILL BE REPLCED</span> discussions,
              workshops, fireside conversations, exhibitions, interactive activities, and
              product showcases.
            </p>
            <p className="text-cream/85">
              t created a space where participants could hear from experts, discover new
              tools, connect with employers and peers, and think more practically about{" "}
              <span className="font-bold text-cream">careers</span>,{" "}
              <span className="font-bold text-cream">hiring</span>, and{" "}
              <span className="font-bold text-cream">innovation</span>.
            </p>
          </div>
          <ImageBlock src="/photos/recap.jpg" alt="" />
        </div>
      </div>
    </section>
  );
}

export function ActivitiesSection() {
  const [tab, setTab] = useState<TabKey>("panels");

  return (
    <>
      <section id="activities" className="relative bg-ink">
        <div className="container-page relative z-10 py-28 md:py-40">
          <h2 className="heading-display text-center text-6xl text-cream md:text-8xl lg:text-[140px] leading-[0.95]">
            Activities
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-center text-cream/85 text-lg md:text-2xl">
            The summit was designed to go beyond stage conversations and create a more active
            event experience.
          </p>

          <div className="mt-20 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-base md:gap-x-16 md:text-lg">
            {TABS.map((t) => {
              const isActive = t.key === tab;
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTab(t.key)}
                  className={`relative pb-1.5 transition ${
                    isActive ? "text-magenta font-semibold" : "text-cream/80 hover:text-cream"
                  }`}
                >
                  {t.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 w-full ${
                      isActive ? "bg-magenta" : "bg-transparent"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <p className="mx-auto mt-16 max-w-2xl text-center text-cream/85 text-lg md:text-xl">
            {TAGLINES[tab]}
          </p>

          {tab === "panels" ? <PanelsContent /> : <ContentBlock tab={tab} />}
        </div>
      </section>

      {tab === "product-showcase" && (
        <>
          <AfriworkBlock />
          <ProductShowcaseBottomBlock />
        </>
      )}
    </>
  );
}
