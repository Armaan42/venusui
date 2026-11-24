import { ArrowUpRight } from "lucide-react"

import { AgencyLandingEyebrow } from "./agency-landing-button"
import { portrait } from "./agency-landing-media"
import { Reveal, RevealItem, RevealList } from "./agency-landing-motion"

/** The people behind Arcwell. Made up; swap in your own team and photos. */
const people = [
  { name: "Mateo Silva", role: "Founder and creative director", photo: "1507003211169-0a1dd7228f2d", since: "2014" },
  { name: "Hana Sato", role: "Co-founder and brand strategist", photo: "1573496359142-b8d87734a5a2", since: "2014" },
  { name: "Leo Martins", role: "Product designer", photo: "1506794778202-cad84cf45f1d", since: "2017" },
  { name: "Amara Diallo", role: "Lead developer", photo: "1580489944761-15a19d654956", since: "2017" },
  { name: "Nina Petrova", role: "Growth lead", photo: "1494790108377-be9c29b29330", since: "2023" },
  { name: "Rui Costa", role: "Motion designer", photo: "1500648767791-00dcc994a43e", since: "2024" },
]

export function AgencyAboutTeam() {
  return (
    <section id="team" aria-labelledby="about-team-title" className="scroll-mt-24 bg-agency-card py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <AgencyLandingEyebrow>Our team</AgencyLandingEyebrow>
          <h2 id="about-team-title" className="mt-6 text-3xl leading-tight font-medium tracking-tight text-balance sm:text-5xl">
            The people behind Arcwell
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-muted-foreground sm:text-lg sm:leading-8">
            Designers, engineers and strategists who stay with a project from the first call to long after launch.
          </p>
        </Reveal>

        <RevealList className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {people.map((person) => (
            <RevealItem key={person.name}>
              <div className="group relative overflow-hidden rounded-3xl bg-agency-surface">
                <img
                  src={portrait(person.photo, 640)}
                  alt=""
                  width={640}
                  height={640}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover grayscale-[40%] transition-[scale,filter] duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <span className="absolute top-4 left-4 rounded-full bg-agency-card/90 px-3 py-1 text-xs font-medium backdrop-blur">
                  Since {person.since}
                </span>
              </div>
              <div className="mt-4 flex items-start justify-between gap-3 px-1">
                <div>
                  <p className="font-medium sm:text-lg">{person.name}</p>
                  <p className="text-sm text-muted-foreground">{person.role}</p>
                </div>
                <a
                  href="#"
                  aria-label={`${person.name}'s profile`}
                  className="grid size-9 shrink-0 place-items-center rounded-full bg-agency-surface text-muted-foreground transition-colors outline-none hover:bg-agency-accent hover:text-white focus-visible:ring-3 focus-visible:ring-agency-accent/40"
                >
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </a>
              </div>
            </RevealItem>
          ))}
        </RevealList>
      </div>
    </section>
  )
}
