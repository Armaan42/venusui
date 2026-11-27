"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface RadialSliderProps extends Omit<React.ComponentProps<"div">, "onChange" | "defaultValue" | "children"> {
  value?: number
  defaultValue?: number
  onValueChange?: (value: number) => void
  /** Called when a drag ends or a key changes the value, for saving. */
  onValueCommit?: (value: number) => void
  min?: number
  max?: number
  step?: number
  /** Accessible name and caption, e.g. "Brightness". */
  label?: string
  /** Formats the value for the centre readout and screen readers. */
  format?: (value: number) => string
  /** How much of the circle the track covers, in degrees. The gap sits at the bottom. */
  sweep?: number
  /** Diameter in pixels. */
  size?: number
  /** Track thickness in pixels. */
  thickness?: number
  /** Values to mark with a tick and a small label around the ring. */
  marks?: number[]
  /** Replaces the value and label in the middle of the ring. */
  children?: React.ReactNode
}

function point(cx: number, cy: number, r: number, degrees: number) {
  const a = (degrees * Math.PI) / 180
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) }
}

function arc(cx: number, cy: number, r: number, from: number, to: number) {
  const span = Math.min(to - from, 359.99)
  if (span <= 0) return ""
  const a = point(cx, cy, r, from)
  const b = point(cx, cy, r, from + span)
  return `M ${a.x} ${a.y} A ${r} ${r} 0 ${span > 180 ? 1 : 0} 1 ${b.x} ${b.y}`
}

/**
 * A circular slider. Drag the thumb around the ring (or press anywhere on
 * it), and the value fills the track. It's a `slider`: arrow keys, Page
 * Up/Down, Home and End work as usual.
 */
function RadialSlider({
  value: valueProp,
  defaultValue = 50,
  onValueChange,
  onValueCommit,
  min = 0,
  max = 100,
  step = 1,
  label = "Value",
  format = (v) => String(Math.round(v)),
  sweep = 270,
  size = 224,
  thickness = 14,
  marks,
  children,
  className,
  style,
  ...props
}: RadialSliderProps) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue)
  const value = valueProp ?? uncontrolled
  const [dragging, setDragging] = React.useState(false)
  const thumbRef = React.useRef<HTMLDivElement>(null)
  const latest = React.useRef(value)

  const span = Math.min(360, Math.max(30, sweep))
  // Start angle, measured clockwise from 3 o'clock, so the gap is centred at the bottom.
  const start = 90 + (360 - span) / 2
  const c = size / 2
  // Marks sit outside the ring, so leave room for their labels.
  const r = c - thickness / 2 - (marks?.length ? 34 : 6)
  const ratio = (value - min) / (max - min)
  const thumb = point(c, c, r, start + ratio * span)

  const set = (next: number) => {
    const snapped = Math.min(max, Math.max(min, Math.round((next - min) / step) * step + min))
    const rounded = Number(snapped.toFixed(10))
    latest.current = rounded
    setUncontrolled(rounded)
    onValueChange?.(rounded)
    return rounded
  }

  const valueAt = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left - rect.width / 2
    const y = event.clientY - rect.top - rect.height / 2
    const angle = (Math.atan2(y, x) * 180) / Math.PI
    const along = (((angle - start) % 360) + 360) % 360
    let next = along <= span ? along / span : along < span + (360 - span) / 2 ? 1 : 0
    // Never jump straight from one end of the track to the other mid-drag.
    const current = (latest.current - min) / (max - min)
    if (Math.abs(next - current) > 0.5) next = current > 0.5 ? 1 : 0
    return min + next * (max - min)
  }

  return (
    <div
      data-slot="radial-slider"
      className={cn("relative shrink-0 touch-none select-none", dragging ? "cursor-grabbing" : "cursor-pointer", className)}
      style={{ width: size, height: size, ...style }}
      onPointerDown={(event) => {
        if (event.button !== 0) return
        event.currentTarget.setPointerCapture(event.pointerId)
        event.preventDefault()
        thumbRef.current?.focus()
        latest.current = value
        set(valueAt(event))
        setDragging(true)
      }}
      onPointerMove={(event) => {
        if (dragging) set(valueAt(event))
      }}
      onPointerUp={() => {
        if (!dragging) return
        setDragging(false)
        onValueCommit?.(latest.current)
      }}
      onPointerCancel={() => setDragging(false)}
      {...props}
    >
      <svg aria-hidden="true" width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="absolute inset-0 overflow-visible">
        <path d={arc(c, c, r, start, start + span)} fill="none" strokeWidth={thickness} strokeLinecap="round" className="stroke-muted" />
        {ratio > 0 ? (
          <path
            d={arc(c, c, r, start, start + ratio * span)}
            fill="none"
            strokeWidth={thickness}
            strokeLinecap="round"
            className="stroke-primary"
          />
        ) : null}
        {marks?.map((mark) => {
          const angle = start + ((mark - min) / (max - min)) * span
          const inner = point(c, c, r + thickness / 2 + 3, angle)
          const outer = point(c, c, r + thickness / 2 + 7, angle)
          const text = point(c, c, r + thickness / 2 + 10, angle)
          // Labels grow away from the ring: leftwards on the left side, rightwards on the right.
          const cos = Math.cos((angle * Math.PI) / 180)
          const sin = Math.sin((angle * Math.PI) / 180)
          const anchor = cos > 0.35 ? "start" : cos < -0.35 ? "end" : "middle"
          const baseline = sin < -0.35 ? "auto" : sin > 0.35 ? "hanging" : "central"
          return (
            <g key={mark}>
              <line
                x1={inner.x}
                y1={inner.y}
                x2={outer.x}
                y2={outer.y}
                strokeWidth={1.5}
                strokeLinecap="round"
                className="stroke-muted-foreground/50"
              />
              <text
                x={text.x}
                y={text.y}
                textAnchor={anchor}
                dominantBaseline={baseline}
                className="fill-muted-foreground text-[10px] tabular-nums"
              >
                {format(mark)}
              </text>
            </g>
          )
        })}
      </svg>

      <div
        ref={thumbRef}
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={format(value)}
        onKeyDown={(event) => {
          const big = Math.max(step, (max - min) / 10)
          const keys: Record<string, number> = {
            ArrowUp: value + step,
            ArrowRight: value + step,
            ArrowDown: value - step,
            ArrowLeft: value - step,
            PageUp: value + big,
            PageDown: value - big,
            Home: min,
            End: max,
          }
          if (!(event.key in keys)) return
          event.preventDefault()
          // Set first: an optional call skips its arguments when there's no `onValueCommit`.
          const next = set(keys[event.key])
          onValueCommit?.(next)
        }}
        className={cn(
          "absolute rounded-full border-[3px] border-primary bg-background shadow-[0_2px_6px_rgb(0_0_0/0.25)] outline-none focus-visible:ring-4 focus-visible:ring-ring/50",
          "transition-[scale] duration-150 motion-reduce:transition-none",
          dragging && "scale-110",
        )}
        style={{
          width: thickness + 10,
          height: thickness + 10,
          left: thumb.x - (thickness + 10) / 2,
          top: thumb.y - (thickness + 10) / 2,
        }}
      />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
        {children ?? (
          <>
            <span className="text-4xl font-semibold tracking-tight tabular-nums">{format(value)}</span>
            <span className="mt-1 text-xs tracking-widest text-muted-foreground uppercase">{label}</span>
          </>
        )}
      </div>
    </div>
  )
}

export { RadialSlider }
