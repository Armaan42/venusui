"use client"

import * as React from "react"

import { captions, photo } from "./interaction-shelf-data"

type Print = { x: number; y: number; vx: number; vy: number; a: number; va: number }

const W = 150
const H = 190

/**
 * Prints on a light table. Pick one up and it turns from where you hold it;
 * let go mid-move and it slides, spins and bounces off the edges until it
 * rests. "Scatter" throws them all for keyboard users (and for fun).
 */
export function TossDemo() {
  const ref = React.useRef<HTMLDivElement>(null)
  const els = React.useRef<(HTMLDivElement | null)[]>([])
  const scatterRef = React.useRef<() => void>(() => {})
  const total = 6

  React.useEffect(() => {
    const table = ref.current
    if (!table) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const prints: Print[] = Array.from({ length: total }, (_, i) => ({
      x: 60 + (i % 3) * 150 + ((i * 23) % 40),
      y: 50 + Math.floor(i / 3) * 170 + ((i * 17) % 30),
      vx: 0,
      vy: 0,
      a: ((i * 37) % 24) - 12,
      va: 0,
    }))
    let held: { index: number; ox: number; oy: number; lastX: number; lastY: number; vx: number; vy: number } | null = null
    let z = total
    let frame = 0

    const tick = () => {
      const tw = table.clientWidth
      const th = table.clientHeight
      prints.forEach((p, i) => {
        if (held?.index !== i) {
          p.x += p.vx
          p.y += p.vy
          p.a += p.va
          p.vx *= 0.93
          p.vy *= 0.93
          p.va *= 0.9
          // Bounce off the edges of the table.
          if (p.x < 0) {
            p.x = 0
            p.vx = -p.vx * 0.55
            p.va += p.vy * 0.2
          }
          if (p.y < 0) {
            p.y = 0
            p.vy = -p.vy * 0.55
            p.va -= p.vx * 0.2
          }
          if (p.x > tw - W) {
            p.x = tw - W
            p.vx = -p.vx * 0.55
            p.va -= p.vy * 0.2
          }
          if (p.y > th - H) {
            p.y = th - H
            p.vy = -p.vy * 0.55
            p.va += p.vx * 0.2
          }
        }
        const el = els.current[i]
        if (el) el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) rotate(${p.a}deg)`
      })
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    const down = (event: PointerEvent) => {
      const target = (event.target as HTMLElement).closest<HTMLElement>("[data-print]")
      if (!target) return
      const index = Number(target.dataset.print)
      const rect = table.getBoundingClientRect()
      const p = prints[index]
      held = {
        index,
        ox: event.clientX - rect.left - p.x,
        oy: event.clientY - rect.top - p.y,
        lastX: event.clientX,
        lastY: event.clientY,
        vx: 0,
        vy: 0,
      }
      target.style.zIndex = String(++z)
      table.setPointerCapture(event.pointerId)
    }
    const move = (event: PointerEvent) => {
      if (!held) return
      const rect = table.getBoundingClientRect()
      const p = prints[held.index]
      const dx = event.clientX - held.lastX
      const dy = event.clientY - held.lastY
      held.vx = dx
      held.vy = dy
      held.lastX = event.clientX
      held.lastY = event.clientY
      p.x = event.clientX - rect.left - held.ox
      p.y = event.clientY - rect.top - held.oy
      // Holding off-center makes the print swing round the grip.
      if (!reduce) p.a += ((held.ox - W / 2) * dy - (held.oy - H / 2) * dx) * 0.0016
    }
    const up = () => {
      if (!held) return
      const p = prints[held.index]
      if (!reduce) {
        p.vx = held.vx * 1.2
        p.vy = held.vy * 1.2
        p.va = ((held.ox - W / 2) * held.vy - (held.oy - H / 2) * held.vx) * 0.004
      }
      held = null
    }
    scatterRef.current = () => {
      prints.forEach((p, i) => {
        if (reduce) {
          p.x = Math.random() * Math.max(1, table.clientWidth - W)
          p.y = Math.random() * Math.max(1, table.clientHeight - H)
          p.a = Math.random() * 30 - 15
          return
        }
        p.vx = (Math.random() - 0.5) * 40
        p.vy = (Math.random() - 0.5) * 40
        p.va = (Math.random() - 0.5) * 12 + i * 0.1
      })
    }
    table.addEventListener("pointerdown", down)
    table.addEventListener("pointermove", move)
    table.addEventListener("pointerup", up)
    table.addEventListener("pointercancel", up)
    return () => {
      cancelAnimationFrame(frame)
      table.removeEventListener("pointerdown", down)
      table.removeEventListener("pointermove", move)
      table.removeEventListener("pointerup", up)
      table.removeEventListener("pointercancel", up)
    }
  }, [])

  return (
    <div className="relative size-full bg-[radial-gradient(ellipse_at_center,#fbf7ee,#e9e0cf)]">
      <div ref={ref} aria-hidden="true" className="absolute inset-0 touch-none overflow-hidden select-none">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            data-print={i}
            ref={(node) => {
              els.current[i] = node
            }}
            className="absolute top-0 left-0 cursor-grab bg-white p-2 pb-6 shadow-[0_12px_24px_-10px_rgb(0_0_0/0.45)] will-change-transform active:cursor-grabbing"
            style={{ width: W, height: H, zIndex: i }}
          >
            <img src={photo(i + 5, 300, 300)} alt="" draggable={false} className="aspect-square w-full object-cover" />
            <span className="mt-1.5 block truncate text-[9px] text-neutral-700">{captions[(i + 5) % captions.length]}</span>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => scatterRef.current()}
        className="absolute right-4 bottom-4 rounded-full bg-[#1f1b16] px-3.5 py-1.5 text-xs font-medium text-[#f4efe6] outline-none focus-visible:ring-2 focus-visible:ring-[#e0782f] focus-visible:ring-offset-2"
      >
        Scatter the prints
      </button>
    </div>
  )
}
