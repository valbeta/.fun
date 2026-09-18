import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { ContentEntry, ContentType, Frontmatter } from "./types";

const root = path.join(process.cwd(), "content");

// Keep frontmatter parsing in one place so routes and validation share the same content shape.
function parse(source: string, file: string): { data: Frontmatter; body: string } {
  const parsed = matter(source);
  if (!Object.keys(parsed.data).length) throw new Error(`${file}: missing frontmatter`);
  return { data: parsed.data as Frontmatter, body: parsed.content };
}

// Published entries are the only documents exposed to the static site; drafts remain local.
export function getEntries(type: ContentType): ContentEntry[] { const dir=path.join(root,type); if(!fs.existsSync(dir)) return []; return fs.readdirSync(dir).filter(f=>f.endsWith(".mdx") || f.endsWith(".md")).map(file=>{ const slug=file.replace(/\.(mdx|md)$/," ").trim(); const parsed=parse(fs.readFileSync(path.join(dir,file),"utf8"),path.join(type,file)); return { ...parsed.data, slug, type, body:parsed.body, tags:parsed.data.tags || [] }; }).filter(e=>e.status === "published").sort((a,b)=>b.date.localeCompare(a.date)); }

// These small helpers keep collection pages, metadata, and the homepage on one source of truth.
export function getEntry(type: ContentType, slug: string) { return getEntries(type).find(e=>e.slug === slug); }
export function getAllEntries() { return (["ideas","explore","observe"] as ContentType[]).flatMap(getEntries).sort((a,b)=>b.date.localeCompare(a.date)); }
