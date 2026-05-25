import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { StickyCallCTA } from "@/components/sticky-call-cta";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "DMV Express by RegiSmart LLC | Skip the DMV. Drive away registered today.",
  description:
    "Same-day Connecticut vehicle registration, renewals, titles, and dealer services in Brookfield, CT. Walk-ins welcome. No appointment needed.",
  metadataBase: new URL("https://regismart.example"),
  openGraph: {
    title: "DMV Express by RegiSmart LLC | Skip the DMV",
    description:
      "Same-day Connecticut vehicle registration, renewals, titles, and dealer services. Walk-ins welcome.",
    type: "website",
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
