"use client"

import * as React from "react"

import { OracleBall } from "@/registry/default/ui/oracle-ball"

export const meta = {
  title: "Party game app",
  description: "The oracle ball in a party game app: each player asks a question out loud, shakes the ball and takes the answer.",
}

// The game and players are made up.
const ANSWERS = ["Yes, but only after dessert", "Ask the person on your left", "Not tonight", "Definitely", "Sing it, then ask again", "The answer is in the kitchen"]

export default function PartyGame() {
  const [log, setLog] = React.useState<string[]>([])

  return (
    <div className="mx-auto grid max-w-4xl grid-cols-[minmax(0,1fr)] items-center gap-10 px-6 py-12 md:grid-cols-[auto_minmax(0,1fr)]">
      <OracleBall className="mx-auto" answers={ANSWERS} onAnswer={(answer) => setLog((list) => [answer, ...list].slice(0, 4))} />
      <div>
        <p className="text-sm text-muted-foreground">Halden Games · Party pack</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">Ask the oracle</h1>
        <p className="mt-2 text-muted-foreground">Pass the phone round. Ask a yes-or-no question out loud, then shake. No arguing with the oracle.</p>
        <h2 className="mt-6 text-sm font-medium">Tonight&apos;s answers</h2>
        <ul className="mt-2 divide-y border-y text-sm">
          {log.length === 0 ? (
            <li className="py-3 text-muted-foreground">No questions yet.</li>
          ) : (
            log.map((answer, i) => (
              <li key={`${log.length}-${i}`} className="py-3">
                {answer}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  )
}
