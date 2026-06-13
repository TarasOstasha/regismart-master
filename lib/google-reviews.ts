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
  return fetchGoogleReviewsImpl();
}
