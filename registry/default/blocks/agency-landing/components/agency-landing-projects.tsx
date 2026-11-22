import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"

import { AgencyLandingArt, type ArtName } from "./agency-landing-art"
import { AgencyLandingButton, AgencyLandingEyebrow } from "./agency-landing-button"
import { Reveal, RevealItem, RevealList } from "./agency-landing-motion"

/** Made-up client projects in three staggered columns. */
const columns: {
  name: string
  about: string
  art: ArtName
  height: string
}[][] = [
  [
    {
      name: "Tidewell",
      about: "Launch site for wireless headphones",
      art: "aurora",
      height: "h-56",
    },
    {
      name: "Kiln Corner",
      about: "Order-ahead app for a busy café",
      art: "rose",
      height: "h-80",
    },
  ],
  [
    {
      name: "Halden",
      about: "Booking for twelve island villas",
      art: "prism",
      height: "h-80",
    },
    {
      name: "Paperkite",
      about: "Brand and shop for a stationery maker",
      art: "dune",
      height: "h-44",
    },
  ],
  [
    {
      name: "Brightwater",
      about: "Account app for a family bank",
      art: "haze",
      height: "h-44",
    },
    {
      name: "Oakline",
      about: "Portfolio for an architecture firm",
      art: "silk",
      height: "h-56",
    },
  ],
]

export function AgencyLandingProjects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="scroll-mt-24 py-20 sm:py-28">
      <Reveal className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <AgencyLandingEyebrow>Projects</AgencyLandingEyebrow>
        <h2 id="projects-title" className="mt-6 text-3xl font-medium tracking-tight text-balance sm:text-5xl">
          Work we&apos;re proud to show
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-pretty text-muted-foreground">
          A few recent projects. Each one started with a short call and a problem the client couldn&apos;t stop thinking about.
        </p>
        <AgencyLandingButton href="#contact" variant="secondary" className="mt-8">
          Ask for case studies
        </AgencyLandingButton>
      </Reveal>

      <div className="mx-auto mt-14 grid max-w-5xl gap-3 px-4 sm:grid-cols-3 sm:px-6">
        {columns.map((column, c) => (
          <RevealList key={c} className="grid content-start gap-3">
            {column.map((project) => (
              <RevealItem key={project.name}>
                <a
                  href="#"
                  className={cn(
                    "group relative isolate flex items-end overflow-hidden rounded-md p-4 text-white outline-none focus-visible:ring-3 focus-visible:ring-agency-accent/40",
                    project.height,
                  )}
                >
                  <AgencyLandingArt
                    name={project.art}
                    className="absolute inset-0 -z-10 transition-transform duration-1000 ease-out group-hover:scale-110"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 bg-linear-to-t from-black/75 via-black/15 to-transparent transition-opacity duration-500 group-hover:opacity-90"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute top-3 right-3 grid size-9 scale-75 place-items-center rounded-full bg-white text-neutral-900 opacity-0 transition-[opacity,scale] duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
                  >
                    <ArrowUpRight className="size-4" />
                  </span>
                  <span className="flex w-full items-end justify-between gap-4 transition-transform duration-500 group-hover:-translate-y-1">
                    <span className="text-lg leading-tight font-medium">{project.name}</span>
                    <span className="max-w-[60%] text-right text-xs text-white/85">{project.about}</span>
                  </span>
                </a>
              </RevealItem>
            ))}
          </RevealList>
        ))}
      </div>
    </section>
  )
}
