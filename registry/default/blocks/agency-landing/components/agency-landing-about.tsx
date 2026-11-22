import { Star } from "lucide-react"

import { AgencyLandingButton, AgencyLandingEyebrow } from "./agency-landing-button"
import { photos } from "./agency-landing-media"
import { CountUp, Reveal, RevealItem, RevealList } from "./agency-landing-motion"

const facts = [
  { value: 60, suffix: "+", label: "Brands we work with" },
  { value: 12, suffix: "", label: "Years in business" },
  { value: 18, suffix: "", label: "Design awards" },
]

export function AgencyLandingAbout() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <AgencyLandingEyebrow>About us</AgencyLandingEyebrow>
        </Reveal>
        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end">
          <Reveal>
            <h2 id="about-title" className="text-3xl leading-tight font-medium tracking-tight text-balance sm:text-5xl">
              From first sketch to launch day, one team the whole way
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="lg:text-right">
            <p className="text-sm text-pretty text-muted-foreground lg:ml-auto lg:max-w-sm">
              The people who plan your project are the ones who design it, build it and look after it afterwards. Nothing gets lost in a
              hand-off.
            </p>
            <AgencyLandingButton href="#team" variant="secondary" className="mt-6">
              Meet the team
            </AgencyLandingButton>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <RevealList as="div" className="grid grid-cols-2 gap-4">
            {facts.map((fact) => (
              <RevealItem
                as="div"
                key={fact.label}
                className="flex min-h-40 flex-col justify-between rounded-md bg-agency-card p-5 transition-shadow duration-300 hover:shadow-[0_18px_40px_-24px_rgb(0_0_0/0.35)] sm:p-6"
              >
                <CountUp value={fact.value} suffix={fact.suffix} className="text-3xl font-medium tracking-tight" />
                <p className="text-sm text-muted-foreground">{fact.label}</p>
              </RevealItem>
            ))}
            <RevealItem
              as="div"
              className="flex min-h-40 flex-col items-center justify-center gap-2 rounded-md bg-agency-card p-5 text-center sm:p-6"
            >
              <div className="flex gap-0.5 text-agency-accent" aria-hidden="true">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="size-5 fill-current" />
                ))}
              </div>
              <p className="text-2xl font-medium tracking-tight">
                <CountUp value={4.9} decimals={1} /> out of 5
              </p>
              <p className="text-sm text-muted-foreground">Average from 120 client reviews</p>
            </RevealItem>
          </RevealList>
          <Reveal delay={0.2} className="overflow-hidden rounded-md">
            <img
              src={photos.meeting.src}
              alt={photos.meeting.alt}
              width={900}
              height={1000}
              loading="lazy"
              className="aspect-[4/3] size-full bg-muted object-cover transition-transform duration-700 hover:scale-105 md:aspect-auto"
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
