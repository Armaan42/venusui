"use client"

import * as React from "react"

/**
 * A short, one-time entrance for the playground (GSAP + ScrollTrigger +
 * SplitText): when the section comes into view the heading rises word by
 * word, the small text fades up, and the playground eases up into place.
 * It plays once and never pins or ties itself to the scroll position. GSAP
 * loads only when the section comes near; with reduced motion nothing moves.
 */
export function PlaygroundStage({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const root = ref.current
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let cancelled = false
    let revert = () => {}

    const start = async () => {
      const [{ gsap }, { ScrollTrigger }, { SplitText }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("gsap/SplitText"),
      ])
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger, SplitText)

      const ctx = gsap.context(() => {
        const title = root.querySelector<HTMLElement>("[data-pg-title]")
        const split = title ? SplitText.create(title, { type: "words", mask: "words" }) : null
        gsap
          .timeline({ scrollTrigger: { trigger: root, start: "top 78%", once: true }, defaults: { ease: "power3.out" } })
          .from(split?.words ?? [], { yPercent: 100, duration: 0.8, stagger: 0.05 }, 0)
          .from("[data-pg-reveal]", { y: 12, opacity: 0, duration: 0.6, stagger: 0.08 }, 0.15)
          .from("[data-pg-block]", { y: 32, opacity: 0, duration: 0.9 }, 0.3)
      }, root)
      revert = () => ctx.revert()
    }

    const near = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        near.disconnect()
        void start()
      },
      { rootMargin: "600px 0px" },
    )
    near.observe(root)
    return () => {
      cancelled = true
      near.disconnect()
      revert()
    }
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
