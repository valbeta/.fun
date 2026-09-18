import Link from "next/link";
import { getAllEntries } from "@/lib/content/source";

const tickerItems = [
	"a3f9c2e · new-loop-theory: redefine old-loop decay",
	"7d21b4a · 4q2i: add consumer-ai case study",
	"release · 4q2i framework v2.0 is public",
	"status: 2 building · 1 researching · 1 archived",
];

type Freshness = "fresh" | "recent" | "stale";
type MapNode = { angle: number; chinese: string; name: string; tag: string };

const mapNodes: MapNode[] = [
	{ angle: -90, chinese: "降维创新理论", name: "THE NEW LOOP THEORY", tag: "the new loop theory" },
	{ angle: -18, chinese: "创新四问模型", name: "4Q2I INNOVATION FRAMEWORK", tag: "4q2i innovation framework" },
	{ angle: 54, chinese: "AI 增强的产品管理", name: "AI-AUGMENTED PRODUCT", tag: "ai-augmented product" },
	{ angle: 126, chinese: "系统化产品思维", name: "SYSTEMATIC PRODUCT THINKING", tag: "systematic product thinking" },
	{ angle: 198, chinese: "游戏化机制研究", name: "GAMIFICATION", tag: "gamification" },
];

function freshness(date?: string): Freshness {
	if (!date) return "stale";
	const ageInDays = Math.max(0, (Date.now() - Date.parse(`${date}T00:00:00Z`)) / 86400000);
	return ageInDays <= 7 ? "fresh" : ageInDays <= 30 ? "recent" : "stale";
}

function freshnessLabel(state: Freshness) {
	return state === "fresh" ? "updated within 7 days" : state === "recent" ? "updated within 30 days" : "not updated within 30 days";
}

function latestTaggedEntry(entries: ReturnType<typeof getAllEntries>, tag: string) {
	return entries.filter(entry => entry.tags.some(entryTag => entryTag.trim().toLowerCase() === tag)).sort((a, b) => (b.updated || b.date).localeCompare(a.updated || a.date))[0];
}

function mapNodeWidth(node: MapNode, latest: string) {
	return Math.max(190, Math.min(300, Math.max(node.chinese.length * 14, node.name.length * 7.2, latest.length * 6.8) + 62));
}

