import Link from "next/link";

// Keep navigation labels centralized so the header and footer stay aligned as sections evolve.
const links = [["Ideas", "/ideas"], ["Explore", "/explore"], ["Observe", "/observe"], ["About", "/about"]];

// The header is deliberately server-rendered: navigation needs no client-side state.
export function SiteHeader() { return <header className="site-header"><div className="wrap header-inner"><Link className="brand" href="/"><strong>VAL<span>β</span>BETA</strong><small>valbeta.fun</small></Link><nav className="nav" aria-label="Main navigation">{links.map(([label, href]) => <Link key={href} href={href}>{label.toUpperCase()}</Link>)}</nav><span className="status">v0.7</span></div></header>; }
