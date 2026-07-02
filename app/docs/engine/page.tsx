import type { Metadata } from "next";

import { CopyBlock } from "@/app/components/copy-block";
import { DocHead } from "../components/doc-head";

export const metadata: Metadata = {
  title: "Article engine",
  description:
    "How the recurring article engine works: it ranks a topic, writes and audits an MDX article, and opens a GitHub PR every 1-2 weeks.",
  alternates: { canonical: "/docs/engine" },
};

export default function Page() {
  return (
    <>
      <DocHead
        title="The article engine"
        lead="The part that writes you an optimized article every week or two — forever — as a reviewable pull request."
        href="/docs/engine"
      />

      <h2>What a run does</h2>
      <p>Each run is one full pipeline:</p>
      <ol>
        <li><strong>Rank</strong> — scores your keyword bank (deterministic, no LLM) and picks the highest-intent topic you haven&apos;t covered.</li>
        <li><strong>Outline → write</strong> — drafts a 1,100–2,000 word article in your brand voice, leading with a citable quick-answer.</li>
        <li><strong>SEO pass</strong> — title, meta description, slug, internal links, keyword placement.</li>
        <li><strong>AEO pass</strong> — quick-answer block, self-contained sections, and Article + FAQPage JSON-LD.</li>
        <li><strong>Images</strong> (optional) — a hero + inline images with SEO alt text.</li>
        <li><strong>Audit</strong> — scores SEO + AEO and self-repairs once; below threshold gets flagged, not shipped.</li>
        <li><strong>Publish</strong> — writes the MDX, commits to a branch, and opens a pull request.</li>
      </ol>

      <h2>Running it</h2>
      <CopyBlock
        lines={[
          "npm install -D seo-aeo",
          "ANTHROPIC_API_KEY=… npx seo-aeo init",
          "npx seo-aeo run --dry-run",
        ]}
        className="not-prose my-5"
      />
      <p>
        <code>init</code> interviews you (or your agent pre-answers it) and writes
        a config, a keyword bank, a voice guide, and the GitHub Actions workflow.
        <code>run --dry-run</code> previews an article locally without opening a
        PR.
      </p>

      <h2>The cron</h2>
      <p>
        The workflow runs weekly or biweekly (odd ISO weeks are skipped for
        biweekly). It needs two repo secrets — <code>ANTHROPIC_API_KEY</code> and,
        if images are on, <code>GEMINI_API_KEY</code> — and the &quot;Allow GitHub
        Actions to create pull requests&quot; setting enabled. seo-aeo&apos;s setup
        handles both.
      </p>

      <h2>Merge = publish</h2>
      <p>
        Point the engine&apos;s config at the directory your blog renders from, so
        merging the PR publishes the article. The ranker dedupes against both
        published posts and existing drafts, so merging moves the next run to a
        fresh topic.
      </p>
    </>
  );
}
