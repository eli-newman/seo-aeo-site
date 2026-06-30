import { site } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { JsonLd } from "@/app/components/json-ld";

/** Consistent doc-page title + lead, plus BreadcrumbList JSON-LD. */
export function DocHead({
  title,
  lead,
  href,
}: {
  title: string;
  lead: string;
  href: string;
}) {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Docs", url: `${site.url}/docs` },
          { name: title, url: `${site.url}${href}` },
        ])}
      />
      <h1 className="text-3xl font-semibold tracking-tight text-fg">{title}</h1>
      <p className="lead mt-3 text-lg text-fg-muted">{lead}</p>
    </>
  );
}
