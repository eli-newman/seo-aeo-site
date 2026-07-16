import type { Metadata } from "next";
import Link from "next/link";

import { listPosts } from "@/lib/blog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog — SEO & AEO, written by the engine itself",
  description:
    "Articles on SEO, AEO, and getting cited by AI answer engines — every post on this blog is written and published by the seo-aeo engine running on its own site.",
  alternates: { canonical: `${site.url}/blog` },
};

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function BlogIndex() {
  const posts = await listPosts();
  return (
    <main className="mx-auto max-w-2xl px-5 py-14">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">
        Dogfood, visibly
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Blog</h1>
      <p className="mt-3 text-fg-muted">
        Every article below is written and published by the{" "}
        <a
          href={site.repo}
          className="text-accent underline decoration-accent/40 hover:decoration-accent"
        >
          seo-aeo engine
        </a>{" "}
        running on this very site — the tool optimizing its own home. Merge
        history is the receipt.
      </p>
      <ul className="mt-10 space-y-8">
        {posts.map((p) => (
          <li key={p.slug} className="group">
            <Link href={`/blog/${p.slug}`} className="block">
              <p className="font-mono text-xs text-fg-faint">
                {formatDate(p.frontmatter.date)}
              </p>
              <h2 className="mt-1 text-xl font-semibold tracking-tight text-fg transition group-hover:text-accent">
                {p.frontmatter.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                {p.frontmatter.description}
              </p>
            </Link>
          </li>
        ))}
        {posts.length === 0 && (
          <li className="text-fg-muted">
            First engine-written article incoming — watch{" "}
            <a href={`${site.repo}/pulls`} className="text-accent underline">
              the PRs
            </a>
            .
          </li>
        )}
      </ul>
    </main>
  );
}
