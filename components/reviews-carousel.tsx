"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { InView } from "@/components/ui/in-view";
import type { NormalizedReview, ReviewsPayload } from "@/lib/google-reviews";

const ROTATE_MS = 7000;

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5 text-plate-blue" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={i < n ? "h-4 w-4 fill-current" : "h-4 w-4 opacity-30"}
        />
      ))}
    </div>
  );
}

function ReviewCard({ r }: { r: NormalizedReview }) {
  return (
    <Card className="flex h-full flex-col p-6 sm:p-7">
      <Stars n={r.rating} />
      <p className="mt-4 text-sm leading-relaxed text-ink/85 line-clamp-6">
        &ldquo;{r.body}&rdquo;
      </p>
      <div className="mt-6 flex items-center gap-3 pt-5 border-t border-plate-sky/30">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-plate-gradient-h text-bg text-sm font-semibold">
          {r.initials}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-ink truncate">{r.name}</p>
          <p className="text-xs text-muted truncate">{r.meta}</p>
        </div>
      </div>
    </Card>
  );
}

function ReviewCardSkeleton() {
  return (
    <Card className="flex h-full min-h-[220px] flex-col p-6 sm:p-7 animate-pulse">
      <div className="h-4 w-24 rounded bg-plate-sky/40" />
      <div className="mt-4 space-y-2">
        <div className="h-3 w-full rounded bg-plate-sky/30" />
        <div className="h-3 w-full rounded bg-plate-sky/30" />
        <div className="h-3 w-4/5 rounded bg-plate-sky/30" />
      </div>
      <div className="mt-auto flex items-center gap-3 pt-5 border-t border-plate-sky/30">
        <div className="h-10 w-10 rounded-full bg-plate-sky/40" />
        <div className="space-y-2">
          <div className="h-3 w-28 rounded bg-plate-sky/40" />
          <div className="h-2 w-20 rounded bg-plate-sky/30" />
        </div>
      </div>
    </Card>
  );
}

export function ReviewsCarousel() {
  const [items, setItems] = useState<NormalizedReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [googleUrl, setGoogleUrl] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/google-reviews");
        if (!res.ok) return;
        const data: ReviewsPayload = await res.json();
        if (cancelled) return;
        if (data.reviews.length > 0) {
          setItems(data.reviews);
          setGoogleUrl(data.url);
        } else if (process.env.NODE_ENV === "development" && data.error) {
          console.warn("[ReviewsCarousel] Google reviews:", data.error);
        }
      } catch {
        // section hidden when empty
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const pages = useMemo(() => {
    const out: NormalizedReview[][] = [];
    for (let i = 0; i < items.length; i += 2) {
      out.push(items.slice(i, i + 2));
    }
    return out;
  }, [items]);

  useEffect(() => {
    if (pages.length <= 1 || paused || reducedMotionRef.current) return;
    const id = window.setInterval(() => {
      setPage((p) => (p + 1) % pages.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [pages.length, paused]);

  useEffect(() => {
    if (page >= pages.length) setPage(0);
  }, [page, pages.length]);

  if (!loading && pages.length === 0) return null;

  const current = pages[page] ?? [];

  return (
    <section
      aria-label="Customer reviews"
      className="relative py-12 sm:py-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <InView className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="fade-up-on-view text-sm font-semibold uppercase tracking-[0.18em] text-plate-blue">
              What clients say
            </p>
            <h2 className="fade-up-on-view fade-up-on-view-1 mt-2 font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-ink">
              Real reviews from real neighbors.
            </h2>
          </div>
          {googleUrl ? (
            <a
              href={googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="fade-up-on-view fade-up-on-view-2 text-xs font-medium uppercase tracking-[0.14em] text-muted transition hover:text-plate-blue"
            >
              View on Google
            </a>
          ) : null}
        </InView>

        <InView className="relative mt-8">
          <div
            key={loading ? "loading" : page}
            className="fade-up-on-view grid gap-5 sm:grid-cols-2"
          >
            {loading
              ? [0, 1].map((i) => (
                  <div key={i}>
                    <ReviewCardSkeleton />
                  </div>
                ))
              : current.map((r, i) => (
                  <div key={`${page}-${i}-${r.name}`}>
                    <ReviewCard r={r} />
                  </div>
                ))}
          </div>

          {!loading && pages.length > 1 && (
            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                type="button"
                aria-label="Previous reviews"
                onClick={() =>
                  setPage((p) => (p - 1 + pages.length) % pages.length)
                }
                className="grid h-9 w-9 place-items-center rounded-full bg-bg ring-1 ring-inset ring-plate-sky/50 text-ink transition hover:ring-plate-blue/60 hover:shadow-soft"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-2" role="tablist">
                {pages.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={i === page}
                    aria-label={`Go to review pair ${i + 1}`}
                    onClick={() => setPage(i)}
                    className={
                      i === page
                        ? "h-2 w-6 rounded-full bg-plate-navy transition-all"
                        : "h-2 w-2 rounded-full bg-plate-sky/70 transition-all hover:bg-plate-blue/70"
                    }
                  />
                ))}
              </div>
              <button
                type="button"
                aria-label="Next reviews"
                onClick={() => setPage((p) => (p + 1) % pages.length)}
                className="grid h-9 w-9 place-items-center rounded-full bg-bg ring-1 ring-inset ring-plate-sky/50 text-ink transition hover:ring-plate-blue/60 hover:shadow-soft"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </InView>
      </div>
    </section>
  );
}
