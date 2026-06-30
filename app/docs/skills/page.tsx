import type { Metadata } from "next";

import { DocHead } from "../components/doc-head";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Reference for the seo-aeo skill suite: the /seo-aeo orchestrator plus seven standalone task skills you can run à la carte.",
  alternates: { canonical: "/docs/skills" },
};

const skills = [
  ["seo-aeo", "Orchestrator. Runs all phases in order with gates and checkpoints; resumable; front-loads inputs."],
  ["seo-aeo-preflight", "Checks the environment and gathers keys + decisions up front."],
  ["seo-aeo-discover", "Maps the stack, finds the blog, checks crawlability, inventories existing SEO."],
  ["seo-aeo-measure", "Lighthouse + Core Web Vitals, with PageSpeed/CLI fallbacks; marks perf PENDING if it can't measure."],
  ["seo-aeo-onsite", "Fixes on-page SEO + AEO: metadata, robots, sitemap, llms.txt, JSON-LD, crawler rules."],
  ["seo-aeo-blog", "Builds a blog if one is missing, tailored to the stack, and ensures it's public + crawlable."],
  ["seo-aeo-engine", "Installs and wires the recurring article engine: cron, secret, PR permission."],
  ["seo-aeo-verify", "Triggers a run, confirms a PR opens, confirms the article is live and crawlable."],
];

export default function Page() {
  return (
    <>
      <DocHead
        title="Skills"
        lead="Eight Claude Code skills: one orchestrator and seven focused task skills. Each is standalone — run the whole flow or just one step."
        href="/docs/skills"
      />

      <h2>The suite</h2>
      <table>
        <thead>
          <tr>
            <th>Skill</th>
            <th>What it does</th>
          </tr>
        </thead>
        <tbody>
          {skills.map(([name, body]) => (
            <tr key={name}>
              <td className="whitespace-nowrap font-mono text-xs text-accent">{name}</td>
              <td>{body}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Running one skill à la carte</h2>
      <p>
        Each task skill works on its own. Want just a Lighthouse + Core Web
        Vitals read? Run <code>/seo-aeo-measure</code>. Just the on-site fix?{" "}
        <code>/seo-aeo-onsite</code>. The orchestrator simply chains them with
        gates and a &quot;Next →&quot; pointer at the end of each.
      </p>

      <h2>Why a suite, not one mega-skill</h2>
      <p>
        Splitting the work keeps each skill small (under 100 lines), reliable,
        and reusable. Each skill bundles only the reference it needs (the
        on-site checklist, the blog recipes, the measurement guide), so it stays
        self-contained when installed.
      </p>
    </>
  );
}
