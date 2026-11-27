"use client"

import * as React from "react"
import { Heart, RotateCcw, X } from "lucide-react"

import { cn } from "@/lib/utils"

export interface FlickCard {
  id: string
  /** Short name, announced when the card is flicked, e.g. "Kyoto". */
  label: string
  content: React.ReactNode
}

export type FlickDirection = "left" | "right"

interface FlickCardsProps extends Omit<React.ComponentProps<"div">, "children"> {
  cards: FlickCard[]
  /** Called once a card has been flicked away. */
  onFlick?: (card: FlickCard, direction: FlickDirection) => void
  /** What a flick to the left means, e.g. "Skip". */
  leftLabel?: string
  /** What a flick to the right means, e.g. "Keep". */
  rightLabel?: string
  /** Send flicked cards to the back of the stack instead of removing them. */
  loop?: boolean
  /** Shown when every card has been flicked. */
  empty?: React.ReactNode
}

/** How far the card must travel, as a share of its width, to count as a flick. */
const FLICK_DISTANCE = 0.3
/** Or how fast it must be moving when let go, in pixels per millisecond. */
const FLICK_SPEED = 0.55
const VISIBLE = 3
const FLY_MS = 380

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

/**
 * A stack of cards you flick away. Throw the top card left or right (a quick
 * flick is enough), or use the buttons or arrow keys. The cards underneath
 * rise as you drag, and Undo brings the last card back.
 */
