import type { MetadataRoute } from "next";
import { getAllEntries } from "@/lib/content/source";

export const dynamic = "force-static";

// The sitemap is generated from the same published entries used by the content pages.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://valbeta.fun";
  const pages = ["", "ideas", "explore", "observe", "about"].map(path => ({ url: `${base}/${path}`, lastModified: new Date("2026-09-18") }));
  const entries = getAllEntries().map(entry => ({ url: `${base}/${entry.type}/${entry.slug}`, lastModified: new Date(entry.updated || entry.date) }));
  return [...pages, ...entries];
}
