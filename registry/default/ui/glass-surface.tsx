"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface GlassSurfaceProps extends React.ComponentProps<"div"> {
  /**
   * `dark` smokes the glass and uses white text, `light` frosts it and uses
   * dark text, and `clear` only blurs, keeping your own colours.
   */
  tint?: "dark" | "light" | "clear"
  /** Backdrop blur in pixels. */
  blur?: number
  /** A soft light that follows the pointer across the glass. */
  glare?: boolean
}

/** Fine grain, so the frosting reads as a material rather than a flat blur. */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

const tints = {
  dark: "bg-neutral-950/35 text-white border-white/20",
  light: "bg-white/55 text-neutral-950 border-white/60",
  clear: "bg-white/5 border-white/25",
}

/**
 * A pane of frosted glass. It blurs and brightens whatever is behind it,
 * catches light along its edges, and a soft glare follows the pointer. Put it
 * over a photo, video or colourful background.
 */
function GlassSurface({
  tint = "dark",
  blur = 18,
  glare = true,
  className,
  style,
  children,
  onPointerMove,
  onPointerLeave,
  ...props
}: GlassSurfaceProps) {
  return (
    <div
      data-slot="glass-surface"
      data-tint={tint}
      onPointerMove={(event) => {
        onPointerMove?.(event)
        if (!glare) return
        const el = event.currentTarget
        const rect = el.getBoundingClientRect()
        // Written straight to CSS variables, so moving the pointer never re-renders.
        el.style.setProperty("--glass-x", `${event.clientX - rect.left}px`)
        el.style.setProperty("--glass-y", `${event.clientY - rect.top}px`)
        el.style.setProperty("--glass-glare", "1")
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event)
        event.currentTarget.style.setProperty("--glass-glare", "0")
      }}
      className={cn(
        "relative isolate overflow-hidden rounded-3xl border shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-1px_0_rgb(255_255_255/0.12),inset_1px_0_0_rgb(255_255_255/0.18),0_24px_60px_-24px_rgb(0_0_0/0.55)]",
        tints[tint],
        className,
      )}
      style={{
        backdropFilter: `blur(${blur}px) saturate(1.7) brightness(1.05)`,
        WebkitBackdropFilter: `blur(${blur}px) saturate(1.7) brightness(1.05)`,
        ...style,
      }}
      {...props}
    >
      {/* Light falling across the pane from the top left. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-br from-white/30 via-white/0 via-45% to-white/10"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] mix-blend-overlay"
        style={{ backgroundImage: GRAIN }}
      />
      {glare ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-500"
          style={{
            opacity: "var(--glass-glare, 0)",
            background: "radial-gradient(280px circle at var(--glass-x, 50%) var(--glass-y, 0%), rgb(255 255 255 / 0.3), transparent 70%)",
          }}
        />
      ) : null}
      {children}
    </div>
  )
}

export { GlassSurface }
export type { GlassSurfaceProps }
