"use client"

import * as React from "react"
import { Lightbulb } from "lucide-react"

import { RadialSlider } from "@/registry/default/ui/radial-slider"

export const meta = {
  title: "Smart lights",
  description: "Radial sliders in a home app: brightness and colour warmth for the living-room lights, with a live preview of the light.",
}

/** Approximate colour of white light at a temperature, warm to cool. */
function kelvinToColour(kelvin: number) {
  const t = (kelvin - 2700) / (6500 - 2700)
  const mix = (a: number, b: number) => Math.round(a + (b - a) * t)
  return `rgb(${mix(255, 220)} ${mix(184, 232)} ${mix(108, 255)})`
}

export default function SmartLights() {
  const [brightness, setBrightness] = React.useState(70)
  const [warmth, setWarmth] = React.useState(3000)

  return (
    <div className="mx-auto min-h-svh max-w-3xl bg-background px-6 py-10 text-foreground">
      <p className="text-sm text-muted-foreground">Home · Ground floor</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">Living room</h1>

      <div className="mt-8 rounded-3xl border bg-card p-6">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="grid size-11 place-items-center rounded-full text-neutral-900 transition-[background-color,box-shadow]"
            style={{
              backgroundColor: kelvinToColour(warmth),
              boxShadow: `0 0 ${brightness / 2}px ${brightness / 6}px ${kelvinToColour(warmth)}`,
              opacity: 0.35 + (brightness / 100) * 0.65,
            }}
          >
            <Lightbulb className="size-5" />
          </span>
          <div>
            <p className="font-medium">Ceiling and floor lamps</p>
            <p className="text-sm text-muted-foreground">
              {brightness}% · {warmth.toLocaleString("en-GB")} K
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-10">
          <RadialSlider label="Brightness" value={brightness} onValueChange={setBrightness} marks={[0, 50, 100]} format={(v) => `${v}%`} />
          <RadialSlider
            label="Warmth"
            value={warmth}
            onValueChange={setWarmth}
            min={2700}
            max={6500}
            step={100}
            marks={[2700, 4000, 5300, 6500]}
            format={(v) => `${(v / 1000).toFixed(1)}k`}
          />
        </div>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Warmer light (around 2,700 K) is easier on the eyes in the evening.
        </p>
      </div>
    </div>
  )
}
