"use client"

import * as React from "react"
import { CircleAlert, CircleCheck, Info, X } from "lucide-react"

import { cn } from "@/lib/utils"

type Variant = "default" | "success" | "error"

export interface ToastOptions {
  title: string
  description?: string
  variant?: Variant
  /** A button in the toast, e.g. Undo. The toast closes after it runs. */
  action?: { label: string; onClick: () => void }
  /** Milliseconds before it closes by itself. 0 keeps it until dismissed. */
  duration?: number
}

interface ToastItem extends Required<Pick<ToastOptions, "title" | "variant" | "duration">> {
  id: number
  description?: string
  action?: ToastOptions["action"]
  leaving: boolean
}

const ToastContext = React.createContext<{ toast: (options: ToastOptions) => number; dismiss: (id: number) => void } | null>(null)

const VISIBLE = 3
const GAP = 12
const icons = { default: Info, success: CircleCheck, error: CircleAlert }

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

/** One toast: counts down unless paused, and can be swiped away sideways. */
function Toast({
  item,
  index,
  expanded,
  offset,
  paused,
  onDismiss,
  onHeight,
}: {
  item: ToastItem
  index: number
  expanded: boolean
  offset: number
  paused: boolean
  onDismiss: (id: number) => void
  onHeight: (id: number, height: number) => void
}) {
  const ref = React.useRef<HTMLLIElement>(null)
  const [drag, setDrag] = React.useState(0)
  const [dragging, setDragging] = React.useState(false)
  const start = React.useRef<number | null>(null)
  const remaining = React.useRef(item.duration)
  const reduce = useReducedMotion()
  const Icon = icons[item.variant]

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new ResizeObserver(() => onHeight(item.id, el.offsetHeight))
    observer.observe(el)
    return () => observer.disconnect()
  }, [item.id, onHeight])

  // The timer only runs while the stack isn't hovered or focused and the tab is visible.
  React.useEffect(() => {
    if (!item.duration || paused || item.leaving) return
    const began = Date.now()
    const timer = window.setTimeout(() => onDismiss(item.id), remaining.current)
    return () => {
      window.clearTimeout(timer)
      remaining.current -= Date.now() - began
    }
  }, [paused, item.duration, item.id, item.leaving, onDismiss])

  const hidden = index >= VISIBLE
  const y = expanded ? -offset : -index * GAP
  const scale = expanded ? 1 : 1 - index * 0.05

  return (
    <li
      ref={ref}
      role={item.variant === "error" ? "alert" : "status"}
      aria-atomic="true"
      data-variant={item.variant}
      className={cn(
        "pointer-events-auto absolute right-0 bottom-0 w-full touch-pan-y rounded-xl border bg-popover p-4 pr-10 text-sm text-popover-foreground shadow-[0_10px_30px_-12px_rgb(0_0_0/0.35)] select-none",
        !dragging &&
          "transition-[translate,scale,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-opacity",
        "starting:translate-y-full starting:opacity-0",
      )}
      style={{
        translate: `${drag}px ${reduce ? 0 : y}px`,
        scale: reduce ? 1 : scale,
        opacity: item.leaving || hidden ? 0 : 1 - Math.min(1, Math.abs(drag) / 240),
        zIndex: 100 - index,
        visibility: hidden && !expanded ? "hidden" : undefined,
        pointerEvents: item.leaving ? "none" : undefined,
      }}
      onPointerDown={(event) => {
        if ((event.target as HTMLElement).closest("button")) return
        event.currentTarget.setPointerCapture(event.pointerId)
        start.current = event.clientX
        setDragging(true)
      }}
      onPointerMove={(event) => {
        if (start.current !== null) setDrag(Math.max(0, event.clientX - start.current))
      }}
      onPointerUp={() => {
        start.current = null
        setDragging(false)
        if (drag > 90) onDismiss(item.id)
        else setDrag(0)
      }}
      onPointerCancel={() => {
        start.current = null
        setDragging(false)
        setDrag(0)
      }}
    >
      <div className="flex gap-3">
        <Icon
          aria-hidden="true"
          className={cn(
            "mt-0.5 size-4 shrink-0",
            item.variant === "success" && "text-emerald-600 dark:text-emerald-400",
            item.variant === "error" && "text-red-600 dark:text-red-400",
            item.variant === "default" && "text-muted-foreground",
          )}
        />
        <div className="min-w-0 flex-1">
          <p className="font-medium">{item.title}</p>
          {item.description ? <p className="mt-0.5 text-muted-foreground">{item.description}</p> : null}
          {item.action ? (
            <button
              type="button"
              onClick={() => {
                item.action?.onClick()
                onDismiss(item.id)
              }}
              className="mt-2.5 rounded-md border px-2.5 py-1 text-xs font-medium outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {item.action.label}
            </button>
          ) : null}
        </div>
      </div>
      <button
        type="button"
        onClick={() => onDismiss(item.id)}
        aria-label="Dismiss notification"
        className="absolute top-2.5 right-2.5 grid size-6 place-items-center rounded-md text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <X aria-hidden="true" className="size-3.5" />
      </button>
    </li>
  )
}