// The system map is intentionally inline SVG: it remains self-contained in the static export and can animate without a client component.
function SystemMap({ entries }: { entries: ReturnType<typeof getAllEntries> }) {
	const renderedNodes = mapNodes.map(node => { const entry = latestTaggedEntry(entries, node.tag); const latest = entry?.title || "NO PUBLIC NOTE YET"; const width = mapNodeWidth(node, latest); const radians = node.angle * Math.PI / 180; const isLowerNode = node.angle === 54 || node.angle === 126; const horizontalRadius = isLowerNode ? 275 : 215; const verticalRadius = isLowerNode ? 203 : 215; const centerX = 350 + Math.cos(radians) * horizontalRadius; const centerY = 310 + Math.sin(radians) * verticalRadius; return { ...node, latest, width, height: 72, x: centerX - width / 2, y: centerY - 36, state: freshness(entry?.updated || entry?.date) }; });
	const anchors = renderedNodes.map(node => ({ top: { x: node.x + node.width / 2, y: node.y }, right: { x: node.x + node.width, y: node.y + node.height / 2 }, bottom: { x: node.x + node.width / 2, y: node.y + node.height }, left: { x: node.x, y: node.y + node.height / 2 } }));
	const edgeAnchors = [anchors[0].bottom, anchors[1].left, anchors[2].left, anchors[3].right, anchors[4].right];
	return <svg className="lab-map" viewBox="0 0 720 620" role="img" aria-label="Valbeta innovation system map"><g className="map-orbits"><circle cx="350" cy="310" r="150" /><circle cx="350" cy="310" r="238" /></g><g className="map-chords"><line x1={edgeAnchors[0].x} y1={edgeAnchors[0].y} x2={edgeAnchors[1].x} y2={edgeAnchors[1].y} /><line x1={edgeAnchors[1].x} y1={edgeAnchors[1].y} x2={edgeAnchors[2].x} y2={edgeAnchors[2].y} /><line x1={edgeAnchors[2].x} y1={edgeAnchors[2].y} x2={edgeAnchors[3].x} y2={edgeAnchors[3].y} /><line x1={edgeAnchors[3].x} y1={edgeAnchors[3].y} x2={edgeAnchors[4].x} y2={edgeAnchors[4].y} /><line x1={edgeAnchors[4].x} y1={edgeAnchors[4].y} x2={edgeAnchors[0].x} y2={edgeAnchors[0].y} /></g><g className="map-edges">{edgeAnchors.map(anchor => <line key={`${anchor.x}-${anchor.y}`} x1="350" y1="310" x2={anchor.x} y2={anchor.y} />)}</g><circle className="map-pulse" r="4"><animateMotion dur="4.5s" repeatCount="indefinite" path={`M350,310 L${edgeAnchors[0].x},${edgeAnchors[0].y}`} /></circle><g className="map-hub"><circle className="hub-ring" cx="350" cy="310" r="72" /><circle className="hub-bg" cx="350" cy="310" r="56" /><text className="hub-with" x="350" y="294" textAnchor="middle">What&apos;s with</text><text x="350" y="314" textAnchor="middle">VAL_BETA</text><text className="hub-sub hub-now" x="350" y="334" textAnchor="middle">NOW</text></g>{renderedNodes.map(node => <g className="map-node" key={node.name}><title>{`${node.name}: ${freshnessLabel(node.state)}`}</title><rect x={node.x} y={node.y} width={node.width} height="72" rx="7" /><circle className={`node-dot ${node.state}`} cx={node.x + 18} cy={node.y + 36} r="4" /><text className="node-cn" x={node.x + 34} y={node.y + 20}>{node.chinese}</text><text className="node-name" x={node.x + 34} y={node.y + 39}>{node.name}</text><text className="node-latest" x={node.x + 34} y={node.y + 59}>{node.latest}</text></g>)}</svg>;
}

