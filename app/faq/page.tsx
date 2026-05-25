import { PageHeader } from "@/components/ui/page-header";
import { FAQ } from "@/components/faq";
import { CTABand } from "@/components/cta-band";

export default function FAQPage() {
  return (
    <>
      <PageHeader
        eyebrow="Questions"
        title="Quick answers to common ones."
        subtitle="Don't see your situation here? Call or stop in. We've probably handled it before."
      />
      <FAQ />
      <CTABand />
    </>
  );
}
