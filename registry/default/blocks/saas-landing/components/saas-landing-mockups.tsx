"use client"

import { Sparkles } from "lucide-react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

import { GrowBar } from "./saas-landing-motion"

/**
 * The product mockups in the features section. They're HTML, so they follow
 * your theme; each is announced as one image with a text description.
 */

const funnelSteps = [
  { step: "Visited pricing", rate: 100, users: "24,310" },
  { step: "Started checkout", rate: 58, users: "14,100" },
  { step: "Entered card", rate: 34, users: "8,265", drop: true },
  { step: "Subscribed", rate: 29, users: "7,050" },
]

/** Share of each weekly cohort still active, week 0 to week 7. */
const cohorts = [
  { week: "Sep 15", values: [100, 64, 52, 47, 44, 42, 41, 40] },
  { week: "Sep 22", values: [100, 66, 55, 49, 46, 44, 43] },
  { week: "Sep 29", values: [100, 69, 57, 51, 48, 47] },
  { week: "Oct 6", values: [100, 71, 60, 55, 52] },
  { week: "Oct 13", values: [100, 74, 63, 58] },
  { week: "Oct 20", values: [100, 76, 66] },
]

/** Events on the replay timeline, as a percentage of the session. */
const replayEvents = [
  { at: 5, type: "view" },
  { at: 14, type: "click" },
  { at: 26, type: "click" },
  { at: 37, type: "view" },
  { at: 49, type: "click" },
  { at: 63, type: "rage" },
  { at: 72, type: "error" },
  { at: 88, type: "click" },
] as const

const replayEventColor = {
  view: "bg-muted-foreground/60",
  click: "bg-saas-primary",
  rage: "bg-red-500",
  error: "bg-amber-500",
}

export function FunnelMockup() {
  return (
    <div
      role="img"
      aria-label="A checkout funnel: 24,310 visited pricing, 58% started checkout, 34% entered a card and 29% subscribed. The biggest drop is at entering a card."
      className="space-y-4 rounded-2xl border bg-background p-5 shadow-sm sm:p-6"
    >
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="font-medium text-foreground">Checkout funnel</span>
        <span>Last 30 days</span>
      </div>
      {funnelSteps.map((row) => (
        <div
          key={row.step}
          className="grid grid-cols-[7.5rem_minmax(0,1fr)_3.5rem] items-center gap-3 text-xs sm:grid-cols-[9.5rem_minmax(0,1fr)_4rem] sm:text-sm"
        >
          <span className="truncate text-muted-foreground">{row.step}</span>
          <div className="h-9 overflow-hidden rounded-lg bg-muted">
            <GrowBar
              width={row.rate}
              className={cn(
                "flex h-full min-w-11 items-center rounded-lg px-2.5 font-mono text-xs text-white",
                row.drop ? "bg-red-600" : "bg-saas-primary dark:text-neutral-950",
              )}
            >
              {row.rate}%
            </GrowBar>
          </div>
          <span className="text-right font-mono text-muted-foreground tabular-nums">{row.users}</span>
        </div>
      ))}
      <p className="rounded-lg bg-red-500/10 px-3.5 py-2.5 text-xs text-red-700 sm:text-sm dark:text-red-300">
        Biggest drop-off: 41% leave at “Entered card”, mostly on mobile browsers.
      </p>
    </div>
  )
}

