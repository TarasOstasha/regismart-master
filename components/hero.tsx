import { ChevronRight, Star, Check, Clock } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { InView } from "@/components/ui/in-view";
import { formatReviewCount } from "@/lib/google-reviews";
import { BOOKING_HREF } from "@/lib/scroll-to-anchor";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/utils";

type HeroProps = {
  googleReviewTotal?: number | null;
};

// Server component (no client hooks) so it stays out of the hydration path -
// the page becomes interactive sooner on mobile. The backdrop is the site-wide
// fixed plate gradient; the photo layer was dropped in the license-plate
// redesign, which also makes the H1 the LCP element (faster first paint).
export function Hero({ googleReviewTotal = null }: HeroProps) {
  const reviewCount =
    googleReviewTotal != null ? formatReviewCount(googleReviewTotal) : null;

  return (
    <section className="relative isolate overflow-hidden pt-20 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 sm:pt-16 lg:px-8">
        <InView className="max-w-5xl">
          <h1 className="fade-up-on-view fade-up-on-view-2 font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-plate-navy leading-[1.05]">
            Skip the DMV.
            <br />
            Drive away registered today.
          </h1>

          <p className="fade-up-on-view fade-up-on-view-4 mt-6 max-w-xl text-lg leading-relaxed text-ink/80">
            Same-day registrations, renewals, titles, and dealer services in
            Connecticut. No appointments. No long lines. Walk in and we&apos;ll
            handle the paperwork while you wait.
          </p>

          <div className="fade-up-on-view fade-up-on-view-5 mt-8 flex flex-wrap items-center gap-3">
            <a
              href={PHONE_HREF}
              className="inline-flex h-12 items-center gap-3 rounded-full bg-white pl-2 pr-6 text-base text-ink shadow-soft transition-shadow hover:shadow-[0_16px_32px_-14px_rgba(31,48,124,0.22)] focus-ring"
            >
              <span className="inline-flex h-9 items-center gap-1.5 rounded-full bg-plate-white px-2.5">
                <svg
                  className="h-3.5 w-3.5 shrink-0 -rotate-12 text-ink"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M6.62 10.79a15.91 15.91 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C9.39 21.92 2.08 14.61 2.08 2a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
                </svg>
                <span className="font-mono text-[10px] font-semibold tracking-[0.14em] text-ink">
                  CT
                </span>
              </span>
              <span className="font-semibold text-ink">
                Call Us
              </span>
            </a>
            <ButtonLink href="/services#how" variant="secondary" size="lg">
              See what to bring
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href={BOOKING_HREF} variant="secondary" size="lg">
              Book Online
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </div>

          <ul className="fade-up-on-view fade-up-on-view-6 mt-10 grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:gap-6 text-sm">
            <li className="flex items-center gap-2 text-ink/80">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-plate-navy text-white">
                <Star className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
              </span>
              <span>
                <strong className="font-semibold text-ink">
                  {reviewCount ?? "-"}
                </strong>{" "}
                Google reviews
              </span>
            </li>
            <li className="flex items-center gap-2 text-ink/80">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-plate-navy text-white">
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <span>Walk-ins welcome</span>
            </li>
            <li className="flex items-center gap-2 text-ink/80">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-plate-navy text-white">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <span>Most visits under 30 min</span>
            </li>
          </ul>
        </InView>
      </div>
    </section>
  );
}
