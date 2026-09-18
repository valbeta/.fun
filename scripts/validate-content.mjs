import fs from "node:fs";
import path from "node:path";

const root = path.join(process.cwd(), "content");
const sections = ["ideas", "explore", "observe"];
const required = ["title", "description", "date", "status"];
const slugs = new Set<string>();

for (const type of sections) {
  const dir = path.join(root, type);
  if (!fs.existsSync(dir)) throw new Error(`Missing content directory: ${dir}`);
  for (const file of fs.readdirSync(dir).filter(file => file.endsWith(".md"))) {
    const key = `${type}/${file.replace(/\.md$/, "")}`;
    if (slugs.has(key)) throw new Error(`Duplicate content slug: ${key}`);
    slugs.add(key);
    const source = fs.readFileSync(path.join(dir, file), "utf8");
    const match = source.match(/^---\s*\n([\s\S]*?)\n---/);
    if (!match) throw new Error(`${key}: missing frontmatter`);
    const fields = new Map(match[1].split("\n").map(line => { const i = line.indexOf(":"); return i < 0 ? ["", ""] : [line.slice(0, i).trim(), line.slice(i + 1).trim().replace(/^['"]|['"]$/g, "")]; }));
    for (const field of required) if (!fields.get(field)) throw new Error(`${key}: missing ${field}`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(fields.get("date")!)) throw new Error(`${key}: date must be YYYY-MM-DD`);
    if (!["draft", "published"].includes(fields.get("status")!)) throw new Error(`${key}: status must be draft or published`);
    if (Number.isNaN(Date.parse(`${fields.get("date")}T00:00:00Z`))) throw new Error(`${key}: invalid date`);
  }
}
console.log(`Content validation passed: ${slugs.size} file(s).`);
