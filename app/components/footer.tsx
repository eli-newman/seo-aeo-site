import Link from "next/link";

import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-2 md:grid-cols-4">
        <div className="sm:col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 font-semibold">
            <span className="grid h-6 w-6 place-items-center rounded-md bg-accent-soft font-mono text-sm text-accent">
              ▲
            </span>
            {site.name}
          </div>
          <p className="mt-3 max-w-xs text-sm text-fg-muted">{site.tagline}</p>
        </div>
        <FooterCol
          title="Docs"
          links={[
            ["Quickstart", "/docs/quickstart"],
            ["Install", "/docs/install"],
            ["How it works", "/docs/how-it-works"],
            ["Config", "/docs/config"],
          ]}
        />
        <FooterCol
          title="Learn"
          links={[
            ["What is AEO/GEO", "/docs/aeo"],
            ["Skills", "/docs/skills"],
            ["FAQ", "/docs/faq"],
            ["Troubleshooting", "/docs/troubleshooting"],
          ]}
        />
        <div>
          <h3 className="text-sm font-medium text-fg">Project</h3>
          <ul className="mt-3 space-y-2 text-sm text-fg-muted">
            <li>
              <a href={site.repo} className="transition hover:text-fg">
                GitHub ↗
              </a>
            </li>
            <li>
              <a href={`${site.repo}/issues`} className="transition hover:text-fg">
                Issues ↗
              </a>
            </li>
            <li>
              <a href="/llms.txt" className="transition hover:text-fg">
                llms.txt
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-5 text-xs text-fg-faint">
          MIT licensed · Built by {site.author} · Optimized with seo-aeo itself.
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h3 className="text-sm font-medium text-fg">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm text-fg-muted">
        {links.map(([label, href]) => (
          <li key={href}>
            <Link href={href} className="transition hover:text-fg">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
