import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"

import { AgencyLandingButton, AgencyLandingEyebrow } from "./agency-landing-button"
import { portrait } from "./agency-landing-media"
import { Reveal, RevealItem, RevealList } from "./agency-landing-motion"

/** The people who lead projects. Swap in your own team and photos. */
const people = [
  {
    name: "Mateo Silva",
    role: "Founder and creative director",
    photo: "1507003211169-0a1dd7228f2d",
    offset: "lg:mt-10",
  },
  {
    name: "Hana Sato",
    role: "Brand strategist",
    photo: "1573496359142-b8d87734a5a2",
    offset: "lg:mt-28",
  },
  {
    name: "Leo Martins",
    role: "Product designer",
    photo: "1506794778202-cad84cf45f1d",
    offset: "lg:mt-0",
  },
  {
    name: "Amara Diallo",
    role: "Lead developer",
    photo: "1580489944761-15a19d654956",
    offset: "lg:mt-32",
  },
  {
    name: "Nina Petrova",
    role: "Growth lead",
    photo: "1494790108377-be9c29b29330",
    offset: "lg:mt-16",
  },
]

export function AgencyLandingTeam() {
  return (
    <section id="team" aria-labelledby="team-title" className="scroll-mt-24 py-20 sm:py-28">
      <Reveal className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <AgencyLandingEyebrow>Team</AgencyLandingEyebrow>
        <h2 id="team-title" className="mt-6 text-3xl font-medium tracking-tight text-balance sm:text-5xl">
          The people you&apos;ll actually work with
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-pretty text-muted-foreground">
          No account managers in between. The person on your first call is on your project until it ships.
        </p>
        <AgencyLandingButton href="#contact" variant="secondary" className="mt-8">
          Work with us
        </AgencyLandingButton>
      </Reveal>

      <RevealList className="mx-auto mt-14 grid max-w-6xl grid-cols-2 items-start gap-3 px-4 sm:grid-cols-3 sm:px-6 lg:grid-cols-5">
        {people.map((person) => (
          <RevealItem key={person.name} className={person.offset}>
            <div
              data-touch=""
              className="group rounded-md bg-agency-card p-2 shadow-[0_18px_40px_-24px_rgb(0_0_0/0.35)] transition-[translate,rotate,box-shadow] duration-500 hover:-translate-y-2 hover:-rotate-1 hover:shadow-[0_28px_50px_-24px_rgb(0_0_0/0.45)] data-active:-translate-y-2 data-active:-rotate-1 data-active:shadow-[0_28px_50px_-24px_rgb(0_0_0/0.45)]"
            >
              <div className="overflow-hidden rounded-sm">
                <img
                  src={portrait(person.photo, 480)}
                  alt=""
                  width={480}
                  height={480}
                  loading="lazy"
                  className="aspect-[5/6] w-full bg-muted object-cover grayscale-[35%] transition-[scale,filter] duration-700 group-hover:scale-105 group-data-active:scale-105 group-hover:grayscale-0 group-data-active:grayscale-0"
                />
              </div>
              <div className="flex items-start justify-between gap-2 px-1.5 pt-3 pb-1">
                <div>
                  <p className="font-medium">{person.name}</p>
                  <p className="text-xs text-muted-foreground">{person.role}</p>
                </div>
                <a
                  href="#"
                  aria-label={`${person.name}'s profile`}
                  className={cn(
                    "grid size-7 shrink-0 place-items-center rounded-full bg-agency-surface text-muted-foreground transition-colors outline-none",
                    "group-hover:bg-agency-accent group-data-active:bg-agency-accent group-hover:text-white group-data-active:text-white hover:text-foreground focus-visible:ring-3 focus-visible:ring-agency-accent/40",
                  )}
                >
                  <ArrowUpRight aria-hidden="true" className="size-3.5" />
                </a>
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealList>
    </section>
  )
}
