import { cn } from "@/lib/utils"

import { AgencyLandingEyebrow } from "./agency-landing-button"
import { Reveal, RevealWords } from "./agency-landing-motion"

/**
 * The heading at the top of an inner page: an eyebrow, a large `h1` whose
 * `muted` tail is greyed out, a short lead and optional actions.
 */
export function AgencyPageHeader({
  id,
  eyebrow,
  title,
  muted,
  lead,
  children,
  className,
}: {
  id: string
  eyebrow?: string
  title: string
  muted?: string
  lead?: string
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("mx-auto max-w-4xl px-4 pt-16 text-center sm:px-6 sm:pt-24", className)}>
      {eyebrow ? (
        <Reveal y={12}>
          <AgencyLandingEyebrow>{eyebrow}</AgencyLandingEyebrow>
        </Reveal>
      ) : null}
      <h1 id={id} className="mt-6 text-[2.5rem] leading-[1.06] font-medium tracking-tight text-balance sm:text-6xl">
        <RevealWords text={title} />
        {muted ? (
          <>
            {" "}
            <span className="text-muted-foreground">
              <RevealWords text={muted} />
            </span>
          </>
        ) : null}
      </h1>
      {lead ? (
        <Reveal delay={0.35}>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-muted-foreground sm:text-lg sm:leading-8">{lead}</p>
        </Reveal>
      ) : null}
      {children ? (
        <Reveal delay={0.5} className="mt-8 flex flex-wrap justify-center gap-3">
          {children}
        </Reveal>
      ) : null}
    </div>
  )
}
