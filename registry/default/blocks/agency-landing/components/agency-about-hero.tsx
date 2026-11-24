"use client"

import { MousePointer2, TrendingUp } from "lucide-react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"
import { AgencyLandingEyebrow } from "./agency-landing-button"
import { portrait } from "./agency-landing-media"
import { CountUp, Reveal, RevealWords } from "./agency-landing-motion"

import { photos } from "./agency-about-media"

/** Projects shipped per quarter, for the little bar chart. Made up. */
const quarters = [
  { label: "Q1", value: 6 },
  { label: "Q2", value: 9 },
  { label: "Q3", value: 7 },
  { label: "Q4", value: 11 },
  { label: "Q1", value: 8 },
  { label: "Q2", value: 12 },
]

const EASE = [0.22, 1, 0.36, 1] as const

/** A card that drops into the collage, then bobs gently. Decorative. */
function Floating({ className, delay, bob, children }: { className?: string; delay: number; bob: string; children: React.ReactNode }) {
  return (
    <motion.div
      className={cn("absolute", className)}
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      <div className="animate-agency-bob motion-reduce:animate-none" style={{ animationDelay: bob }}>
        {children}
      </div>
    </motion.div>
  )
}

const card = "rounded-2xl bg-agency-card p-4 shadow-[0_24px_50px_-24px_rgb(0_0_0/0.35)] ring-1 ring-border/60"

export function AgencyAboutHero() {
  const max = Math.max(...quarters.map((q) => q.value))

  return (
    <section aria-labelledby="about-hero-title" className="overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <Reveal y={16}>
          <AgencyLandingEyebrow>Who we are</AgencyLandingEyebrow>
        </Reveal>
        <h1
          id="about-hero-title"
          className="mt-8 text-[2.6rem] leading-[1.05] font-medium tracking-tight text-balance sm:text-6xl lg:text-[4.25rem]"
        >
          <RevealWords text="Small on purpose. Serious about the work." />
        </h1>
        <Reveal delay={0.45}>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-muted-foreground sm:text-lg sm:leading-8">
            Arcwell is fourteen designers and engineers in Lisbon. Since 2014 we&apos;ve helped more than sixty brands plan, design, build
            and grow the products their customers use every day.
          </p>
        </Reveal>
      </div>

      {/* The collage: a framed team photo with live cards around it. On phones the cards sit below the photo. */}
      <div className="relative mx-auto mt-16 max-w-6xl px-4 sm:mt-20 sm:px-6">
        <div className="relative mx-auto max-w-md lg:h-[34rem] lg:max-w-none">
          <motion.div
            className="relative mx-auto lg:absolute lg:top-0 lg:left-1/2 lg:w-[26rem] lg:-translate-x-1/2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.5 }}
          >
            <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 rotate-3 rounded-[2rem] bg-agency-accent" />
            <img
              src={photos.team.src}
              alt={photos.team.alt}
              width={900}
              height={1100}
              className="relative aspect-[4/5] w-full rounded-[2rem] bg-muted object-cover shadow-[0_30px_60px_-30px_rgb(0_0_0/0.5)]"
            />
          </motion.div>

          {/* On wide screens the cards float around the photo; on phones they line up underneath. */}
          <div className="mt-8 grid grid-cols-2 gap-3 lg:contents">
            <Floating className="static col-span-2 lg:absolute lg:top-16 lg:left-0" delay={0.8} bob="0s">
              <div className={cn(card, "lg:w-60")}>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium">Projects shipped</span>
                  <span className="text-muted-foreground">by quarter</span>
                </div>
                <p className="mt-1 text-2xl font-medium tracking-tight">
                  <CountUp value={53} />
                </p>
                <div aria-hidden="true" className="mt-3 flex h-24 gap-2">
                  {quarters.map((q, i) => (
                    <div key={i} className="flex h-full flex-1 flex-col items-center gap-1">
                      {/* The bar grows inside a box that fills the chart's height, so its percentage height has something to measure against. */}
                      <div className="flex w-full flex-1 items-end">
                        <motion.span
                          className="w-full rounded-t-md bg-linear-to-t from-agency-accent to-agency-accent/50"
                          initial={{ height: 0 }}
                          animate={{ height: `${(q.value / max) * 100}%` }}
                          transition={{ duration: 0.9, ease: EASE, delay: 1.1 + i * 0.08 }}
                        />
                      </div>
                      <span className="text-[10px] text-muted-foreground">{q.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Floating>

            <Floating className="static lg:absolute lg:top-[22rem] lg:left-10" delay={1} bob="-2s">
              <div className="rounded-2xl bg-neutral-950 p-4 text-white shadow-[0_24px_50px_-24px_rgb(0_0_0/0.5)] lg:w-52">
                <div className="flex -space-x-2">
                  {["1531123897727-8f129e1688ce", "1500648767791-00dcc994a43e", "1544005313-94ddf0286df2"].map((id) => (
                    <img
                      key={id}
                      src={portrait(id, 64)}
                      alt=""
                      width={28}
                      height={28}
                      className="size-7 rounded-full border-2 border-neutral-950 object-cover"
                    />
                  ))}
                </div>
                <p className="mt-3 text-sm font-medium">Clients in 14 countries</p>
                <p className="text-xs text-white/70">From Lisbon to Lagos</p>
              </div>
            </Floating>

            <Floating className="static hidden lg:absolute lg:top-2 lg:right-48 lg:block" delay={1.1} bob="-1s">
              <div className="relative">
                <MousePointer2 aria-hidden="true" className="absolute -top-3 -left-4 size-5 -rotate-12 fill-foreground text-foreground" />
                <span className="inline-flex rounded-full bg-agency-accent px-4 py-1.5 text-sm font-medium text-white">Since 2014</span>
              </div>
            </Floating>

            <Floating className="static lg:absolute lg:top-24 lg:right-24" delay={0.9} bob="-3s">
              <div className="rounded-2xl bg-neutral-950 p-4 text-white shadow-[0_24px_50px_-24px_rgb(0_0_0/0.5)] lg:w-48">
                <p className="text-xs text-white/70">On time and on budget</p>
                <p className="mt-1 text-3xl font-medium tracking-tight text-emerald-300">
                  <CountUp value={96} suffix="%" />
                </p>
              </div>
            </Floating>

            <Floating className="static col-span-2 lg:absolute lg:top-[15rem] lg:right-0" delay={1.2} bob="-1.5s">
              <div className={cn(card, "lg:w-72")}>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <TrendingUp aria-hidden="true" className="size-4 text-agency-accent" />
                  Average lift after launch
                </div>
                <p className="mt-2 text-3xl font-medium tracking-tight">
                  <CountUp value={31} prefix="+" suffix="%" />
                </p>
                <p className="text-xs text-muted-foreground">in sign-ups, across 2025 launches</p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="rounded-xl bg-agency-surface p-3">
                    <p className="text-[11px] text-muted-foreground">Repeat clients</p>
                    <p className="mt-0.5 font-medium">7 in 10</p>
                  </div>
                  <div className="rounded-xl bg-agency-surface p-3">
                    <p className="text-[11px] text-muted-foreground">Active projects</p>
                    <p className="mt-0.5 font-medium">4 at a time</p>
                  </div>
                </div>
              </div>
            </Floating>
          </div>
        </div>
      </div>
    </section>
  )
}
