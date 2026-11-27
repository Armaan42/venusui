"use client"

import * as React from "react"

import { PageWipe, usePageWipe } from "@/registry/default/ui/page-wipe"

const pages = {
  Home: { title: "We make quiet, useful things", text: "A small studio for furniture, lighting and objects for everyday rooms." },
  Work: { title: "Selected work, 2019 – 2026", text: "Chairs for a library, lamps for a hotel and a table that seats twelve." },
  Contact: { title: "Say hello", text: "We answer every message within two working days." },
}
type Page = keyof typeof pages

function Site() {
  const { wipe, wiping } = usePageWipe()
  const [page, setPage] = React.useState<Page>("Home")
  const headingRef = React.useRef<HTMLHeadingElement>(null)

  return (
    <div className="flex h-full flex-col">
      <nav aria-label="Studio" className="flex items-center justify-between border-b px-5 py-4">
        <span className="font-semibold tracking-tight">Fold &amp; Form</span>
        <ul className="flex gap-1">
          {(Object.keys(pages) as Page[]).map((name) => (
            <li key={name}>
              <button
                type="button"
                disabled={wiping}
                aria-current={page === name ? "page" : undefined}
                onClick={() =>
                  page !== name &&
                  wipe(() => {
                    setPage(name)
                  }, name).then(() => headingRef.current?.focus())
                }
                className="rounded-full px-3 py-1.5 text-sm outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 aria-[current=page]:bg-muted aria-[current=page]:font-medium"
              >
                {name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex flex-1 flex-col justify-center px-6 py-10 sm:px-10">
        <h2 ref={headingRef} tabIndex={-1} className="text-3xl font-semibold tracking-tight outline-none sm:text-4xl">
          {pages[page].title}
        </h2>
        <p className="mt-3 max-w-md text-muted-foreground">{pages[page].text}</p>
      </div>
    </div>
  )
}

export default function PageWipeDemo() {
  return (
    <div className="relative h-[24rem] w-full max-w-3xl overflow-hidden rounded-3xl border bg-background">
      <PageWipe contained>
        <Site />
      </PageWipe>
    </div>
  )
}
