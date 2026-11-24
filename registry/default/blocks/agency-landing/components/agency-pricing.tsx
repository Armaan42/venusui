"use client"

import * as React from "react"
import { Check, CheckCircle2, Mail, MessageSquare, Minus, Rocket, Target, ThumbsUp, TrendingUp, Users, type LucideIcon } from "lucide-react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

import { AgencyLandingArt } from "./agency-landing-art"
import { AgencyLandingButton, AgencyLandingEyebrow } from "./agency-landing-button"
import { portrait } from "./agency-landing-media"
import { CountUp, Reveal, RevealItem, RevealList } from "./agency-landing-motion"
import { AgencyPageHeader } from "./agency-page-header"
import { AgencyShell } from "./agency-shell"

/** What each plan includes, row by row. `true` is included, `false` isn't, text is a limit. */
const rows = [
  "Pages and deliverables",
  "Product and UX design",
  "Web development",
  "Brand strategy",
  "Digital marketing",
  "Dedicated team channel",
]

type Plan = { name: string; price: string; period?: string; text: string; cta: string; values: (boolean | string)[]; featured?: boolean }

const plans: Plan[] = [
  {
    name: "Starter",
    price: "€2,500",
    period: "/month",
    text: "A focused retainer for launches and early-stage brands.",
    cta: "Start a project",
    values: ["Up to 5 pages", true, true, false, false, true],
  },
  {
    name: "Growth",
    price: "€5,500",
    period: "/month",
    text: "For brands growing design, development and marketing together.",
    cta: "Start a project",
    featured: true,
    values: ["Up to 12 pages", true, true, true, false, true],
  },
  {
    name: "Scale",
    price: "Custom",
    text: "A scope shaped around ambitious brands and long-term partnerships.",
    cta: "Book a call",
    values: ["Unlimited scope", true, true, true, true, true],
  },
]

const notifications: { icon: LucideIcon; title: string; time: string }[] = [
  { icon: MessageSquare, title: "Shared channel · New design review", time: "Today, 10:20" },
  { icon: Mail, title: "Weekly report · Sign-ups up 12%", time: "Mon, 09:00" },
  { icon: CheckCircle2, title: "Release 2.4 is live", time: "Fri, 17:45" },
]

const benefits: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Users, title: "Partnership", text: "A dedicated team that learns your business and stays from kick-off to launch and beyond." },
  { icon: Rocket, title: "Delivery", text: "Clear timelines, weekly check-ins and working pages every Friday you can plan around." },
  {
    icon: Target,
    title: "Strategy",
    text: "Every deliverable is shaped by your audience, your positioning and the numbers you care about.",
  },
]

const results = [
  {
    icon: CheckCircle2,
    value: 140,
    suffix: "+",
    title: "projects delivered",
    text: "Websites, apps, brands and campaigns for clients in 14 countries.",
    tone: "bg-amber-300",
  },
  {
    icon: ThumbsUp,
    value: 98,
    suffix: "%",
    title: "client retention",
    text: "Long partnerships built on trust, clear reporting and steady results.",
    tone: "bg-sky-300",
  },
  {
    icon: TrendingUp,
    value: 3,
    suffix: "×",
    title: "faster launches",
    text: "One team for design and build means fewer handoffs and less waiting.",
    tone: "bg-rose-300",
  },
]

function Cell({ value }: { value: boolean | string }) {
  if (typeof value === "string") return <span className="text-sm">{value}</span>
  return value ? (
    <>
      <Check aria-hidden="true" className="size-4 text-agency-accent dark:text-violet-300" />
      <span className="sr-only">Included</span>
    </>
  ) : (
    <>
      <Minus aria-hidden="true" className="size-4 text-muted-foreground/60" />
      <span className="sr-only">Not included</span>
    </>
  )
}

