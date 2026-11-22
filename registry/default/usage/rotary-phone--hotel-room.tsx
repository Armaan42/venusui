"use client"

import * as React from "react"

import { RotaryPhone } from "@/registry/default/ui/rotary-phone"

export const meta = {
  title: "Boutique hotel room guide",
  description: "The rotary phone in a boutique hotel's in-room guide: dial a short number to reach each part of the hotel.",
}

// The hotel, extensions and staff are made up.
const EXTENSIONS: Record<string, string> = {
  "0": "Reception",
  "4": "Room service",
  "7": "The spa",
  "9": "A taxi",
}

export default function HotelRoom() {
  const [calling, setCalling] = React.useState<string | null>(null)

  return (
    <div className="mx-auto grid max-w-4xl grid-cols-[minmax(0,1fr)] items-center gap-10 px-6 py-12 md:grid-cols-[auto_minmax(0,1fr)]">
      <RotaryPhone className="mx-auto" maxDigits={1} sound={false} onCall={(number) => setCalling(EXTENSIONS[number] ?? "an extension that doesn't exist")} />
      <div>
        <p className="text-sm text-muted-foreground">Casa Tidewell · Room 12</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">Need anything? Just dial.</h1>
        <dl className="mt-6 divide-y border-y text-sm">
          {Object.entries(EXTENSIONS).map(([digit, place]) => (
            <div key={digit} className="flex justify-between gap-4 py-3">
              <dt>{place}</dt>
              <dd className="font-mono tabular-nums">{digit}</dd>
            </div>
          ))}
        </dl>
        <p role="status" className="mt-4 text-sm text-muted-foreground">
          {calling ? `Calling ${calling}…` : "Breakfast is served on the terrace from 7:30."}
        </p>
      </div>
    </div>
  )
}
