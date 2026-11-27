"use client"

import * as React from "react"

import { PageWipe, usePageWipe } from "@/registry/default/ui/page-wipe"

export const meta = {
  title: "Portfolio site sections",
  description: "A page wipe between the sections of a designer's portfolio, with the section name showing while the screen is covered.",
}

// Rui Costa is a made-up motion designer.
const sections = {
  Work: {
    title: "Selected work",
    items: ["Title sequence for a short film festival", "Brand motion for a ferry company", "Launch film for a pair of headphones"],
  },
  About: {
    title: "About Rui",
    items: [
      "Motion designer in Lisbon since 2016",
      "Teaches animation two evenings a week",
      "Once animated a whole film with paper cut-outs",
    ],
  },
  Contact: {
    title: "Get in touch",
    items: ["hello@ruicosta.example", "Booking from April", "Replies within two working days"],
  },
}
type Section = keyof typeof sections

function Portfolio() {
  const { wipe, wiping } = usePageWipe()
  const [section, setSection] = React.useState<Section>("Work")
  const headingRef = React.useRef<HTMLHeadingElement>(null)
  const current = sections[section]

  return (
    <div className="flex min-h-svh flex-col">
      <header className="flex items-center justify-between px-6 py-5 sm:px-10">
        <span className="font-semibold tracking-tight">Rui Costa</span>
        <nav aria-label="Sections">
          <ul className="flex gap-1">
            {(Object.keys(sections) as Section[]).map((name) => (
              <li key={name}>
                <button
                  type="button"
                  disabled={wiping}
                  aria-current={section === name ? "page" : undefined}
                  onClick={() =>
                    section !== name &&
                    wipe(() => {
                      setSection(name)
                      window.scrollTo(0, 0)
                    }, name).then(() => headingRef.current?.focus())
                  }
                  className="rounded-full px-3 py-1.5 text-sm outline-none hover:bg-white/10 focus-visible:ring-3 focus-visible:ring-white/50 aria-[current=page]:bg-white/15"
                >
                  {name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main className="flex flex-1 flex-col justify-center px-6 pb-20 sm:px-10">
        <h1 ref={headingRef} tabIndex={-1} className="text-5xl font-semibold tracking-tight outline-none sm:text-8xl">
          {current.title}
        </h1>
        <ul className="mt-10 max-w-xl space-y-3 text-lg text-white/80">
          {current.items.map((item) => (
            <li key={item} className="border-t border-white/15 pt-3">
              {item}
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export default function PortfolioSite() {
  return (
    <div className="min-h-svh bg-neutral-950 text-white">
      <PageWipe bands={6} className="bg-amber-300" labelClassName="text-neutral-950">
        <Portfolio />
      </PageWipe>
    </div>
  )
}
