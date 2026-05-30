export const REVIEWS_REVALIDATE = 60 * 60 * 24; // 24h

type GoogleReview = {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
  time: number;
};

type GooglePlaceResult = {
  name?: string;
  rating?: number;
  user_ratings_total?: number;
  url?: string;
  reviews?: GoogleReview[];
};

export type NormalizedReview = {
  name: string;
  initials: string;
  rating: number;
  body: string;
  meta: string;
};

export function formatReviewCount(total: number) {
  if (total >= 1000) return `${Math.floor(total / 100) * 100}+`;
  if (total >= 100) return `${Math.floor(total / 10) * 10}+`;
  return `${total}+`;
}

export type ReviewsPayload = {
  source: "google" | "fallback";
  rating: number | null;
  total: number | null;
  url: string | null;
  reviews: NormalizedReview[];
  error?: string;
};

function initialsFrom(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "?";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

function normalize(r: GoogleReview): NormalizedReview {
  return {
    name: r.author_name,
    initials: initialsFrom(r.author_name),
    rating: r.rating,
    body: r.text,
    meta: r.relative_time_description,
  };
}

const empty: ReviewsPayload = {
  source: "fallback",
  rating: null,
  total: null,
  url: null,
  reviews: [],
};

// Dev-only sample data so the reviews UI is visible locally when the Google
// API is unreachable (offline, sandboxed, or unconfigured). Never returned
// in production — `withDevFallback` only kicks in when NODE_ENV === "development".
const DEV_SAMPLE: ReviewsPayload = {
  source: "fallback",
  rating: 5,
  total: 78,
  url: "https://maps.google.com/?cid=2537399472312333786",
  reviews: [
    { name: "Alex C.", initials: "AC", rating: 5, body: "Walked in, walked out registered in 20 minutes. Saved me from a multi-week DMV wait.", meta: "8 months ago" },
    { name: "Maria P.", initials: "MP", rating: 5, body: "Friendly staff, fair pricing, handled my out-of-state transfer without a single hiccup.", meta: "5 months ago" },
    { name: "Devon R.", initials: "DR", rating: 5, body: "Best registration experience I've ever had. Will absolutely recommend to everyone.", meta: "3 months ago" },
    { name: "Sasha K.", initials: "SK", rating: 5, body: "Saturday hours, no appointment, in and out fast. These folks know what they're doing.", meta: "2 months ago" },
    { name: "Jordan T.", initials: "JT", rating: 5, body: "Renewed my plate sticker in 10 minutes flat. Worth every penny of the service fee.", meta: "6 weeks ago" },
    { name: "Priya M.", initials: "PM", rating: 5, body: "Walked me through everything for my used car purchase. Couldn't ask for better service.", meta: "1 month ago" },
  ],
};

function withDevFallback(p: ReviewsPayload): ReviewsPayload {
  if (p.reviews.length > 0) return p;
  if (process.env.NODE_ENV !== "development") return p;
  return DEV_SAMPLE;
}

async function fetchGoogleReviewsImpl(): Promise<ReviewsPayload> {
  const placeId = process.env.GOOGLE_PLACE_ID;
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!placeId || !apiKey || placeId.startsWith("REPLACE_") || apiKey.startsWith("REPLACE_")) {
    return { ...empty, error: "Google Places credentials not configured" };
  }

  const url =
    `https://maps.googleapis.com/maps/api/place/details/json` +
    `?place_id=${encodeURIComponent(placeId)}` +
    `&fields=name,rating,user_ratings_total,reviews,url` +
    `&key=${encodeURIComponent(apiKey)}`;

  try {
    const res = await fetch(url, { next: { revalidate: REVIEWS_REVALIDATE } });
    if (!res.ok) {
      return { ...empty, error: `Google API ${res.status}` };
    }

    const data: { result?: GooglePlaceResult; status?: string; error_message?: string } =
      await res.json();

    if (data.status && data.status !== "OK") {
      return { ...empty, error: data.error_message || data.status };
    }

    const result = data.result ?? {};
    const reviews = (result.reviews ?? [])
      .filter((r) => r.text?.trim())
      .sort((a, b) => b.time - a.time)
      .map(normalize);

    return {
      source: "google",
      rating: result.rating ?? null,
      total: result.user_ratings_total ?? null,
      url: result.url ?? null,
      reviews,
    };
  } catch (err) {
    return {
      ...empty,
      error: err instanceof Error ? err.message : "fetch failed",
    };
  }
}

export async function getGoogleReviews(): Promise<ReviewsPayload> {
  return withDevFallback(await fetchGoogleReviewsImpl());
}
