"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface CountdownTimerProps extends Omit<React.ComponentProps<"div">, "children"> {
  /** The moment to count down to. */
  to: Date | string | number
  /** Accessible name, e.g. "Time until doors open". */
  label?: string
  /** Called once when the countdown reaches zero. */
  onComplete?: () => void
  /** Shown in place of the tiles once the countdown is over. */
  completed?: React.ReactNode
  /** Names under each tile. */
  units?: { days: string; hours: string; minutes: string; seconds: string }
}

/** The current second, shared by every countdown on the page; one timer ticks for all of them. */
const clock = (() => {
  const listeners = new Set<() => void>()
  let timer = 0
  const tick = () => {
    listeners.forEach((listener) => listener())
    // Line up with the next whole second so every tile changes together.
    timer = window.setTimeout(tick, 1000 - (Date.now() % 1000))
  }
  return {
    subscribe(listener: () => void) {
      listeners.add(listener)
      if (listeners.size === 1) tick()
      return () => {
        listeners.delete(listener)
        if (!listeners.size) window.clearTimeout(timer)
      }
    },
    now: () => Math.floor(Date.now() / 1000),
  }
})()

/** One digit; a new value slides in from above. */
function Digit({ value }: { value: string }) {
  return (
    <span className="relative inline-block h-[1.1em] w-[0.62em] overflow-hidden text-center">
      <span
        key={value}
        className="absolute inset-0 transition-[translate,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] starting:-translate-y-full starting:opacity-0 motion-reduce:transition-none"
      >
        {value}
      </span>
    </span>
  )
}

/**
 * Counts down to a date in days, hours, minutes and seconds. Each digit
 * slides in as it changes. It shows dashes until it has loaded, so the server
 * and the browser never disagree about the time.
 */
function CountdownTimer({
  to,
  label = "Time remaining",
  onComplete,
  completed,
  units = { days: "Days", hours: "Hours", minutes: "Minutes", seconds: "Seconds" },
  className,
  ...props
}: CountdownTimerProps) {
  const now = React.useSyncExternalStore(clock.subscribe, clock.now, () => null)
  const target = new Date(to).getTime()
  const left = now === null ? null : Math.max(0, Math.floor((target - now * 1000) / 1000))
  const done = left === 0

  const onCompleteRef = React.useRef(onComplete)
  React.useEffect(() => {
    onCompleteRef.current = onComplete
  })
  React.useEffect(() => {
    if (done) onCompleteRef.current?.()
  }, [done])

  if (done && completed) {
    return (
      <div data-slot="countdown-timer" className={className} {...props}>
        {completed}
      </div>
    )
  }

  const parts =
    left === null
      ? null
      : {
          days: Math.floor(left / 86400),
          hours: Math.floor((left % 86400) / 3600),
          minutes: Math.floor((left % 3600) / 60),
          seconds: left % 60,
        }
  const tiles = (["days", "hours", "minutes", "seconds"] as const).map((unit) => ({
    unit,
    text: parts ? String(parts[unit]).padStart(2, "0") : "--",
  }))
  const spoken = parts
    ? (["days", "hours", "minutes", "seconds"] as const)
        .filter((unit) => parts[unit] > 0 || unit === "seconds")
        .map((unit) => `${parts[unit]} ${units[unit].toLowerCase()}`)
        .join(", ")
    : "Loading"

  return (
    <div data-slot="countdown-timer" role="timer" aria-label={label} className={cn("inline-flex gap-2 sm:gap-3", className)} {...props}>
      <span className="sr-only">{spoken}</span>
      {tiles.map((tile) => (
        <div
          key={tile.unit}
          aria-hidden="true"
          className="flex min-w-[4.25rem] flex-col items-center rounded-2xl bg-card px-3 py-3 ring-1 ring-border/70 shadow-[0_1px_2px_rgb(0_0_0/0.06),0_8px_24px_-12px_rgb(0_0_0/0.25)] sm:min-w-24 sm:px-4 sm:py-4"
        >
          <span className="flex text-4xl leading-none font-semibold tracking-tight tabular-nums sm:text-6xl">
            {tile.text.split("").map((char, i) => (
              <Digit key={`${tile.unit}-${tile.text.length - i}`} value={char} />
            ))}
          </span>
          <span className="mt-2 text-[11px] tracking-widest text-muted-foreground uppercase">{units[tile.unit]}</span>
        </div>
      ))}
    </div>
  )
}

export { CountdownTimer }
