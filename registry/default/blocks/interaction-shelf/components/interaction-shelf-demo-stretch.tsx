"use client"

import * as React from "react"

import { captions, photo, photos } from "./interaction-shelf-data"

const CARD = 230
const GAP = 22

/**
 * A reel of photographs that stretch and lean with the speed of your drag,
 * then settle on the nearest one when you stop. Scroll and the arrow keys
 * work too. The counter and caption below follow the photograph in front.
 */
export function StretchDemo() {
  const ref = React.useRef<HTMLDivElement>(null)
  const track = React.useRef<HTMLDivElement>(null)
  const counter = React.useRef<HTMLSpanElement>(null)
  const caption = React.useRef<HTMLSpanElement>(null)
  const count = photos.length

  React.useEffect(() => {
    const root = ref.current
    const strip = track.current
    if (!root || !strip) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const step = CARD + GAP
    const s = { x: 0, target: 0, v: 0, dragging: false, lastX: 0, settleAt: 0 }
    let frame = 0
    let shown = -1

    const tick = (now: number) => {
      if (!s.dragging) {
        if (now > s.settleAt) s.target = Math.round(s.target / step) * step
        s.target = Math.max(-(count - 1) * step, Math.min(0, s.target))
      }
      const prev = s.x
      s.x = reduce ? s.target : s.x + (s.target - s.x) * 0.12
      s.v = reduce ? 0 : s.x - prev
      const skew = Math.max(-16, Math.min(16, -s.v * 0.7))
      const stretch = 1 + Math.min(0.25, Math.abs(s.v) * 0.012)
      const offset = root.clientWidth / 2 - CARD / 2
      strip.style.transform = `translate3d(${s.x + offset}px, 0, 0)`
      for (const card of strip.children as unknown as HTMLElement[]) card.style.transform = `skewX(${skew}deg) scaleX(${stretch})`
      const index = Math.round(-s.target / step)
      if (index !== shown) {
        shown = index
        if (counter.current) counter.current.textContent = `${String(index + 1).padStart(2, "0")} / ${count}`
        if (caption.current) caption.current.textContent = captions[index % captions.length]
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    const down = (event: PointerEvent) => {
      s.dragging = true
      s.lastX = event.clientX
      root.setPointerCapture(event.pointerId)
    }
    const move = (event: PointerEvent) => {
      if (!s.dragging) return
      s.target += (event.clientX - s.lastX) * 1.2
      s.lastX = event.clientX
    }
    const up = () => {
      s.dragging = false
      s.settleAt = performance.now() + 120
    }
    const wheel = (event: WheelEvent) => {
      event.preventDefault()
      s.target -= (Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY) * 1.1
      s.settleAt = performance.now() + 180
    }
    const key = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return
      event.preventDefault()
      s.target = (Math.round(s.target / step) + (event.key === "ArrowLeft" ? 1 : -1)) * step
    }
    root.addEventListener("pointerdown", down)
    root.addEventListener("pointermove", move)
    root.addEventListener("pointerup", up)
    root.addEventListener("pointercancel", up)
    root.addEventListener("wheel", wheel, { passive: false })
    root.addEventListener("keydown", key)
    return () => {
      cancelAnimationFrame(frame)
      root.removeEventListener("pointerdown", down)
      root.removeEventListener("pointermove", move)
      root.removeEventListener("pointerup", up)
      root.removeEventListener("pointercancel", up)
      root.removeEventListener("wheel", wheel)
      root.removeEventListener("keydown", key)
    }
  }, [count])

  return (
    <div
      ref={ref}
      tabIndex={0}
      role="region"
      aria-label="Photo reel. Drag, scroll or use the left and right arrow keys."
      className="relative flex size-full cursor-grab touch-none flex-col justify-center overflow-hidden bg-[#141210] outline-none select-none focus-visible:ring-2 focus-visible:ring-[#e0782f] focus-visible:ring-inset active:cursor-grabbing"
    >
      <div ref={track} className="flex will-change-transform" style={{ gap: GAP }}>
        {Array.from({ length: count }, (_, i) => (
          <div key={i} className="shrink-0 overflow-hidden rounded-lg will-change-transform" style={{ width: CARD, height: CARD * 1.3 }}>
            <img src={photo(i, 460, 600)} alt="" draggable={false} className="size-full object-cover" />
          </div>
        ))}
      </div>
      <p
        className="absolute inset-x-6 bottom-5 flex justify-between font-mono text-[11px] tracking-[0.14em] text-white/85 uppercase"
        aria-live="polite"
      >
        <span ref={caption}>{captions[0]}</span>
        <span ref={counter}>01 / {count}</span>
      </p>
    </div>
  )
}
