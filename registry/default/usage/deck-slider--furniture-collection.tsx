"use client"

import * as React from "react"

import { DeckSlider, type DeckSlide } from "@/registry/default/ui/deck-slider"

export const meta = {
  title: "Furniture collection",
  description: "A deck slider on a furniture shop's collection page; the details beside it follow the piece in front.",
}

// Hearth & Grain and its pieces are made up.
const pieces = [
  {
    id: "ochre",
    name: "Ochre lounge chair",
    price: "€690",
    note: "Wool bouclé on a solid ash frame.",
    photo: "1586023492125-27b2c045efd7",
    alt: "A yellow armchair beside a floor lamp in a white room",
  },
  {
    id: "dune",
    name: "Dune three-seater",
    price: "€1,840",
    note: "Deep seat, washable linen covers.",
    photo: "1578500494198-246f612d3b3d",
    alt: "A tan sofa with a grey throw and dried grasses in a vase",
  },
  {
    id: "harbour",
    name: "Harbour sofa",
    price: "€2,150",
    note: "Modular, in four shades of grey.",
    photo: "1618221195710-dd6b41faaea6",
    alt: "A grey sofa in a bright living room with wooden tables",
  },
  {
    id: "loft",
    name: "Loft lounge set",
    price: "€2,980",
    note: "Sofa, two chairs and a low table.",
    photo: "1556228453-efd6c1ff04f6",
    alt: "A leather sofa and two pink armchairs around a low table",
  },
  {
    id: "rest",
    name: "Rest bed frame",
    price: "€1,120",
    note: "Oiled oak, made to order in six weeks.",
    photo: "1582719478250-c89cae4dc85b",
    alt: "A low bed in a sunlit room with a wooden floor",
  },
]

const slides: DeckSlide[] = pieces.map((piece) => ({
  id: piece.id,
  label: piece.name,
  content: (
    <img
      src={`https://images.unsplash.com/photo-${piece.photo}?w=640&h=860&fit=crop&auto=format&q=80`}
      alt={piece.alt}
      draggable={false}
      className="size-full object-cover"
    />
  ),
}))

export default function FurnitureCollection() {
  const [index, setIndex] = React.useState(1)
  const piece = pieces[index]

  return (
    <div className="mx-auto min-h-svh max-w-5xl bg-background px-6 py-10 text-foreground">
      <p className="text-sm font-semibold tracking-tight">Hearth &amp; Grain</p>
      <div className="mt-8 grid items-center gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <DeckSlider slides={slides} index={index} onIndexChange={setIndex} label="The Slow Living collection" />
        <div aria-live="polite">
          <p className="text-sm text-muted-foreground">The Slow Living collection</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">{piece.name}</h1>
          <p className="mt-2 text-muted-foreground">{piece.note}</p>
          <p className="mt-6 text-2xl font-medium tabular-nums">{piece.price}</p>
          <button
            type="button"
            className="mt-6 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background outline-none hover:opacity-90 focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            Add to basket
          </button>
        </div>
      </div>
    </div>
  )
}
