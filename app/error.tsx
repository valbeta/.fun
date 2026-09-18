"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <section className="article-page"><div className="path">500 / LOOP ERROR</div><h1>Something interrupted the experiment.</h1><p>The page could not complete this cycle. Try again, or return to the public layer.</p><div className="actions"><button className="button primary" onClick={() => reset()}>TRY AGAIN →</button><Link className="button" href="/">RETURN HOME</Link></div></section>;
}
