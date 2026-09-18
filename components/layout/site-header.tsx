import Link from "next/link";

const links = [["Ideas", "/ideas"], ["Explore", "/explore"], ["Observe", "/observe"], ["About", "/about"]];
export function SiteHeader() { return <header className="site-header"><div className="wrap header-inner"><Link className="brand" href="/"><strong>VAL<span>β</span>BETA</strong><small>valbeta.fun</small></Link><nav className="nav" aria-label="Main navigation">{links.map(([label, href]) => <Link key={href} href={href}>{label.toUpperCase()}</Link>)}</nav><span className="status">BUILDING</span></div></header>; }
