import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap { const base=process.env.NEXT_PUBLIC_SITE_URL || "https://valbeta.fun"; return ["","ideas","explore","observe","about"].map(path=>({url:`${base}/${path}`,lastModified:new Date("2026-09-18")})); }
