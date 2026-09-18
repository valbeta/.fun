import fs from "node:fs";
import path from "node:path";
import type { ContentEntry, ContentType, Frontmatter } from "./types";

const root = path.join(process.cwd(), "content");
function parse(source: string, file: string): { data: Frontmatter; body: string } {
  const match = source.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!match) throw new Error(`${file}: missing frontmatter`);
  const data: Record<string, unknown> = {};
  for (const line of match[1].split("\n")) { const i = line.indexOf(":"); if (i < 0) continue; const key=line.slice(0,i).trim(); const value=line.slice(i+1).trim(); data[key] = value.startsWith("[") ? value.slice(1,-1).split(",").map(v=>v.trim()).filter(Boolean) : value.replace(/^['"]|['"]$/g, ""); }
  return { data: data as Frontmatter, body: match[2] };
}
export function getEntries(type: ContentType): ContentEntry[] { const dir=path.join(root,type); if(!fs.existsSync(dir)) return []; return fs.readdirSync(dir).filter(f=>f.endsWith(".md")).map(file=>{ const slug=file.replace(/\.md$/,""); const parsed=parse(fs.readFileSync(path.join(dir,file),"utf8"),path.join(type,file)); return { ...parsed.data, slug, type, body:parsed.body, tags:parsed.data.tags || [] }; }).filter(e=>e.status === "published").sort((a,b)=>b.date.localeCompare(a.date)); }
export function getEntry(type: ContentType, slug: string) { return getEntries(type).find(e=>e.slug === slug); }
export function getAllEntries() { return (["ideas","explore","observe"] as ContentType[]).flatMap(getEntries).sort((a,b)=>b.date.localeCompare(a.date)); }
