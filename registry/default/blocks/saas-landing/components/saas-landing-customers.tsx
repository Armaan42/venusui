import { ArrowRight, Quote } from "lucide-react"

import { cn } from "@/lib/utils"

import { SaasLandingHeading } from "./saas-landing-heading"
import { photos, portrait } from "./saas-landing-media"
import { CountUp, Reveal } from "./saas-landing-motion"

const results = [
  { value: 38, prefix: "+", suffix: "%", label: "activation in 60 days" },
  { value: 3, suffix: "×", label: "faster product analysis" },
  { value: 11, suffix: " hrs", label: "saved per analyst, weekly" },
]

const testimonials = [
  {
    quote: "We replaced three tools and a weekly SQL ritual with Pulsewise. The funnel view alone paid for the year.",
    name: "Priya Natarajan",
    role: "Head of Growth, Fernway",
    photo: "1494790108377-be9c29b29330",
  },
  {
    quote: "Setup took one coffee. By lunch we knew why trial users never invited their team, and we shipped the fix that week.",
    name: "Marcus Reid",
    role: "Co-founder, Kestrel",
    photo: "1507003211169-0a1dd7228f2d",
  },
  {
    quote: "Having the replay right next to the funnel step is the killer feature. I watch the exact moment people get stuck.",
    name: "Sofie Lindqvist",
    role: "Senior Product Designer, Oakline",
    photo: "1438761681033-6461ffad8d80",
  },
  {
    quote: "EU data residency and input masking out of the box. Our security review took a day, not a quarter.",
    name: "David Brenner",
    role: "CTO, Quanta Health",
    photo: "1472099645785-5658abf4ff4e",
  },
  {
    quote: "AI Insights flagged a mobile app regression before our crash reporting did. It's like having an analyst on every squad.",
    name: "Amara Osei",
    role: "Product Manager, Northlight",
    photo: "1580489944761-15a19d654956",
  },
  {
    quote: "The warehouse stays our source of truth, and PMs finally answer their own questions instead of queuing dashboards.",
    name: "Tomás Alvarez",
    role: "Data Lead, Brightloop",
    photo: "1506794778202-cad84cf45f1d",
  },
]

/** One row of testimonial cards drifting sideways, repeated so it loops; only the first copy is read by screen readers. */
function TestimonialRow({ items, reverse = false }: { items: typeof testimonials; reverse?: boolean }) {
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <ul
        className={cn(
          "flex w-max gap-6 py-2 hover:[animation-play-state:paused] motion-reduce:animate-none",
          reverse ? "animate-saas-marquee-reverse" : "animate-saas-marquee-slow",
        )}
      >
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <li key={`${item.name}-${i}`} aria-hidden={i >= items.length || undefined} className="w-[22rem] shrink-0 sm:w-[26rem]">
            <figure className="flex h-full flex-col justify-between rounded-3xl border bg-card p-7 shadow-sm">
              <blockquote className="leading-7 text-pretty">“{item.quote}”</blockquote>
              <figcaption className="mt-7 flex items-center gap-3">
                <img
                  src={portrait(item.photo)}
                  alt=""
                  width={44}
                  height={44}
                  loading="lazy"
                  decoding="async"
                  className="size-11 rounded-full object-cover"
                />
                <div className="text-sm">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-muted-foreground">{item.role}</p>
                </div>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function SaasLandingCustomers() {
  return (
    <section id="customers" aria-labelledby="saas-landing-customers" className="scroll-mt-20 border-y bg-muted/30 py-28 sm:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SaasLandingHeading
          id="saas-landing-customers"
          eyebrow="Customers"
          title="Teams ship better products with Pulsewise"
          lead="From two-person startups to public companies, product teams use Pulsewise to find what's broken and prove what works."
        />

        {/* Case study */}
        <Reveal className="mt-20 sm:mt-24">
          <figure className="grid overflow-hidden rounded-[2rem] border bg-card shadow-sm lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
            <div className="relative min-h-80 overflow-hidden lg:min-h-full">
              <img
                src={photos.caseStudy}
                alt="Two members of the Brightloop product team celebrating with a high five at their desks."
                width={1200}
                height={900}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 size-full object-cover transition-transform duration-1000 hover:scale-105"
              />
              <span className="absolute top-5 left-5 rounded-full bg-black/60 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur">
                Case study · Brightloop
              </span>
            </div>
            <div className="flex flex-col p-8 sm:p-14">
              <Quote aria-hidden="true" className="size-10 text-saas-primary" />
              <blockquote className="mt-8 text-2xl leading-snug font-medium tracking-tight text-pretty sm:text-3xl sm:leading-snug">
                “We knew people were leaving during onboarding but not why. In one afternoon with Pulsewise we found the step, watched the
                sessions and fixed it. Activation is up 38% since.”
              </blockquote>
              <figcaption className="mt-10 flex items-center gap-4">
                <img
                  src={portrait("1573496359142-b8d87734a5a2", 112)}
                  alt=""
                  width={52}
                  height={52}
                  loading="lazy"
                  decoding="async"
                  className="size-13 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">Elena Marsh</p>
                  <p className="text-sm text-muted-foreground">VP of Product, Brightloop</p>
                </div>
              </figcaption>
              <dl className="mt-12 grid grid-cols-3 gap-6 border-t pt-10">
                {results.map((result) => (
                  <div key={result.label} className="flex flex-col-reverse justify-end">
                    <dt className="mt-2 text-sm leading-5 text-muted-foreground">{result.label}</dt>
                    <dd className="text-3xl font-semibold tracking-tight sm:text-4xl">
                      <CountUp value={result.value} prefix={result.prefix} suffix={result.suffix} />
                    </dd>
                  </div>
                ))}
              </dl>
              <a
                href="#"
                className="group mt-10 inline-flex w-fit items-center gap-1.5 rounded-sm font-medium outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                Read the Brightloop story
                <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </figure>
        </Reveal>
      </div>

      {/* Testimonials: two rows drifting in opposite directions, pausing on hover. */}
      <Reveal className="mt-16 space-y-6 sm:mt-20">
        <TestimonialRow items={testimonials.slice(0, 3)} />
        <TestimonialRow items={testimonials.slice(3)} reverse />
      </Reveal>
    </section>
  )
}
