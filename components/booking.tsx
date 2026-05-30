import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { InView } from "@/components/ui/in-view";
import { WaveDivider } from "@/components/ui/wave-divider";

const SCHEDULE_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ09fAljzx-TD4tH2V-QYnpZCxa8UdBSgejI7_lacsB7YsrQK4Hq6e0W5KVdCiLjeHchSx8kXDtM?gv=true";

export function Booking() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate min-h-[32rem] overflow-hidden pt-24 pb-0 sm:min-h-[38rem] sm:pt-28 lg:min-h-[42rem]">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="absolute inset-0 left-1/2 w-screen -translate-x-1/2">
            <div className="relative h-full min-h-full w-full">
              <Image
                src="/images/hero1.webp"
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover object-[center_20%]"
              />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-plate-blue/25 via-plate-white/55 to-plate-white/92" />
        </div>

        <div className="relative z-[2] mx-auto max-w-7xl px-4 pb-12 sm:px-6 sm:pb-14 lg:px-8">
          <div className="max-w-lg">
            <nav
              aria-label="Breadcrumb"
              className="fade-up flex items-center gap-1.5 text-xs font-medium text-muted"
            >
              <Link
                href="/"
                className="rounded hover:text-ink transition-colors focus-ring"
              >
                Home
              </Link>
              <ChevronRight
                className="h-3.5 w-3.5 text-muted/60"
                aria-hidden="true"
              />
              <span className="text-ink/80">Book</span>
            </nav>

            <p className="fade-up fade-up-1 mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-plate-blue">
              Schedule
            </p>

            <h1 className="fade-up fade-up-2 mt-3 font-display text-4xl font-bold tracking-tight text-ink leading-[1.05] sm:text-5xl lg:text-6xl">
              Pick a time. Skip the wait.
            </h1>

            <p className="fade-up fade-up-3 mt-5 max-w-2xl text-lg text-muted leading-relaxed">
              Reserve a slot and we&rsquo;ll have your file ready when you walk
              in. Walk-ins are still welcome anytime during business hours.
            </p>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] -mb-px leading-none text-bg"
        >
          <WaveDivider fill="currentColor" className="h-10 sm:h-14" />
        </div>
      </section>

      {/* Scheduler */}
      <section
        id="book"
        className="relative bg-bg pb-20 pt-14 sm:pb-28 sm:pt-16"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <InView className="overflow-hidden rounded-2xl bg-white ring-1 ring-inset ring-plate-sky/40 shadow-soft">
            <iframe
              title="Book an appointment with DMV Express RegiSmart LLC"
              src={SCHEDULE_URL}
              width="100%"
              height={720}
              className="fade-up-on-view block w-full border-0"
              loading="lazy"
            />
          </InView>
        </div>
      </section>
    </>
  );
}
