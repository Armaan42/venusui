"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface KanbanCard {
  id: string
  /** Short name, used in announcements. */
  title: string
  content?: React.ReactNode
}

export interface KanbanColumn {
  id: string
  title: string
  cards: KanbanCard[]
}

interface KanbanBoardProps extends Omit<React.ComponentProps<"div">, "onChange"> {
  columns: KanbanColumn[]
  /** Called with every column after a card moves. */
  onChange?: (columns: KanbanColumn[]) => void
  /** Accessible name for the board. */
  label?: string
}

interface Drag {
  card: KanbanCard
  from: { column: number; index: number }
  to: { column: number; index: number }
  /** Pointer position and where on the card it was grabbed. */
  x: number
  y: number
  grabX: number
  grabY: number
  width: number
  height: number
  moved: boolean
}

function moveCard(columns: KanbanColumn[], from: { column: number; index: number }, to: { column: number; index: number }) {
  const next = columns.map((c) => ({ ...c, cards: [...c.cards] }))
  const [card] = next[from.column].cards.splice(from.index, 1)
  next[to.column].cards.splice(to.index, 0, card)
  return next
}

/**
 * A board of columns with cards you drag between them. A tilted copy of the
 * card follows the pointer and a placeholder shows where it will land. From
 * the keyboard, press Space on a card to pick it up, move it with the arrow
 * keys (left and right change column) and press Space to drop it.
 */
