import { makeContentPage, makeParams } from "@/lib/content/page";
export const generateStaticParams=makeParams("ideas");
export default makeContentPage("ideas");