// The homepage combines live content entries with the visual sections defined by the mockup.
export default function Home() {
	const entries = getAllEntries();
	return <>
		<section className="lab-hero" id="top"><div className="wrap lab-hero-grid"><div className="lab-hero-copy"><span className="lab-eyebrow"><i />INDEPENDENT INNOVATION LAB · EST. 2024</span><p className="hero-id">VAL_BETA // IDEAS ARE NEVER FINISHED</p><h1>Building <em>New Loops</em><br />for Innovation.</h1><p className="hero-cn">探索创新的新回路。</p><p className="hero-lead"><strong>Exploring Product, Strategy and The New Loop Theory.</strong> An independent laboratory where ideas ship as betas — and evolve in public.<span>一个关于创新、产品与未来商业系统的独立实验室。</span></p><div className="hero-actions"><Link className="lab-button primary" href="#experiments">EXPLORE EXPERIMENTS <b>→</b></Link><Link className="lab-button" href="#log">READ RESEARCH NOTES</Link></div><div className="hero-stats mono"><span><b>04</b> EXPERIMENTS</span><span><b>02</b> FRAMEWORKS</span><span><b>132</b> COMMITS</span><span className="hot">STATUS: BUILDING</span></div></div><figure className="hero-map-frame"><SystemMap entries={entries} /><figcaption><span>FIG.01 — INNOVATION SYSTEM MAP</span><span className="map-status-key"><i className="fresh" />7D <i className="recent" />30D <i className="stale" />STALE</span></figcaption></figure></div></section>
		<div className="lab-ticker" aria-hidden="true"><div>{[...tickerItems, ...tickerItems].map((item, index) => <span key={`${item}-${index}`}>{item} <b>{"//"}</b></span>)}</div></div>
		<section className="lab-section" id="experiments"><div className="wrap"><SectionHeading path="~/valbeta/experiments" title="Experiments" chinese="进行中的思想实验" index="SEC.02" meta="IDEAS CURRENTLY UNDER CONSTRUCTION." /><div className="experiment-grid">{entries.map((entry, index) => <article className="experiment-card" key={entry.slug}><div className="experiment-top">▣ EXP-00{index + 1} / {entry.slug.toUpperCase()} <span>PUBLIC</span></div><h3>{entry.title}<small>{entry.type === "ideas" ? "思想实验" : entry.type === "explore" ? "开放式探索" : "观察记录"}</small></h3><p>{entry.description}</p><div className="tag-list">{entry.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div><div className="experiment-foot"><span className="building-dot"><i />{entry.status.toUpperCase()}</span><time>{entry.date}</time><Link href={`/${entry.type}/${entry.slug}`}>EXPLORE <b>→</b></Link></div></article>)}</div></div></section>
		<section className="lab-section" id="frameworks"><div className="wrap"><SectionHeading path="~/valbeta/frameworks" title="Framework Library" chinese="思想资产库" index="SEC.03" meta="PUBLIC LAYER · OPEN THINKING" /><div className="framework-layout"><aside className="framework-index"><header>LIBRARY.md <b>02 FILES</b></header><a className="active" href="#fw-4q2i">[01] 4Q2I <span>v1.2</span></a><a href="#fw-loop">[02] THE NEW LOOP THEORY <span>v0.7</span></a><p><b>PUBLIC LAYER / 公开层</b><br />这里只公开思想资产，不包含商业交付细节。</p></aside><div className="readme-block" id="fw-4q2i"><div className="readme-bar">README.md <span>PUBLIC · v1.2</span></div><div><h3>Innovation 4Q2I</h3><p>Four questions that separate signal from noise before building anything.</p><p className="cn-copy">在动手之前，用四个问题过滤噪音。</p><div className="question-grid">{["What is the real problem?", "Who is changing?", "What loop is missing?", "How will it compound?"].map((question, index) => <div key={question}><b>Q{index + 1}</b><strong>{question}</strong></div>)}</div></div></div></div></div></section>
		<section className="lab-section" id="log"><div className="wrap"><SectionHeading path="~/valbeta/research-log" title="Research Log" chinese="研究日志" index="SEC.04" meta="PUBLIC BUILD HISTORY" /><div className="log-layout"><div className="research-log">{entries.map(entry => <article key={entry.slug}><span className="hash">{entry.slug.slice(0, 7)}</span><div><strong>{entry.title}</strong><p>{entry.description}</p></div><time>{entry.date}</time></article>)}</div><aside className="stats-panel"><header>LAB STATUS <b>LIVE</b></header><div><span>PUBLIC ENTRIES</span><strong>{String(entries.length).padStart(2, "0")}</strong></div><div><span>ACTIVE LOOPS</span><strong className="green">02</strong></div><div><span>LAST UPDATE</span><strong>SEP 2026</strong></div></aside></div></div></section>
		<section className="lab-section" id="about"><div className="wrap"><SectionHeading path="~/valbeta/about" title="A public thinking system." chinese="一个公开的思考系统。" index="SEC.05" meta="ABOUT THE LAB" /><div className="belief"><p>Ideas are never finished. They evolve through <em>experiments</em>, feedback, and the courage to publish the unfinished.</p><p className="cn-copy">想法从来不是完成品，它们在实验、反馈与公开表达中不断进化。</p><span>— VAL_BETA / 2026</span></div></div></section>
	</>;
}

function SectionHeading({ path, title, chinese, index, meta }: { path: string; title: string; chinese: string; index: string; meta: string }) { return <header className="lab-section-heading"><div className="path">{path}</div><div><h2>{title}<small>{chinese}</small></h2><p><b>{index}</b>{meta}</p></div></header>; }
