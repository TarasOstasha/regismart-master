import {
  Calendar,
  Clock,
  DoorOpen,
  ExternalLink,
  Phone,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { InView } from "@/components/ui/in-view";
import { PageHeader } from "@/components/ui/page-header";
import { HOURS, PHONE_DISPLAY, PHONE_HREF } from "@/lib/utils";
const SCHEDULE_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ09fAljzx-TD4tH2V-QYnpZCxa8UdBSgejI7_lacsB7YsrQK4Hq6e0W5KVdCiLjeHchSx8kXDtM?gv=true";

export function Booking() {
  return (
    <>
      <PageHeader
        eyebrow="Schedule"
        title="Pick a time. Skip the wait."
        subtitle="Reserve a slot and we'll have your file ready when you walk in. Walk-ins are still welcome anytime during business hours."
      />

      {/* Scheduler */}
      <section
        id="booking"
        className="scroll-mt-24 relative pb-20 pt-4 sm:pb-28 sm:pt-6"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <InView className="mx-auto max-w-2xl text-center">
            <p className="fade-up-on-view text-sm font-semibold uppercase tracking-[0.18em] text-plate-blue">
              Appointments
            </p>
            <h2 className="fade-up-on-view fade-up-on-view-1 mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Choose your time below.
            </h2>
            <div
              aria-hidden="true"
              className="fade-up-on-view fade-up-on-view-2 gradient-divider mx-auto mt-6 max-w-xs"
            />
            <p className="fade-up-on-view fade-up-on-view-3 mt-6 text-muted leading-relaxed">
              Select a slot that works for you. We&apos;ll have your file ready
              when you arrive.
            </p>
          </InView>

          <InView className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-start">
            <aside className="fade-up-on-view space-y-4 lg:col-span-4">
              <div className="rounded-2xl bg-white p-6 ring-1 ring-inset ring-plate-sky/40 shadow-soft">
                <Badge variant="plate" className="mb-4">
                  <DoorOpen className="h-3.5 w-3.5" aria-hidden="true" />
                  Walk-ins welcome
                </Badge>
                <p className="text-sm text-muted leading-relaxed">
                  No appointment is required. Book online for a faster check-in,
                  or stop by anytime during business hours. If you can't find a
                  convenient appointment time,{" "}
                  <a
                    href="mailto:info@regismarts.com"
                    className="inline-flex min-h-12 items-center text-primary hover:underline focus-ring rounded-sm"
                  >
                    <b>email us</b>
                  </a>{" "}
                  or{" "}
                  <a
                    href="tel:+12034607061"
                    className="inline-flex min-h-12 items-center text-primary hover:underline focus-ring rounded-sm"
                  >
                    <b>call (203) 460-7061</b>
                  </a>
                  , and we'll be happy to help.
                </p>
              </div>

              <div className="rounded-2xl bg-white p-6 ring-1 ring-inset ring-plate-sky/40 shadow-soft">
                <div className="flex gap-4">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-plate-gradient-h text-bg">
                    <Clock className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                      Hours
                    </p>
                    <ul className="mt-2 space-y-1 text-sm">
                      {HOURS.map((h) => (
                        <li
                          key={h.d}
                          className="flex items-baseline justify-between gap-4"
                        >
                          <span className="text-ink">{h.d}</span>
                          <span className="font-medium text-ink">{h.h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-plate-soft p-6 ring-1 ring-inset ring-plate-sky/40">
                <div className="flex gap-4">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-plate-gradient-h text-bg">
                    <Phone className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                      Questions first?
                    </p>
                    <p className="mt-1 text-sm text-muted leading-relaxed">
                      Not sure what to bring? Call and we&apos;ll walk you
                      through it.
                    </p>
                    <ButtonLink
                      href={PHONE_HREF}
                      variant="gradient"
                      size="sm"
                      className="mt-4"
                    >
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      {PHONE_DISPLAY}
                    </ButtonLink>
                  </div>
                </div>
              </div>
            </aside>

            <div className="fade-up-on-view fade-up-on-view-1 lg:col-span-8">
              <div className="overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-inset ring-plate-sky/40">
                <div className="flex flex-col gap-3 border-b border-plate-sky/30 bg-plate-gradient-h px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                  <div className="flex items-center gap-3 text-bg">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/15 ring-1 ring-inset ring-white/25">
                      <Calendar className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-display text-lg font-semibold">
                        Online scheduler
                      </p>
                      <p className="text-sm text-bg/80">
                        Pick a date and time that works for you
                      </p>
                    </div>
                  </div>
                  <a
                    href={SCHEDULE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center gap-2 self-start rounded-full px-4 py-2 text-xs font-semibold text-bg ring-1 ring-inset ring-white/35 transition hover:bg-white/10 focus-ring sm:self-center"
                  >
                    Open in new tab
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>

                <div className="relative bg-white">
                  <iframe
                    title="Book an appointment with DMV Express RegiSmart LLC"
                    src={SCHEDULE_URL}
                    width="100%"
                    height={720}
                    className="block w-full border-0"
                    loading="lazy"
                  />
                </div>

                <div className="border-t border-plate-sky/30 bg-plate-soft px-5 py-3 text-center text-xs text-muted sm:px-6">
                  Powered by Google Calendar · Same-day walk-ins always welcome
                </div>
              </div>
            </div>
          </InView>
        </div>
      </section>
    </>
  );
}
