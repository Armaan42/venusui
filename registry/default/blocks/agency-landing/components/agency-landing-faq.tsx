import { ChevronDown } from "lucide-react"

import { AgencyLandingButton, AgencyLandingEyebrow } from "./agency-landing-button"
import { Reveal, RevealItem, RevealList } from "./agency-landing-motion"

const faqs = [
  {
    question: "How much does a project cost?",
    answer:
      "Most websites land between €25,000 and €60,000; product work is priced per phase. After a first call you get a fixed quote for the first phase, before anything starts.",
  },
  {
    question: "How long does a project take?",
    answer: "Eight to twelve weeks for most websites and first app releases. Brand identity work usually takes four to six weeks.",
  },
  {
    question: "Can we update the site ourselves after launch?",
    answer: "Yes. Every site comes with a content editor set up for your team, a training session and written notes.",
  },
  {
    question: "Do you work with teams outside Europe?",
    answer: "We do. We work in English, keep a weekly call at a time that suits you, and travel for the kick-off workshop.",
  },
  {
    question: "What happens after launch?",
    answer: "We stay on call for a month at no cost. After that, most clients keep us on a monthly plan for improvements and growth work.",
  },
]

/**
 * FAQ items are native <details>. The `agency-faq` class (from the registry
 * CSS) animates their height where the browser supports it; elsewhere they
 * simply open.
 */
export function AgencyLandingFaq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-24 pb-20 sm:pb-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <AgencyLandingEyebrow align="start">FAQ</AgencyLandingEyebrow>
          <h2 id="faq-title" className="mt-6 text-3xl font-medium tracking-tight text-balance sm:text-5xl">
            Good to know before we talk
          </h2>
          <p className="mt-4 max-w-md text-sm text-pretty text-muted-foreground">
            Pricing, timing and what happens after launch. If your question isn&apos;t here, ask us directly.
          </p>
          <AgencyLandingButton href="#contact" variant="secondary" className="mt-8">
            Ask a question
          </AgencyLandingButton>
        </Reveal>
        <RevealList as="div" className="divide-y">
          {faqs.map((faq, i) => (
            <RevealItem as="div" key={faq.question}>
              <details open={i === 0} className="agency-faq group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-sm font-medium transition-colors outline-none hover:text-agency-accent focus-visible:ring-3 focus-visible:ring-agency-accent/40 [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span
                    aria-hidden="true"
                    className="grid size-6 shrink-0 place-items-center rounded-sm bg-agency-card shadow-sm ring-1 ring-border/70 transition-colors group-open:bg-agency-accent group-open:text-white group-open:ring-agency-accent"
                  >
                    <ChevronDown className="size-3.5 transition-transform duration-300 group-open:rotate-180" />
                  </span>
                </summary>
                <p className="mt-3 pr-10 text-sm text-muted-foreground">{faq.answer}</p>
              </details>
            </RevealItem>
          ))}
        </RevealList>
      </div>
    </section>
  )
}
