"use client"

import * as React from "react"
import { Maximize, Minimize, Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react"

import { cn } from "@/lib/utils"

export interface ShowreelChapter {
  /** Start time in seconds. */
  start: number
  title: string
}

interface ShowreelPlayerProps extends Omit<React.ComponentProps<"div">, "title"> {
  src: string
  /** Shown before the video loads, and instead of the preview with reduced motion. */
  poster?: string
  /** The reel's name, shown on the cover and used as the player's accessible name. */
  title: string
  /** A short line under the title on the cover, e.g. "2026 · Selected work". */
  description?: string
  /** Splits the progress bar into named chapters, listed under the player. */
  chapters?: ShowreelChapter[]
  /** Plays the reel silently on a loop behind the cover until someone presses play. */
  preview?: boolean
  /** `<track>` elements for captions, passed into the `<video>`. */
  children?: React.ReactNode
}

function clock(seconds: number) {
  const s = Math.max(0, Math.floor(seconds))
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`
}

const noopSubscribe = () => () => {}

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
 * A video player made for a showreel. Before it starts, the reel plays
 * silently behind a cover with a large play button. Once playing, the
 * progress bar is split into chapters that name themselves on hover, the
 * chapters are listed underneath, and the controls step aside while you
 * watch. Shortcuts: K or Space to play and pause, M to mute, F for full
 * screen, and the arrow keys on the progress bar to skip.
 */
function ShowreelPlayer({
  src,
  poster,
  title,
  description,
  chapters = [],
  preview = true,
  children,
  className,
  ...props
}: ShowreelPlayerProps) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const barRef = React.useRef<HTMLDivElement>(null)
  const idle = React.useRef(0)
  const [started, setStarted] = React.useState(false)
  const [playing, setPlaying] = React.useState(false)
  const [ended, setEnded] = React.useState(false)
  const [muted, setMuted] = React.useState(false)
  const [time, setTime] = React.useState(0)
  const [duration, setDuration] = React.useState(0)
  const [hover, setHover] = React.useState<{ time: number; x: number } | null>(null)
  const [scrubbing, setScrubbing] = React.useState(false)
  const [controlsShown, setControlsShown] = React.useState(true)
  const [fullscreen, setFullscreen] = React.useState(false)
  const canFullscreen = React.useSyncExternalStore(
    noopSubscribe,
    () => Boolean(document.fullscreenEnabled),
    () => false,
  )
  const reduce = useReducedMotion()

  const sorted = [...chapters].sort((a, b) => a.start - b.start)
  const chapterIndex = sorted.findLastIndex((c) => c.start <= time + 0.05)
  const chapter = sorted[chapterIndex]
  const chapterAt = (t: number) => sorted.findLast((c) => c.start <= t + 0.05)

  React.useEffect(() => {
    const onChange = () => setFullscreen(document.fullscreenElement === rootRef.current)
    document.addEventListener("fullscreenchange", onChange)
    return () => document.removeEventListener("fullscreenchange", onChange)
  }, [])

  // The video can load its metadata before React attaches its handlers, so read the duration directly too.
  React.useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const sync = () => setDuration(Number.isFinite(video.duration) ? video.duration : 0)
    const frame = requestAnimationFrame(sync)
    video.addEventListener("loadedmetadata", sync)
    video.addEventListener("durationchange", sync)
    return () => {
      cancelAnimationFrame(frame)
      video.removeEventListener("loadedmetadata", sync)
      video.removeEventListener("durationchange", sync)
    }
  }, [])

  // The silent preview: muted, looping, and only with motion allowed.
  React.useEffect(() => {
    const video = videoRef.current
    if (!video || started) return
    video.muted = true
    video.loop = true
    if (preview && !reduce) video.play().catch(() => {})
    else video.pause()
  }, [preview, reduce, started])

  /** Shows the controls, then hides them again after a moment of stillness while playing. */
  const wake = React.useCallback(() => {
    setControlsShown(true)
    window.clearTimeout(idle.current)
    idle.current = window.setTimeout(() => {
      const focusInControls = rootRef.current?.querySelector("[data-controls]")?.contains(document.activeElement)
      if (!focusInControls) setControlsShown(false)
    }, 2600)
  }, [])
  React.useEffect(() => () => window.clearTimeout(idle.current), [])

  const start = () => {
    const video = videoRef.current
    if (!video) return
    video.loop = false
    video.currentTime = 0
    video.muted = muted
    setStarted(true)
    setEnded(false)
    video.play().catch(() => {})
    wake()
  }

  const toggle = () => {
    const video = videoRef.current
    if (!video) return
    if (!started || ended) return start()
    if (video.paused) video.play().catch(() => {})
    else video.pause()
    wake()
  }

  const seek = (t: number) => {
    const video = videoRef.current
    if (!video || !duration) return
    video.currentTime = Math.min(duration, Math.max(0, t))
    setTime(video.currentTime)
    if (ended && t < duration) setEnded(false)
  }

  const jumpTo = (t: number) => {
    const video = videoRef.current
    if (!video) return
    if (!started) {
      video.loop = false
      video.muted = muted
      setStarted(true)
    }
    setEnded(false)
    seek(t)
    video.play().catch(() => {})
    wake()
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !muted
    setMuted(!muted)
  }

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {})
    else rootRef.current?.requestFullscreen().catch(() => {})
  }

  const timeFromPointer = (clientX: number) => {
    const rect = barRef.current?.getBoundingClientRect()
    if (!rect || !duration) return 0
    return (Math.min(rect.width, Math.max(0, clientX - rect.left)) / rect.width) * duration
  }

  const segments = sorted.length
    ? sorted.map((c, i) => ({ start: c.start, end: sorted[i + 1]?.start ?? duration, title: c.title }))
    : [{ start: 0, end: duration, title: "" }]

  const showControls = started && (controlsShown || !playing || scrubbing)

  return (
    <div className={cn("w-full", className)} {...props}>
      <div
        ref={rootRef}
        data-slot="showreel-player"
        role="region"
        aria-label={title}
        onPointerMove={() => started && wake()}
        onKeyDown={(event) => {
          if (event.target instanceof HTMLInputElement || event.altKey || event.ctrlKey || event.metaKey) return
          const key = event.key.toLowerCase()
          const onButton = event.target instanceof HTMLButtonElement
          if (key === "k" || (key === " " && !onButton)) {
            event.preventDefault()
            toggle()
          } else if (key === "m" && started) {
            toggleMute()
          } else if (key === "f" && canFullscreen) {
            toggleFullscreen()
          }
          if (started) wake()
        }}
        className={cn(
          "group/reel relative isolate aspect-video w-full overflow-hidden bg-neutral-950 text-white",
          fullscreen ? "rounded-none" : "rounded-2xl shadow-[0_30px_80px_-30px_rgb(0_0_0/0.6)]",
          started && playing && !showControls && "cursor-none",
        )}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          playsInline
          muted
          preload="metadata"
          onClick={() => started && toggle()}
          onDoubleClick={() => started && canFullscreen && toggleFullscreen()}
          onTimeUpdate={(event) => {
            if (!scrubbing) setTime(event.currentTarget.currentTime)
          }}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => {
            if (!started) return
            setEnded(true)
            setControlsShown(true)
          }}
          className={cn("absolute inset-0 size-full object-cover", !started && "scale-[1.02]")}
        >
          {children}
        </video>

        {/* Cover, before the reel starts. */}
        {!started ? (
          <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/80 via-black/20 to-black/10 p-5 sm:p-8">
            <button
              type="button"
              onClick={start}
              aria-label={`Play ${title}`}
              className="group/play absolute top-1/2 left-1/2 grid size-14 -translate-1/2 place-items-center rounded-full bg-white text-neutral-950 shadow-[0_10px_40px_rgb(0_0_0/0.4)] transition-[scale] duration-300 outline-none hover:scale-105 focus-visible:ring-4 focus-visible:ring-white/60 sm:size-24"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 animate-ping rounded-full bg-white/40 [animation-duration:2.4s] motion-reduce:hidden"
              />
              <Play aria-hidden="true" className="relative ml-1 size-6 fill-current sm:size-9" />
            </button>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-lg font-semibold tracking-tight sm:text-3xl">{title}</p>
                {description ? <p className="mt-1 text-sm text-white/80 sm:text-base">{description}</p> : null}
              </div>
              {duration ? (
                <span className="shrink-0 rounded-full bg-black/55 px-3 py-1 text-sm font-medium tabular-nums backdrop-blur">
                  {clock(duration)}
                </span>
              ) : null}
            </div>
          </div>
        ) : null}

        {/* Replay, once it has finished. */}
        {started && ended ? (
          <div className="absolute inset-0 grid place-items-center bg-black/55">
            <button
              type="button"
              onClick={start}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-neutral-950 outline-none hover:bg-white/90 focus-visible:ring-4 focus-visible:ring-white/60"
            >
              <RotateCcw aria-hidden="true" className="size-4" />
              Watch again
            </button>
          </div>
        ) : null}

        {/* Controls, once it has started. */}
        {started ? (
          <div
            data-controls=""
            onFocus={wake}
            className={cn(
              "absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 via-black/40 to-transparent px-4 pt-14 pb-3 transition-opacity duration-300 sm:px-5",
              showControls ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            {chapter && !ended ? (
              <p className="mb-2 text-xs font-medium tracking-wide text-white/85">
                {String(chapterIndex + 1).padStart(2, "0")} · {chapter.title}
              </p>
            ) : null}

            <div
              ref={barRef}
              role="slider"
              tabIndex={0}
              aria-label="Seek"
              aria-valuemin={0}
              aria-valuemax={Math.round(duration)}
              aria-valuenow={Math.round(time)}
              aria-valuetext={`${clock(time)} of ${clock(duration)}${chapter ? `, ${chapter.title}` : ""}`}
              onPointerDown={(event) => {
                if (event.button !== 0) return
                event.currentTarget.setPointerCapture(event.pointerId)
                setScrubbing(true)
                seek(timeFromPointer(event.clientX))
              }}
              onPointerMove={(event) => {
                const rect = event.currentTarget.getBoundingClientRect()
                setHover({ time: timeFromPointer(event.clientX), x: Math.min(rect.width, Math.max(0, event.clientX - rect.left)) })
                if (scrubbing) seek(timeFromPointer(event.clientX))
              }}
              onPointerUp={() => setScrubbing(false)}
              onPointerCancel={() => setScrubbing(false)}
              onPointerLeave={() => setHover(null)}
              onKeyDown={(event) => {
                const keys: Record<string, number> = {
                  ArrowRight: time + 5,
                  ArrowUp: time + 5,
                  ArrowLeft: time - 5,
                  ArrowDown: time - 5,
                  PageUp: time + duration / 10,
                  PageDown: time - duration / 10,
                  Home: 0,
                  End: duration,
                }
                if (!(event.key in keys)) return
                event.preventDefault()
                event.stopPropagation()
                seek(keys[event.key])
              }}
              className="group/bar relative flex h-5 cursor-pointer touch-none items-center gap-[3px] rounded outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              {segments.map((segment) => {
                const length = Math.max(0, segment.end - segment.start)
                const filled = length ? Math.min(1, Math.max(0, (time - segment.start) / length)) : 0
                return (
                  <span
                    key={segment.start}
                    className="relative h-1 overflow-hidden rounded-full bg-white/30 transition-[height] duration-150 group-hover/bar:h-1.5"
                    style={{ flexGrow: length || 1, flexBasis: 0 }}
                  >
                    <span className="absolute inset-y-0 left-0 rounded-full bg-white" style={{ width: `${filled * 100}%` }} />
                  </span>
                )
              })}
              {hover ? (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-full mb-2 -translate-x-1/2 rounded-md bg-white px-2 py-1 text-xs font-medium whitespace-nowrap text-neutral-950 shadow"
                  style={{ left: hover.x }}
                >
                  {chapterAt(hover.time)?.title ? `${chapterAt(hover.time)?.title} · ` : ""}
                  <span className="tabular-nums">{clock(hover.time)}</span>
                </span>
              ) : null}
            </div>

            <div className="mt-1.5 flex items-center gap-1">
              <button
                type="button"
                onClick={toggle}
                aria-label={playing ? "Pause" : "Play"}
                className="grid size-9 place-items-center rounded-full outline-none hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-white/70"
              >
                {playing ? (
                  <Pause aria-hidden="true" className="size-5 fill-current" />
                ) : (
                  <Play aria-hidden="true" className="size-5 fill-current" />
                )}
              </button>
              <button
                type="button"
                onClick={toggleMute}
                aria-label={muted ? "Unmute" : "Mute"}
                className="grid size-9 place-items-center rounded-full outline-none hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-white/70"
              >
                {muted ? <VolumeX aria-hidden="true" className="size-5" /> : <Volume2 aria-hidden="true" className="size-5" />}
              </button>
              <span className="ml-1 text-xs text-white/85 tabular-nums">
                {clock(time)} / {clock(duration)}
              </span>
              {canFullscreen ? (
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  aria-label={fullscreen ? "Exit full screen" : "Full screen"}
                  className="ml-auto grid size-9 place-items-center rounded-full outline-none hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-white/70"
                >
                  {fullscreen ? <Minimize aria-hidden="true" className="size-5" /> : <Maximize aria-hidden="true" className="size-5" />}
                </button>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>

      {sorted.length > 1 ? (
        <ol className="mt-4 grid list-none gap-2 p-0 sm:grid-cols-[repeat(auto-fit,minmax(9rem,1fr))]" aria-label="Chapters">
          {sorted.map((c, i) => {
            const current = started && i === chapterIndex
            return (
              <li key={c.start}>
                <button
                  type="button"
                  onClick={() => jumpTo(c.start)}
                  aria-current={current ? "step" : undefined}
                  className={cn(
                    "flex w-full items-baseline gap-2 rounded-xl border px-3 py-2.5 text-left text-sm outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 sm:flex-col sm:gap-0.5",
                    current && "border-foreground/30 bg-muted",
                  )}
                >
                  {/* Number and time share a line above the title on wider screens, so titles have room. */}
                  <span className="text-xs text-muted-foreground tabular-nums sm:flex sm:w-full sm:justify-between">
                    {String(i + 1).padStart(2, "0")}
                    <span className="hidden sm:inline">{clock(c.start)}</span>
                  </span>
                  <span className="min-w-0 flex-1 font-medium text-balance">{c.title}</span>
                  <span className="text-xs text-muted-foreground tabular-nums sm:hidden">{clock(c.start)}</span>
                </button>
              </li>
            )
          })}
        </ol>
      ) : null}
    </div>
  )
}

export { ShowreelPlayer }
