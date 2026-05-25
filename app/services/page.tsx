import { PageHeader } from "@/components/ui/page-header";
import { ServicesGrid } from "@/components/services-grid";
import { HowItWorks } from "@/components/how-it-works";
import { CTABand } from "@/components/cta-band";

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="What we handle"
        title="Every CT registration service, under one roof."
        subtitle="Quick sticker renewals, fleet titles, and everything in between. If you've got a vehicle, we've probably registered one like it."
      />
      <ServicesGrid showIntro={false} />
      <HowItWorks />
      <CTABand />
    </>
  );
}
