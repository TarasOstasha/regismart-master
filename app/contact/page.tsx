import { PageHeader } from "@/components/ui/page-header";
import { Contact } from "@/components/contact";

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Visit / Get in touch"
        title="Stop by, call, or send a note."
        subtitle="Most messages get a same-day reply during business hours. Walk-ins are always welcome."
      />
      <Contact />
    </>
  );
}
