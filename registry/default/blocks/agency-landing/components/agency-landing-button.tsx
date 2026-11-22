import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * The template's pill link: a label and a round arrow. `primary` is filled
 * with the brand colour; `secondary` is white with a soft shadow.
 */
export function AgencyLandingButton({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string
  children: React.ReactNode
  variant?: "primary" | "secondary"
  className?: string
}) {
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex h-11 items-center gap-3 rounded-full py-1 pr-1 pl-5 text-sm font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-agency-accent/40",
        variant === "primary"
          ? "bg-agency-accent text-white shadow-[0_6px_16px_-6px_var(--agency-accent)] hover:bg-agency-accent/90"
          : "bg-agency-card text-foreground shadow-[0_1px_2px_rgb(0_0_0/0.06),0_6px_16px_-8px_rgb(0_0_0/0.18)] ring-1 ring-border/70 hover:bg-agency-card/80",
        className,
      )}
    >
      {children}
      <span
        aria-hidden="true"
        className={cn(
          "grid size-9 place-items-center rounded-full transition-transform group-hover:rotate-45",
          variant === "primary" ? "bg-white text-agency-accent" : "bg-agency-surface text-foreground",
        )}
      >
        <ArrowUpRight className="size-4" />
      </span>
    </a>
  )
}

/** The small label above a section heading: a star between two short lines. */
export function AgencyLandingEyebrow({ children, align = "center" }: { children: React.ReactNode; align?: "center" | "start" }) {
  return (
    <p className={cn("flex items-center gap-3 text-xs font-medium tracking-wide text-foreground/80 uppercase", align === "center" && "justify-center")}>
      <span aria-hidden="true" className="h-px w-8 bg-border" />
      <span className="inline-flex items-center gap-1.5">
        <svg viewBox="0 0 16 16" aria-hidden="true" className="size-3 fill-agency-accent">
          <path d="M8 .8l2.1 4.6 5 .5-3.8 3.4 1.1 4.9L8 11.7 3.6 14.2l1.1-4.9L.9 5.9l5-.5z" />
        </svg>
        {children}
      </span>
      <span aria-hidden="true" className="h-px w-8 bg-border" />
    </p>
  )
}
