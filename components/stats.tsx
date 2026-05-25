"use client";

import { useEffect, useRef, useState } from "react";
import { Clock, Star, CalendarDays, Users } from "lucide-react";
import { InView } from "@/components/ui/in-view";

type Stat = {
  icon: typeof Clock;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
};

const stats: Stat[] = [
  { icon: Clock, value: 30, suffix: " min", label: "Average visit time" },
  { icon: Star, value: 5.0, decimals: 1, suffix: "★", label: "Google rating" },
  { icon: Users, value: 900, suffix: "+", label: "Five-star reviews" },
  { icon: CalendarDays, value: 6, suffix: " days", label: "Open every week" },
];

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
  const [val, setVal] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!active || startedRef.current) return;
    startedRef.current = true;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(eased * to);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, to, duration]);

  return <>{val.toFixed(decimals)}</>;
}

export function Stats() {
  const [inView, setInView] = useState(false);

  return (
    <section
      aria-label="RegiSmart by the numbers"
      className="relative py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <InView
          className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-plate-sky/40 ring-1 ring-inset ring-plate-sky/40 shadow-soft sm:grid-cols-4"
          onInView={() => setInView(true)}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`fade-up-on-view fade-up-on-view-${i + 1} relative bg-bg p-6 text-center sm:p-8`}
            >
              <div className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-plate-soft text-plate-navy ring-1 ring-inset ring-plate-sky/60">
                <s.icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <p className="mt-4 font-display text-3xl sm:text-4xl font-bold tracking-tight text-ink tabular-nums">
                {s.prefix}
                <Counter to={s.value} decimals={s.decimals ?? 0} active={inView} />
                {s.suffix}
              </p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-muted">
                {s.label}
              </p>
            </div>
          ))}
        </InView>
      </div>
    </section>
  );
}
