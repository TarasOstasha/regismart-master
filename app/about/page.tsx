import { PageHeader } from "@/components/ui/page-header";
import { WhyRegiSmart } from "@/components/why-regismart";
import { Reviews } from "@/components/reviews";
import { CTABand } from "@/components/cta-band";

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Who we are"
        title="Real humans, no DMV lines."
        subtitle="A Connecticut-authorized vehicle registration office. We actually want you in and out fast."
      />
      <WhyRegiSmart />
      <Reviews />
      <CTABand />
    </>
  );
}
