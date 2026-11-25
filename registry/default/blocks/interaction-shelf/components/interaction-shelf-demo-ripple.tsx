"use client"

import * as React from "react"

/**
 * A field of dots that parts around the pointer like water around a hand and
 * springs back when you leave. While nobody is pointing, a slow phantom hand
 * moves through it so the field never sits still (not with reduced motion).
 */
export function RippleDemo() {
  const ref = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const dpr = Math.min(window.devicePixelRatio, 2)
    let dots: { hx: number; hy: number; x: number; y: number; vx: number; vy: number }[] = []
    let w = 0
    let h = 0
    const pointer = { x: -999, y: -999, active: false, last: 0 }

    const layout = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      dots = []
      const gap = 18
      for (let y = gap / 2; y < h; y += gap) for (let x = gap / 2; x < w; x += gap) dots.push({ hx: x, hy: y, x, y, vx: 0, vy: 0 })
    }
    const observer = new ResizeObserver(layout)
    observer.observe(canvas)
    layout()

    let frame = 0
    const tick = (now: number) => {
      let px = pointer.x
      let py = pointer.y
      if (!reduce && now - pointer.last > 2500) {
        px = w / 2 + Math.sin(now / 1700) * w * 0.32
        py = h / 2 + Math.sin(now / 1100) * h * 0.25
      }
      ctx.clearRect(0, 0, w, h)
      const radius = 95
      for (const d of dots) {
        const dx = d.x - px
        const dy = d.y - py
        const dist = Math.hypot(dx, dy)
        if (dist < radius && dist > 0.01) {
          const force = (1 - dist / radius) ** 2 * 6
          d.vx += (dx / dist) * force
          d.vy += (dy / dist) * force
        }
        d.vx += (d.hx - d.x) * 0.06
        d.vy += (d.hy - d.y) * 0.06
        d.vx *= 0.78
        d.vy *= 0.78
        d.x += d.vx
        d.y += d.vy
        const offset = Math.min(1, Math.hypot(d.x - d.hx, d.y - d.hy) / 30)
        ctx.fillStyle = offset > 0.05 ? `rgba(224, 120, 47, ${0.45 + offset * 0.55})` : "rgba(31, 27, 22, 0.55)"
        ctx.beginPath()
        ctx.arc(d.x, d.y, 1.6 + offset * 2.2, 0, Math.PI * 2)
        ctx.fill()
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    const move = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
      pointer.last = event.timeStamp
    }
    const leave = () => {
      pointer.x = pointer.y = -999
    }
    canvas.addEventListener("pointermove", move)
    canvas.addEventListener("pointerleave", leave)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      canvas.removeEventListener("pointermove", move)
      canvas.removeEventListener("pointerleave", leave)
    }
  }, [])

  return (
    <div className="relative size-full bg-[#f4efe6]">
      <canvas ref={ref} aria-hidden="true" className="size-full touch-none" />
      <p className="pointer-events-none absolute bottom-4 left-5 font-mono text-[10px] tracking-[0.18em] text-[#1f1b16]/80 uppercase">
        Move through the field
      </p>
    </div>
  )
}
