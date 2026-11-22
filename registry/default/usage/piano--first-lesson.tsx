"use client"

import * as React from "react"
import { Check } from "lucide-react"

import { Piano } from "@/registry/default/ui/piano"

export const meta = {
  title: "First piano lesson",
  description: "The piano in a beginner's lesson app: play the C major chord one note at a time and the lesson ticks each one off.",
}

// The app and lesson are made up.
const CHORD = ["C4", "E4", "G4"]

export default function FirstLesson() {
  const [played, setPlayed] = React.useState<string[]>([])
  const done = CHORD.every((note) => played.includes(note))

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <p className="text-sm text-muted-foreground">Copperleaf Music · Piano for grown-ups · Lesson 1</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">Your first chord: C major</h1>
      <p className="mt-2 text-muted-foreground">Find C (the white key just left of the two black keys), then skip a key to E, and skip another to G.</p>
      <ul aria-label="Notes to play" className="mt-6 flex gap-3">
        {CHORD.map((note) => {
          const hit = played.includes(note)
          return (
            <li key={note} className={hit ? "flex items-center gap-1.5 rounded-full bg-foreground px-3 py-1 text-sm text-background" : "rounded-full border px-3 py-1 text-sm"}>
              {hit ? <Check aria-hidden="true" className="size-3.5" /> : null}
              {note.replace(/\d/, "")}
            </li>
          )
        })}
      </ul>
      <Piano className="mt-6" octaves={2} startOctave={4} onNote={(note) => setPlayed((list) => (list.includes(note) ? list : [...list, note]))} />
      <p role="status" className="mt-6 text-sm">
        {done ? <span className="font-medium">That&apos;s a C major chord. Now try all three at once.</span> : <span className="text-muted-foreground">Play C, E and G in the lower octave.</span>}
      </p>
    </div>
  )
}
