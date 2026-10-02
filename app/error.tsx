"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return <main className="not-found"><p className="eyebrow">Something went wrong</p><h1>Let’s try that again.</h1><p>Your home search is safe. You can retry or return to the listings.</p><div className="button-row"><button className="button button-dark" onClick={reset}>Try again</button><Link className="button button-light" href="/properties">Browse properties</Link></div></main>;
}
