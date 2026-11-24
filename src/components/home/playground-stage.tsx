"use client"

import * as React from "react"

/**
 * The playground's scroll choreography (GSAP + ScrollTrigger + SplitText):
 * - as the section scrolls in, the heading rises word by word and the lead fades up;
 * - on wide screens the section then pins briefly while the playground tilts up from
 *   a 3D angle to flat, like a laptop opening, then lets go so you can use it;
 * - on phones the same tilt plays as it scrolls in, without pinning.
 * GSAP loads only when the section comes near. With reduced motion nothing moves
 * and everything is simply shown.
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
          .timeline({ scrollTrigger: { trigger: root, start: "top 85%", end: "top 35%", scrub: 0.6 } })
          .from(split?.words ?? [], { yPercent: 115, rotate: 4, stagger: 0.08, ease: "power3.out" }, 0)
          .from("[data-pg-lead]", { y: 24, opacity: 0, ease: "power2.out" }, 0.25)
          .from("[data-pg-eyebrow]", { y: 12, opacity: 0, ease: "power2.out" }, 0)

        const mm = gsap.matchMedia()
        mm.add("(min-width: 1024px)", () => {
          gsap
            .timeline({
              scrollTrigger: { trigger: "[data-pg-pin]", start: "top 12%", end: "+=55%", scrub: 0.8, pin: true, anticipatePin: 1 },
            })
            .from("[data-pg-frame]", { rotateX: 24, y: 40, scale: 0.92, transformOrigin: "50% 100%", ease: "power2.out" }, 0)
            .from("[data-pg-side]", { x: 60, opacity: 0, ease: "power2.out" }, 0.15)
            .from("[data-pg-code]", { y: 50, opacity: 0, ease: "power2.out" }, 0.3)
        })
        mm.add("(max-width: 1023px)", () => {
          gsap.from("[data-pg-frame]", {
            rotateX: 22,
            y: 60,
            scale: 0.94,
            transformOrigin: "50% 100%",
            ease: "power2.out",
            scrollTrigger: { trigger: "[data-pg-frame]", start: "top 95%", end: "top 45%", scrub: 0.6 },
          })
        })
      }, root)
      revert = () => ctx.revert()
    }

    const near = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        near.disconnect()
        void start()
      },
      { rootMargin: "800px 0px" },
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
