import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { StickyCallCTA } from "@/components/sticky-call-cta";
import { PlateFrame } from "@/components/ui/plate-frame";
import { SITE_URL, SITE_NAME, OG_IMAGE, localBusinessSchema } from "@/lib/seo";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "DMV Express by RegiSmart LLC | Skip the DMV. Drive away registered today.",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Same-day Connecticut vehicle registration, renewals, titles, and dealer services in Brookfield, CT. Walk-ins welcome. No appointment needed.",
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    url: "/",
    title: "DMV Express by RegiSmart LLC | Skip the DMV",
    description:
      "Same-day Connecticut vehicle registration, renewals, titles, and dealer services. Walk-ins welcome.",
    images: [{ url: OG_IMAGE }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DMV Express by RegiSmart LLC | Skip the DMV",
    description:
      "Same-day Connecticut vehicle registration, renewals, titles, and dealer services. Walk-ins welcome.",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="relative min-h-screen text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <Header />
          <main id="main" className="relative">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
        <StickyCallCTA />
        <PlateFrame />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "addEventListener('load',function(){setTimeout(function(){document.documentElement.classList.add('loaded')},1800)},{once:true});",
          }}
        />
      </body>
    </html>
  );
}
