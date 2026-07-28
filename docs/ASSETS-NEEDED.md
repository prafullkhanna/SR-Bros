# Assets still needed

Everything below is currently a placeholder. Each item says exactly where to put the real thing.
Placeholders are deliberately visible on the site (labelled "Placeholder" / "Coming soon") so the
site is never misleading while it waits for real material.

---

## 1. Contact & social links — **highest priority**

**File:** `src/content/site.ts` → `contactLinks`

| Item | Current placeholder | Needed |
| --- | --- | --- |
| Email | `hello@srbros.in` | Real, monitored address |
| GitHub | `github.com/prafullkhanna` | Confirm which profile to show — the repo lives at `prafullkhanna/SR-Bros`, but a profile in Sommay's own name would carry more weight with universities |
| LinkedIn | `linkedin.com/in/srbros` | Real profile URL |
| Instagram | `instagram.com/srbros` | Real handle, or delete the entry |
| YouTube | `youtube.com/@srbros` | Real channel, or delete the entry |

Remove `placeholder: true` from each entry once the URL is real — that flag drives the
"Placeholder" badge shown in the footer and on the contact page.

---

## 2. Photography

Put optimised images (`.webp` or `.avif`, ~1600px long edge, under ~300 KB) in `public/gallery/`,
then set `src` and `placeholder: false` on the matching entry in `src/content/gallery.ts`.

**Portraits**

- [ ] Sommay Khanna — head-and-shoulders, ideally at the workbench
- [ ] Ramansh Khanna — same treatment
- [ ] One photo of both brothers together (used for social sharing)

**Builds**

- [ ] Robo Car — full build, plus a close-up of the electronics
- [ ] Line-following robot — the competition machine
- [ ] Disaster robot — chassis, sensor bench, drone, payload trials
- [ ] Workbench / workspace shot

**Competitions & events**

- [ ] Single Line Robotics Championship, IIT Bombay — venue, pit, run
- [ ] The IIT Delhi project selection — event or project photo
- [ ] Robotics workshops attended
- [ ] School science exhibitions at The Heritage School, Rohini

**Ramansh**

- [ ] First circuits / experiments (used on his profile page)

---

## 3. Certificates & proof

These raise credibility with universities and judges more than anything else on this list.

- [ ] IIT Bombay participation certificate (PDF + image)
- [ ] IIT Delhi selection letter or certificate
- [ ] Any workshop or course certificates
- [ ] School recognition

Store scans in `public/certificates/` and add gallery entries with
`category: "competitions"`.

---

## 4. Project links

**File:** `src/content/projects.ts` → each project's `links` array

- [ ] Disaster Management Robot — GitHub repo, technical write-up, demo video
- [ ] Robo Car — GitHub repo, build photos
- [ ] Line-following robot — competition photos
- [ ] Business management software — screenshots (redact client data first)
- [ ] Inventory system — screenshots
- [ ] Website projects — live URLs for each site delivered
- [ ] AI automation — write-up or repo

Delete `placeholder: true` once a link is live; placeholder links render as a
non-clickable "Coming soon" chip rather than a dead link.

---

## 5. Facts to confirm before launch

Confirm these read exactly right — the whole site's credibility rests on them.

- [ ] **IIT Delhi**: the site says "A project by Sommay was selected at IIT Delhi." If the project
      name, event or year is known, add it — specifics are far more persuasive than a general claim.
- [ ] **IIT Bombay**: confirm the year (currently 2024) and the exact competition name.
- [ ] **Disaster robot**: the project page states it is in development with subsystems being
      prototyped. If any subsystem is fully built and tested, say so explicitly. If it is still
      purely a design, change `status` from `ongoing` to `concept` in `src/content/projects.ts`.
- [ ] **Business software**: confirm it is fine to reference publicly. If the client should not be
      identifiable, the current wording already avoids naming them — keep it that way.
- [ ] **Timeline years**: check every date in `src/content/timeline.ts`.
- [ ] **Skill levels**: `src/content/skills.ts` and each brother's `skills` array are self-assessed
      estimates. Adjust to whatever feels honest.

---

## 6. Optional

- [ ] Demonstration video for the disaster robot (embed on the project page)
- [ ] Résumé / CV PDFs, one per brother, in `public/`
- [ ] A real 3D model of the robot for an interactive viewer
- [ ] A custom OG image, if the generated one at `/og` is not wanted
- [ ] Google Analytics 4 and Microsoft Clarity IDs for `.env.local`
- [ ] A verified Google Search Console property for `srbros.in`

---

## Placeholder inventory

Where to find every placeholder in the codebase:

```bash
grep -rn "placeholder" src/content/
grep -rn "Coming soon" src/
```

`src/components/effects/PlaceholderArt.tsx` generates all the artwork. It is deterministic —
the same project always renders the same pattern — so the site looks intentional rather than
unfinished while assets are pending.
