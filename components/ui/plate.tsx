"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

function CTSilhouette({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 40" className={className} aria-hidden="true">
      <path
        d="M5 8h22l4 -4h12l3 4h13v8h-2l-2 4l-3 -1l-1 4h-9l-2 4h-8l-2 -3l-7 1l-3 -2l-4 1l-3 -3l-3 2l-3 -4l-2 -1z"
        fill="currentColor"
      />
    </svg>
  );
}

interface LicensePlateProps {
  text?: string;
  subtext?: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  tilt?: boolean;
  children?: ReactNode;
}

const sizes: Record<NonNullable<LicensePlateProps["size"]>, string> = {
  sm: "w-44 h-20 text-xl",
  md: "w-72 h-32 text-3xl",
  lg: "w-[28rem] h-52 text-6xl",
  xl: "w-full max-w-[32rem] aspect-[2/1] text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl",
};

const plateBase = cn(
  "relative grid place-items-center select-none",
  "rounded-[1.25rem] border border-white/40 bg-plate-gradient",
  "shadow-plate",
);

function PlateInner({
  text,
  subtext,
  children,
}: {
  text: string;
  subtext?: string;
  children?: ReactNode;
}) {
  return (
    <>
      {/* mounting holes */}
      <span className="absolute left-3 top-2 h-2 w-2 rounded-full bg-white/80 ring-1 ring-plate-navy/30" />
      <span className="absolute right-3 top-2 h-2 w-2 rounded-full bg-white/80 ring-1 ring-plate-navy/30" />
      <span className="absolute left-3 bottom-2 h-2 w-2 rounded-full bg-white/80 ring-1 ring-plate-navy/30" />
      <span className="absolute right-3 bottom-2 h-2 w-2 rounded-full bg-white/80 ring-1 ring-plate-navy/30" />

      {/* CT silhouette top-left */}
      <CTSilhouette className="absolute left-7 top-4 h-5 w-8 text-plate-navy/90" />

      {/* main text */}
      <div className="relative flex flex-col items-center">
        <span
          className="font-display font-extrabold tracking-[0.08em] text-plate-navy drop-shadow-[0_1px_0_rgba(255,255,255,0.5)] whitespace-nowrap"
          style={{ letterSpacing: "0.06em" }}
        >
          {text}
        </span>
        {subtext && (
          <span className="mt-1 text-[0.55em] font-semibold uppercase tracking-[0.32em] text-plate-navy/70 whitespace-nowrap">
            {subtext}
          </span>
        )}
        {children}
      </div>
    </>
  );
}

export function LicensePlate({
  text = "REGISMART",
  subtext = "CONNECTICUT · CONSTITUTION STATE",
  className,
  size = "lg",
  tilt = false,
  children,
}: LicensePlateProps) {
  // Detect touch/coarse-pointer devices — on those we skip framer-motion
  // entirely (no mouse to tilt with, and spring physics waste CPU/battery).
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-1, 1], [4, -4]), {
    stiffness: 120,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mx, [-1, 1], [-6, 6]), {
    stiffness: 120,
    damping: 18,
  });

  const handleMove = (e: React.MouseEvent) => {
    if (!tilt || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    mx.set(x * 2);
    my.set(y * 2);
  };
  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  // On touch devices: plain div, no framer-motion overhead
  if (isTouch) {
    return (
      <div className={cn(plateBase, sizes[size], className)}>
        <PlateInner text={text} subtext={subtext}>
          {children}
        </PlateInner>
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={tilt ? { rotateX, rotateY, transformStyle: "preserve-3d" } : undefined}
      className={cn(plateBase, sizes[size], className)}
    >
      <PlateInner text={text} subtext={subtext}>
        {children}
      </PlateInner>
    </motion.div>
  );
}
