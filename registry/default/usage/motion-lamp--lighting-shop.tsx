"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { MotionLamp } from "@/registry/default/ui/motion-lamp"

export const meta = {
  title: "Lighting shop product page",
  description: "The motion lamp on a lighting shop's product page, where switching colour updates the variant you add to the basket.",
}

// The shop and lamp are made up.
export default function LightingShop() {
  const [color, setColor] = React.useState<string | null>(null)

  return (
    <div className="mx-auto grid max-w-4xl grid-cols-[minmax(0,1fr)] items-center gap-10 px-6 py-12 md:grid-cols-[auto_minmax(0,1fr)]">
      <MotionLamp className="mx-auto" onColorChange={(c) => setColor(c.name)} />
      <div>
        <p className="text-sm text-muted-foreground">Oakline Lighting · Bedside</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">The Drift lamp</h1>
        <p className="mt-2 text-muted-foreground">
          Warm wax rises and falls in slow blobs. It takes about 40 minutes to get going, then runs quietly all evening.
        </p>
        <p className="mt-4 text-2xl font-semibold">€59</p>
        <p className="mt-4 text-sm">
          Colour: <span className="font-medium">{color ?? "pick one on the lamp"}</span>
        </p>
        <Button className="mt-4" disabled={!color}>
          Add to basket
        </Button>
        <p className="mt-3 text-xs text-muted-foreground">Comes with a spare bulb. Free returns within 30 days.</p>
      </div>
    </div>
  )
}
