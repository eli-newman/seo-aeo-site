# seo-aeo-site — todo

## M0 — Plan
- [x] spec.md
- [x] todo.md

## M1 — Foundation (must build before more)
- [ ] Scaffold Next.js 16 (TS, Tailwind, App Router) — `create-next-app`
- [ ] Design tokens: colors, fonts (`next/font`), base layout, container
- [ ] Shared UI: nav bar, footer, button, code block (copyable), section
- [ ] **GATE:** `npm run build` + lint + typecheck green → commit

## M2 — Landing page
- [ ] Hero + two-command install (copyable) + CTAs
- [ ] Problem (SEO vs AEO) section
- [ ] How-it-works (3 ways / phased flow)
- [ ] Features grid
- [ ] Proof / "proven autonomous" section
- [ ] AEO teaser → /docs/aeo
- [ ] Final CTA + footer
- [ ] Responsive + polished

## M3 — Docs
- [ ] Docs layout: sidebar nav + content column + mobile nav
- [ ] /docs/quickstart
- [ ] /docs/install
- [ ] /docs/how-it-works
- [ ] /docs/skills
- [ ] /docs/engine
- [ ] /docs/aeo (the teaching)
- [ ] /docs/config
- [ ] /docs/faq
- [ ] /docs/troubleshooting

## M4 — AEO/SEO (dogfood)
- [ ] `app/robots.ts` (citation crawlers)
- [ ] `public/llms.txt`
- [ ] `app/sitemap.ts`
- [ ] per-page metadata + canonical + OG/Twitter + metadataBase
- [ ] JSON-LD: Organization, SoftwareApplication, FAQPage, HowTo, Breadcrumb
- [ ] `app/opengraph-image.tsx`
- [ ] run `/seo-aeo` (or measure) on the built site; fix gaps; record scores

## M5 — Ship
- [ ] `git init`, GitHub repo `seo-aeo-site`, push
- [ ] Deploy to Vercel (or wire it up)
- [ ] Verify live: `/` + `/docs/*` return 200, JSON-LD present
- [ ] Link the site from the seo-aeo repo README

## Backlog
- [ ] Blog on the site + wire the engine to auto-publish (ultimate dogfood)
- [ ] Search (cmd-k) over docs
- [ ] Dark/light toggle
