import { notFound } from "next/navigation";
import { getEntries } from "@/lib/content/source";
import type { ContentType } from "@/lib/content/types";
import { ContentCard } from "@/components/content/content-card";

// Collection copy is intentionally separate from content files: it describes the role of each public stream.
const config: Record<ContentType,{title:string;description:string}>={ideas:{title:"Ideas",description:"Working thoughts, hypotheses, and questions that are still becoming."},explore:{title:"Explore",description:"Longer investigations into products, systems, strategy, and the future."},observe:{title:"Observe",description:"Small signals, patterns, and things worth noticing in the world."}};

// The same renderer powers all three collections while the route supplies the content type.
export function CollectionPage({type}:{type:ContentType}){const entries=getEntries(type); if(!config[type]) notFound(); const c=config[type]; return <><header className="page-header"><div className="wrap"><div className="path">~/valbeta/{type}</div><h1>{c.title}</h1><p>{c.description}</p><div className="collection-meta"><span>PUBLIC LAYER</span><span>{String(entries.length).padStart(2,"0")} ENTRIES</span></div></div></header><section className="wrap article-list" aria-label={`${c.title} entries`}>{entries.length ? entries.map(e=><ContentCard key={e.slug} entry={e} variant="list"/>) : <p>No public entries yet. The loop is being built.</p>}</section></>}
