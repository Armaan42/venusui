import { ChevronDown, MessageCircle } from "lucide-react"

import { SaasLandingHeading } from "./saas-landing-heading"
import { portrait } from "./saas-landing-media"
import { RevealItem, RevealList } from "./saas-landing-motion"

const faqs = [
  {
    question: "How long does setup take?",
    answer:
      "Most teams send their first events in under ten minutes with our web, mobile or server SDKs. Autocapture records clicks, page views and form submits without extra code, and you can add custom events whenever you're ready.",
  },
  {
    question: "Will Pulsewise slow down my site or app?",
    answer:
      "No. The web SDK is 9 KB gzipped, loads asynchronously and sends events in batches, so it never blocks rendering. On mobile, events are queued and sent when the device is on a good connection.",
  },
  {
    question: "How do you handle privacy and GDPR?",
    answer:
      "Text inputs are masked in replays by default, IP addresses are dropped after geolocation, and you can host your data in the EU. We sign a DPA with every customer, support a cookieless mode and are SOC 2 Type II audited.",
  },
  {
    question: "What counts as a monthly tracked user?",
    answer:
      "A unique person who sends at least one event in a calendar month. Anonymous visitors who later sign up are merged, so they count once. Going over your plan never stops tracking; we'll suggest a plan change instead.",
  },
  {
    question: "Can I bring my existing data?",
    answer:
      "Yes. Import historical events from a CSV file or straight from your data warehouse, and keep your current tracking running in parallel while your team compares the numbers.",
  },
  {
    question: "Can I cancel at any time?",
    answer:
      "Yes. Monthly plans end at the close of the billing period, and yearly plans can be cancelled for a prorated refund in the first 30 days. You can export all of your data whenever you like.",
  },
]

const supportTeam = ["1534528741775-53994a69daeb", "1519085360753-af0119f7cbe7", "1531123897727-8f129e1688ce"]

export function SaasLandingFaq() {
  return (
    <section id="faq" aria-labelledby="saas-landing-faq" className="scroll-mt-20 py-28 sm:py-40">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-24 lg:px-8">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SaasLandingHeading
            id="saas-landing-faq"
            eyebrow="FAQ"
            align="start"
            title="Questions, answered"
            lead="Can’t find what you’re looking for? Our product specialists reply in under five minutes during working hours."
          >
            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-2.5">
                {supportTeam.map((id) => (
                  <img
                    key={id}
                    src={portrait(id, 88)}
                    alt=""
                    width={40}
                    height={40}
                    loading="lazy"
                    decoding="async"
                    className="size-10 rounded-full border-2 border-background object-cover"
                  />
                ))}
              </div>
              <a
                href="#"
                className="inline-flex h-11 items-center gap-2 rounded-full border bg-card px-5 text-sm font-medium outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <MessageCircle aria-hidden="true" className="size-4" />
                Chat with us
              </a>
            </div>
          </SaasLandingHeading>
        </div>

        <RevealList as="div" className="divide-y border-y">
          {faqs.map((faq) => (
            <RevealItem as="div" key={faq.question}>
              <details className="saas-faq group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-7 text-left text-lg font-medium outline-none focus-visible:ring-3 focus-visible:ring-ring/50 [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span
                    aria-hidden="true"
                    className="grid size-8 shrink-0 place-items-center rounded-full border transition-colors group-open:border-saas-primary group-open:bg-saas-primary group-open:text-white"
                  >
                    <ChevronDown className="size-4 transition-transform duration-300 group-open:rotate-180 motion-reduce:transition-none" />
                  </span>
                </summary>
                <p className="pr-12 pb-7 leading-7 text-muted-foreground">{faq.answer}</p>
              </details>
            </RevealItem>
          ))}
        </RevealList>
      </div>
    </section>
  )
}
