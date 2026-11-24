"use client"

import * as React from "react"
import { useReducedMotion, type MotionValue } from "motion/react"

import { cn } from "@/lib/utils"

import { photo, type PhotoName } from "./motion-library-media"

/**
 * The cards on the wall: small, made-up site layouts, each with a little
 * motion of its own, as if recorded while running. Edit the copy and photos freely.
 */
type Card =
  | { kind: "photo"; photo: PhotoName; label: string; tall?: boolean }
  | { kind: "editorial"; photo: PhotoName; title: string }
  | { kind: "poster"; word: string; note: string }
  | { kind: "split"; photo: PhotoName; title: string; tag: string }
  | { kind: "grid"; photos: PhotoName[]; label: string }
  | { kind: "type"; word: string }

const cards: Card[] = [
  { kind: "editorial", photo: "dunes", title: "Light that moves with the day." },
  { kind: "photo", photo: "clay", label: "Clay, fired twice", tall: true },
  { kind: "poster", word: "Dune Room", note: "Twelve rooms, one long table" },
  { kind: "split", photo: "chair", title: "Made slowly, by hand.", tag: "New" },
  { kind: "grid", photos: ["vases", "beans", "leaf", "sofa", "coffee", "road"], label: "Index · 06" },
  { kind: "photo", photo: "lounge", label: "The quiet season" },
  { kind: "type", word: "Slow Hours" },
  { kind: "editorial", photo: "house", title: "A house that holds the dusk." },
  { kind: "photo", photo: "road", label: "Field notes, vol. 3", tall: true },
  { kind: "split", photo: "coffee", title: "Mornings at the roastery.", tag: "Menu" },
  { kind: "poster", word: "Saltwork", note: "Prints in editions of nine" },
  { kind: "photo", photo: "hangers", label: "Hang it, wear it, keep it" },
  { kind: "editorial", photo: "vases", title: "Three vessels, one kiln." },
  { kind: "grid", photos: ["cabin", "dining", "resort", "living", "waves", "clay"], label: "Stays · 12" },
  { kind: "photo", photo: "headphones", label: "Hear the room" },
  { kind: "type", word: "After Six" },
  { kind: "split", photo: "living", title: "Rooms that take their time.", tag: "Book" },
  { kind: "poster", word: "Amber Hall", note: "Concerts by candlelight" },
]

