import { makeContentPage, makeGenerateMetadata, makeParams } from "@/lib/content/page";
export const generateStaticParams = makeParams("explore");
export const generateMetadata = makeGenerateMetadata("explore");
export default makeContentPage("explore");
