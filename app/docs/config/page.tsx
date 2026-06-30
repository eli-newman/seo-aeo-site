import type { Metadata } from "next";

import { DocHead } from "../components/doc-head";

export const metadata: Metadata = {
  title: "Config",
  description:
    "Reference for seo-aeo.config.json and the .seo-aeo/ files: layout paths, ICP, LLM models, images, audit thresholds, cadence, and sameAs.",
  alternates: { canonical: "/docs/config" },
};

export default function Page() {
  return (
    <>
      <DocHead
        title="Configuration"
        lead="The engine reads one config file plus an editable .seo-aeo/ folder. init writes them; tune them anytime."
        href="/docs/config"
      />

      <h2>seo-aeo.config.json</h2>
      <pre>
        <code>{`{
  "name": "Your Site",
  "siteUrl": "https://yoursite.com",
  "author": "You",
  "layout": {
    "framework": "next",
    "draftsPath": "content/posts",   // write where the blog renders → merge = publish
    "postsPath": "content/posts",
    "publicPath": "public",
    "publicUrlBase": "/blog"
  },
  "article": {
    "targetWordCount": 1500,
    "minWordCount": 1100,
    "maxWordCount": 2000,
    "internalLinkTargets": [{ "url": "/", "anchor": "Your Site" }]
  },
  "icp": { "primaryRoles": ["…"], "companySize": "…", "pain": "…" },
  "images": { "enabled": false, "inlineCount": 1 },
  "audit": { "seoMinScore": 80, "aeoMinScore": 75 },
  "cadence": { "frequency": "biweekly", "cron": "0 14 * * 1" },
  "sameAs": ["https://x.com/you", "https://www.producthunt.com/products/you"]
}`}</code>
      </pre>

      <h2>The .seo-aeo/ folder</h2>
      <ul>
        <li><code>keywords.json</code> — your long-tail keyword bank (intent, volume, difficulty, notes). Refine with real Search Console data over time.</li>
        <li><code>voice.md</code> — the brand voice every article matches. Edit freely.</li>
        <li><code>feeds.json</code> — optional RSS sources to ride trending topics.</li>
      </ul>

      <h2>Key fields</h2>
      <ul>
        <li><strong>layout</strong> — where articles are written and served. Set <code>draftsPath</code> to your rendered posts dir so merging a PR publishes.</li>
        <li><strong>sameAs</strong> — your profile/listing URLs (X, LinkedIn, ProductHunt, G2). Emitted as schema.org <code>sameAs</code> so answer engines resolve your brand to one trusted entity.</li>
        <li><strong>images</strong> — toggle AI image generation (needs <code>GEMINI_API_KEY</code>).</li>
        <li><strong>cadence</strong> — <code>weekly</code> or <code>biweekly</code>.</li>
      </ul>
    </>
  );
}
