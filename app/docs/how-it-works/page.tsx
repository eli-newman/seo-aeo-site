import type { Metadata } from "next";

import { DocHead } from "../components/doc-head";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "The /seo-aeo orchestrator runs eight gated phases — preflight, discover, measure, on-site fix, build blog, engine, verify — branch-only and safe.",
  alternates: { canonical: "/docs/how-it-works" },
};

const phases = [
  ["Preflight", "Checks Node, git, and the gh CLI; gathers every key and decision up front so nothing blocks later.", "env + inputs ready"],
  ["Discover", "Detects your framework, finds whether a blog exists and is publicly crawlable, and inventories existing SEO so it doesn't redo good work.", "site understood"],
  ["Measure", "Baselines Lighthouse (SEO/A11y/best-practices) and Core Web Vitals on mobile.", "scores captured"],
  ["On-site fix", "Fixes metadata, canonical, robots.txt, sitemap, llms.txt, JSON-LD, and citation-crawler access — pure code, no keys.", "targets hit"],
  ["Build blog", "If you have no blog, scaffolds one for your stack (Next.js / Astro) that renders the engine's frontmatter contract — and makes sure it's public.", "renders + crawlable"],
  ["Engine", "Onboards the recurring article engine: keyword bank, voice, config, the GitHub Actions cron, the secret, and PR permissions.", "dry-run passes"],
  ["Verify", "Triggers a real run, confirms a PR opens, and confirms the published article is live and crawlable (HTTP 200, JSON-LD present).", "end-to-end proven"],
];

export default function Page() {
  return (
    <>
      <DocHead
        title="How it works"
        lead="One orchestrator, eight gated phases. Each gate is a hard stop; each change is on a branch; nothing is pushed without you."
        href="/docs/how-it-works"
      />

      <h2>The flow</h2>
      <p>
        You run <code>/seo-aeo</code>. It front-loads inputs in Phase 0, then
        runs each phase in order, checking the gate before advancing and pausing
        only for real decisions (a missing key, a dirty tree, a site change).
      </p>

      <table>
        <thead>
          <tr>
            <th>Phase</th>
            <th>What it does</th>
            <th>Gate</th>
          </tr>
        </thead>
        <tbody>
          {phases.map(([p, d, g]) => (
            <tr key={p}>
              <td className="whitespace-nowrap font-medium">{p}</td>
              <td>{d}</td>
              <td className="whitespace-nowrap text-fg-faint">{g}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>The safety contract</h2>
      <p>
        seo-aeo is reversibility-weighted: the harder an action is to undo, the
        more it needs your explicit OK. In practice that means:
      </p>
      <ul>
        <li><strong>Branch only.</strong> It never commits to your default branch and never auto-pushes.</li>
        <li><strong>Dirty tree → stop.</strong> It won&apos;t entangle its changes with your uncommitted work.</li>
        <li><strong>Dry-run first</strong> for anything generative; it shows what it&apos;ll change.</li>
        <li><strong>Stay in scope.</strong> It only touches SEO/AEO-relevant files.</li>
        <li><strong>Honesty over green checks.</strong> If it can&apos;t verify something, it says PENDING instead of faking a pass.</li>
      </ul>

      <h2>Two phases run with no API keys</h2>
      <p>
        Discovery and the on-site fix are pure code edits — you can run them with
        zero keys and zero cost. Only the recurring article engine needs an{" "}
        <code>ANTHROPIC_API_KEY</code>.
      </p>
    </>
  );
}
