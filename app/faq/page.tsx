import type { Metadata } from "next";
import { FAQ } from "@/components/faq";
import { CTABand } from "@/components/cta-band";
import { faqs } from "@/data/faq";
import { faqPageSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "FAQ",
  description:
    "Answers to common CT vehicle registration questions — documents to bring, out-of-state transfers, dealer and fleet services, payments, and DMV compliance.",
  path: "/faq",
});

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema(faqs)) }}
      />
      <FAQ />
      <CTABand />
    </>
  );
}
