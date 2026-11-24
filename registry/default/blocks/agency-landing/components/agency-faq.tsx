"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"

import { AgencyPageHeader } from "./agency-page-header"
import { AgencyShell } from "./agency-shell"

/** Questions by topic. Edit freely; each topic becomes a tab. */
const topics: { name: string; items: { q: string; a: string }[] }[] = [
  {
    name: "General",
    items: [
      {
        q: "What does Arcwell do?",
        a: "We design and build brands, websites and apps, and help them grow after launch: product design, web development, brand strategy and digital marketing, done by one team.",
      },
      {
        q: "How long does a typical project take?",
        a: "Eight to twelve weeks for most websites and first app releases. Brand identity work usually takes four to six weeks.",
      },
      {
        q: "What is your process?",
        a: "Two weeks of discovery and planning, then design and build side by side with working pages every Friday, then launch, training and a month of support.",
      },
      {
        q: "Do you work with teams outside Europe?",
        a: "Yes. We work in English, keep a weekly call at a time that suits you, and travel for the kick-off workshop.",
      },
    ],
  },
  {
    name: "Projects",
    items: [
      {
        q: "Who owns the final work?",
        a: "You do. Once the final invoice is paid, the designs, code, content and accounts are yours, and we hand over everything.",
      },
      {
        q: "Can we update the site ourselves?",
        a: "That's the point. Every site comes with a content editor set up for your team, a training session and written notes.",
      },
      {
        q: "Do you take on small projects?",
        a: "If they're well defined, yes: a landing page, a design system audit or a checkout fix. Ask and we'll say honestly whether we're the right fit.",
      },
    ],
  },
  {
    name: "Billing",
    items: [
      {
        q: "How do you price projects?",
        a: "Retainers are monthly. Single projects get a fixed quote for each phase, agreed before that phase starts, so there are no surprise invoices.",
      },
      {
        q: "Do you offer retainers?",
        a: "Yes. Starter and Growth are monthly retainers; Scale is shaped around your roadmap. After the first three months they run month to month.",
      },
      {
        q: "When do you invoice?",
        a: "Retainers at the start of each month. Projects in three parts: at kick-off, halfway through, and at launch.",
      },
    ],
  },
  {
    name: "Privacy",
    items: [
      { q: "Will you sign an NDA?", a: "Of course. Send yours, or we'll send ours, before the first detailed conversation." },
      {
        q: "Where is our data stored?",
        a: "Project files stay in your accounts where possible. Our own tools keep data in the EU, and we remove project access when the work ends.",
      },
    ],
  },
]

/** All the questions people ask before getting in touch, by topic. Render it from `app/faq/page.tsx`. */
export function AgencyFaq() {
  const [topic, setTopic] = React.useState(0)
  const [open, setOpen] = React.useState(0)
  const tabsId = React.useId()

  return (
    <AgencyShell page="faq">
      <section aria-labelledby="faq-page-title" className="pb-20 sm:pb-28">
        <AgencyPageHeader
          id="faq-page-title"
          eyebrow="FAQ"
          title="Questions about"
          muted="working with Arcwell"
          lead="Our process, timelines, retainers and what you own at the end. Can't find your question? Ask us below and we'll reply within one working day."
        />

        <div className="mx-auto mt-14 max-w-4xl px-4 sm:px-6">
          <div role="tablist" aria-label="Topics" className="flex flex-wrap justify-center gap-1 border-b">
            {topics.map((item, i) => (
              <button
                key={item.name}
                id={`${tabsId}-tab-${i}`}
                type="button"
                role="tab"
                aria-selected={topic === i}
                aria-controls={`${tabsId}-panel`}
                tabIndex={topic === i ? 0 : -1}
                onClick={() => {
                  setTopic(i)
                  setOpen(0)
                }}
                onKeyDown={(event) => {
                  if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return
                  const next = (i + (event.key === "ArrowRight" ? 1 : -1) + topics.length) % topics.length
                  setTopic(next)
                  setOpen(0)
                  document.getElementById(`${tabsId}-tab-${next}`)?.focus()
                }}
                className="relative px-4 pt-2 pb-3 text-sm text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-agency-accent/40 aria-selected:font-medium aria-selected:text-foreground sm:px-6"
              >
                {item.name}
                {topic === i ? (
                  <motion.span layoutId="faq-tab" className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-agency-accent" />
                ) : null}
              </button>
            ))}
          </div>

          <div id={`${tabsId}-panel`} role="tabpanel" aria-labelledby={`${tabsId}-tab-${topic}`} className="mt-10">
            <AnimatePresence mode="wait" initial={false}>
              <motion.ul
                key={topic}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="grid gap-3"
              >
                {topics[topic].items.map((item, i) => {
                  const isOpen = open === i
                  return (
                    <li
                      key={item.q}
                      className={cn(
                        "rounded-2xl bg-agency-card ring-1 transition-[box-shadow] duration-300",
                        isOpen ? "shadow-[0_20px_44px_-26px_rgb(0_0_0/0.35)] ring-agency-accent/30" : "ring-border/60",
                      )}
                    >
                      <h2>
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={`${tabsId}-answer-${i}`}
                          onClick={() => setOpen(isOpen ? -1 : i)}
                          className="flex w-full items-center justify-between gap-6 rounded-2xl px-6 py-5 text-left font-medium outline-none hover:text-agency-accent focus-visible:ring-3 focus-visible:ring-agency-accent/40 sm:text-lg"
                        >
                          {item.q}
                          <span
                            aria-hidden="true"
                            className={cn(
                              "grid size-8 shrink-0 place-items-center rounded-lg ring-1 transition-colors",
                              isOpen ? "bg-agency-accent text-white ring-agency-accent" : "bg-agency-surface ring-border/70",
                            )}
                          >
                            <ChevronDown className={cn("size-4 transition-transform duration-300", isOpen && "rotate-180")} />
                          </span>
                        </button>
                      </h2>
                      <AnimatePresence initial={false}>
                        {isOpen ? (
                          <motion.div
                            id={`${tabsId}-answer-${i}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="mx-6 border-t pt-4 pb-6 leading-7 text-muted-foreground">{item.a}</p>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </li>
                  )
                })}
              </motion.ul>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </AgencyShell>
  )
}
