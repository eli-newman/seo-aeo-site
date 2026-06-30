import type { Metadata } from "next";

import { DocHead } from "../components/doc-head";

export const metadata: Metadata = {
  title: "What is AEO / GEO",
  description:
    "Answer Engine Optimization (AEO), a.k.a. Generative Engine Optimization (GEO), is getting your page cited by AI answer engines. Here's how it works and how to win.",
  alternates: { canonical: "/docs/aeo" },
};

export default function Page() {
  return (
    <>
      <DocHead
        title="What is AEO / GEO?"
        lead="Answer Engine Optimization (AEO) — also called Generative Engine Optimization (GEO) — is getting your page cited by AI answer engines like ChatGPT, Perplexity, Gemini, and Google AI Overviews."
        href="/docs/aeo"
      />

      <h2>AEO vs SEO, in one line</h2>
      <p>
        SEO optimizes for a ranking algorithm that lists blue links. AEO
        optimizes for an LLM that reads, extracts, and quotes. The same page can
        rank #1 in Google and never get cited by ChatGPT — because citation is a
        different game with different rules.
      </p>

      <h2>How an answer engine actually picks a source</h2>
      <p>It comes down to two jobs.</p>

      <h3>Job 1 — Get ingested (the plumbing)</h3>
      <ul>
        <li><strong>Allow the citation crawlers</strong> in robots.txt — the search/retrieval bots (OAI-SearchBot, Claude-SearchBot, PerplexityBot, Googlebot, Bingbot, Applebot), which are different from training bots (GPTBot, ClaudeBot). Blocking them is the #1 mistake, usually accidental.</li>
        <li><strong>Server-render your content.</strong> As of 2026, no major AI crawler executes JavaScript — content that only appears after client-side JS is invisible to them.</li>
        <li><strong>Don&apos;t hide answers</strong> behind tabs, accordions, or login.</li>
      </ul>

      <h3>Job 2 — Be the most quotable source (the content)</h3>
      <p>
        LLMs don&apos;t quote pages — they quote <strong>passages</strong>. They
        chunk your page, score each chunk, and lift the strongest self-contained
        one. So:
      </p>
      <ul>
        <li><strong>Lead each key question with a ~40–75 word direct answer.</strong> Passages in that range are cited roughly 3× more than longer ones.</li>
        <li><strong>Make each section self-contained</strong> — restate the subject, no &quot;as mentioned above.&quot;</li>
        <li><strong>Add the citation drivers:</strong> inline source citations, real statistics, and attributable quotations measurably raise citation rates.</li>
        <li><strong>Use JSON-LD</strong> — FAQPage and Article especially. Pages with FAQPage schema are cited far more often.</li>
        <li><strong>Never keyword-stuff</strong> — in generative engines it scores worse than baseline.</li>
      </ul>

      <h2>The honest part: the off-page half</h2>
      <p>
        On-page AEO is the half you fully control, and seo-aeo nails it. But
        citation is also driven by <strong>off-page authority</strong> — whether
        the engine has &quot;learned&quot; to trust your brand from mentions and
        links across the web (reviews, Reddit, comparison articles). That half is
        slow, partly manual, and can&apos;t be faked. We make you maximally
        citable and crawlable — the necessary condition — and tell you the truth
        about the rest.
      </p>

      <h2>The myths we&apos;ll save you from</h2>
      <ul>
        <li><strong>&quot;Block Google-Extended to control AI.&quot;</strong> It&apos;s a training opt-out token, not a crawler — blocking it does not remove you from AI Overviews. Never block Googlebot.</li>
        <li><strong>&quot;llms.txt is essential AEO.&quot;</strong> It&apos;s low-yield — no major engine reliably fetches it and studies show no measurable citation lift. Add it if cheap; don&apos;t rely on it.</li>
        <li><strong>&quot;Allow GPTBot for citations.&quot;</strong> GPTBot is a training bot. The citation-relevant one is OAI-SearchBot.</li>
      </ul>

      <p>
        seo-aeo bakes every one of these into the on-site checklist and the
        article generator, so your pages and your articles are built to be
        quoted — not just ranked.
      </p>
    </>
  );
}
