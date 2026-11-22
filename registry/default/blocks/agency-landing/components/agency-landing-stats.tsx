import { cn } from "@/lib/utils"

import { AgencyLandingArt, type ArtName } from "./agency-landing-art"
import { AgencyLandingButton, AgencyLandingEyebrow } from "./agency-landing-button"

/** Four staggered figures. Two sit on artwork; the others on plain cards. */
const stats: { value: string; label: string; height: string; art?: ArtName; dark?: boolean }[] = [
  { value: "140+", label: "Projects launched", height: "sm:mt-32 min-h-40" },
  { value: "96%", label: "On time and on budget", height: "min-h-72", art: "night", dark: true },
  { value: "60+", label: "Brands across Europe", height: "sm:mt-24 min-h-48" },
  { value: "12 years", label: "Of doing this together", height: "sm:mt-10 min-h-60", art: "dusk" },
]

export function AgencyLandingStats() {
  return (
    <section aria-labelledby="stats-title" className="pb-20 sm:pb-28">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <AgencyLandingEyebrow>In numbers</AgencyLandingEyebrow>
        <h2 id="stats-title" className="mt-6 text-3xl font-medium tracking-tight text-balance sm:text-5xl">
          Twelve years of shipping, by the numbers
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-pretty text-muted-foreground">
          Every figure here is a real client, a real launch and a team that trusted us with it.
        </p>
        <AgencyLandingButton href="#projects" className="mt-8">
          See the projects
        </AgencyLandingButton>
      </div>

      <dl className="mx-auto mt-14 grid max-w-6xl grid-cols-2 items-start gap-3 px-4 sm:grid-cols-4 sm:px-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={cn(
              "relative isolate flex flex-col justify-between overflow-hidden rounded-md p-5",
              stat.height,
              stat.art ? (stat.dark ? "text-white" : "text-foreground dark:text-neutral-950") : "border bg-agency-card",
            )}
          >
            {stat.art ? <AgencyLandingArt name={stat.art} className="absolute inset-0 -z-10" /> : null}
            <dd className="text-3xl font-medium tracking-tight">{stat.value}</dd>
            <dt className={cn("mt-8 self-end text-right text-sm", stat.art ? (stat.dark ? "text-white/80" : "") : "text-muted-foreground")}>
              {stat.label}
            </dt>
          </div>
        ))}
      </dl>
    </section>
  )
}
