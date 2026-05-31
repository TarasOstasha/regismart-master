import { FeesTeaser } from "@/components/fees-teaser";
import { CTABand } from "@/components/cta-band";

import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Fees",
  description:
    "Flat service fees plus standard CT DMV state fees, itemized on every receipt. See pricing for common registrations, renewals, and titles in Brookfield, CT.",
  path: "/fees",
});

export default function FeesPage() {
  return (
    <>
      <FeesTeaser />
      <CTABand />
    </>
  );
}
