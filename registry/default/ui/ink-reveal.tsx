"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface InkRevealProps extends Omit<React.ComponentProps<"div">, "children"> {
  src: string
  alt: string
  /** How long the ink takes to cover the photo, in milliseconds. */
  duration?: number
  /** Wait this long after it comes into view, in milliseconds. */
  delay?: number
  /** Laid over the photo once it's revealed, e.g. a caption. */
  children?: React.ReactNode
}

/** Where the ink lands, as shares of the width and height, and when each drop starts (0–1 of the duration). */
const DROPS = [
  { x: 0.32, y: 0.42, at: 0 },
  { x: 0.7, y: 0.3, at: 0.12 },
  { x: 0.58, y: 0.74, at: 0.2 },
  { x: 0.16, y: 0.82, at: 0.3 },
  { x: 0.88, y: 0.78, at: 0.36 },
  { x: 0.12, y: 0.12, at: 0.42 },
]

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
 * A photo that appears like ink spreading on paper. When it scrolls into
 * view, drops of ink land and bleed outwards with rough, wet edges until they
 * merge and the whole photo shows. Size the frame with `className`, e.g.
 * `aspect-[4/5]`.
 */
function InkReveal({ src, alt, duration = 1600, delay = 0, className, children, ...props }: InkRevealProps) {
  const frameRef = React.useRef<HTMLDivElement>(null)
  const dropRefs = React.useRef<(SVGCircleElement | null)[]>([])
  const [size, setSize] = React.useState<{ w: number; h: number } | null>(null)
  const [done, setDone] = React.useState(false)
  const reduce = useReducedMotion()
  const id = React.useId().replace(/:/g, "")

  React.useEffect(() => {
    const el = frameRef.current
    if (!el) return
    const observer = new ResizeObserver(() => setSize({ w: el.clientWidth, h: el.clientHeight }))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  React.useEffect(() => {
    const el = frameRef.current
    if (!el || !size || done) return
    // Each drop grows until it could cover the whole frame on its own.
    const reach = Math.hypot(size.w, size.h)
    const setRadius = (t: number) =>
      DROPS.forEach((drop, i) => {
        const local = Math.min(1, Math.max(0, (t - drop.at) / (1 - drop.at)))
        const eased = 1 - Math.pow(1 - local, 3)
        dropRefs.current[i]?.setAttribute("r", String(eased * reach))
      })
    if (reduce) {
      setRadius(1)
      return
    }
    let raf = 0
    let timer = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        timer = window.setTimeout(() => {
          const begin = performance.now()
          const tick = (now: number) => {
            const t = Math.min(1, (now - begin) / duration)
            setRadius(t)
            if (t < 1) raf = requestAnimationFrame(tick)
            else setDone(true)
          }
          raf = requestAnimationFrame(tick)
        }, delay)
      },
      { threshold: 0.35 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      window.clearTimeout(timer)
      cancelAnimationFrame(raf)
    }
  }, [size, done, reduce, duration, delay])

  const revealed = done || reduce

  return (
    <div ref={frameRef} data-slot="ink-reveal" className={cn("relative isolate overflow-hidden bg-muted", className)} {...props}>
      {size ? (
        <svg
          role="img"
          aria-label={alt}
          width={size.w}
          height={size.h}
          viewBox={`0 0 ${size.w} ${size.h}`}
          className="absolute inset-0 block"
        >
          <defs>
            {/* Rough edges from noise, then the drops melt into each other where they meet. */}
            <filter id={`${id}-ink`} x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="3" seed="7" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="60" xChannelSelector="R" yChannelSelector="G" result="rough" />
              <feGaussianBlur in="rough" stdDeviation="7" result="soft" />
              <feColorMatrix in="soft" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9" />
            </filter>
            <mask id={`${id}-mask`} maskUnits="userSpaceOnUse" x="0" y="0" width={size.w} height={size.h}>
              <rect width={size.w} height={size.h} fill="black" />
              {revealed ? (
                <rect width={size.w} height={size.h} fill="white" />
              ) : (
                <g filter={`url(#${id}-ink)`}>
                  {DROPS.map((drop, i) => (
                    <circle
                      key={i}
                      ref={(el) => {
                        dropRefs.current[i] = el
                      }}
                      cx={drop.x * size.w}
                      cy={drop.y * size.h}
                      r={0}
                      fill="white"
                    />
                  ))}
                </g>
              )}
            </mask>
          </defs>
          <image href={src} width={size.w} height={size.h} preserveAspectRatio="xMidYMid slice" mask={`url(#${id}-mask)`} />
        </svg>
      ) : null}
      {children ? (
        <div
          className={cn(
            "relative z-10 size-full transition-opacity duration-700 motion-reduce:transition-none",
            revealed ? "opacity-100" : "opacity-0",
          )}
        >
          {children}
        </div>
      ) : null}
    </div>
  )
}

export { InkReveal }
