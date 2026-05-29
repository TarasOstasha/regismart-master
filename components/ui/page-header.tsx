"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

interface PageHeaderProps {
  title: string;
  eyebrow?: string;
  subtitle?: string;
}

const SEGMENT_OVERRIDES: Record<string, string> = {
  faq: "FAQ",
};

function titleCaseFromSegment(segment: string) {
  if (SEGMENT_OVERRIDES[segment]) return SEGMENT_OVERRIDES[segment];
  return segment
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}

export function PageHeader({ title, eyebrow, subtitle }: PageHeaderProps) {
  const pathname = usePathname();
  const segment = pathname.split("/").filter(Boolean)[0] ?? "";
  const currentLabel = segment ? titleCaseFromSegment(segment) : title;

  return (
    <section className="relative overflow-hidden pt-24 pb-10 sm:pt-28 sm:pb-14">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <nav
            aria-label="Breadcrumb"
            className="fade-up flex items-center gap-1.5 text-xs font-medium text-muted"
          >
            <Link
              href="/"
              className="hover:text-ink transition-colors focus-ring rounded"
            >
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-muted/60" />
            <span className="text-ink/80">{currentLabel}</span>
          </nav>

          {eyebrow && (
            <p className="fade-up fade-up-1 mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-plate-blue">
              {eyebrow}
            </p>
          )}

          <h1 className="fade-up fade-up-2 mt-3 font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink leading-[1.05]">
            {title}
          </h1>

          {subtitle && (
            <p className="fade-up fade-up-3 mt-5 max-w-2xl text-lg text-muted leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
