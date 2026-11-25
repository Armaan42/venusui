"use client"

import * as React from "react"

import { photo } from "./interaction-shelf-data"

const POOL = 18
const SPACING = 64

/**
 * Draw a line and photographs open out along it, one after another, then
 * fade in the order they arrived. The pictures are a fixed pool of image
 * elements, replayed with the Web Animations API, so drawing never loads
 * anything. "Draw a line for me" plays a curve for keyboard users.
 */
export function BloomDemo() {
  const ref = React.useRef<HTMLDivElement>(null)
  const pool = React.useRef<(HTMLImageElement | null)[]>([])
  const autoRef = React.useRef<() => void>(() => {})

  React.useEffect(() => {
    const stage = ref.current
    if (!stage) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const s = { drawing: false, x: -999, y: -999, count: 0 }

    const bloom = (x: number, y: number) => {
      if (Math.hypot(x - s.x, y - s.y) < SPACING) return
      s.x = x
      s.y = y
      const n = s.count++
      const img = pool.current[n % POOL]
      if (!img) return
      const angle = ((n * 47) % 30) - 15
      img.style.left = `${x}px`
      img.style.top = `${y}px`
      img.style.zIndex = String(n)
      img.animate(
        reduce
          ? [{ opacity: 0 }, { opacity: 1, offset: 0.15 }, { opacity: 1, offset: 0.75 }, { opacity: 0 }]
          : [
              { opacity: 0, transform: `translate(-50%, -50%) rotate(${angle - 20}deg) scale(0.2)` },
              { opacity: 1, transform: `translate(-50%, -50%) rotate(${angle}deg) scale(1)`, offset: 0.18 },
              { opacity: 1, transform: `translate(-50%, -50%) rotate(${angle}deg) scale(1)`, offset: 0.72 },
              { opacity: 0, transform: `translate(-50%, -50%) rotate(${angle + 6}deg) scale(0.9)` },
            ],
        { duration: 2400, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "both" },
      )
    }
    const point = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect()
      return [event.clientX - rect.left, event.clientY - rect.top] as const
    }
    const down = (event: PointerEvent) => {
      s.drawing = true
      s.x = s.y = -999
      stage.setPointerCapture(event.pointerId)
      bloom(...point(event))
    }
    const move = (event: PointerEvent) => {
      if (s.drawing) bloom(...point(event))
    }
    const up = () => {
      s.drawing = false
    }
    let timer = 0
    autoRef.current = () => {
      window.clearInterval(timer)
      s.x = s.y = -999
      let t = 0
      timer = window.setInterval(() => {
        const w = stage.clientWidth
        const h = stage.clientHeight
        bloom(w * 0.12 + t * w * 0.76, h / 2 + Math.sin(t * Math.PI * 2) * h * 0.25)
        t += 0.02
        if (t > 1) window.clearInterval(timer)
      }, 30)
    }
    stage.addEventListener("pointerdown", down)
    stage.addEventListener("pointermove", move)
    stage.addEventListener("pointerup", up)
    stage.addEventListener("pointercancel", up)
    return () => {
      window.clearInterval(timer)
      stage.removeEventListener("pointerdown", down)
      stage.removeEventListener("pointermove", move)
      stage.removeEventListener("pointerup", up)
      stage.removeEventListener("pointercancel", up)
    }
  }, [])

  return (
    <div className="relative size-full overflow-hidden bg-[#141210]">
      <div ref={ref} aria-hidden="true" className="absolute inset-0 cursor-crosshair touch-none select-none">
        <p className="pointer-events-none absolute inset-0 grid place-items-center px-8 text-center text-2xl font-medium tracking-tight text-white/80">
          Press and draw anywhere.
        </p>
        {Array.from({ length: POOL }, (_, i) => (
          <img
            key={i}
            ref={(node) => {
              pool.current[i] = node
            }}
            src={photo(i, 300, 360)}
            alt=""
            draggable={false}
            className="pointer-events-none absolute top-0 left-0 w-28 rounded-md object-cover opacity-0 shadow-[0_16px_30px_-12px_rgb(0_0_0/0.8)]"
            style={{ aspectRatio: "5 / 6", transform: "translate(-50%, -50%)" }}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={() => autoRef.current()}
        className="absolute right-4 bottom-4 rounded-full bg-[#f4efe6] px-3.5 py-1.5 text-xs font-medium text-[#1f1b16] outline-none focus-visible:ring-2 focus-visible:ring-[#e0782f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#141210]"
      >
        Draw a line for me
      </button>
    </div>
  )
}