/**
 * Notifications that stack in the corner. New ones slide in on top and the
 * older ones tuck behind; hover or focus the stack to fan it out and pause
 * the timers. Swipe a toast sideways to dismiss it. Wrap your app in
 * `Toaster` and call `toast()` from `useToast()`.
 */
function Toaster({ children, className }: { children: React.ReactNode; className?: string }) {
  const [items, setItems] = React.useState<ToastItem[]>([])
  const [heights, setHeights] = React.useState<Record<number, number>>({})
  const [hovered, setHovered] = React.useState(false)
  const [focused, setFocused] = React.useState(false)
  const [hidden, setHidden] = React.useState(false)
  const next = React.useRef(1)
  const listRef = React.useRef<HTMLOListElement>(null)

  const dismiss = React.useCallback((id: number) => {
    setItems((all) => all.map((t) => (t.id === id ? { ...t, leaving: true } : t)))
    window.setTimeout(() => {
      setItems((all) => all.filter((t) => t.id !== id))
      // A removed button takes focus with it without a blur event, so check where focus really is.
      if (!listRef.current?.contains(document.activeElement)) setFocused(false)
    }, 300)
  }, [])

  const toast = React.useCallback((options: ToastOptions) => {
    const id = next.current++
    setItems((all) => [
      {
        id,
        title: options.title,
        description: options.description,
        variant: options.variant ?? "default",
        action: options.action,
        duration: options.duration ?? (options.action ? 8000 : 5000),
        leaving: false,
      },
      ...all,
    ])
    return id
  }, [])

  const onHeight = React.useCallback((id: number, height: number) => {
    setHeights((h) => (h[id] === height ? h : { ...h, [id]: height }))
  }, [])

  React.useEffect(() => {
    const onVisibility = () => setHidden(document.hidden)
    // Alt+T jumps to the newest notification.
    const onKey = (event: KeyboardEvent) => {
      if (event.altKey && event.key.toLowerCase() === "t") listRef.current?.querySelector<HTMLButtonElement>("li button")?.focus()
    }
    document.addEventListener("visibilitychange", onVisibility)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("visibilitychange", onVisibility)
      document.removeEventListener("keydown", onKey)
    }
  }, [])

  const live = items.filter((t) => !t.leaving)
  const expanded = hovered || focused
  // Each toast's distance from the bottom when fanned out: the heights of the newer ones above it.
  const { offsets, total: running } = items.reduce(
    (acc, t) => ({ offsets: [...acc.offsets, acc.total], total: acc.total + (t.leaving ? 0 : (heights[t.id] ?? 72) + 10) }),
    { offsets: [] as number[], total: 0 },
  )
  const value = React.useMemo(() => ({ toast, dismiss }), [toast, dismiss])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <section
        aria-label="Notifications (Alt+T)"
        className={cn("pointer-events-none fixed right-4 bottom-4 z-[200] w-[min(24rem,calc(100vw-2rem))]", className)}
      >
        <ol
          ref={listRef}
          data-slot="toast-stack"
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          onFocus={() => setFocused(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false)
          }}
          className="pointer-events-auto relative m-0 list-none p-0"
          style={{
            height: live.length ? (expanded ? running : (heights[live[0]?.id] ?? 72) + Math.min(live.length - 1, VISIBLE - 1) * GAP) : 0,
          }}
        >
          {items.map((item, i) => (
            <Toast
              key={item.id}
              item={item}
              index={live.indexOf(item) < 0 ? i : live.indexOf(item)}
              expanded={expanded}
              offset={offsets[i]}
              paused={expanded || hidden}
              onDismiss={dismiss}
              onHeight={onHeight}
            />
          ))}
        </ol>
      </section>
    </ToastContext.Provider>
  )
}

/** Returns `toast(options)`, which shows a notification and returns its id, and `dismiss(id)`. Use inside `Toaster`. */
function useToast() {
  const context = React.use(ToastContext)
  if (!context) throw new Error("useToast must be used inside Toaster")
  return context
}

export { Toaster, useToast }
