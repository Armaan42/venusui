"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface ShowcaseStep {
  id: string
  title: string
  description: React.ReactNode
  /** The picture for this step: an image, a video or any element. */
  media: React.ReactNode
}

interface StickyShowcaseProps extends React.ComponentProps<"div"> {
  steps: ShowcaseStep[]
  /** Called when another step becomes the one in view. */
  onStepChange?: (index: number) => void
}

/**
 * Scrolling story with a pinned picture. The steps scroll past on one side
 * while the picture beside them stays put and changes to match the step in
 * the middle of the screen. On narrow screens each step shows its own
 * picture inline instead.
 */
function StickyShowcase({ steps, onStepChange, className, ...props }: StickyShowcaseProps) {
  const [active, setActive] = React.useState(0)
  const listRef = React.useRef<HTMLOListElement>(null)
  const onChange = React.useRef(onStepChange)
  React.useEffect(() => {
    onChange.current = onStepChange
  })

  React.useEffect(() => {
    const items = listRef.current?.querySelectorAll<HTMLElement>("[data-step]")
    if (!items?.length) return
    // A step is "in view" while it crosses the middle of the screen.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const index = Number((entry.target as HTMLElement).dataset.step)
          setActive(index)
          onChange.current?.(index)
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    )
    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [steps.length])

  return (
    <div data-slot="sticky-showcase" className={cn("grid gap-10 lg:grid-cols-2 lg:gap-16", className)} {...props}>
      <div className="relative">
        {/* Progress rail beside the steps. */}
        <span aria-hidden="true" className="absolute top-0 bottom-0 left-0 hidden w-px bg-border lg:block">
          <span
            className="absolute inset-x-0 top-0 bg-foreground transition-[height] duration-500 ease-out motion-reduce:transition-none"
            style={{ height: `${((active + 1) / steps.length) * 100}%` }}
          />
        </span>
        <ol ref={listRef} className="m-0 list-none space-y-16 p-0 lg:space-y-0 lg:pl-10">
          {steps.map((step, i) => (
            <li
              key={step.id}
              data-step={i}
              aria-current={i === active ? "step" : undefined}
              className="flex flex-col justify-center lg:min-h-[75svh]"
            >
              <div className="mb-6 overflow-hidden rounded-3xl lg:hidden">{step.media}</div>
              <p className="text-sm text-muted-foreground tabular-nums">{String(i + 1).padStart(2, "0")}</p>
              <h3
                className={cn(
                  "mt-2 text-2xl font-semibold tracking-tight text-balance transition-colors duration-500 sm:text-3xl",
                  i === active ? "text-foreground" : "lg:text-muted-foreground",
                )}
              >
                {step.title}
              </h3>
              <div className="mt-3 max-w-md text-pretty text-muted-foreground">{step.description}</div>
            </li>
          ))}
        </ol>
      </div>

      <div className="hidden lg:block">
        <div className="sticky top-[12svh] h-[76svh] overflow-hidden rounded-3xl bg-muted">
          {steps.map((step, i) => (
            <div
              key={step.id}
              aria-hidden={i !== active}
              className={cn(
                "absolute inset-0 transition-[opacity,scale] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-opacity [&>*]:size-full [&_img]:object-cover",
                i === active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0",
              )}
            >
              {step.media}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export { StickyShowcase }
