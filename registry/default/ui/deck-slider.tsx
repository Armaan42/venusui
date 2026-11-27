"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"

import { cn } from "@/lib/utils"

export interface DeckSlide {
  id: string
  /** Short name, used by the dots and announced when the slide comes to the front. */
  label: string
  content: React.ReactNode
}

interface DeckSliderProps extends Omit<React.ComponentProps<"div">, "children"> {
  slides: DeckSlide[]
  /** The slide in front (controlled). */
  index?: number
  defaultIndex?: number
  onIndexChange?: (index: number) => void
  /** Go from the last slide back to the first. */
  loop?: boolean
  /** Move on by itself every this many milliseconds. Adds a pause button. */
  autoPlay?: number
  /** Accessible name for the slider. */
  label?: string
}

/** How far each card in the fan sits from the one in front, as a share of a card's width. */
const STEP = 0.42
/** Cards further than this from the front are hidden. */
const REACH = 2.6

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

/** Where slide `i` sits relative to the front one: 0 in front, negative to the left. */
function offsetOf(i: number, index: number, count: number, loop: boolean) {
  const d = i - index
  if (!loop) return d
  const wrapped = ((d % count) + count) % count
  return wrapped > count / 2 ? wrapped - count : wrapped
}

/**
 * A slider that deals its slides like a fanned deck: one in front, the rest
 * stacked and tilted behind it on either side. Drag or swipe it, click a card
 * at the side, or use the arrows, dots and arrow keys.
 */
