import { cn } from "@/lib/utils"

import { Reveal } from "./saas-landing-motion"

/** A small pill above a section heading. */
export function SaasLandingEyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground uppercase backdrop-blur",
        className,
      )}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-saas-primary" />
      {children}
    </p>
  )
}

/** The shared heading block: eyebrow, title and a lead paragraph. */
export function SaasLandingHeading({
  id,
  eyebrow,
  title,
  lead,
  align = "center",
  children,
}: {
  id: string
  eyebrow: string
  title: React.ReactNode
  lead?: React.ReactNode
  align?: "center" | "start"
  children?: React.ReactNode
}) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <SaasLandingEyebrow>{eyebrow}</SaasLandingEyebrow>
      <h2 id={id} className="mt-6 text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {lead ? <p className="mt-6 text-lg leading-8 text-pretty text-muted-foreground sm:text-xl sm:leading-9">{lead}</p> : null}
      {children}
    </Reveal>
  )
}
