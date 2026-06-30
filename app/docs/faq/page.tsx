import type { Metadata } from "next";

import { faqPageJsonLd } from "@/lib/jsonld";
import { JsonLd } from "@/app/components/json-ld";
import { DocHead } from "../components/doc-head";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about seo-aeo: cost, supported stacks, safety, how AEO works, and what's out of scope.",
  alternates: { canonical: "/docs/faq" },
};

const faqs = [
  {
    q: "Is seo-aeo free?",
    a: "Yes. seo-aeo is open source under the MIT license. The only cost is your own Anthropic API usage when the article engine generates content — and the on-site optimization phases need no API keys at all.",
  },
  {
    q: "What stacks does it support?",
    a: "On-site SEO/AEO optimization works on any stack — it's just metadata, robots, sitemap, and structured data. The recurring article engine needs an MDX-in-git blog; Next.js and Astro have ready recipes, and other MDX setups adapt the Next recipe. WordPress, Ghost, and non-GitHub hosts get the on-site optimization but not the auto-article engine yet.",
  },
  {
    q: "Will it touch my code without permission?",
    a: "No. seo-aeo works on a branch, never commits to your default branch, and never auto-pushes. It stops if your working tree is dirty, previews generative changes first, and only touches SEO/AEO-relevant files.",
  },
  {
    q: "What's the difference between SEO and AEO?",
    a: "SEO gets you ranked in Google's blue links. AEO (Answer Engine Optimization, also called GEO) gets your page cited inside AI answers from ChatGPT, Perplexity, Gemini, and Google AI Overviews. They need different things, and seo-aeo does both.",
  },
  {
    q: "Does it guarantee I'll be cited by ChatGPT?",
    a: "No tool can guarantee AI citation — it's probabilistic. seo-aeo makes your pages the easiest, clearest, best-structured thing to quote on your topic, and publishes consistently. That's the winnable game; the off-page authority half (mentions and links across the web) is slower and partly manual.",
  },
  {
    q: "How much of my time does setup take?",
    a: "Under 10 minutes of hands-on time. The orchestrator front-loads every decision up front, then runs the rest of the phases on its own.",
  },
  {
    q: "Can I use it without Claude Code?",
    a: "Yes. Every coding agent reads the AGENTS.md the repo ships, which states the mission, the safety contract, and the runbook. Claude Code additionally gets the plugin and the /seo-aeo skill.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={faqPageJsonLd(faqs)} />
      <DocHead
        title="FAQ"
        lead="Quick answers to the most common questions."
        href="/docs/faq"
      />
      {faqs.map((f) => (
        <div key={f.q}>
          <h2>{f.q}</h2>
          <p>{f.a}</p>
        </div>
      ))}
    </>
  );
}
