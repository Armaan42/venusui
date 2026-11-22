"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { PaintSwatchFan } from "@/registry/default/ui/paint-swatch-fan"

export const meta = {
  title: "Paint shop room planner",
  description: "The paint swatch fan in a paint shop's room planner: pick a shade and the wall in the preview changes to match.",
}

// The shop and paint names are made up.
const STRIPS = [
  [
    { name: "Pea Shoot", hex: "#e3f5d8" },
    { name: "Sage", hex: "#a9cf9a" },
    { name: "Fern", hex: "#5fa05a" },
    { name: "Racing", hex: "#2f6d3a" },
    { name: "Forest Floor", hex: "#1b3d24" },
  ],
  [
    { name: "Sea Glass", hex: "#d5f2ee" },
    { name: "Lagoon", hex: "#7fd3c8" },
    { name: "Teal", hex: "#2c9c92" },
    { name: "Peacock", hex: "#16655f" },
    { name: "Deep Water", hex: "#0c3b38" },
  ],
  [
    { name: "Apricot Milk", hex: "#feead6" },
    { name: "Marmalade", hex: "#fdba74" },
    { name: "Fox", hex: "#f08a3c" },
    { name: "Rust", hex: "#c2551c" },
    { name: "Conker", hex: "#7c3414" },
  ],
]
const SHADES = STRIPS.flat()

export default function RoomPlanner() {
  const [hex, setHex] = React.useState(STRIPS[2][2].hex)
  const shade = SHADES.find((s) => s.hex === hex) ?? STRIPS[2][2]

  return (
    <div className="mx-auto grid max-w-5xl grid-cols-[minmax(0,1fr)] items-center gap-10 px-6 py-12 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <div>
        <p className="text-sm text-muted-foreground">Ridgeway Paints · Room planner</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">Try it on the wall</h1>
        <div aria-hidden="true" className="relative mt-6 aspect-[16/10] overflow-hidden rounded-xl border" style={{ backgroundColor: shade.hex }}>
          <div className="absolute inset-x-0 bottom-0 h-[22%] bg-[#c8a27a]" />
          <div className="absolute bottom-[22%] left-[12%] h-[34%] w-[38%] rounded-t-lg bg-[#3f3a36]" />
          <div className="absolute top-[18%] right-[16%] h-[30%] w-[22%] border-4 border-white/80 bg-white/30" />
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm">
            <span className="font-medium">{shade.name}</span> <span className="text-muted-foreground">· matt emulsion · €34 for 2.5 L</span>
          </p>
          <Button variant="outline" size="sm">
            Order a tester pot
          </Button>
        </div>
      </div>
      <PaintSwatchFan className="mx-auto w-full" strips={STRIPS} onColorChange={setHex} />
    </div>
  )
}
