"use client";

import { useState } from "react";

/**
 * Hero background.
 *
 * The old gradient (`bg-hero-gradient`) shows instantly so there's never a
 * blank/black frame while the 5 MB video streams in. Once the video can play,
 * a heavily-feathered mask wipes left→right to reveal it over the gradient.
 */
export default function HeroVideo() {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Base layer — the original hero gradient, painted immediately */}
      <div className="absolute inset-0 bg-hero-gradient" />

      {/* Local, web-optimized video (H.264, +faststart so it streams). It's
          masked out entirely until it can play, then the mask wipes across. */}
      <video
        src="/hero-bg.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        tabIndex={-1}
        onCanPlay={() => setRevealed(true)}
        className={`hero-video-mask absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover ${
          revealed ? "is-revealed" : ""
        }`}
      />

      {/* Legibility scrim over whatever is showing */}
      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
}
