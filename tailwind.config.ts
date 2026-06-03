import type { Config } from "tailwindcss";

/**
 * Brand palette (single source of truth):
 *   black    #000000
 *   plum     #4B087C  ← deep purple
 *   grape    #89069E  ← mid magenta-purple
 *   magenta  #FD00E0  ← bright accent / primary
 *   cream    #FFF6FE  ← warm white / text on dark
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink:     "#000000",
        plum:    "#4B087C",
        grape:   "#89069E",
        magenta: "#FD00E0",
        cream:   "#FFF6FE",
        // Afriwork AI sub-brand accent (used in Product Showcase block)
        ai:      "#3DD8E8",
      },
      fontFamily: {
        sans:    ["var(--font-pangram)", "system-ui", "sans-serif"],
        display: ["var(--font-pangram)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        // Hero — deep black on the left fading to bright magenta on the right
        "hero-gradient":
          "radial-gradient(85% 90% at 105% 30%, #FD00E0 0%, #89069E 28%, #4B087C 52%, #000000 80%)",
        // About / Recap / Activities — black with a soft magenta wash from one corner
        "section-dark":
          "radial-gradient(60% 50% at 105% 0%, rgba(253,0,224,0.18) 0%, rgba(0,0,0,0) 60%), linear-gradient(180deg, #000000 0%, #000000 100%)",
        // What's Next — black with a wash from the opposite corner
        "section-dark-alt":
          "radial-gradient(55% 55% at -5% 100%, rgba(253,0,224,0.22) 0%, rgba(0,0,0,0) 60%), linear-gradient(180deg, #000000 0%, #000000 100%)",
        // Closing CTA
        "join-gradient":
          "radial-gradient(80% 110% at 50% 0%, #FD00E0 0%, #89069E 35%, #4B087C 65%, #000000 100%)",
      },
      boxShadow: {
        glow: "0 30px 80px -20px rgba(253,0,224,0.55)",
      },
    },
  },
  plugins: [],
};

export default config;
