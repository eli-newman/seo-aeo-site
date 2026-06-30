import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

/**
 * Allow the CITATION crawlers (search/retrieval/user-fetch) — these drive AI
 * citation, distinct from training bots. We dogfood our own checklist here.
 */
const CITATION_BOTS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Googlebot",
  "Bingbot",
  "Applebot",
  "DuckAssistBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...CITATION_BOTS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
