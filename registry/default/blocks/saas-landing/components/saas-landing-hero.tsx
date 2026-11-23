import { ArrowRight, Check, Star } from "lucide-react"

import { Button } from "@/components/ui/button"

import { SaasLandingDashboard } from "./saas-landing-dashboard"
import { heroAvatars, portrait } from "./saas-landing-media"
import { HeroScreen, Reveal } from "./saas-landing-motion"

export function SaasLandingHero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* A faint grid and two soft brand-colour glows behind the headline. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size-[72px_72px] opacity-50 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black_20%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/2 -z-10 h-[36rem] w-[72rem] -translate-x-1/2 rounded-full bg-saas-primary/15 blur-3xl"
      />
      <div aria-hidden="true" className="absolute top-[28rem] left-[60%] -z-10 h-80 w-[40rem] rounded-full bg-saas-accent/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 pt-20 text-center sm:pt-32 lg:px-8">
        <Reveal y={16}>
          <a
            href="#features"
            className="group inline-flex items-center gap-2 rounded-full border bg-background/80 py-1 pr-3 pl-1 text-sm shadow-sm backdrop-blur outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <span className="rounded-full bg-saas-primary px-2.5 py-0.5 text-xs font-medium text-white dark:text-neutral-950">New</span>
            <span className="text-muted-foreground">AI Insights explains every drop-off</span>
            <ArrowRight aria-hidden="true" className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </a>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="mx-auto mt-10 max-w-5xl text-5xl leading-[1.02] font-semibold tracking-tight text-balance sm:text-7xl lg:text-[5.5rem]">
            Know exactly why users stay, and why they leave.
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-pretty text-muted-foreground sm:text-xl sm:leading-9">
            Pulsewise turns raw product events into funnels, retention cohorts and session replays your whole team can read. Set it up in
            ten minutes. No SQL required.
          </p>
        </Reveal>

        <Reveal delay={0.24} className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" className="h-12 w-full rounded-full px-7 text-base sm:w-auto" asChild>
            <a href="#pricing">
              Start your 14-day trial
              <ArrowRight aria-hidden="true" />
            </a>
          </Button>
          <Button size="lg" variant="outline" className="h-12 w-full rounded-full px-7 text-base sm:w-auto" asChild>
            <a href="#">Book a demo</a>
          </Button>
        </Reveal>

        <Reveal delay={0.32} className="mt-8 flex flex-col items-center gap-8">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {["No credit card required", "SOC 2 Type II", "GDPR ready"].map((item) => (
              <li key={item} className="inline-flex items-center gap-1.5">
                <Check aria-hidden="true" className="size-4 text-saas-accent" />
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
                  className="size-10 rounded-full border-2 border-background object-cover"
                />
              ))}
            </div>
            <div className="text-left text-sm">
              <div className="flex items-center gap-0.5 text-amber-500" aria-hidden="true">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">4.9 out of 5</span> from 2,400+ product teams
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="relative mx-auto mt-20 max-w-7xl px-4 pb-24 sm:mt-28 sm:px-6 sm:pb-32 lg:px-8">
        <HeroScreen>
          {/* A thin brand-colour frame around the product screen. */}
          <div className="rounded-2xl bg-linear-to-b from-saas-primary/30 via-border to-border p-px shadow-[0_40px_120px_-40px_color-mix(in_oklab,var(--saas-primary)_45%,transparent)]">
            <div className="rounded-2xl bg-background p-1.5 sm:p-2">
              <SaasLandingDashboard className="rounded-xl shadow-none" />
            </div>
          </div>
        </HeroScreen>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-background to-transparent"
        />
      </div>
    </section>
  )
}
