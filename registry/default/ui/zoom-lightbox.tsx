"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react"

import { cn } from "@/lib/utils"

export interface LightboxImage {
  /** The full-size photo. */
  src: string
  alt: string
  caption?: string
  /** A smaller copy for the grid. Defaults to `src`. */
  thumbnail?: string
}

interface ZoomLightboxProps extends Omit<React.ComponentProps<"ul">, "children"> {
  images: LightboxImage[]
  /** Classes for each thumbnail image, e.g. `aspect-square`. */
  thumbnailClassName?: string
}

const CLICK_ZOOM = 2.5
const MAX_ZOOM = 4
const OPEN_MS = 420

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

type Zoom = { scale: number; x: number; y: number }
const NO_ZOOM: Zoom = { scale: 1, x: 0, y: 0 }

/**
 * A photo grid that opens into a full-screen viewer. The photo grows out of
 * its thumbnail and shrinks back into it when you close. Click the photo to
 * zoom in where you clicked, drag to look around, scroll to zoom further,
 * and use the arrows, a swipe or the keyboard to move between photos.
 */
function ZoomLightbox({ images, className, thumbnailClassName, ...props }: ZoomLightboxProps) {
  const [index, setIndex] = React.useState(0)
  const [isOpen, setIsOpen] = React.useState(false)
  const [closing, setClosing] = React.useState(false)
  const [natural, setNatural] = React.useState<{ w: number; h: number } | null>(null)
  const [box, setBox] = React.useState({ w: 1200, h: 800 })
  const [zoom, setZoom] = React.useState<Zoom>(NO_ZOOM)
  const [panning, setPanning] = React.useState(false)
  const dialogRef = React.useRef<HTMLDialogElement>(null)
  const imageRef = React.useRef<HTMLImageElement>(null)
  const zoomRef = React.useRef<HTMLDivElement>(null)
  const thumbs = React.useRef<(HTMLButtonElement | null)[]>([])
  const pending = React.useRef<"open" | null>(null)
  const pointer = React.useRef<{ x: number; y: number; startX: number; startY: number; zoom: Zoom; moved: boolean } | null>(null)
  const reduce = useReducedMotion()
  const image = images[index]

  const measure = React.useCallback(() => {
    const narrow = window.innerWidth < 640
    setBox({ w: window.innerWidth - (narrow ? 24 : 160), h: window.innerHeight - (narrow ? 150 : 170) })
  }, [])

  // While open: keep the page still and the photo sized to the window.
  React.useEffect(() => {
    if (!isOpen) return
    const root = document.documentElement
    const before = root.style.overflow
    root.style.overflow = "hidden"
    window.addEventListener("resize", measure)
    return () => {
      root.style.overflow = before
      window.removeEventListener("resize", measure)
    }
  }, [isOpen, measure])

  // The photo fitted inside the window, never larger than it really is.
  const fit = natural ? Math.min(box.w / natural.w, box.h / natural.h, 1) : 0
  const size = natural ? { w: Math.round(natural.w * fit), h: Math.round(natural.h * fit) } : null

  /** Places the photo exactly over its thumbnail: scaled to cover it and cropped to its shape. */
  const overThumbnail = (img: HTMLImageElement, thumb: HTMLElement) => {
    const from = thumb.getBoundingClientRect()
    const to = img.getBoundingClientRect()
    const scale = Math.max(from.width / to.width, from.height / to.height)
    const dx = from.left + from.width / 2 - (to.left + to.width / 2)
    const dy = from.top + from.height / 2 - (to.top + to.height / 2)
    const insetX = Math.max(0, (to.width - from.width / scale) / 2)
    const insetY = Math.max(0, (to.height - from.height / scale) / 2)
    const radius = parseFloat(getComputedStyle(thumb).borderRadius) || 0
    return {
      transform: `translate(${dx}px, ${dy}px) scale(${scale})`,
      clipPath: `inset(${insetY}px ${insetX}px round ${radius / scale}px)`,
    }
  }

  // Grow the photo out of its thumbnail once it has loaded and been sized.
  React.useLayoutEffect(() => {
    const img = imageRef.current
    const thumb = thumbs.current[index]
    if (pending.current !== "open" || !img || !size) return
    pending.current = null
    if (reduce || !thumb) return
    const start = overThumbnail(img, thumb)
    img.style.transition = "none"
    img.style.transform = start.transform
    img.style.clipPath = start.clipPath
    void img.offsetWidth
    img.style.transition = `transform ${OPEN_MS}ms cubic-bezier(0.22, 1, 0.36, 1), clip-path ${OPEN_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`
    img.style.transform = ""
    img.style.clipPath = "inset(0px 0px round 0px)"
  })

  const openAt = (i: number) => {
    setIndex(i)
    setNatural(null)
    setZoom(NO_ZOOM)
    setClosing(false)
    measure()
    pending.current = "open"
    setIsOpen(true)
    dialogRef.current?.showModal()
  }

  const finishClose = React.useCallback(() => {
    dialogRef.current?.close()
    setIsOpen(false)
    setClosing(false)
    thumbs.current[index]?.focus()
  }, [index])

  const close = () => {
    const img = imageRef.current
    const thumb = thumbs.current[index]
    setZoom(NO_ZOOM)
    if (reduce || !img || !thumb || !size) return finishClose()
    setClosing(true)
    // Shrink back into the thumbnail of the photo now showing, then close.
    if (zoomRef.current) zoomRef.current.style.transform = ""
    const end = overThumbnail(img, thumb)
    img.style.transition = `transform ${OPEN_MS * 0.85}ms cubic-bezier(0.4, 0, 0.2, 1), clip-path ${OPEN_MS * 0.85}ms cubic-bezier(0.4, 0, 0.2, 1)`
    img.style.transform = end.transform
    img.style.clipPath = end.clipPath
    window.setTimeout(finishClose, OPEN_MS * 0.85)
  }

  const go = (next: number) => {
    const target = (next + images.length) % images.length
    if (target === index) return
    const img = imageRef.current
    if (img) {
      img.style.transition = "none"
      img.style.transform = ""
      img.style.clipPath = ""
    }
    setIndex(target)
    setNatural(null)
    setZoom(NO_ZOOM)
  }

  const clampZoom = (z: Zoom): Zoom => {
    if (!size) return NO_ZOOM
    const scale = Math.min(MAX_ZOOM, Math.max(1, z.scale))
    const limitX = (size.w * (scale - 1)) / 2
    const limitY = (size.h * (scale - 1)) / 2
    return { scale, x: Math.min(limitX, Math.max(-limitX, z.x)), y: Math.min(limitY, Math.max(-limitY, z.y)) }
  }

  /** Zooms to `scale`, keeping the point under (clientX, clientY) where it is. */
  const zoomAt = (scale: number, clientX?: number, clientY?: number, from: Zoom = zoom) => {
    const el = zoomRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2 - from.x
    const cy = rect.top + rect.height / 2 - from.y
    const px = clientX ?? cx
    const py = clientY ?? cy
    const ux = (px - cx - from.x) / from.scale
    const uy = (py - cy - from.y) / from.scale
    setZoom(clampZoom({ scale, x: px - cx - ux * scale, y: py - cy - uy * scale }))
  }

  // Wheel zoom needs a non-passive listener.
  React.useEffect(() => {
    const el = zoomRef.current
    if (!isOpen || !el) return
    const onWheel = (event: WheelEvent) => {
      event.preventDefault()
      zoomAt(zoom.scale * Math.exp(-event.deltaY * 0.002), event.clientX, event.clientY)
    }
    el.addEventListener("wheel", onWheel, { passive: false })
    return () => el.removeEventListener("wheel", onWheel)
  })

  const zoomed = zoom.scale > 1.01
  const shown = isOpen && !closing

  return (
    <>
      <ul data-slot="zoom-lightbox" className={cn("grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-3", className)} {...props}>
        {images.map((item, i) => (
          <li key={item.src}>
            <button
              ref={(el) => {
                thumbs.current[i] = el
              }}
              type="button"
              onClick={() => openAt(i)}
              aria-label={`Open ${item.alt}`}
              aria-haspopup="dialog"
              className="group block w-full overflow-hidden rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <img
                src={item.thumbnail ?? item.src}
                alt=""
                loading="lazy"
                className={cn(
                  "aspect-[4/3] w-full rounded-xl object-cover transition-[scale,opacity] duration-500 group-hover:scale-[1.03] motion-reduce:transition-none",
                  isOpen && i === index && "opacity-0",
                  thumbnailClassName,
                )}
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={image ? `${image.alt}, ${index + 1} of ${images.length}` : "Photo viewer"}
        onCancel={(event) => {
          event.preventDefault()
          close()
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") go(index + 1)
          else if (event.key === "ArrowLeft") go(index - 1)
          else if (event.key === "+" || event.key === "=") zoomAt(Math.min(MAX_ZOOM, zoom.scale * 1.5))
          else if (event.key === "-") zoomAt(Math.max(1, zoom.scale / 1.5))
          else if (event.key === "0") setZoom(NO_ZOOM)
          else return
          event.preventDefault()
        }}
        className="fixed inset-0 m-0 size-full max-h-none max-w-none overflow-hidden bg-transparent p-0 text-white backdrop:bg-transparent"
      >
        {isOpen ? (
          <div className="relative flex size-full flex-col">
            <div
              aria-hidden="true"
              onClick={close}
              className={cn(
                "absolute inset-0 bg-neutral-950/95 transition-opacity duration-300 starting:opacity-0",
                shown ? "opacity-100" : "opacity-0",
              )}
            />

            <div
              className={cn(
                "relative z-10 flex h-14 items-center justify-between gap-3 px-3 transition-opacity duration-300 starting:opacity-0 sm:px-5",
                shown ? "opacity-100" : "opacity-0",
              )}
            >
              <p className="text-sm text-white/85 tabular-nums">
                {index + 1} / {images.length}
              </p>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => (zoomed ? setZoom(NO_ZOOM) : zoomAt(CLICK_ZOOM))}
                  aria-label={zoomed ? "Zoom out" : "Zoom in"}
                  className="grid size-10 place-items-center rounded-full outline-none hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-white/70"
                >
                  {zoomed ? <ZoomOut aria-hidden="true" className="size-5" /> : <ZoomIn aria-hidden="true" className="size-5" />}
                </button>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close"
                  className="grid size-10 place-items-center rounded-full outline-none hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-white/70"
                >
                  <X aria-hidden="true" className="size-5" />
                </button>
              </div>
            </div>

            {/* Clicks around the photo fall through to the backdrop, which closes the viewer. */}
            <div className="pointer-events-none relative z-0 flex flex-1 items-center justify-center">
              <div
                ref={zoomRef}
                className={cn(
                  "pointer-events-auto relative",
                  zoomed ? (panning ? "cursor-grabbing" : "cursor-grab") : "cursor-zoom-in",
                  zoomed ? "touch-none" : "touch-pan-y",
                  !panning && "transition-transform duration-300 ease-out motion-reduce:transition-none",
                )}
                style={{ transform: zoomed ? `translate(${zoom.x}px, ${zoom.y}px) scale(${zoom.scale})` : undefined }}
                onPointerDown={(event) => {
                  if (event.button !== 0) return
                  event.currentTarget.setPointerCapture(event.pointerId)
                  pointer.current = { x: event.clientX, y: event.clientY, startX: event.clientX, startY: event.clientY, zoom, moved: false }
                }}
                onPointerMove={(event) => {
                  const p = pointer.current
                  if (!p) return
                  const dx = event.clientX - p.startX
                  const dy = event.clientY - p.startY
                  if (!p.moved && Math.hypot(dx, dy) < 6) return
                  p.moved = true
                  if (p.zoom.scale > 1.01) {
                    setPanning(true)
                    setZoom(clampZoom({ ...p.zoom, x: p.zoom.x + dx, y: p.zoom.y + dy }))
                  }
                }}
                onPointerUp={(event) => {
                  const p = pointer.current
                  pointer.current = null
                  setPanning(false)
                  if (!p) return
                  const dx = event.clientX - p.startX
                  if (!p.moved) {
                    // A tap zooms in where you tapped, or back out.
                    if (zoomed) setZoom(NO_ZOOM)
                    else zoomAt(CLICK_ZOOM, event.clientX, event.clientY)
                  } else if (p.zoom.scale <= 1.01 && Math.abs(dx) > 60) {
                    // A sideways swipe moves between photos.
                    go(index + (dx < 0 ? 1 : -1))
                  }
                }}
                onPointerCancel={() => {
                  pointer.current = null
                  setPanning(false)
                }}
              >
                {image ? (
                  <img
                    ref={imageRef}
                    key={image.src}
                    src={image.src}
                    alt={image.alt}
                    draggable={false}
                    onLoad={(event) => setNatural({ w: event.currentTarget.naturalWidth, h: event.currentTarget.naturalHeight })}
                    className={cn("block max-w-none rounded-sm select-none", !size && "opacity-0")}
                    style={size ? { width: size.w, height: size.h } : { width: 1, height: 1 }}
                  />
                ) : null}
              </div>
            </div>

            {images.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => go(index - 1)}
                  aria-label="Previous photo"
                  className={cn(
                    "absolute top-1/2 left-2 z-10 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 outline-none hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white/70 sm:grid sm:left-5",
                    "transition-opacity duration-300 starting:opacity-0",
                    shown ? "opacity-100" : "opacity-0",
                  )}
                >
                  <ChevronLeft aria-hidden="true" className="size-6" />
                </button>
                <button
                  type="button"
                  onClick={() => go(index + 1)}
                  aria-label="Next photo"
                  className={cn(
                    "absolute top-1/2 right-2 z-10 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 outline-none hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white/70 sm:grid sm:right-5",
                    "transition-opacity duration-300 starting:opacity-0",
                    shown ? "opacity-100" : "opacity-0",
                  )}
                >
                  <ChevronRight aria-hidden="true" className="size-6" />
                </button>
              </>
            ) : null}

            <div
              className={cn(
                "relative z-10 flex min-h-16 items-center justify-center gap-4 px-4 pb-4 text-center transition-opacity duration-300 starting:opacity-0",
                shown ? "opacity-100" : "opacity-0",
              )}
            >
              {images.length > 1 ? (
                <button
                  type="button"
                  onClick={() => go(index - 1)}
                  aria-label="Previous photo"
                  className="grid size-10 shrink-0 place-items-center rounded-full bg-white/10 outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:hidden"
                >
                  <ChevronLeft aria-hidden="true" className="size-5" />
                </button>
              ) : null}
              <p className="max-w-xl text-sm text-pretty text-white/90" aria-live="polite">
                {image?.caption ?? image?.alt}
              </p>
              {images.length > 1 ? (
                <button
                  type="button"
                  onClick={() => go(index + 1)}
                  aria-label="Next photo"
                  className="grid size-10 shrink-0 place-items-center rounded-full bg-white/10 outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:hidden"
                >
                  <ChevronRight aria-hidden="true" className="size-5" />
                </button>
              ) : null}
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  )
}

export { ZoomLightbox }
