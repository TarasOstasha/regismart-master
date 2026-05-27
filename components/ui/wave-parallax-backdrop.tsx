"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  children: ReactNode;
};

export function WaveParallaxBackdrop({ className, children }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let raf = 0;
    const update = () => {
      const root = rootRef.current;
      const layer = layerRef.current;
      if (!root || !layer) return;

      const { top, height } = root.getBoundingClientRect();
      const vh = window.innerHeight;
      const center = top + height * 0.5;
      const delta = (center - vh * 0.5) / vh;
      const y = delta * -56;
      layer.style.transform = `translate3d(0, ${y}px, 0) scale(1.14)`;
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={rootRef} className={cn("relative isolate", className)}>
      <div
        ref={layerRef}
        aria-hidden
        className="pointer-events-none absolute -inset-x-[12%] -top-16 bottom-0 -z-10 will-change-transform"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-plate-blue/40 via-plate-sky/30 to-plate-white/90" />
        <div className="absolute left-[6%] top-[18%] h-36 w-36 rounded-full bg-plate-blue/25 blur-3xl" />
        <div className="absolute right-[10%] top-[8%] h-44 w-44 rounded-full bg-plate-sky/35 blur-3xl" />
        <div className="absolute left-1/2 top-[42%] h-28 w-56 -translate-x-1/2 rounded-full bg-plate-white/50 blur-2xl" />
      </div>
      <div className="relative z-0">{children}</div>
    </div>
  );
}
