import type { Metadata } from "next";
import { Contact } from "@/components/contact";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Visit us at 246 Federal Road, Suite D25, Brookfield, CT. Call (203) 460-7061 for same-day registration help, get directions and hours, or send a message.",
  path: "/contact",
});

export default function ContactPage() {
  return <Contact />;
}
