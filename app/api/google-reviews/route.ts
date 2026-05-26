import { NextResponse } from "next/server";

export const revalidate = 60 * 60 * 24; // 24h ISR

type GoogleReview = {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
  profile_photo_url?: string;
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

export async function GET() {
  const placeId = process.env.GOOGLE_PLACE_ID;
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  const empty: ReviewsPayload = {
    source: "fallback",
    rating: null,
    total: null,
    url: null,
    reviews: [],
  };

  if (!placeId || !apiKey || placeId.startsWith("REPLACE_") || apiKey.startsWith("REPLACE_")) {
    return NextResponse.json(
      { ...empty, error: "Google Places credentials not configured" },
      { status: 200 },
    );
  }

  const url =
    `https://maps.googleapis.com/maps/api/place/details/json` +
    `?place_id=${encodeURIComponent(placeId)}` +
    `&fields=name,rating,user_ratings_total,reviews,url` +
    `&key=${encodeURIComponent(apiKey)}`;

  try {
    const res = await fetch(url, { next: { revalidate } });
    if (!res.ok) {
      return NextResponse.json({ ...empty, error: `Google API ${res.status}` });
    }

    const data: { result?: GooglePlaceResult; status?: string; error_message?: string } =
      await res.json();

    if (data.status && data.status !== "OK") {
      return NextResponse.json({
        ...empty,
        error: data.error_message || data.status,
      });
    }

    const result = data.result ?? {};
    const payload: ReviewsPayload = {
      source: "google",
      rating: result.rating ?? null,
      total: result.user_ratings_total ?? null,
      url: result.url ?? null,
      reviews: (result.reviews ?? []).map(normalize),
    };
    return NextResponse.json(payload);
  } catch (err) {
    return NextResponse.json({
      ...empty,
      error: err instanceof Error ? err.message : "fetch failed",
    });
  }
}
