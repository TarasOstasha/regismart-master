import { WhyRegiSmart } from "@/components/why-regismart";
import { Reviews } from "@/components/reviews";
import { CTABand } from "@/components/cta-band";

import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "A Connecticut-authorized vehicle registration office in Brookfield, CT. Walk in six days a week — most visits take under 30 minutes, no DMV lines.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <WhyRegiSmart />
      <Reviews />
      <CTABand />
    </>
  );
}
