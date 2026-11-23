import type { ReactNode } from "react"
import {
  ArrowRight,
  BellRing,
  Check,
  Database,
  Filter,
  MousePointerClick,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react"

import { cn } from "@/lib/utils"

import { SaasLandingEyebrow, SaasLandingHeading } from "./saas-landing-heading"
import { CohortMockup, FunnelMockup, InsightsMockup, ReplayMockup } from "./saas-landing-mockups"
import { Reveal, RevealItem, RevealList } from "./saas-landing-motion"

const spotlights: { icon: typeof Filter; label: string; title: string; text: string; points: string[]; mockup: ReactNode }[] = [
  {
    icon: Filter,
    label: "Funnels",
    title: "Funnels that point straight at the problem",
    text: "Build a funnel from any events in seconds. Pulsewise highlights the step where most people leave, and who they are.",
    points: ["Any events, in any order", "Break down by plan, country or device", "Compare before and after a release"],
    mockup: <FunnelMockup />,
  },
  {
    icon: TrendingUp,
    label: "Retention",
    title: "Retention you can actually trust",
    text: "Weekly cohorts show whether a change keeps people coming back, not just whether they signed up.",
    points: ["Cohorts by signup week or first action", "Spot the habit that predicts retention", "Share a cohort in one link"],
    mockup: <CohortMockup />,
  },
  {
    icon: PlayCircle,
    label: "Session replays",
    title: "Watch the moment people get stuck",
    text: "Jump from any chart to the recordings behind it, with rage clicks and errors marked on the timeline.",
    points: ["Inputs masked by default", "Skip the quiet parts automatically", "Comment on a moment and tag a teammate"],
    mockup: <ReplayMockup />,
  },
  {
    icon: Sparkles,
    label: "AI Insights",
    title: "Ask questions in plain English",
    text: "AI Insights reads your events and answers like an analyst would, with the chart and the sessions to back it up.",
    points: ["Answers cite the data they used", "Flags unusual drops before you ask", "Works in every language your team writes"],
    mockup: <InsightsMockup />,
  },
]

const moreFeatures = [
  {
    icon: MousePointerClick,
    title: "Autocapture",
    text: "Clicks, page views and form submits are tracked from day one, with no tagging plan.",
  },
  { icon: Zap, title: "Real-time", text: "Events show up in charts within seconds, so you can watch a launch as it happens." },
  { icon: Database, title: "Warehouse sync", text: "Two-way sync with your data warehouse keeps one source of truth for every team." },
  {
    icon: ShieldCheck,
    title: "Private by default",
    text: "Inputs are masked, IPs are dropped and data can stay in the EU. SOC 2 Type II audited.",
  },
  { icon: BellRing, title: "Smart alerts", text: "A message in your team chat when a funnel step or key metric moves more than usual." },
  { icon: Users, title: "Team spaces", text: "Shared dashboards, comments and saved views keep product, design and growth aligned." },
]

export function SaasLandingFeatures() {
  return (
    <section id="features" aria-labelledby="saas-landing-features" className="scroll-mt-20 py-28 sm:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SaasLandingHeading
          id="saas-landing-features"
          eyebrow="Product"
          title="From raw events to clear answers, in minutes"
          lead="Everything you need to see what users do, understand why, and decide what to build next, in one place."
        />

        <div className="mt-24 space-y-28 sm:mt-32 sm:space-y-40">
          {spotlights.map((item, i) => (
            <div key={item.label} className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
              <Reveal className={cn(i % 2 === 1 && "lg:order-2")}>
                <SaasLandingEyebrow>
                  <item.icon aria-hidden="true" className="-ml-0.5 size-3.5 text-saas-primary" />
                  {item.label}
                </SaasLandingEyebrow>
                <h3 className="mt-6 text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl">{item.title}</h3>
                <p className="mt-5 text-lg leading-8 text-pretty text-muted-foreground">{item.text}</p>
                <ul className="mt-8 space-y-3.5">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-center gap-3">
                      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-saas-accent/15 text-saas-accent">
                        <Check aria-hidden="true" className="size-3.5" />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
                <a
                  href="#"
                  className="group mt-10 inline-flex items-center gap-1.5 rounded-sm font-medium text-saas-primary outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  Learn more about {item.label === "AI Insights" ? item.label : item.label.toLowerCase()}
                  <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Reveal>

              <Reveal delay={0.1} className={cn("relative", i % 2 === 1 && "lg:order-1")}>
                {/* A soft panel behind each mockup, tinted with the brand colours. */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-4 -z-10 rounded-[2rem] bg-[radial-gradient(70%_60%_at_30%_20%,color-mix(in_oklab,var(--saas-primary)_14%,transparent),transparent),radial-gradient(60%_60%_at_80%_90%,color-mix(in_oklab,var(--saas-accent)_14%,transparent),transparent)] sm:-inset-8"
                />
                <div className="rounded-3xl border bg-muted/40 p-4 sm:p-8">{item.mockup}</div>
              </Reveal>
            </div>
          ))}
        </div>

        <div className="mt-32 border-t pt-20 sm:mt-40 sm:pt-24">
          <Reveal className="max-w-2xl">
            <h3 className="text-3xl font-semibold tracking-tight sm:text-4xl">And everything else a product team needs</h3>
          </Reveal>
          <RevealList className="mt-14 grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {moreFeatures.map(({ icon: Icon, title, text }) => (
              <RevealItem key={title}>
                <span className="grid size-12 place-items-center rounded-xl border bg-card shadow-sm">
                  <Icon aria-hidden="true" className="size-5 text-saas-primary" />
                </span>
                <h4 className="mt-6 text-lg font-semibold">{title}</h4>
                <p className="mt-2 leading-7 text-muted-foreground">{text}</p>
              </RevealItem>
            ))}
          </RevealList>
        </div>
      </div>
    </section>
  )
}
