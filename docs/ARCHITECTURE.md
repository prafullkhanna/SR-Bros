# Architecture

## Principles

1. **Content is data, not markup.** Everything a visitor reads lives in typed arrays under
   `src/content/`. Pages consume that data; they never hard-code copy about projects or people.
2. **Server by default.** Components are React Server Components unless they need state, effects
   or browser APIs. `"use client"` appears only where it is genuinely required.
3. **Motion is opt-out at every layer.** `prefers-reduced-motion` is honoured in CSS globally and
   checked again inside every animated component, so heavy work (three.js) never even loads.
4. **Honesty is a type constraint.** `WorkStatus` is a required field, so a new project cannot be
   added without declaring whether it is built.

---

## Rendering strategy

| Route | Mode | Why |
| --- | --- | --- |
| `/`, `/about`, `/projects`, `/robotics`, `/ai`, `/timeline`, `/gallery`, `/blog`, `/media`, `/contact` | Static | Content only changes on deploy |
| `/projects/[slug]`, `/brothers/[id]`, `/blog/[slug]` | SSG via `generateStaticParams` | Every page pre-rendered at build |
| `/api/contact` | Dynamic (Node) | Needs the request |
| `/og` | Dynamic (Edge) | Generates images per query string |

Filtering on `/projects` and `/gallery` happens client-side over already-rendered data — the full
list is in the HTML for crawlers, and interaction costs no network request.

---

## Component layers

```
app/            routes, metadata, JSON-LD — thin, mostly composition
└─ sections/    page-level blocks (Hero, Timeline, SkillsRadar, ProjectExplorer)
   └─ cards/    repeated items (ProjectCard, ProfileCard, BlogCard)
      └─ ui/    primitives (Container, Section, Button, StatusPill, Tag)
         motion/ animation wrappers (Reveal, TiltCard, AnimatedCounter)
         effects/ decorative only (ThreeBackground, Aurora, CursorGlow, PlaceholderArt)
```

A component never reaches upward. `ui/` knows nothing about projects; `cards/` knows nothing
about page layout. That is what keeps the tree free of duplicates.

### The client/server boundary

Client components, and why:

| Component | Reason |
| --- | --- |
| `Navbar` | scroll state, mobile menu, theme toggle |
| `Reveal`, `RevealGroup`, `MotionItem`, `TiltCard`, `AnimatedCounter`, `PageTransition` | Framer Motion |
| `ThreeBackground`, `CursorGlow` | WebGL / pointer events |
| `ProjectExplorer`, `GalleryGrid`, `Timeline`, `SkillsRadar` | interactive filtering and state |
| `ContactForm` | form state and fetch |
| `Analytics` | third-party scripts |

Everything else — every page, every card, both layout shells — renders on the server.

`MotionItem` exists specifically so a server component (`Stats`) can hand staggered children to a
client `RevealGroup` without becoming a client component itself.

---

## Styling

Tailwind v4 with a CSS-first config. Tokens are declared once in `globals.css`:

```css
@theme {
  --color-electric: #4d7cff;   /* → text-electric, bg-electric/10, border-electric/30 */
  --font-display: var(--font-space-grotesk);  /* → font-display */
}
```

Runtime-switchable values (theme-dependent surfaces) are plain custom properties on `:root` and
`[data-theme="light"]`, referenced as `var(--surface)`. Tailwind tokens handle the palette;
`:root` variables handle theming. Keep that split.

Reusable composites (`.glass`, `.gradient-border`, `.text-gradient`, `.grid-backdrop`, `.rule`)
live in `@layer components`.

---

## Performance decisions

- **three.js is dynamically imported inside a `useEffect`**, after a reduced-motion check — so the
  ~150 KB payload never reaches users who asked for stillness, and never blocks first paint.
- **The render loop pauses** on `visibilitychange` and via an `IntersectionObserver`. Scrolling
  past the hero stops the GPU work entirely.
- **DPR is capped at 1.75** and `powerPreference: "low-power"` is set.
- **`CursorGlow` writes a transform directly in rAF** rather than through React state — the
  pointer never causes a re-render.
- **All placeholder art is inline SVG** — deterministic, zero network requests, no layout shift.
- **`optimizePackageImports`** keeps `lucide-react` and `framer-motion` tree-shaken.
- **Fonts** load through `next/font` with `display: swap` and are self-hosted at build time, so
  there is no render-blocking request to Google.

---

## Accessibility decisions

- Skip link is the first focusable element; `<main id="main">` receives it.
- One `h1` per page, enforced by `SectionHeading level="h1"` being used exactly once.
- The radar chart is decorative-plus: the same numbers appear in a real `<table>` below it.
- Skill bars use `role="meter"` with `aria-valuenow`.
- Filter buttons use `aria-pressed`; result counts are announced via `aria-live="polite"`.
- The gallery lightbox is `role="dialog" aria-modal="true"`, closes on Escape and on backdrop
  click, and moves focus to its close button.
- Status pills carry a visually-hidden "Status:" prefix so they read sensibly aloud.

---

## Adding to the site

See [`CONTENT.md`](CONTENT.md). The short version: edit an array in `src/content/`, and the
relevant pages, filters, sitemap entries and statistics update themselves.
