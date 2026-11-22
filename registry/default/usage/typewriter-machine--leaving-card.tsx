"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { TypewriterMachine } from "@/registry/default/ui/typewriter-machine"

export const meta = {
  title: "Leaving card for a colleague",
  description: "The typewriter in a group leaving-card app, where each colleague types a note for someone retiring.",
}

// The company, people and notes are made up.
const NOTES = [
  { from: "Jonas", text: "Twenty years of the best coffee advice in the building. The kettle won't know what to do." },
  { from: "Priya", text: "Thank you for teaching me how to read a balance sheet without crying." },
]

export default function LeavingCard() {
  const [text, setText] = React.useState("")

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <p className="text-sm text-muted-foreground">Northlight · Leaving card · 14 colleagues signed</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">Happy retirement, Inês</h1>
      <ul className="mt-6 space-y-3 text-sm">
        {NOTES.map((note) => (
          <li key={note.from} className="rounded-lg border p-4">
            <p>{note.text}</p>
            <p className="mt-2 text-muted-foreground">{note.from}</p>
          </li>
        ))}
      </ul>
      <h2 className="mt-8 text-sm font-medium">Your note</h2>
      <TypewriterMachine className="mt-3" defaultValue={"Dear Inês,\n"} columns={40} onValueChange={setText} />
      <Button className="mt-6" disabled={text.trim().length === 0}>
        Add to the card
      </Button>
    </div>
  )
}
