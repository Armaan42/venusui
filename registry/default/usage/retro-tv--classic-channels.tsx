"use client"

import * as React from "react"

import { RetroTv } from "@/registry/default/ui/retro-tv"

export const meta = {
  title: "Streaming app channels",
  description: "The retro TV as the channel picker in a streaming app's always-on channels, with the schedule for what's showing.",
}

// Sample photos. Swap in your own. The app, channels and shows are made up.
const photo = (id: string) => `https://images.unsplash.com/photo-${id}?w=800&h=600&fit=crop&auto=format&q=80`

const CHANNELS = [
  { src: photo("1506905925346-21bda4d32df4"), alt: "Snowy peaks above a sea of cloud", name: "Slow Nature", now: "Above the Clouds", next: "Rivers of the North at 21:00" },
  { src: photo("1504674900247-0877df9cc836"), alt: "Plates of food shared on a wooden table", name: "Kitchen", now: "Sunday Lunch for Ten", next: "One Pan Suppers at 20:30" },
  { src: photo("1493225457124-a3eb161ffa5f"), alt: "A singer on a smoky stage", name: "Live Room", now: "Late Sessions", next: "Open Mic Night at 22:00" },
]

export default function ClassicChannels() {
  const [index, setIndex] = React.useState(0)
  const channel = CHANNELS[index]

  return (
    <div className="mx-auto grid max-w-4xl grid-cols-[minmax(0,1fr)] items-center gap-10 px-6 py-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <RetroTv className="mx-auto w-full" channels={CHANNELS} onChannelChange={setIndex} />
      <div>
        <p className="text-sm text-muted-foreground">Halcyon TV · Always on</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">{channel.name}</h1>
        <dl className="mt-6 divide-y border-y text-sm">
          <div className="flex justify-between gap-4 py-3">
            <dt className="text-muted-foreground">Now</dt>
            <dd className="font-medium">{channel.now}</dd>
          </div>
          <div className="flex justify-between gap-4 py-3">
            <dt className="text-muted-foreground">Next</dt>
            <dd>{channel.next}</dd>
          </div>
        </dl>
        <p className="mt-4 text-sm text-muted-foreground">Turn the dial to switch channels. Nothing to pick, nothing to scroll.</p>
      </div>
    </div>
  )
}