function WallCard({ card }: { card: Card }) {
  switch (card.kind) {
    case "photo":
      return (
        <div className={cn("relative overflow-hidden rounded-md bg-ml-card", card.tall ? "aspect-[3/4]" : "aspect-[4/3]")}>
          <img
            src={photo(card.photo)}
            alt=""
            draggable={false}
            className="size-full animate-ml-pan object-cover motion-reduce:animate-none"
          />
          <span className="absolute bottom-2 left-2 rounded-sm bg-black/50 px-1.5 py-0.5 font-mono text-[8px] tracking-wider text-white uppercase">
            {card.label}
          </span>
        </div>
      )
    case "editorial":
      return (
        <div className="rounded-md bg-ml-paper p-3 text-ml-paper-ink">
          <div className="flex items-center justify-between font-mono text-[7px] tracking-wider uppercase opacity-60">
            <span>Studio</span>
            <span>Index · About · Shop</span>
          </div>
          <p className="mt-6 max-w-[11rem] text-[15px] leading-[1.1] font-medium tracking-tight">{card.title}</p>
          <div className="mt-3 overflow-hidden rounded-sm">
            <img
              src={photo(card.photo)}
              alt=""
              draggable={false}
              className="aspect-[16/9] w-full animate-ml-pan object-cover motion-reduce:animate-none"
            />
          </div>
        </div>
      )
    case "poster":
      return (
        <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-ml-card p-3">
          <span className="absolute top-4 left-6 size-14 animate-ml-float rounded-full bg-ml-accent motion-reduce:animate-none" />
          <p className="absolute bottom-7 left-3 text-[30px] leading-none font-medium tracking-tight text-ml-ink">{card.word}</p>
          <p className="absolute bottom-3 left-3 font-mono text-[7px] tracking-wider text-ml-muted uppercase">{card.note}</p>
        </div>
      )
    case "split":
      return (
        <div className="grid grid-cols-2 gap-2 rounded-md bg-ml-paper p-2 text-ml-paper-ink">
          <img src={photo(card.photo)} alt="" draggable={false} className="aspect-[3/4] w-full rounded-sm object-cover" />
          <div className="flex flex-col py-1">
            <span className="w-fit rounded-sm bg-ml-accent px-1.5 py-0.5 font-mono text-[7px] text-ml-on-accent uppercase">{card.tag}</span>
            <p className="mt-auto text-[13px] leading-[1.1] font-medium tracking-tight">{card.title}</p>
            <span className="mt-2 h-1 w-10 rounded-full bg-current opacity-20" />
          </div>
        </div>
      )
    case "grid":
      return (
        <div className="rounded-md bg-ml-card p-2">
          <div className="grid grid-cols-3 gap-1">
            {card.photos.map((name, i) => (
              <img
                key={name}
                src={photo(name)}
                alt=""
                draggable={false}
                style={{ animationDelay: `${i * 0.6}s` }}
                className="aspect-square w-full animate-ml-flash rounded-[2px] object-cover motion-reduce:animate-none"
              />
            ))}
          </div>
          <p className="mt-2 font-mono text-[7px] tracking-wider text-ml-muted uppercase">{card.label}</p>
        </div>
      )
    case "type":
      return (
        <div className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-md bg-ml-accent">
          <p className="text-[34px] leading-none font-medium tracking-tight text-ml-on-accent">{card.word}</p>
          <span className="absolute right-3 bottom-3 h-3 w-0.5 animate-ml-blink bg-ml-on-accent motion-reduce:animate-none" />
        </div>
      )
  }
}

const COLUMNS = 18
const PER_COLUMN = 6
const CARD = 220
const GAP = 22
const COLUMN = CARD + GAP
const ARC = COLUMNS * COLUMN
const RADIUS = 1150
const LIMIT = 1.35 // radians; columns further round the curve are hidden

/** Where column `i` sits on the curve for a given horizontal offset. Pure, so the server and first paint agree. */
function place(i: number, offset: number, lift: number) {
  const x = ((((i * COLUMN + offset) % ARC) + ARC) % ARC) - ARC / 2
  const angle = x / RADIUS
  // Neighbouring columns start at different heights, like courses of bricks.
  const y = (i % 3) * -70 + (i % 2 ? 40 : -20) + lift * (i % 2 ? 1 : -1)
  return {
    transform: `translate(-50%, -50%) rotateY(${angle.toFixed(4)}rad) translateZ(${-RADIUS}px) translateY(${y.toFixed(1)}px)`,
    visibility: Math.abs(angle) > LIMIT ? ("hidden" as const) : ("visible" as const),
  }
}

export type WallReadout = { x: number; y: number; velocity: number }

/**
 * A curved wall of cards seen from inside, like standing in a cylinder. It
 * drifts slowly, you can drag it (it keeps some momentum), it leans towards
 * the pointer, and scrolling the hero pushes alternate columns up and down.
 * One animation loop writes the transforms directly, so React never re-renders
 * while it moves. With reduced motion it only moves when dragged.
 */
