"use client"

import * as React from "react"
import { X } from "lucide-react"
import { motion, useAnimate, usePresence, useReducedMotion } from "motion/react"

import type { DemoId, ShelfBook } from "./interaction-shelf-data"
import type { ScreenRect } from "./interaction-shelf-scene"
import { BloomDemo } from "./interaction-shelf-demo-bloom"
import { DriftDemo } from "./interaction-shelf-demo-drift"
import { LensDemo } from "./interaction-shelf-demo-lens"
import { RippleDemo } from "./interaction-shelf-demo-ripple"
import { StretchDemo } from "./interaction-shelf-demo-stretch"
import { TossDemo } from "./interaction-shelf-demo-toss"

const DEMOS: Record<DemoId, React.ComponentType> = {
  drift: DriftDemo,
  lens: LensDemo,
  ripple: RippleDemo,
  stretch: StretchDemo,
  toss: TossDemo,
  bloom: BloomDemo,
}

function subscribe(onChange: () => void) {
  const query = window.matchMedia("(min-width: 768px)")
  query.addEventListener("change", onChange)
  return () => query.removeEventListener("change", onChange)
}

/** The notes page: what the interaction is, how to use it and what it was meant for. */
function Notes({ book, titleId }: { book: ShelfBook; titleId: string }) {
  return (
    <div className="flex h-full flex-col">
      <p className="font-mono text-[10px] tracking-[0.2em] text-[#5b534a] uppercase">Night Shelf · No. {book.number}</p>
      <h2 id={titleId} className="mt-6 text-4xl font-medium tracking-tight sm:text-5xl">
        {book.title}
      </h2>
      <p className="mt-1 text-[#5b534a]">{book.subtitle}</p>
      <p className="mt-6 max-w-sm leading-7 text-[#2b2620]">{book.description}</p>
      <dl className="mt-6 grid max-w-sm grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
        <dt className="text-[#5b534a]">How to use</dt>
        <dd>{book.howTo}</dd>
        <dt className="text-[#5b534a]">Built with</dt>
        <dd>{book.builtWith}</dd>
      </dl>
      <p className="mt-auto pt-6 font-mono text-[10px] tracking-[0.16em] text-[#5b534a] uppercase">{book.meantFor}</p>
    </div>
  )
}

/**
 * An open book. On wide screens it grows out of the spot where the book left
 * the shelf, then the cover swings open from the spine to show the notes on
 * the left and the live demo on the right; closing plays it back in reverse.
 * On phones it slides up as a sheet. It's a modal dialog: focus moves into it, Tab stays inside,
 * and Escape, the close button or a click outside closes it.
 */
