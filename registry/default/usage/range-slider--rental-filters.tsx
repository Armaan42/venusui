"use client"

import * as React from "react"

import { RangeSlider } from "@/registry/default/ui/range-slider"

export const meta = {
  title: "Rental search filters",
  description:
    "Range sliders in a flat-rental search: monthly rent with a histogram of listings, and size in square metres, updating the result count.",
}

// Made-up listings: rent per month and size.
const listings = Array.from({ length: 240 }, (_, i) => {
  const rent = Math.round(700 + Math.abs((Math.sin(i * 12.9898) * 43758.5453) % 1) * 2300)
  const size = Math.round(28 + Math.abs((Math.sin(i * 78.233) * 12345.678) % 1) * 92)
  return { rent, size }
})

const RENT: [number, number] = [600, 3000]
const buckets = 24
const histogram = Array.from({ length: buckets }, (_, b) => {
  const from = RENT[0] + ((RENT[1] - RENT[0]) / buckets) * b
  const to = from + (RENT[1] - RENT[0]) / buckets
  return listings.filter((l) => l.rent >= from && l.rent < to).length
})

export default function RentalFilters() {
  const [rent, setRent] = React.useState<[number, number]>([1100, 2200])
  const [size, setSize] = React.useState<[number, number]>([45, 90])
  const matches = listings.filter((l) => l.rent >= rent[0] && l.rent <= rent[1] && l.size >= size[0] && l.size <= size[1]).length

  return (
    <div className="mx-auto min-h-svh max-w-md bg-background px-6 py-10 text-foreground">
      <p className="text-sm text-muted-foreground">Lisbon · Flats to rent</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">Filters</h1>

      <section aria-labelledby="rent-title" className="mt-8">
        <h2 id="rent-title" className="text-sm font-medium">
          Monthly rent
        </h2>
        <RangeSlider
          label="Monthly rent"
          min={RENT[0]}
          max={RENT[1]}
          step={50}
          minGap={100}
          value={rent}
          onValueChange={setRent}
          histogram={histogram}
          format={(v) => `€${v.toLocaleString("en-GB")}`}
          className="mt-3"
        />
      </section>

      <section aria-labelledby="size-title" className="mt-8">
        <h2 id="size-title" className="text-sm font-medium">
          Size
        </h2>
        <RangeSlider
          label="Size"
          min={25}
          max={120}
          step={5}
          minGap={10}
          value={size}
          onValueChange={setSize}
          format={(v) => `${v} m²`}
          className="mt-1"
        />
      </section>

      <button
        type="button"
        className="mt-10 w-full rounded-xl bg-foreground py-3 text-sm font-medium text-background outline-none hover:opacity-90 focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <span aria-live="polite">Show {matches} flats</span>
      </button>
    </div>
  )
}
