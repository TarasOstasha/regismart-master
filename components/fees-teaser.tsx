import Link from "next/link";
import { ArrowRight, Receipt } from "lucide-react";
import { feePreview } from "@/data/fees";
import { Badge } from "@/components/ui/badge";
import { InView } from "@/components/ui/in-view";
import { PageHeader } from "@/components/ui/page-header";

export function FeesTeaser() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Flat service fees. State fees on top."
        subtitle="You pay a small flat fee for our work, plus the same DMV state fee you'd pay anyway. No surprises at the counter."
      />

      <section id="fees" className="relative pb-20 pt-4 sm:pb-28 sm:pt-6">
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
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-inset ring-plate-sky/40">
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
