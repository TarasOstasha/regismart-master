import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { InView } from "@/components/ui/in-view";
import { services } from "@/data/services";

interface ServicesGridProps {
  limit?: number;
  showAllLink?: boolean;
  /**
   * Whether to render the section's heading block (eyebrow / title /
   * subtitle). Off by default on routes that already have a PageHeader,
   * so we don't double up on the same message. Defaults to true so the
   * home page teaser still has its own heading.
   */
  showIntro?: boolean;
}

export function ServicesGrid({
  limit = 6,
  showAllLink = false,
  showIntro = true,
}: ServicesGridProps = {}) {
  const visible = services.slice(0, limit);
  const gridCols = "lg:grid-cols-3";

  return (
    <section id="services" className="relative py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-plate-sky/20 via-plate-sky/5 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-32 -z-10 h-96 w-96 rounded-full bg-plate-blue/10 blur-3xl"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {showIntro && (
          <InView className="max-w-2xl">
            <p
              className="fade-up-on-view text-sm font-semibold uppercase tracking-[0.18em]"
              style={{ color: "#3b5ca8" }}
            >
              -
            </p>
       
            <h2 className="fade-up-on-view fade-up-on-view-1 mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink">
              One office. Every CT registration service.
            </h2>
            <p className="fade-up-on-view fade-up-on-view-2 mt-4 text-muted text-lg">
              Quick sticker renewals, fleet titles, and everything between. If
              you&apos;ve got a vehicle, we&apos;ve probably registered one like it.
            </p>
          </InView>
        )}

        <InView
          className={`${showIntro ? "mt-12" : ""} grid gap-5 sm:grid-cols-2 ${gridCols}`}
        >
          {visible.map(({ icon: Icon, title, blurb }, i) => (
            <div
              key={title}
              className={`fade-up-on-view fade-up-on-view-${Math.min(i + 1, 8)}`}
            >
              <Card className="group h-full p-6">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-plate-soft ring-1 ring-inset ring-plate-sky/50 text-plate-navy transition-colors group-hover:bg-plate-gradient-h group-hover:text-bg group-hover:ring-transparent">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {blurb}
                </p>
              </Card>
            </div>
          ))}
        </InView>

        {showAllLink && (
          <div className="mt-10 flex justify-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:gap-3 transition-all focus-ring rounded-full px-3 py-1"
            >
              See all {services.length} services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
