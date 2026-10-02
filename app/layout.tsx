import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./extended.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aldacrealty.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "ADLAC REALTY — A more considered way home", template: "%s | ADLAC REALTY" },
  description: "Thoughtfully selected homes and trusted property advice across Mumbai, Thane and Navi Mumbai.",
  openGraph: { type: "website", siteName: "ADLAC REALTY", title: "A more considered way home", description: "Find a home that feels like yours.", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title: "ADLAC REALTY — A more considered way home", description: "Thoughtfully selected homes across Mumbai." },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f7f7f4" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organization = { "@context": "https://schema.org", "@type": "RealEstateAgent", name: "ADLAC REALTY", url: siteUrl, telephone: "+91-22-4000-1920", email: "hello@aldacrealty.com", address: { "@type": "PostalAddress", streetAddress: "One BKC, Bandra East", addressLocality: "Mumbai", addressRegion: "Maharashtra", postalCode: "400051", addressCountry: "IN" } };
  return <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }} />{children}</body></html>;
}
