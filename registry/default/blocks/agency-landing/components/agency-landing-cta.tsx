import { AgencyLandingButton, AgencyLandingEyebrow } from "./agency-landing-button"

export function AgencyLandingCta() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-24 pb-24 sm:pb-32">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <AgencyLandingEyebrow>Contact</AgencyLandingEyebrow>
        <h2 id="contact-title" className="mt-6 text-3xl leading-tight font-medium tracking-tight text-balance sm:text-5xl">
          Have something in mind? Let&apos;s make it real.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm text-pretty text-muted-foreground">
          Tell us what you&apos;re building and when you need it. We reply within two working days with a few questions and
          a time to talk.
        </p>
        <AgencyLandingButton href="mailto:hello@arcwell.example" className="mt-8">
          Contact us
        </AgencyLandingButton>
      </div>
    </section>
  )
}
