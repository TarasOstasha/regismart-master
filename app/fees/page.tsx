import { PageHeader } from "@/components/ui/page-header";
import { FeesTeaser } from "@/components/fees-teaser";
import { CTABand } from "@/components/cta-band";

export default function FeesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Flat service fees. State fees on top."
        subtitle="You pay a small flat fee for our work, plus the same DMV state fee you'd pay anyway. No surprises at the counter."
      />
      <FeesTeaser />
      <CTABand />
    </>
  );
}
