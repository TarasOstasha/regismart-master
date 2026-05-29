import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, Receipt } from "lucide-react";
import { feePreview } from "@/data/fees";
import { Badge } from "@/components/ui/badge";
import { InView } from "@/components/ui/in-view";
import { WaveDivider } from "@/components/ui/wave-divider";

export function FeesTeaser() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate min-h-[32rem] overflow-hidden pt-24 pb-0 sm:min-h-[38rem] sm:pt-28 lg:min-h-[42rem]">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="absolute inset-0 left-1/2 w-screen -translate-x-1/2">
            <div className="relative h-full min-h-full w-full">
              <Image
                src="/images/fees.webp"
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
              <ChevronRight className="h-3.5 w-3.5 text-muted/60" aria-hidden="true" />
              <span className="text-ink/80">Fees</span>
            </nav>

            <p className="fade-up fade-up-1 mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-plate-blue">
              Pricing
            </p>

            <h1 className="fade-up fade-up-2 mt-3 font-display text-4xl font-bold tracking-tight text-ink leading-[1.05] sm:text-5xl lg:text-6xl">
              Flat service fees. State fees on top.
            </h1>

            <p className="fade-up fade-up-3 mt-5 max-w-2xl text-lg text-muted leading-relaxed">
              You pay a small flat fee for our work, plus the same DMV state fee
              you&apos;d pay anyway. No surprises at the counter.
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

      <section id="fees" className="relative bg-bg pb-20 pt-14 sm:pb-28 sm:pt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <InView className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <div className="fade-up-on-view">
                <Badge variant="plate">
                  <Receipt className="h-3.5 w-3.5" />
                  Transparent pricing
                </Badge>
              </div>
              <p className="fade-up-on-view fade-up-on-view-1 mt-4 text-muted leading-relaxed">
                Every line is itemized on the receipt. Final state fee depends
                on vehicle, weight, and tax.
              </p>
              <Link
                href="/contact"
                className="fade-up-on-view fade-up-on-view-2 mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:gap-3 transition-all focus-ring rounded"
              >
                Ask about your specific service
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="fade-up-on-view fade-up-on-view-2 lg:col-span-7">
              <div className="relative overflow-hidden rounded-2xl bg-bg shadow-soft ring-1 ring-inset ring-plate-sky/40">
                <div className="bg-plate-gradient-h px-6 py-3 text-bg">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em]">
                    Common services
                  </p>
                </div>
                <ul className="divide-y divide-plate-sky/30">
                  {feePreview.map((fee) => (
                    <li
                      key={fee.label}
                      className="flex items-baseline justify-between gap-4 px-6 py-4"
                    >
                      <span className="font-medium text-ink">{fee.label}</span>
                      <span className="text-right">
                        <span className="block text-sm font-semibold text-ink">
                          {fee.service}
                        </span>
                        <span className="block text-xs text-muted">
                          {fee.example}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-plate-sky/30 bg-plate-soft px-6 py-3 text-xs text-muted">
                  Examples only · Final state fee depends on vehicle, weight, and
                  tax.
                </div>
              </div>
            </div>
          </InView>
        </div>
      </section>
    </>
  );
}
