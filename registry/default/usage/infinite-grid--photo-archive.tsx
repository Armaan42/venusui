"use client"

import * as React from "react"

import { InfiniteGrid, type InfiniteGridItem } from "@/registry/default/ui/infinite-grid"

export const meta = {
  title: "Photographer's archive",
  description: "An infinite grid as the home of a landscape photographer's archive; choosing a photo shows its details beside the wall.",
}

// Ilse Varga is a made-up photographer.
const photos: (InfiniteGridItem & { place: string; year: number })[] = [
  {
    id: "1464822759023-fed622ff2c3b",
    title: "Wide valley",
    place: "Banff, Canada",
    year: 2021,
    alt: "A mountain valley with snowy peaks and pine forest",
  },
  {
    id: "1470071459604-3b5ec3a7fe05",
    title: "Green cliffs",
    place: "Isle of Skye, Scotland",
    year: 2019,
    alt: "Green cliffs and mist at sunrise",
  },
  {
    id: "1476610182048-b716b8518aae",
    title: "Falls",
    place: "South Iceland",
    year: 2022,
    alt: "A tall waterfall falling from a green cliff",
  },
  {
    id: "1501785888041-af3ef285b470",
    title: "Still water",
    place: "Dolomites, Italy",
    year: 2023,
    alt: "A rowing boat on a turquoise mountain lake",
  },
  {
    id: "1506905925346-21bda4d32df4",
    title: "Above the clouds",
    place: "Swiss Alps",
    year: 2020,
    alt: "Mountain peaks above a sea of clouds",
  },
  { id: "1507525428034-b723cf961d3e", title: "Low tide", place: "Algarve, Portugal", year: 2024, alt: "Waves on a sandy beach at sunset" },
  {
    id: "1510798831971-661eb04b3739",
    title: "First snow",
    place: "Lapland, Finland",
    year: 2022,
    alt: "A wooden cabin lit up among snowy pines",
  },
  {
    id: "1473580044384-7ba9967e16a0",
    title: "Dunes",
    place: "Erg Chebbi, Morocco",
    year: 2018,
    alt: "Rippled sand dunes under a hazy sun",
  },
  {
    id: "1504893524553-b855bce32c67",
    title: "Gorge",
    place: "Vintgar, Slovenia",
    year: 2021,
    alt: "A river running through a deep green gorge",
  },
  {
    id: "1531366936337-7c912a4589a7",
    title: "Night sky",
    place: "Tromsø, Norway",
    year: 2023,
    alt: "Green and violet northern lights over snow",
  },
].map((photo) => ({
  ...photo,
  caption: `${photo.place}, ${photo.year}`,
  src: `https://images.unsplash.com/photo-${photo.id}?w=440&h=560&fit=crop&auto=format&q=75`,
}))

export default function PhotoArchive() {
  const [selected, setSelected] = React.useState(photos[3])

  return (
    <div className="dark min-h-svh bg-background px-4 py-8 text-foreground sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Ilse Varga · Landscapes 2018 – 2024</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">The archive</h1>
          </div>
          <p className="text-sm text-muted-foreground">Drag to explore. Choose a photo for its story.</p>
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <InfiniteGrid
            items={photos}
            label="Photo archive"
            onSelect={(item) => setSelected(photos.find((p) => p.id === item.id) ?? photos[0])}
            className="h-[34rem]"
          />
          <aside aria-live="polite" className="rounded-3xl border bg-card p-4">
            <img src={selected.src} alt={selected.alt} className="aspect-[4/5] w-full rounded-2xl object-cover" />
            <h2 className="mt-4 font-semibold">{selected.title}</h2>
            <p className="text-sm text-muted-foreground">{selected.caption}</p>
            <p className="mt-3 text-sm">Prints from €120, signed and numbered in editions of 25.</p>
          </aside>
        </div>
      </div>
    </div>
  )
}
