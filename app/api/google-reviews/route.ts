import { NextResponse } from "next/server";
import { getGoogleReviews, REVIEWS_REVALIDATE } from "@/lib/google-reviews";

export const revalidate = REVIEWS_REVALIDATE;

export type { NormalizedReview, ReviewsPayload } from "@/lib/google-reviews";

export async function GET() {
  const payload = await getGoogleReviews();
  return NextResponse.json(payload);
}
