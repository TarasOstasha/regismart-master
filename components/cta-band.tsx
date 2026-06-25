"use client";

import { Mail, Calendar } from "lucide-react";
import { usePathname } from "next/navigation";
import { ButtonLink } from "@/components/ui/button";
import { InView } from "@/components/ui/in-view";
import {
  BOOKING_HREF,
  BOOKING_SECTION_ID,
  CONTACT_MESSAGE_FORM_ID,
  CONTACT_MESSAGE_HREF,
  scrollToAnchor,
} from "@/lib/scroll-to-anchor";
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
  const pathname = usePathname();
  const isContactPage =
    pathname === "/contact" || pathname.startsWith("/contact/");
  const isBookPage = pathname === "/book" || pathname.startsWith("/book/");

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

            <div className="fade-up-on-view fade-up-on-view-1 lg:col-span-5 flex flex-col gap-2 sm:flex-row sm:flex-nowrap sm:items-center sm:gap-3 lg:justify-end">
              <a
                href={PHONE_HREF}
                className="inline-flex h-12 shrink-0 items-center gap-3 rounded-full bg-white pl-2 pr-6 text-base text-ink shadow-soft transition-shadow hover:shadow-[0_16px_32px_-14px_rgba(31,48,124,0.22)] focus-ring"
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
                <span className="font-semibold text-ink">Call Us</span>
              </a>
              <ButtonLink
                href={CONTACT_MESSAGE_HREF}
                variant="ghost"
                size="lg"
                className="text-bg ring-1 ring-inset ring-white/40 hover:bg-white/10 hover:text-bg"
                onClick={(e) => {
                  if (!isContactPage) return;
                  e.preventDefault();
                  scrollToAnchor(CONTACT_MESSAGE_FORM_ID);
                }}
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Message us
              </ButtonLink>
              <ButtonLink
                href={BOOKING_HREF}
                variant="ghost"
                size="lg"
                className="text-bg ring-1 ring-inset ring-white/40 hover:bg-white/10 hover:text-bg"
                onClick={(e) => {
                  if (!isBookPage) return;
                  e.preventDefault();
                  scrollToAnchor(BOOKING_SECTION_ID);
                }}
              >
                <Calendar className="h-4 w-4" aria-hidden="true" />
                Book an appointment
              </ButtonLink>
            </div>
          </div>
        </InView>
      </div>
    </section>
  );
}
