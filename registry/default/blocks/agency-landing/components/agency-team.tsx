"use client"

import * as React from "react"
import { ArrowUpRight, CheckCircle2, ChevronDown, Mail, Star, ThumbsUp, Users } from "lucide-react"

import { cn } from "@/lib/utils"

import { AgencyLandingEyebrow } from "./agency-landing-button"
import { portrait } from "./agency-landing-media"
import { CountUp, Reveal, RevealItem, RevealList } from "./agency-landing-motion"
import { AgencyPageHeader } from "./agency-page-header"
import { AgencyShell } from "./agency-shell"

/** The whole studio. Made up; swap in your own people and photos. */
const people = [
  { name: "Mateo Silva", role: "Founder, creative director", photo: "1507003211169-0a1dd7228f2d" },
  { name: "Hana Sato", role: "Co-founder, brand strategy", photo: "1573496359142-b8d87734a5a2" },
  { name: "Leo Martins", role: "Product designer", photo: "1506794778202-cad84cf45f1d" },
  { name: "Amara Diallo", role: "Lead developer", photo: "1580489944761-15a19d654956" },
  { name: "Nina Petrova", role: "Growth lead", photo: "1494790108377-be9c29b29330" },
  { name: "Rui Costa", role: "Motion designer", photo: "1500648767791-00dcc994a43e" },
  { name: "Sofia Almeida", role: "UX researcher", photo: "1438761681033-6461ffad8d80" },
  { name: "Daniel Okoro", role: "Front-end developer", photo: "1560250097-0b93528c311a" },
  { name: "Ines Varga", role: "Content strategist", photo: "1544005313-94ddf0286df2" },
]

const figures = [
  { icon: CheckCircle2, value: 140, suffix: "+", label: "Projects launched", tone: "bg-amber-300" },
  { icon: Users, value: 14, suffix: "", label: "People in the studio", tone: "bg-sky-300" },
  { icon: ThumbsUp, value: 60, suffix: "+", label: "Brands we work with", tone: "bg-rose-300" },
]

const ratings = [
  { score: "4.9", label: "Overall", note: "From 120 client reviews" },
  { score: "5.0", label: "Communication", note: "Weekly calls, shared channel" },
  { score: "4.8", label: "Design quality", note: "Across 2025 projects" },
  { score: "4.9", label: "On-time delivery", note: "96% on schedule" },
  { score: "4.7", label: "Value", note: "Fixed quotes per phase" },
]

const faqs = [
  {
    q: "Who will I actually work with?",
    a: "The people on this page. Your first call is with the designer and developer who'll lead your project, and they stay on it until launch.",
  },
  {
    q: "How big is a typical project team?",
    a: "Three to five people: usually a designer, one or two developers and a strategist, with motion and research when the work needs it.",
  },
  {
    q: "Do you work with in-house teams?",
    a: "Often. We join your channel, use your tools and hand over a design system and code your team can own.",
  },
  { q: "Are you hiring?", a: "Now and then. We post roles on our careers page and read every portfolio we're sent." },
]

function Stars() {
  return (
    <span className="flex gap-0.5 text-amber-300" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className="size-4 fill-current" />
      ))}
    </span>
  )
}

