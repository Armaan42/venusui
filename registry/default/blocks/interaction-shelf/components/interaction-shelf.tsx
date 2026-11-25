"use client"

import * as React from "react"
import { Lamp, X } from "lucide-react"
import { AnimatePresence, MotionConfig, motion } from "motion/react"

import { cn } from "@/lib/utils"

import { OpenBook } from "./interaction-shelf-book"
import { books, type DemoId } from "./interaction-shelf-data"
import { ShelfScene, type ScreenRect, type ShelfSceneHandle } from "./interaction-shelf-scene"

/**
 * Night Shelf: an interaction library in a small 3D room. Pull the lamp cord
 * for light, pick a numbered book and it flies off the shelf and opens into a
 * live demo; Escape puts it back. The six books are also listed on the wall,
 * so everything works from the keyboard. Render it from `app/page.tsx`.
 */
export function InteractionShelf() {
  const handle = React.useRef<ShelfSceneHandle | null>(null)
  const [ready, setReady] = React.useState(false)
  const [lampOn, setLampOn] = React.useState(false)
  const [openId, setOpenId] = React.useState<DemoId | null>(null)
  const [from, setFrom] = React.useState<ScreenRect | null>(null)
  // True from the moment a book is closed until it's back on the shelf, so the wall text waits for it.
  const [returning, setReturning] = React.useState(false)
  const [hover, setHover] = React.useState<{ id: DemoId; x: number; y: number } | null>(null)
  const [panel, setPanel] = React.useState<"about" | "contact" | null>(null)
  const busy = React.useRef(false)
  const closing = React.useRef<DemoId | null>(null)
  const returnFocus = React.useRef<HTMLElement | null>(null)

  const pick = React.useCallback(
    async (id: DemoId) => {
      if (busy.current || openId) return
      busy.current = true
      returnFocus.current = document.activeElement as HTMLElement | null
      setHover(null)
      setPanel(null)
      const rect = (await handle.current?.open(id)) ?? null
      setFrom(rect)
      setOpenId(id)
      busy.current = false
    },
    [openId],
  )

  const close = React.useCallback(() => {
    closing.current = openId
    setReturning(true)
    setOpenId(null)
  }, [openId])

  const afterClose = async () => {
    const id = closing.current
    closing.current = null
    if (id) await handle.current?.close(id)
    setReturning(false)
    returnFocus.current?.focus?.()
  }

  const book = books.find((item) => item.id === openId)

  return (
    <MotionConfig reducedMotion="user">
      <div data-interaction-shelf className="relative h-svh min-h-[34rem] w-full overflow-hidden bg-[#0d1220] text-[#efe7d6] antialiased">
        <ShelfScene
          handleRef={handle}
          lampOn={lampOn}
          onLampToggle={() => setLampOn((value) => !value)}
          onPick={(id) => void pick(id)}
          onHover={(id, at) => setHover(id && at ? { id, ...at } : null)}
          onReady={() => setReady(true)}
        />

        {/* A gentle veil until the room has loaded. */}
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 grid place-items-center bg-[#0d1220] transition-opacity duration-1000 motion-reduce:transition-none",
            ready ? "opacity-0" : "opacity-100",
          )}
        >
          <p className="font-mono text-[11px] tracking-[0.2em] text-[#efe7d6]/80 uppercase">Lighting the room…</p>
        </div>

        <header className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-4 sm:p-6">
          <p className="pointer-events-auto text-sm font-medium tracking-tight">Night Shelf</p>
          <nav aria-label="Main" className="pointer-events-auto flex items-center gap-1">
            <button
              type="button"
              aria-pressed={lampOn}
              onClick={() => setLampOn((value) => !value)}
              className="inline-flex h-9 items-center gap-2 rounded-full px-3 text-sm outline-none hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-[#e0782f]"
            >
              <Lamp aria-hidden="true" className="size-4" />
              {lampOn ? "Lamp off" : "Lamp on"}
            </button>
            {(["about", "contact"] as const).map((name) => (
              <button
                key={name}
                type="button"
                aria-expanded={panel === name}
                onClick={() => setPanel(panel === name ? null : name)}
                className="h-9 rounded-full px-3 text-sm capitalize outline-none hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-[#e0782f]"
              >
                {name}
              </button>
            ))}
          </nav>
        </header>

        {/* The title on the wall, with the six books as an index (the keyboard way in). */}
        <div
          className={cn(
            "pointer-events-none absolute top-16 left-4 transition-opacity duration-500 md:top-[15%] md:right-[6%] md:left-auto",
            (book || returning) && "opacity-0",
          )}
        >
          <h1 className="text-4xl leading-[0.95] font-medium tracking-tight sm:text-6xl">
            Night
            <br />
            <span className="text-[#efe7d6]/80">Shelf</span>
          </h1>
          <p className="mt-3 text-sm text-[#efe7d6]/85">An interaction library</p>
          <ol aria-label="Books on the shelf" className="pointer-events-auto mt-6 hidden gap-0.5 md:grid">
            {books.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => void pick(item.id)}
                  className="group flex items-baseline gap-3 rounded px-1 py-0.5 text-left text-sm outline-none focus-visible:ring-2 focus-visible:ring-[#e0782f]"
                >
                  <span className="font-mono text-[10px] text-[#e0782f]">{item.number}</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">{item.title}</span>
                  <span className="text-xs text-[#efe7d6]/80">{item.subtitle}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        {/* Phones: the index as a row of chips. */}
        <ol aria-label="Books on the shelf" className="absolute inset-x-0 bottom-5 flex gap-2 overflow-x-auto px-4 md:hidden">
          {books.map((item) => (
            <li key={item.id} className="shrink-0">
              <button
                type="button"
                onClick={() => void pick(item.id)}
                className="rounded-full bg-black/45 px-3 py-1.5 text-xs backdrop-blur outline-none focus-visible:ring-2 focus-visible:ring-[#e0782f]"
              >
                <span className="mr-1.5 font-mono text-[#e0782f]">{item.number}</span>
                {item.title}
              </button>
            </li>
          ))}
        </ol>

        <p className="pointer-events-none absolute inset-x-0 bottom-4 hidden text-center font-mono text-[10px] tracking-[0.18em] text-[#efe7d6]/80 uppercase md:block">
          Pull the lamp cord · Pick a book · Esc puts it back
        </p>

        {/* The book's name follows the pointer while you hover it. */}
        {hover ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute z-10 -translate-y-full rounded-md bg-black/70 px-2.5 py-1 text-xs whitespace-nowrap backdrop-blur"
            style={{ left: hover.x + 14, top: hover.y - 8 }}
          >
            <span className="mr-1.5 font-mono text-[#e0782f]">{books.find((b) => b.id === hover.id)?.number}</span>
            {books.find((b) => b.id === hover.id)?.title} · {books.find((b) => b.id === hover.id)?.subtitle}
          </div>
        ) : null}

        <AnimatePresence>
          {panel ? (
            <motion.aside
              key={panel}
              aria-label={panel === "about" ? "About" : "Contact"}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-y-0 right-0 z-20 flex w-full max-w-md flex-col bg-[#fbf8f2] p-8 text-[#1f1b16] shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setPanel(null)}
                className="ml-auto grid size-9 place-items-center rounded-full outline-none hover:bg-black/5 focus-visible:ring-2 focus-visible:ring-[#e0782f]"
              >
                <X aria-hidden="true" className="size-4" />
                <span className="sr-only">Close</span>
              </button>
              {panel === "about" ? (
                <div className="mt-6">
                  <p className="font-mono text-[10px] tracking-[0.2em] text-[#5b534a] uppercase">About</p>
                  <h2 className="mt-4 text-3xl font-medium tracking-tight">Small experiments, kept on a shelf</h2>
                  <p className="mt-4 leading-7 text-[#2b2620]">
                    Between projects I sketch interactions the way other people fill notebooks. None of these made it into a product, so
                    they live here: one book each, ready to open and play with.
                  </p>
                  <ol className="mt-6 grid gap-1 text-sm">
                    {books.map((item) => (
                      <li key={item.id} className="flex gap-3">
                        <span className="font-mono text-[11px] text-[#9a4a16]">{item.number}</span>
                        <span className="font-medium">{item.title}</span>
                        <span className="text-[#5b534a]">{item.meantFor.replace("Meant for ", "for ")}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ) : (
                <div className="mt-6">
                  <p className="font-mono text-[10px] tracking-[0.2em] text-[#5b534a] uppercase">Contact</p>
                  <h2 className="mt-4 text-3xl font-medium tracking-tight">Say hello</h2>
                  <p className="mt-4 leading-7 text-[#2b2620]">
                    I&apos;m a designer who likes building the interactions I draw. Open to studio work and the occasional strange idea.
                  </p>
                  <a
                    href="mailto:hello@nightshelf.example"
                    className="mt-6 inline-block border-b border-current pb-0.5 font-medium outline-none focus-visible:ring-2 focus-visible:ring-[#e0782f]"
                  >
                    hello@nightshelf.example
                  </a>
                </div>
              )}
            </motion.aside>
          ) : null}
        </AnimatePresence>

        <AnimatePresence onExitComplete={() => void afterClose()}>
          {book ? <OpenBook key={book.id} book={book} from={from} onClose={close} /> : null}
        </AnimatePresence>
      </div>
    </MotionConfig>
  )
}
