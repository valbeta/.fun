import Link from "next/link";
export function SiteFooter() { return <footer className="site-footer"><div className="wrap footer-row"><span>© {new Date().getFullYear()} VAL_BETA</span><span>Ideas are never finished. They evolve through experiments.</span><Link href="mailto:hello@valbeta.fun">hello@valbeta.fun ↗</Link></div></footer>; }
