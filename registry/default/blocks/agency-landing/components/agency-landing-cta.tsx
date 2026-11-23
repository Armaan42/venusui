"use client"

import * as React from "react"
import { ArrowUpRight, CalendarDays, Check, Loader2, Mail, MapPin } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"

import { AgencyLandingArt } from "./agency-landing-art"
import { AgencyLandingEyebrow } from "./agency-landing-button"
import { portrait } from "./agency-landing-media"
import { Reveal } from "./agency-landing-motion"

const services = ["Product design", "Website", "Brand identity", "Growth"]
const budgets = ["Under €25k", "€25k–€60k", "€60k+", "Not sure yet"]
const replyFrom = ["1507003211169-0a1dd7228f2d", "1573496359142-b8d87734a5a2", "1506794778202-cad84cf45f1d"]

const ways = [
  { icon: Mail, label: "hello@arcwell.example", href: "mailto:hello@arcwell.example" },
  { icon: CalendarDays, label: "Book a 20-minute intro call", href: "#" },
  { icon: MapPin, label: "Lisbon studio, working worldwide", href: undefined },
]

const field =
  "h-11 w-full rounded-md border bg-agency-surface px-3.5 text-sm transition-[border-color,box-shadow] outline-none placeholder:text-muted-foreground/80 focus:border-agency-accent focus:ring-3 focus:ring-agency-accent/20"

const chip =
  "cursor-pointer rounded-full border bg-agency-card px-3.5 py-1.5 text-sm transition-[background-color,color,border-color,scale] select-none active:scale-95 has-checked:border-agency-accent has-checked:bg-agency-accent has-checked:text-white has-focus-visible:ring-3 has-focus-visible:ring-agency-accent/30"

/**
 * The contact section: ways to reach the studio on the left, and a project
 * enquiry form on the right. The form only pretends to send: connect
 * `send` to your email service or form backend before you launch.
 */
