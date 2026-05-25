import {
  CalendarOff,
  DoorOpen,
  Handshake,
  Zap,
  Receipt,
} from "lucide-react";
import { InView } from "@/components/ui/in-view";

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
    <section className="relative py-20 sm:py-28">
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
  );
}