export function OpenBook({ book, from, onClose }: { book: ShelfBook; from: ScreenRect | null; onClose: () => void }) {
  const wide = React.useSyncExternalStore(
    subscribe,
    () => window.matchMedia("(min-width: 768px)").matches,
    () => true,
  )
  const reduce = useReducedMotion()
  const [isPresent, safeToRemove] = usePresence()
  const [scope, animate] = useAnimate<HTMLDivElement>()
  const [demoReady, setDemoReady] = React.useState(false)
  const start = React.useRef({ x: 0, y: 40, scaleX: 0.92, scaleY: 0.92 })
  const titleId = React.useId()
  const Demo = DEMOS[book.id]
  const k = reduce ? 0 : 1

  // Opening: the book grows out of the spot where it left the shelf, then the cover swings open,
  // then the demo fades in once nothing else is moving.
  React.useLayoutEffect(() => {
    const root = scope.current
    const backdrop = root.querySelector<HTMLElement>("[data-backdrop]")!
    if (!wide) {
      const sheet = root.querySelector<HTMLElement>("[data-sheet]")!
      animate(backdrop, { opacity: [0, 1] }, { duration: 0.35 * k })
      animate(sheet, { y: ["100%", "0%"] }, reduce ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 32 }).then(() =>
        setDemoReady(true),
      )
      return
    }
    const bookEl = root.querySelector<HTMLElement>("[data-book]")!
    const coverEl = root.querySelector<HTMLElement>("[data-cover]")!
    const target = coverEl.getBoundingClientRect()
    if (from && target.height > 0) {
      // Start as an exact copy of the book on screen, so it reads as the same book growing.
      start.current = {
        x: from.x + from.width / 2 - (target.left + target.width / 2),
        y: from.y + from.height / 2 - (target.top + target.height / 2),
        scaleX: from.width / target.width,
        scaleY: from.height / target.height,
      }
    }
    const s = start.current
    // Place it before the first paint, so it never flashes at full size.
    bookEl.style.transform = `translateX(${s.x}px) translateY(${s.y}px) scaleX(${s.scaleX}) scaleY(${s.scaleY})`
    bookEl.style.opacity = from ? "1" : "0"
    animate(backdrop, { opacity: [0, 1] }, { duration: 0.6 * k, ease: "easeOut" })
    animate([
      [
        bookEl,
        { x: [s.x, 0], y: [s.y, 0], scaleX: [s.scaleX, 1], scaleY: [s.scaleY, 1], opacity: [from ? 1 : 0, 1] },
        { duration: 0.8 * k, ease: [0.22, 1, 0.36, 1] },
      ],
      [coverEl, { rotateY: [0, -180] }, { duration: 1.0 * k, ease: [0.65, 0, 0.35, 1], at: reduce ? 0 : "-0.2" }],
    ]).then(() => setDemoReady(true))
    // Runs once, when the book is first shown.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Closing: the same path in reverse, then the book goes back on the shelf.
  React.useEffect(() => {
    if (isPresent) return
    const root = scope.current
    const backdrop = root.querySelector<HTMLElement>("[data-backdrop]")!
    if (!wide) {
      const sheet = root.querySelector<HTMLElement>("[data-sheet]")!
      animate(backdrop, { opacity: 0 }, { duration: 0.3 * k })
      animate(sheet, { y: "100%" }, { duration: 0.35 * k, ease: [0.65, 0, 0.35, 1] }).then(() => safeToRemove())
      return
    }
    const bookEl = root.querySelector<HTMLElement>("[data-book]")!
    const coverEl = root.querySelector<HTMLElement>("[data-cover]")!
    const s = start.current
    animate([
      [coverEl, { rotateY: 0 }, { duration: 0.7 * k, ease: [0.65, 0, 0.35, 1] }],
      [
        bookEl,
        { x: s.x, y: s.y, scaleX: s.scaleX, scaleY: s.scaleY, opacity: from ? 1 : 0 },
        { duration: 0.6 * k, ease: [0.55, 0, 0.45, 1], at: reduce ? 0 : "-0.1" },
      ],
      [backdrop, { opacity: 0 }, { duration: 0.5 * k, at: reduce ? 0 : "-0.5" }],
    ]).then(() => safeToRemove())
  }, [isPresent, wide, animate, scope, safeToRemove, from, k, reduce])

  React.useEffect(() => {
    const node = scope.current
    node?.querySelector<HTMLElement>("[data-close]")?.focus({ preventScroll: true })
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        onClose()
      }
      if (event.key !== "Tab" || !node) return
      const focusable = [...node.querySelectorAll<HTMLElement>("button, [href], [tabindex]:not([tabindex='-1'])")].filter(
        (el) => !el.hasAttribute("disabled"),
      )
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [onClose, scope])

  const close = (
    <button
      type="button"
      data-close
      onClick={onClose}
      className="grid size-10 place-items-center rounded-full bg-[#1f1b16] text-[#f4efe6] shadow-lg outline-none hover:bg-black focus-visible:ring-2 focus-visible:ring-[#e0782f] focus-visible:ring-offset-2"
    >
      <X aria-hidden="true" className="size-4" />
      <span className="sr-only">Put the book back</span>
    </button>
  )

  // The demo starts once the book is fully open, and fades in.
  const demo = demoReady ? (
    <motion.div className="size-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 * k }}>
      <Demo />
    </motion.div>
  ) : null

  return (
    <div
      ref={scope}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-50 flex items-end justify-center md:items-center md:p-6"
    >
      <div data-backdrop aria-hidden="true" onClick={onClose} className="absolute inset-0 bg-black/40 opacity-0" />
      {wide ? (
        <div
          data-book
          className="relative h-[min(560px,76svh)] w-[min(940px,88vw)] origin-[75%_50%] opacity-0 will-change-transform [perspective:2400px]"
        >
          {/* The right page: the live demo, uncovered as the cover swings open. */}
          <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden rounded-r-lg bg-[#f4efe6] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8)]">
            {demo}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-linear-to-r from-black/25 to-transparent"
            />
          </div>
          {/* The cover: its front is the book's cover, its back becomes the left page. */}
          <div data-cover className="absolute inset-y-0 right-0 w-1/2 origin-left will-change-transform [transform-style:preserve-3d]">
            <div
              aria-hidden="true"
              className="absolute inset-0 flex flex-col justify-between rounded-r-lg p-10 [backface-visibility:hidden]"
              style={{ background: book.color, color: book.ink }}
            >
              <p className="font-mono text-xs tracking-[0.2em] uppercase">No. {book.number}</p>
              <div>
                <p className="text-6xl font-medium tracking-tight">{book.title}</p>
                <p className="mt-2 opacity-80">{book.subtitle}</p>
              </div>
              <p className="font-mono text-xs tracking-[0.2em] uppercase">Night Shelf</p>
            </div>
            <div className="absolute inset-0 rounded-l-lg bg-[#fbf8f2] p-10 text-[#1f1b16] shadow-[inset_-30px_0_40px_-30px_rgb(0_0_0/0.25)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <Notes book={book} titleId={titleId} />
            </div>
          </div>
          <div className="absolute -top-5 -right-5 z-10">{close}</div>
        </div>
      ) : (
        <div
          data-sheet
          className="relative flex h-[92svh] w-full flex-col overflow-hidden rounded-t-2xl bg-[#fbf8f2] text-[#1f1b16]"
          style={{ transform: "translateY(100%)" }}
        >
          <div className="flex items-start justify-between gap-4 p-5">
            <div>
              <p className="font-mono text-[10px] tracking-[0.2em] text-[#5b534a] uppercase">No. {book.number}</p>
              <h2 id={titleId} className="mt-2 text-3xl font-medium tracking-tight">
                {book.title}
              </h2>
              <p className="text-sm text-[#5b534a]">
                {book.subtitle} · {book.howTo}
              </p>
            </div>
            {close}
          </div>
          <div className="relative min-h-0 flex-1 bg-[#f4efe6]">{demo}</div>
        </div>
      )}
    </div>
  )
}
