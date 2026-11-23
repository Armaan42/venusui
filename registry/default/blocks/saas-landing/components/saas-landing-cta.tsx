import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

import { photos } from "./saas-landing-media"
import { Reveal } from "./saas-landing-motion"

/** Sits on a photo with a dark overlay, so its colours are fixed rather than themed. */
export function SaasLandingCta() {
  return (
    <section aria-labelledby="saas-landing-cta" className="px-4 pb-28 sm:px-6 sm:pb-40 lg:px-8">
      <Reveal className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-neutral-950">
        <img
          src={photos.cta}
          alt=""
          width={1600}
          height={900}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 -z-10 size-full object-cover opacity-40"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-b from-neutral-950/70 via-neutral-950/80 to-neutral-950" />
        <div
          aria-hidden="true"
          className="absolute -bottom-40 left-1/2 -z-10 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-saas-primary/40 blur-3xl"
        />

        <div className="mx-auto max-w-3xl px-6 py-24 text-center sm:px-12 sm:py-32">
          <h2 id="saas-landing-cta" className="text-4xl leading-[1.08] font-semibold tracking-tight text-balance text-white sm:text-6xl">
            Your users are already telling you what to build.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-neutral-300">
            Start listening today. Free for 14 days, with every Growth feature included and help from a real person whenever you need it.
          </p>
          <div className="mt-12 flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" className="h-12 rounded-full bg-white px-7 text-base text-neutral-950 hover:bg-white/90" asChild>
              <a href="#pricing">
                Start your free trial
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-white/25 bg-white/5 px-7 text-base text-white hover:bg-white/15 hover:text-white dark:border-white/25 dark:bg-white/5 dark:hover:bg-white/15"
              asChild
            >
              <a href="#">Book a demo</a>
            </Button>
          </div>
          <p className="mt-8 text-sm text-neutral-400">No credit card required · Cancel any time</p>
        </div>
      </Reveal>
    </section>
  )
}
