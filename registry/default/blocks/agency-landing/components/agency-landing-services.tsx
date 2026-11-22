import { ArrowRight } from "lucide-react"

import { AgencyLandingArt, type ArtName } from "./agency-landing-art"
import { AgencyLandingButton, AgencyLandingEyebrow } from "./agency-landing-button"
import { Reveal, RevealItem, RevealList } from "./agency-landing-motion"

const services: { name: string; text: string; art: ArtName; includes: string[] }[] = [
  {
    name: "Product design",
    text: "Apps and dashboards that make the hard part of your product feel easy.",
    art: "ink",
    includes: ["User research and interviews", "Wireframes and prototypes", "Interface design", "Design systems", "Usability testing"],
  },
  {
    name: "Websites",
    text: "Fast sites your team can update themselves, built to be found.",
    art: "dune",
    includes: [
      "Design and copywriting",
      "Next.js development",
      "A content editor for your team",
      "Search and performance",
      "Accessibility checks",
    ],
  },
  {
    name: "Brand identity",
    text: "Names, logos and visual systems that hold up everywhere they appear.",
    art: "prism",
    includes: ["Naming and positioning", "Logo and type", "Colour and imagery", "Brand guidelines", "Launch assets"],
  },
  {
    name: "Growth",
    text: "Campaigns and experiments that bring the right people back, again.",
    art: "haze",
    includes: ["Launch campaigns", "Landing pages and tests", "Email and lifecycle", "Analytics set-up", "Monthly reporting"],
  },
]

/**
 * Each card shows its artwork until it's hovered or focused (or tapped on a
 * phone); then the artwork slides away and the list of what's included comes
 * in, with a link to the service. The list is always available to screen
 * readers, and tabbing to the link opens the card too.
 */
export function AgencyLandingServices() {
  return (
    <section id="services" aria-labelledby="services-title" className="scroll-mt-24 bg-agency-card py-20 sm:py-28">
      <Reveal className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <AgencyLandingEyebrow>Services</AgencyLandingEyebrow>
        <h2 id="services-title" className="mt-6 text-3xl font-medium tracking-tight text-balance sm:text-5xl">
          Everything a growing brand needs, under one roof
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-pretty text-muted-foreground">
          Pick one service or all four. Either way you work with one team, one plan and one point of contact.
        </p>
        <AgencyLandingButton href="#contact" className="mt-8">
          Start a project
        </AgencyLandingButton>
      </Reveal>

      <RevealList className="mx-auto mt-14 grid max-w-7xl gap-3 px-3 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, i) => (
          <RevealItem
            touch
            key={service.name}
            className="group flex flex-col overflow-hidden rounded-md border bg-agency-card transition-[border-color,box-shadow] duration-500 focus-within:border-agency-accent/30 hover:border-agency-accent/30 hover:shadow-[0_24px_48px_-28px_rgb(0_0_0/0.4)] data-active:border-agency-accent/30 data-active:shadow-[0_24px_48px_-28px_rgb(0_0_0/0.4)]"
          >
            <div className="p-4">
              <p className="text-xs text-muted-foreground tabular-nums">({String(i + 1).padStart(2, "0")})</p>
              <h3 className="mt-1 text-xl font-medium tracking-tight">{service.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{service.text}</p>
            </div>

            <div className="relative mt-auto aspect-[16/10] overflow-hidden sm:aspect-[3/4]">
              {/* The artwork slides down and fades as the card opens. */}
              <AgencyLandingArt
                name={service.art}
                className="absolute inset-0 transition-[translate,opacity,scale] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-focus-within:translate-y-1/3 group-focus-within:scale-105 group-focus-within:opacity-0 group-hover:translate-y-1/3 group-data-active:translate-y-1/3 group-hover:scale-105 group-data-active:scale-105 group-hover:opacity-0 group-data-active:opacity-0 motion-reduce:group-focus-within:translate-y-0 motion-reduce:group-focus-within:scale-100 motion-reduce:group-hover:translate-y-0 motion-reduce:group-data-active:translate-y-0 motion-reduce:group-hover:scale-100 motion-reduce:group-data-active:scale-100"
              />

              {/* What's included, and a link to the service. */}
              <div
                data-hover-panel
                className="pointer-events-none absolute inset-0 flex flex-col justify-between px-4 pt-2 pb-4 opacity-0 transition-opacity duration-500 group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-hover:pointer-events-auto group-data-active:pointer-events-auto group-hover:opacity-100 group-data-active:opacity-100"
              >
                <ul className="grid gap-2.5 text-sm">
                  {service.includes.map((item, n) => (
                    <li
                      key={item}
                      className="flex translate-y-3 items-center gap-2.5 opacity-0 transition-[translate,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-data-active:translate-y-0 group-hover:opacity-100 group-data-active:opacity-100"
                      style={{ transitionDelay: `${120 + n * 60}ms` }}
                    >
                      <ArrowRight aria-hidden="true" className="size-3.5 shrink-0 text-agency-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  aria-label={`Explore ${service.name}`}
                  className="group/link flex translate-y-3 items-center justify-between border-t pt-4 text-sm font-medium opacity-0 transition-[translate,opacity,color] delay-300 duration-500 outline-none group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-data-active:translate-y-0 group-hover:opacity-100 group-data-active:opacity-100 hover:text-agency-accent focus-visible:text-agency-accent focus-visible:ring-3 focus-visible:ring-agency-accent/40"
                >
                  Explore service
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 text-agency-accent transition-transform group-hover/link:translate-x-1"
                  />
                </a>
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealList>
    </section>
  )
}
