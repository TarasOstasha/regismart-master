"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { scrollToAnchor } from "@/lib/scroll-to-anchor";

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Skip Lenis on touch devices - iOS/Android native momentum scrolling is
    // already smooth, and Lenis's smoothWheel can't fire without wheel events.
    // Hydrating it on mobile just costs bundle parse + a perpetual RAF loop
    // that competes with React hydration on the main thread.
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || isTouch) return;

    let cancelled = false;
    let lenis: Lenis | null = null;
    let raf = 0;
    let idleHandle: number | null = null;

    // Defer Lenis init off the critical path so it doesn't compete with
    // first paint / hydration. The pathname-change effect below already
    // handles lenisRef.current === null via its else branch.
    const start = () => {
      if (cancelled) return;
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      lenisRef.current = lenis;
      const tick = (time: number) => {
        lenis!.raf(time);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const ric = (
      window as Window & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
        cancelIdleCallback?: (handle: number) => void;
      }
    ).requestIdleCallback;
    if (typeof ric === "function") {
      idleHandle = ric(start, { timeout: 500 });
    } else {
      idleHandle = window.setTimeout(start, 200);
    }

    return () => {
      cancelled = true;
      if (idleHandle !== null) {
        const cic = (
          window as Window & { cancelIdleCallback?: (handle: number) => void }
        ).cancelIdleCallback;
        if (typeof cic === "function") cic(idleHandle);
        else window.clearTimeout(idleHandle);
      }
      cancelAnimationFrame(raf);
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Snap to top on route change. Without this, Lenis catches the implicit
  // scroll-to-top from the App Router transition and animates it over
  // ~1.1s - which makes every navigation feel sluggish.
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const id = window.setTimeout(() => scrollToAnchor(hash), 50);
      return () => window.clearTimeout(id);
    }

    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return <>{children}</>;
}
