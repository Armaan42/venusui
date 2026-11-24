"use client"

import * as React from "react"
import { ArrowUp } from "lucide-react"
import { motion, useInView } from "motion/react"

const columns = [
  { title: "Pages", links: ["Home", "Library", "Pricing", "FAQ", "Changelog"] },
  {
    title: "The library",
    links: ["Browse it", "Families", "Free components", "Tutorials", "Cursor effects", "In your assistant", "What's new"],
  },
  { title: "Membership", links: ["Plans", "Sign in", "Support"] },
  { title: "Legal", links: ["Terms of service", "Licence", "Refund policy", "Privacy policy", "Legal notice"] },
]

const WORD = "Orrery"

/**
 * A light footer that sits underneath the page: on wide screens the dark page
 * lifts away to reveal it. The giant wordmark rises letter by letter when it
 * comes into view.
 */
export function MotionLibraryFooter() {
  const wordRef = React.useRef<HTMLParagraphElement>(null)
  const inView = useInView(wordRef, { once: true, amount: 0.4 })

  return (
    <footer className="bottom-0 z-0 overflow-hidden bg-ml-paper px-4 pt-20 text-ml-paper-ink sm:px-6 lg:sticky">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <p className="font-mono text-[11px] tracking-[0.14em] uppercase opacity-70">Your next launch starts here</p>
          <h2 className="mt-5 text-4xl leading-[0.95] font-medium tracking-[-0.04em] sm:text-6xl">
            Make the site
            <br />
            <span className="opacity-55">people talk about.</span>
          </h2>
          <div className="mt-8 flex flex-wrap gap-2">
            <a
              href="#pricing"
              className="inline-flex h-10 items-center rounded-md bg-ml-paper-ink px-4 text-sm font-medium text-ml-paper outline-none focus-visible:ring-2 focus-visible:ring-ml-accent"
            >
              Get access
            </a>
            <a
              href="#library"
              className="inline-flex h-10 items-center rounded-md border border-ml-paper-ink/25 px-4 text-sm outline-none hover:bg-ml-paper-ink/5 focus-visible:ring-2 focus-visible:ring-ml-accent"
            >
              Open the library
            </a>
          </div>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="font-mono text-[11px] tracking-[0.14em] uppercase opacity-70">{column.title}</h3>
              <ul className="mt-4 space-y-2 text-sm">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="rounded-sm outline-none hover:underline hover:underline-offset-4 focus-visible:ring-2 focus-visible:ring-ml-accent"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-ml-paper-ink/15 pt-5 font-mono text-[10px] tracking-[0.14em] uppercase opacity-80">
        <span>© 2026 Orrery</span>
        <a
          href="#top"
          className="inline-flex items-center gap-1 rounded-sm outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ml-accent"
        >
          Back to the top
          <ArrowUp aria-hidden="true" className="size-3" />
        </a>
      </div>
      <p
        ref={wordRef}
        aria-hidden="true"
        className="-mb-[0.18em] flex text-[31vw] leading-[0.95] lg:text-[24vw] font-medium tracking-[-0.06em]"
      >
        {WORD.split("").map((letter, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <motion.span
              className="inline-block"
              initial={{ y: "100%" }}
              animate={inView ? { y: "0%" } : undefined}
              transition={{ duration: 1, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              {letter}
            </motion.span>
          </span>
        ))}
      </p>
    </footer>
  )
}
