# Future of Work Summit · Website

Marketing site for the Future of Work Summit · Ethiopia.

## Stack

- **Next.js 15** (App Router, fully static SSG)
- **Tailwind CSS 3** + custom brand palette
- **Pangram Sans** as the only font family (loaded via `next/font/local`)
- **TypeScript**

## Local development

```bash
npm install
npm run dev
```

The dev server picks a free port (usually `3000`). Open the URL it prints.

To produce a production build:

```bash
npm run build
npm run start
```

## Project layout

```
app/
├── layout.tsx              # Pangram font + global metadata
├── page.tsx                # The single Home page (only route)
└── globals.css             # Tailwind + base styles + .pill helpers

components/
├── Nav.tsx                 # FoW logo + hamburger (hamburger is decorative for now)
├── Logo.tsx                # Real FoW SVG logo
├── Shard.tsx               # 3D shape variants (planet / sparkle / burst / arrow)
├── IconDivider.tsx         # Decorative divider strip
└── ActivitiesSection.tsx   # Inline tabs + per-tab content + Afriwork AI block

public/
├── fonts/                  # Pangram .otf files (7 weights)
├── images/                 # Card/photo assets used on the page
├── photos/                 # Summit photos
├── shards/                 # Optimised 3D shape PNGs
└── svg/                    # Logo, divider, Afriwork chevron BG
```

## Brand palette

| Token     | Hex       | Used for                                 |
| --------- | --------- | ---------------------------------------- |
| `ink`     | `#000000` | Hero base, dark sections                 |
| `plum`    | `#4B087C` | Body text on cream, plum pills           |
| `grape`   | `#89069E` | Mid gradient stops                       |
| `magenta` | `#FD00E0` | Headings on dark, magenta pills, accents |
| `cream`   | `#FFF6FE` | Cream sections, text on dark             |
| `ai`      | `#3DD8E8` | Afriwork AI sub-brand accent (only)      |

Pills are contextual: `.pill` (plum bg) on cream sections, `.pill-magenta` on
dark sections.

## Notes on excluded folders

Two folders are intentionally `.gitignored`:

- **`Designs/`** — source PDF/PNG design files (≈ 144 MB).
- **`assets/`** — raw font and image sources (≈ 29 MB).

The web-optimised versions actually used by the site live in `public/`.

## Analytics & admin dashboard

- **Vercel Web Analytics** is on (`<Analytics />` in `components/Tracker.tsx`, plus a script tag in
  `public/ai-test/index.html`). Visitors and page views appear in Vercel → Analytics after deploy.
- **Own tracking** for the admin dashboard: `components/Tracker.tsx` sends page views and every link
  click to `/api/track`. Links are sorted automatically into downloads, registration (Google Form),
  phone, email, social, external and internal. Add `data-track="Label"` to a link to name it.
  The AI test sends its own events (start, finish, share, register).
- **Contact form** posts to `/api/contact`; messages appear in the dashboard and can be exported as CSV.
- **Dashboard** at `/admin`, protected by `ADMIN_PASSWORD`.

Setup in Vercel (once):

1. Storage → add **Upstash for Redis** (free plan) and connect it to this project.
2. Settings → Environment Variables → add `ADMIN_PASSWORD`.
3. Redeploy.