/** The whole team, the studio in numbers, client ratings and team questions. Render it from `app/team/page.tsx`. */
export function AgencyTeam() {
  const [open, setOpen] = React.useState(0)

  return (
    <AgencyShell page="team">
      <section aria-labelledby="team-page-title" className="pb-20 sm:pb-28">
        <AgencyPageHeader
          id="team-page-title"
          eyebrow="Our team"
          title="The people"
          muted="behind Arcwell"
          lead="Designers, engineers and strategists who work together on every project, from the first sketch to long after launch."
        />
        <RevealList className="mx-auto mt-16 grid max-w-6xl grid-cols-2 gap-4 px-4 sm:gap-6 sm:px-6 lg:grid-cols-3">
          {people.map((person) => (
            <RevealItem key={person.name}>
              <div
                data-touch=""
                tabIndex={0}
                className="group relative overflow-hidden rounded-3xl bg-agency-card p-2 ring-1 ring-border/60 outline-none focus-visible:ring-3 focus-visible:ring-agency-accent/40"
              >
                <img
                  src={portrait(person.photo, 600)}
                  alt=""
                  width={600}
                  height={600}
                  loading="lazy"
                  className="aspect-[4/5] w-full rounded-2xl object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-focus-within:scale-105 group-data-active:scale-105"
                />
                {/* The name card slides up on hover, focus, or when the card reaches the middle of a phone screen. */}
                <div className="absolute inset-x-4 bottom-4 translate-y-[calc(100%+1.5rem)] rounded-2xl bg-agency-card/95 p-4 text-center shadow-lg backdrop-blur transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-focus-within:translate-y-0 group-data-active:translate-y-0 motion-reduce:transition-none">
                  <p className="font-medium">{person.name}</p>
                  <p className="text-xs text-muted-foreground">{person.role}</p>
                  <div className="mt-3 flex justify-center gap-2">
                    <a
                      href="#"
                      aria-label={`Email ${person.name}`}
                      className="grid size-8 place-items-center rounded-full bg-agency-surface text-muted-foreground outline-none hover:bg-agency-accent hover:text-white focus-visible:ring-3 focus-visible:ring-agency-accent/40"
                    >
                      <Mail aria-hidden="true" className="size-3.5" />
                    </a>
                    <a
                      href="#"
                      aria-label={`${person.name}'s profile`}
                      className="grid size-8 place-items-center rounded-full bg-agency-surface text-muted-foreground outline-none hover:bg-agency-accent hover:text-white focus-visible:ring-3 focus-visible:ring-agency-accent/40"
                    >
                      <ArrowUpRight aria-hidden="true" className="size-3.5" />
                    </a>
                  </div>
                </div>
              </div>
              {/* Always visible below the photo too, so nobody has to hover to read a name. */}
              <p className="mt-3 px-1 text-sm font-medium sm:hidden">{person.name}</p>
            </RevealItem>
          ))}
        </RevealList>
      </section>

      <section aria-labelledby="decade-title" className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 id="decade-title" className="text-3xl font-medium tracking-tight text-balance sm:text-5xl">
              Twelve years of building brands and products
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Since 2014 we&apos;ve helped startups and established companies launch websites, apps and brands that keep growing.
            </p>
          </Reveal>
          <Reveal className="mt-12">
            <ul className="grid overflow-hidden rounded-3xl bg-neutral-950 text-white sm:grid-cols-3">
              {figures.map((figure, i) => (
                <li
                  key={figure.label}
                  className={cn(
                    "flex flex-col items-center gap-4 p-8 text-center",
                    i > 0 && "border-t border-white/10 sm:border-t-0 sm:border-l",
                  )}
                >
                  <span className={cn("grid size-12 place-items-center rounded-full text-neutral-950", figure.tone)}>
                    <figure.icon aria-hidden="true" className="size-5" />
                  </span>
                  <p className="text-4xl font-medium tracking-tight">
                    <CountUp value={figure.value} suffix={figure.suffix} />
                  </p>
                  <p className="-mt-2 text-sm text-white/75">{figure.label}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="ratings-title" className="bg-agency-card py-20 sm:py-28">
        <Reveal className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <AgencyLandingEyebrow>Reviews</AgencyLandingEyebrow>
          <h2 id="ratings-title" className="mt-6 text-3xl font-medium tracking-tight text-balance sm:text-5xl">
            What clients say about <span className="text-agency-accent dark:text-violet-300">working with us</span>
          </h2>
        </Reveal>
        <div className="relative mt-14 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <ul className="flex w-max animate-agency-marquee gap-5 hover:[animation-play-state:paused] motion-reduce:animate-none">
            {[...ratings, ...ratings].map((rating, i) => (
              <li
                key={`${rating.label}-${i}`}
                aria-hidden={i >= ratings.length || undefined}
                className="relative isolate w-64 shrink-0 overflow-hidden rounded-3xl bg-neutral-950 p-6 text-white"
              >
                <span
                  aria-hidden="true"
                  className="absolute -top-10 -left-10 -z-10 size-40 rounded-full bg-[conic-gradient(from_90deg,#f472b6,#fbbf24,#a78bfa,#f472b6)] opacity-60 blur-2xl"
                />
                <p className="text-5xl font-medium tracking-tight">{rating.score}</p>
                <div className="mt-3">
                  <Stars />
                </div>
                <p className="mt-4 font-medium">{rating.label}</p>
                <p className="text-sm text-white/70">{rating.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="team-faq-title" className="py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <Reveal>
              <AgencyLandingEyebrow align="start">FAQ</AgencyLandingEyebrow>
              <h2 id="team-faq-title" className="mt-6 text-3xl leading-tight font-medium tracking-tight text-balance sm:text-5xl">
                Questions about working with us
              </h2>
            </Reveal>
            <RevealList as="div" className="mt-8 divide-y border-y">
              {faqs.map((faq, i) => (
                <RevealItem as="div" key={faq.q}>
                  <h3>
                    <button
                      type="button"
                      aria-expanded={open === i}
                      aria-controls={`team-faq-${i}`}
                      onClick={() => setOpen(open === i ? -1 : i)}
                      className="flex w-full items-center justify-between gap-6 py-5 text-left font-medium outline-none hover:text-agency-accent focus-visible:ring-3 focus-visible:ring-agency-accent/40"
                    >
                      {faq.q}
                      <ChevronDown
                        aria-hidden="true"
                        className={cn("size-4 shrink-0 transition-transform duration-300", open === i && "rotate-180")}
                      />
                    </button>
                  </h3>
                  <div
                    id={`team-faq-${i}`}
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none",
                      open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <p className="overflow-hidden text-sm leading-6 text-muted-foreground" hidden={open !== i}>
                      <span className="block pb-5">{faq.a}</span>
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealList>
          </div>
          <Reveal delay={0.1} className="relative mx-auto w-full max-w-md">
            <div aria-hidden="true" className="absolute inset-x-6 bottom-0 top-16 rounded-[2rem] bg-agency-accent" />
            <img
              src={portrait("1507003211169-0a1dd7228f2d", 900)}
              alt="Mateo Silva, Arcwell's founder"
              width={900}
              height={900}
              loading="lazy"
              className="relative aspect-square w-full rounded-[2rem] object-cover [mask-image:linear-gradient(to_bottom,black_80%,transparent)]"
            />
            <div className="absolute top-24 -left-4 -rotate-6 rounded-2xl bg-neutral-950 p-4 text-white shadow-[0_24px_50px_-20px_rgb(0_0_0/0.6)] sm:-left-10">
              <p className="text-xs text-white/70">Projects this year</p>
              <p className="text-2xl font-medium tracking-tight">
                <CountUp value={53} />
              </p>
              <span className="mt-2 inline-block rounded-full bg-amber-300 px-3 py-1 text-xs font-semibold text-neutral-950">On track</span>
            </div>
          </Reveal>
        </div>
      </section>
    </AgencyShell>
  )
}
