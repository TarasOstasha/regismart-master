"use client";

import Image from "next/image";
import { Phone, ArrowRight, Star, Check, Clock } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { InView } from "@/components/ui/in-view";
import { WaveDivider } from "@/components/ui/wave-divider";
import { formatReviewCount } from "@/lib/google-reviews";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/utils";

type HeroProps = {
  googleReviewTotal?: number | null;
};

export function Hero({ googleReviewTotal = null }: HeroProps) {
  const reviewCount =
    googleReviewTotal != null ? formatReviewCount(googleReviewTotal) : null;

  return (
    <section className="hero relative isolate overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24">
      <div aria-hidden="true" className="hero-bg">
        <div className="absolute inset-0 left-1/2 w-screen -translate-x-1/2">
          <div className="relative h-full min-h-full w-full">
            <Image
              src="/images/hero.webp"
              alt=""
              fill
              priority
              sizes="100vw"
              className="hero-bg-image object-cover object-center"
            />
          </div>
        </div>
      </div>

      <div className="hero-content mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <InView className="max-w-3xl">
          <h1 className="fade-up-on-view fade-up-on-view-2 font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-ink leading-[1.05]">
            <span style={{ color: "#f1f1f1" }}>Skip the DMV.</span>
            <br />
            <span className="text-plate-navy">Drive away registered today.</span>
          </h1>

          <p className="hero-lead fade-up-on-view fade-up-on-view-4 mt-6 max-w-xl text-lg leading-relaxed">
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
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/book" variant="secondary" size="lg">
              Book Online
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>

          <ul className="fade-up-on-view fade-up-on-view-6 mt-10 grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:gap-6 text-sm">
            <li className="flex items-center gap-2 text-ink/80">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-plate-gradient-h text-bg">
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
              <span className="grid h-7 w-7 place-items-center rounded-full bg-plate-gradient-h text-bg">
                <Check className="h-3.5 w-3.5" />
              </span>
              <span>Walk-ins welcome</span>
            </li>
            <li className="flex items-center gap-2 text-ink/80">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-plate-gradient-h text-bg">
                <Clock className="h-3.5 w-3.5" />
              </span>
              <span>Most visits under 30 min</span>
            </li>
          </ul>
        </InView>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[3]"
      >
        <div className="gradient-divider mx-auto mb-4 max-w-5xl opacity-70" />
        <WaveDivider syncViewportFill className="h-10 sm:h-14" />
      </div>
    </section>
  );
}
