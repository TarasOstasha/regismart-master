import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "soft" | "solid" | "plate" | "outline";

const variants: Record<Variant, string> = {
  soft: "bg-surface text-ink/80 ring-1 ring-inset ring-plate-sky/60",
  solid: "bg-ink text-bg",
  plate:
    "bg-plate-gradient-h text-bg ring-1 ring-inset ring-white/30 shadow-[0_1px_0_rgba(255,255,255,0.4)_inset]",
  outline: "bg-transparent text-ink/80 ring-1 ring-inset ring-ink/15",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: Variant;
}

export function Badge({ variant = "soft", className, ...rest }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-wide",
        variants[variant],
        className,
      )}
      {...rest}
    />
  );
}
