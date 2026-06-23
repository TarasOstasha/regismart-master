// Lightweight in-process sliding-window rate limiter, keyed by client IP.
//
// NOTE: state lives in the server instance's memory. On serverless this is
// per-warm-instance — it resets on cold start and isn't shared across
// instances. For a low-traffic marketing contact form that still blocks
// rapid floods from a single source and adds a real cost ceiling. If the site
// grows or runs many concurrent instances, swap this for a shared store
// (e.g. Upstash Ratelimit) keeping the same call signature.

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export type RateLimitResult = { ok: true } | { ok: false; retryAfter: number };

// Opportunistically drop expired buckets so the Map can't grow unbounded
// across many distinct IPs. Cheap; only sweeps when the Map gets large.
function sweep(now: number) {
  if (buckets.size < 5000) return;
  for (const [key, b] of buckets) {
    if (now >= b.resetAt) buckets.delete(key);
  }
}

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const bucket = buckets.get(key);
  if (!bucket || now >= bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }

  if (bucket.count >= limit) {
    return { ok: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
  }

  bucket.count += 1;
  return { ok: true };
}
