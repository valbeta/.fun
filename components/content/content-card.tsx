import Link from "next/link";
import type { ContentEntry } from "@/lib/content/types";

// The list variant is used by collection pages; the default card variant is used for homepage highlights.
export function ContentCard({ entry, variant = "card" }: { entry: ContentEntry; variant?: "card" | "list" }) {
	return <article className={variant === "list" ? "content-list-row" : "card"}>
		<div className="card-meta"><span>{entry.type.toUpperCase()}</span><time dateTime={entry.date}>{entry.date}</time></div>
		<div className="content-card-main"><h3><Link href={`/${entry.type}/${entry.slug}`}>{entry.title}</Link></h3><p>{entry.description}</p><div className="tag-list">{entry.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div></div>
		<div className="card-footer"><span>{entry.status === "published" ? "PUBLIC" : "DRAFT"}</span><Link href={`/${entry.type}/${entry.slug}`}>READ →</Link></div>
	</article>;
}