/** Plans compared side by side, why clients stay, and results. Render it from `app/pricing/page.tsx`. */
export function AgencyPricing() {
  return (
    <AgencyShell page="pricing">
      <section aria-labelledby="pricing-title" className="pb-20 sm:pb-28">
        <AgencyPageHeader
          id="pricing-title"
          eyebrow="Pricing"
          title="Simple plans"
          muted="for every stage of growth"
          lead="Pick a monthly retainer, or ask for a fixed quote for a single project. Every plan comes with the same senior team."
        />

        <Reveal className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
          {/* On wide screens, a comparison table; on phones, one card per plan. */}
          <div className="hidden overflow-hidden rounded-3xl bg-agency-card p-6 ring-1 ring-border/60 lg:block">
            <table className="w-full table-fixed border-separate border-spacing-x-4 text-left">
              <caption className="sr-only">Plans compared</caption>
              <thead>
                <tr>
                  <th scope="col" className="w-[22%] align-bottom pb-6 text-lg font-medium">
                    What&apos;s included
                  </th>
                  {plans.map((plan) => (
                    <th key={plan.name} scope="col" className="align-top font-normal">
                      <PlanHead plan={plan} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, r) => (
                  <tr key={row}>
                    <th scope="row" className="border-t py-4 text-sm font-normal text-muted-foreground">
                      {row}
                    </th>
                    {plans.map((plan) => (
                      <td key={plan.name} className={cn("border-t py-4 text-center", plan.featured && "bg-agency-surface/60")}>
                        <span className="inline-flex items-center justify-center">
                          <Cell value={plan.values[r]} />
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="grid gap-4 lg:hidden">
            {plans.map((plan) => (
              <li key={plan.name} className="rounded-3xl bg-agency-card p-4 ring-1 ring-border/60">
                <PlanHead plan={plan} />
                <ul className="mt-4 divide-y text-sm">
                  {rows.map((row, r) => (
                    <li key={row} className="flex items-center justify-between gap-4 py-3">
                      <span className="text-muted-foreground">{row}</span>
                      <Cell value={plan.values[r]} />
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Reveal>
        <p className="mx-auto mt-8 max-w-xl px-4 text-center text-sm text-muted-foreground">
          Prices exclude VAT. Retainers run month to month after the first three months. Single projects get a fixed quote per phase.
        </p>
      </section>

      <section aria-labelledby="partner-title" className="pb-20 sm:pb-28">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20">
          <div className="relative mx-auto w-full max-w-md">
            <Reveal>
              <div className="relative ml-auto w-[80%] overflow-hidden rounded-[2rem] bg-neutral-950">
                <img
                  src={portrait("1506794778202-cad84cf45f1d", 800)}
                  alt="Leo Martins, product designer at Arcwell"
                  width={800}
                  height={800}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover grayscale"
                />
              </div>
            </Reveal>
            <ul aria-label="Recent updates from a client project" className="absolute bottom-6 -left-2 grid w-72 gap-2 sm:-left-6">
              {notifications.map((note, i) => (
                <motion.li
                  key={note.title}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-3 rounded-2xl bg-agency-card p-3 shadow-[0_16px_40px_-20px_rgb(0_0_0/0.4)] ring-1 ring-border/60"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-agency-accent/15 text-agency-accent dark:text-violet-300">
                    <note.icon aria-hidden="true" className="size-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium">{note.title}</span>
                    <span className="block text-xs text-muted-foreground">{note.time}</span>
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
          <div>
            <Reveal>
              <AgencyLandingEyebrow align="start">Benefits</AgencyLandingEyebrow>
              <h2 id="partner-title" className="mt-6 text-3xl leading-tight font-medium tracking-tight text-balance sm:text-5xl">
                A partner invested in your growth
              </h2>
              <p className="mt-5 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                From the first wireframe to launch day, design, development and marketing sit under one roof, so your team moves faster with
                one creative partner.
              </p>
            </Reveal>
            <RevealList className="mt-10 space-y-6">
              {benefits.map((benefit) => (
                <RevealItem key={benefit.title} className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-agency-card ring-1 ring-border/60">
                    <benefit.icon aria-hidden="true" className="size-5 text-agency-accent dark:text-violet-300" />
                  </span>
                  <span>
                    <span className="block font-medium">{benefit.title}</span>
                    <span className="block text-sm text-muted-foreground">{benefit.text}</span>
                  </span>
                </RevealItem>
              ))}
            </RevealList>
          </div>
        </div>
      </section>

      <section aria-labelledby="pricing-results-title" className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="mx-auto max-w-3xl text-center">
            <AgencyLandingEyebrow>Why Arcwell</AgencyLandingEyebrow>
            <h2 id="pricing-results-title" className="mt-6 text-3xl font-medium tracking-tight text-balance sm:text-5xl">
              Results that speak for themselves
            </h2>
          </Reveal>
          <Reveal className="mt-12">
            <ul className="grid overflow-hidden rounded-3xl bg-neutral-950 text-white sm:grid-cols-3">
              {results.map((result, i) => (
                <li
                  key={result.title}
                  className={cn(
                    "flex flex-col items-center gap-3 p-8 text-center",
                    i > 0 && "border-t border-white/10 sm:border-t-0 sm:border-l",
                  )}
                >
                  <span className={cn("grid size-12 place-items-center rounded-full text-neutral-950", result.tone)}>
                    <result.icon aria-hidden="true" className="size-5" />
                  </span>
                  <p className="text-xl font-medium">
                    <CountUp value={result.value} suffix={result.suffix} /> {result.title}
                  </p>
                  <p className="max-w-xs text-sm text-white/75">{result.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </AgencyShell>
  )
}

function PlanHead({ plan }: { plan: Plan }) {
  return (
    <div
      className={cn("relative isolate overflow-hidden rounded-2xl p-5", plan.featured ? "bg-neutral-950 text-white" : "bg-agency-surface")}
    >
      {plan.featured ? (
        <AgencyLandingArt name="aurora" className="absolute -top-10 -right-10 -z-10 size-40 rounded-full opacity-80 blur-xl" />
      ) : null}
      <p className={cn("text-sm", plan.featured ? "text-white/80" : "text-muted-foreground")}>{plan.name}</p>
      <p className="mt-2 text-2xl font-medium tracking-tight">
        {plan.price}
        {plan.period ? (
          <span className={cn("text-sm font-normal", plan.featured ? "text-white/80" : "text-muted-foreground")}>{plan.period}</span>
        ) : null}
      </p>
      <p className={cn("mt-2 min-h-10 text-sm", plan.featured ? "text-white/85" : "text-muted-foreground")}>{plan.text}</p>
      <AgencyLandingButton
        href="#contact"
        variant={plan.featured ? "secondary" : "primary"}
        className="mt-5 h-10 w-full justify-between [&>span]:size-8"
      >
        {plan.cta}
        <span className="sr-only"> on the {plan.name} plan</span>
      </AgencyLandingButton>
    </div>
  )
}
