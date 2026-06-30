/** Single source of truth for site-wide constants. */
export const site = {
  name: "seo-aeo",
  title: "seo-aeo — rank in Google AND get cited by AI",
  tagline: "Rank in Google. Get cited by AI.",
  description:
    "An open-source engine + agent skills that make any site rank in Google AND get cited by AI answer engines (ChatGPT, Perplexity, Gemini), then auto-publish an optimized article every 1-2 weeks.",
  url: "https://seo-aeo.dev",
  repo: "https://github.com/eli-newman/seo-aeo",
  repoShort: "eli-newman/seo-aeo",
  author: "Eli Newman",
  install: {
    plugin: [
      "/plugin marketplace add eli-newman/seo-aeo",
      "/plugin install seo-aeo@seo-aeo-tools",
      "/seo-aeo",
    ],
    skills: "npx -y github:eli-newman/seo-aeo install-skills",
    engine: "npm install -D github:eli-newman/seo-aeo",
  },
} as const;

export const docsNav: { title: string; items: { title: string; href: string }[] }[] = [
  {
    title: "Getting started",
    items: [
      { title: "Quickstart", href: "/docs/quickstart" },
      { title: "Install", href: "/docs/install" },
      { title: "How it works", href: "/docs/how-it-works" },
    ],
  },
  {
    title: "Reference",
    items: [
      { title: "Skills", href: "/docs/skills" },
      { title: "Article engine", href: "/docs/engine" },
      { title: "Config", href: "/docs/config" },
    ],
  },
  {
    title: "Concepts",
    items: [
      { title: "What is AEO / GEO", href: "/docs/aeo" },
      { title: "FAQ", href: "/docs/faq" },
      { title: "Troubleshooting", href: "/docs/troubleshooting" },
    ],
  },
];
