import { PageHeader } from "@/components/ui/page-header";
import { ServicesGrid } from "@/components/services-grid";
import { services } from "@/data/services";
import { HowItWorks } from "@/components/how-it-works";
import { CTABand } from "@/components/cta-band";

import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Every CT vehicle registration service in one place - renewals, titles, out-of-state transfers, and dealer/commercial (IRP). Walk-ins welcome in Brookfield, CT.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="What we handle"
        eyebrowClassName="text-[#3b5ca8]"
        title="One office. Every CT registration service, under one roof."
        subtitle="Quick sticker renewals, fleet titles, and everything in between. If you've got a vehicle, we've probably registered one like it."
      />
      <ServicesGrid showIntro={false} limit={services.length} />
      <HowItWorks />
      <CTABand />
    </>
  );
}
