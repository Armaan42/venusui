"use client"

import * as React from "react"

import { TapeMeasure } from "@/registry/default/ui/tape-measure"

export const meta = {
  title: "Furniture shop “will it fit?”",
  description: "The tape measure on a furniture shop's sofa page: measure your wall and it tells you whether the sofa fits.",
}

// The shop and sofa are made up.
const SOFA = 210

export default function WillItFit() {
  const [length, setLength] = React.useState<number | null>(null)

  return (
    <div className="mx-auto max-w-3xl overflow-x-clip px-6 py-12">
      <p className="text-sm text-muted-foreground">Halden Home · Sofas</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">The Weekend sofa, three seats</h1>
      <p className="mt-2 text-muted-foreground">
        {SOFA} cm wide, 92 cm deep. Pull the tape out to the width of your wall to check it fits, with room to walk past.
      </p>
      <TapeMeasure className="mt-8" max={300} unit="cm" onMeasure={setLength} />
      <p role="status" className="mt-6 text-sm">
        {length === null ? (
          <span className="text-muted-foreground">Pull the tape to start.</span>
        ) : length >= SOFA + 20 ? (
          <span className="font-medium">It fits, with {Math.round(length - SOFA)} cm to spare.</span>
        ) : length >= SOFA ? (
          <span className="font-medium">It fits, just. Consider the two-seater if there&apos;s a radiator or door nearby.</span>
        ) : (
          <span className="font-medium">Too tight by {Math.round(SOFA - length)} cm. The two-seater is 168 cm wide.</span>
        )}
      </p>
    </div>
  )
}
