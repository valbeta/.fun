import type { AnchorHTMLAttributes } from "react";
import type { ContentEntry } from "@/lib/content/types";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";

// Keep MDX links inside the site's prose styling while allowing standard anchor attributes.
const components = {
	a: ({ href, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => <a href={href} {...props}>{children}</a>,
};

// MDX is compiled on the server, which keeps the exported site free of a runtime content API.
export async function Markdown({ source }: { source: string }) { return <div className="prose"><MDXRemote source={source} components={components} options={{ mdxOptions: { rehypePlugins: [[rehypePrettyCode, { theme: "github-dark-dimmed", keepBackground: false }] ] } }} /></div>; }

function estimateReadingMinutes(source: string) {
	const latinWords = source.trim().split(/\s+/).filter(Boolean).length;
	const chineseCharacters = (source.match(/[\u3400-\u9fff]/g) || []).length;
	return Math.max(1, Math.ceil((latinWords + chineseCharacters / 2) / 180));
}

export function ArticleHeader({ entry }: { entry: ContentEntry }) { return <header className="article-header"><div className="path">~/valbeta/{entry.type}/{entry.slug}</div><div className="article-kicker"><span>{entry.type.toUpperCase()}</span></div><h1>{entry.title}</h1><p>{entry.description}</p><time className="article-date" dateTime={entry.date}>{entry.date}</time><div className="tag-list">{entry.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div><div className="reading-time">预计阅读时间 · {estimateReadingMinutes(entry.body)} 分钟</div></header>; }
