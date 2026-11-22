import { cn } from "@/lib/utils"

/** The Arcwell mark and wordmark. Swap in your own logo here. */
export function AgencyLandingLogo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-xl font-medium tracking-tight", className)}>
      <svg viewBox="0 0 32 32" aria-hidden="true" className="size-8 shrink-0">
        <circle cx="16" cy="16" r="16" className="fill-foreground" />
        <path d="M9 21a7 7 0 0 1 14 0" fill="none" className="stroke-background" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="16" cy="21" r="2.25" className="fill-agency-accent" />
      </svg>
      Arcwell
    </span>
  )
}
