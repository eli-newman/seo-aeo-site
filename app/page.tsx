import Link from "next/link";

import { site } from "@/lib/site";
import { CopyBlock } from "./components/copy-block";
import { Constellation } from "./components/constellation-hero";
import { CitationCards } from "./components/citation-cards";

export default function Home() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="grain relative overflow-hidden border-b border-border">
        {/* aurora glow blobs */}
        <div className="aurora pointer-events-none absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-accent/15 blur-[140px]" />
        <div
          className="aurora pointer-events-none absolute -right-20 top-10 h-[32rem] w-[32rem] rounded-full bg-accent-2/15 blur-[140px]"
          style={{ animationDelay: "6s" }}
        />
        {/* animated citation constellation */}
        <div className="pointer-events-none absolute inset-0">
          <Constellation />
        </div>
        {/* readability mask over the left text column */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-bg via-bg/75 to-transparent" />
        {/* floating citation cards (right side) */}
        <CitationCards />

        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-5 pb-24 pt-20 sm:pt-28 lg:min-h-[80vh] lg:grid-cols-[1.1fr_1fr]">
          <div>
            <a
              href={site.repo}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-panel/70 px-3 py-1 text-xs text-fg-muted backdrop-blur transition hover:border-border-strong"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              Open source · MIT · proven autonomous
            </a>
            <h1 className="mt-6 text-balance text-5xl font-semibold tracking-tight sm:text-6xl">
              Rank in Google.
              <br />
              <span className="gradient-text">Get cited by AI.</span>
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-fg-muted">
              An open-source engine + agent skills that make any site rank in
              search <em className="not-italic text-fg">and</em> get cited by
              ChatGPT, Perplexity, and Gemini — then auto-publish an optimized
              article every week or two. Hand it to your agent and go.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/docs/quickstart"
                className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-bg transition hover:bg-accent/90"
              >
                Get started →
              </Link>
              <a
                href={site.repo}
                className="rounded-lg border border-border bg-panel/70 px-5 py-2.5 text-sm font-medium text-fg backdrop-blur transition hover:border-border-strong"
              >
                Star on GitHub ★
              </a>
            </div>
            <div className="mt-8 max-w-md">
              <CopyBlock label="Claude Code" lines={[...site.install.plugin]} />
              <p className="mt-2 text-xs text-fg-faint">
                Two commands to install, one to run. Any agent via{" "}
                <Link href="/docs/install" className="text-accent hover:underline">
                  AGENTS.md
                </Link>
                .
              </p>
            </div>
          </div>
          {/* right column is intentionally empty — the constellation + cards live here */}
          <div className="hidden lg:block" aria-hidden="true" />
        </div>
      </section>

      {/* ---------- Engines strip ---------- */}
      <section className="border-b border-border bg-bg-subtle">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-5 py-6 text-sm text-fg-faint">
          <span className="text-fg-muted">Optimizes for citation by</span>
          {["ChatGPT", "Perplexity", "Gemini", "Google AI Overviews", "Claude", "Copilot"].map(
            (e) => (
              <span key={e} className="font-medium text-fg-muted">
                {e}
              </span>
            ),
          )}
        </div>
      </section>

      {/* ---------- Problem ---------- */}
      <Section
        eyebrow="The shift"
        title="SEO gets you ranked. AEO gets you quoted."
      >
        <p className="mx-auto max-w-2xl text-center text-fg-muted">
          Search is splitting in two. Classic SEO ranks you in Google&apos;s blue
          links. <strong className="text-fg">Answer Engine Optimization (AEO)</strong>{" "}
          — also called GEO — gets your page <em className="not-italic text-fg">cited</em>{" "}
          inside ChatGPT, Perplexity, Gemini, and Google AI Overviews. They need
          different things, and most tools do neither well. seo-aeo does both, on
          autopilot.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Card>
            <h3 className="font-medium">Classic SEO ✓</h3>
            <p className="mt-2 text-sm text-fg-muted">
              Metadata, canonical URLs, sitemaps, Core Web Vitals, clean
              structure — the table stakes that get you indexed and ranked.
            </p>
          </Card>
          <Card>
            <h3 className="font-medium">
              Answer Engine Optimization <span className="text-accent">✓</span>
            </h3>
            <p className="mt-2 text-sm text-fg-muted">
              Citation-crawler access, JSON-LD, quotable 40–75 word answers,
              self-contained sections, cited statistics — what makes an LLM pick
              <em className="not-italic"> your</em> page to quote.
            </p>
          </Card>
        </div>
      </Section>

      {/* ---------- How it works ---------- */}
      <Section
        eyebrow="How it works"
        title="One command. Eight gated phases. Under 10 minutes of your time."
        subtle
      >
        <p className="mx-auto max-w-2xl text-center text-fg-muted">
          Point your agent at your repo and run <Code>/seo-aeo</Code>. It
          front-loads every decision up front, then runs the rest on its own —
          each phase gated, every change on a branch, nothing pushed without you.
        </p>
        <ol className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-2">
          {[
            ["Preflight", "Checks your env and gathers keys + decisions up front."],
            ["Discover", "Detects your stack, finds your blog, inventories existing SEO."],
            ["Measure", "Lighthouse + Core Web Vitals baseline."],
            ["On-site fix", "Metadata, robots, sitemap, llms.txt, JSON-LD, crawler rules."],
            ["Build blog", "Scaffolds a blog if you don't have one (Next/Astro)."],
            ["Engine", "Wires the recurring-article cron + secrets."],
            ["Verify", "Triggers a run, confirms a live, crawlable article."],
            ["Forever", "A PR with a fresh optimized article every 1–2 weeks."],
          ].map(([t, d], i) => (
            <li
              key={t}
              className="flex gap-3 rounded-lg border border-border bg-panel p-4"
            >
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-accent-soft font-mono text-xs text-accent">
                {i + 1}
              </span>
              <div>
                <div className="text-sm font-medium">{t}</div>
                <div className="mt-0.5 text-sm text-fg-muted">{d}</div>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* ---------- Features ---------- */}
      <Section eyebrow="What you get" title="Everything, optimized — and proven">
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title}>
              <div className="text-lg">{f.icon}</div>
              <h3 className="mt-3 font-medium">{f.title}</h3>
              <p className="mt-1.5 text-sm text-fg-muted">{f.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* ---------- Proof ---------- */}
      <Section
        eyebrow="Proven, not promised"
        title="A GitHub Action that writes you an article — on its own"
        subtle
      >
        <p className="mx-auto max-w-2xl text-center text-fg-muted">
          This isn&apos;t a demo. The engine runs in GitHub Actions on a schedule,
          generates an audit-passing article, and opens a pull request with zero
          humans in the loop. Merge it to publish.
        </p>
        <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-3">
          {[
            ["SEO 90 / AEO 100", "Every generated article passes a built-in SEO + AEO audit before it ships."],
            ["3 bugs caught", "Dogfooding on a real site surfaced and fixed bugs that mocked tests missed."],
            ["~10 min", "From zero to an autonomous, self-publishing content pipeline."],
          ].map(([stat, d]) => (
            <Card key={stat}>
              <div className="text-2xl font-semibold gradient-text">{stat}</div>
              <p className="mt-2 text-sm text-fg-muted">{d}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* ---------- AEO teaser ---------- */}
      <Section eyebrow="The teaching" title="Why does an AI quote one page over another?">
        <div className="mx-auto max-w-2xl space-y-4 text-fg-muted">
          <p>
            LLMs don&apos;t quote pages — they quote{" "}
            <strong className="text-fg">passages</strong>. They chunk your page,
            score each chunk, and lift the strongest self-contained one. So the
            winning move is to make every key answer a tight, quotable block:
            40–75 words, leads with the answer, no &quot;as mentioned above.&quot;
          </p>
          <p>
            Then there&apos;s the half nobody automates: being{" "}
            <strong className="text-fg">cited and mentioned</strong> across the
            web (reviews, Reddit, comparisons) so the engine trusts your brand.
            seo-aeo nails the on-page half completely and is honest about the
            off-page half.
          </p>
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/docs/aeo"
            className="inline-flex rounded-lg border border-border bg-panel px-5 py-2.5 text-sm font-medium text-fg transition hover:border-border-strong"
          >
            Read the full AEO guide →
          </Link>
        </div>
      </Section>

      {/* ---------- Final CTA ---------- */}
      <section className="border-t border-border bg-bg-subtle">
        <div className="mx-auto max-w-3xl px-5 py-20 text-center">
          <h2 className="text-3xl font-semibold tracking-tight">
            Make your site impossible to ignore — by Google and by AI.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-fg-muted">
            Free, open source, and proven. Install it in two commands.
          </p>
          <div className="mx-auto mt-8 max-w-xl text-left">
            <CopyBlock label="Claude Code" lines={[...site.install.plugin]} />
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/docs/quickstart"
              className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-bg transition hover:bg-accent/90"
            >
              Read the quickstart →
            </Link>
            <a
              href={site.repo}
              className="rounded-lg border border-border bg-panel px-5 py-2.5 text-sm font-medium text-fg transition hover:border-border-strong"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

const features = [
  { icon: "🔍", title: "On-site SEO + AEO sweep", body: "Fixes metadata, canonical, robots, sitemap, JSON-LD, and crawler access — on any stack." },
  { icon: "✍️", title: "Autonomous articles", body: "A GitHub Actions cron writes one optimized, audit-passing article every 1–2 weeks as a PR." },
  { icon: "🤖", title: "Built for AI citation", body: "Citation-crawler robots rules, quotable passages, FAQ/Article JSON-LD, llms.txt." },
  { icon: "🧱", title: "Builds your blog", body: "No blog yet? It scaffolds one (Next.js / Astro) that matches the engine's contract." },
  { icon: "🛡️", title: "Safe by design", body: "Branch-only, dry-run-first, gated phases, never auto-pushes. Reversible at every step." },
  { icon: "🧩", title: "Any agent, any project", body: "A Claude Code plugin, plus an AGENTS.md every coding agent reads. Drop it anywhere." },
];

function Section({
  eyebrow,
  title,
  subtle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtle?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className={subtle ? "bg-bg-subtle" : ""}>
      <div className="mx-auto max-w-6xl px-5 py-20">
        <div className="mb-2 text-center text-sm font-medium text-accent">
          {eyebrow}
        </div>
        <h2 className="text-balance text-center text-3xl font-semibold tracking-tight">
          {title}
        </h2>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-panel p-5 transition hover:border-border-strong">
      {children}
    </div>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-panel-2 px-1.5 py-0.5 font-mono text-[0.85em] text-accent">
      {children}
    </code>
  );
}
