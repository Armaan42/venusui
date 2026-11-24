"use client"

import * as React from "react"
import { motion, useScroll, useTransform } from "motion/react"

import { SectionLabel, useReducedMotionSafe } from "./motion-library-motion"
import { MotionLibraryWall, type WallReadout } from "./motion-library-wall"

const TITLE = "Orrery"
const EASE = [0.22, 1, 0.36, 1] as const

function signed(value: number) {
  const n = Math.round(value / 10)
  return `${n < 0 ? "−" : "+"}${String(Math.abs(n) % 10000).padStart(4, "0")}`
}

/**
 * The hero stays pinned while you scroll through it: the wall pushes in and
 * its columns slide apart, and the title lifts away. The readout in the
 * corner reports the wall's position and speed as you drag it.
 */
export function MotionLibraryHero() {
  const ref = React.useRef<HTMLElement>(null)
  const reduce = useReducedMotionSafe()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const titleY = useTransform(scrollYProgress, [0, 0.6], ["0%", "-35%"])
  const fade = useTransform(scrollYProgress, [0.15, 0.6], [1, 0])
  const xRef = React.useRef<HTMLSpanElement>(null)
  const yRef = React.useRef<HTMLSpanElement>(null)
  const vRef = React.useRef<HTMLSpanElement>(null)

  const onReadout = React.useCallback(({ x, y, velocity }: WallReadout) => {
    if (xRef.current) xRef.current.textContent = signed(x)
    if (yRef.current) yRef.current.textContent = signed(y * 10)
    if (vRef.current) vRef.current.textContent = velocity.toFixed(2)
  }, [])

  return (
    <section id="top" ref={ref} aria-labelledby="ml-hero-title" className="relative h-[200svh]">
      <div className="sticky top-0 h-svh overflow-hidden">
        <MotionLibraryWall progress={scrollYProgress} onReadout={onReadout} />
        {/* Shade the edges so the wall sinks into the page. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,transparent_35%,var(--ml-bg)_100%)]"
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-ml-bg/35" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-linear-to-b from-ml-bg via-ml-bg/80 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-ml-bg via-ml-bg/70 to-transparent"
        />

        <motion.div
          style={reduce ? undefined : { opacity: fade }}
          className="pointer-events-none absolute top-20 left-4 max-w-xs sm:left-6 sm:max-w-sm"
        >
          <SectionLabel index="01">Ready-made motion for sites people remember</SectionLabel>
          <p className="mt-4 text-sm leading-6 text-ml-muted sm:text-base">
            <span className="font-medium text-ml-ink">Motion people remember. Already built.</span> Every card on this wall is a component
            from the library, captured while it runs. Drag the wall.
          </p>
        </motion.div>

        <motion.h1
          id="ml-hero-title"
          style={reduce ? undefined : { y: titleY, opacity: fade }}
          className="pointer-events-none absolute inset-x-0 bottom-[11svh] px-3 text-[29vw] leading-[0.8] font-medium tracking-[-0.06em] sm:bottom-6 sm:px-5 sm:text-[22vw]"
        >
          <span className="sr-only">{TITLE}</span>
          <span aria-hidden="true" className="flex">
            {TITLE.split("").map((letter, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="inline-block"
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.1, delay: 0.2 + i * 0.07, ease: EASE }}
                >
                  {letter}
                </motion.span>
              </span>
            ))}
          </span>
        </motion.h1>

        {/* A live readout of the wall, purely decorative. */}
        <motion.div
          aria-hidden="true"
          style={reduce ? undefined : { opacity: fade }}
          className="pointer-events-none absolute right-4 bottom-4 flex flex-wrap items-center justify-end gap-x-4 gap-y-1 font-mono text-[10px] tracking-[0.12em] text-ml-muted uppercase sm:top-20 sm:right-6 sm:bottom-auto"
        >
          <span className="text-ml-ink">Drag the wall</span>
          <span>
            X{" "}
            <span ref={xRef} className="text-ml-ink tabular-nums">
              +0000
            </span>
          </span>
          <span>
            Y{" "}
            <span ref={yRef} className="text-ml-ink tabular-nums">
              +0000
            </span>
          </span>
          <span>
            Velocity{" "}
            <span ref={vRef} className="text-ml-ink tabular-nums">
              0.00
            </span>
          </span>
        </motion.div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-6 bottom-8 hidden text-center font-mono text-[10px] tracking-[0.2em] text-ml-muted sm:block"
        >
          SCROLL
          <span className="mx-auto mt-2 block h-8 w-px origin-top animate-ml-drip bg-ml-ink/60 motion-reduce:animate-none" />
        </div>
      </div>
    </section>
  )
}
