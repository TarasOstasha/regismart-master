"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Minus, Plus } from "lucide-react";
import { faqs } from "@/data/faq";
import { fadeUp, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { InView } from "@/components/ui/in-view";
import { WaveDivider } from "@/components/ui/wave-divider";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate min-h-[32rem] overflow-hidden pt-24 pb-0 sm:min-h-[38rem] sm:pt-28 lg:min-h-[42rem]">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="absolute inset-0 left-1/2 w-screen -translate-x-1/2">
            <div className="relative h-full min-h-full w-full">
              <Image
                src="/images/wave-bg.webp"
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
          <div className="max-w-3xl">
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
              <ChevronRight className="h-3.5 w-3.5 text-muted/60" aria-hidden="true" />
              <span className="text-ink/80">FAQ</span>
            </nav>

            <p className="fade-up fade-up-1 mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-plate-blue">
              Questions
            </p>

            <h1 className="fade-up fade-up-2 mt-3 font-display text-4xl font-bold tracking-tight text-ink leading-[1.05] sm:text-5xl lg:text-6xl">
              Quick answers to common ones.
            </h1>

            <p className="fade-up fade-up-3 mt-5 max-w-2xl text-lg text-muted leading-relaxed">
              Don&apos;t see your situation here? Call or stop in. We&apos;ve
              probably handled it before.
            </p>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] -mb-px leading-none text-bg"
        >
          <WaveDivider fill="currentColor" className="h-10 sm:h-14" />
        </div>
      </section>

      {/* Accordion */}
      <section id="faq" className="relative bg-bg pb-20 pt-14 sm:pb-28 sm:pt-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <InView className="text-center">
            <p className="fade-up-on-view text-sm font-semibold uppercase tracking-[0.18em] text-plate-blue">
              FAQ
            </p>
            <h2 className="fade-up-on-view fade-up-on-view-1 mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Answers before you ask.
            </h2>
            <div
              aria-hidden="true"
              className="fade-up-on-view fade-up-on-view-2 gradient-divider mx-auto mt-6 max-w-xs"
            />
          </InView>

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger(0.08, 0.05)}
            className="mt-12"
          >
            {faqs.map((item, i) => {
              const isOpen = open === i;
              return (
                <motion.li
                  key={item.q}
                  variants={fadeUp}
                  className="border-b border-plate-sky/35 first:border-t"
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left focus-ring"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-lg font-semibold text-ink sm:text-xl">
                      {item.q}
                    </span>
                    <span
                      className={cn(
                        "grid h-9 w-9 shrink-0 place-items-center rounded-full transition-all duration-200",
                        isOpen
                          ? "bg-plate-gradient-h text-bg shadow-soft"
                          : "bg-bg text-ink ring-1 ring-inset ring-plate-sky/60 group-hover:bg-surface",
                      )}
                    >
                      {isOpen ? (
                        <Minus className="h-4 w-4" strokeWidth={2.5} />
                      ) : (
                        <Plus className="h-4 w-4" strokeWidth={2.5} />
                      )}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.3,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="mb-6 rounded-2xl bg-surface px-5 py-4 ring-1 ring-inset ring-plate-sky/35 sm:px-6 sm:py-5">
                          <p className="pr-4 text-muted leading-relaxed sm:pr-8">
                            {item.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </section>
    </>
  );
}
