import { Phone, ChevronRight, Star, Check, Clock } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { InView } from "@/components/ui/in-view";
import { formatReviewCount } from "@/lib/google-reviews";
import { BOOKING_HREF } from "@/lib/scroll-to-anchor";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/utils";

type HeroProps = {
  googleReviewTotal?: number | null;
};

// Server component (no client hooks) so it stays out of the hydration path —
// the page becomes interactive sooner on mobile. The backdrop is the site-wide
// fixed plate gradient; the photo layer was dropped in the license-plate
// redesign, which also makes the H1 the LCP element (faster first paint).
export function Hero({ googleReviewTotal = null }: HeroProps) {
  const reviewCount =
    googleReviewTotal != null ? formatReviewCount(googleReviewTotal) : null;

  return (
    <section className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
            <ButtonLink href={PHONE_HREF} variant="plate" size="lg">
              <Phone className="h-4 w-4" />
              Call {PHONE_DISPLAY}
            </ButtonLink>
            <ButtonLink href="/services#how" variant="secondary" size="lg">
              See what to bring
              <ChevronRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href={BOOKING_HREF} variant="secondary" size="lg">
              Book Online
              <ChevronRight className="h-4 w-4" />
            </ButtonLink>
          </div>

          <ul className="fade-up-on-view fade-up-on-view-6 mt-10 grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:gap-6 text-sm">
            <li className="flex items-center gap-2 text-ink/80">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-plate-navy text-white">
                <Star className="h-3.5 w-3.5 fill-current" />
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
                <Check className="h-3.5 w-3.5" />
              </span>
              <span>Walk-ins welcome</span>
            </li>
            <li className="flex items-center gap-2 text-ink/80">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-plate-navy text-white">
                <Clock className="h-3.5 w-3.5" />
              </span>
              <span>Most visits under 30 min</span>
            </li>
          </ul>
        </InView>
      </div>
    </section>
  );
}
