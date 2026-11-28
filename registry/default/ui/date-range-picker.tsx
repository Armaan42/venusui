"use client"

import * as React from "react"
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

export interface DateRange {
  from: Date
  to: Date
}

export interface DateRangePreset {
  label: string
  /** Returns the range, worked out from today. */
  range: (today: Date) => DateRange
}

interface DateRangePickerProps extends Omit<React.ComponentProps<"div">, "defaultValue" | "onChange"> {
  value?: DateRange | null
  defaultValue?: DateRange | null
  onValueChange?: (range: DateRange | null) => void
  /** Visible label above the field. */
  label?: string
  placeholder?: string
  /** Quick picks beside the calendars. Pass `[]` for none. */
  presets?: DateRangePreset[]
  /** Earliest and latest dates that can be picked. */
  min?: Date
  max?: Date
  /** 0 for Sunday, 1 for Monday. */
  weekStartsOn?: 0 | 1
  /** BCP 47 language for month and day names; defaults to the browser's. */
  locale?: string
}

const day = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n)
const addMonths = (d: Date, n: number) => {
  const target = new Date(d.getFullYear(), d.getMonth() + n, 1)
  const last = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate()
  return new Date(target.getFullYear(), target.getMonth(), Math.min(d.getDate(), last))
}
const monthStart = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1)
const same = (a?: Date | null, b?: Date | null) => !!a && !!b && a.getTime() === b.getTime()
const between = (d: Date, a: Date, b: Date) => {
  const [lo, hi] = a <= b ? [a, b] : [b, a]
  return d > lo && d < hi
}

function subscribeWide(onChange: () => void) {
  const query = window.matchMedia("(min-width: 640px)")
  query.addEventListener("change", onChange)
  return () => query.removeEventListener("change", onChange)
}

const defaultPresets: DateRangePreset[] = [
  { label: "Today", range: (t) => ({ from: t, to: t }) },
  { label: "Last 7 days", range: (t) => ({ from: addDays(t, -6), to: t }) },
  { label: "Last 30 days", range: (t) => ({ from: addDays(t, -29), to: t }) },
  { label: "This month", range: (t) => ({ from: monthStart(t), to: new Date(t.getFullYear(), t.getMonth() + 1, 0) }) },
  {
    label: "Last month",
    range: (t) => ({ from: new Date(t.getFullYear(), t.getMonth() - 1, 1), to: new Date(t.getFullYear(), t.getMonth(), 0) }),
  },
]

/**
 * A field that opens a two-month calendar for picking a start and an end
 * date, with quick presets beside it. Click the first day, then the last; the
 * range previews as you hover. Each month is a keyboard grid: arrow keys move
 * by day and week, Page Up and Page Down by month, Home and End to the ends
 * of the week.
 */
