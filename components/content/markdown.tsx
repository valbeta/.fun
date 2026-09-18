import type { ContentEntry } from "@/lib/content/types";
import { renderMarkdown } from "@/lib/content/markdown";
export function Markdown({ source }: { source: string }) { return <div className="prose">{renderMarkdown(source)}</div>; }
export function ArticleHeader({ entry }: { entry: ContentEntry }) { return <header className="article-header"><div className="path">~/valbeta/{entry.type}/{entry.slug}</div><h1>{entry.title}</h1><p>{entry.description}</p><div className="card-meta"><span>{entry.type.toUpperCase()}</span><time dateTime={entry.date}>{entry.date}</time></div></header>; }