function KanbanBoard({ columns: columnsProp, onChange, label = "Board", className, ...props }: KanbanBoardProps) {
  const [columns, setColumns] = React.useState(columnsProp)
  const [drag, setDrag] = React.useState<Drag | null>(null)
  const [grabbed, setGrabbed] = React.useState<{ id: string; original: KanbanColumn[] } | null>(null)
  const [announcement, setAnnouncement] = React.useState("")
  const columnRefs = React.useRef<(HTMLOListElement | null)[]>([])
  const cardRefs = React.useRef(new Map<string, HTMLButtonElement>())

  const commit = (next: KanbanColumn[]) => {
    setColumns(next)
    onChange?.(next)
  }

  const where = (cardId: string, list = columns) => {
    for (let c = 0; c < list.length; c++) {
      const index = list[c].cards.findIndex((card) => card.id === cardId)
      if (index >= 0) return { column: c, index }
    }
    return null
  }

  const describe = (cardId: string, list = columns) => {
    const at = where(cardId, list)
    return at ? `${list[at.column].title}, position ${at.index + 1} of ${list[at.column].cards.length}` : ""
  }

  /** Which column and slot the pointer is over, ignoring the card being dragged. */
  const targetAt = (x: number, y: number, dragged: string) => {
    let column = -1
    columnRefs.current.forEach((el, i) => {
      const r = el?.getBoundingClientRect()
      if (r && x >= r.left - 8 && x <= r.right + 8) column = i
    })
    if (column < 0) return null
    const cards = columns[column].cards.filter((card) => card.id !== dragged)
    let index = 0
    for (const card of cards) {
      const r = cardRefs.current.get(card.id)?.getBoundingClientRect()
      if (r && y > r.top + r.height / 2) index++
    }
    return { column, index }
  }

  // Follow the pointer anywhere on the page while dragging.
  React.useEffect(() => {
    if (!drag) return
    const onMove = (event: PointerEvent) => {
      setDrag((d) => {
        if (!d) return d
        const moved = d.moved || Math.hypot(event.clientX - d.x, event.clientY - d.y) > 4
        return { ...d, x: event.clientX, y: event.clientY, moved, to: (moved && targetAt(event.clientX, event.clientY, d.card.id)) || d.to }
      })
    }
    // This effect re-subscribes on every render, so `drag` here is always the latest.
    const onUp = () => {
      const d = drag
      setDrag(null)
      if (d.moved && (d.to.column !== d.from.column || d.to.index !== d.from.index)) {
        const next = moveCard(columns, d.from, d.to)
        commit(next)
        setAnnouncement(`${d.card.title} moved to ${describe(d.card.id, next)}.`)
      }
    }
    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
    window.addEventListener("pointercancel", onUp)
    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
      window.removeEventListener("pointercancel", onUp)
    }
  })

  const dragging = drag?.moved ? drag : null

  return (
    <div data-slot="kanban-board" role="group" aria-label={label} className={cn("flex gap-4 overflow-x-auto pb-2", className)} {...props}>
      {columns.map((column, c) => {
        const visible = column.cards.filter((card) => card.id !== dragging?.card.id)
        const placeholderAt = dragging && dragging.to.column === c ? dragging.to.index : -1
        return (
          <section
            key={column.id}
            aria-labelledby={`${column.id}-title`}
            className={cn("flex w-72 shrink-0 flex-col rounded-2xl bg-muted/60 p-3 transition-colors", placeholderAt >= 0 && "bg-muted")}
          >
            <h3 id={`${column.id}-title`} className="flex items-center justify-between px-1 pb-3 text-sm font-semibold">
              {column.title}
              <span className="rounded-full bg-background px-2 py-0.5 text-xs font-medium text-muted-foreground tabular-nums">
                {column.cards.length}
              </span>
            </h3>
            <ol
              ref={(el) => {
                columnRefs.current[c] = el
              }}
              className="m-0 flex min-h-24 flex-1 list-none flex-col gap-2 p-0"
            >
              {visible.map((card, i) => (
                <React.Fragment key={card.id}>
                  {placeholderAt === i ? <Placeholder height={dragging!.height} /> : null}
                  <li>
                    <button
                      ref={(el) => {
                        if (el) cardRefs.current.set(card.id, el)
                        else cardRefs.current.delete(card.id)
                      }}
                      type="button"
                      aria-pressed={grabbed?.id === card.id}
                      aria-describedby={`${column.id}-kanban-help`}
                      onPointerDown={(event) => {
                        if (event.button !== 0 || grabbed) return
                        const r = event.currentTarget.getBoundingClientRect()
                        const at = { column: c, index: column.cards.indexOf(card) }
                        setDrag({
                          card,
                          from: at,
                          to: at,
                          x: event.clientX,
                          y: event.clientY,
                          grabX: event.clientX - r.left,
                          grabY: event.clientY - r.top,
                          width: r.width,
                          height: r.height,
                          moved: false,
                        })
                      }}
                      onKeyDown={(event) => {
                        const isGrabbed = grabbed?.id === card.id
                        const at = where(card.id)!
                        if (event.key === " " || event.key === "Enter") {
                          event.preventDefault()
                          if (isGrabbed) {
                            setGrabbed(null)
                            setAnnouncement(`${card.title} dropped in ${describe(card.id)}.`)
                          } else {
                            setGrabbed({ id: card.id, original: columns })
                            setAnnouncement(
                              `${card.title} picked up, ${describe(card.id)}. Arrow keys move it, Space drops it, Escape cancels.`,
                            )
                          }
                          return
                        }
                        if (!isGrabbed) return
                        let to: { column: number; index: number } | null = null
                        if (event.key === "ArrowUp" && at.index > 0) to = { column: at.column, index: at.index - 1 }
                        if (event.key === "ArrowDown" && at.index < columns[at.column].cards.length - 1)
                          to = { column: at.column, index: at.index + 1 }
                        if (event.key === "ArrowLeft" && at.column > 0)
                          to = { column: at.column - 1, index: Math.min(at.index, columns[at.column - 1].cards.length) }
                        if (event.key === "ArrowRight" && at.column < columns.length - 1)
                          to = { column: at.column + 1, index: Math.min(at.index, columns[at.column + 1].cards.length) }
                        if (event.key === "Escape") {
                          event.preventDefault()
                          commit(grabbed.original)
                          setGrabbed(null)
                          setAnnouncement(`Move cancelled. ${card.title} is back in ${describe(card.id, grabbed.original)}.`)
                          requestAnimationFrame(() => cardRefs.current.get(card.id)?.focus())
                          return
                        }
                        if (!to) return
                        event.preventDefault()
                        const next = moveCard(columns, at, to)
                        commit(next)
                        setAnnouncement(`${card.title}, ${describe(card.id, next)}.`)
                        // The card re-mounts in its new column; keep focus on it.
                        requestAnimationFrame(() => cardRefs.current.get(card.id)?.focus())
                      }}
                      onBlur={(event) => {
                        // Moving between columns re-mounts the card; only a real blur ends the move.
                        if (grabbed?.id === card.id && event.relatedTarget && !event.currentTarget.contains(event.relatedTarget))
                          setGrabbed(null)
                      }}
                      className={cn(
                        "block w-full cursor-grab touch-none rounded-xl border bg-card p-3 text-left text-sm text-card-foreground shadow-xs outline-none select-none hover:border-foreground/20 focus-visible:ring-3 focus-visible:ring-ring/50",
                        grabbed?.id === card.id && "ring-3 ring-ring/60",
                      )}
                    >
                      <span className="block font-medium">{card.title}</span>
                      {card.content ? <span className="mt-1.5 block text-muted-foreground">{card.content}</span> : null}
                    </button>
                  </li>
                </React.Fragment>
              ))}
              {placeholderAt >= visible.length ? <Placeholder height={dragging!.height} /> : null}
              {column.cards.length === 0 && placeholderAt < 0 ? (
                <li className="grid flex-1 place-items-center rounded-xl border border-dashed p-4 text-xs text-muted-foreground">
                  Drop cards here
                </li>
              ) : null}
            </ol>
            <span id={`${column.id}-kanban-help`} hidden>
              Press Space to pick up. Arrow keys move the card, left and right change column. Space drops it.
            </span>
          </section>
        )
      })}

      {/* The card under the pointer while dragging. */}
      {dragging ? (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed z-[300] rotate-2 rounded-xl border bg-card p-3 text-sm text-card-foreground shadow-[0_24px_50px_-18px_rgb(0_0_0/0.5)]"
          style={{ left: dragging.x - dragging.grabX, top: dragging.y - dragging.grabY, width: dragging.width }}
        >
          <span className="block font-medium">{dragging.card.title}</span>
          {dragging.card.content ? <span className="mt-1.5 block text-muted-foreground">{dragging.card.content}</span> : null}
        </div>
      ) : null}
      <p aria-live="assertive" className="sr-only">
        {announcement}
      </p>
    </div>
  )
}

function Placeholder({ height }: { height: number }) {
  return (
    <li
      aria-hidden="true"
      className="shrink-0 rounded-xl border-2 border-dashed border-foreground/20 bg-background/60"
      style={{ height }}
    />
  )
}

export { KanbanBoard }
