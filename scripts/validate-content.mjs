import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = path.join(process.cwd(), "content");
const sections = ["ideas", "explore", "observe"];
const required = ["title", "description", "date", "status"];
const slugs = new Set();

// Validate every publishing stream before Next.js reads any content during the build.
for (const type of sections) {
  const dir = path.join(root, type);
  if (!fs.existsSync(dir)) throw new Error(`Missing content directory: ${dir}`);
  for (const file of fs.readdirSync(dir).filter(file => file.endsWith(".mdx") || file.endsWith(".md"))) {
    const key = `${type}/${file.replace(/\.(mdx|md)$/, "")}`;
    if (slugs.has(key)) throw new Error(`Duplicate content slug: ${key}`);
    slugs.add(key);
    const source = fs.readFileSync(path.join(dir, file), "utf8");
    let data;
    // gray-matter gives MD and MDX the same YAML parsing behavior.
    try {
      data = matter(source).data;
    } catch (error) {
      throw new Error(`${key}: invalid frontmatter (${error.message})`);
    }
    for (const field of required) if (typeof data[field] !== "string" || !data[field].trim()) throw new Error(`${key}: missing ${field}`);
    for (const field of ["date", "updated"]) if (data[field] && (!/^\d{4}-\d{2}-\d{2}$/.test(data[field]) || Number.isNaN(Date.parse(`${data[field]}T00:00:00Z`)))) throw new Error(`${key}: ${field} must be a valid YYYY-MM-DD date`);
    if (!["draft", "published"].includes(data.status)) throw new Error(`${key}: status must be draft or published`);
    if (data.tags !== undefined && (!Array.isArray(data.tags) || data.tags.some(tag => typeof tag !== "string" || !tag.trim()))) throw new Error(`${key}: tags must be a list of non-empty strings`);
  }
}
console.log(`Content validation passed: ${slugs.size} file(s).`);
