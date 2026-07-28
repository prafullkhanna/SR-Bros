# Content management guide

All site content lives in `src/content/`. You do not need to touch a component to add a project,
a timeline entry, a blog post or a photograph.

```
src/content/
├─ site.ts        # site name, tagline, nav, footer, contact links
├─ brothers.ts    # profiles, skills, achievements, Ramansh's future tracks
├─ projects.ts    # the project catalogue
├─ timeline.ts    # chronological entries
├─ skills.ts      # radar chart axes + AI experiment list
├─ gallery.ts     # gallery items
├─ blog.ts        # posts
└─ media.ts       # press mentions + confirmed recognition
```

After any edit: `npm run typecheck` catches mistakes before they reach the browser.

---

## The status field — read this first

Every project, timeline entry and achievement requires a `status`:

| Value | Use when | Renders as |
| --- | --- | --- |
| `completed` | It is built, finished and works | green "Completed" |
| `ongoing` | It is being actively built right now | blue "In progress" |
| `concept` | It is designed on paper only | violet "Concept" |
| `planned` | It is intended but not started | amber "Planned" |

TypeScript will not let you omit it. **Do not promote something to `completed` until it is.**
Universities and competition judges check, and one overstated claim undermines everything else on
the site.

---

## Adding a project

Append to the `projects` array in `src/content/projects.ts`:

```ts
{
  slug: "autonomous-navigation",          // becomes /projects/autonomous-navigation
  title: "Autonomous Navigation Module",
  tagline: "One line for the card.",
  summary: "Two or three sentences for the top of the project page.",
  category: "robotics",                   // robotics | ai | software | web | research
  status: "ongoing",
  owner: "sommay",                        // sommay | ramansh | both
  period: "2026 — present",
  accent: "cyan",                          // electric | cyan | violet | emerald | amber
  stack: ["LIDAR", "SLAM", "Embedded C"],
  sections: [
    { heading: "Problem",  body: "…" },
    { heading: "Solution", body: "…", points: ["…", "…"] },
    { heading: "Challenges", body: "…" },
    { heading: "Results",  body: "…" },
  ],
  futureScope: ["…"],                      // always rendered as "not built yet"
  links: [{ label: "GitHub", href: "https://…" }],
}
```

That single object automatically produces: a card on `/projects`, a full page at
`/projects/<slug>`, a card on `/robotics` (or `/ai`), a sitemap entry, JSON-LD, an OG image, and
an updated "projects built" counter on the home page.

Set `featured: true` to make it the flagship on the home page — remove it from the current one
first, since only one is used.

**Section headings that work well:** Problem · Solution · System architecture · Mission flow ·
Development status · Engineering challenges · Results.

---

## Adding a timeline entry

`src/content/timeline.ts` — entries render in array order:

```ts
{
  id: "s-nav",              // unique
  year: "2026",             // or "Next" / "Ahead" for unscheduled future work
  title: "Autonomous navigation",
  description: "One or two sentences.",
  who: "sommay",            // sommay | ramansh | both
  status: "ongoing",
  tags: ["Robotics"],
}
```

`tags: ["Competition"]` with `status: "completed"` also increments the "competitions entered"
counter on the home page — so keep that tag accurate.

---

## Adding an achievement

`src/content/brothers.ts`, inside the relevant brother's `achievements` array:

```ts
{
  title: "National Robotics Championship",
  detail: "Factual description of what actually happened. No adjectives needed.",
  status: "completed",
}
```

**Ramansh's section is intentionally sparse.** Add real accomplishments as they happen; do not
pre-fill it. His `ramanshTracks` array holds clearly-labelled future directions, which is the
honest way to show potential.

---

## Adding a blog post

`src/content/blog.ts`:

```ts
{
  slug: "tuning-a-control-loop",
  title: "Tuning a control loop by feel, then by maths",
  excerpt: "One or two sentences shown on the card.",
  date: "2026-08-14",           // ISO — drives sort order
  author: "sommay",
  tags: ["Robotics"],
  readingMinutes: 6,
  status: "published",          // "draft" hides it everywhere
  body: ["First paragraph…", "Second paragraph…"],
}
```

### Moving to MDX or a CMS

The layout is deliberately decoupled. To switch:

1. **MDX** — `npm install @next/mdx`, put files in `content/posts/*.mdx`, and replace the export
   in `blog.ts` with a loader that reads frontmatter into the same `BlogPost[]` shape.
2. **Sanity / Contentful** — replace `publishedPosts` with an async query returning `BlogPost[]`,
   and make `/blog` and `/blog/[slug]` async. Add `export const revalidate = 3600` for ISR.

Nothing in `BlogCard` or the post page changes in either case, because both consume the `BlogPost`
type rather than the storage format.

---

## Adding gallery images

1. Optimise the image (`.webp` or `.avif`, ~1600px long edge, under ~300 KB).
2. Drop it in `public/gallery/`.
3. Add or update the entry in `src/content/gallery.ts`:

```ts
{
  id: "g13",
  title: "Drone payload test",
  caption: "Third payload configuration under flight-time testing.",
  category: "robotics",       // robotics | competitions | workshops | school | builds
  ratio: "landscape",         // portrait | landscape | square — drives the masonry layout
  src: "/gallery/drone-payload-test.webp",
  placeholder: false,
}
```

While `placeholder: true`, the tile shows generated artwork with a visible "Placeholder" badge.

---

## Changing site-wide text

`src/content/site.ts` holds the headline, subheadline, tagline, description, footer quote,
navigation and contact links. Editing the headline updates the animated hero, the page title, the
OG image and the metadata description in one move.

---

## Adding a new page

1. Create `src/app/<route>/page.tsx`.
2. Export metadata with the `pageMeta()` helper:

   ```ts
   export const metadata = pageMeta({
     title: "Research",
     description: "…",
     path: "/research",
   });
   ```
3. Add it to `navLinks` or `footerGroups` in `site.ts`.
4. Add it to the `staticRoutes` array in `src/app/sitemap.ts`.
5. Add a `breadcrumbSchema` block for structured data.

Compose the page from `<Section>`, `<SectionHeading>` and `<Reveal>` so spacing and motion match
the rest of the site automatically.
