"use client"

import * as React from "react"
import { ArrowUp } from "lucide-react"
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"
import { AgencyLandingEyebrow } from "./agency-landing-button"
import { portrait } from "./agency-landing-media"
import { Reveal } from "./agency-landing-motion"

/** A real-feeling thread between a client and the studio. Made up. */
const thread = [
  { from: "client", name: "Rosa Ribeiro", photo: "1438761681033-6461ffad8d80", text: "Bookings dipped this week. Is it the new checkout?" },
  {
    from: "studio",
    name: "Leo, Arcwell",
    photo: "1506794778202-cad84cf45f1d",
    text: "Checked the sessions: the date picker breaks on older iPhones. Fix is in review.",
  },
  { from: "client", name: "Rosa Ribeiro", photo: "1438761681033-6461ffad8d80", text: "That was quick. Can it ship before the weekend?" },
  {
    from: "studio",
    name: "Leo, Arcwell",
    photo: "1506794778202-cad84cf45f1d",
    text: "Shipping this afternoon. We'll send the before-and-after numbers on Monday.",
  },
] as const

const faces = [
  { id: "1544005313-94ddf0286df2", className: "top-0 right-6 rotate-6", delay: "0s" },
  { id: "1560250097-0b93528c311a", className: "top-40 right-48 -rotate-6", delay: "-2s" },
  { id: "1517841905240-472988babdf9", className: "top-72 right-0 rotate-3", delay: "-4s" },
]

/**
 * The thread plays out one message at a time when it scrolls into view, with a
 * typing indicator in between. With reduced motion every message shows at once.
 */
function Thread() {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reduce = useReducedMotion()
  const [shown, setShown] = React.useState(0)

  React.useEffect(() => {
    if (!inView || reduce) return
    if (shown >= thread.length) return
    const timer = window.setTimeout(() => setShown((n) => n + 1), shown === 0 ? 300 : 1400)
    return () => window.clearTimeout(timer)
  }, [inView, reduce, shown])

  const visible = reduce ? thread.length : shown
  const typing = !reduce && inView && visible < thread.length

  return (
    <div ref={ref} className="rounded-3xl bg-agency-card p-5 shadow-[0_30px_70px_-34px_rgb(0_0_0/0.45)] ring-1 ring-border/60 sm:p-7">
      <div className="flex items-center justify-between border-b pb-4 text-sm">
        <span className="font-medium">#halden-retreats</span>
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="size-2 rounded-full bg-emerald-500" /> Shared channel
        </span>
      </div>
      {/* The finished thread is always available to screen readers; the animation is visual only. */}
      <ol className="sr-only">
        {thread.map((message, i) => (
          <li key={i}>
            {message.name}: {message.text}
          </li>
        ))}
      </ol>
      <div aria-hidden="true" className="flex min-h-80 flex-col justify-end gap-4 pt-5">
        <AnimatePresence initial={false}>
          {thread.slice(0, visible).map((message, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className={cn("flex items-end gap-3", message.from === "studio" && "flex-row-reverse")}
            >
              <img src={portrait(message.photo, 72)} alt="" width={32} height={32} className="size-8 shrink-0 rounded-full object-cover" />
              <div
                data-message=""
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm",
                  message.from === "studio" ? "rounded-br-sm bg-agency-accent text-white" : "rounded-bl-sm bg-agency-surface",
                )}
              >
                <p className={cn("text-[11px] font-medium", message.from === "studio" ? "text-white" : "text-muted-foreground")}>
                  {message.name}
                </p>
                <p className="mt-0.5">{message.text}</p>
              </div>
            </motion.div>
          ))}
          {typing ? (
            <motion.div
              key="typing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={cn("flex gap-1 px-11", thread[visible]?.from === "studio" && "justify-end")}
            >
              {[0, 1, 2].map((dot) => (
                <span
                  key={dot}
                  className="size-1.5 animate-bounce rounded-full bg-muted-foreground/60"
                  style={{ animationDelay: `${dot * 0.15}s` }}
                />
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
      <div
        aria-hidden="true"
        className="mt-5 flex items-center gap-3 rounded-full bg-agency-surface py-1.5 pr-1.5 pl-4 text-sm text-muted-foreground"
      >
        <span className="flex-1">Message the team</span>
        <span className="grid size-8 place-items-center rounded-full bg-agency-accent text-white">
          <ArrowUp className="size-4" />
        </span>
      </div>
    </div>
  )
}

export function AgencyAboutVision() {
  return (
    <section aria-labelledby="vision-title" className="overflow-hidden py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <AgencyLandingEyebrow>Our vision</AgencyLandingEyebrow>
          <h2 id="vision-title" className="mt-6 text-3xl leading-tight font-medium tracking-tight text-balance sm:text-5xl">
            The partner you message first
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-muted-foreground sm:text-lg sm:leading-8">
            We want to be the team our clients think of when something matters: a launch, a drop in sign-ups, a new idea at 11pm. Every
            client gets a shared channel with the people doing the work, not an account manager.
          </p>
        </Reveal>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <Reveal>
            <Thread />
          </Reveal>
          <div aria-hidden="true" className="relative hidden h-[26rem] lg:block">
            {faces.map((face) => (
              <div key={face.id} className={cn("absolute", face.className)}>
                <div className="animate-agency-bob motion-reduce:animate-none" style={{ animationDelay: face.delay }}>
                  <img
                    src={portrait(face.id, 260)}
                    alt=""
                    width={128}
                    height={128}
                    loading="lazy"
                    className="size-32 rounded-3xl object-cover shadow-[0_24px_50px_-24px_rgb(0_0_0/0.45)] ring-4 ring-agency-card"
                  />
                </div>
              </div>
            ))}
            <div className="absolute top-60 left-6 rounded-2xl bg-agency-card px-4 py-3 shadow-[0_24px_50px_-24px_rgb(0_0_0/0.35)] ring-1 ring-border/60">
              <p className="text-xs text-muted-foreground">Average first reply</p>
              <p className="text-xl font-medium tracking-tight">Under 2 hours</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
