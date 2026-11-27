"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface ImageParallaxProps extends React.ComponentProps<"div"> {
  src: string
  alt: string
  /** How far the photo drifts against the scroll, as a share of the frame's height. 0 is still. */
  speed?: number
  /** Eases the photo from slightly zoomed in to its natural size as it crosses the screen. */
  zoom?: boolean
  /** Laid over the photo, e.g. a caption. */
  children?: React.ReactNode
}

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
 * A photo that moves slower than the page. As the frame scrolls past, the
 * photo inside drifts the other way, so it seems to sit deeper than the page.
 * Size the frame with `className`, e.g. `aspect-[16/9]` or `h-96`.
 */
function ImageParallax({ src, alt, speed = 0.18, zoom = false, className, children, ...props }: ImageParallaxProps) {
  const frameRef = React.useRef<HTMLDivElement>(null)
  const imageRef = React.useRef<HTMLImageElement>(null)
  const reduce = useReducedMotion()
  const amount = Math.min(0.45, Math.max(0, speed))

  React.useEffect(() => {
    const frame = frameRef.current
    const image = imageRef.current
    if (!frame || !image) return
    if (reduce) {
      image.style.transform = ""
      return
    }
    let raf = 0
    const update = () => {
      raf = 0
      const rect = frame.getBoundingClientRect()
      const view = window.innerHeight
      // -1 when the frame has just left the top of the screen, 1 when it's just below the bottom.
      const progress = Math.max(-1, Math.min(1, (rect.top + rect.height / 2 - view / 2) / (view / 2 + rect.height / 2)))
      const shift = -progress * amount * rect.height
      const scale = zoom ? 1 + Math.abs(progress) * 0.08 : 1
      image.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    // Only follow the scroll while the frame is on screen.
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        window.addEventListener("scroll", schedule, { passive: true })
        window.addEventListener("resize", schedule)
        schedule()
      } else {
        window.removeEventListener("scroll", schedule)
        window.removeEventListener("resize", schedule)
      }
    })
    observer.observe(frame)
    update()
    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      cancelAnimationFrame(raf)
    }
  }, [amount, zoom, reduce])

  return (
    <div ref={frameRef} data-slot="image-parallax" className={cn("relative isolate overflow-hidden", className)} {...props}>
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="absolute inset-x-0 -z-10 w-full object-cover will-change-transform"
        // Taller than the frame by the drift on both sides, so no edge ever shows.
        style={{ top: `${-amount * 100}%`, height: `${100 + amount * 200}%` }}
      />
      {children}
    </div>
  )
}

export { ImageParallax }
