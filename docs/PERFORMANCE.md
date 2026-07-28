# Performance & quality guide

## Measured build output

From `next build` (Next.js 15.5, production):

```
Route                          Size      First Load JS
/                              6.5 kB    167 kB
/projects                     10.9 kB    163 kB
/brothers/[id]                 0.6 kB    158 kB
/blog/[slug]                   0.7 kB    150 kB
+ First Load JS shared by all            103 kB
```

Every page is statically prerendered except `/api/contact` and `/og`. three.js is **not** in any
of those numbers — it is fetched lazily, in the browser, only when motion is allowed.

---

## Why it is fast

| Decision | Effect |
| --- | --- |
| Dynamic `import("three")` inside an effect | ~150 KB kept out of the initial bundle; never fetched under reduced motion |
| `IntersectionObserver` + `visibilitychange` gating | GPU work stops when the hero is off-screen or the tab is hidden |
| DPR capped at 1.75, `powerPreference: "low-power"` | Protects laptops and phones from needless fill-rate cost |
| Inline SVG placeholder art | Zero image requests, zero layout shift, deterministic output |
| `CursorGlow` writes transforms in rAF | Pointer movement never triggers a React render |
| `optimizePackageImports` | `lucide-react` and `framer-motion` tree-shaken to what is used |
| `next/font` with `display: swap` | Fonts self-hosted at build; no render-blocking Google request |
| Server components by default | Only 12 components ship client JavaScript |

---

## Measuring

```bash
npm run build && npm run start
# then, in Chrome DevTools → Lighthouse, on http://localhost:3000
```

Always measure in an **incognito window** — extensions routinely cost 20+ points and produce
misleading advice.

Targets: Performance, Accessibility, Best Practices and SEO each ≥ 95.

For field data rather than lab data, check
[PageSpeed Insights](https://pagespeed.web.dev/) against the live domain once it has traffic.

---

## If a score drops

**Performance**

- Check the bundle: `ANALYZE=true` after adding `@next/bundle-analyzer`, or read the route table
  that `next build` prints. A route that jumps by tens of kB usually means a new client component
  or a library imported at module scope rather than dynamically.
- Adding real photographs? Always use `next/image` with `sizes` and explicit `width`/`height`.
  Raw `<img>` is the fastest way to break both LCP and CLS.
- Do not add animation libraries. Framer Motion and three.js already cover everything here.

**Accessibility**

- New interactive elements need a discernible name (visible text, `aria-label`, or `sr-only`).
- Any new colour must clear 4.5:1 against its background — check before adding it to `@theme`.
- Keep one `h1` per page and do not skip heading levels.

**Best practices**

- Third-party scripts go through `next/script` with `strategy="afterInteractive"`, never a raw
  `<script>` tag.
- The CSP-adjacent headers in `next.config.ts` may need updating if you add an external embed.

---

## Manual checks before each launch

- [ ] Keyboard only: tab through the whole site; the skip link appears first, focus is always visible
- [ ] OS "Reduce motion" on: reload — no particles, no reveal animations, content fully readable
- [ ] Screen reader pass over `/projects` — status pills should read "Status: Completed"
- [ ] 320px viewport: no horizontal scroll anywhere
- [ ] Ultra-wide (2560px+): content stays centred and readable, does not stretch
- [ ] Slow 3G throttle: text renders before the WebGL background
- [ ] Light theme toggle: check contrast on cards and muted text
- [ ] Print `/brothers/sommay` — `.no-print` elements are hidden and the text is legible

---

## Budgets

Treat these as limits, not targets:

| Metric | Budget |
| --- | --- |
| Shared First Load JS | ≤ 120 kB |
| Any single route First Load JS | ≤ 180 kB |
| LCP (mobile, field) | ≤ 2.5 s |
| CLS | ≤ 0.05 |
| INP | ≤ 200 ms |

If a change pushes past one of these, the change needs justifying — not the budget.
