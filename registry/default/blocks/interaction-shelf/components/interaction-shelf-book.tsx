"use client"

import * as React from "react"
import { X } from "lucide-react"
import { motion } from "motion/react"

import type { DemoId, ShelfBook } from "./interaction-shelf-data"
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

const EASE = [0.65, 0, 0.35, 1] as const

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
 * An open book. On wide screens the cover swings open from the spine to show
 * the notes on the left and the live demo on the right; on phones it slides
 * up as a sheet. It's a modal dialog: focus moves into it, Tab stays inside,
 * and Escape, the close button or a click outside closes it.
 */
export function OpenBook({ book, onClose }: { book: ShelfBook; onClose: () => void }) {
  const wide = React.useSyncExternalStore(
    subscribe,
    () => window.matchMedia("(min-width: 768px)").matches,
    () => true,
  )
  const dialog = React.useRef<HTMLDivElement>(null)
  const titleId = React.useId()
  const Demo = DEMOS[book.id]

  React.useEffect(() => {
    const node = dialog.current
    node?.querySelector<HTMLElement>("[data-close]")?.focus()
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
  }, [onClose])

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

  return (
    <motion.div
      ref={dialog}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-50 flex items-end justify-center md:items-center md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.25, delay: wide ? 0.55 : 0.2 } }}
    >
      <div aria-hidden="true" onClick={onClose} className="absolute inset-0 bg-black/45" />
      {wide ? (
        <div className="relative h-[min(640px,84svh)] w-[min(1080px,94vw)] [perspective:2600px]">
          {/* The right page: the live demo, uncovered as the cover swings open. */}
          <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden rounded-r-lg bg-[#f4efe6] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8)]">
            <Demo />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-linear-to-r from-black/25 to-transparent"
            />
          </div>
          {/* The cover: its front is the book's cover, its back becomes the left page. */}
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2 origin-left [transform-style:preserve-3d]"
            initial={{ rotateY: 0 }}
            animate={{ rotateY: -180 }}
            exit={{ rotateY: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
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
          </motion.div>
          <div className="absolute -top-5 -right-5 z-10">{close}</div>
        </div>
      ) : (
        <motion.div
          className="relative flex h-[92svh] w-full flex-col overflow-hidden rounded-t-2xl bg-[#fbf8f2] text-[#1f1b16]"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.45, ease: EASE }}
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
          <div className="relative min-h-0 flex-1">
            <Demo />
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
