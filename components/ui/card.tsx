import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-bg ring-1 ring-inset ring-plate-sky/40 shadow-soft",
        "transition-all duration-300 hover:ring-plate-blue/50 hover:shadow-[0_24px_60px_-30px_rgba(31,48,124,0.4)]",
        className,
      )}
      {...rest}
    />
  );
}
