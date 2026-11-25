"use client"

import * as React from "react"

import { captions, photo } from "./interaction-shelf-data"

const CELL_W = 220
const CELL_H = 260
const GAP = 18

/**
 * An endless wall of photographs. Drag (or scroll, or use the arrow keys) in
 * any direction; it keeps gliding after you let go, and each picture slides
 * inside its frame as it crosses the page. Tiles wrap around, so the wall
 * never ends. One loop writes the transforms; React renders it once.
 */
export function DriftDemo() {
  const ref = React.useRef<HTMLDivElement>(null)
  const tiles = React.useRef<(HTMLDivElement | null)[]>([])
  const cols = 6
  const rows = 5

  React.useEffect(() => {
    const root = ref.current
    if (!root) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const s = { x: -60, y: -40, vx: reduce ? 0 : -0.35, vy: reduce ? 0 : -0.2, dragging: false, lastX: 0, lastY: 0 }
    const spanX = cols * (CELL_W + GAP)
    const spanY = rows * (CELL_H + GAP)
    let frame = 0

    const tick = () => {
      if (!s.dragging) {
        s.x += s.vx
        s.y += s.vy
        s.vx *= 0.95
        s.vy *= 0.95
      }
      const w = root.clientWidth
      const h = root.clientHeight
      tiles.current.forEach((tile, i) => {
        if (!tile) return
        const col = i % cols
        const row = Math.floor(i / cols)
        const x = ((((col * (CELL_W + GAP) + s.x) % spanX) + spanX) % spanX) - (CELL_W + GAP)
        const y = ((((row * (CELL_H + GAP) + s.y + (col % 2) * 70) % spanY) + spanY) % spanY) - (CELL_H + GAP)
        tile.style.transform = `translate3d(${x}px, ${y}px, 0)`
        // The picture slides inside its frame, further from the middle of the page.
        const img = tile.firstElementChild as HTMLElement | null
        if (img) {
          const dx = (x + CELL_W / 2 - w / 2) / w
          const dy = (y + CELL_H / 2 - h / 2) / h
          img.style.transform = `translate3d(${-dx * 14}%, ${-dy * 14}%, 0) scale(1.3)`
        }
      })
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    const down = (event: PointerEvent) => {
      s.dragging = true
      s.lastX = event.clientX
      s.lastY = event.clientY
      s.vx = 0
      s.vy = 0
      root.setPointerCapture(event.pointerId)
    }
    const move = (event: PointerEvent) => {
      if (!s.dragging) return
      const dx = event.clientX - s.lastX
      const dy = event.clientY - s.lastY
      s.lastX = event.clientX
      s.lastY = event.clientY
      s.x += dx
      s.y += dy
      s.vx = reduce ? 0 : dx
      s.vy = reduce ? 0 : dy
    }
    const up = () => {
      s.dragging = false
    }
    const wheel = (event: WheelEvent) => {
      event.preventDefault()
      s.vx -= event.deltaX * 0.08
      s.vy -= event.deltaY * 0.08
      if (reduce) {
        s.x -= event.deltaX
        s.y -= event.deltaY
        s.vx = s.vy = 0
      }
    }
    const key = (event: KeyboardEvent) => {
      const step = 120
      const map: Record<string, [number, number]> = {
        ArrowLeft: [step, 0],
        ArrowRight: [-step, 0],
        ArrowUp: [0, step],
        ArrowDown: [0, -step],
      }
      const d = map[event.key]
      if (!d) return
      event.preventDefault()
      if (reduce) {
        s.x += d[0]
        s.y += d[1]
      } else {
        s.vx += d[0] * 0.08
        s.vy += d[1] * 0.08
      }
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
  }, [])

  return (
    <div
      ref={ref}
      tabIndex={0}
      role="region"
      aria-label="Endless photo wall. Drag, scroll or use the arrow keys to move around."
      className="relative size-full cursor-grab touch-none overflow-hidden bg-[#141210] outline-none select-none focus-visible:ring-2 focus-visible:ring-[#e0782f] focus-visible:ring-inset active:cursor-grabbing"
    >
      {Array.from({ length: cols * rows }, (_, i) => (
        <div
          key={i}
          ref={(node) => {
            tiles.current[i] = node
          }}
          className="absolute top-0 left-0 overflow-hidden rounded-xl bg-neutral-800"
          style={{ width: CELL_W, height: CELL_H }}
        >
          <img src={photo(i, 440, 520)} alt="" draggable={false} className="size-full object-cover will-change-transform" />
          <span className="absolute bottom-2 left-2 rounded bg-black/55 px-1.5 py-0.5 text-[10px] text-white">
            {captions[i % captions.length]}
          </span>
        </div>
      ))}
    </div>
  )
}
