import type { Metadata } from "next";
import type { FaqItem } from "@/data/faq";

// Single source of truth for the production origin. Swap here if the domain
// changes - metadataBase, canonicals, sitemap, robots, and JSON-LD all read it.
export const SITE_URL = "https://www.regismarts.com";
export const SITE_NAME = "DMV Express by RegiSmart LLC";

// Social share image. Reuses the existing hero asset; resolved to an absolute
// URL against metadataBase by Next when emitted into og:image / twitter:image.
export const OG_IMAGE = "/images/hero.webp";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
};

// Builds a self-contained Metadata object for a route. openGraph/twitter are
// fully specified because Next replaces (not deep-merges) these objects when a
// child segment defines them.
export function pageMetadata({ title, description, path }: PageMetaInput): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_US",
      url: path,
      title: fullTitle,
      description,
      images: [{ url: OG_IMAGE }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE],
    },
  };
}

// Site-wide LocalBusiness markup for Google's local results / knowledge panel.
// Hours mirror lib/utils HOURS (Mon–Thu 10–18, Fri 10–17, Sat 10–14, Sun closed).
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#business`,
  name: SITE_NAME,
  legalName: "RegiSmart LLC",
  url: SITE_URL,
  image: `${SITE_URL}${OG_IMAGE}`,
  logo: `${SITE_URL}/images/regismart-logo.png`,
  telephone: "+1-203-460-7061",
  address: {
    "@type": "PostalAddress",
    streetAddress: "246 Federal Road, Suite D25",
    addressLocality: "Brookfield",
    addressRegion: "CT",
    postalCode: "06804",
    addressCountry: "US",
  },
  areaServed: { "@type": "State", name: "Connecticut" },
  hasMap:
    "https://www.google.com/maps/search/?api=1&query=246+Federal+Road+Suite+D25+Brookfield+CT+06804&query_place_id=ChIJTyTy93H554kR2rVwWGCnNiM",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "10:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Friday",
      opens: "10:00",
      closes: "17:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "10:00",
      closes: "14:00",
    },
  ],
} as const;

export function faqPageSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
