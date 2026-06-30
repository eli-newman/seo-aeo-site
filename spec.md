# seo-aeo-site — Spec

> The marketing + docs site for **seo-aeo**. It must itself be a live proof
> of the product: maximally SEO- and AEO-optimized, server-rendered, and
> citable. We build it optimized, then run `/seo-aeo` on it to prove the loop.

## 1. Goals

1. **Convert** — a developer lands, instantly gets "what is this + why + how
   to start," and copies an install command in < 30 seconds.
2. **Document** — an organized, searchable-feeling docs/how-to guide that
   takes someone from zero to a running setup.
3. **Dogfood** — the site is the showcase: perfect Lighthouse SEO, full
   structured data, `llms.txt`, citation-crawler `robots.txt`, SSR content.
   We then run the engine's own playbook on it.
4. **Drive adoption** — clear CTAs to the GitHub repo + the two-command
   plugin install.

## 2. Audience

Developers / indie hackers / agencies who want their site to rank in Google
AND get cited by ChatGPT/Perplexity/Gemini, and want automated articles.
They're skeptical of marketing fluff and respond to specifics + real proof.

## 3. Tech

- **Next.js 16, App Router, TypeScript** (SSR/SSG — required for AEO).
- **Tailwind v4** for styling. Dark, modern dev-tool aesthetic (think
  Vercel/Linear/shadcn): near-black background, a single accent gradient,
  mono font for code, generous spacing, crisp typography.
- Deploy: **Vercel**. Repo: **github.com/eli-newman/seo-aeo-site**.
- No DB, no auth — fully static/SSG where possible (fast CWV).

## 4. Information architecture

```
/                      Landing
/docs                  Docs home (redirects to /docs/quickstart or overview)
/docs/quickstart       Zero-to-running
/docs/install          The 3 ways (plugin · skills/CLI · playbook/AGENTS.md)
/docs/how-it-works     The /seo-aeo flow + 8 phases + gates
/docs/skills           Skill reference (orchestrator + 7 task skills)
/docs/engine           The recurring article engine (cron, config, secrets)
/docs/aeo              What AEO/GEO is + how we optimize for it (the teaching)
/docs/config           seo-aeo.config.json + .seo-aeo/* reference
/docs/faq              FAQ (drives FAQPage JSON-LD)
/docs/troubleshooting  Common gotchas (the ones dogfooding found)
```

Docs use a shared layout: left sidebar nav, content column, "on this page"
where useful. Each doc page is server-rendered, semantic HTML.

## 5. Landing page sections

1. **Hero** — one-line promise ("Rank in Google *and* get cited by AI"),
   subhead, two CTAs (Get started / GitHub), the two-command install in a
   copyable code block.
2. **The problem** — SEO gets you ranked; AEO gets you *cited*. Most tools
   do neither well.
3. **How it works** — the 3 ways / the phased flow, visualized.
4. **Features grid** — on-site fix, build-a-blog, autonomous articles,
   structured data, llms.txt, gated + safe, any-agent (AGENTS.md), proven.
5. **Proof** — "proven autonomous": a GitHub Action opens an article PR on
   its own; bugs caught by dogfooding; real audit scores.
6. **AEO teaser** — short version of the teaching, link to /docs/aeo.
7. **Final CTA** — install + GitHub.
8. **Footer** — links, repo, license.

## 6. AEO/SEO requirements (the dogfood — non-negotiable)

- `app/robots.ts` — allow the **citation crawlers** (OAI-SearchBot,
  Claude-SearchBot, Perplexity*, Googlebot, Bingbot, Applebot); sitemap ref.
- `public/llms.txt` — concise site map for LLMs (mark as the showcase).
- `app/sitemap.ts` — all routes.
- Per-page `generateMetadata`: title, description, canonical, OG + Twitter,
  `metadataBase`.
- JSON-LD: `Organization` + `SoftwareApplication` site-wide; `FAQPage` on
  /docs/faq; `HowTo` on /docs/quickstart; `BreadcrumbList` in docs.
- `app/opengraph-image.tsx` — branded OG image.
- Content is **server-rendered text** (no client-only critical copy),
  one H1/page, clean H2/H3, quotable quick-answers, short paragraphs.
- Core Web Vitals: `next/font`, optimized images, no layout shift.

## 7. Quality gates

- `npm run build` clean (SSG), `npm run lint`, `tsc --noEmit` clean.
- Lighthouse mobile: SEO ≥ 95, Best-practices ≥ 95, A11y ≥ 95, perf good.
- All JSON-LD validates; robots/sitemap/llms.txt present and correct.
- Deploys on Vercel; `/` and `/docs/*` return 200 unauthenticated.

## 8. Milestones — see todo.md

M0 spec+todo · M1 scaffold (builds) · M2 landing · M3 docs · M4 AEO/SEO +
dogfood · M5 push + deploy.
