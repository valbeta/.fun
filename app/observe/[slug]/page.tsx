import { makeContentPage, makeGenerateMetadata, makeParams } from "@/lib/content/page";
export const generateStaticParams = makeParams("observe");
export const generateMetadata = makeGenerateMetadata("observe");
export default makeContentPage("observe");
