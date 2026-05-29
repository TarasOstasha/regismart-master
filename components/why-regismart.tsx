import Image from "next/image";
import Link from "next/link";
import {
  CalendarOff,
  ChevronRight,
  DoorOpen,
  Handshake,
  Zap,
  Receipt,
} from "lucide-react";
import { InView } from "@/components/ui/in-view";
import { WaveDivider } from "@/components/ui/wave-divider";

const reasons = [
  {
    icon: CalendarOff,
    title: "No appointments",
    body: "Walk in any time during business hours. We work in the order you arrive.",
  },
  {
    icon: DoorOpen,
    title: "Walk-ins, six days",
    body: "Open Monday through Saturday. No more burning a half-day at the DMV.",
  },
  {
    icon: Handshake,
    title: "One-on-one help",
    body: "Real people who&rsquo;ve seen every edge case the CT DMV throws at you.",
  },
  {
    icon: Zap,
    title: "Faster than the DMV",
    body: "Most visits take under 30 minutes, start to keys in hand.",
  },
  {
    icon: Receipt,
    title: "Transparent fees",
    body: "Flat service fee, state fees itemized on every receipt. No surprises.",
  },
];

export function WhyRegiSmart() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate min-h-[32rem] overflow-hidden pt-24 pb-0 sm:min-h-[38rem] sm:pt-28 lg:min-h-[42rem]">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="absolute inset-0 left-1/2 w-screen -translate-x-1/2">
            <div className="relative h-full min-h-full w-full">
              <Image
                src="/images/about.webp"
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
          <div className="max-w-3xl">
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
              <span className="text-ink/80">About</span>
            </nav>
            <div className="max-w-lg">
              <p className="fade-up fade-up-1 mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-plate-blue">
                Who we are
              </p>

              <h1 className="fade-up fade-up-2 mt-3 font-display text-4xl font-bold tracking-tight text-ink leading-[1.05] sm:text-5xl lg:text-6xl">
                Real humans, no DMV lines.
              </h1>

              <p className="fade-up fade-up-3 mt-5 max-w-2xl text-lg text-muted leading-relaxed">
                A Connecticut-authorized vehicle registration office. We
                actually want you in and out fast.
              </p>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] -mb-px leading-none text-bg"
        >
          <WaveDivider fill="currentColor" className="h-10 sm:h-14" />
        </div>
      </section>

      <section className="relative bg-bg py-20 sm:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-1/4 -z-10 h-[28rem] w-[28rem] rounded-full bg-plate-sky/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 bottom-1/4 -z-10 h-[24rem] w-[24rem] rounded-full bg-plate-blue/15 blur-3xl"
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <InView className="grid items-end gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="fade-up-on-view text-sm font-semibold uppercase tracking-[0.18em] text-plate-blue">
                Why RegiSmart
              </p>
              <h2 className="fade-up-on-view fade-up-on-view-1 mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink">
                The DMV, without the DMV.
              </h2>
            </div>
            <p className="fade-up-on-view fade-up-on-view-2 lg:col-span-5 text-muted leading-relaxed">
              We&rsquo;re a small Connecticut team that files directly with the
              DMV. Same paperwork, less time, and someone who actually picks up
              the phone.
            </p>
          </InView>

          <InView className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map(({ icon: Icon, title, body }, i) => (
              <div
                key={title}
                className={`fade-up-on-view fade-up-on-view-${Math.min(i + 1, 8)} flex gap-4`}
              >
                <div className="shrink-0">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-bg ring-1 ring-inset ring-plate-sky/60 text-plate-navy shadow-soft">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-ink">
                    {title}
                  </h3>
                  <p
                    className="mt-1.5 text-sm text-muted leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: body }}
                  />
                </div>
              </div>
            ))}
          </InView>
        </div>
      </section>
    </>
  );
}