function FlickCards({
  cards,
  onFlick,
  leftLabel = "Skip",
  rightLabel = "Keep",
  loop = false,
  empty,
  className,
  ...props
}: FlickCardsProps) {
  const byId = React.useMemo(() => new Map(cards.map((card) => [card.id, card])), [cards])
  const [queue, setQueue] = React.useState(() => cards.map((card) => card.id))
  const [history, setHistory] = React.useState<{ id: string; direction: FlickDirection }[]>([])
  const [drag, setDrag] = React.useState<{ x: number; y: number; fromTop: boolean } | null>(null)
  const [width, setWidth] = React.useState(320)
  const [flying, setFlying] = React.useState<{ id: string; direction: FlickDirection; y: number } | null>(null)
  const [entering, setEntering] = React.useState<{ id: string; direction: FlickDirection } | null>(null)
  const [announcement, setAnnouncement] = React.useState("")
  const pointer = React.useRef<{ x: number; y: number; lastX: number; lastT: number; vx: number } | null>(null)
  const stackRef = React.useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const top = byId.get(queue[0])

  const flick = (direction: FlickDirection, y = 0) => {
    if (!top || flying) return
    setFlying({ id: top.id, direction, y })
    setDrag(null)
    setHistory((h) => [...h, { id: top.id, direction }])
    setAnnouncement(`${direction === "right" ? rightLabel : leftLabel}: ${top.label}`)
    onFlick?.(top, direction)
    window.setTimeout(
      () => {
        setQueue((q) => (loop ? [...q.slice(1), q[0]] : q.slice(1)))
        setFlying(null)
      },
      reduce ? 0 : FLY_MS,
    )
  }

  const undo = () => {
    const last = history.at(-1)
    if (!last || flying) return
    setHistory((h) => h.slice(0, -1))
    setQueue((q) => [last.id, ...q.filter((id) => id !== last.id)])
    setAnnouncement(`Back: ${byId.get(last.id)?.label ?? ""}`)
    if (!reduce) setEntering(last)
  }

  // A card coming back starts off to the side, then glides in on the next frame.
  React.useEffect(() => {
    if (!entering) return
    let second = 0
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => setEntering(null))
    })
    return () => {
      cancelAnimationFrame(first)
      cancelAnimationFrame(second)
    }
  }, [entering])

  React.useEffect(() => {
    const el = stackRef.current
    if (!el) return
    const observer = new ResizeObserver(() => setWidth(el.offsetWidth))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const progress = drag ? Math.min(1, Math.abs(drag.x) / (width * FLICK_DISTANCE)) : flying ? 1 : 0
  const leaning: FlickDirection | null = flying ? flying.direction : drag && drag.x !== 0 ? (drag.x > 0 ? "right" : "left") : null

  return (
    <div data-slot="flick-cards" className={cn("flex w-full max-w-xs flex-col items-center gap-6", className)} {...props}>
      <div
        ref={stackRef}
        role="group"
        aria-roledescription="card stack"
        aria-label={
          top
            ? `${top.label}. ${queue.length} ${queue.length === 1 ? "card" : "cards"} left. Left arrow to ${leftLabel.toLowerCase()}, right arrow to ${rightLabel.toLowerCase()}.`
            : "No cards left"
        }
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault()
            flick(event.key === "ArrowRight" ? "right" : "left")
          }
          if ((event.key === "z" || event.key === "Z") && (event.metaKey || event.ctrlKey)) {
            event.preventDefault()
            undo()
          }
        }}
        className="relative aspect-[3/4] w-full rounded-3xl outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      >
        {queue.length === 0 ? (
          <div className="absolute inset-0 grid place-items-center rounded-3xl border border-dashed p-6 text-center text-sm text-muted-foreground">
            {empty ?? "That's every card."}
          </div>
        ) : null}

        {queue
          .slice(0, VISIBLE + (flying ? 1 : 0))
          .map((id, index) => ({ id, index }))
          .reverse()
          .map(({ id, index }) => {
            const card = byId.get(id)
            if (!card) return null
            const isTop = index === 0
            const isFlying = flying?.id === id
            const isEntering = entering?.id === id
            // Cards underneath move up one place as the top card leaves.
            const depth = Math.max(0, index - (flying && !isFlying ? 1 : 0) - (isTop || isFlying ? 0 : progress * 0.6))
            // Grabbed near the bottom, the card tips the other way, like a real card.
            const sign = drag?.fromTop === false ? -1 : 1

            let transform = `translateY(${depth * 14}px) scale(${1 - depth * 0.05})`
            if (isFlying) {
              const dir = flying.direction === "right" ? 1 : -1
              transform = `translate(${dir * 150}%, ${flying.y + 40}px) rotate(${dir * 28}deg)`
            } else if (isEntering) {
              const dir = entering.direction === "right" ? 1 : -1
              transform = `translate(${dir * 150}%, 40px) rotate(${dir * 28}deg)`
            } else if (isTop && drag) {
              transform = `translate(${drag.x}px, ${drag.y * 0.5}px) rotate(${drag.x * 0.06 * sign}deg)`
            }

            return (
              <div
                key={id}
                aria-hidden={!isTop || isFlying}
                inert={!isTop || isFlying}
                className={cn(
                  "absolute inset-0 overflow-hidden rounded-3xl bg-card text-card-foreground shadow-[0_1px_2px_rgb(0_0_0/0.08),0_18px_40px_-18px_rgb(0_0_0/0.45)] ring-1 ring-border/60",
                  isTop && !flying ? "cursor-grab touch-pan-y active:cursor-grabbing" : "pointer-events-none",
                  !(isTop && drag) &&
                    (isFlying
                      ? "transition-[transform,opacity] duration-[380ms] ease-[cubic-bezier(0.2,0.7,0.3,1)]"
                      : "transition-transform duration-500 ease-[cubic-bezier(0.34,1.4,0.64,1)]"),
                  isFlying && "opacity-0",
                  "motion-reduce:transition-none",
                )}
                style={{ transform, zIndex: VISIBLE + 1 - index }}
                onPointerDown={(event) => {
                  if (!isTop || flying || event.button !== 0) return
                  event.currentTarget.setPointerCapture(event.pointerId)
                  const rect = event.currentTarget.getBoundingClientRect()
                  pointer.current = {
                    x: event.clientX,
                    y: event.clientY,
                    lastX: event.clientX,
                    lastT: event.timeStamp,
                    vx: 0,
                  }
                  setDrag({ x: 0, y: 0, fromTop: event.clientY - rect.top < rect.height / 2 })
                }}
                onPointerMove={(event) => {
                  const p = pointer.current
                  if (!isTop || !p || !drag) return
                  const dt = event.timeStamp - p.lastT
                  if (dt > 0) p.vx = p.vx * 0.3 + ((event.clientX - p.lastX) / dt) * 0.7
                  p.lastX = event.clientX
                  p.lastT = event.timeStamp
                  setDrag({ x: event.clientX - p.x, y: event.clientY - p.y, fromTop: drag.fromTop })
                }}
                onPointerUp={() => {
                  const p = pointer.current
                  pointer.current = null
                  if (!isTop || !p || !drag) return
                  const far = Math.abs(drag.x) > width * FLICK_DISTANCE
                  const fast = Math.abs(p.vx) > FLICK_SPEED && Math.sign(p.vx) === Math.sign(drag.x) && Math.abs(drag.x) > 24
                  if (far || fast) flick(drag.x > 0 ? "right" : "left", drag.y * 0.5)
                  else setDrag(null)
                }}
                onPointerCancel={() => {
                  pointer.current = null
                  setDrag(null)
                }}
              >
                {card.content}
                {isTop ? (
                  <>
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute top-5 left-5 -rotate-12 rounded-lg border-2 border-emerald-600 bg-white/95 px-2.5 py-1 text-sm font-bold tracking-wider text-emerald-700 uppercase"
                      style={{ opacity: leaning === "right" ? progress : 0 }}
                    >
                      {rightLabel}
                    </span>
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute top-5 right-5 rotate-12 rounded-lg border-2 border-rose-600 bg-white/95 px-2.5 py-1 text-sm font-bold tracking-wider text-rose-700 uppercase"
                      style={{ opacity: leaning === "left" ? progress : 0 }}
                    >
                      {leftLabel}
                    </span>
                  </>
                ) : null}
              </div>
            )
          })}
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => flick("left")}
          disabled={!top}
          aria-label={top ? `${leftLabel} ${top.label}` : leftLabel}
          title={leftLabel}
          className="grid size-14 place-items-center rounded-full border bg-background text-rose-600 shadow-sm transition-[scale,background-color] outline-none hover:bg-rose-50 focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-95 disabled:opacity-40 dark:text-rose-400 dark:hover:bg-rose-950/40"
        >
          <X aria-hidden="true" className="size-6" />
        </button>
        <button
          type="button"
          onClick={undo}
          disabled={history.length === 0}
          aria-label="Undo"
          title="Undo"
          className="grid size-10 place-items-center rounded-full border bg-background text-muted-foreground shadow-sm transition-[scale,background-color] outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-95 disabled:opacity-40"
        >
          <RotateCcw aria-hidden="true" className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => flick("right")}
          disabled={!top}
          aria-label={top ? `${rightLabel} ${top.label}` : rightLabel}
          title={rightLabel}
          className="grid size-14 place-items-center rounded-full border bg-background text-emerald-600 shadow-sm transition-[scale,background-color] outline-none hover:bg-emerald-50 focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-95 disabled:opacity-40 dark:text-emerald-400 dark:hover:bg-emerald-950/40"
        >
          <Heart aria-hidden="true" className="size-6" />
        </button>
      </div>
      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </div>
  )
}

export { FlickCards }
