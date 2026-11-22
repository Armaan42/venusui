import { cn } from "@/lib/utils"

import { AgencyLandingButton, AgencyLandingEyebrow } from "./agency-landing-button"
import { CountUp, Reveal, RevealItem, RevealList } from "./agency-landing-motion"

type Result = {
  client: string
  style: string
  /** The figure, counted up when it scrolls into view. */
  value?: number
  decimals?: number
  suffix?: string
  label?: string
}

/** Made-up clients and the result of their project. Cards without a result just show the name. */
const results: Result[] = [
  {
    client: "Tidewell",
    style: "font-semibold tracking-tight",
    value: 3,
    suffix: "×",
    label: "more pre-orders",
  },
  { client: "Halden", style: "font-serif italic" },
  {
    client: "COPPERLEAF",
    style: "text-sm font-medium tracking-[0.2em]",
    value: 1.2,
    decimals: 1,
    suffix: "M",
    label: "app installs",
  },
  { client: "Kiln Corner", style: "font-serif font-semibold" },
  {
    client: "Paperkite",
    style: "font-medium",
    value: 41,
    suffix: "%",
    label: "fewer support emails",
  },
  {
    client: "Kestrel",
    style: "font-semibold uppercase tracking-wide",
    value: 28,
    suffix: "%",
    label: "faster checkout",
  },
  { client: "oakline", style: "font-bold tracking-tighter" },
  { client: "Brightwater", style: "font-light tracking-wide" },
]

export function AgencyLandingResults() {
  return (
    <section aria-labelledby="results-title" className="pb-20 sm:pb-28">
      <Reveal className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <AgencyLandingEyebrow>Results</AgencyLandingEyebrow>
        <h2 id="results-title" className="mt-6 text-3xl font-medium tracking-tight text-balance sm:text-5xl">
          Numbers our clients still talk about
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-pretty text-muted-foreground">
          We agree on what success looks like before we start, then measure it after launch.
        </p>
        <AgencyLandingButton href="#testimonials" className="mt-8">
          Read client reviews
        </AgencyLandingButton>
      </Reveal>

      <RevealList className="mx-auto mt-14 grid max-w-6xl grid-flow-dense grid-cols-2 gap-3 px-4 sm:px-6 lg:grid-cols-4">
        {results.map((item) => (
          <RevealItem
            key={item.client}
            className={cn(
              "flex rounded-md bg-agency-card p-5 text-xl transition-[translate,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgb(0_0_0/0.35)]",
              item.value !== undefined ? "row-span-2 min-h-56 flex-col justify-between" : "min-h-26 items-center justify-center",
            )}
          >
            <span className={item.style}>{item.client}</span>
            {item.value !== undefined ? (
              <span className="text-left">
                <CountUp
                  value={item.value}
                  decimals={item.decimals}
                  suffix={item.suffix}
                  className="block text-3xl font-medium tracking-tight"
                />
                <span className="text-sm text-muted-foreground">{item.label}</span>
              </span>
            ) : null}
          </RevealItem>
        ))}
      </RevealList>
    </section>
  )
}
