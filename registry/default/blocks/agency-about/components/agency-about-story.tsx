"use client"

import { motion } from "motion/react"

import { AgencyLandingEyebrow } from "@/registry/default/blocks/agency-landing/components/agency-landing-button"
import { Reveal, RevealItem, RevealList } from "@/registry/default/blocks/agency-landing/components/agency-landing-motion"

/** The studio's story so far. Made up; replace with your own milestones. */
const milestones = [
  { year: "2014", title: "A spare room in Lisbon", text: "Mateo and Hana start Arcwell with one client and two borrowed laptops." },
  {
    year: "2017",
    title: "Design meets engineering",
    text: "Leo and Amara join, and every project gets designers and engineers from day one.",
  },
  {
    year: "2020",
    title: "The old print shop",
    text: "We move into a former print shop by the river. The presses are gone; the light stayed.",
  },
  { year: "2023", title: "Growth as a service", text: "Clients kept asking what came after launch, so we built a team to answer." },
  {
    year: "2026",
    title: "Fourteen people, sixty brands",
    text: "Still four projects at a time, still the same people from first call to launch.",
  },
]

export function AgencyAboutStory() {
  return (
    <section aria-labelledby="story-title" className="bg-agency-card py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <AgencyLandingEyebrow align="start">Our story</AgencyLandingEyebrow>
          <h2 id="story-title" className="mt-6 text-3xl leading-tight font-medium tracking-tight text-balance sm:text-5xl">
            Twelve years, one room at a time
          </h2>
        </Reveal>

        <div className="relative mt-16">
          {/* The line the milestones hang from draws itself in as the section appears. */}
          <motion.span
            aria-hidden="true"
            className="absolute top-[0.6rem] left-[0.55rem] hidden h-px origin-left bg-border lg:block lg:right-0"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.span
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-[0.55rem] w-px origin-top bg-border lg:hidden"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
          <RevealList as="ol" className="relative grid gap-10 lg:grid-cols-5 lg:gap-8">
            {milestones.map((item, i) => (
              <RevealItem key={item.year} className="relative pl-10 lg:pt-10 lg:pl-0">
                <span
                  aria-hidden="true"
                  className={
                    i === milestones.length - 1
                      ? "absolute top-0 left-0 grid size-5 place-items-center rounded-full bg-agency-accent ring-4 ring-agency-accent/20"
                      : "absolute top-0 left-0 size-5 rounded-full border-2 border-agency-accent bg-agency-card"
                  }
                />
                <p className="text-sm font-medium text-agency-accent tabular-nums dark:text-violet-300">{item.year}</p>
                <h3 className="mt-2 text-lg font-medium">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
              </RevealItem>
            ))}
          </RevealList>
        </div>
      </div>
    </section>
  )
}
