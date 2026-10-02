import Link from "next/link";

export default function NotFound() {
  return <main className="not-found"><p className="eyebrow">404 · We took a wrong turn</p><h1>This page isn’t on the map.</h1><p>Let’s get you back to finding a place you love.</p><Link className="button button-dark" href="/properties">Browse properties</Link></main>;
}
