"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { plateGradientColorAt } from "@/lib/plate-gradient";

type Props = {
  /** "down" curves into the section below; "up" curves into the section above */
  flip?: boolean;
  /** background color the wave should match (the receiving section's bg) */
  fill?: string;
  /** Fill the wave shape with a tiled/cover image (e.g. /images/wave-bg.webp). */
  imageFill?: string;
  /** use the site plate gradient (#4a9bd5 → #f0f4f8) as a static SVG gradient */
  gradient?: boolean;
  /**
   * Match the fixed page plate gradient at this wave's bottom edge -
   * stays in sync with the section below while scrolling.
   */
  syncViewportFill?: boolean;
  className?: string;
  symmetric?: boolean;
};

export function WaveDivider({
  flip = false,
  fill = "rgb(var(--surface))",
  imageFill,
  gradient = false,
  syncViewportFill = false,
  className,
  symmetric = false,
}: Props) {
  const gradId = `plate-gradient-${useId().replace(/:/g, "")}`;
  const patternId = `wave-image-${useId().replace(/:/g, "")}`;
  const svgRef = useRef<SVGSVGElement>(null);
  const [syncedFill, setSyncedFill] = useState(fill);
  const [imageOffset, setImageOffset] = useState(0);

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

  useEffect(() => {
    if (!imageFill) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let raf = 0;
    const update = () => {
      const el = svgRef.current;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = (top + height * 0.5 - vh * 0.5) / vh;
      setImageOffset(progress * -72);
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
  }, [imageFill]);

  const resolvedFill = imageFill
    ? `url(#${patternId})`
    : syncViewportFill
      ? syncedFill
      : gradient
        ? `url(#${gradId})`
        : fill;

  const patternHeight = symmetric ? 10 : 80;

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
      <defs>
        {imageFill && (
          <pattern
            id={patternId}
            patternUnits="userSpaceOnUse"
            width="1440"
            height={patternHeight}
            x="0"
            y="0"
          >
            <image
              href={imageFill}
              width="1440"
              height={patternHeight * 3}
              y={imageOffset}
              preserveAspectRatio="xMidYMid slice"
            />
          </pattern>
        )}
        {gradient && !syncViewportFill && !imageFill && (
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4a9bd5" />
            <stop offset="100%" stopColor="#f0f4f8" />
          </linearGradient>
        )}
      </defs>
      <path d={path} fill={resolvedFill} />
    </svg>
  );
}
