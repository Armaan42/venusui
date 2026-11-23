"use client"

import * as React from "react"
import { animate, motion, MotionConfig, useInView, useReducedMotion, useScroll, useTransform, type Variants } from "motion/react"

/**
 * The template's motion system. Everything follows the visitor's "reduce
 * motion" setting: movement is dropped and content simply appears.
 */

const EASE = [0.22, 1, 0.36, 1] as const

/** Wrap the page once so every animation respects reduced motion. */
export function SaasLandingMotion({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}

/** Fades and lifts its content in the first time it scrolls into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 32,
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
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

const listVariants: Variants = { hidden: {}, shown: { transition: { staggerChildren: 0.08 } } }
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
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
}: {
  children: React.ReactNode
  className?: string
  as?: "li" | "div" | "figure"
}) {
  const Tag = motion[as]
  return (
    <Tag className={className} variants={itemVariants}>
      {children}
    </Tag>
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
  className,
}: {
  value: number
  decimals?: number
  prefix?: string
  suffix?: string
  className?: string
}) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const final = `${prefix}${value.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`

  React.useEffect(() => {
    const node = ref.current
    if (!node || reduce) return
    const format = (n: number) =>
      `${prefix}${n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`
    if (!inView) {
      node.textContent = format(0)
      return
    }
    const controls = animate(0, value, { duration: 1.6, ease: EASE, onUpdate: (n) => (node.textContent = format(n)) })
    return () => controls.stop()
  }, [inView, reduce, value, decimals, prefix, suffix])

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
 * The hero's product screen. It starts tilted back, like a laptop lid half
 * open, and settles flat as you scroll it into view.
 */
export function HeroScreen({ children }: { children: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.35"] })
  const rotateX = useTransform(scrollYProgress, [0, 1], [16, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1])

  return (
    <div ref={ref} className="[perspective:1600px]">
      <motion.div
        style={{ rotateX, scale, transformOrigin: "50% 100%" }}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.5 }}
      >
        {children}
      </motion.div>
    </div>
  )
}

/** A bar that grows to `width` (a percentage) when it scrolls into view. */
export function GrowBar({ width, className, children }: { width: number; className?: string; children?: React.ReactNode }) {
  return (
    <motion.div
      className={className}
      initial={{ width: "0%" }}
      whileInView={{ width: `${width}%` }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 1.1, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}
