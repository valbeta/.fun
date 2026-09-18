"use client";

import { useRouter } from "next/navigation";

// This client boundary is required only for Next's retry action; the page remains static-friendly.
export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const router = useRouter();
  return <section className="article-page"><div className="path">500 / LOOP ERROR</div><h1>Something interrupted the experiment.</h1><p>The page could not complete this cycle. Try again, or return to the public layer.</p><div className="actions"><button className="button primary" onClick={() => reset()}>TRY AGAIN →</button><button className="button" onClick={() => router.push("/")}>RETURN HOME</button></div></section>;
}
