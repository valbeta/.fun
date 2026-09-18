import type { MetadataRoute } from "next";

export const dynamic = "force-static";

// Keep crawler policy minimal because the site has no private runtime routes.
export default function robots(): MetadataRoute.Robots { const base=process.env.NEXT_PUBLIC_SITE_URL || "https://valbeta.fun"; return {rules:{userAgent:"*",allow:"/"},sitemap:`${base}/sitemap.xml`}; }
