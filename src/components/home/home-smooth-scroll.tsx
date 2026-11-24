"use client"

import * as React from "react"
import Lenis from "lenis"

/**
 * Weighted, smooth scrolling for the homepage only (docs and component pages
 * keep the browser's own scrolling). Scroll areas inside the page, like code
 * blocks and menus, still scroll on their own, and Lenis turns smoothing off
 * for visitors who prefer reduced motion. GSAP's ScrollTrigger reads the real
 * scroll position, so the playground's scroll animations follow along.
 */
export function HomeSmoothScroll() {
  React.useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, autoRaf: true, anchors: true, allowNestedScroll: true })
    return () => lenis.destroy()
  }, [])
  return null
}
