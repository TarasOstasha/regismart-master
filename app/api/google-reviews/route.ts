import { NextResponse } from "next/server";
import { getGoogleReviews } from "@/lib/google-reviews";

// 24h. Must be a static literal — Next.js can't read an imported constant here.
export const revalidate = 86400;

export type { NormalizedReview, ReviewsPayload } from "@/lib/google-reviews";

export async function GET() {
  const payload = await getGoogleReviews();
  return NextResponse.json(payload);
}
