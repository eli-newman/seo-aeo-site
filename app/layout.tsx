import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { site } from "@/lib/site";
import { organizationJsonLd, softwareApplicationJsonLd } from "@/lib/jsonld";
import { Nav } from "./components/nav";
import { Footer } from "./components/footer";
import { JsonLd } from "./components/json-ld";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "AEO",
    "GEO",
    "answer engine optimization",
    "generative engine optimization",
    "SEO",
    "AI search",
    "ChatGPT citation",
    "Perplexity",
    "structured data",
    "llms.txt",
    "content engine",
  ],
  authors: [{ name: site.author }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <JsonLd data={[organizationJsonLd(), softwareApplicationJsonLd()]} />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
