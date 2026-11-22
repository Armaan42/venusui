import { AgencyLandingButton, AgencyLandingEyebrow } from "./agency-landing-button"
import { Reveal } from "./agency-landing-motion"

export function AgencyLandingCta() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative isolate scroll-mt-24 overflow-hidden pb-24 sm:pb-32">
      {/* Two soft brand-colour glows that drift slowly behind the call to action. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 size-80 -translate-x-[85%] animate-agency-glow rounded-full bg-agency-accent/15 blur-3xl motion-reduce:animate-none" />
        <div className="absolute top-10 left-1/2 size-72 -translate-x-[10%] animate-agency-glow rounded-full bg-sky-400/15 blur-3xl [animation-delay:-6s] motion-reduce:animate-none" />
      </div>
      <Reveal className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <AgencyLandingEyebrow>Contact</AgencyLandingEyebrow>
        <h2 id="contact-title" className="mt-6 text-3xl leading-tight font-medium tracking-tight text-balance sm:text-5xl">
          Have something in mind? Let&apos;s make it real.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm text-pretty text-muted-foreground">
          Tell us what you&apos;re building and when you need it. We reply within two working days with a few questions and a time to talk.
        </p>
        <AgencyLandingButton href="mailto:hello@arcwell.example" className="mt-8">
          Contact us
        </AgencyLandingButton>
      </Reveal>
    </section>
  )
}
