"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface PixelImageTrailProps extends React.ComponentProps<"div"> {
  /** Photo URLs, shown in turn along the trail. They're decorative. */
  images: string[]
  /** Pointer travel, in pixels, between one photo and the next. */
  spacing?: number
  /** Photo width in pixels; the height follows `ratio`. */
  size?: number
  /** Height as a share of the width. */
  ratio?: number
  /** How long each photo stays before it fades, in milliseconds. */
  lifetime?: number
}

/** Block sizes, in pixels, that each photo steps through as it sharpens. */
const STEPS = [32, 20, 12, 7, 4, 2, 1]
const STEP_MS = 55
const MAX_TILES = 9

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

interface Tile {
  id: number
  x: number
  y: number
  image: HTMLImageElement
  tilt: number
}

/** One photo: drawn blocky, then sharper step by step, then it fades and shrinks away. */
function PixelTile({ tile, width, height, lifetime }: { tile: Tile; width: number; height: number; lifetime: number }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const [leaving, setLeaving] = React.useState(false)

  React.useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    canvas.width = Math.round(width * dpr)
    canvas.height = Math.round(height * dpr)
    const small = document.createElement("canvas")
    const smallCtx = small.getContext("2d")
    if (!smallCtx) return

    // Crop the photo to fill the tile, like object-fit: cover.
    const { naturalWidth: iw, naturalHeight: ih } = tile.image
    const scale = Math.max(canvas.width / iw, canvas.height / ih)
    const sw = canvas.width / scale
    const sh = canvas.height / scale
    const sx = (iw - sw) / 2
    const sy = (ih - sh) / 2

    const draw = (block: number) => {
      const w = Math.max(1, Math.round(canvas.width / (block * dpr)))
      const h = Math.max(1, Math.round(canvas.height / (block * dpr)))
      small.width = w
      small.height = h
      smallCtx.drawImage(tile.image, sx, sy, sw, sh, 0, 0, w, h)
      ctx.imageSmoothingEnabled = block <= 1
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(small, 0, 0, w, h, 0, 0, canvas.width, canvas.height)
    }

    let step = 0
    draw(STEPS[0])
    const timers = [
      window.setInterval(() => {
        step++
        if (step >= STEPS.length) return
        draw(step === STEPS.length - 1 ? 1 : STEPS[step])
      }, STEP_MS),
      window.setTimeout(() => setLeaving(true), lifetime),
    ]
    return () => {
      window.clearInterval(timers[0])
      window.clearTimeout(timers[1])
    }
  }, [tile, width, height, lifetime])

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "pointer-events-none absolute rounded-lg shadow-[0_18px_40px_-16px_rgb(0_0_0/0.5)] transition-[opacity,scale] duration-500 ease-out",
        leaving ? "scale-90 opacity-0" : "scale-100 opacity-100",
      )}
      style={{ left: tile.x - width / 2, top: tile.y - height / 2, width, height, rotate: `${tile.tilt}deg` }}
    />
  )
}

/**
 * A pointer trail of photos. As the pointer moves across the area, photos pop
 * out along its path, each one starting as big pixels and sharpening into
 * focus before it fades. Your content sits on top; the trail is decorative.
 */
function PixelImageTrail({
  images,
  spacing = 110,
  size = 180,
  ratio = 1.25,
  lifetime = 900,
  className,
  children,
  onPointerMove,
  onPointerLeave,
  ...props
}: PixelImageTrailProps) {
  const [tiles, setTiles] = React.useState<Tile[]>([])
  const loaded = React.useRef<HTMLImageElement[]>([])
  const last = React.useRef<{ x: number; y: number } | null>(null)
  const next = React.useRef(0)
  const id = React.useRef(0)
  const reduce = useReducedMotion()
  const height = Math.round(size * ratio)

  // Load the photos ahead of time, so each one is ready the moment it's needed.
  React.useEffect(() => {
    let live = true
    loaded.current = []
    for (const src of images) {
      const image = new Image()
      image.decoding = "async"
      image.onload = () => {
        if (live) loaded.current.push(image)
      }
      image.src = src
    }
    return () => {
      live = false
    }
  }, [images])

  const remove = React.useCallback((tileId: number) => setTiles((all) => all.filter((t) => t.id !== tileId)), [])

  return (
    <div
      data-slot="pixel-image-trail"
      onPointerMove={(event) => {
        onPointerMove?.(event)
        if (reduce || !loaded.current.length) return
        const rect = event.currentTarget.getBoundingClientRect()
        const point = { x: event.clientX - rect.left, y: event.clientY - rect.top }
        if (last.current && Math.hypot(point.x - last.current.x, point.y - last.current.y) < spacing) return
        last.current = point
        const tile: Tile = {
          id: ++id.current,
          ...point,
          image: loaded.current[next.current++ % loaded.current.length],
          tilt: (Math.random() - 0.5) * 14,
        }
        setTiles((all) => [...all.slice(-(MAX_TILES - 1)), tile])
        window.setTimeout(() => remove(tile.id), lifetime + 600)
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event)
        last.current = null
      }}
      className={cn("relative isolate overflow-hidden", className)}
      {...props}
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        {tiles.map((tile) => (
          <PixelTile key={tile.id} tile={tile} width={size} height={height} lifetime={lifetime} />
        ))}
      </div>
      {children}
    </div>
  )
}

export { PixelImageTrail }
