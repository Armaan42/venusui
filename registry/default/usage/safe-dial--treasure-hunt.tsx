"use client"

import * as React from "react"

import { SafeDial } from "@/registry/default/ui/safe-dial"

export const meta = {
  title: "Birthday treasure hunt",
  description: "The safe dial as the final lock in a kids' birthday treasure hunt app: solve the three clues to open the safe.",
}

// The party and clues are made up. The answers are 12, 40 and 7.
const CLUES = [
  "How many candles are on Leo's cake?",
  "Count the balloons in the hall, then add 4.",
  "Days in a week.",
]

export default function TreasureHunt() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="mx-auto grid max-w-4xl grid-cols-[minmax(0,1fr)] items-center gap-10 px-6 py-12 md:grid-cols-[auto_minmax(0,1fr)]">
      <SafeDial className="mx-auto" code={[12, 40, 7]} onUnlock={() => setOpen(true)} />
      <div>
        <p className="text-sm text-muted-foreground">Leo&apos;s 12th birthday · Last clue</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">Crack the safe</h1>
        <p className="mt-2 text-muted-foreground">Each clue gives one number. Turn the dial to it and press the centre to enter it, in order.</p>
        <ol className="mt-6 space-y-3">
          {CLUES.map((clue, i) => (
            <li key={clue} className="flex gap-3 text-sm">
              <span className="grid size-6 shrink-0 place-items-center rounded-full border text-xs tabular-nums">{i + 1}</span>
              <span className="pt-0.5">{clue}</span>
            </li>
          ))}
        </ol>
        <p role="status" className="mt-6 text-sm font-medium">
          {open ? "It's open! The prize is under the stairs." : ""}
        </p>
      </div>
    </div>
  )
}
