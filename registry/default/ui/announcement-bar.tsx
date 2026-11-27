"use client"

import * as React from "react"
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play, X } from "lucide-react"

import { cn } from "@/lib/utils"

export interface Announcement {
  id: string
  content: React.ReactNode
  /** Adds a link after the message. */
  href?: string
  /** The link's text. */
  linkLabel?: string
}

interface AnnouncementBarProps extends React.ComponentProps<"div"> {
  announcements: Announcement[]
  /** Time each message shows before the next, in milliseconds. 0 stops the rotation. */
  interval?: number
  /** Shows a close button. */
  dismissible?: boolean
  /** Remembers a dismissal in the browser under this key, so the bar stays closed on later visits. */
  storageKey?: string
  onDismiss?: () => void
  /** Accessible name for the bar. */
  label?: string
}

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

function readStored(key: string | undefined) {
  if (!key) return false
  try {
    return window.localStorage.getItem(key) === "dismissed"
  } catch {
    return false
  }
}

function subscribeStorage(onChange: () => void) {
  window.addEventListener("storage", onChange)
  return () => window.removeEventListener("storage", onChange)
}

/**
 * A slim bar across the top of the page that rotates through announcements.
 * Each message slides up into place; the bar pauses while you hover or focus
 * it, and has arrows, a pause button and a close button. With `storageKey`
 * a dismissal is remembered on later visits.
 */
function AnnouncementBar({
  announcements,
  interval = 5000,
  dismissible = true,
  storageKey,
  onDismiss,
  label = "Announcements",
  className,
  ...props
}: AnnouncementBarProps) {
  const [index, setIndex] = React.useState(0)
  const [paused, setPaused] = React.useState(false)
  const [hovered, setHovered] = React.useState(false)
  const [focused, setFocused] = React.useState(false)
  const [closing, setClosing] = React.useState(false)
  const [dismissed, setDismissed] = React.useState(false)
  const [manual, setManual] = React.useState(false)
  const stored = React.useSyncExternalStore(
    subscribeStorage,
    () => readStored(storageKey),
    () => false,
  )
  const reduce = useReducedMotion()
  const count = announcements.length

  const rotating = interval > 0 && count > 1 && !paused && !hovered && !focused && !reduce && !closing
  React.useEffect(() => {
    if (!rotating) return
    const timer = window.setTimeout(() => setIndex((i) => (i + 1) % count), interval)
    return () => window.clearTimeout(timer)
  }, [rotating, index, interval, count])

  const go = (next: number) => {
    setManual(true)
    setIndex((next + count) % count)
  }

  const dismiss = () => {
    setClosing(true)
    if (storageKey) {
      try {
        window.localStorage.setItem(storageKey, "dismissed")
      } catch {
        // Private browsing can block storage; the bar still closes for this visit.
      }
    }
    window.setTimeout(
      () => {
        setDismissed(true)
        onDismiss?.()
      },
      reduce ? 0 : 300,
    )
  }

  if (dismissed || stored || count === 0) return null

  return (
    <div
      data-slot="announcement-bar"
      role="region"
      aria-label={label}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false)
      }}
      className={cn(
        "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
        closing ? "grid-rows-[0fr]" : "grid-rows-[1fr]",
      )}
      {...props}
    >
      <div className={cn("overflow-hidden bg-foreground text-background", className)}>
        <div className="mx-auto flex h-12 max-w-6xl items-center gap-1 px-2 text-[13px] leading-tight sm:h-10 sm:px-4 sm:text-sm">
          {count > 1 ? (
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous announcement"
              className="hidden size-8 shrink-0 place-items-center rounded-full opacity-80 outline-none hover:opacity-100 focus-visible:ring-2 focus-visible:ring-current sm:grid"
            >
              <ChevronLeft aria-hidden="true" className="size-4" />
            </button>
          ) : null}

          {/* After an arrow press, the new message is read out; the rotation itself stays quiet. */}
          <div aria-live={manual ? "polite" : "off"} className="relative h-full min-w-0 flex-1 overflow-hidden">
            {announcements.map((item, i) => {
              const offset = i === index ? 0 : i === (index - 1 + count) % count ? -1 : 1
              return (
                <p
                  key={item.id}
                  aria-hidden={i !== index}
                  inert={i !== index}
                  className={cn(
                    "absolute inset-0 m-0 flex items-center justify-center gap-2 px-1 text-center",
                    "transition-[translate,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                    offset === 0 ? "translate-y-0 opacity-100" : offset < 0 ? "-translate-y-full opacity-0" : "translate-y-full opacity-0",
                  )}
                >
                  <span className="line-clamp-2 sm:line-clamp-1">{item.content}</span>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="inline-flex shrink-0 items-center gap-1 font-medium underline underline-offset-4 outline-none hover:no-underline focus-visible:ring-2 focus-visible:ring-current"
                    >
                      {item.linkLabel ?? "Learn more"}
                      <ArrowRight aria-hidden="true" className="size-3.5" />
                    </a>
                  ) : null}
                </p>
              )
            })}
          </div>

          {count > 1 ? (
            <>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next announcement"
                className="hidden size-8 shrink-0 place-items-center rounded-full opacity-80 outline-none hover:opacity-100 focus-visible:ring-2 focus-visible:ring-current sm:grid"
              >
                <ChevronRight aria-hidden="true" className="size-4" />
              </button>
              {interval > 0 && !reduce ? (
                <button
                  type="button"
                  onClick={() => setPaused((p) => !p)}
                  aria-label={paused ? "Play announcements" : "Pause announcements"}
                  className="grid size-8 shrink-0 place-items-center rounded-full opacity-80 outline-none hover:opacity-100 focus-visible:ring-2 focus-visible:ring-current"
                >
                  {paused ? <Play aria-hidden="true" className="size-3.5" /> : <Pause aria-hidden="true" className="size-3.5" />}
                </button>
              ) : null}
            </>
          ) : null}
          {dismissible ? (
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss announcements"
              className="grid size-8 shrink-0 place-items-center rounded-full opacity-80 outline-none hover:opacity-100 focus-visible:ring-2 focus-visible:ring-current"
            >
              <X aria-hidden="true" className="size-4" />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export { AnnouncementBar }