function DeckSlider({
  slides,
  index: indexProp,
  defaultIndex = 0,
  onIndexChange,
  loop = true,
  autoPlay = 0,
  label = "Slides",
  className,
  ...props
}: DeckSliderProps) {
  const count = slides.length
  const [uncontrolled, setUncontrolled] = React.useState(defaultIndex)
  const index = indexProp ?? uncontrolled
  // The slide that was in front before the last move, to spot cards that wrap around.
  const [from, setFrom] = React.useState(index)
  const [drag, setDrag] = React.useState<number | null>(null)
  const [cardWidth, setCardWidth] = React.useState(300)
  const [paused, setPaused] = React.useState(false)
  const [hovered, setHovered] = React.useState(false)
  const [focused, setFocused] = React.useState(false)
  const pointer = React.useRef<{ x: number; lastX: number; lastT: number; vx: number; moved: boolean } | null>(null)
  const cardRef = React.useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const go = React.useCallback(
    (next: number) => {
      const target = loop ? ((next % count) + count) % count : Math.min(count - 1, Math.max(0, next))
      setFrom(index)
      setUncontrolled(target)
      onIndexChange?.(target)
    },
    [count, loop, index, onIndexChange],
  )

  React.useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const observer = new ResizeObserver(() => setCardWidth(el.offsetWidth))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const playing = autoPlay > 0 && !paused && !hovered && !focused && !reduce && drag === null
  React.useEffect(() => {
    if (!playing) return
    const timer = window.setTimeout(() => go(index + 1), autoPlay)
    return () => window.clearTimeout(timer)
  }, [playing, index, autoPlay, go])

  const offsets = slides.map((_, i) => offsetOf(i, index, count, loop))
  // A slide that wraps from one side of the fan to the other jumps instead of sweeping across the front.
  const wrapped = slides.map((_, i) => {
    const before = offsetOf(i, from, count, loop)
    return Math.sign(before) !== Math.sign(offsets[i]) && Math.abs(before - offsets[i]) > count / 2
  })

  const shift = drag === null ? 0 : drag / (cardWidth * STEP)
  const canPrev = loop || index > 0
  const canNext = loop || index < count - 1

  return (
    <div
      data-slot="deck-slider"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false)
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" && canPrev) {
          event.preventDefault()
          go(index - 1)
        }
        if (event.key === "ArrowRight" && canNext) {
          event.preventDefault()
          go(index + 1)
        }
      }}
      className={cn("flex w-full flex-col items-center gap-6", className)}
      {...props}
    >
      <div
        className="relative h-[26rem] w-full cursor-grab touch-pan-y overflow-x-clip select-none active:cursor-grabbing sm:h-[30rem]"
        onPointerDown={(event) => {
          if (event.button !== 0) return
          pointer.current = { x: event.clientX, lastX: event.clientX, lastT: event.timeStamp, vx: 0, moved: false }
        }}
        onPointerMove={(event) => {
          const p = pointer.current
          if (!p) return
          const dx = event.clientX - p.x
          // Only take over the pointer once it's clearly a drag, so clicks inside slides still work.
          if (!p.moved && Math.abs(dx) < 6) return
          if (!p.moved) {
            p.moved = true
            event.currentTarget.setPointerCapture(event.pointerId)
          }
          const dt = event.timeStamp - p.lastT
          if (dt > 0) p.vx = p.vx * 0.3 + ((event.clientX - p.lastX) / dt) * 0.7
          p.lastX = event.clientX
          p.lastT = event.timeStamp
          let next = dx
          // Resist past the first and last slides when not looping.
          if ((!canPrev && dx > 0) || (!canNext && dx < 0)) next = dx * 0.25
          setDrag(next)
        }}
        onPointerUp={(event) => {
          const p = pointer.current
          pointer.current = null
          if (!p) return
          if (!p.moved) {
            // A click on a side card brings it to the front.
            const card = cardRef.current?.getBoundingClientRect()
            if (card && (event.clientX < card.left || event.clientX > card.right)) {
              if (event.clientX < card.left && canPrev) go(index - 1)
              if (event.clientX > card.right && canNext) go(index + 1)
            }
            return
          }
          const dx = drag ?? 0
          let steps = -Math.round(dx / (cardWidth * STEP))
          if (steps === 0 && (Math.abs(dx) > 40 || Math.abs(p.vx) > 0.5)) steps = dx > 0 ? -1 : 1
          setDrag(null)
          if (steps !== 0) go(index + steps)
        }}
        onPointerCancel={() => {
          pointer.current = null
          setDrag(null)
        }}
      >
        {slides.map((slide, i) => {
          const f = offsets[i] + shift
          const distance = Math.abs(f)
          const isCurrent = i === index
          const hidden = distance > REACH
          return (
            <div
              key={slide.id}
              ref={isCurrent ? cardRef : undefined}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}: ${slide.label}`}
              aria-hidden={!isCurrent}
              inert={!isCurrent}
              className={cn(
                "absolute top-4 bottom-4 left-1/2 w-[min(72%,20rem)] origin-bottom overflow-hidden rounded-3xl bg-card text-card-foreground shadow-[0_1px_2px_rgb(0_0_0/0.08),0_24px_50px_-24px_rgb(0_0_0/0.5)] ring-1 ring-border/60",
                drag === null &&
                  !wrapped[i] &&
                  "transition-[transform,opacity] duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
              )}
              style={{
                transform: `translateX(calc(-50% + ${f * STEP * 100}%)) translateY(${Math.min(distance, REACH) * 3}%) rotate(${f * 6}deg) scale(${1 - Math.min(distance, REACH) * 0.1})`,
                opacity: hidden ? 0 : 1,
                zIndex: 100 - Math.round(distance * 10),
              }}
            >
              {slide.content}
              {/* Cards further back sit in shadow. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-black transition-opacity duration-500 motion-reduce:transition-none"
                style={{ opacity: Math.min(distance, 2) * 0.16 }}
              />
            </div>
          )
        })}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => go(index - 1)}
          disabled={!canPrev}
          aria-label="Previous slide"
          className="grid size-10 place-items-center rounded-full border bg-background shadow-sm outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-40"
        >
          <ChevronLeft aria-hidden="true" className="size-4" />
        </button>
        <div className="flex items-center gap-1.5">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show ${slide.label}`}
              aria-current={i === index ? "true" : undefined}
              className="group grid h-6 place-items-center rounded-full px-0.5 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <span
                className={cn(
                  "block h-1.5 rounded-full transition-[width,background-color] duration-300",
                  i === index ? "w-6 bg-foreground" : "w-1.5 bg-muted-foreground/40 group-hover:bg-muted-foreground",
                )}
              />
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(index + 1)}
          disabled={!canNext}
          aria-label="Next slide"
          className="grid size-10 place-items-center rounded-full border bg-background shadow-sm outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-40"
        >
          <ChevronRight aria-hidden="true" className="size-4" />
        </button>
        {autoPlay > 0 && !reduce ? (
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Start slide show" : "Pause slide show"}
            className="ml-1 grid size-10 place-items-center rounded-full border bg-background shadow-sm outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {paused ? <Play aria-hidden="true" className="size-4" /> : <Pause aria-hidden="true" className="size-4" />}
          </button>
        ) : null}
      </div>
      <p aria-live={playing ? "off" : "polite"} className="sr-only">
        {`${index + 1} of ${count}: ${slides[index]?.label ?? ""}`}
      </p>
    </div>
  )
}

export { DeckSlider }
