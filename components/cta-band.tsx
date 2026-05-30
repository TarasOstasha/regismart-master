import { Phone, Mail, Calendar } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { InView } from "@/components/ui/in-view";
import {
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  PHONE_DISPLAY,
  PHONE_HREF,
} from "@/lib/utils";

interface CTABandProps {
  title?: string;
  subtitle?: string;
}

export function CTABand({
  title = "Ready to skip the line?",
  subtitle = "Walk in or call ahead. Either way, your paperwork is moving in minutes.",
}: CTABandProps) {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <InView className="relative overflow-hidden rounded-3xl bg-plate-gradient-h px-6 py-10 sm:px-12 sm:py-14 shadow-plate">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-white/15 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -left-10 h-60 w-60 rounded-full bg-plate-navy/30 blur-3xl"
          />

          <div className="relative grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="fade-up-on-view lg:col-span-7">
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-bg">
                {title}
              </h2>
              <p className="mt-3 max-w-xl text-bg/85 leading-relaxed">
                {subtitle}
              </p>
            </div>

            <div className="fade-up-on-view fade-up-on-view-1 lg:col-span-5 flex flex-row flex-nowrap items-center gap-2 sm:gap-3 lg:justify-end">
              <ButtonLink
                href={PHONE_HREF}
                variant="plate"
                size="lg"
                className="btn-plate-outline--dark"
              >
                <Phone className="h-4 w-4" />
                Call Us
              </ButtonLink>
              <ButtonLink
                href="/contact"
                variant="ghost"
                size="lg"
                className="text-bg ring-1 ring-inset ring-white/40 hover:bg-white/10 hover:text-bg"
              >
                <Mail className="h-4 w-4" />
                Message us
              </ButtonLink>
              <ButtonLink
                href="/book"
                variant="ghost"
                size="lg"
                className="text-bg ring-1 ring-inset ring-white/40 hover:bg-white/10 hover:text-bg"
              >
                <Calendar className="h-4 w-4" />
                Book an appointment
              </ButtonLink>
            </div>
          </div>
        </InView>
      </div>
    </section>
  );
}
