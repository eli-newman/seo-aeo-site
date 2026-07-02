import type { Metadata } from "next";

import { site } from "@/lib/site";
import { CopyBlock } from "@/app/components/copy-block";
import { DocHead } from "../components/doc-head";

export const metadata: Metadata = {
  title: "Install",
  description:
    "Three ways to install seo-aeo: the Claude Code plugin, the skills/CLI, or the AGENTS.md playbook that any coding agent can follow.",
  alternates: { canonical: "/docs/install" },
};

export default function Page() {
  return (
    <>
      <DocHead
        title="Install"
        lead="Pick the front door that fits your agent. They all run the same workflow."
        href="/docs/install"
      />

      <h2>Option 1 — Clone + copy the skills (recommended)</h2>
      <p>
        The orchestrator <code>/seo-aeo</code> plus all seven task skills are
        plain markdown — nothing to build. Clone the repo and copy the{" "}
        <code>skills/</code> folder into <code>~/.claude/skills/</code>:
      </p>
      <CopyBlock lines={[...site.install.quickstart]} className="not-prose my-5" />
      <p>
        Prefer one line, no clone? <code>{site.install.skills}</code>. Then run{" "}
        <code>/seo-aeo</code> in your agent to start the guided setup.
      </p>

      <h2>Option 2 — Any agent, via AGENTS.md</h2>
      <p>
        Every coding agent — Cursor, Copilot, Windsurf, Aider, Claude Code —
        reads <code>AGENTS.md</code> at a repo root. seo-aeo ships one that
        states the mission, the safety contract, and points at the runbook. Just
        tell your agent:
      </p>
      <blockquote>
        &quot;Optimize my site for SEO and AEO — follow the seo-aeo playbook
        (github.com/{site.repoShort}). Do the keyless phases now and show me the
        report.&quot;
      </blockquote>

      <h2>The recurring engine (optional)</h2>
      <p>
        The article engine is an npm package the cron installs for you. To run
        it directly on an existing blog:
      </p>
      <CopyBlock
        lines={[site.install.engine, "npx seo-aeo init", "npx seo-aeo run --dry-run"]}
        className="not-prose my-5"
      />

      <h2>Requirements</h2>
      <ul>
        <li>Node.js 20+ and a git repo.</li>
        <li>
          The <code>gh</code> CLI (authenticated) for secrets, PRs, and the
          Actions setup.
        </li>
        <li>
          An <code>ANTHROPIC_API_KEY</code> — only for the article engine
          (Phases 0–2 need no keys).
        </li>
      </ul>
    </>
  );
}
