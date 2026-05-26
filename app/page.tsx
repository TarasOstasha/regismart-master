import { Hero } from "@/components/hero";
import { Stats } from "@/components/stats";
import { ReviewsCarousel } from "@/components/reviews-carousel";
import { ServicesGrid } from "@/components/services-grid";
import { CTABand } from "@/components/cta-band";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <ReviewsCarousel />
      <ServicesGrid limit={3} showAllLink />
      <CTABand />
    </>
  );
}
