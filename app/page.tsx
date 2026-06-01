import { Hero } from "@/components/hero";
import { Stats } from "@/components/stats";
import { ReviewsCarousel } from "@/components/reviews-carousel";
import { ServicesGrid } from "@/components/services-grid";
import { CTABand } from "@/components/cta-band";
import { getGoogleReviews } from "@/lib/google-reviews";

export default async function HomePage() {
  const { rating, total, reviews, url } = await getGoogleReviews();

  return (
    <>
      <Hero googleReviewTotal={total} />
      <Stats googleRating={rating} googleReviewTotal={total} />
      {/* Reuse the server-fetched reviews so the carousel doesn't re-fetch
          /api/google-reviews on the client (removes a round-trip + skeleton). */}
      <ReviewsCarousel initialReviews={reviews} initialGoogleUrl={url} />
      <ServicesGrid limit={6} showAllLink />
      <CTABand />
    </>
  );
}
