"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface InfiniteGridItem {
  id: string
  src: string
  alt: string
  /** Shown over the bottom of the tile. */
  title?: string
  /** A second line under the title. */
  caption?: string
}

interface InfiniteGridProps extends Omit<React.ComponentProps<"div">, "onSelect"> {
  items: InfiniteGridItem[]
  /** Makes each tile a button. */
  onSelect?: (item: InfiniteGridItem) => void
  /** Tile width in pixels. */
  cellWidth?: number
  /** Tile height in pixels. */
  cellHeight?: number
  /** Space between tiles in pixels. */
  gap?: number
  /** Accessible name for the wall. */
  label?: string
}

const FRICTION = 0.94

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

const mod = (n: number, m: number) => ((n % m) + m) % m

/**
 * An endless wall of tiles you can pan in every direction. Drag it (it glides
 * on when you let go), scroll it with a trackpad or wheel, or use the arrow
 * keys. The items repeat forever, and only the tiles in view are rendered.
 */
function InfiniteGrid({
  items,
  onSelect,
  cellWidth = 220,
  cellHeight = 280,
  gap = 20,
  label = "Photo wall",
  className,
  ...props
}: InfiniteGridProps) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const layerRef = React.useRef<HTMLDivElement>(null)
  const offset = React.useRef({ x: 0, y: 0 })
  const velocity = React.useRef({ x: 0, y: 0 })
  const frame = React.useRef(0)
  const pointer = React.useRef<{ id: number; x: number; y: number; lastX: number; lastY: number; lastT: number; moved: boolean } | null>(
    null,
  )
  const [size, setSize] = React.useState({ width: 1024, height: 560 })
  const [origin, setOrigin] = React.useState({ col: -1, row: -1 })
  const [dragging, setDragging] = React.useState(false)
  const reduce = useReducedMotion()
  const instructionsId = React.useId()

  const pitchX = cellWidth + gap
  const pitchY = cellHeight + gap
  const cols = Math.ceil(size.width / pitchX) + 2
  const rows = Math.ceil(size.height / pitchY) + 3
  // Step through the list differently on each row, so a tile never sits next to itself.
  const rowStep = items.length > 2 ? Math.max(2, Math.round(items.length * 0.38)) : 1

  /** Moves the wall: the layer slides directly, and React only re-renders when a new row or column comes into view. */
  const apply = React.useCallback(() => {
    const { x, y } = offset.current
    const col = Math.floor(-x / pitchX) - 1
    const row = Math.floor(-y / pitchY) - 1
    if (layerRef.current) layerRef.current.style.transform = `translate3d(${x + col * pitchX}px, ${y + row * pitchY}px, 0)`
    setOrigin((o) => (o.col === col && o.row === row ? o : { col, row }))
  }, [pitchX, pitchY])

  const stop = () => {
    cancelAnimationFrame(frame.current)
    velocity.current = { x: 0, y: 0 }
  }

  /** Eases the wall by (dx, dy), used by the arrow keys and when a tile gets focus. */
  const glide = React.useCallback(
    (dx: number, dy: number) => {
      cancelAnimationFrame(frame.current)
      if (reduce) {
        offset.current.x += dx
        offset.current.y += dy
        apply()
        return
      }
      const from = { ...offset.current }
      const begin = performance.now()
      const tick = (now: number) => {
        const t = Math.min(1, (now - begin) / 320)
        const eased = 1 - Math.pow(1 - t, 3)
        offset.current = { x: from.x + dx * eased, y: from.y + dy * eased }
        apply()
        if (t < 1) frame.current = requestAnimationFrame(tick)
      }
      frame.current = requestAnimationFrame(tick)
    },
    [apply, reduce],
  )

  React.useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const observer = new ResizeObserver(() => setSize({ width: el.clientWidth, height: el.clientHeight }))
    observer.observe(el)
    // Wheel and trackpad pan the wall. It needs a non-passive listener to keep the page still.
    const onWheel = (event: WheelEvent) => {
      event.preventDefault()
      cancelAnimationFrame(frame.current)
      offset.current.x -= event.shiftKey && !event.deltaX ? event.deltaY : event.deltaX
      offset.current.y -= event.shiftKey && !event.deltaX ? 0 : event.deltaY
      apply()
    }
    el.addEventListener("wheel", onWheel, { passive: false })
    apply()
    return () => {
      observer.disconnect()
      el.removeEventListener("wheel", onWheel)
      cancelAnimationFrame(frame.current)
    }
  }, [apply])

  const coast = () => {
    const step = () => {
      velocity.current.x *= FRICTION
      velocity.current.y *= FRICTION
      offset.current.x += velocity.current.x
      offset.current.y += velocity.current.y
      apply()
      if (Math.hypot(velocity.current.x, velocity.current.y) > 0.15) frame.current = requestAnimationFrame(step)
    }
    frame.current = requestAnimationFrame(step)
  }

  const tiles: React.ReactNode[] = []
  if (items.length > 0) {
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        const col = origin.col + c
        const row = origin.row + r
        const item = items[mod(col + row * rowStep, items.length)]
        // Every other column sits half a tile lower.
        const top = r * pitchY + (mod(col, 2) === 1 ? pitchY / 2 : 0)
        const tileClass =
          "group/tile absolute overflow-hidden rounded-2xl bg-muted text-left shadow-[0_1px_2px_rgb(0_0_0/0.08),0_12px_30px_-16px_rgb(0_0_0/0.45)] outline-none focus-visible:ring-3 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        const body = (
          <>
            <img
              src={item.src}
              alt={onSelect ? "" : item.alt}
              draggable={false}
              loading="lazy"
              className="size-full object-cover transition-transform duration-700 ease-out group-hover/tile:scale-105 motion-reduce:transition-none"
            />
            {item.title ? (
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/75 via-black/30 to-transparent p-4 pt-10 text-white">
                <span className="block text-sm font-medium">{item.title}</span>
                {item.caption ? <span className="block text-xs text-white/80">{item.caption}</span> : null}
              </span>
            ) : null}
          </>
        )
        const style = { left: c * pitchX, top, width: cellWidth, height: cellHeight }
        tiles.push(
          onSelect ? (
            <button
              key={`${col}:${row}`}
              type="button"
              aria-label={item.title ? `${item.title}: ${item.alt}` : item.alt}
              className={tileClass}
              style={style}
              onClick={() => {
                if (!pointer.current?.moved) onSelect(item)
              }}
              onFocus={(event) => {
                // Bring a tile reached with Tab fully into view.
                const root = rootRef.current?.getBoundingClientRect()
                const tile = event.currentTarget.getBoundingClientRect()
                if (!root) return
                const dx =
                  tile.left < root.left + gap
                    ? root.left + gap - tile.left
                    : tile.right > root.right - gap
                      ? root.right - gap - tile.right
                      : 0
                const dy =
                  tile.top < root.top + gap
                    ? root.top + gap - tile.top
                    : tile.bottom > root.bottom - gap
                      ? root.bottom - gap - tile.bottom
                      : 0
                if (dx || dy) glide(dx, dy)
              }}
            >
              {body}
            </button>
          ) : (
            <figure key={`${col}:${row}`} className={cn(tileClass, "m-0")} style={style}>
              {body}
            </figure>
          ),
        )
      }
    }
  }

  return (
    <div
      ref={rootRef}
      data-slot="infinite-grid"
      role="region"
      aria-roledescription="infinite grid"
      aria-label={label}
      aria-describedby={instructionsId}
      tabIndex={0}
      onKeyDown={(event) => {
        const moves: Record<string, [number, number]> = {
          ArrowLeft: [pitchX, 0],
          ArrowRight: [-pitchX, 0],
          ArrowUp: [0, pitchY],
          ArrowDown: [0, -pitchY],
        }
        const move = moves[event.key]
        if (!move) return
        event.preventDefault()
        glide(move[0], move[1])
      }}
      onPointerDown={(event) => {
        if (event.button !== 0) return
        stop()
        pointer.current = {
          id: event.pointerId,
          x: event.clientX,
          y: event.clientY,
          lastX: event.clientX,
          lastY: event.clientY,
          lastT: event.timeStamp,
          moved: false,
        }
      }}
      onPointerMove={(event) => {
        const p = pointer.current
        if (!p || p.id !== event.pointerId) return
        if (!p.moved && Math.hypot(event.clientX - p.x, event.clientY - p.y) < 5) return
        if (!p.moved) {
          // Only capture once it's a real drag, so a plain click still reaches the tile.
          p.moved = true
          event.currentTarget.setPointerCapture(event.pointerId)
          setDragging(true)
        }
        const dx = event.clientX - p.lastX
        const dy = event.clientY - p.lastY
        const dt = Math.max(1, event.timeStamp - p.lastT)
        offset.current.x += dx
        offset.current.y += dy
        // Velocity in pixels per frame, for the glide after release.
        velocity.current = { x: (dx / dt) * 16, y: (dy / dt) * 16 }
        p.lastX = event.clientX
        p.lastY = event.clientY
        p.lastT = event.timeStamp
        apply()
      }}
      onPointerUp={(event) => {
        const p = pointer.current
        if (!p || p.id !== event.pointerId) return
        if (p.moved) {
          setDragging(false)
          if (!reduce && event.timeStamp - p.lastT < 80) coast()
        }
        // Keep `moved` for the click that follows, then forget the pointer.
        window.setTimeout(() => (pointer.current = null), 0)
      }}
      onPointerCancel={() => {
        pointer.current = null
        setDragging(false)
      }}
      className={cn(
        "relative h-[32rem] w-full touch-none overflow-hidden rounded-3xl bg-muted/40 outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50",
        dragging ? "cursor-grabbing" : "cursor-grab",
        className,
      )}
      {...props}
    >
      <div ref={layerRef} className="absolute top-0 left-0 will-change-transform">
        {tiles}
      </div>
      {/* Soft edges, so the wall seems to carry on past the frame. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_0_60px_30px_var(--background)] opacity-80"
      />
      <p id={instructionsId} className="sr-only">
        Drag, scroll or use the arrow keys to move around the wall.
      </p>
    </div>
  )
}

export { InfiniteGrid }
