"use client"

import * as React from "react"

import { photo, works } from "./interaction-shelf-data"

/**
 * A list of works that magnifies under the pointer: the line you're on grows,
 * its neighbours lean in, and a photograph of that work fades in beside the
 * list. Arrow keys move the lens too. Sizes ease towards their targets in
 * one loop, so the list breathes instead of jumping.
 */
export function LensDemo() {
  const ref = React.useRef<HTMLDivElement>(null)
  const rows = React.useRef<(HTMLLIElement | null)[]>([])
  const [active, setActive] = React.useState(3)
  const aim = React.useRef<number | null>(3)

  React.useEffect(() => {
    const root = ref.current
    if (!root) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const scales = works.map(() => 1)
    let frame = 0
    const tick = () => {
      const center = aim.current
      rows.current.forEach((row, i) => {
        if (!row) return
        const d = center === null ? 99 : Math.abs(i - center)
        const target = 1 + 1.35 * Math.exp(-(d * d) / 2.2)
        scales[i] = reduce ? target : scales[i] + (target - scales[i]) * 0.14
        row.style.height = `${26 * scales[i]}px`
        const label = row.firstElementChild as HTMLElement | null
        if (label) {
          label.style.transform = `scale(${scales[i]})`
          label.style.opacity = String(0.74 + 0.26 * Math.min(1, (scales[i] - 1) / 1.1))
        }
      })
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  const onMove = (event: React.PointerEvent<HTMLUListElement>) => {
    const items = rows.current
    let best = 0
    let bestDistance = Infinity
    items.forEach((row, i) => {
      if (!row) return
      const rect = row.getBoundingClientRect()
      const d = Math.abs(event.clientY - (rect.top + rect.height / 2))
      if (d < bestDistance) {
        bestDistance = d
        best = i
      }
    })
    aim.current = best
    if (best !== active) setActive(best)
  }

  return (
    <div ref={ref} className="relative grid size-full grid-cols-[1fr_auto] gap-6 overflow-hidden bg-[#f4efe6] p-6 text-[#1f1b16]">
      <ul
        tabIndex={0}
        role="listbox"
        aria-label="List of works. Use the arrow keys to move the lens."
        aria-activedescendant={`lens-${active}`}
        onPointerMove={onMove}
        onKeyDown={(event) => {
          if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return
          event.preventDefault()
          const next = Math.max(0, Math.min(works.length - 1, active + (event.key === "ArrowDown" ? 1 : -1)))
          aim.current = next
          setActive(next)
        }}
        className="flex flex-col justify-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-[#e0782f]"
      >
        {works.map(([title, year], i) => (
          <li
            key={title}
            id={`lens-${i}`}
            aria-selected={i === active}
            role="option"
            ref={(node) => {
              rows.current[i] = node
            }}
            className="flex items-center overflow-visible"
            style={{ height: 26 }}
          >
            <span className="flex w-full origin-left items-baseline gap-3 text-[15px] leading-none font-medium tracking-tight whitespace-nowrap will-change-transform">
              <span className="w-8 font-mono text-[9px] text-[#3f3830]">{year}</span>
              {title}
            </span>
          </li>
        ))}
      </ul>
      <div aria-hidden="true" className="relative hidden w-40 self-center sm:block">
        {works.map((_, i) => (
          <img
            key={i}
            src={photo(i + 2, 320, 420)}
            alt=""
            className="absolute inset-x-0 top-1/2 aspect-[3/4] w-full -translate-y-1/2 rounded-md object-cover shadow-xl transition-[opacity,transform] duration-500 motion-reduce:transition-none"
            style={{
              opacity: i === active ? 1 : 0,
              transform: `translateY(-50%) rotate(${i === active ? -2 : 4}deg) scale(${i === active ? 1 : 0.94})`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
