import { Hero } from "@/components/hero";
import { Stats } from "@/components/stats";
import { ServicesGrid } from "@/components/services-grid";
import { CTABand } from "@/components/cta-band";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <ServicesGrid limit={3} showAllLink />
      <CTABand />
    </>
  );
}
