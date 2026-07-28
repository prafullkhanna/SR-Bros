# Deployment guide

Target platform: **Vercel** (the app uses App Router, `next/font`, `next/og` and route handlers,
all of which are first-class there). Cloudflare Pages works too — notes at the bottom.

---

## 1. Push to GitHub

```bash
cd "path/to/SR Bros"
git init
git add .
git commit -m "feat: SRbros.in portfolio site"
git branch -M main
git remote add origin https://github.com/prafullkhanna/SR-Bros.git
git push -u origin main
```

`node_modules`, `.next` and `.env*` are already ignored.

---

## 2. Deploy on Vercel

1. Sign in at [vercel.com](https://vercel.com) with the GitHub account.
2. **Add New → Project**, import the repository.
3. Vercel detects Next.js; leave every build setting at its default:
   - Framework: Next.js
   - Build command: `next build`
   - Output directory: `.next`
   - Install command: `npm install`
4. Add environment variables (below).
5. **Deploy.**

First build takes roughly a minute. Every push to `main` redeploys; every pull request gets its
own preview URL.

### Environment variables

Set these in **Project → Settings → Environment Variables** for *Production*, *Preview* and
*Development*:

| Name | Value | Required |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://srbros.in` | Recommended — canonical URLs, sitemap, OG tags |
| `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX` | Optional |
| `NEXT_PUBLIC_CLARITY_ID` | Clarity project ID | Optional |

Anything prefixed `NEXT_PUBLIC_` is visible in the browser. Never put an API key behind that
prefix — server-only secrets (an email provider key, for example) go in plain, unprefixed
variables and are read inside `src/app/api/`.

---

## 3. Connect srbros.in

1. **Project → Settings → Domains → Add** → `srbros.in`.
2. Vercel shows the DNS records. At your registrar:

   | Type | Name | Value |
   | --- | --- | --- |
   | `A` | `@` | `76.76.21.21` |
   | `CNAME` | `www` | `cname.vercel-dns.com` |

   (Use whatever Vercel actually displays — these values can change.)
3. Set `www.srbros.in` to redirect to the apex domain, so there is one canonical origin.
4. Wait for DNS propagation (minutes to a few hours). TLS is issued automatically.
5. Update `NEXT_PUBLIC_SITE_URL` to `https://srbros.in` and redeploy so metadata matches.

---

## 4. Post-deploy checklist

- [ ] `https://srbros.in/sitemap.xml` loads and lists every page
- [ ] `https://srbros.in/robots.txt` points at that sitemap
- [ ] `https://srbros.in/og` renders the social card
- [ ] Paste the URL into the [Facebook sharing debugger](https://developers.facebook.com/tools/debug/)
      and [Twitter card validator](https://cards-dev.twitter.com/validator)
- [ ] Verify the domain in [Google Search Console](https://search.google.com/search-console) and
      submit the sitemap
- [ ] Run Lighthouse (Chrome DevTools → Lighthouse) on `/` and `/projects` in an incognito window
- [ ] Test the contact form end to end
- [ ] Tab through the site with the keyboard alone — the skip link should appear first
- [ ] Enable "Reduce motion" in the OS and reload: the three.js background must not load at all

---

## 5. Contact form delivery

`src/app/api/contact/route.ts` validates, rate-limits and logs submissions but does **not** send
email yet. To wire up [Resend](https://resend.com):

```bash
npm install resend
```

```ts
// src/app/api/contact/route.ts
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: "SRbros <noreply@srbros.in>",
  to: process.env.CONTACT_EMAIL!,
  replyTo: email,
  subject: `[srbros.in] ${subject} — ${name}`,
  text: message,
});
```

Add `RESEND_API_KEY` and `CONTACT_EMAIL` as **unprefixed** environment variables, and verify
`srbros.in` as a sending domain inside Resend.

The in-memory rate limiter resets per serverless instance. If abuse becomes an issue, move it to
Vercel KV or Upstash Redis.

---

## 6. Hostinger (Node.js Web App)

Requires a **Business** or **Cloud** plan. Node.js apps are not available on Premium/Single
shared plans, and VPS plans need manual PM2 + Nginx setup instead.

### Deploy from GitHub

1. hPanel → **Websites** → **Add Website** → **Node.js Apps**
2. **Import Git Repository** → authorise the Hostinger GitHub app
3. Select `prafullkhanna/SR-Bros`
4. Build settings — Next.js is detected automatically. Confirm:

   | Setting | Value |
   | --- | --- |
   | Framework | Next.js |
   | Node version | 22.x (18/20/22/24 supported; `package.json` requires ≥ 20.9) |
   | Install command | `npm install` |
   | Build command | `npm run build` |
   | Output directory | `.next` |
   | Entry / start | `npm run start` |

5. **Environment Variables** → add `NEXT_PUBLIC_SITE_URL` = `https://srbros.in`
6. **Deploy**

Pushes to `main` redeploy automatically from then on.

**Do not** set `output: "standalone"` in `next.config.ts`. Hostinger runs `next start` against the
default `.next` output; standalone mode needs a different entry point and will fail to boot.

### Where the files land

- App build: `/home/{user}/domains/srbros.in/nodejs`
- Routing: `/home/{user}/domains/srbros.in/public_html/.htaccess` — generated automatically

A **403 after deploy** almost always means that `.htaccess` is missing or stale. Redeploying
regenerates it.

### Constraints to know

- One GitHub account per hosting plan; all Node.js sites on the plan share it
- Switching the app to a different repository requires removing and re-adding the website
- If `srbros.in` already exists as a website on the plan, remove it **after taking a backup** —
  Node.js apps must be added as a new website
- There is no "stop" or "delete deployment" control; taking the app offline means removing the
  website
- No preview deployments and no one-click rollback — this is the main reason to keep the Vercel
  project connected to the same repo
- Server-side apps get a **Restart** button on the dashboard, which is faster than a full rebuild
  when the process is wedged
- `npm` runs only during deployment; you cannot run it over SSH on these plans

### When you add real photographs

Self-hosted `next/image` optimisation needs `sharp`:

```bash
npm install sharp
```

Vercel bundles it; Hostinger does not. Without it, `next/image` falls back to serving unoptimised
originals.

### Pointing the domain

Only one host can serve `srbros.in` at a time.

1. In hPanel, make sure the domain uses Hostinger nameservers (`ns1.dns-parking.com`,
   `ns2.dns-parking.com`) or points at the Hostinger IP
2. In Vercel, **Settings → Domains → remove `srbros.in`** so two origins do not both claim to be
   canonical — Vercel keeps building and serving its `*.vercel.app` URL as a fallback
3. `NEXT_PUBLIC_SITE_URL` stays `https://srbros.in` in both places, so canonical tags always point
   at the live domain regardless of which host rendered the page

---

## 7. Cloudflare Pages (alternative)

- Build command `npx @cloudflare/next-on-pages@1`, output `.vercel/output/static`
- Set `nodejs_compat` in compatibility flags
- Note that `/og` is pinned to the Node runtime; review it before moving to a Workers-based host

---

## 8. Rollback

Vercel keeps every deployment. **Deployments → ⋯ → Promote to Production** on any previous build
restores it instantly — no rebuild, no git revert.

Hostinger has no equivalent. To roll back there, revert the commit in GitHub and push — the
redeploy is triggered by the push:

```bash
git revert <bad-commit-sha>
git push
```