export function CohortMockup() {
  return (
    <div
      role="img"
      aria-label="Weekly retention cohorts. Newer cohorts keep more users: 76% of the Oct 20 cohort came back in week one, against 64% for Sep 15."
      className="overflow-hidden rounded-2xl border bg-background p-4 shadow-sm sm:p-6"
    >
      <div className="mb-4 flex items-center justify-between text-xs text-muted-foreground">
        <span className="font-medium text-foreground">Weekly retention</span>
        <span>% still active</span>
      </div>
      <div className="grid grid-cols-[3.5rem_repeat(8,minmax(0,1fr))] gap-1.5 font-mono text-[10px] [--cohort-scale:1] sm:text-xs dark:[--cohort-scale:0.72]">
        <span />
        {Array.from({ length: 8 }, (_, i) => (
          <span key={i} className="text-center text-muted-foreground">
            W{i}
          </span>
        ))}
        {cohorts.map((cohort, row) => (
          <div key={cohort.week} className="contents">
            <span className="truncate text-muted-foreground">{cohort.week}</span>
            {Array.from({ length: 8 }, (_, i) => {
              const value = cohort.values[i]
              const tint = value === undefined ? 0 : Math.round(value * 0.85)
              return (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.4, delay: (row + i) * 0.04 }}
                  // Dark mode scales the greens down (--cohort-scale) so the light text keeps 4.5:1 contrast on every cell.
                  className="grid h-8 place-items-center rounded-md text-foreground"
                  style={
                    value === undefined
                      ? undefined
                      : { backgroundColor: `color-mix(in oklab, var(--saas-accent) calc(${tint}% * var(--cohort-scale)), transparent)` }
                  }
                >
                  {value === undefined || value === 100 ? "" : value}
                </motion.span>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

export function ReplayMockup() {
  return (
    <div
      role="img"
      aria-label="A session replay of someone rage-clicking “Skip for now” on the invite-teammates step of onboarding."
      className="rounded-2xl shadow-sm [&>div]:rounded-2xl"
    >
      <div className="overflow-hidden rounded-xl border bg-background text-[11px]">
        {/* Who the recording is from */}
        <div className="flex items-center gap-2.5 border-b px-3 py-2">
          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-saas-accent/15 text-[10px] font-semibold text-foreground">
            JK
          </span>
          <div className="min-w-0">
            <p className="truncate font-medium">jonas.k@fernway.io</p>
            <p className="truncate text-[10px] text-muted-foreground">Berlin · Desktop browser · 2 days ago</p>
          </div>
          <span className="ml-auto shrink-0 rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-medium text-red-700 dark:text-red-400">
            Rage click
          </span>
        </div>

        {/* The recorded screen */}
        <div className="relative bg-muted/50 px-4 pt-4 pb-5">
          <div className="rounded-lg border bg-background p-3.5 shadow-sm">
            <div className="flex items-center justify-between text-[10px] text-muted-foreground">
              <span>Step 3 of 4</span>
              <span>app.pulsewise.io/onboarding</span>
            </div>
            <div className="mt-2 grid grid-cols-4 gap-1">
              {[0, 1, 2, 3].map((step) => (
                <span key={step} className={cn("h-1 rounded-full", step < 3 ? "bg-saas-primary" : "bg-muted")} />
              ))}
            </div>
            <p className="mt-3 text-[13px] font-semibold">Invite your teammates</p>
            <p className="mt-0.5 text-muted-foreground">Pulsewise works best when your whole team can see it.</p>
            <div className="mt-3 space-y-1.5">
              <div className="rounded-md border px-2 py-1.5">maria@fernway.io</div>
              <div className="flex items-center rounded-md border border-saas-primary px-2 py-1.5 ring-2 ring-saas-primary/20">
                <span className="text-muted-foreground">name@company.com</span>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="relative text-muted-foreground underline underline-offset-2">
                Skip for now
                {/* Rage-click rings, the cursor trail and the cursor itself, anchored to the link. */}
                <span className="absolute top-1/2 left-[85%] size-8 -translate-1/2 rounded-full border-2 border-red-500/70 bg-red-500/10" />
                <span className="absolute top-1/2 left-[85%] size-8 -translate-1/2 animate-ping rounded-full border-2 border-red-500/60 motion-reduce:hidden" />
                <svg viewBox="0 0 160 70" className="absolute bottom-1/2 left-[85%] h-[70px] w-40 overflow-visible">
                  <path
                    d="M0 70 C18 54 40 50 70 53 S125 62 160 56"
                    fill="none"
                    stroke="var(--saas-primary)"
                    strokeWidth="1.5"
                    strokeDasharray="3 4"
                    strokeLinecap="round"
                  />
                </svg>
                <svg viewBox="0 0 14 20" className="absolute top-1/2 left-[85%] h-5 w-3.5 drop-shadow">
                  <path
                    d="M1 1v15.5l4-3.6 2.7 6 2.6-1.1-2.7-5.9H13Z"
                    fill="white"
                    stroke="black"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="absolute top-full left-[85%] mt-3 ml-2 rounded-md bg-red-600 px-1.5 py-0.5 text-[10px] font-medium whitespace-nowrap text-white no-underline shadow">
                  4 clicks in 1.2s
                </span>
              </span>
              <span className="rounded-md bg-primary px-2.5 py-1.5 font-medium text-primary-foreground">Send invites</span>
            </div>
          </div>
        </div>

        {/* Player */}
        <div className="space-y-2.5 border-t px-3 py-2.5">
          <div className="relative h-1.5 rounded-full bg-muted">
            <div className="h-full w-[63%] rounded-full bg-foreground/70" />
            {replayEvents.map((event) => (
              <span
                key={event.at}
                className={cn("absolute top-1/2 size-2 -translate-1/2 rounded-full ring-2 ring-background", replayEventColor[event.type])}
                style={{ left: `${event.at}%` }}
              />
            ))}
            <span className="absolute top-1/2 left-[63%] h-3.5 w-1 -translate-1/2 rounded-full bg-foreground" />
          </div>
          <div className="flex items-center gap-3">
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
              <svg viewBox="0 0 12 12" className="size-2.5 fill-current">
                <path d="M3 2v8l7-4Z" />
              </svg>
            </span>
            <span className="font-mono text-[10px] text-muted-foreground tabular-nums">01:52 / 02:58</span>
            <span className="rounded border px-1 font-mono text-[10px]">1×</span>
            <span className="ml-auto hidden items-center gap-2.5 text-[10px] text-muted-foreground sm:flex">
              <span className="inline-flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-saas-primary" />
                Click
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-red-500" />
                Rage
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-amber-500" />
                Error
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

const bubble = {
  hidden: { opacity: 0, y: 12 },
  shown: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.25 + i * 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } }),
}

export function InsightsMockup() {
  return (
    <motion.div
      role="img"
      aria-label="A chat with AI Insights. Question: why did trial conversions drop last week? Answer: trial-to-paid fell from 18.4% to 14.9% because the new onboarding skips inviting teammates, and checkout errors doubled for cards issued in India."
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.5 }}
      className="space-y-4 rounded-2xl border bg-background p-5 text-sm shadow-sm sm:p-6"
    >
      <motion.div
        custom={0}
        variants={bubble}
        className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-primary-foreground"
      >
        Why did trial conversions drop last week?
      </motion.div>
      <motion.div custom={1} variants={bubble} className="flex gap-3">
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-saas-primary/15 text-saas-primary">
          <Sparkles className="size-4" />
        </span>
        <div className="space-y-2.5 rounded-2xl rounded-tl-sm border bg-muted/40 px-4 py-3">
          <p>
            Trial-to-paid fell from <span className="font-medium">18.4%</span> to <span className="font-medium">14.9%</span>. Two things
            changed on Nov 4:
          </p>
          <ul className="list-disc space-y-1.5 pl-4 text-muted-foreground">
            <li>The new onboarding skips the “Invite teammates” step. Teams that invite convert 3.2× more.</li>
            <li>Checkout errors doubled for cards issued in India (3-D Secure timeouts).</li>
          </ul>
        </div>
      </motion.div>
      <motion.div custom={2} variants={bubble} className="flex flex-wrap gap-2 pl-11">
        {["Show the sessions", "Open the funnel", "Alert me if it drops again"].map((chip) => (
          <span key={chip} className="rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground">
            {chip}
          </span>
        ))}
      </motion.div>
    </motion.div>
  )
}
