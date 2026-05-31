import type { Metadata } from "next";
import { Booking } from "@/components/booking";
import { CTABand } from "@/components/cta-band";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Book Online",
  description:
    "Reserve a time at DMV Express by RegiSmart LLC. Pick a slot that works for you and we'll have your file ready when you arrive.",
  path: "/book",
});

export default function BookPage() {
  return (
    <>
      <Booking />
      <CTABand />
    </>
  );
}
