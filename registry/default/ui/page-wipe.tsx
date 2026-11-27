"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type Phase = "idle" | "cover" | "covered" | "reveal"

interface PageWipeContextValue {
  /**
   * Covers the screen, runs `change` (swap the content or navigate) and
   * uncovers once it has finished. `label` shows while the screen is covered.
   */
  wipe: (change: () => void | Promise<void>, label?: React.ReactNode) => Promise<void>
  wiping: boolean
}

const PageWipeContext = React.createContext<PageWipeContextValue | null>(null)

interface PageWipeProps {
  children: React.ReactNode
  /** How many bands sweep across. */
  bands?: number
  /** `up` sweeps from the bottom, `left` from the right. */
  direction?: "up" | "left"
  /** Time each band takes to cross, in milliseconds. */
  duration?: number
  /** Cover only the nearest positioned parent instead of the whole window. */
  contained?: boolean
  /** Classes for the bands, e.g. `bg-primary`. */
  className?: string
  /** Classes for the label shown while covered, e.g. `text-primary-foreground`. */
  labelClassName?: string
}

const STAGGER = 70

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)")
  query.addEventListener("change", onChange)
  return () => query.removeEventListener("change", onChange)
}

function useReducedMotion() {
  return React.useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  )
}

const wait = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms))
const nextPaint = () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))

/**
 * A wipe between pages or views. Call `wipe()` from `usePageWipe()`: bands of
 * colour sweep across and cover the screen, your change happens underneath,
 * then the bands sweep away. With reduced motion it's a short fade.
 */
function PageWipe({ children, bands = 5, direction = "up", duration = 520, contained = false, className, labelClassName }: PageWipeProps) {
  const [phase, setPhase] = React.useState<Phase>("idle")
  const [label, setLabel] = React.useState<React.ReactNode>(null)
  const running = React.useRef(false)
  const reduce = useReducedMotion()
  const count = reduce ? 1 : Math.max(1, bands)
  const total = reduce ? 200 : duration + STAGGER * (count - 1)

  const wipe = React.useCallback(
    async (change: () => void | Promise<void>, nextLabel?: React.ReactNode) => {
      if (running.current) return
      running.current = true
      setLabel(nextLabel ?? null)
      setPhase("cover")
      await wait(total)
      setPhase("covered")
      await change()
      // Let the new content render before uncovering it.
      await nextPaint()
      setPhase("reveal")
      await wait(total)
      setPhase("idle")
      running.current = false
    },
    [total],
  )

  const value = React.useMemo(() => ({ wipe, wiping: phase !== "idle" }), [wipe, phase])
  const vertical = direction === "up"

  return (
    <PageWipeContext.Provider value={value}>
      <div inert={phase === "cover" || phase === "covered" ? true : undefined} className="contents">
        {children}
      </div>
      <div
        aria-hidden="true"
        data-slot="page-wipe"
        data-phase={phase}
        className={cn(
          "inset-0 z-[100] flex overflow-hidden",
          contained ? "absolute" : "fixed",
          vertical ? "flex-row" : "flex-col",
          phase === "idle" ? "pointer-events-none" : "pointer-events-auto",
        )}
      >
        {Array.from({ length: count }, (_, i) => {
          // Bands leave in the same order they arrived.
          const offset = phase === "cover" || phase === "covered" ? "0%" : phase === "reveal" ? "-101%" : "101%"
          return (
            <span
              key={i}
              className={cn("block flex-1 bg-foreground", className)}
              style={
                reduce
                  ? {
                      opacity: phase === "cover" || phase === "covered" ? 1 : 0,
                      transition: phase === "idle" ? "none" : `opacity ${total}ms ease`,
                    }
                  : {
                      transform: vertical ? `translateY(${offset})` : `translateX(${offset})`,
                      transition: phase === "idle" ? "none" : `transform ${duration}ms cubic-bezier(0.76, 0, 0.24, 1) ${i * STAGGER}ms`,
                      // Overlap by a pixel so no seam shows between bands.
                      margin: vertical ? "0 -0.5px" : "-0.5px 0",
                    }
              }
            />
          )
        })}
        {label ? (
          <span
            className={cn(
              "absolute inset-0 grid place-items-center text-2xl font-semibold tracking-tight text-background transition-opacity duration-200 sm:text-4xl",
              phase === "covered" ? "opacity-100" : "opacity-0",
              labelClassName,
            )}
          >
            {label}
          </span>
        ) : null}
      </div>
    </PageWipeContext.Provider>
  )
}

/** Returns `wipe(change, label?)` and whether a wipe is running. Use inside `PageWipe`. */
function usePageWipe() {
  const context = React.use(PageWipeContext)
  if (!context) throw new Error("usePageWipe must be used inside PageWipe")
  return context
}

export { PageWipe, usePageWipe }
