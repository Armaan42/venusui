"use client"

import * as React from "react"

import { SlotMachine } from "@/registry/default/ui/slot-machine"

export const meta = {
  title: "Café loyalty app game",
  description: "The slot machine in a café's loyalty app: one free spin a day, and three of a kind wins a free pastry.",
}

// The café and prize are made up. No money involved: one free spin a day.
export default function PastryOfTheDay() {
  const [result, setResult] = React.useState<{ win: boolean } | null>(null)

  return (
    <div className="mx-auto grid max-w-4xl grid-cols-[minmax(0,1fr)] items-center gap-10 px-6 py-12 md:grid-cols-[auto_minmax(0,1fr)]">
      <SlotMachine className="mx-auto" onResult={(_, win) => setResult({ win })} />
      <div>
        <p className="text-sm text-muted-foreground">Kiln Corner Café · Rewards</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">Your free daily spin</h1>
        <p className="mt-2 text-muted-foreground">Line up three of a kind and your next pastry is on us. No purchase needed, one spin a day.</p>
        <p role="status" className="mt-6 rounded-xl border bg-card p-5 text-sm">
          {result === null ? (
            <span className="text-muted-foreground">Pull the lever when you&apos;re ready.</span>
          ) : result.win ? (
            <span>
              <span className="font-medium">Three in a row!</span> A free pastry is waiting in your rewards.
            </span>
          ) : (
            <span className="text-muted-foreground">Not this time. Come back tomorrow for another spin.</span>
          )}
        </p>
      </div>
    </div>
  )
}
