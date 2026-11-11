/* ============================================================
   2026 summit details — single source of truth for the date
   and venue shown across the site. Change values here only.
   ============================================================ */

export const EVENT = {
  /** Full label shown in the hero and the "Join" section. */
  dateLabel: "Saturday, 28 November 2026",
  /** Short label for compact spots (menu, footer). */
  dateShort: "28 November 2026",
  /** Machine-readable date for the <time> element and metadata. */
  isoDate: "2026-11-28",
  /** Venue name and its Google Maps link. */
  location: "Ethiopian Science Museum",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Ethiopian+Science+Museum%2C+Addis+Ababa",
} as const;
