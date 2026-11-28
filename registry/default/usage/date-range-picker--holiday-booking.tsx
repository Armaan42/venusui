"use client"

import * as React from "react"

import { DateRangePicker, type DateRange } from "@/registry/default/ui/date-range-picker"

export const meta = {
  title: "Holiday home booking",
  description:
    "A date range picker for booking a holiday home: only future dates, forward-looking presets and a live price for the nights picked.",
}

// The house and prices are made up.
const NIGHTLY = 240
const CLEANING = 60

const startOfToday = () => {
  const t = new Date()
  return new Date(t.getFullYear(), t.getMonth(), t.getDate())
}

const presets = [
  {
    label: "This weekend",
    range: (t: Date) => {
      const friday = new Date(t.getFullYear(), t.getMonth(), t.getDate() + ((5 - t.getDay() + 7) % 7))
      return { from: friday, to: new Date(friday.getFullYear(), friday.getMonth(), friday.getDate() + 2) }
    },
  },
  {
    label: "Next week",
    range: (t: Date) => {
      const monday = new Date(t.getFullYear(), t.getMonth(), t.getDate() + ((8 - t.getDay()) % 7 || 7))
      return { from: monday, to: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 6) }
    },
  },
  {
    label: "A week in a month",
    range: (t: Date) => {
      const from = new Date(t.getFullYear(), t.getMonth() + 1, t.getDate())
      return { from, to: new Date(from.getFullYear(), from.getMonth(), from.getDate() + 6) }
    },
  },
]

export default function HolidayBooking() {
  const [range, setRange] = React.useState<DateRange | null>(null)
  const nights = range ? Math.round((range.to.getTime() - range.from.getTime()) / 86400000) : 0

  return (
    <div className="mx-auto min-h-svh max-w-md bg-background px-4 py-10 text-foreground">
      <p className="text-sm text-muted-foreground">Ericeira, Portugal · Sleeps 6</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">The Oak House</h1>
      <div className="mt-6 rounded-2xl border p-5">
        <p className="text-sm">
          <span className="text-xl font-semibold">€{NIGHTLY}</span> <span className="text-muted-foreground">a night</span>
        </p>
        <DateRangePicker
          label="Check in – check out"
          placeholder="Add your dates"
          value={range}
          onValueChange={setRange}
          min={startOfToday()}
          presets={presets}
          locale="en-GB"
          className="mt-4 max-w-none"
        />
        <dl aria-live="polite" className="mt-5 space-y-1.5 text-sm">
          {nights > 0 ? (
            <>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">
                  €{NIGHTLY} × {nights} {nights === 1 ? "night" : "nights"}
                </dt>
                <dd>€{NIGHTLY * nights}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Cleaning</dt>
                <dd>€{CLEANING}</dd>
              </div>
              <div className="flex justify-between border-t pt-2 font-medium">
                <dt>Total</dt>
                <dd>€{NIGHTLY * nights + CLEANING}</dd>
              </div>
            </>
          ) : (
            <div>
              <dt className="sr-only">Price</dt>
              <dd className="text-muted-foreground">{range ? "Pick at least one night." : "Pick your dates to see the price."}</dd>
            </div>
          )}
        </dl>
        <button
          type="button"
          disabled={nights < 1}
          className="mt-5 w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground outline-none hover:opacity-90 focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-50"
        >
          Reserve
        </button>
      </div>
    </div>
  )
}
