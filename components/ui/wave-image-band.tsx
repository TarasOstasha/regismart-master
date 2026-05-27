"use client";

import Image from "next/image";
import { useEffect, useId, useRef } from "react";
import { cn } from "@/lib/utils";

const WAVE_BG = "/images/wave-bg.webp";

/** Top + bottom wave edges (matches default WaveDivider curve). */
const BAND_PATH =
  "M0,48 C240,80 480,0 720,32 C960,64 1200,16 1440,48" +
  " L1440,112" +
  " C1200,64 960,112 720,128 C480,144 240,80 0,120" +
  " Z";

type Props = {
  className?: string;
  imageSrc?: string;
};

export function WaveImageBand({ className, imageSrc = WAVE_BG }: Props) {
  const clipId = useId().replace(/:/g, "");
  const rootRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let raf = 0;
    const update = () => {
      const root = rootRef.current;
      const image = imageRef.current;
      if (!root || !image) return;

      const { top, height } = root.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = (top + height * 0.5 - vh * 0.5) / vh;
      const y = progress * -96;
      image.style.transform = `translate3d(0, ${y}px, 0)`;
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
    <div
      ref={rootRef}
      aria-hidden
      className={cn(
        "relative h-24 w-full overflow-hidden bg-surface sm:h-[7.75rem]",
        className,
      )}
    >
      <svg width="0" height="0" className="absolute" aria-hidden>
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path
              transform="scale(0.000694444 0.00625)"
              d={BAND_PATH}
            />
          </clipPath>
        </defs>
      </svg>

      <div
        className="absolute inset-0"
        style={{ clipPath: `url(#${clipId})` }}
      >
        <div
          ref={imageRef}
          className="absolute inset-x-0 top-1/2 h-[220%] w-full -translate-y-1/2 will-change-transform"
        >
          <Image
            src={imageSrc}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[center_35%]"
          />
        </div>
      </div>
    </div>
  );
}
