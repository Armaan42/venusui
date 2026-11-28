"use client"

import * as React from "react"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

interface BottomSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Heading at the top of the sheet; also its accessible name. */
  title: string
  description?: string
  /** Heights the sheet rests at, as shares of the screen, smallest first. */
  snapPoints?: number[]
  /** Which snap point it opens at. */
  defaultSnap?: number
  children: React.ReactNode
  className?: string
}

const MS = 340

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

/**
 * A sheet that slides up from the bottom of the screen and rests at set
 * heights. Drag the handle to move between them, flick it down (or press
 * Escape, the close button or the backdrop) to close. It's a modal dialog,
 * so focus stays inside while it's open.
 */
function BottomSheet({
  open,
  onOpenChange,
  title,
  description,
  snapPoints = [0.5, 0.92],
  defaultSnap = 0,
  children,
  className,
}: BottomSheetProps) {
  const dialogRef = React.useRef<HTMLDialogElement>(null)
  const [visible, setVisible] = React.useState(false)
  const [snap, setSnap] = React.useState(defaultSnap)
  const [dragY, setDragY] = React.useState<number | null>(null)
  const [vh, setVh] = React.useState(800)
  const pointer = React.useRef<{ y: number; lastY: number; lastT: number; v: number } | null>(null)
  const dragged = React.useRef(false)
  const titleRef = React.useRef<HTMLHeadingElement>(null)
  const reduce = useReducedMotion()
  const titleId = React.useId()
  const descriptionId = React.useId()

  const snaps = [...snapPoints].sort((a, b) => a - b)
  const panel = snaps[snaps.length - 1] * vh
  const restAt = (i: number) => panel - snaps[i] * vh

  // Open and close the dialog, sliding the sheet in and out around it.
  React.useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    let frame = 0
    let timer = 0
    if (open && !dialog.open) {
      dialog.showModal()
      // Start on the title: it's read out first, and no button lights up with a focus ring.
      titleRef.current?.focus({ preventScroll: true })
      document.documentElement.style.overflow = "hidden"
      frame = requestAnimationFrame(() => {
        setVh(window.innerHeight)
        setSnap(defaultSnap)
        frame = requestAnimationFrame(() => setVisible(true))
      })
    } else if (!open && dialog.open) {
      frame = requestAnimationFrame(() => setVisible(false))
      timer = window.setTimeout(
        () => {
          dialog.close()
          document.documentElement.style.overflow = ""
        },
        reduce ? 0 : MS,
      )
    }
    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(timer)
    }
  }, [open, defaultSnap, reduce])

  React.useEffect(() => {
    const onResize = () => setVh(window.innerHeight)
    window.addEventListener("resize", onResize)
    return () => {
      window.removeEventListener("resize", onResize)
      document.documentElement.style.overflow = ""
    }
  }, [])

  const base = visible ? restAt(snap) : panel
  const y = dragY === null ? base : Math.max(-24, base + dragY)
  const shown = panel - y
  const backdrop = Math.min(1, Math.max(0, shown / (snaps[0] * vh)))

  const release = () => {
    const p = pointer.current
    pointer.current = null
    if (!p || dragY === null) return
    // Where the sheet would coast to, given how fast it was moving.
    const projected = base + dragY + p.v * 180
    const heights = snaps.map((s) => s * vh)
    const visibleAfter = panel - projected
    setDragY(null)
    if (visibleAfter < heights[0] * 0.6) return onOpenChange(false)
    let nearest = 0
    heights.forEach((h, i) => {
      if (Math.abs(h - visibleAfter) < Math.abs(heights[nearest] - visibleAfter)) nearest = i
    })
    setSnap(nearest)
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onCancel={(event) => {
        event.preventDefault()
        onOpenChange(false)
      }}
      className="fixed inset-0 m-0 size-full max-h-none max-w-none overflow-clip bg-transparent p-0 backdrop:bg-transparent"
    >
      <div
        aria-hidden="true"
        onClick={() => onOpenChange(false)}
        className={cn("absolute inset-0 bg-black/50", dragY === null && !reduce && "transition-opacity duration-300")}
        style={{ opacity: backdrop }}
      />
      <div
        data-slot="bottom-sheet"
        className={cn(
          "absolute inset-x-0 bottom-0 flex flex-col rounded-t-3xl bg-background text-foreground shadow-[0_-12px_40px_-12px_rgb(0_0_0/0.35)] sm:mx-auto sm:max-w-lg",
          dragY === null && !reduce && "transition-transform duration-[340ms] ease-[cubic-bezier(0.32,0.72,0,1)]",
          className,
        )}
        style={{ height: panel, transform: `translateY(${y}px)` }}
      >
        {/* The handle and header are the drag area. */}
        <div
          className="shrink-0 cursor-grab touch-none px-5 pt-3 pb-3 active:cursor-grabbing"
          onPointerDown={(event) => {
            if ((event.target as HTMLElement).closest("[data-no-drag]")) return
            dragged.current = false
            pointer.current = { y: event.clientY, lastY: event.clientY, lastT: event.timeStamp, v: 0 }
          }}
          onPointerMove={(event) => {
            const p = pointer.current
            if (!p) return
            // Only take over the pointer once it's clearly a drag, so a tap on the handle still clicks it.
            if (!dragged.current) {
              if (Math.abs(event.clientY - p.y) < 5) return
              dragged.current = true
              event.currentTarget.setPointerCapture(event.pointerId)
            }
            const dt = event.timeStamp - p.lastT
            if (dt > 0) p.v = p.v * 0.3 + ((event.clientY - p.lastY) / dt) * 0.7
            p.lastY = event.clientY
            p.lastT = event.timeStamp
            setDragY(event.clientY - p.y)
          }}
          onPointerUp={release}
          onPointerCancel={release}
        >
          {/* The handle is also a button: Enter or a tap moves the sheet to the next height. */}
          {snaps.length > 1 ? (
            <button
              type="button"
              aria-label={snap < snaps.length - 1 ? "Expand sheet" : "Shrink sheet"}
              onClick={() => {
                if (dragged.current) return
                setSnap((s) => (s < snaps.length - 1 ? s + 1 : 0))
              }}
              className="mx-auto -my-2 block rounded-full px-4 py-2 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <span aria-hidden="true" className="block h-1.5 w-10 rounded-full bg-muted-foreground/30" />
            </button>
          ) : (
            <span aria-hidden="true" className="mx-auto block h-1.5 w-10 rounded-full bg-muted-foreground/30" />
          )}
          <div className="mt-3 flex items-start justify-between gap-4">
            <div>
              <h2 ref={titleRef} id={titleId} tabIndex={-1} className="text-lg font-semibold tracking-tight outline-none">
                {title}
              </h2>
              {description ? (
                <p id={descriptionId} className="text-sm text-muted-foreground">
                  {description}
                </p>
              ) : null}
            </div>
            <button
              type="button"
              data-no-drag=""
              onClick={() => onOpenChange(false)}
              aria-label="Close"
              className="grid size-8 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <X aria-hidden="true" className="size-4" />
            </button>
          </div>
        </div>
        {/* Only the part of the sheet on screen scrolls, so nothing hides below the edge. */}
        <div
          className="min-h-0 overflow-y-auto overscroll-contain px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]"
          style={{ maxHeight: Math.max(0, shown - 88) }}
        >
          {children}
        </div>
      </div>
    </dialog>
  )
}

export { BottomSheet }
