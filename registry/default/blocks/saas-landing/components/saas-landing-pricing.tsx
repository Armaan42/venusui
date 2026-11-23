"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { SaasLandingHeading } from "./saas-landing-heading"
import { RevealItem, RevealList } from "./saas-landing-motion"

type Billing = "monthly" | "yearly"

/** Prices are per month in USD; `null` means "talk to sales". */
const plans = [
  {
    name: "Starter",
    description: "For side projects and teams finding product-market fit.",
    price: { monthly: 0, yearly: 0 },
    cta: "Start for free",
    href: "#",
    features: [
      "Up to 10,000 monthly tracked users",
      "Funnels, retention and paths",
      "1 year of data history",
      "3 team members",
      "Community support",
    ],
  },
  {
    name: "Growth",
    description: "For product teams that ship and learn every week.",
    price: { monthly: 59, yearly: 49 },
    cta: "Start 14-day trial",
    href: "#",
    highlighted: true,
    features: [
      "Up to 100,000 monthly tracked users",
      "5,000 session replays a month",
      "AI Insights and smart alerts",
      "Unlimited history and team members",
      "Warehouse sync",
      "Email and chat support",
    ],
  },
  {
    name: "Enterprise",
    description: "For companies with advanced security and scale needs.",
    price: null,
    cta: "Talk to sales",
    href: "#",
    features: [
      "Unlimited tracked users",
      "SSO, SCIM and audit logs",
      "EU or US data residency",
      "99.99% uptime SLA",
      "Dedicated success manager",
    ],
  },
]

export function SaasLandingPricing() {
  const [billing, setBilling] = React.useState<Billing>("yearly")

  return (
    <section id="pricing" aria-labelledby="saas-landing-pricing" className="scroll-mt-20 py-28 sm:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SaasLandingHeading
          id="saas-landing-pricing"
          eyebrow="Pricing"
          title="Start free. Upgrade when it pays for itself."
          lead="Every plan includes unlimited events, dashboards and seats for viewers."
        >
          <div role="group" aria-label="Billing period" className="mt-10 inline-flex rounded-full border bg-muted/50 p-1 text-sm">
            {(["monthly", "yearly"] as const).map((period) => (
              <button
                key={period}
                type="button"
                aria-pressed={billing === period}
                onClick={() => setBilling(period)}
                className={cn(
                  "relative inline-flex items-center gap-2 rounded-full px-5 py-2 font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                  billing === period ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {/* The white pill slides between the two options. */}
                {billing === period ? (
                  <motion.span
                    layoutId="saas-billing-pill"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    className="absolute inset-0 -z-10 rounded-full bg-background shadow-sm"
                  />
                ) : null}
                {period === "monthly" ? "Monthly" : "Yearly"}
                {period === "yearly" ? (
                  <span className="rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[11px] font-medium text-emerald-800 dark:text-emerald-300">
                    −17%
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        </SaasLandingHeading>

        <RevealList className="mt-16 grid items-start gap-6 lg:grid-cols-3 lg:gap-8">
          {plans.map((plan) => {
            const price = plan.price?.[billing]
            return (
              <RevealItem
                key={plan.name}
                className={cn(
                  "relative isolate flex flex-col rounded-[2rem] border bg-card p-8 transition-shadow duration-500 hover:shadow-xl sm:p-10",
                  plan.highlighted && "border-transparent shadow-2xl ring-2 ring-saas-primary lg:-mt-4 lg:pb-14",
                )}
              >
                {plan.highlighted ? (
                  <>
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 -z-10 rounded-[2rem] bg-[radial-gradient(80%_50%_at_50%_0%,color-mix(in_oklab,var(--saas-primary)_10%,transparent),transparent)]"
                    />
                    <span className="absolute -top-3.5 left-10 rounded-full bg-saas-primary px-3.5 py-1 text-xs font-medium text-white dark:text-neutral-950">
                      Most popular
                    </span>
                  </>
                ) : null}
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{plan.description}</p>
                <div className="mt-8 flex h-14 items-baseline gap-1.5">
                  {price === undefined ? (
                    <span className="text-5xl font-semibold tracking-tight">Custom</span>
                  ) : (
                    <>
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.span
                          key={price}
                          initial={{ y: -16, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 16, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-5xl font-semibold tracking-tight tabular-nums"
                        >
                          ${price}
                        </motion.span>
                      </AnimatePresence>
                      <span className="text-muted-foreground">/ month</span>
                    </>
                  )}
                </div>
                <p className="mt-2 h-5 text-sm text-muted-foreground">
                  {price === undefined
                    ? "Annual contract, invoiced"
                    : price === 0
                      ? "Free forever"
                      : billing === "yearly"
                        ? `$${price * 12} billed yearly`
                        : "Billed monthly"}
                </p>
                <Button className="mt-8 h-11 rounded-full text-base" variant={plan.highlighted ? "default" : "outline"} asChild>
                  <a href={plan.href}>{plan.cta}</a>
                </Button>
                <ul className="mt-10 space-y-4 border-t pt-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-saas-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </RevealItem>
            )
          })}
        </RevealList>

        <p className="mt-14 text-center text-muted-foreground">
          Prices in USD, excluding tax. Startups under two years old and nonprofits get 50% off.{" "}
          <a href="#" className="font-medium text-foreground underline underline-offset-4">
            Apply here
          </a>
          .
        </p>
      </div>
    </section>
  )
}
