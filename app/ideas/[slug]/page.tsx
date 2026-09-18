import { makeContentPage, makeGenerateMetadata, makeParams } from "@/lib/content/page";
export const generateStaticParams = makeParams("ideas");
export const generateMetadata = makeGenerateMetadata("ideas");
export default makeContentPage("ideas");