export function MotionLibraryWall({
  progress,
  onReadout,
  className,
}: {
  progress: MotionValue<number>
  onReadout?: (readout: WallReadout) => void
  className?: string
}) {
  const reduce = useReducedMotion()
  const rootRef = React.useRef<HTMLDivElement>(null)
  const stageRef = React.useRef<HTMLDivElement>(null)
  const columnRefs = React.useRef<(HTMLDivElement | null)[]>([])
  const state = React.useRef({ x: 0, y: 0, vx: 0, vy: 0, dragging: false, lastX: 0, lastY: 0, tiltX: 0, tiltY: 0, aimX: 0, aimY: 0 })
  const readout = React.useRef(onReadout)
  React.useEffect(() => {
    readout.current = onReadout
  })

  React.useEffect(() => {
    const root = rootRef.current
    const stage = stageRef.current
    if (!root || !stage) return
    const s = state.current
    let frame = 0
    let visible = true
    let last = 0

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) frame = requestAnimationFrame(tick)
    })
    observer.observe(root)

    function tick(now: number) {
      const dt = last ? Math.min(3, (now - last) / 16.67) : 1
      last = now
      if (!s.dragging) {
        if (!reduce) s.x -= 0.35 * dt // the slow drift
        s.x += s.vx * dt
        s.y += s.vy * dt
        const friction = reduce ? 0 : Math.pow(0.94, dt)
        s.vx *= friction
        s.vy *= friction
      }
      s.y = Math.max(-260, Math.min(260, s.y))
      s.tiltX += (s.aimX - s.tiltX) * 0.06 * dt
      s.tiltY += (s.aimY - s.tiltY) * 0.06 * dt
      const p = reduce ? 0 : progress.get()
      const scale = (root!.clientWidth < 640 ? 0.6 : 1) * (1 + p * 0.3)
      stage!.style.transform = `translateZ(${RADIUS - 380}px) rotateZ(-5deg) rotateX(${(s.tiltX + p * 8).toFixed(3)}deg) rotateY(${s.tiltY.toFixed(3)}deg) scale(${scale.toFixed(4)}) translateY(${s.y.toFixed(1)}px)`
      columnRefs.current.forEach((column, i) => {
        if (!column) return
        const { transform, visibility } = place(i, s.x, p * 220)
        column.style.transform = transform
        column.style.visibility = visibility
      })
      readout.current?.({ x: -s.x, y: s.y, velocity: Math.hypot(s.vx, s.vy) })
      if (visible && !document.hidden) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    const onVisibility = () => {
      if (!document.hidden && visible) {
        last = 0
        cancelAnimationFrame(frame)
        frame = requestAnimationFrame(tick)
      }
    }
    document.addEventListener("visibilitychange", onVisibility)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [progress, reduce])

  const onPointerDown = (event: React.PointerEvent) => {
    const s = state.current
    s.dragging = true
    s.lastX = event.clientX
    s.lastY = event.clientY
    s.vx = 0
    s.vy = 0
    event.currentTarget.setPointerCapture(event.pointerId)
  }
  const onPointerMove = (event: React.PointerEvent) => {
    const s = state.current
    const rect = event.currentTarget.getBoundingClientRect()
    if (!reduce && event.pointerType === "mouse") {
      // Lean a few degrees towards the pointer.
      s.aimX = ((event.clientY - rect.top) / rect.height - 0.5) * -6
      s.aimY = ((event.clientX - rect.left) / rect.width - 0.5) * 8
    }
    if (!s.dragging) return
    const dx = event.clientX - s.lastX
    const dy = event.clientY - s.lastY
    s.lastX = event.clientX
    s.lastY = event.clientY
    s.x += dx * 1.4
    s.y += dy
    s.vx = dx * 1.4
    s.vy = dy
  }
  const onPointerUp = () => {
    state.current.dragging = false
  }

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onPointerLeave={() => {
        state.current.aimX = 0
        state.current.aimY = 0
      }}
      className={cn(
        "absolute inset-0 cursor-grab touch-pan-y overflow-hidden select-none [perspective:1000px] active:cursor-grabbing",
        className,
      )}
    >
      <div
        ref={stageRef}
        className="absolute top-1/2 left-1/2 [transform-style:preserve-3d]"
        style={{ transform: `translateZ(${RADIUS - 380}px) rotateZ(-5deg)` }}
      >
        {Array.from({ length: COLUMNS }, (_, i) => (
          <div
            key={i}
            ref={(node) => {
              columnRefs.current[i] = node
            }}
            className="absolute top-0 left-0 grid gap-[22px] [backface-visibility:hidden]"
            style={{ width: CARD, ...place(i, 0, 0) }}
          >
            {Array.from({ length: PER_COLUMN }, (_, j) => (
              <WallCard key={j} card={cards[(i * 5 + j * 7) % cards.length]} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
