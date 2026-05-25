import { ClipboardList, Building2, KeyRound, Check } from "lucide-react";
import { InView } from "@/components/ui/in-view";
import { WaveDivider } from "@/components/ui/wave-divider";

const steps = [
  {
    n: "01",
    icon: ClipboardList,
    title: "Gather your docs",
    body: "Use the checklist below for a CT car or motorcycle. Missing one? Call us and we&rsquo;ll tell you the workaround.",
  },
  {
    n: "02",
    icon: Building2,
    title: "Stop in or call",
    body: "Walk in six days a week, or call ahead and we&rsquo;ll prep your file before you arrive.",
  },
  {
    n: "03",
    icon: KeyRound,
    title: "Drive away registered",
    body: "We file the paperwork, hand you plates and a sticker, and you&rsquo;re back on the road.",
  },
];

const carDocs = [
  "Bill of sale",
  "Title (if vehicle is 20 years old or newer)",
  "Form H-13B (Application for Registration / Title)",
  "CT Driver's License or ID",
  "CT Insurance card",
  "Emissions or VIN check (if required)",
];

const motorcycleDocs = [
  "Motorcycle title (signed over by seller)",
  "Bill of sale with buyer/seller info, date, price, VIN, and signatures",
  "Previous registration (if no title)",
  "VIN verification (out-of-state or missing VIN)",
  "Valid photo ID of the owner(s)",
  "Completed CT Motorcycle Registration Application",
];

export function HowItWorks() {
  return (
    <section id="how" className="relative pt-12 pb-20 sm:pt-16 sm:pb-28">
      <div className="absolute inset-x-0 -top-px translate-y-[-99%] text-surface">
        <WaveDivider fill="currentColor" />
      </div>
      <div className="absolute inset-x-0 -bottom-px translate-y-[99%] rotate-180 text-surface">
        <WaveDivider fill="currentColor" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <InView className="mx-auto max-w-2xl text-center">
          <p className="fade-up-on-view text-sm font-semibold uppercase tracking-[0.18em] text-plate-blue">
            How it works
          </p>
          <h2 className="fade-up-on-view fade-up-on-view-1 mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink">
            Three steps. One stop.
          </h2>
        </InView>

        <InView className="relative mt-16 grid gap-8 lg:grid-cols-3">
          {/* connecting line on desktop */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute left-[12%] right-[12%] top-[42px] h-px bg-gradient-to-r from-transparent via-plate-blue/40 to-transparent"
          />
          {steps.map(({ n, icon: Icon, title, body }, i) => (
            <div
              key={n}
              className={`fade-up-on-view fade-up-on-view-${i + 1} relative flex flex-col items-center text-center`}
            >
              <div className="relative grid h-20 w-20 place-items-center">
                <span className="absolute inset-0 rounded-full bg-plate-gradient opacity-90 shadow-soft" />
                <Icon className="relative h-9 w-9 text-bg" strokeWidth={1.75} />
              </div>
              <span className="mt-4 font-mono text-xs font-semibold tracking-[0.2em] text-plate-blue">
                STEP {n}
              </span>
              <h3 className="mt-2 font-display text-xl font-semibold text-ink">
                {title}
              </h3>
              <p
                className="mt-2 max-w-xs text-sm text-muted leading-relaxed"
                dangerouslySetInnerHTML={{ __html: body }}
              />
            </div>
          ))}
        </InView>

        {/* Document checklists */}
        <InView id="docs" className="mt-20 grid gap-6 lg:grid-cols-2">
          <div className="fade-up-on-view rounded-2xl bg-bg p-6 sm:p-8 ring-1 ring-inset ring-plate-sky/40 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-plate-blue">
              For a CT car
            </p>
            <h3 className="mt-2 font-display text-xl font-semibold text-ink">
              What to bring to register a vehicle
            </h3>
            <ul className="mt-5 space-y-3">
              {carDocs.map((d) => (
                <li key={d} className="flex items-start gap-3 text-sm text-ink/85">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-plate-gradient-h text-bg">
                    <Check className="h-3 w-3" />
                  </span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="fade-up-on-view fade-up-on-view-1 rounded-2xl bg-bg p-6 sm:p-8 ring-1 ring-inset ring-plate-sky/40 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-plate-blue">
              For a motorcycle
            </p>
            <h3 className="mt-2 font-display text-xl font-semibold text-ink">
              What to bring for motorcycle registration
            </h3>
            <ul className="mt-5 space-y-3">
              {motorcycleDocs.map((d) => (
                <li key={d} className="flex items-start gap-3 text-sm text-ink/85">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-plate-gradient-h text-bg">
                    <Check className="h-3 w-3" />
                  </span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </InView>

        {/* Out-of-state callout */}
        <InView className="mt-10">
          <div className="fade-up-on-view rounded-2xl bg-plate-gradient-h p-6 sm:p-8 text-bg shadow-plate">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bg/80">
              Out-of-state vehicle?
            </p>
            <h3 className="mt-2 font-display text-2xl sm:text-3xl font-semibold">
              Two steps. Then we handle the rest.
            </h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              <li className="flex items-start gap-3 text-bg/95">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-bg/15">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span>Emissions test or VIN verification</span>
              </li>
              <li className="flex items-start gap-3 text-bg/95">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-bg/15">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span>Connecticut auto insurance</span>
              </li>
            </ul>
            <p className="mt-5 max-w-xl text-sm text-bg/85">
              Bring proof of those two and your title, and we file the rest with
              CT DMV directly. You leave with Connecticut plates the same day.
            </p>
          </div>
        </InView>
      </div>
    </section>
  );
}
