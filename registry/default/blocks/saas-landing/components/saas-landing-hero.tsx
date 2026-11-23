import { ArrowRight, Check, Star } from "lucide-react"

import { Button } from "@/components/ui/button"

import { SaasLandingDashboard } from "./saas-landing-dashboard"
import { heroAvatars, portrait } from "./saas-landing-media"
import { HeroScreen, Reveal } from "./saas-landing-motion"

/** Where the falling light beams run, and how fast. Purely decorative. */
const beams = [
  { left: "8%", duration: "7s", delay: "-1s" },
  { left: "19%", duration: "9s", delay: "-6s" },
  { left: "31%", duration: "6.5s", delay: "-3s" },
  { left: "44%", duration: "10s", delay: "-8s" },
  { left: "57%", duration: "7.5s", delay: "-2s" },
  { left: "69%", duration: "8.5s", delay: "-5s" },
  { left: "81%", duration: "6s", delay: "-4s" },
  { left: "92%", duration: "9.5s", delay: "-7s" },
]

/**
 * A permanently dark hero. The `dark` class switches the colour tokens inside
 * it to their dark values whatever the page's theme is, so it reads the same
 * in light and dark mode. It slides up under the transparent navbar.
 */
export function SaasLandingHero() {
  return (
    <section className="dark relative isolate -mt-18 overflow-hidden bg-[#06070f] pt-18 text-foreground">
      {/* Glowing grid, fading out from the top centre. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(255_255_255/0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.07)_1px,transparent_1px)] bg-size-[64px_64px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black_10%,transparent_75%)]"
      />
      {/* A soft spotlight cone from the top, and a wash of brand colour. */}
      <div
        aria-hidden="true"
        className="absolute -top-24 left-1/2 -z-10 h-[46rem] w-[70rem] -translate-x-1/2 bg-[conic-gradient(from_180deg_at_50%_0%,transparent_38%,color-mix(in_oklab,var(--saas-primary)_35%,transparent)_50%,transparent_62%)] opacity-70 blur-2xl"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[40rem] bg-[radial-gradient(55%_45%_at_50%_0%,color-mix(in_oklab,var(--saas-primary)_30%,transparent),transparent)]"
      />
      {/* Thin beams of light falling down the grid lines. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black_30%,transparent_75%)]">
        {beams.map((beam) => (
          <span key={beam.left} className="absolute top-0 h-full w-px overflow-hidden" style={{ left: beam.left }}>
            <span
              className="absolute -top-48 h-48 w-px animate-saas-beam bg-linear-to-b from-transparent via-violet-300/80 to-transparent motion-reduce:hidden motion-reduce:animate-none"
              style={{ animationDuration: beam.duration, animationDelay: beam.delay }}
            />
          </span>
        ))}
      </div>
      {/* The glow the dashboard rises out of; it breathes slowly. */}
      <div
        aria-hidden="true"
        className="absolute top-[34rem] left-1/2 -z-10 h-[32rem] w-[64rem] -translate-x-1/2 animate-saas-glow rounded-full bg-saas-primary/40 blur-[120px] motion-reduce:animate-none sm:top-[38rem]"
      />

      <div className="mx-auto max-w-7xl px-6 pt-16 text-center sm:pt-28 lg:px-8">
        <Reveal y={16}>
          <a
            href="#features"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-1 pr-3 pl-1 text-sm backdrop-blur outline-none hover:bg-white/10 focus-visible:ring-3 focus-visible:ring-white/30"
          >
            <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-medium text-neutral-950">New</span>
            <span className="text-neutral-300">AI Insights explains every drop-off</span>
            <ArrowRight aria-hidden="true" className="size-3.5 text-neutral-400 transition-transform group-hover:translate-x-0.5" />
          </a>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="mx-auto mt-10 max-w-5xl text-5xl leading-[1.02] font-semibold tracking-tight text-balance text-white sm:text-7xl lg:text-[5.5rem]">
            Know exactly why users stay, and why they leave.
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-pretty text-neutral-300 sm:text-xl sm:leading-9">
            Pulsewise turns raw product events into funnels, retention cohorts and session replays your whole team can read. Set it up in
            ten minutes. No SQL required.
          </p>
        </Reveal>

        <Reveal delay={0.24} className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            size="lg"
            className="h-12 w-full rounded-full bg-white px-7 text-base text-neutral-950 shadow-[0_0_40px_-8px_rgb(167_139_250/0.8)] hover:bg-white/90 sm:w-auto"
            asChild
          >
            <a href="#pricing">
              Start your 14-day trial
              <ArrowRight aria-hidden="true" />
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 w-full rounded-full border-white/15 bg-white/5 px-7 text-base text-white hover:bg-white/10 hover:text-white sm:w-auto"
            asChild
          >
            <a href="#">Book a demo</a>
          </Button>
        </Reveal>

        <Reveal delay={0.32} className="mt-8 flex flex-col items-center gap-8">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-neutral-300">
            {["No credit card required", "SOC 2 Type II", "GDPR ready"].map((item) => (
              <li key={item} className="inline-flex items-center gap-1.5">
                <Check aria-hidden="true" className="size-4 text-emerald-400" />
                {item}
              </li>
            ))}
          </ul>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <div className="flex -space-x-2.5">
              {heroAvatars.map((id) => (
                <img
                  key={id}
                  src={portrait(id, 88)}
                  alt=""
                  width={40}
                  height={40}
                  className="size-10 rounded-full border-2 border-[#06070f] object-cover"
                />
              ))}
            </div>
            <div className="text-left text-sm">
              <div className="flex items-center gap-0.5 text-amber-400" aria-hidden="true">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <p className="text-neutral-300">
                <span className="font-medium text-white">4.9 out of 5</span> from 2,400+ product teams
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="relative mx-auto mt-20 max-w-7xl px-4 pb-24 sm:mt-28 sm:px-6 sm:pb-32 lg:px-8">
        <HeroScreen>
          {/* A glowing edge around the product screen. */}
          <div className="rounded-2xl bg-linear-to-b from-violet-300/40 via-white/10 to-transparent p-px shadow-[0_0_120px_-20px_color-mix(in_oklab,var(--saas-primary)_70%,transparent)]">
            <div className="rounded-2xl bg-[#0b0c16]/80 p-1.5 backdrop-blur sm:p-2">
              <SaasLandingDashboard onDark className="rounded-xl shadow-none" />
            </div>
          </div>
        </HeroScreen>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-linear-to-t from-[#06070f] via-[#06070f]/80 to-transparent"
        />
      </div>
    </section>
  )
}
