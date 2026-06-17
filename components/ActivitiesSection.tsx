"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

type TabKey =
  | "panels"
  | "workshops"
  | "exhibitions"
  | "networking"
  | "job-fair";

const TABS: { key: TabKey; label: string }[] = [
  { key: "panels",      label: "Panels" },
  { key: "workshops",   label: "Workshops" },
  { key: "exhibitions", label: "Exhibitions" },
  { key: "networking",  label: "Networking" },
  { key: "job-fair",    label: "Job Fair" },
];

const TAGLINES: Record<TabKey, string> = {
  panels:
    "Conversations on work, technology, startups, policy, and opportunity.",
  workshops:
    "Practical sessions focused on ideas, skills, and emerging shifts shaping the future of work.",
  exhibitions:
    "Interactive spaces where attendees explored products, platforms, ideas, and emerging opportunities.",
  networking:
    "Organic conversations between professionals, founders, employers, creators, and emerging talent.",
  "job-fair":
    "A space for employers and job seekers to connect around roles, internships, and future possibilities.",
};

const BODIES: Partial<Record<TabKey, string>> = {
  workshops:
    "From career growth and entrepreneurship to innovation and technology, the workshops were designed to be interactive, practical, and experience-driven. Participants explored real-world ideas, learned from professionals, and engaged in conversations that went beyond theory.",
  exhibitions:
    "The exhibition experience brought together companies, startups, innovators, and ecosystem players in one dynamic environment. Attendees discovered new technologies, explored opportunities, interacted with products, and connected directly with the people building the future.",
  networking:
    "The summit created a high-energy environment for meaningful connections to happen naturally. Whether through conversations, activities, workshops, or shared interests, participants were able to meet collaborators, discover opportunities, and engage with a diverse ecosystem of people and ideas.",
  "job-fair":
    "The job fair connected employers, growing companies, and emerging talent in one accessible space. Job seekers explored open roles, met hiring teams, discovered internship pathways, and engaged directly with the organisations shaping Ethiopia's workforce — while employers identified the people ready to build what comes next.",
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
  panels:      "/photos/panels.jpg",
  workshops:   "/photos/workshops.jpg",
  exhibitions: "/photos/exhibitions.jpg",
  networking:  "/photos/networking-2.jpg",
  "job-fair":  ["/photos/job-fair-1.jpg", "/photos/networking-1.jpg"],
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
  const body = BODIES[tab];
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
        {body ? (
          <p className="mt-6 text-cream/85 text-base leading-relaxed md:text-lg">{body}</p>
        ) : (
          <p className="mt-6 italic text-cream/85 text-base md:text-lg">[TEXT WILL BE REPLCED]</p>
        )}
      </div>
    </div>
  );
}

export function ActivitiesSection() {
  const [tab, setTab] = useState<TabKey>("panels");

  return (
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
  );
}
