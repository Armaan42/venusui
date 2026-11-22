"use client"

import * as React from "react"
import {
  animate,
  motion,
  MotionConfig,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react"

/**
 * The template's motion system. Everything here follows the visitor's
 * "reduce motion" setting: movement is dropped and content simply appears.
 */

const EASE = [0.22, 1, 0.36, 1] as const

/** Wrap the page once so every animation respects reduced motion. */
export function AgencyLandingMotion({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
      <TouchActive />
    </MotionConfig>
  )
}

/**
 * Touch screens can't hover, so on them each card marked `data-touch` gets a
 * `data-active` attribute while it crosses the middle of the screen. The
 * cards style `group-data-active:` exactly like `group-hover:`, so phones see
 * the same effects as you scroll. Does nothing on devices with a mouse.
 */
function TouchActive() {
  React.useEffect(() => {
    if (window.matchMedia("(hover: hover)").matches) return
    const cards = document.querySelectorAll<HTMLElement>("[data-agency-landing] [data-touch]")
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) entry.target.toggleAttribute("data-active", entry.isIntersecting)
      },
      { rootMargin: "-38% 0px -38% 0px" },
    )
    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])
  return null
}

/** Fades and lifts its content in the first time it scrolls into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

const listVariants: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.09 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.98 },
  shown: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: EASE },
  },
}

/** A list whose items come in one after another as it scrolls into view. */
export function RevealList({
  children,
  className,
  as = "ul",
}: {
  children: React.ReactNode
  className?: string
  as?: "ul" | "ol" | "div" | "dl"
}) {
  const Tag = motion[as]
  return (
    <Tag className={className} variants={listVariants} initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.15 }}>
      {children}
    </Tag>
  )
}

/** One item in a `RevealList`. */
export function RevealItem({
  children,
  className,
  as = "li",
  touch = false,
}: {
  children: React.ReactNode
  className?: string
  as?: "li" | "div" | "figure"
  /** Play this card's hover effects on touch screens when it reaches the middle of the screen. */
  touch?: boolean
}) {
  const Tag = motion[as]
  return (
    <Tag className={className} variants={itemVariants} data-touch={touch ? "" : undefined}>
      {children}
    </Tag>
  )
}

/** A headline whose words slide up into place, one after another. */
export function RevealWords({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ")
  return (
    <span className={className}>
      {words.map((word, i) => (
        <React.Fragment key={`${word}-${i}`}>
          <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.1 + i * 0.06 }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </span>
  )
}

/**
 * Counts up to `value` the first time it scrolls into view. Screen readers
 * and the server render get the final text; with reduced motion it shows the
 * final value straight away.
 */
export function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.6,
  className,
}: {
  value: number
  decimals?: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const final = `${prefix}${value.toFixed(decimals)}${suffix}`

  React.useEffect(() => {
    const node = ref.current
    if (!node || reduce) return
    if (!inView) {
      node.textContent = `${prefix}${(0).toFixed(decimals)}${suffix}`
      return
    }
    const controls = animate(0, value, {
      duration,
      ease: EASE,
      onUpdate: (latest) => {
        node.textContent = `${prefix}${latest.toFixed(decimals)}${suffix}`
      },
    })
    return () => controls.stop()
  }, [inView, reduce, value, decimals, prefix, suffix, duration])

  return (
    <span className={className}>
      <span ref={ref} aria-hidden="true" className="tabular-nums">
        {final}
      </span>
      <span className="sr-only">{final}</span>
    </span>
  )
}

/**
 * The hero's wheel of cards. The cards sit around a very large circle that
 * turns slowly, so they travel across the screen along an arc, tilting with
 * the curve. Every so often each card flips over to show its back. The wheel
 * leans a little towards the pointer. Purely decorative; it stands still for
 * visitors who prefer reduced motion.
 */
export function HeroWheel({
  cards,
  spacing = 20,
}: {
  /** Front and back of each card. Repeat them to fill the circle (360 / spacing cards). */
  cards: { key: string; front: React.ReactNode; back: React.ReactNode }[]
  /** Degrees between neighbouring cards on the wheel. */
  spacing?: number
}) {
  const x = useMotionValue(0)
  const smoothX = useSpring(x, { stiffness: 50, damping: 18 })
  const shiftX = useTransform(smoothX, (v) => v * 28)

  return (
    <div
      aria-hidden="true"
      className="relative mt-6 h-[24rem] [--card-w:10rem] [--r:34rem] sm:h-[30rem] sm:[--card-w:15rem] sm:[--r:64rem]"
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        x.set((event.clientX - rect.left) / rect.width - 0.5)
      }}
      onPointerLeave={() => x.set(0)}
    >
      <motion.div
        className="absolute inset-0"
        style={{ x: shiftX }}
        initial={{ opacity: 0, y: 140 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 55, damping: 16, delay: 0.45 }}
      >
        {/* The wheel's hub: a point below the section; every card hangs off it at its own angle. */}
        <div className="absolute top-[calc(var(--r)+9rem)] left-1/2 size-0 animate-agency-wheel motion-reduce:animate-none sm:top-[calc(var(--r)+12rem)]">
          {cards.map((card, i) => (
            <div
              key={card.key}
              className="absolute top-0 left-0 w-(--card-w) [perspective:1200px]"
              style={{ transform: `translate(-50%, -50%) rotate(${i * spacing}deg) translateY(calc(var(--r) * -1))` }}
            >
              <div
                className="relative animate-agency-flip [transform-style:preserve-3d] motion-reduce:animate-none"
                style={{ animationDelay: `${-((i * 2.7) % 18)}s` }}
              >
                <div className="[backface-visibility:hidden]">{card.front}</div>
                <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">{card.back}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
