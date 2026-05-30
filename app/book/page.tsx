import type { Metadata } from "next";
import { Booking } from "@/components/booking";
import { CTABand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Book Online | DMV Express by RegiSmart LLC",
  description:
    "Reserve a time at DMV Express by RegiSmart LLC. Pick a slot that works for you and we'll have your file ready when you arrive.",
};

export default function BookPage() {
  return (
    <>
      <Booking />
      <CTABand />
    </>
  );
}
