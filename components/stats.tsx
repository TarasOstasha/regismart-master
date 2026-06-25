"use client";

import { useEffect, useRef, useState } from "react";
import { Clock, Star, CalendarDays, Users } from "lucide-react";
import { InView } from "@/components/ui/in-view";
import { cn } from "@/lib/utils";

type Stat = {
  icon: typeof Clock;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
};

function buildStats(googleRating: number | null, googleReviewTotal: number | null): Stat[] {
  return [
    { icon: Clock, value: 30, suffix: " min", label: "Average visit time" },
    {
      icon: Star,
      value: googleRating ?? 5.0,
      decimals: 1,
      suffix: "★",
      label: "Google rating",
    },
    {
      icon: Users,
      value: googleReviewTotal ?? 0,
      suffix: "+",
      label: "Google reviews",
    },
    { icon: CalendarDays, value: 6, suffix: " days", label: "Open every week" },
  ];
}

function Counter({
  to,
  decimals = 0,
  duration = 1.4,
  active,
}: {
  to: number;
  decimals?: number;
  duration?: number;
  active: boolean;
}) {
  // Animate by writing to the DOM node directly (not setState) so the count-up
  // doesn't trigger a React re-render every frame - that re-render storm was
  // blocking the main thread (and menu taps) for ~1.4s right after load.
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!active) return;
    const node = ref.current;
    if (!node) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      node.textContent = (eased * to).toFixed(decimals);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, to, duration, decimals]);

  return <span ref={ref}>{(0).toFixed(decimals)}</span>;
}

type StatsProps = {
  googleRating?: number | null;
  googleReviewTotal?: number | null;
};

export function Stats({
  googleRating = null,
  googleReviewTotal = null,
}: StatsProps) {
  const [inView, setInView] = useState(false);
  const stats = buildStats(googleRating, googleReviewTotal);

  return (
    <section
      aria-label="RegiSmart by the numbers"
      className="relative py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <InView
          // Translucent white over the page gradient - reads as the mockup's
          // soft gray panel rather than a stark white card.
          className="overflow-hidden rounded-3xl bg-white/55 shadow-soft ring-1 ring-inset ring-plate-sky/30"
          onInView={() => setInView(true)}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={cn(
                  `fade-up-on-view fade-up-on-view-${i + 1}`,
                  "p-6 text-center sm:p-8",
                  // hairline dividers: 2x2 on mobile, single row on sm+
                  i === 1 && "border-l border-plate-sky/30",
                  i === 2 &&
                    "border-t border-plate-sky/30 sm:border-l sm:border-t-0",
                  i === 3 &&
                    "border-l border-t border-plate-sky/30 sm:border-t-0",
                )}
              >
                <s.icon
                  className="mx-auto h-7 w-7 text-plate-navy"
                  strokeWidth={1.5}
                />
                <p className="mt-4 font-display text-3xl sm:text-4xl font-bold tracking-tight text-ink tabular-nums">
                  {s.prefix}
                  <Counter
                    key={`${s.label}-${s.value}`}
                    to={s.value}
                    decimals={s.decimals ?? 0}
                    active={inView}
                  />
                  {s.suffix}
                </p>
                <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-muted">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </InView>
      </div>
    </section>
  );
}
