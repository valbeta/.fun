import { notFound } from "next/navigation";
import { getEntries, getEntry } from "@/lib/content/source";
import { ArticleHeader, Markdown } from "@/components/content/markdown";
import type { ContentType } from "@/lib/content/types";
export function makeContentPage(type:ContentType){return function Page({params}:{params:Promise<{slug:string}>}){return params.then(({slug})=>{const entry=getEntry(type,slug); if(!entry) notFound(); return <article className="article-page"><ArticleHeader entry={entry}/><Markdown source={entry.body}/></article>;});};}
export function makeParams(type:ContentType){return function generateStaticParams(){return getEntries(type).map(({slug})=>({slug}));};}
