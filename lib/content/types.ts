export type ContentType = "ideas" | "explore" | "observe";
export type ContentStatus = "draft" | "published";
export interface Frontmatter { title:string; description:string; date:string; status:ContentStatus; tags?:string[]; }
export interface ContentEntry extends Frontmatter { slug:string; type:ContentType; body:string; tags:string[]; }
