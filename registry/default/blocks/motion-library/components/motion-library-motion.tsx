"use client"

import * as React from "react"
import Lenis from "lenis"
import { MotionConfig, useInView, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

/**
 * Weighted, smooth scrolling for the whole page (Lenis), and one place for
 * the motion settings. Lenis follows the visitor's reduced-motion setting by
 * itself, and every `motion` animation inside follows it through `MotionConfig`.
 */
export function MotionLibraryMotion({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, autoRaf: true, anchors: { offset: -72 } })
    return () => lenis.destroy()
  }, [])
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)")
  query.addEventListener("change", onChange)
  return () => query.removeEventListener("change", onChange)
}

/**
 * The visitor's reduced-motion setting, safe to use for markup: it is `false`
 * on the server and during hydration, then the real value, so layouts that
 * depend on it (like the pinned scroll scenes) never mismatch.
 */
export function useReducedMotionSafe() {
  return React.useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  )
}

const GLYPHS = "&1?#:+Z%/<>*9"

/**
 * Text that resolves out of random glyphs, left to right. It plays when it
 * scrolls into view (`trigger="view"`) or each time the pointer enters its
 * parent link (`trigger="hover"`). Screen readers and the first paint get the
 * real text; with reduced motion it never scrambles.
 */
export function Scramble({
  text,
  className,
  trigger = "view",
  duration = 0.8,
  delay = 0,
}: {
  text: string
  className?: string
  trigger?: "view" | "hover"
  duration?: number
  delay?: number
}) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const reduce = useReducedMotion()
  const inView = useInView(ref, { once: true, amount: 0.8 })
  const frame = React.useRef(0)

  const play = React.useCallback(() => {
    const node = ref.current
    if (!node || reduce) return
    cancelAnimationFrame(frame.current)
    let start = -1
    const tick = (now: number) => {
      if (start < 0) start = now + delay * 1000
      const t = Math.max(0, (now - start) / (duration * 1000))
      const settled = Math.floor(t * text.length)
      let out = text.slice(0, settled)
      for (let i = settled; i < text.length; i++) {
        out += text[i] === " " ? " " : GLYPHS[(i * 7 + Math.floor(now / 45)) % GLYPHS.length]
      }
      node.textContent = t >= 1 ? text : out
      if (t < 1) frame.current = requestAnimationFrame(tick)
    }
    frame.current = requestAnimationFrame(tick)
  }, [reduce, delay, duration, text])

  React.useEffect(() => {
    if (trigger === "view" && inView) play()
  }, [trigger, inView, play])

  React.useEffect(() => {
    if (trigger !== "hover") return
    const parent = ref.current?.closest("a, button")
    if (!parent) return
    parent.addEventListener("pointerenter", play)
    parent.addEventListener("focus", play)
    return () => {
      parent.removeEventListener("pointerenter", play)
      parent.removeEventListener("focus", play)
    }
  }, [trigger, play])

  React.useEffect(() => () => cancelAnimationFrame(frame.current), [])

  return (
    <span className={cn("relative", className)}>
      <span ref={ref} aria-hidden="true">
        {text}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  )
}

/** The small numbered label above each section, set in the mono face. */
export function SectionLabel({ index, children, className }: { index: string; children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("font-mono text-[11px] tracking-[0.14em] text-ml-muted uppercase", className)}>
      <span className="mr-2">({index})</span>
      {children}
    </p>
  )
}
