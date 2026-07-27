"use client";

import { useEffect, useRef } from "react";
import { Shard, type ShardVariant } from "@/components/Shard";

/**
 * Voices from the Summit — full-width horizontal carousel.
 *
 * Every slide pairs a transparent B&W cutout portrait with one of the brand's
 * 3D shard PNGs behind it (full opacity, no fade), and the quote sitting
 * large beside it. Each slide fills the viewport so neighboring quotes stay
 * completely hidden; arrows move one slide at a time, and the track
 * auto-advances every few seconds (wrapping back to the first slide) unless
 * the user is hovering, has just interacted, or prefers reduced motion.
 *
 * Quotes were captured from speakers and participants at the summit;
 * Amharic remarks were translated to English.
 */
const QUOTES: {
  text: string;
  name: string;
  role?: string;
  img: string;
  shard: ShardVariant;
}[] = [
  {
    text: "You only need one person from a village to access information, and they can pull hundreds more forward with them.",
    name: "Mikyas Atskemariam",
    role: "CTO",
    img: "/images/quotes/mikyas-atskemariam.png",
    shard: "burst",
  },
  {
    text: "Platforms are the new employers. They offer skills development, quality control, and talent placement.",
    name: "Solomon Soka",
    img: "/images/quotes/solomon-soka.png",
    shard: "planet",
  },
  {
    text: "Connecting all of our infrastructure and communication systems together could create an enormous impact.",
    name: "Semegn Tadesse",
    img: "/images/quotes/semegn-tadesse.png",
    shard: "arrow",
  },
  {
    text: "The future is already here, so we have to be ready. If not, we'll be counted out.",
    name: "Meklit Baye",
    img: "/images/quotes/meklit-baye.png",
    shard: "sparkle",
  },
  {
    text: "As the work environment evolves, mechanization replaces routine tasks. And as AI advances, there's a real risk of a more elitist workplace emerging.",
    name: "Mesay Shemsu",
    img: "/images/quotes/mesay-shemsu.png",
    shard: "planet",
  },
];

const AUTO_ADVANCE_MS = 5000;
/* After the user clicks an arrow, hold off autoscrolling for a while so we
   don't yank the slide they navigated to out from under them. */
const INTERACTION_HOLDOFF_MS = 9000;

export function QuotesCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef(false);
  const lastInteractionRef = useRef(0);

  const scrollBySlide = (dir: 1 | -1, wrap = false) => {
    const track = trackRef.current;
    if (!track) return;
    const slides = track.children;
    // Distance between two slides = slide width + gap
    const step =
      slides.length > 1
        ? (slides[1] as HTMLElement).offsetLeft -
          (slides[0] as HTMLElement).offsetLeft
        : track.clientWidth;
    const maxLeft = track.scrollWidth - track.clientWidth;
    if (wrap && dir === 1 && track.scrollLeft >= maxLeft - 16) {
      track.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      track.scrollBy({ left: dir * step, behavior: "smooth" });
    }
  };

  const handleArrow = (dir: 1 | -1) => {
    lastInteractionRef.current = Date.now();
    scrollBySlide(dir);
  };

  /* Autoscroll loop — skipped while hovered, shortly after a manual arrow
     click, when the tab is hidden, or if the user prefers reduced motion. */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      if (hoverRef.current) return;
      if (document.visibilityState !== "visible") return;
      if (Date.now() - lastInteractionRef.current < INTERACTION_HOLDOFF_MS)
        return;
      scrollBySlide(1, true);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mt-16 md:mt-24">
      <div
        ref={trackRef}
        aria-label="Quotes from summit speakers and participants"
        onPointerEnter={() => (hoverRef.current = true)}
        onPointerLeave={() => (hoverRef.current = false)}
        className="no-scrollbar flex snap-x snap-mandatory items-stretch gap-0 overflow-x-hidden"
      >
        {QUOTES.map((q) => (
          <figure
            key={q.name}
            className="w-full shrink-0 snap-center"
          >
            <div className="mx-auto grid h-full max-w-[760px] grid-cols-1 items-end gap-10 md:grid-cols-12">
              {/* Portrait with a 3D shard floating behind it */}
              <div className="relative mx-auto w-44 md:col-span-4 md:w-full md:max-w-[230px]">
                <Shard
                  variant={q.shard}
                  className="absolute bottom-[6%] left-1/2 z-0 w-[150%] max-w-none -translate-x-1/2"
                />
                <img
                  src={q.img}
                  alt={q.name}
                  className="portrait-fade relative z-10 w-full"
                />
              </div>

              {/* Quote + attribution */}
              <div className="pb-2 text-center md:col-span-8 md:pb-6 md:text-left">
                <span
                  aria-hidden="true"
                  className="block font-display text-7xl leading-[0.6] text-magenta md:text-8xl"
                >
                  &ldquo;
                </span>
                <blockquote className="mt-4 text-xl font-medium leading-snug text-cream md:text-3xl md:leading-[1.2]">
                  {q.text}
                </blockquote>
                <figcaption className="mt-6 md:mt-8">
                  <span className="font-display font-bold uppercase tracking-[0.18em] text-cream">
                    {q.name}
                  </span>
                  {q.role && (
                    <>
                      <span aria-hidden="true" className="mx-3 text-magenta">
                        ·
                      </span>
                      <span className="text-sm uppercase tracking-[0.22em] text-cream/60">
                        {q.role}
                      </span>
                    </>
                  )}
                </figcaption>
              </div>
            </div>
          </figure>
        ))}
      </div>

      {/* Prev / next controls */}
      <div className="mt-12 flex justify-center gap-4 md:mt-14 md:justify-end">
        <button
          type="button"
          onClick={() => handleArrow(-1)}
          aria-label="Previous quote"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-xl text-cream transition hover:border-magenta hover:text-magenta"
        >
          <span aria-hidden="true">←</span>
        </button>
        <button
          type="button"
          onClick={() => handleArrow(1)}
          aria-label="Next quote"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-xl text-cream transition hover:border-magenta hover:text-magenta"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
