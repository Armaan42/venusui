"use client"

import * as React from "react"

import { RadioTuner, type RadioStation } from "@/registry/default/ui/radio-tuner"

export const meta = {
  title: "Local radio guide",
  description: "The radio tuner in a city guide app's radio section, showing what's on each local station as you tune.",
}

// The stations and shows are made up.
const STATIONS: (RadioStation & { show: string })[] = [
  { frequency: 89.6, name: "Harbour FM", genre: "News and traffic", show: "The Morning Run, with Rosa Ribeiro" },
  { frequency: 93.8, name: "Ridgeway Radio", genre: "Local voices", show: "Kitchen Table: listeners' recipes" },
  { frequency: 99.2, name: "Night Owl", genre: "Late-night jazz", show: "Slow Records, until 2am" },
  { frequency: 104.6, name: "Coastline", genre: "Indie and folk", show: "New This Week" },
]

export default function LocalStations() {
  const [station, setStation] = React.useState<(typeof STATIONS)[number] | null>(STATIONS[2])

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <p className="text-sm text-muted-foreground">Halden City Guide · Radio</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">On the air near you</h1>
      <RadioTuner
        className="mt-8"
        stations={STATIONS}
        defaultFrequency={99.2}
        onTune={(_, found) => setStation(found ? (STATIONS.find((s) => s.frequency === found.frequency) ?? null) : null)}
      />
      <div role="status" className="mt-6 rounded-xl border bg-card p-5 text-sm">
        {station ? (
          <>
            <p className="font-medium">
              {station.name} · {station.frequency} FM
            </p>
            <p className="mt-1 text-muted-foreground">On now: {station.show}</p>
          </>
        ) : (
          <p className="text-muted-foreground">Just static here. Keep turning.</p>
        )}
      </div>
    </div>
  )
}
