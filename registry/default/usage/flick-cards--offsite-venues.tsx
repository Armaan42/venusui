"use client"

import * as React from "react"

import { FlickCards, type FlickCard } from "@/registry/default/ui/flick-cards"

export const meta = {
  title: "Shortlisting offsite venues",
  description: "Flick cards in a team-planning tool: flick right to shortlist a venue for the spring offsite, left to pass.",
}

// The venues and prices are made up.
const venues = [
  {
    id: "palms",
    name: "Casa Palmeira",
    detail: "Pool, 24 rooms · €180 a night",
    photo: "1566073771259-6a8506099945",
    alt: "A hotel pool with sun loungers beside a wooden lodge",
  },
  {
    id: "cabin",
    name: "Pinehollow Cabins",
    detail: "Sauna, 10 cabins · €120 a night",
    photo: "1510798831971-661eb04b3739",
    alt: "A wooden cabin lit up among snowy pine trees",
  },
  {
    id: "bay",
    name: "Blue Bay Retreat",
    detail: "Beach, 30 rooms · €210 a night",
    photo: "1520250497591-112f2f40a3f4",
    alt: "A resort pool among palm trees with mountains behind",
  },
  {
    id: "edge",
    name: "Forest Edge House",
    detail: "Workshop barn, 14 rooms · €140 a night",
    photo: "1542718610-a1d656d1884c",
    alt: "A dark wooden house at the edge of a forest at sunset",
  },
  {
    id: "glass",
    name: "The Glasshouse",
    detail: "Meeting rooms, 18 rooms · €230 a night",
    photo: "1600585154340-be6161a56a0c",
    alt: "A modern glass house lit up at dusk under a large tree",
  },
]

const cards: FlickCard[] = venues.map((venue) => ({
  id: venue.id,
  label: venue.name,
  content: (
    <div className="flex size-full flex-col">
      <img
        src={`https://images.unsplash.com/photo-${venue.photo}?w=600&h=560&fit=crop&auto=format&q=80`}
        alt={venue.alt}
        draggable={false}
        className="min-h-0 flex-1 object-cover"
      />
      <div className="p-4">
        <p className="font-semibold">{venue.name}</p>
        <p className="text-sm text-muted-foreground">{venue.detail}</p>
      </div>
    </div>
  ),
}))

export default function OffsiteVenues() {
  const [shortlist, setShortlist] = React.useState<string[]>([])

  return (
    <div className="mx-auto grid min-h-svh max-w-4xl items-start gap-10 bg-background px-6 py-10 text-foreground md:grid-cols-[minmax(0,1fr)_16rem]">
      <div>
        <p className="text-sm text-muted-foreground">Spring offsite · 22 people · 3 nights</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">Pick the venues to visit</h1>
        <div className="mt-8 flex justify-center md:justify-start">
          <FlickCards
            cards={cards}
            leftLabel="Pass"
            rightLabel="Shortlist"
            empty="You've seen every venue."
            onFlick={(card, direction) =>
              setShortlist((list) =>
                direction === "right"
                  ? [...list.filter((name) => name !== card.label), card.label]
                  : list.filter((name) => name !== card.label),
              )
            }
          />
        </div>
      </div>
      <section aria-labelledby="shortlist-title" className="rounded-2xl border bg-card p-5">
        <h2 id="shortlist-title" className="font-semibold">
          Shortlist <span className="text-muted-foreground">({shortlist.length})</span>
        </h2>
        {shortlist.length ? (
          <ol className="mt-3 space-y-2 text-sm">
            {shortlist.map((name, i) => (
              <li key={name} className="flex gap-2">
                <span className="text-muted-foreground tabular-nums">{i + 1}.</span>
                {name}
              </li>
            ))}
          </ol>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">Flick a venue right to add it here.</p>
        )}
      </section>
    </div>
  )
}
