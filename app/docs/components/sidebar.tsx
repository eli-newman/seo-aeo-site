"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { docsNav } from "@/lib/site";

export function Sidebar() {
  const pathname = usePathname();
  return (
    <nav className="space-y-7 text-sm">
      {docsNav.map((group) => (
        <div key={group.title}>
          <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-fg-faint">
            {group.title}
          </div>
          <ul className="space-y-0.5">
            {group.items.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-md px-2 py-1.5 transition ${
                      active
                        ? "bg-accent-soft font-medium text-accent"
                        : "text-fg-muted hover:bg-panel hover:text-fg"
                    }`}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
