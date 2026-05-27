import { Hero } from "@/components/hero";
import { Stats } from "@/components/stats";
import { ReviewsCarousel } from "@/components/reviews-carousel";
import { ServicesGrid } from "@/components/services-grid";
import { CTABand } from "@/components/cta-band";
import { getGoogleReviews } from "@/lib/google-reviews";

export default async function HomePage() {
  const { rating, total } = await getGoogleReviews();

  return (
    <>
      <Hero googleReviewTotal={total} />
      <Stats googleRating={rating} googleReviewTotal={total} />
      <ReviewsCarousel />
      <ServicesGrid limit={3} showAllLink />
      <CTABand />
    </>
  );
}
