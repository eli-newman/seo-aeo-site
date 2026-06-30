import type { Metadata } from "next";

import { DocHead } from "../components/doc-head";

export const metadata: Metadata = {
  title: "Troubleshooting",
  description:
    "Fixes for the common seo-aeo gotchas: Actions can't open PRs, the cron repeats a topic, articles don't appear on the blog, and key errors.",
  alternates: { canonical: "/docs/troubleshooting" },
};

export default function Page() {
  return (
    <>
      <DocHead
        title="Troubleshooting"
        lead="The real gotchas — most of these were found by dogfooding the tool on a live site, and the setup now handles them for you."
        href="/docs/troubleshooting"
      />

      <h2>The cron ran but no PR opened</h2>
      <p>
        The Actions log says <code>gh pr create failed: not permitted to create
        or approve pull requests</code>. GitHub disables this by default. Enable
        it in <strong>Settings → Actions → General → Workflow permissions →
        &quot;Allow GitHub Actions to create and approve pull requests&quot;</strong>,
        or via the API:
      </p>
      <pre>
        <code>{`gh api -X PUT repos/<owner>/<repo>/actions/permissions/workflow \\
  -F default_workflow_permissions=write \\
  -F can_approve_pull_request_reviews=true`}</code>
      </pre>

      <h2>It keeps writing about the same topic</h2>
      <p>
        The ranker dedupes against your posts and drafts directories. If runs
        repeat a topic, you haven&apos;t merged the previous PR yet — merge it and
        the next run moves to a fresh topic. Make sure <code>draftsPath</code>
        points where the engine actually writes.
      </p>

      <h2>The article merged but isn&apos;t on my blog</h2>
      <p>
        Your blog probably renders from a different directory than the engine
        writes to (e.g. it reads <code>content/posts</code> but the engine writes
        <code>content/drafts</code>). Set <code>layout.draftsPath</code> to the
        directory your blog renders from, so merge = publish. Also confirm your
        blog route is committed to the branch your host deploys from.
      </p>

      <h2>&quot;ANTHROPIC_API_KEY is not set&quot;</h2>
      <p>
        Put your key in <code>~/.seo-aeo.env</code> as{" "}
        <code>ANTHROPIC_API_KEY=sk-ant-…</code> (the CLI auto-loads it), or export
        it in your shell. For the cron, set it as a repo secret with{" "}
        <code>gh secret set ANTHROPIC_API_KEY -R &lt;owner/repo&gt;</code>.
      </p>

      <h2>My /blog redirects to login</h2>
      <p>
        Auth-gated content is invisible to Google and AI crawlers — it defeats
        the whole point. Make <code>/blog</code> and <code>/blog/*</code> public
        in your middleware. seo-aeo&apos;s discover phase flags this explicitly.
      </p>

      <h2>Lighthouse won&apos;t run</h2>
      <p>
        Live measurement needs a free Chrome instance or a PageSpeed Insights API
        key. If neither is available, seo-aeo does the code-level audit and marks
        live performance as PENDING rather than fabricating a score.
      </p>
    </>
  );
}
