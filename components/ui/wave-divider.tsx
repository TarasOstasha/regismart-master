"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { plateGradientColorAt } from "@/lib/plate-gradient";

type Props = {
  /** "down" curves into the section below; "up" curves into the section above */
  flip?: boolean;
  /** background color the wave should match (the receiving section's bg) */
  fill?: string;
  /** use the site plate gradient (#4a9bd5 → #f0f4f8) as a static SVG gradient */
  gradient?: boolean;
  /**
   * Match the fixed page plate gradient at this wave's bottom edge —
   * stays in sync with the section below while scrolling.
   */
  syncViewportFill?: boolean;
  className?: string;
  symmetric?: boolean;
};

export function WaveDivider({
  flip = false,
  fill = "rgb(var(--surface))",
  gradient = false,
  syncViewportFill = false,
  className,
  symmetric = false,
}: Props) {
  const gradId = `plate-gradient-${useId().replace(/:/g, "")}`;
  const svgRef = useRef<SVGSVGElement>(null);
  const [syncedFill, setSyncedFill] = useState(fill);

  // Percent-based viewBox so the curve stays mirror-symmetric when stretched (preserveAspectRatio="none").
  const viewBox = symmetric ? "0 0 100 10" : "0 0 1440 80";
  const path = symmetric
    ? "M0,5 Q50,0 100,5 L100,10 L0,10 Z"
    : "M0,40 C240,80 480,0 720,32 C960,64 1200,16 1440,48 L1440,80 L0,80 Z";

  useEffect(() => {
    if (!syncViewportFill) return;

    const update = () => {
      const el = svgRef.current;
      if (!el) return;
      const { bottom } = el.getBoundingClientRect();
      setSyncedFill(plateGradientColorAt(bottom, window.innerHeight));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [syncViewportFill]);

  const resolvedFill = syncViewportFill
    ? syncedFill
    : gradient
      ? `url(#${gradId})`
      : fill;

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      viewBox={viewBox}
      preserveAspectRatio="none"
      className={cn(
        "block h-12 w-full sm:h-16",
        flip && "rotate-180",
        className,
      )}
    >
      {gradient && !syncViewportFill && (
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4a9bd5" />
            <stop offset="100%" stopColor="#f0f4f8" />
          </linearGradient>
        </defs>
      )}
      <path d={path} fill={resolvedFill} />
    </svg>
  );
}
