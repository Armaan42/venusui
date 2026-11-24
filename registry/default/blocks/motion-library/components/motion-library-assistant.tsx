"use client"

import * as React from "react"
import { ArrowRight, ArrowUp, Check } from "lucide-react"
import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "motion/react"

import { cn } from "@/lib/utils"

import { photo, type PhotoName } from "./motion-library-media"
import { Scramble, SectionLabel, useReducedMotionSafe } from "./motion-library-motion"

const PROMPT = "Open a ring-carousel of my projects on my hero."
const CHIP = [7, 20] // where "ring-carousel" sits in the prompt
const ring: PhotoName[] = ["vases", "lounge", "clay", "house", "leaf", "chair", "sofa", "dunes"]
const files = ["ring-carousel.js", "ring-carousel.css", "snippet.html", "spec.md"]

/** What the clip shows at a given point: how much is typed, and which step the assistant is on. */
function frameAt(p: number) {
  const typed = Math.round(Math.min(1, Math.max(0, (p - 0.06) / 0.3)) * PROMPT.length)
  const step = p < 0.4 ? 0 : p < 0.6 ? 1 : 2
  const file = Math.min(files.length - 1, Math.floor(Math.max(0, p - 0.5) / 0.1))
  return { typed, step, file }
}

function timecode(p: number) {
  const frames = Math.round(p * 14 * 25)
  const seconds = Math.floor(frames / 25)
  return `00:${String(seconds).padStart(2, "0")}:${String(frames % 25).padStart(2, "0")}`
}

