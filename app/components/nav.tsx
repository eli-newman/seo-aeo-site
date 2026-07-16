import Link from "next/link";

import { site } from "@/lib/site";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="grid h-6 w-6 place-items-center rounded-md bg-accent-soft font-mono text-sm text-accent">
            ▲
          </span>
          <span className="tracking-tight">{site.name}</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <Link
            href="/docs/quickstart"
            className="rounded-md px-3 py-1.5 text-fg-muted transition hover:text-fg"
          >
            Docs
          </Link>
          <Link
            href="/docs/aeo"
            className="rounded-md px-3 py-1.5 text-fg-muted transition hover:text-fg"
          >
            What is AEO
          </Link>
          <Link
            href="/blog"
            className="rounded-md px-3 py-1.5 text-fg-muted transition hover:text-fg"
          >
            Blog
          </Link>
          <a
            href={site.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 rounded-md border border-border px-3 py-1.5 text-fg transition hover:border-border-strong"
          >
            GitHub ↗
          </a>
        </nav>
      </div>
    </header>
  );
}
