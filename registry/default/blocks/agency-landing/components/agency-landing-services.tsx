import { AgencyLandingArt, type ArtName } from "./agency-landing-art"
import { AgencyLandingButton, AgencyLandingEyebrow } from "./agency-landing-button"
import { Reveal, RevealItem, RevealList } from "./agency-landing-motion"

const services: { name: string; text: string; art: ArtName }[] = [
  {
    name: "Product design",
    text: "Apps and dashboards that make the hard part of your product feel easy.",
    art: "ink",
  },
  {
    name: "Websites",
    text: "Fast sites your team can update themselves, built to be found.",
    art: "dune",
  },
  {
    name: "Brand identity",
    text: "Names, logos and visual systems that hold up everywhere they appear.",
    art: "prism",
  },
  {
    name: "Growth",
    text: "Campaigns and experiments that bring the right people back, again.",
    art: "haze",
  },
]

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
            key={service.name}
            className="group flex flex-col overflow-hidden rounded-md border bg-agency-card transition-[translate,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-28px_rgb(0_0_0/0.4)]"
          >
            <div className="p-4">
              <p className="text-xs text-muted-foreground tabular-nums">({String(i + 1).padStart(2, "0")})</p>
              <h3 className="mt-1 text-xl font-medium tracking-tight">{service.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{service.text}</p>
            </div>
            <div className="mt-auto overflow-hidden">
              <AgencyLandingArt
                name={service.art}
                className="aspect-[16/10] w-full transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-2 sm:aspect-[3/4]"
              />
            </div>
          </RevealItem>
        ))}
      </RevealList>
    </section>
  )
}