/** Eight project photos on a slowly turning ring. */
function RingCarousel() {
  return (
    <div className="grid h-full place-items-center [perspective:900px]">
      <div className="[transform-style:preserve-3d] [transform:rotateX(-6deg)]">
        <div className="relative h-32 w-24 animate-ml-spin [transform-style:preserve-3d] motion-reduce:animate-none sm:h-44 sm:w-32">
          {ring.map((name, i) => (
            <img
              key={name}
              src={photo(name)}
              alt=""
              className="absolute inset-0 size-full rounded-md object-cover shadow-lg"
              style={{ transform: `rotateY(${i * 45}deg) translateZ(var(--ring-radius))` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function Prompt({ typed, typing }: { typed: number; typing: boolean }) {
  const shown = PROMPT.slice(0, typed)
  return (
    <p className="text-lg leading-snug sm:text-3xl">
      {shown.slice(0, CHIP[0])}
      {typed > CHIP[0] ? (
        <span className="rounded-md bg-ml-accent/15 px-1 text-ml-accent-soft ring-1 ring-ml-accent/40">
          {shown.slice(CHIP[0], CHIP[1])}
        </span>
      ) : null}
      {shown.slice(CHIP[1])}
      {typing ? (
        <span className="ml-0.5 inline-block h-[0.9em] w-0.5 translate-y-[0.1em] animate-ml-blink bg-ml-ink motion-reduce:animate-none" />
      ) : null}
    </p>
  )
}

function Clip({ p }: { p: MotionValue<number> }) {
  const [frame, setFrame] = React.useState(() => frameAt(p.get()))
  const tcRef = React.useRef<HTMLSpanElement>(null)
  useMotionValueEvent(p, "change", (value) => {
    const next = frameAt(value)
    setFrame((current) => (current.typed === next.typed && current.step === next.step && current.file === next.file ? current : next))
    if (tcRef.current) tcRef.current.textContent = timecode(value)
  })

  // The chat card starts tilted and out of focus, straightens, then steps aside for the result.
  const rotateX = useTransform(p, [0, 0.3], [38, 0])
  const rotateZ = useTransform(p, [0, 0.3], [-12, 0])
  const blur = useTransform(p, [0, 0.22], ["blur(6px)", "blur(0px)"])
  // 0 → 1 as the card steps aside; the CSS `translate` classes turn it into a distance per screen size.
  const aside = useTransform(p, [0.52, 0.7], [0, 1])
  const scale = useTransform(p, [0.52, 0.7], [1, 0.62])
  const windowOpacity = useTransform(p, [0.48, 0.62], [0, 1])
  const windowScale = useTransform(p, [0.48, 0.66], [0.92, 1])
  const windowBlur = useTransform(p, [0.48, 0.62], ["blur(10px)", "blur(0px)"])
  const outro = useTransform(p, [0.78, 0.9], [0, 1])
  const outroY = useTransform(p, [0.78, 0.9], [24, 0])
  const progress = useTransform(p, [0, 1], [0, 1])

  return (
    <div className="relative h-[72svh] min-h-[30rem] overflow-hidden rounded-xl border border-ml-line bg-ml-card">
      <div className="absolute inset-x-0 top-0 z-20 flex h-9 items-center gap-3 border-b border-ml-line px-4 font-mono text-[10px] tracking-[0.12em] text-ml-muted uppercase">
        <span className="size-1.5 rounded-full bg-ml-accent" />
        <span className="text-ml-ink">ring-carousel.mp4</span>
        <span className="relative h-px flex-1 bg-ml-line">
          <motion.span style={{ scaleX: progress }} className="absolute inset-0 origin-left bg-ml-ink/70" />
        </span>
        <span>
          TC{" "}
          <span ref={tcRef} className="text-ml-ink tabular-nums">
            {timecode(p.get())}
          </span>
        </span>
      </div>

      <motion.div
        style={{ opacity: windowOpacity, scale: windowScale, filter: windowBlur }}
        className="absolute inset-x-3 top-12 bottom-3 flex flex-col overflow-hidden rounded-lg bg-ml-paper text-ml-paper-ink sm:inset-x-[6%] sm:top-[13%] sm:bottom-[7%]"
      >
        <div className="flex items-center gap-4 border-b border-ml-paper-ink/10 px-3 py-2 font-mono text-[10px]">
          <span className="flex gap-1" aria-hidden="true">
            <span className="size-2 rounded-full bg-ml-paper-ink/20" />
            <span className="size-2 rounded-full bg-ml-paper-ink/20" />
            <span className="size-2 rounded-full bg-ml-paper-ink/20" />
          </span>
          <span className="flex gap-3 overflow-hidden">
            {files.map((file, i) => (
              <span key={file} className={cn("shrink-0", i === frame.file ? "font-semibold" : "opacity-55")}>
                {file}
              </span>
            ))}
          </span>
          <span className="ml-auto hidden opacity-55 lg:inline">components/ring-carousel/</span>
        </div>
        <div className="relative flex-1 [--ring-radius:8.5rem] sm:[--ring-radius:12rem]">
          <RingCarousel />
          <p className="absolute inset-x-0 bottom-4 text-center font-mono text-[10px] tracking-[0.14em] opacity-60">04 / 08 · SALTWORK</p>
        </div>
      </motion.div>

      <div className="absolute inset-0 top-9 z-10 grid place-items-center px-4 [perspective:1200px]">
        <motion.div
          style={{ rotateX, rotateZ, scale, filter: blur, ["--aside" as string]: aside }}
          className="w-full translate-x-[calc(var(--aside)*4%)] translate-y-[calc(var(--aside)*62%)] lg:translate-x-[calc(var(--aside)*36%)] lg:translate-y-[calc(var(--aside)*54%)] max-w-2xl rounded-2xl border border-ml-ink/10 bg-ml-chat p-5 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8)] sm:p-7"
        >
          <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] text-ml-muted uppercase">
            <span className="size-1.5 rounded-full bg-ml-accent" />
            Orrery <span className="text-ml-ink">connected</span>
          </p>
          <div className="mt-4 flex items-end gap-4">
            <div className="min-h-[2lh] flex-1">
              <Prompt typed={frame.typed} typing={frame.typed < PROMPT.length} />
            </div>
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-ml-accent text-ml-on-accent shadow-[0_0_30px_rgb(255_90_31/0.45)] sm:size-12">
              <ArrowUp aria-hidden="true" className="size-5" />
            </span>
          </div>
          <div className="mt-4 min-h-10 font-mono text-[11px]">
            {frame.step === 1 ? (
              <>
                <p className="flex items-center gap-2 tracking-[0.12em] text-ml-ink uppercase">
                  <span className="size-1.5 animate-ml-blink rounded-full bg-ml-accent motion-reduce:animate-none" />
                  Writing…
                </p>
                <p className="mt-1 text-ml-muted">get_component(&quot;ring-carousel&quot;)</p>
              </>
            ) : frame.step === 2 ? (
              <>
                <p className="tracking-[0.12em] text-ml-ink uppercase">Done</p>
                <p className="mt-1 text-ml-muted">ring-carousel is in your project</p>
              </>
            ) : null}
          </div>
        </motion.div>
      </div>

      <motion.div
        style={{ opacity: outro, y: outroY }}
        className="pointer-events-none absolute bottom-[calc(7%+1.5rem)] left-[calc(6%+1.75rem)] z-20 hidden max-w-[45%] lg:block"
      >
        <p className="text-6xl font-medium tracking-[-0.04em] text-ml-paper-ink">Get the real thing.</p>
        <p className="mt-2 flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] text-ml-paper-ink/70 uppercase">
          <Check aria-hidden="true" className="size-3" />
          ring-carousel · shipped with Orrery
        </p>
      </motion.div>
    </div>
  )
}

/**
 * The library inside an AI assistant, told as a short clip that plays as you
 * scroll: the prompt is typed, the assistant fetches the component, and the
 * finished carousel appears. With reduced motion the last frame shows at once.
 */
export function MotionLibraryAssistant() {
  const reduce = useReducedMotionSafe()
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const finished = useMotionValue(1)
  const p = reduce ? finished : scrollYProgress

  return (
    <section id="assistant" aria-labelledby="ml-assistant-title" className="px-4 pt-24 sm:px-6 sm:pt-32">
      <SectionLabel index="03">The library in your assistant</SectionLabel>
      <h2 id="ml-assistant-title" className="mt-5 text-4xl leading-[1.02] font-medium tracking-[-0.035em] sm:text-7xl">
        Ask your assistant. <Scramble text="Get the real thing." className="text-ml-muted" duration={1.1} />
      </h2>

      <div ref={ref} className={cn("mt-12", reduce ? "" : "h-[280svh]")}>
        <div className={cn(reduce ? "" : "sticky top-[14svh]")}>
          {/* Remounts when the source changes, so it starts on the right frame. */}
          <Clip key={reduce ? "still" : "scroll"} p={p} />
        </div>
      </div>

      <div className="flex flex-col gap-6 border-y border-ml-line py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xl text-ml-muted sm:text-lg">
          Connect the library to your assistant once. Every effect you ask for lands in your code as the component itself, not a lookalike.
        </p>
        <a
          href="#faq"
          className="group inline-flex items-center gap-2 border-b border-ml-ink/30 pb-1 text-sm outline-none hover:border-ml-ink focus-visible:ring-2 focus-visible:ring-ml-accent"
        >
          How it works
          <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  )
}