export function AgencyLandingCta() {
  const [status, setStatus] = React.useState<"idle" | "sending" | "sent">("idle")
  const [name, setName] = React.useState("")

  async function send(form: FormData) {
    // Replace this with a call to your backend, e.g. `await fetch("/api/contact", { method: "POST", body: form })`.
    void form
    await new Promise((resolve) => setTimeout(resolve, 900))
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-24 px-3 pb-20 sm:px-6 sm:pb-28">
      <Reveal className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl bg-agency-card shadow-[0_30px_80px_-40px_rgb(0_0_0/0.45)] ring-1 ring-border/60 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        {/* Left: a dark panel with the ways to get in touch. */}
        <div className="relative isolate flex flex-col justify-between gap-10 overflow-hidden p-7 text-white sm:p-10">
          <AgencyLandingArt name="night" className="absolute inset-0 -z-10 animate-agency-drift motion-reduce:animate-none" />
          <span aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-b from-black/30 to-black/60" />
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium tracking-wide uppercase ring-1 ring-white/20 backdrop-blur">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              Taking new projects from March
            </p>
            <h2 id="contact-title" className="mt-6 text-3xl leading-tight font-medium tracking-tight text-balance sm:text-5xl">
              Have something in mind? Let&apos;s make it real.
            </h2>
            <p className="mt-4 max-w-md text-sm text-pretty text-white/85">
              Tell us what you&apos;re building and when you need it. We reply within two working days with a few questions and a time to
              talk.
            </p>
          </div>

          <ul className="grid gap-2">
            {ways.map((way) => {
              const content = (
                <>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/12 ring-1 ring-white/20">
                    <way.icon aria-hidden="true" className="size-4" />
                  </span>
                  <span className="text-sm">{way.label}</span>
                  {way.href ? (
                    <ArrowUpRight
                      aria-hidden="true"
                      className="ml-auto size-4 opacity-0 transition-[opacity,translate] group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  ) : null}
                </>
              )
              return (
                <li key={way.label}>
                  {way.href ? (
                    <a
                      href={way.href}
                      className="group flex items-center gap-3 rounded-xl p-2 transition-colors outline-none hover:bg-white/10 focus-visible:ring-3 focus-visible:ring-white/40"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="flex items-center gap-3 p-2">{content}</div>
                  )}
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-3 border-t border-white/15 pt-6">
            <div className="flex shrink-0 -space-x-2.5">
              {replyFrom.map((id) => (
                <img
                  key={id}
                  src={portrait(id, 96)}
                  alt=""
                  width={36}
                  height={36}
                  className="size-9 rounded-full border-2 border-white/80 object-cover"
                />
              ))}
            </div>
            <p className="text-sm text-white/85">Mateo, Hana or Leo will read your message, not a bot.</p>
          </div>
        </div>

        {/* Right: the enquiry form, or a thank-you once it's sent. */}
        <div className="p-7 sm:p-10">
          <AnimatePresence mode="wait" initial={false}>
            {status === "sent" ? (
              <motion.div
                key="sent"
                role="status"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex h-full min-h-96 flex-col items-start justify-center gap-4"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
                  className="grid size-14 place-items-center rounded-full bg-agency-accent text-white"
                >
                  <Check aria-hidden="true" className="size-7" />
                </motion.span>
                <p className="text-2xl font-medium tracking-tight">Thanks{name ? `, ${name.split(" ")[0]}` : ""}. We&apos;ve got it.</p>
                <p className="max-w-sm text-sm text-muted-foreground">
                  You&apos;ll hear from us within two working days. In the meantime, have a look at some recent projects.
                </p>
                <div className="mt-2 flex flex-wrap gap-3">
                  <a href="#projects" className="text-sm font-medium text-agency-accent underline-offset-4 hover:underline">
                    See our work
                  </a>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="grid gap-5"
                onSubmit={async (event) => {
                  event.preventDefault()
                  const data = new FormData(event.currentTarget)
                  setName(String(data.get("name") ?? ""))
                  setStatus("sending")
                  await send(data)
                  setStatus("sent")
                }}
              >
                <AgencyLandingEyebrow align="start">Project enquiry</AgencyLandingEyebrow>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-1.5">
                    <label htmlFor="agency-name" className="text-sm font-medium">
                      Your name
                    </label>
                    <input id="agency-name" name="name" autoComplete="name" required className={field} placeholder="Ana Ribeiro" />
                  </div>
                  <div className="grid gap-1.5">
                    <label htmlFor="agency-email" className="text-sm font-medium">
                      Work email
                    </label>
                    <input
                      id="agency-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className={field}
                      placeholder="ana@company.com"
                    />
                  </div>
                </div>

                <fieldset>
                  <legend className="mb-2 text-sm font-medium">What do you need?</legend>
                  <div className="flex flex-wrap gap-2">
                    {services.map((service, i) => (
                      <label key={service} className={chip}>
                        <input type="checkbox" name="services" value={service} defaultChecked={i === 1} className="sr-only" />
                        {service}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="mb-2 text-sm font-medium">Budget</legend>
                  <div className="flex flex-wrap gap-2">
                    {budgets.map((budget, i) => (
                      <label key={budget} className={chip}>
                        <input type="radio" name="budget" value={budget} defaultChecked={i === 1} className="sr-only" />
                        {budget}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="grid gap-1.5">
                  <label htmlFor="agency-message" className="text-sm font-medium">
                    About the project
                  </label>
                  <textarea
                    id="agency-message"
                    name="message"
                    rows={4}
                    required
                    placeholder="What are you making, who is it for, and when do you need it?"
                    className={cn(field, "h-auto resize-y py-3")}
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <p className="text-xs text-muted-foreground">We only use your details to reply to you.</p>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group inline-flex h-11 items-center gap-3 rounded-full bg-agency-accent py-1 pr-1 pl-5 text-sm font-medium text-white shadow-[0_6px_16px_-6px_var(--agency-accent)] transition-colors outline-none hover:bg-agency-accent/90 focus-visible:ring-3 focus-visible:ring-agency-accent/40 disabled:opacity-80"
                  >
                    {status === "sending" ? "Sending…" : "Send enquiry"}
                    <span
                      aria-hidden="true"
                      className="grid size-9 place-items-center rounded-full bg-white text-agency-accent transition-transform group-hover:rotate-45"
                    >
                      {status === "sending" ? <Loader2 className="size-4 animate-spin" /> : <ArrowUpRight className="size-4" />}
                    </span>
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  )
}
