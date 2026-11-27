"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type Range = [number, number]

interface RangeSliderProps extends Omit<React.ComponentProps<"div">, "onChange" | "defaultValue"> {
  value?: Range
  defaultValue?: Range
  onValueChange?: (value: Range) => void
  /** Called when a drag ends or a key changes the range, for filtering or saving. */
  onValueCommit?: (value: Range) => void
  min?: number
  max?: number
  step?: number
  /** The smallest distance allowed between the two thumbs. */
  minGap?: number
  /** Accessible name for the whole control, e.g. "Price". */
  label?: string
  /** Names of the two thumbs, read with `label`, e.g. ["Minimum", "Maximum"]. */
  thumbLabels?: [string, string]
  /** Formats values for the readout and screen readers. */
  format?: (value: number) => string
  /** Counts for evenly spaced buckets from `min` to `max`, drawn as bars above the track. */
  histogram?: number[]
}

/**
 * A slider with two thumbs for picking a range, such as a price band. Drag
 * either thumb, or press the track to move the nearer one. An optional
 * histogram above the track shows how values are spread, lighting the bars
 * inside the range.
 */
function RangeSlider({
  value: valueProp,
  defaultValue,
  onValueChange,
  onValueCommit,
  min = 0,
  max = 100,
  step = 1,
  minGap = 0,
  label = "Range",
  thumbLabels = ["Minimum", "Maximum"],
  format = (v) => String(v),
  histogram,
  className,
  ...props
}: RangeSliderProps) {
  const [uncontrolled, setUncontrolled] = React.useState<Range>(
    defaultValue ?? ([min + (max - min) * 0.25, min + (max - min) * 0.75].map((v) => Math.round(v / step) * step) as Range),
  )
  const value = valueProp ?? uncontrolled
  const [dragging, setDragging] = React.useState<0 | 1 | null>(null)
  const trackRef = React.useRef<HTMLDivElement>(null)
  const thumbRefs = [React.useRef<HTMLDivElement>(null), React.useRef<HTMLDivElement>(null)]
  const latest = React.useRef(value)

  const snap = (v: number) => Number((Math.round((v - min) / step) * step + min).toFixed(10))

  /** Moves one thumb, keeping it on its own side of the other. */
  const move = (thumb: 0 | 1, next: number): Range => {
    const [a, b] = latest.current
    const range: Range =
      thumb === 0 ? [Math.min(Math.max(min, snap(next)), b - minGap), b] : [a, Math.max(Math.min(max, snap(next)), a + minGap)]
    latest.current = range
    setUncontrolled(range)
    onValueChange?.(range)
    return range
  }

  const valueAt = (clientX: number) => {
    const rect = trackRef.current?.getBoundingClientRect()
    if (!rect) return min
    return min + (Math.min(rect.width, Math.max(0, clientX - rect.left)) / rect.width) * (max - min)
  }

  const percent = (v: number) => ((v - min) / (max - min)) * 100
  const peak = histogram?.length ? Math.max(...histogram, 1) : 1

  return (
    <div data-slot="range-slider" role="group" aria-label={label} className={cn("w-full touch-none select-none", className)} {...props}>
      {histogram?.length ? (
        <div aria-hidden="true" className="flex h-16 items-end gap-[2px] px-2.5">
          {histogram.map((count, i) => {
            const centre = min + ((i + 0.5) / histogram.length) * (max - min)
            const inside = centre >= value[0] && centre <= value[1]
            return (
              <span
                key={i}
                className={cn("flex-1 rounded-t-sm transition-colors duration-200", inside ? "bg-primary" : "bg-muted-foreground/20")}
                style={{ height: `${Math.max(4, (count / peak) * 100)}%` }}
              />
            )
          })}
        </div>
      ) : null}

      <div
        className={cn("relative flex h-8 items-center px-2.5", dragging === null ? "cursor-pointer" : "cursor-grabbing")}
        onPointerDown={(event) => {
          if (event.button !== 0) return
          event.preventDefault()
          latest.current = value
          const at = valueAt(event.clientX)
          // Move the nearer thumb; when both are on the same spot, the side you pressed decides.
          const thumb: 0 | 1 = Math.abs(at - value[0]) < Math.abs(at - value[1]) || (value[0] === value[1] && at < value[0]) ? 0 : 1
          event.currentTarget.setPointerCapture(event.pointerId)
          setDragging(thumb)
          thumbRefs[thumb].current?.focus()
          move(thumb, at)
        }}
        onPointerMove={(event) => {
          if (dragging !== null) move(dragging, valueAt(event.clientX))
        }}
        onPointerUp={() => {
          if (dragging === null) return
          setDragging(null)
          onValueCommit?.(latest.current)
        }}
        onPointerCancel={() => setDragging(null)}
      >
        <div ref={trackRef} className="relative h-1.5 w-full rounded-full bg-muted">
          <span
            className="absolute inset-y-0 rounded-full bg-primary"
            style={{ left: `${percent(value[0])}%`, right: `${100 - percent(value[1])}%` }}
          />
          {([0, 1] as const).map((thumb) => {
            const own = value[thumb]
            const lowest = thumb === 0 ? min : value[0] + minGap
            const highest = thumb === 0 ? value[1] - minGap : max
            return (
              <div
                key={thumb}
                ref={thumbRefs[thumb]}
                role="slider"
                tabIndex={0}
                aria-label={`${label}, ${thumbLabels[thumb].toLowerCase()}`}
                aria-valuemin={lowest}
                aria-valuemax={highest}
                aria-valuenow={own}
                aria-valuetext={format(own)}
                onKeyDown={(event) => {
                  const big = Math.max(step, (max - min) / 10)
                  const keys: Record<string, number> = {
                    ArrowRight: own + step,
                    ArrowUp: own + step,
                    ArrowLeft: own - step,
                    ArrowDown: own - step,
                    PageUp: own + big,
                    PageDown: own - big,
                    Home: lowest,
                    End: highest,
                  }
                  if (!(event.key in keys)) return
                  event.preventDefault()
                  latest.current = value
                  const next = move(thumb, keys[event.key])
                  onValueCommit?.(next)
                }}
                className={cn(
                  "absolute top-1/2 size-5 -translate-1/2 rounded-full border-2 border-primary bg-background shadow-[0_1px_4px_rgb(0_0_0/0.25)] outline-none focus-visible:ring-4 focus-visible:ring-ring/50",
                  "transition-[scale] duration-150 motion-reduce:transition-none",
                  dragging === thumb && "scale-110",
                )}
                style={{ left: `${percent(own)}%`, zIndex: dragging === thumb ? 2 : 1 }}
              />
            )
          })}
        </div>
      </div>

      <div aria-hidden="true" className="mt-1 flex justify-between px-1 text-sm tabular-nums">
        <span>{format(value[0])}</span>
        <span>{format(value[1])}</span>
      </div>
    </div>
  )
}

export { RangeSlider }
