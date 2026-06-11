"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { ComplianceCheckLinks } from "@/components/compliance-check-links";
import { faqs } from "@/data/faq";
import { fadeUp, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { InView } from "@/components/ui/in-view";
import { PageHeader } from "@/components/ui/page-header";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <PageHeader
        eyebrow="Questions"
        title="Quick answers to common ones."
        subtitle="Don't see your situation here? Call or stop in. We've probably handled it before."
      />

      {/* Accordion */}
      <section id="faq" className="relative pb-20 pt-4 sm:pb-28 sm:pt-6">
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
                          : "bg-white text-ink ring-1 ring-inset ring-plate-sky/60 group-hover:bg-surface",
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
                          {item.q === "What if my vehicle has compliance issues?" ? (
                            <div className="pr-4 text-muted leading-relaxed sm:pr-8">
                              <p>
                                Run a free CT DMV compliance check before you
                                visit. If you&apos;re flagged, we&apos;ll walk
                                you through it.
                              </p>
                              <div className="mt-3 text-sm text-ink/85">
                                <ComplianceCheckLinks />
                              </div>
                            </div>
                          ) : (
                            <p className="pr-4 text-muted leading-relaxed sm:pr-8">
                              {item.a}
                            </p>
                          )}
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
