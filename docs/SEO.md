# SEO guide

## What ships already

| Feature | Where |
| --- | --- |
| Per-page title, description, keywords | `pageMeta()` in `src/lib/seo.ts`, used by every route |
| Canonical URLs | `alternates.canonical`, built from `NEXT_PUBLIC_SITE_URL` |
| Open Graph tags | `pageMeta()` + root `layout.tsx` |
| Twitter cards | `summary_large_image` on every page |
| Dynamic OG images | `/og` route, per-page title and subtitle |
| `sitemap.xml` | `src/app/sitemap.ts`, generated from the content layer |
| `robots.txt` | `src/app/robots.ts` |
| Web manifest | `src/app/manifest.ts` |
| JSON-LD | `src/lib/structured-data.ts` |
| Semantic HTML | one `h1` per page, real `<nav>`, `<main>`, `<article>`, `<time>` |

## Structured data

| Schema | Pages |
| --- | --- |
| `WebSite` (with `SearchAction`) | every page, via the root layout |
| `Person` | home, `/brothers`, `/brothers/[id]` |
| `CreativeWork` | `/projects/[slug]` |
| `BlogPosting` | `/blog/[slug]` |
| `BreadcrumbList` | every secondary page |

Validate with the [Rich Results Test](https://search.google.com/test/rich-results) and
[Schema Markup Validator](https://validator.schema.org/) after deploying.

`Person` schema is what makes "Sommay Khanna" resolve as an entity rather than a string — it is
the highest-value markup on this site for university and recruiter searches.

---

## Launch checklist

1. Set `NEXT_PUBLIC_SITE_URL=https://srbros.in` in Vercel and redeploy. Canonicals, sitemap and OG
   URLs all derive from it, so getting this wrong silently breaks everything above.
2. Verify the property in [Google Search Console](https://search.google.com/search-console)
   (DNS TXT record is the most durable method).
3. Submit `https://srbros.in/sitemap.xml`.
4. Do the same in [Bing Webmaster Tools](https://www.bing.com/webmasters) — it also feeds
   DuckDuckGo.
5. Request indexing for `/`, `/brothers/sommay` and `/projects/disaster-management-robot`.
6. Check the social preview in the
   [Facebook debugger](https://developers.facebook.com/tools/debug/) and the LinkedIn
   [post inspector](https://www.linkedin.com/post-inspector/).

---

## Target queries

Realistic terms this site can rank for, given it is a personal portfolio:

- `Sommay Khanna` · `Ramansh Khanna` · `SRbros` — should be position 1; the `Person` schema and
  consistent naming across pages do most of the work
- `student robotics portfolio India`
- `disaster management robot student project`
- `young innovators Delhi robotics`
- `Heritage School Rohini robotics`

Do **not** chase competitive generic terms (`AI automation`, `robotics`). A portfolio wins on
entity searches and long-tail project queries, not head terms.

---

## Keeping it healthy

- New projects and posts enter the sitemap automatically — no manual step.
- New static pages must be added to `staticRoutes` in `src/app/sitemap.ts`. This is the one place
  it is easy to forget.
- Keep descriptions between 120 and 160 characters. `pageMeta` does not truncate for you.
- Every image needs real `alt` text. The generated placeholder art already labels itself as a
  placeholder to screen readers and crawlers.
- Do not add keyword-stuffed copy. The site's ranking advantage is genuine, specific content —
  a real IIT Bombay competition, a real business system — which is exactly what search engines
  are trying to find.

---

## Analytics

Set `NEXT_PUBLIC_GA_ID` and/or `NEXT_PUBLIC_CLARITY_ID` in Vercel. Nothing loads when they are
empty, so the default build ships zero third-party scripts.

GA4 is configured with `anonymize_ip`, and with ad-personalisation and Google signals disabled —
which keeps it defensible under GDPR/DPDP and keeps the performance cost low.
