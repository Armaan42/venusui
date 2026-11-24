"use client"

import * as React from "react"
import { ArrowRight, Plus } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"

import { SectionLabel } from "./motion-library-motion"

/** Questions and answers. Edit freely. */
const faqs = [
  {
    q: "What do I get with each component?",
    a: "Three ways to use it. Paste it into a visual builder with its structure and code, download a zip with the script, styles, markup, a spec and a demo page, or hand your assistant one prompt that carries everything it needs.",
  },
  {
    q: "Do I need to write code?",
    a: "No. Paste-ready components work without touching code. If you do write code, everything is readable, commented and never minified.",
  },
  {
    q: "Can I use it for client work?",
    a: "Yes. Use any component on as many client sites as you like while your membership is active. You can't resell the components themselves.",
  },
  {
    q: "What happens if I stop paying?",
    a: "Everything you've already shipped keeps working. You stop getting new components and updates, and that's all.",
  },
  {
    q: "Is it accessible?",
    a: "Every component follows the reduced-motion setting, works with a keyboard where it's interactive, and keeps its content readable without the animation.",
  },
]

/** Questions people ask before they start: one answer open at a time. */
export function MotionLibraryFaq() {
  const [open, setOpen] = React.useState(0)
  const id = React.useId()

  return (
    <section id="faq" aria-labelledby="ml-faq-title" className="grid gap-12 px-4 py-24 sm:px-6 sm:py-32 lg:grid-cols-[1fr_1.3fr]">
      <div>
        <SectionLabel index="04">What people ask before they start</SectionLabel>
        <h2 id="ml-faq-title" className="mt-5 text-5xl leading-[0.95] font-medium tracking-[-0.04em] sm:text-7xl">
          Asked,
          <br />
          <span className="text-ml-muted">answered.</span>
        </h2>
        <a
          href="#"
          className="group mt-8 inline-flex items-center gap-2 border-b border-ml-ink/30 pb-1 text-sm outline-none hover:border-ml-ink focus-visible:ring-2 focus-visible:ring-ml-accent"
        >
          All the questions
          <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
      <ul className="border-t border-ml-line">
        {faqs.map((faq, i) => {
          const isOpen = open === i
          return (
            <li key={faq.q} className="border-b border-ml-line">
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`${id}-${i}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="group flex w-full items-center justify-between gap-6 py-5 text-left text-lg outline-none focus-visible:ring-2 focus-visible:ring-ml-accent sm:text-xl"
                >
                  <span className="transition-transform duration-300 group-hover:translate-x-1">{faq.q}</span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "grid size-7 shrink-0 place-items-center rounded-full border transition-[rotate,background-color,border-color,color] duration-300",
                      isOpen ? "rotate-45 border-ml-accent bg-ml-accent text-ml-on-accent" : "border-ml-line",
                    )}
                  >
                    <Plus className="size-3.5" />
                  </span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    id={`${id}-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-xl pb-6 leading-7 text-ml-muted">{faq.a}</p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
