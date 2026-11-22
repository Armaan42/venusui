import { cn } from "@/lib/utils"

import { AgencyLandingButton, AgencyLandingEyebrow } from "./agency-landing-button"

/** Made-up clients and the result of their project. Cards without a result just show the name. */
const results: { client: string; style: string; value?: string; label?: string }[] = [
  { client: "Tidewell", style: "font-semibold tracking-tight", value: "3×", label: "more pre-orders" },
  { client: "Halden", style: "font-serif italic" },
  { client: "COPPERLEAF", style: "text-sm font-medium tracking-[0.2em]", value: "1.2M", label: "app installs" },
  { client: "Kiln Corner", style: "font-serif font-semibold" },
  { client: "Paperkite", style: "font-medium", value: "41%", label: "fewer support emails" },
  { client: "Kestrel", style: "font-semibold uppercase tracking-wide", value: "28%", label: "faster checkout" },
  { client: "oakline", style: "font-bold tracking-tighter" },
  { client: "Brightwater", style: "font-light tracking-wide" },
]

export function AgencyLandingResults() {
  return (
    <section aria-labelledby="results-title" className="pb-20 sm:pb-28">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
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
      </div>

      <ul className="mx-auto mt-14 grid max-w-6xl grid-flow-dense grid-cols-2 gap-3 px-4 sm:px-6 lg:grid-cols-4">
        {results.map((item) => (
          <li
            key={item.client}
            className={cn(
              "flex rounded-md bg-agency-card p-5 text-xl",
              item.value ? "row-span-2 min-h-56 flex-col justify-between" : "min-h-26 items-center justify-center",
            )}
          >
            <span className={item.style}>{item.client}</span>
            {item.value ? (
              <span className="text-left">
                <span className="block text-3xl font-medium tracking-tight">{item.value}</span>
                <span className="text-sm text-muted-foreground">{item.label}</span>
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  )
}
