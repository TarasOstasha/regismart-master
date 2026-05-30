"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type InViewProps = {
  children: ReactNode;
  className?: string;
  /** rootMargin bottom offset - matches the previous framer-motion `margin: "-80px"`. */
  margin?: string;
  id?: string;
  /** Optional callback fired once when the element enters the viewport. */
  onInView?: () => void;
};

/**
 * Tiny IntersectionObserver wrapper that toggles an `.in-view` class on
 * itself when it enters the viewport. Pair with `.fade-up-on-view` (and
 * stagger classes `.fade-up-on-view-1..8`) on descendants to recreate the
 * framer-motion `whileInView` fade-up pattern without shipping the
 * framer-motion runtime to the client.
 *
 * The wrapper itself is the only "use client" island the consuming
 * component needs - the children render as RSC and don't hydrate.
 */
export function InView({
  children,
  className = "",
  margin = "-80px",
  id,
  onInView,
}: InViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      onInView?.();
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          onInView?.();
          obs.disconnect();
        }
      },
      { rootMargin: `0px 0px ${margin} 0px` },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [margin, onInView]);

  return (
    <div
      ref={ref}
      id={id}
      className={`${className}${inView ? " in-view" : ""}`}
    >
      {children}
    </div>
  );
}
