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
