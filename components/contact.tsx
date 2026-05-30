"use client";

import { useState, useTransition, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  Navigation,
  ChevronRight,
} from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/button";
import { InView } from "@/components/ui/in-view";
import { WaveDivider } from "@/components/ui/wave-divider";
import { sendContact } from "@/app/actions/contact";
import {
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  DIRECTIONS_URL,
  EMAIL,
  EMAIL_HREF,
  HOURS,
  PHONE_DISPLAY,
  PHONE_DISPLAY_2,
  PHONE_HREF,
  PHONE_HREF_2,
} from "@/lib/utils";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pending) return;
    setError(null);
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await sendContact({
        name: String(fd.get("name") ?? ""),
        phone: String(fd.get("phone") ?? ""),
        email: String(fd.get("email") ?? ""),
        service: String(fd.get("service") ?? ""),
        message: String(fd.get("message") ?? ""),
        website: String(fd.get("website") ?? ""),
      });
      if (result.ok) {
        setSubmitted(true);
      } else {
        setError(result.error);
      }
    });
  };

  return (
    <>
      {/* Hero */}
      <section className="relative isolate min-h-[32rem] overflow-hidden pt-24 pb-0 sm:min-h-[38rem] sm:pt-28 lg:min-h-[42rem]">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="absolute inset-0 left-1/2 w-screen -translate-x-1/2">
            <div className="relative h-full min-h-full w-full">
              <Image
                src="/images/contact.webp"
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover object-[center_20%]"
              />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-plate-blue/25 via-plate-white/55 to-plate-white/92" />
        </div>

        <div className="relative z-[2] mx-auto max-w-7xl px-4 pb-12 sm:px-6 sm:pb-14 lg:px-8">
          <div className="max-w-lg">
            <nav
              aria-label="Breadcrumb"
              className="fade-up flex items-center gap-1.5 text-xs font-medium text-muted"
            >
              <Link
                href="/"
                className="rounded hover:text-ink transition-colors focus-ring"
              >
                Home
              </Link>
              <ChevronRight
                className="h-3.5 w-3.5 text-muted/60"
                aria-hidden="true"
              />
              <span className="text-ink/80">Contact</span>
            </nav>

            <div className="max-w-lg">
              <p className="fade-up fade-up-1 mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-plate-blue">
                Visit / Get in touch
              </p>

              <h1 className="fade-up fade-up-2 mt-3 font-display text-4xl font-bold tracking-tight text-ink leading-[1.05] sm:text-5xl lg:text-6xl">
                Stop by, call, or send a note.
              </h1>

              <p className="fade-up fade-up-3 mt-5 max-w-2xl text-lg text-muted leading-relaxed">
                Most messages get a same-day reply during business hours.
                Walk-ins are always welcome.
              </p>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] -mb-px leading-none text-bg"
        >
          <WaveDivider fill="currentColor" className="h-10 sm:h-14" />
        </div>
      </section>

      <section
        id="contact"
        className="relative bg-bg pb-20 pt-14 sm:pb-28 sm:pt-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <InView className="grid gap-10 lg:grid-cols-12">
            {/* left: details */}
            <div className="fade-up-on-view lg:col-span-5 space-y-6">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(`${ADDRESS_LINE_1} ${ADDRESS_LINE_2}`)}`}
                target="_blank"
                rel="noreferrer"
                className="group flex gap-4 rounded-2xl bg-bg p-6 ring-1 ring-inset ring-plate-sky/40 shadow-soft transition-all hover:ring-plate-blue/60 focus-ring"
              >
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-plate-gradient-h text-bg">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="min-w-0 break-words">
                  <p className="text-xs uppercase tracking-wider text-muted">
                    Visit us
                  </p>
                  <p className="mt-0.5 font-semibold text-ink">
                    {ADDRESS_LINE_1}
                  </p>
                  <p className="text-ink">{ADDRESS_LINE_2}</p>
                  <p className="mt-1 text-xs text-accent group-hover:underline">
                    Open in maps →
                  </p>
                </div>
              </a>

              <a
                href={PHONE_HREF}
                className="group flex gap-4 rounded-2xl bg-bg p-6 ring-1 ring-inset ring-plate-sky/40 shadow-soft transition-all hover:ring-plate-blue/60 focus-ring"
              >
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-plate-gradient-h text-bg">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wider text-muted">
                    Call us
                  </p>
                  <p className="mt-0.5 font-semibold text-ink">
                    {PHONE_DISPLAY}
                  </p>
                  <p className="text-sm text-ink/80">
                    or <span className="font-medium">{PHONE_DISPLAY_2}</span>
                  </p>
                </div>
              </a>

              <a
                href={EMAIL_HREF}
                className="group flex gap-4 rounded-2xl bg-bg p-6 ring-1 ring-inset ring-plate-sky/40 shadow-soft transition-all hover:ring-plate-blue/60 focus-ring"
              >
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-plate-gradient-h text-bg">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="min-w-0 break-words">
                  <p className="text-xs uppercase tracking-wider text-muted">
                    Email
                  </p>
                  <p className="mt-0.5 font-semibold text-ink">{EMAIL}</p>
                </div>
              </a>

              <div className="flex gap-4 rounded-2xl bg-bg p-6 ring-1 ring-inset ring-plate-sky/40 shadow-soft">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-plate-gradient-h text-bg">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted">
                    Hours
                  </p>
                  <ul className="mt-1 space-y-0.5 text-sm">
                    {HOURS.map((h) => (
                      <li
                        key={h.d}
                        className="flex items-baseline justify-between gap-6"
                      >
                        <span className="text-ink">{h.d}</span>
                        <span className="font-medium text-ink">{h.h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* right: form */}
            <div className="fade-up-on-view fade-up-on-view-1 lg:col-span-7">
              <div className="rounded-2xl bg-bg p-6 sm:p-8 ring-1 ring-inset ring-plate-sky/40 shadow-soft">
                {submitted ? (
                  <div className="flex min-h-[24rem] flex-col items-center justify-center text-center">
                    <div className="grid h-14 w-14 place-items-center rounded-full bg-success/10 text-success">
                      <CheckCircle2 className="h-7 w-7" />
                    </div>
                    <h3 className="mt-4 font-display text-xl font-semibold text-ink">
                      Got it. We&rsquo;ll be in touch.
                    </h3>
                    <p className="mt-2 max-w-sm text-sm text-muted">
                      Most messages get a reply same-day during business hours.
                      Need it now? Call {PHONE_DISPLAY}.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <h3 className="font-display text-xl font-semibold text-ink">
                      Send a quick message
                    </h3>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Your name" name="name" autoComplete="name" required />
                      <Field label="Phone" name="phone" type="tel" autoComplete="tel" required />
                    </div>
                    <Field label="Email" name="email" type="email" autoComplete="email" />
                    <SelectField
                      label="What do you need?"
                      name="service"
                      options={[
                        "New registration",
                        "Renewal",
                        "Title transfer",
                        "Commercial / IRP",
                        "Plates / sticker",
                        "Other",
                      ]}
                    />
                    <TextareaField
                      label="Message"
                      name="message"
                      placeholder="Tell us about the vehicle, the timeline, or what's tripping you up..."
                    />
                    {/* Honeypot: real users won't fill this; bots will. */}
                    <div aria-hidden="true" className="hidden">
                      <label>
                        Website
                        <input
                          type="text"
                          name="website"
                          tabIndex={-1}
                          autoComplete="off"
                        />
                      </label>
                    </div>
                    {error && (
                      <p
                        role="alert"
                        className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-inset ring-red-200"
                      >
                        {error}
                      </p>
                    )}
                    <Button
                      type="submit"
                      variant="gradient"
                      size="lg"
                      disabled={pending}
                      className="w-full sm:w-auto"
                    >
                      {pending ? "Sending…" : "Send message"}
                    </Button>
                    <p className="text-xs text-muted">
                      By submitting you agree to be contacted about your
                      inquiry. We never sell your info.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </InView>

          <div className="mt-10 w-full">
            <div className="mb-3 flex justify-end">
              <ButtonLink
                href={DIRECTIONS_URL}
                variant="gradient"
                size="sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Navigation className="h-4 w-4" aria-hidden="true" />
                Get Directions
              </ButtonLink>
            </div>
            <div className="overflow-hidden rounded-2xl bg-bg ring-1 ring-inset ring-plate-sky/40 shadow-soft">
              <iframe
                title="DMV Express RegiSmart LLC location map"
                // src="https://www.google.com/maps?q=246+Federal+Road+Suite+D25+Brookfield+CT+06804&output=embed"
                src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=place_id:ChIJTyTy93H554kR2rVwWGCnNiM`}
                width="100%"
                height={420}
                className="block w-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-medium uppercase tracking-wider text-muted">
        {label} {required && <span className="text-accent">*</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        className="mt-1.5 block w-full rounded-xl border-0 bg-surface px-4 py-3 text-ink placeholder:text-muted/60 ring-1 ring-inset ring-plate-sky/50 focus:ring-2 focus:ring-accent focus:outline-none transition"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="block text-xs font-medium uppercase tracking-wider text-muted">
        {label}
      </span>
      <select
        name={name}
        defaultValue=""
        className="mt-1.5 block w-full rounded-xl border-0 bg-surface px-4 py-3 text-ink ring-1 ring-inset ring-plate-sky/50 focus:ring-2 focus:ring-accent focus:outline-none transition"
      >
        <option value="" disabled>
          Choose a service…
        </option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

function TextareaField({
  label,
  name,
  placeholder,
}: {
  label: string;
  name: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-medium uppercase tracking-wider text-muted">
        {label}
      </span>
      <textarea
        name={name}
        rows={4}
        placeholder={placeholder}
        className="mt-1.5 block w-full rounded-xl border-0 bg-surface px-4 py-3 text-ink placeholder:text-muted/60 ring-1 ring-inset ring-plate-sky/50 focus:ring-2 focus:ring-accent focus:outline-none transition resize-none"
      />
    </label>
  );
}
