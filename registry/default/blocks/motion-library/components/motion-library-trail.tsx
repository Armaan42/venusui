"use client"

import * as React from "react"
import { Bot, Code2, MousePointerClick, type LucideIcon } from "lucide-react"
import { AnimatePresence, animate, motion, useInView, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

import { photo, type PhotoName } from "./motion-library-media"
import { Scramble, SectionLabel } from "./motion-library-motion"

const plates: PhotoName[] = ["clay", "dunes", "chair", "vases", "coffee", "leaf", "lounge"]
const SLOTS = 14
const SPACING = 90 // pixels of pointer travel between plates, at most
const LIFE = 1.35 // seconds each plate stays, including its way in and out

/**
 * Photos settle along the path of the cursor, then leave again. While nobody
 * is pointing at it, a demo path draws a slow figure of eight so phones see
 * it too. With reduced motion the demo stays off and plates simply fade.
 *
 * The plates are a fixed pool of image elements that are moved and replayed
 * directly, so the trail never loads or mounts anything after first paint and
 * React doesn't re-render while it runs.
 */
function TrailStage() {
  const ref = React.useRef<HTMLDivElement>(null)
  const slots = React.useRef<(HTMLImageElement | null)[]>([])
  const reduce = useReducedMotion()
  const inView = useInView(ref, { amount: 0.4 })
  const next = React.useRef({ count: 0, x: -999, y: -999, lastPointer: 0 })

  const spawn = React.useCallback(
    (x: number, y: number) => {
      const n = next.current
      // Closer together on small stages, so a phone gets as full a trail as a desktop.
      const spacing = Math.min(SPACING, (ref.current?.clientWidth ?? 600) * 0.15)
      if (Math.hypot(x - n.x, y - n.y) < spacing) return
      n.x = x
      n.y = y
      const count = ++n.count
      const plate = slots.current[count % SLOTS]
      if (!plate) return
      const rotate = ((count * 37) % 14) - 7
      plate.style.left = `${x}px`
      plate.style.top = `${y}px`
      plate.style.zIndex = String(count)
      animate(
        plate,
        reduce
          ? { opacity: [0, 1, 1, 0] }
          : { opacity: [0, 1, 1, 0], scale: [0.6, 1, 1, 0.85], rotate: [rotate - 8, rotate, rotate, rotate], y: [0, 0, 0, 24] },
        { duration: LIFE, times: [0, 0.3, 0.7, 1], ease: [0.22, 1, 0.36, 1] },
      )
    },
    [reduce],
  )

  // The demo path: runs while in view, pauses for three seconds after real pointer movement.
  React.useEffect(() => {
    if (!inView || reduce) return
    let frame = 0
    const tick = (now: number) => {
      const stage = ref.current
      if (stage && now - next.current.lastPointer > 3000) {
        const t = now / 1400
        const w = stage.clientWidth
        const h = stage.clientHeight
        spawn(w / 2 + Math.sin(t) * w * 0.34, h / 2 + Math.sin(t * 2) * h * 0.26)
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, reduce, spawn])

  return (
    <div
      ref={ref}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        next.current.lastPointer = event.timeStamp
        spawn(event.clientX - rect.left, event.clientY - rect.top)
      }}
      className="relative h-[60svh] min-h-[22rem] overflow-hidden rounded-2xl border border-ml-line bg-ml-card select-none"
    >
      <div className="pointer-events-none absolute inset-x-5 top-4 flex justify-between font-mono text-[10px] tracking-[0.14em] text-ml-muted uppercase">
        <span>Cursor · No. 01</span>
        <span className="inline-flex items-center gap-2">
          <span className="size-1.5 animate-ml-blink rounded-full bg-ml-accent motion-reduce:animate-none" />
          Live
        </span>
      </div>
      <p className="pointer-events-none absolute inset-0 grid place-items-center px-6 text-center text-3xl font-medium tracking-tight text-ml-muted sm:text-6xl">
        Every move leaves a mark.
      </p>
      {Array.from({ length: SLOTS }, (_, i) => (
        <img
          key={i}
          ref={(node) => {
            slots.current[i] = node
          }}
          src={photo(plates[i % plates.length])}
          alt=""
          draggable={false}
          data-plate=""
          className="pointer-events-none absolute -top-full w-36 -translate-x-1/2 -translate-y-1/2 rounded-md object-cover opacity-0 shadow-[0_20px_40px_-12px_rgb(0_0_0/0.7)] sm:w-48"
        />
      ))}
    </div>
  )
}

const ways: { icon: LucideIcon; name: string; text: string }[] = [
  { icon: MousePointerClick, name: "Visual builder", text: "Paste it on the canvas." },
  { icon: Code2, name: "Code", text: "A zip you own, never minified." },
  { icon: Bot, name: "Assistant", text: "One prompt for your assistant." },
]

function BuilderPanel() {
  const attributes = [
    ["data-trail", ""],
    ["data-spacing", "90"],
    ["data-life", "900ms"],
    ["data-plates", "7"],
  ]
  return (
    <div className="flex h-full flex-col">
      <p className="font-mono text-[10px] tracking-[0.14em] uppercase opacity-60">Custom attributes</p>
      <dl className="mt-4 divide-y divide-ml-paper-ink/10 border-y border-ml-paper-ink/10 font-mono text-xs">
        {attributes.map(([name, value]) => (
          <div key={name} className="flex justify-between py-2.5">
            <dt>{name}</dt>
            <dd className="opacity-60">{value || "on"}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-auto pt-6 text-sm opacity-70">
        Copy once, paste on your canvas. The structure arrives as native elements, so you can restyle every part.
      </p>
    </div>
  )
}

function CodePanel() {
  return (
    <div className="flex h-full flex-col gap-4 sm:flex-row">
      <ul className="shrink-0 space-y-1.5 font-mono text-xs" aria-label="Files in the download">
        <li className="opacity-60">trail/</li>
        {["trail.js", "trail.css", "snippet.html", "README.md"].map((file) => (
          <li key={file} className="pl-3">
            {file}
          </li>
        ))}
      </ul>
      <pre
        className="min-w-0 flex-1 overflow-x-auto rounded-lg bg-ml-paper-ink p-4 font-mono text-[11px] leading-5 text-ml-paper"
        tabIndex={0}
      >
        <code>{`<section data-trail data-spacing="90">
  <img src="plate-01.jpg" alt="">
  <img src="plate-02.jpg" alt="">
  …
</section>

<script src="trail.js" defer></script>`}</code>
      </pre>
    </div>
  )
}

function AssistantPanel() {
  const files = [
    ["hero.html", "Edited"],
    ["trail.js", "Added"],
    ["trail.css", "Added"],
  ]
  return (
    <div className="flex h-full flex-col">
      <p className="ml-auto max-w-[85%] rounded-xl rounded-br-sm bg-ml-paper-ink px-3 py-2 text-sm text-ml-paper">
        Add the image trail to my hero, seven plates.
      </p>
      <div className="mt-4 text-sm">
        <p>
          <span className="font-medium">Done.</span> Your hero now leaves a trail of seven plates behind the cursor, and your classes are
          untouched.
        </p>
        <ul className="mt-3 divide-y divide-ml-paper-ink/10 rounded-lg border border-ml-paper-ink/10 font-mono text-xs">
          {files.map(([file, status]) => (
            <li key={file} className="flex justify-between px-3 py-2">
              {file}
              <span className="text-[10px] uppercase opacity-60">{status}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto flex flex-wrap gap-1.5 pt-5 text-xs">
        {["Make it slower", "Use my own images", "Only on desktop"].map((chip) => (
          <span key={chip} className="rounded-full border border-ml-paper-ink/15 px-2.5 py-1">
            {chip}
          </span>
        ))}
      </div>
    </div>
  )
}

const panels = [BuilderPanel, CodePanel, AssistantPanel]

/** One component up close: a live cursor trail, and the three ways it ships. */
export function MotionLibraryTrail() {
  const [active, setActive] = React.useState(2)
  const id = React.useId()
  const Panel = panels[active]

  return (
    <section id="library" aria-labelledby="ml-trail-title" className="relative px-4 py-24 sm:px-6 sm:py-32">
      <div className="grid gap-6 lg:grid-cols-[1fr_2fr] lg:items-end">
        <div>
          <SectionLabel index="02">One component, up close</SectionLabel>
          <h2 id="ml-trail-title" className="mt-5 text-4xl leading-[1.02] font-medium tracking-[-0.035em] sm:text-6xl">
            Move the cursor. <Scramble text="Watch it follow." className="text-ml-muted" />
          </h2>
        </div>
        <p className="max-w-md text-ml-muted lg:justify-self-end">
          This is one of 86 components, running for real. Images settle along the path of your cursor, then leave again.
        </p>
      </div>

      <div className="mt-12">
        <TrailStage />
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <h3 className="text-2xl font-medium tracking-tight">
            One component. <span className="text-ml-muted">Three ways to ship it.</span>
          </h3>
          <div role="tablist" aria-label="Ways to ship it" aria-orientation="vertical" className="mt-6 border-t border-ml-line">
            {ways.map((way, i) => (
              <button
                key={way.name}
                id={`${id}-tab-${i}`}
                type="button"
                role="tab"
                aria-selected={active === i}
                aria-controls={`${id}-panel`}
                tabIndex={active === i ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(event) => {
                  if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return
                  event.preventDefault()
                  const to = (i + (event.key === "ArrowDown" ? 1 : -1) + ways.length) % ways.length
                  setActive(to)
                  document.getElementById(`${id}-tab-${to}`)?.focus()
                }}
                className={cn(
                  "group relative flex w-full items-center gap-4 border-b border-ml-line py-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-ml-accent",
                  active === i ? "text-ml-ink" : "text-ml-muted hover:text-ml-ink",
                )}
              >
                <span className="w-6 font-mono text-[10px]">0{i + 1}</span>
                <span className="w-32 text-lg">{way.name}</span>
                <span className="hidden flex-1 text-sm sm:block">{way.text}</span>
                <way.icon aria-hidden="true" className="ml-auto size-4" />
                {active === i ? <motion.span layoutId="ml-way" className="absolute inset-x-0 -bottom-px h-px bg-ml-accent" /> : null}
              </button>
            ))}
          </div>
        </div>
        <div
          id={`${id}-panel`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${active}`}
          className="min-h-80 overflow-hidden rounded-2xl bg-ml-paper p-5 text-ml-paper-ink sm:p-6"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              className="h-full"
              initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <Panel />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
