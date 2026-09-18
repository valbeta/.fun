import fs from "node:fs";
import path from "node:path";

const root = path.join(process.cwd(), "out");

// These routes represent the minimum public surface that must survive a static export.
const requiredFiles = [
  "index.html",
  "404.html",
  "about/index.html",
  "ideas/index.html",
  "ideas/new-loop-theory/index.html",
  "explore/index.html",
  "explore/4q2i/index.html",
  "observe/index.html",
  "observe/ai-changes-loops/index.html",
  "robots.txt",
  "sitemap.xml",
];

if (!fs.existsSync(root)) throw new Error("Missing out directory. Run next build first.");

// Check both route presence and non-empty output before deployment can proceed.
for (const relativeFile of requiredFiles) {
  const file = path.join(root, relativeFile);
  if (!fs.existsSync(file)) throw new Error(`Missing exported route: ${relativeFile}`);
  if (fs.statSync(file).size === 0) throw new Error(`Empty exported file: ${relativeFile}`);
}

// A minimal document check catches an accidentally empty or malformed homepage export.
const homepage = fs.readFileSync(path.join(root, "index.html"), "utf8");
if (!homepage.includes("<html")) throw new Error("Homepage export does not contain an HTML document.");

const codeArticle = fs.readFileSync(path.join(root, "explore", "4q2i", "index.html"), "utf8");
if (!codeArticle.includes('data-language="ts"') || !codeArticle.includes("data-line")) throw new Error("Code highlighting markers are missing from the 4Q2I export.");

console.log(`Static export validation passed: ${requiredFiles.length} required files checked.`);
