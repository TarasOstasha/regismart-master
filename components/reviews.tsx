import { Star } from "lucide-react";
import { InView } from "@/components/ui/in-view";
import { ReviewsCarousel } from "@/components/reviews-carousel";
import { formatReviewCount, getGoogleReviews } from "@/lib/google-reviews";

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5 text-plate-blue">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={i < n ? "h-4 w-4 fill-current" : "h-4 w-4 opacity-30"}
        />
      ))}
    </div>
  );
}

export async function Reviews() {
  const { reviews, rating, total, url } = await getGoogleReviews();
  if (reviews.length === 0) return null;

  const displayRating = rating?.toFixed(1) ?? "5.0";
  const reviewLabel =
    total != null ? `${formatReviewCount(total)} on Google` : "on Google";

  return (
    <section id="reviews" className="relative py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full bg-gradient-to-r from-plate-sky/10 via-transparent to-plate-blue/10"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <InView className="flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="fade-up-on-view text-sm font-semibold uppercase tracking-[0.18em] text-plate-blue">
              What clients say
            </p>
            <h2 className="fade-up-on-view fade-up-on-view-1 mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink">
              {total != null
                ? `${formatReviewCount(total)} neighbors trust us with their plates.`
                : "Neighbors trust us with their plates."}
            </h2>
          </div>
          <div className="fade-up-on-view fade-up-on-view-2 inline-flex items-center gap-3 rounded-2xl bg-bg px-5 py-3 shadow-soft ring-1 ring-inset ring-plate-sky/50">
            <Stars n={Math.round(rating ?? 5)} />
            <div>
              <p className="text-2xl font-bold leading-none text-ink">{displayRating}</p>
              <p className="text-xs text-muted">
                {url ? (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition hover:text-plate-blue"
                  >
                    Google rating · {reviewLabel}
                  </a>
                ) : (
                  <>Google rating · {reviewLabel}</>
                )}
              </p>
            </div>
          </div>
        </InView>

        <div className="mt-12">
          <ReviewsCarousel
            initialReviews={reviews}
            initialGoogleUrl={url}
            showHeader={false}
            perPage={3}
          />
        </div>
      </div>
    </section>
  );
}