function DateRangePicker({
  value: valueProp,
  defaultValue = null,
  onValueChange,
  label = "Dates",
  placeholder = "Pick dates",
  presets = defaultPresets,
  min,
  max,
  weekStartsOn = 1,
  locale,
  className,
  ...props
}: DateRangePickerProps) {
  const [uncontrolled, setUncontrolled] = React.useState<DateRange | null>(defaultValue)
  const value = valueProp !== undefined ? valueProp : uncontrolled
  const [open, setOpen] = React.useState(false)
  const [anchor, setAnchor] = React.useState<Date | null>(null)
  const [hover, setHover] = React.useState<Date | null>(null)
  const [focused, setFocused] = React.useState<Date>(() => day(value?.from ?? new Date()))
  const [view, setView] = React.useState<Date>(() => monthStart(value?.from ?? new Date()))
  const rootRef = React.useRef<HTMLDivElement>(null)
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const panelRef = React.useRef<HTMLDivElement>(null)
  const id = React.useId()
  // Two months side by side on wider screens, one on phones.
  const wide = React.useSyncExternalStore(
    subscribeWide,
    () => window.matchMedia("(min-width: 640px)").matches,
    () => true,
  )
  const shownMonths = wide ? 2 : 1

  const fmt = React.useMemo(() => new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", year: "numeric" }), [locale])
  const fmtShort = React.useMemo(() => new Intl.DateTimeFormat(locale, { day: "numeric", month: "short" }), [locale])
  const fmtMonth = React.useMemo(() => new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }), [locale])
  const fmtFull = React.useMemo(
    () => new Intl.DateTimeFormat(locale, { weekday: "long", day: "numeric", month: "long", year: "numeric" }),
    [locale],
  )
  const fmtWeekday = React.useMemo(() => new Intl.DateTimeFormat(locale, { weekday: "short" }), [locale])

  const lo = min ? day(min) : null
  const hi = max ? day(max) : null
  const allowed = (d: Date) => (!lo || d >= lo) && (!hi || d <= hi)
  const clamp = (d: Date) => (lo && d < lo ? lo : hi && d > hi ? hi : d)

  const commit = (range: DateRange | null) => {
    setUncontrolled(range)
    onValueChange?.(range)
  }

  const show = () => {
    const start = day(value?.from ?? new Date())
    setFocused(start)
    setView(monthStart(start))
    setAnchor(null)
    setOpen(true)
  }

  const close = (returnFocus = true) => {
    setOpen(false)
    setAnchor(null)
    setHover(null)
    if (returnFocus) triggerRef.current?.focus()
  }

  const pick = (d: Date) => {
    if (!allowed(d)) return
    if (!anchor) {
      setAnchor(d)
      return
    }
    const [from, to] = d < anchor ? [d, anchor] : [anchor, d]
    commit({ from, to })
    close()
  }

  // Keep the panel on screen: nudge it back in if it would spill past either edge.
  React.useLayoutEffect(() => {
    const panel = panelRef.current
    if (!open || !panel) return
    panel.style.translate = ""
    const rect = panel.getBoundingClientRect()
    const margin = 8
    const shift = rect.right > window.innerWidth - margin ? window.innerWidth - margin - rect.right : rect.left < margin ? margin - rect.left : 0
    if (shift) panel.style.translate = `${shift}px 0`
  }, [open, wide])

  // Focus the active day when the panel opens or the focused day changes.
  React.useEffect(() => {
    if (!open) return
    panelRef.current?.querySelector<HTMLButtonElement>('[data-focused="true"]')?.focus()
  }, [open, focused])

  React.useEffect(() => {
    if (!open) return
    const onDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) close(false)
    }
    document.addEventListener("pointerdown", onDown)
    return () => document.removeEventListener("pointerdown", onDown)
  })

  const moveFocus = (d: Date) => {
    const next = clamp(d)
    setFocused(next)
    // Keep the focused day inside the months on show.
    const first = view
    const lastShown = addMonths(view, shownMonths - 1)
    if (next < first) setView(monthStart(next))
    else if (next >= new Date(lastShown.getFullYear(), lastShown.getMonth() + 1, 1))
      setView(monthStart(addMonths(next, -(shownMonths - 1))))
  }

  const nights = value ? Math.round((day(value.to).getTime() - day(value.from).getTime()) / 86400000) + 1 : 0
  const today = day(new Date())
  const previewEnd = anchor ? (hover ?? focused) : null

  const weekdays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(2024, 0, 7 + ((i + weekStartsOn) % 7)) // 7 Jan 2024 was a Sunday
    return { short: fmtWeekday.format(d), long: new Intl.DateTimeFormat(locale, { weekday: "long" }).format(d) }
  })

  const month = (start: Date, index: number) => {
    const lead = (start.getDay() - weekStartsOn + 7) % 7
    const daysIn = new Date(start.getFullYear(), start.getMonth() + 1, 0).getDate()
    const cells: (Date | null)[] = [
      ...Array(lead).fill(null),
      ...Array.from({ length: daysIn }, (_, i) => new Date(start.getFullYear(), start.getMonth(), i + 1)),
    ]
    while (cells.length % 7) cells.push(null)
    const weeks = Array.from({ length: cells.length / 7 }, (_, w) => cells.slice(w * 7, w * 7 + 7))
    const headingId = `${id}-m${index}`
    return (
      <div key={start.toISOString()} className="w-[17.5rem]">
        <p id={headingId} className="mb-2 text-center text-sm font-medium">
          {fmtMonth.format(start)}
        </p>
        <table role="grid" aria-labelledby={headingId} className="w-full border-collapse">
          <thead>
            <tr>
              {weekdays.map((w) => (
                <th key={w.long} scope="col" abbr={w.long} className="pb-1 text-center text-xs font-normal text-muted-foreground">
                  {w.short.slice(0, 2)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weeks.map((week, w) => (
              <tr key={w}>
                {week.map((d, i) => {
                  if (!d) return <td key={i} />
                  const from = anchor ?? value?.from ?? null
                  const to = anchor ? previewEnd : (value?.to ?? null)
                  const isStart = same(d, from && to ? (from <= to ? from : to) : from)
                  const isEnd = same(d, from && to ? (from <= to ? to : from) : null)
                  const inside = !!from && !!to && between(d, from, to)
                  const selected = isStart || isEnd || inside
                  const disabled = !allowed(d)
                  return (
                    <td
                      key={i}
                      role="gridcell"
                      aria-selected={selected}
                      className={cn(
                        "p-0",
                        inside && "bg-primary/10",
                        isStart && to && !same(from, to) && "rounded-l-full bg-primary/10",
                        isEnd && "rounded-r-full bg-primary/10",
                      )}
                    >
                      <button
                        type="button"
                        tabIndex={same(d, focused) ? 0 : -1}
                        data-focused={same(d, focused)}
                        aria-label={`${fmtFull.format(d)}${same(d, today) ? ", today" : ""}`}
                        aria-disabled={disabled || undefined}
                        onClick={() => {
                          setFocused(d)
                          pick(d)
                        }}
                        onPointerEnter={() => anchor && setHover(d)}
                        onKeyDown={(event) => {
                          const steps: Record<string, () => Date> = {
                            ArrowLeft: () => addDays(d, -1),
                            ArrowRight: () => addDays(d, 1),
                            ArrowUp: () => addDays(d, -7),
                            ArrowDown: () => addDays(d, 7),
                            PageUp: () => addMonths(d, event.shiftKey ? -12 : -1),
                            PageDown: () => addMonths(d, event.shiftKey ? 12 : 1),
                            Home: () => addDays(d, -((d.getDay() - weekStartsOn + 7) % 7)),
                            End: () => addDays(d, 6 - ((d.getDay() - weekStartsOn + 7) % 7)),
                          }
                          if (event.key in steps) {
                            event.preventDefault()
                            moveFocus(steps[event.key]())
                          }
                        }}
                        className={cn(
                          "relative grid size-10 place-items-center rounded-full text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                          isStart || isEnd ? "bg-primary font-medium text-primary-foreground" : "hover:bg-muted",
                          disabled && "cursor-not-allowed text-muted-foreground/50 line-through hover:bg-transparent",
                        )}
                      >
                        {d.getDate()}
                        {same(d, today) ? (
                          <span
                            aria-hidden="true"
                            className={cn(
                              "absolute bottom-1.5 size-1 rounded-full",
                              isStart || isEnd ? "bg-primary-foreground" : "bg-primary",
                            )}
                          />
                        ) : null}
                      </button>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div ref={rootRef} data-slot="date-range-picker" className={cn("relative w-full max-w-xs", className)} {...props}>
      <p id={`${id}-label`} className="mb-1.5 text-sm font-medium">
        {label}
      </p>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-labelledby={`${id}-label ${id}-value`}
        onClick={() => (open ? close() : show())}
        className="flex h-10 w-full items-center gap-2 rounded-lg border bg-background px-3 text-left text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <CalendarDays aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
        <span id={`${id}-value`} className={cn("truncate", !value && "text-muted-foreground")}>
          {value
            ? same(value.from, value.to)
              ? fmt.format(value.from)
              : `${fmtShort.format(value.from)} – ${fmt.format(value.to)}`
            : placeholder}
        </span>
      </button>

      {open ? (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="false"
          aria-label={`Choose ${label.toLowerCase()}`}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              event.stopPropagation()
              close()
            }
          }}
          className="absolute top-full left-0 z-50 mt-2 flex w-max max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border bg-popover text-popover-foreground shadow-xl sm:flex-row"
        >
          {presets.length ? (
            <ul className="flex shrink-0 gap-1 overflow-x-auto border-b p-2 sm:w-40 sm:flex-col sm:border-r sm:border-b-0">
              {presets.map((preset) => (
                <li key={preset.label}>
                  <button
                    type="button"
                    onClick={() => {
                      const r = preset.range(today)
                      commit({ from: clamp(day(r.from)), to: clamp(day(r.to)) })
                      close()
                    }}
                    className="w-full rounded-md px-2.5 py-1.5 text-left text-sm whitespace-nowrap outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    {preset.label}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
          <div className="p-3">
            <div className="relative flex gap-6">
              <button
                type="button"
                onClick={() => setView((v) => addMonths(v, -1))}
                aria-label="Previous month"
                className="absolute top-0 left-0 grid size-7 place-items-center rounded-md outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <ChevronLeft aria-hidden="true" className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => setView((v) => addMonths(v, 1))}
                aria-label="Next month"
                className="absolute top-0 right-0 grid size-7 place-items-center rounded-md outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <ChevronRight aria-hidden="true" className="size-4" />
              </button>
              {month(view, 0)}
              {wide ? month(addMonths(view, 1), 1) : null}
            </div>
            <div className="mt-3 flex items-center justify-between gap-3 border-t pt-3 text-sm">
              <p aria-live="polite" className="text-muted-foreground">
                {anchor ? "Now pick the last day" : value ? `${nights} ${nights === 1 ? "day" : "days"} selected` : "Pick the first day"}
              </p>
              {value ? (
                <button
                  type="button"
                  onClick={() => {
                    commit(null)
                    setAnchor(null)
                  }}
                  className="rounded-md px-2.5 py-1 font-medium outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  Clear
                </button>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export { DateRangePicker }
