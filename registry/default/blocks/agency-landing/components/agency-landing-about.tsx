import { Star } from "lucide-react"

import { AgencyLandingButton, AgencyLandingEyebrow } from "./agency-landing-button"
import { photos } from "./agency-landing-media"

const facts = [
  { value: "60+", label: "Brands we work with" },
  { value: "12", label: "Years in business" },
  { value: "18", label: "Design awards" },
]

export function AgencyLandingAbout() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AgencyLandingEyebrow>About us</AgencyLandingEyebrow>
        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end">
          <h2 id="about-title" className="text-3xl leading-tight font-medium tracking-tight text-balance sm:text-5xl">
            From first sketch to launch day, one team the whole way
          </h2>
          <div className="lg:text-right">
            <p className="text-sm text-pretty text-muted-foreground lg:ml-auto lg:max-w-sm">
              The people who plan your project are the ones who design it, build it and look after it afterwards. Nothing
              gets lost in a hand-off.
            </p>
            <AgencyLandingButton href="#team" variant="secondary" className="mt-6">
              Meet the team
            </AgencyLandingButton>
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="grid grid-cols-2 gap-4">
            {facts.map((fact) => (
              <div key={fact.label} className="flex min-h-40 flex-col justify-between rounded-md bg-agency-card p-5 sm:p-6">
                <p className="text-3xl font-medium tracking-tight">{fact.value}</p>
                <p className="text-sm text-muted-foreground">{fact.label}</p>
              </div>
            ))}
            <div className="flex min-h-40 flex-col items-center justify-center gap-2 rounded-md bg-agency-card p-5 text-center sm:p-6">
              <div className="flex gap-0.5 text-agency-accent" aria-hidden="true">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="size-5 fill-current" />
                ))}
              </div>
              <p className="text-2xl font-medium tracking-tight">4.9 out of 5</p>
              <p className="text-sm text-muted-foreground">Average from 120 client reviews</p>
            </div>
          </div>
          <img
            src={photos.meeting.src}
            alt={photos.meeting.alt}
            width={900}
            height={1000}
            loading="lazy"
            className="aspect-[4/3] size-full rounded-md bg-muted object-cover md:aspect-auto"
          />
        </div>
      </div>
    </section>
  )
}
