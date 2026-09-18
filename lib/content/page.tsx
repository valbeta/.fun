import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEntries, getEntry } from "@/lib/content/source";
import { ArticleHeader, Markdown } from "@/components/content/markdown";
import type { ContentType } from "@/lib/content/types";

const labels: Record<ContentType, string> = { ideas: "Ideas", explore: "Explore", observe: "Observe" };

export function makeContentPage(type: ContentType) {
  return async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const entry = getEntry(type, slug);
    if (!entry) notFound();
    return <article className="article-page"><ArticleHeader entry={entry} /><Markdown source={entry.body} /></article>;
  };
}

export function makeParams(type: ContentType) {
  return function generateStaticParams() {
    return getEntries(type).map(({ slug }) => ({ slug }));
  };
}

export function makeGenerateMetadata(type: ContentType) {
  return async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const entry = getEntry(type, slug);
    if (!entry) return {};
    return { title: entry.title, description: entry.description, alternates: { canonical: `/${type}/${slug}` }, openGraph: { title: entry.title, description: entry.description, type: "article", publishedTime: entry.date, section: labels[type], tags: entry.tags } };
  };
}
