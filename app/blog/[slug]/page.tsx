import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

import { JsonLd } from "@/app/components/json-ld";
import { getPost, listPosts } from "@/lib/blog";
import { site } from "@/lib/site";

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await listPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  const url = `${site.url}/blog/${slug}`;
  const { frontmatter: fm } = post;
  return {
    title: fm.title,
    description: fm.description,
    keywords: fm.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: fm.title,
      description: fm.description,
      url,
      publishedTime: fm.date,
      authors: [fm.author],
      images: fm.image ? [new URL(fm.image, site.url).toString()] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: fm.title,
      description: fm.description,
    },
  };
}

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post || post.frontmatter.draft) notFound();
  const { frontmatter: fm, body } = post;
  const url = `${site.url}/blog/${slug}`;

  const jsonLd: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: fm.title,
      description: fm.description,
      url,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      datePublished: fm.date,
      dateModified: fm.date,
      author: { "@type": "Person", name: fm.author },
      publisher: { "@type": "Organization", name: site.name, url: site.url },
      ...(fm.image ? { image: new URL(fm.image, site.url).toString() } : {}),
    },
  ];
  if (fm.faqs.length >= 2) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: fm.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  return (
    <main className="mx-auto max-w-2xl px-5 py-14">
      <JsonLd data={jsonLd} />
      <p className="font-mono text-xs text-fg-faint">
        {formatDate(fm.date)} · {fm.author} ·{" "}
        <Link href="/blog" className="text-accent hover:underline">
          All posts
        </Link>
      </p>
      <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-fg">
        {fm.title}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-fg-muted">
        {fm.description}
      </p>
      {fm.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={fm.image} alt={fm.title} className="mt-8 rounded-lg border border-border" />
      )}
      <article className="prose mt-10">
        <MDXRemote
          source={body}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                rehypeSlug,
                [rehypeAutolinkHeadings, { behavior: "wrap" }],
              ],
            },
          }}
        />
      </article>

      <hr className="my-12 border-border" />
      <div className="rounded-xl border border-border bg-panel p-6">
        <p className="text-sm font-semibold text-fg">
          This article was written by the open-source engine it describes.
        </p>
        <p className="mt-1 text-sm text-fg-muted">
          seo-aeo optimized this site, then started publishing articles like
          this one as pull requests — automatically, every 1-2 weeks. Run it
          on your site too.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={site.repo}
            className="rounded-md bg-accent-soft px-4 py-2 text-sm font-medium text-accent transition hover:brightness-110"
          >
            Star it on GitHub ↗
          </a>
          <Link
            href="/docs/quickstart"
            className="rounded-md border border-border px-4 py-2 text-sm text-fg transition hover:border-border-strong"
          >
            Quickstart
          </Link>
        </div>
      </div>
    </main>
  );
}
