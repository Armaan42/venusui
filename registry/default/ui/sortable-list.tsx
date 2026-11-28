"use client"

import * as React from "react"
import { GripVertical } from "lucide-react"

import { cn } from "@/lib/utils"

export interface SortableItem {
  id: string
  /** Short name, used for the handle's label and announcements. */
  label: string
  content: React.ReactNode
}

interface SortableListProps extends Omit<React.ComponentProps<"ol">, "children"> {
  items: SortableItem[]
  /** Called with the new order after each move. */
  onReorder?: (items: SortableItem[]) => void
  /** Accessible name for the list, e.g. "Playlist". */
  label: string
}

const GAP = 8

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)")
  query.addEventListener("change", onChange)
  return () => query.removeEventListener("change", onChange)
}

function useReducedMotion() {
  return React.useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  )
}

interface Drag {
  id: string
  from: number
  to: number
  startY: number
  dy: number
  heights: number[]
  tops: number[]
}

/**
 * A list you reorder by dragging. Grab a row by its handle: the others slide
 * out of the way and the row settles into its new place when you let go.
 * From the keyboard, press Space on a handle to pick the row up, move it with
 * the arrow keys and press Space again to drop it (Escape puts it back).
 */
function SortableList({ items, onReorder, label, className, ...props }: SortableListProps) {
  const [order, setOrder] = React.useState(() => items.map((item) => item.id))
  const [drag, setDrag] = React.useState<Drag | null>(null)
  const [settle, setSettle] = React.useState<{ id: string; offset: number } | null>(null)
  const [grabbed, setGrabbed] = React.useState<{ id: string; original: string[] } | null>(null)
  const [announcement, setAnnouncement] = React.useState("")
  const rowRefs = React.useRef(new Map<string, HTMLLIElement>())
  const reduce = useReducedMotion()
  const byId = React.useMemo(() => new Map(items.map((item) => [item.id, item])), [items])

  // Pick up new items and forget removed ones, keeping the current order otherwise.
  const ids = items.map((item) => item.id).join("\u0000")
  const [seen, setSeen] = React.useState(ids)
  if (seen !== ids) {
    setSeen(ids)
    setOrder((current) => [...current.filter((id) => byId.has(id)), ...items.map((i) => i.id).filter((id) => !current.includes(id))])
  }

  const commit = (next: string[]) => {
    setOrder(next)
    onReorder?.(next.map((id) => byId.get(id)!).filter(Boolean))
  }

  // A dropped row glides from where it was let go into its new slot.
  React.useEffect(() => {
    if (!settle) return
    const frame = requestAnimationFrame(() => setSettle(null))
    return () => cancelAnimationFrame(frame)
  }, [settle])

  const shiftFor = (index: number) => {
    if (!drag || index === drag.from) return 0
    const size = drag.heights[drag.from] + GAP
    if (drag.from < drag.to && index > drag.from && index <= drag.to) return -size
    if (drag.from > drag.to && index >= drag.to && index < drag.from) return size
    return 0
  }

  const position = (id: string, list = order) => `position ${list.indexOf(id) + 1} of ${list.length}`

  return (
    <>
      <ol
        data-slot="sortable-list"
        aria-label={label}
        className={cn("m-0 flex list-none flex-col p-0", className)}
        style={{ gap: GAP }}
        {...props}
      >
        {order.map((id, index) => {
          const item = byId.get(id)
          if (!item) return null
          const isDragged = drag?.id === id
          const isGrabbed = grabbed?.id === id
          const y = isDragged ? drag.dy : settle?.id === id ? settle.offset : shiftFor(index)
          return (
            <li
              key={id}
              ref={(el) => {
                if (el) rowRefs.current.set(id, el)
                else rowRefs.current.delete(id)
              }}
              className={cn(
                "relative flex items-center gap-2 rounded-xl border bg-card p-2 pr-3 text-card-foreground",
                !isDragged && !settle && !reduce && "transition-[translate,box-shadow] duration-200 ease-out",
                settle?.id !== id && isDragged ? "z-10 shadow-[0_18px_40px_-16px_rgb(0_0_0/0.45)]" : "shadow-xs",
                isGrabbed && "ring-3 ring-ring/50",
              )}
              style={{ translate: `0 ${y}px`, zIndex: isDragged || settle?.id === id ? 10 : undefined }}
            >
              <button
                type="button"
                aria-label={`Move ${item.label}`}
                aria-describedby={`${id}-sortable-help`}
                aria-pressed={isGrabbed}
                onPointerDown={(event) => {
                  if (event.button !== 0 || grabbed) return
                  event.preventDefault()
                  event.currentTarget.setPointerCapture(event.pointerId)
                  const rows = order.map((rowId) => rowRefs.current.get(rowId)!.getBoundingClientRect())
                  setDrag({
                    id,
                    from: index,
                    to: index,
                    startY: event.clientY,
                    dy: 0,
                    heights: rows.map((r) => r.height),
                    tops: rows.map((r) => r.top),
                  })
                }}
                onPointerMove={(event) => {
                  if (!drag || drag.id !== id) return
                  const dy = event.clientY - drag.startY
                  // The row's centre decides its new slot.
                  const centre = drag.tops[drag.from] + drag.heights[drag.from] / 2 + dy
                  let to = 0
                  drag.tops.forEach((top, i) => {
                    if (i !== drag.from && centre > top + drag.heights[i] / 2) to++
                  })
                  setDrag({ ...drag, dy, to })
                }}
                onPointerUp={() => {
                  if (!drag || drag.id !== id) return
                  const { from, to, dy, heights } = drag
                  setDrag(null)
                  if (from === to) {
                    if (!reduce) setSettle({ id, offset: dy })
                    return
                  }
                  const moved = from < to ? heights.slice(from + 1, to + 1) : heights.slice(to, from)
                  const distance = moved.reduce((sum, h) => sum + h + GAP, 0) * (from < to ? 1 : -1)
                  const next = [...order]
                  next.splice(to, 0, next.splice(from, 1)[0])
                  commit(next)
                  if (!reduce) setSettle({ id, offset: dy - distance })
                  setAnnouncement(`${item.label} moved to ${position(id, next)}.`)
                }}
                onPointerCancel={() => setDrag(null)}
                onKeyDown={(event) => {
                  if (event.key === " " || event.key === "Enter") {
                    event.preventDefault()
                    if (isGrabbed) {
                      setGrabbed(null)
                      setAnnouncement(`${item.label} dropped at ${position(id)}.`)
                    } else {
                      setGrabbed({ id, original: order })
                      setAnnouncement(
                        `${item.label} picked up, ${position(id)}. Use the arrow keys to move, Space to drop, Escape to cancel.`,
                      )
                    }
                  } else if (isGrabbed && (event.key === "ArrowUp" || event.key === "ArrowDown")) {
                    event.preventDefault()
                    const to = index + (event.key === "ArrowUp" ? -1 : 1)
                    if (to < 0 || to >= order.length) return
                    const next = [...order]
                    next.splice(to, 0, next.splice(index, 1)[0])
                    commit(next)
                    setAnnouncement(`${item.label}, ${position(id, next)}.`)
                  } else if (isGrabbed && event.key === "Escape") {
                    event.preventDefault()
                    commit(grabbed.original)
                    setGrabbed(null)
                    setAnnouncement(`Move cancelled. ${item.label} is back at ${position(id, grabbed.original)}.`)
                  }
                }}
                onBlur={() => {
                  if (isGrabbed) setGrabbed(null)
                }}
                className={cn(
                  "grid h-10 w-8 shrink-0 touch-none place-items-center rounded-lg text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50",
                  isDragged ? "cursor-grabbing" : "cursor-grab",
                )}
              >
                <GripVertical aria-hidden="true" className="size-4" />
              </button>
              <div className="min-w-0 flex-1">{item.content}</div>
              <span id={`${id}-sortable-help`} hidden>
                Press Space to pick up, the arrow keys to move, Space to drop.
              </span>
            </li>
          )
        })}
      </ol>
      <p aria-live="assertive" className="sr-only">
        {announcement}
      </p>
    </>
  )
}

export { SortableList }
