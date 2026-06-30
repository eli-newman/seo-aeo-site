import type { MetadataRoute } from "next";

import { site } from "@/lib/site";
import { docsNav } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const docPaths = docsNav.flatMap((g) => g.items.map((i) => i.href));
  return [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/docs`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...docPaths.map((path) => ({
      url: `${site.url}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
