# SRbros.in

The official portfolio of **Sommay Khanna** and **Ramansh Khanna** — two brothers in New Delhi
building robotics, AI and software.

> Two Brothers. One Vision. Building the Future with AI, Robotics & Technology.

Production Next.js 15 application: App Router, TypeScript, TailwindCSS v4, Framer Motion and a
lazily-loaded three.js hero. Dark-first, fully responsive, accessible, and SEO-complete.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

Other scripts:

```bash
npm run build        # production build
npm run start        # serve the production build
npm run lint         # ESLint (next/core-web-vitals + typescript)
npm run typecheck    # tsc --noEmit
```

Node 20.9 or newer is required.

### Environment

Copy `.env.example` to `.env.local`. Every variable is optional — the site builds and runs
without any of them.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin used for metadata, sitemap and OG tags. Defaults to `https://srbros.in`. |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 measurement ID. Omit and no GA script loads at all. |
| `NEXT_PUBLIC_CLARITY_ID` | Microsoft Clarity project ID. Omit and no Clarity script loads. |

---

## The one rule of this codebase

**Never publish something as done when it isn't.**

Every project, milestone and achievement in `src/content/` carries a mandatory `status`:

| Status | Meaning |
| --- | --- |
| `completed` | Built, finished and working |
| `ongoing` | Actively being built right now |
| `concept` | Designed on paper, not built |
| `planned` | Intended future work, not started |

The `<StatusPill />` component renders that label everywhere the item appears. TypeScript makes
the field required, so a new entry cannot skip it. Credibility with universities, competition
judges and incubators is the entire point of the site — keep it.

---

## Project structure

```
src/
├─ app/                    # App Router routes
│  ├─ layout.tsx           # fonts, metadata, nav/footer, JSON-LD, analytics
│  ├─ page.tsx             # home
│  ├─ about/               # story and principles
│  ├─ brothers/            # index + [id] profile pages
│  ├─ projects/            # index + [slug] case studies
│  ├─ robotics/  ai/       # discipline pages
│  ├─ timeline/  gallery/  # journey and images
│  ├─ blog/                # index + [slug]
│  ├─ media/  contact/     # recognition and contact
│  ├─ api/contact/         # validated, rate-limited form endpoint
│  ├─ og/route.tsx         # dynamic Open Graph images
│  └─ sitemap.ts robots.ts manifest.ts
├─ components/
│  ├─ layout/              # Navbar, Footer, Analytics, StructuredData
│  ├─ ui/                  # Container, Section, Button, StatusPill, Tag…
│  ├─ motion/              # Reveal, TiltCard, AnimatedCounter, PageTransition
│  ├─ effects/             # ThreeBackground, Aurora, CursorGlow, PlaceholderArt
│  ├─ sections/            # Hero, Stats, Timeline, SkillsRadar, ProjectExplorer…
│  └─ cards/               # ProjectCard, ProfileCard, BlogCard
├─ content/                # ← all site copy and data lives here
├─ hooks/                  # reduced-motion, parallax, scroll progress, theme
├─ lib/                    # utils, seo, structured-data, stats
└─ types/                  # shared domain types
```

**Adding content never requires touching a component.** Edit the typed arrays in `src/content/`
and the pages, sitemap, filters and stats update themselves.

Full detail: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) ·
[`docs/CONTENT.md`](docs/CONTENT.md)

---

## Design system

Tokens are declared once in `src/app/globals.css` under `@theme`, so Tailwind generates
utilities from them (`text-cyan-accent`, `bg-graphite`, `border-hairline`, `font-display`).

- **Type** — Space Grotesk (display) + Inter (body), loaded via `next/font` with `display: swap`
- **Surfaces** — void `#05060a`, graphite `#0e1118`, slate `#141824`
- **Accents** — electric `#4d7cff`, cyan `#35d6f5`, violet `#9d7bff`, emerald `#34d99b`
- **Motion** — `--ease-out-expo` for everything; nothing bounces or spins

A light theme ships behind the nav toggle and is applied before first paint by a tiny inline
script, so a saved preference never flashes.

---

## Performance

- three.js is dynamically imported and never downloaded for reduced-motion visitors
- The WebGL loop pauses when the tab is hidden or the canvas scrolls out of view; DPR is capped at 1.75
- `optimizePackageImports` for `lucide-react` and `framer-motion`
- All placeholder art is inline SVG — no image requests, no layout shift
- Every route is statically generated; `generateStaticParams` pre-renders project, profile and post pages

## Accessibility

Targets WCAG 2.2 AA.

- Skip link, semantic landmarks, one `h1` per page
- Visible focus rings on a dedicated `:focus-visible` style
- `prefers-reduced-motion` honoured in CSS **and** in every animated component
- The skills radar ships an equivalent data table; meters expose `aria-valuenow`
- Keyboard-operable nav, filters, timeline, gallery and lightbox; Escape closes overlays

## SEO

Per-page metadata via `pageMeta()`, canonical URLs, Open Graph and Twitter cards, dynamic OG
images at `/og`, generated `sitemap.xml` and `robots.txt`, plus Schema.org JSON-LD for
`WebSite`, `Person`, `CreativeWork`, `BlogPosting` and `BreadcrumbList`.

See [`docs/SEO.md`](docs/SEO.md).

## Security

Strict security headers in `next.config.ts` (HSTS, nosniff, frame options, permissions policy).
The contact endpoint validates and length-caps every field, uses a honeypot plus a
minimum-time-on-form check, and rate-limits per IP. No secrets are exposed to the client.

---

## Before launch

Replace the placeholders — they are deliberately obvious and all in one place.

1. `src/content/site.ts` — email and social URLs (`placeholder: true`)
2. `public/gallery/` — real photographs; then set `src` in `src/content/gallery.ts`
3. Project links — GitHub, demos and write-ups in `src/content/projects.ts`
4. Connect an email provider in `src/app/api/contact/route.ts`

The complete list is in [`docs/ASSETS-NEEDED.md`](docs/ASSETS-NEEDED.md).

## Deployment

[`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) covers Vercel, custom domain setup for `srbros.in`,
environment variables and CI.

---

© Sommay & Ramansh Khanna. Built with Next.js.
