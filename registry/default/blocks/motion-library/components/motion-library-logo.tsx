import { cn } from "@/lib/utils"

/** Orrery's mark: a sun with one planet on a tilted orbit, which turns slowly. Made up; swap in your own. */
export function MotionLibraryLogo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-sm font-medium tracking-tight", className)}>
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6">
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="4.5"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.5"
          strokeWidth="1.2"
          transform="rotate(-24 12 12)"
        />
        <circle cx="12" cy="12" r="3.2" fill="currentColor" />
        <g className="origin-center animate-ml-orbit motion-reduce:animate-none">
          <circle cx="21.1" cy="8" r="1.9" className="fill-ml-accent" />
        </g>
      </svg>
      Orrery
    </span>
  )
}
