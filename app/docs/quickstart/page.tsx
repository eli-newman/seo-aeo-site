import type { Metadata } from "next";

import { site } from "@/lib/site";
import { howToJsonLd } from "@/lib/jsonld";
import { CopyBlock } from "@/app/components/copy-block";
import { JsonLd } from "@/app/components/json-ld";
import { DocHead } from "../components/doc-head";

export const metadata: Metadata = {
  title: "Quickstart",
  description:
    "Install seo-aeo and optimize your site in under 10 minutes. Two commands to install the Claude Code plugin, one to run the guided setup.",
  alternates: { canonical: "/docs/quickstart" },
};

const steps = [
  { name: "Install the plugin", text: "In Claude Code, add the marketplace and install the seo-aeo plugin." },
  { name: "Run the orchestrator", text: "Run /seo-aeo and answer the upfront questions (repo, site URL, automation)." },
  { name: "Let it run the phases", text: "The agent runs discover, measure, on-site fix, blog, engine, and verify — gated." },
  { name: "Merge the article PR", text: "From then on, a fresh optimized article PR arrives every 1-2 weeks." },
];

export default function Page() {
  return (
    <>
      <JsonLd data={howToJsonLd("Set up seo-aeo on your site", steps)} />
      <DocHead
        title="Quickstart"
        lead="Go from zero to an SEO + AEO optimized site — and an autonomous article pipeline — in under 10 minutes of hands-on time."
        href="/docs/quickstart"
      />

      <h2>1. Install (Claude Code)</h2>
      <p>
        The fastest path is the Claude Code plugin. Two commands to install, one
        to run:
      </p>
      <CopyBlock label="Claude Code" lines={[...site.install.plugin]} className="not-prose my-5" />
      <p>
        Don&apos;t use Claude Code? See <a href="/docs/install">all install
        methods</a> — every coding agent can run it via the repo&apos;s{" "}
        <code>AGENTS.md</code>.
      </p>

      <h2>2. What it asks you (up front)</h2>
      <p>
        <code>/seo-aeo</code> front-loads every decision so the rest runs
        unattended. You&apos;ll be asked for:
      </p>
      <ul>
        <li>Your repo and production site URL.</li>
        <li>
          Whether you want automatic articles — and if so, an{" "}
          <code>ANTHROPIC_API_KEY</code> (kept out of the chat, in{" "}
          <code>~/.seo-aeo.env</code>) and a cadence.
        </li>
        <li>One sentence on what your site does, its audience, and tone.</li>
      </ul>

      <h2>3. What it does</h2>
      <p>
        It runs eight gated phases — discover, measure, on-site fix, build a blog
        if you need one, wire the engine, and verify a real article goes live.
        Every change is on a branch; nothing is pushed without you. See{" "}
        <a href="/docs/how-it-works">how it works</a> for the full flow.
      </p>

      <h2>4. Then it&apos;s automatic</h2>
      <p>
        If you enabled automation, a GitHub Actions cron writes one optimized,
        audit-passing article every 1–2 weeks and opens a pull request. Review
        it, merge it, done. To pause, disable the workflow.
      </p>

      <blockquote>
        No blog yet? That&apos;s fine — seo-aeo scaffolds one for your stack
        (Next.js or Astro) before wiring up the engine.
      </blockquote>
    </>
  );
}
