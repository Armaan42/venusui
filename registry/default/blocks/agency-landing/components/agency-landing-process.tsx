"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import { AgencyLandingArt, type ArtName } from "./agency-landing-art"
import { AgencyLandingButton, AgencyLandingEyebrow } from "./agency-landing-button"
import { Reveal, RevealItem, RevealList } from "./agency-landing-motion"

const steps: { when: string; title: string; art: ArtName }[] = [
  { when: "Weeks 1–2", title: "Discovery and a clear plan", art: "prism" },
  { when: "Weeks 3–8", title: "Design and build, side by side", art: "ink" },
  { when: "Launch and after", title: "Launch, measure and improve", art: "aurora" },
]

/**
 * Three steps. One card is "open": it grows wider and shows its artwork, and
 * the others stay plain. Hovering, focusing or tapping a card opens it; on
 * touch screens the card in the middle of the screen opens as you scroll.
 */
export function AgencyLandingProcess() {
  const [active, setActive] = React.useState(0)
  const listRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (window.matchMedia("(hover: hover)").matches) return
    const cards = listRef.current?.querySelectorAll<HTMLElement>("[data-step]")
    if (!cards) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.step))
      },
      { rootMargin: "-45% 0px -45% 0px" },
    )
    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  return (
    <section aria-labelledby="process-title" className="bg-agency-card pb-20 sm:pb-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end">
          <Reveal>
            <AgencyLandingEyebrow align="start">Process</AgencyLandingEyebrow>
            <h2 id="process-title" className="mt-6 text-3xl leading-tight font-medium tracking-tight text-balance sm:text-5xl">
              A simple process, with you in the room
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-sm text-pretty text-muted-foreground">
              Most projects take eight to twelve weeks. You see real, working pages every Friday instead of one big reveal at the end.
            </p>
            <AgencyLandingButton href="#contact" className="mt-6">
              Start a project
            </AgencyLandingButton>
          </Reveal>
        </div>

        <div ref={listRef}>
          <RevealList as="ol" className="mt-12 flex flex-col gap-4 md:flex-row">
            {steps.map((step, i) => {
              const open = active === i
              return (
                <RevealItem
                  key={step.title}
                  className={cn(
                    "min-w-0 md:basis-0 transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                    open ? "md:grow-[1.7]" : "md:grow",
                  )}
                >
                  <div
                    data-step={i}
                    tabIndex={0}
                    aria-current={open ? "step" : undefined}
                    onPointerEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className={cn(
                      "relative isolate flex min-h-80 cursor-default flex-col justify-between overflow-hidden rounded-md border p-5 outline-none focus-visible:ring-3 focus-visible:ring-agency-accent/40 sm:min-h-96",
                      open ? "border-transparent text-white" : "bg-agency-card",
                    )}
                  >
                    {/* The artwork and its shade fade in on the open card. */}
                    <AgencyLandingArt
                      name={step.art}
                      className={cn(
                        "absolute inset-0 -z-10 transition-[opacity,scale] duration-700 ease-out motion-reduce:transition-none",
                        open ? "scale-100 opacity-100" : "scale-110 opacity-0",
                      )}
                    />
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-0 -z-10 bg-linear-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-700",
                        open ? "opacity-100" : "opacity-0",
                      )}
                    />
                    <div>
                      <p className={cn("text-xs transition-colors duration-500", open ? "text-white/85" : "text-muted-foreground")}>
                        {step.when}
                      </p>
                      <h3 className="mt-1 text-lg font-medium sm:text-xl">{step.title}</h3>
                    </div>
                    <span className="self-end text-4xl font-medium tabular-nums sm:text-5xl">.0{i + 1}</span>
                  </div>
                </RevealItem>
              )
            })}
          </RevealList>
        </div>
      </div>
    </section>
  )
}
