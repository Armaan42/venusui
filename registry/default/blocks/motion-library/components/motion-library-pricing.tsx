"use client"

import * as React from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

import { SectionLabel } from "./motion-library-motion"

const plans = {
  monthly: { price: 19, note: "/ month", billed: "Billed monthly. Cancel any time." },
  yearly: { price: 13, note: "/ month", billed: "Billed €159 once a year." },
}

/** One digit on an odometer wheel: the column of 0–9 rolls to the right number. */
function Digit({ value }: { value: number }) {
  return (
    <span className="relative inline-block h-[1em] overflow-hidden leading-none">
      {/* The real digit, invisible, gives the wheel its width. */}
      <span className="invisible">{value}</span>
      <motion.span
        className="absolute inset-x-0 top-0 flex flex-col items-center"
        initial={false}
        animate={{ y: `${-value * 10}%` }}
        transition={{ type: "spring", stiffness: 140, damping: 20 }}
      >
        {Array.from({ length: 10 }, (_, n) => (
          <span key={n} className="block h-[1em]">
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  )
}

function Odometer({ value }: { value: number }) {
  return (
    <>
      <span aria-hidden="true" className="inline-flex">
        {String(value)
          .split("")
          .map((digit, i) => (
            <Digit key={i} value={Number(digit)} />
          ))}
      </span>
      <span className="sr-only">{value}</span>
    </>
  )
}

/** A membership with a monthly or yearly price, and a one-off lifetime plan. */
export function MotionLibraryPricing() {
  const [cycle, setCycle] = React.useState<keyof typeof plans>("monthly")
  const plan = plans[cycle]

  return (
    <section id="pricing" aria-labelledby="ml-pricing-title" className="px-4 pb-24 sm:px-6 sm:pb-32">
      <SectionLabel index="05">One price for the whole library</SectionLabel>
      <h2 id="ml-pricing-title" className="mt-5 text-5xl leading-[0.95] font-medium tracking-[-0.04em] sm:text-8xl">
        Monthly, yearly, <span className="text-ml-muted">or once.</span>
      </h2>

      <div className="mt-14 grid gap-4 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col rounded-2xl border border-ml-line bg-ml-card p-6 sm:p-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h3 className="font-mono text-[11px] tracking-[0.14em] text-ml-muted uppercase">Membership</h3>
            <div
              role="group"
              aria-label="Billing"
              className="flex rounded-md bg-ml-ink/8 p-1 font-mono text-[11px] tracking-wider uppercase"
            >
              {(["monthly", "yearly"] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={cycle === value}
                  onClick={() => setCycle(value)}
                  className={cn(
                    "relative rounded px-3 py-1.5 outline-none focus-visible:ring-2 focus-visible:ring-ml-accent",
                    cycle === value ? "text-ml-paper-ink" : "text-ml-muted hover:text-ml-ink",
                  )}
                >
                  {cycle === value ? (
                    <motion.span
                      layoutId="ml-cycle"
                      className="absolute inset-0 rounded bg-ml-paper"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  ) : null}
                  <span className="relative">
                    {value === "monthly" ? "Monthly" : "Yearly"}
                    {value === "yearly" ? <span className={cycle === value ? "text-ml-accent-ink" : "text-ml-accent"}> −30%</span> : null}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <p className="mt-20 flex items-baseline gap-2 sm:mt-28" aria-live="polite">
            <span className="text-7xl font-medium tracking-[-0.05em] sm:text-8xl">
              €<Odometer value={plan.price} />
            </span>
            <span className="text-ml-muted">{plan.note}</span>
          </p>
          <p className="mt-2 text-sm text-ml-muted">{plan.billed}</p>
          <ul className="mt-6 space-y-2 text-sm">
            {["86 components today, more every month", "Builder, code and assistant formats for each", "Use on unlimited client sites"].map(
              (item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="size-1 rounded-full bg-ml-ink" />
                  {item}
                </li>
              ),
            )}
          </ul>
          <a
            href="#"
            className="mt-8 grid h-12 place-items-center rounded-md bg-ml-paper text-sm font-medium text-ml-paper-ink transition-transform outline-none hover:scale-[1.01] focus-visible:ring-2 focus-visible:ring-ml-accent active:scale-[0.99]"
          >
            Become a member
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col rounded-2xl bg-ml-paper p-6 text-ml-paper-ink sm:p-8"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-mono text-[11px] tracking-[0.14em] uppercase opacity-70">Lifetime</h3>
            <span className="rounded-sm bg-ml-accent px-2 py-1 font-mono text-[10px] tracking-wider text-ml-on-accent uppercase">
              First 200
            </span>
          </div>
          <p className="mt-20 flex flex-wrap items-baseline gap-x-3 sm:mt-28">
            <span className="text-7xl font-medium tracking-[-0.05em] sm:text-8xl">€249</span>
            <span className="text-2xl line-through opacity-60">
              <span className="sr-only">Was </span>€349
            </span>
            <span className="opacity-70">once</span>
          </p>
          <p className="mt-2 text-sm opacity-70">For the first 200 members, then €349.</p>
          <ul className="mt-6 space-y-2 text-sm">
            {["Every component, now and later", "New versions and updates included", "Use on unlimited client sites"].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="size-1 rounded-full bg-current" />
                {item}
              </li>
            ))}
          </ul>
          <a
            href="#"
            className="mt-8 grid h-12 place-items-center rounded-md bg-ml-paper-ink text-sm font-medium text-ml-paper transition-transform outline-none hover:scale-[1.01] focus-visible:ring-2 focus-visible:ring-ml-accent active:scale-[0.99]"
          >
            Get lifetime
          </a>
        </motion.div>
      </div>
    </section>
  )
}
