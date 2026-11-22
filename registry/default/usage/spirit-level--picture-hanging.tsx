"use client"

import * as React from "react"
import { Check } from "lucide-react"

import { SpiritLevel } from "@/registry/default/ui/spirit-level"

export const meta = {
  title: "DIY guide: hang a picture",
  description: "The spirit level in a home improvement app's how-to guide, checking the picture rail is straight before you drill.",
}

// The app and guide are made up.
const STEPS = ["Hold the rail at eye height, about 150 cm to the centre", "Level it before you mark the holes", "Drill, plug and screw", "Hang the frames from the rail"]

export default function PictureHanging() {
  const [angle, setAngle] = React.useState(3)
  const level = Math.abs(angle) < 0.5

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <p className="text-sm text-muted-foreground">Oakline Home · How-to · Step 2 of 4</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">Get the rail level</h1>
      <p className="mt-2 text-muted-foreground">Tilt the level until the bubble sits between the lines. Then mark both ends with a pencil.</p>
      <SpiritLevel className="mx-auto mt-8" defaultAngle={3} onAngleChange={setAngle} />
      <p role="status" className="mt-6 flex items-center justify-center gap-2 text-sm">
        {level ? (
          <>
            <Check aria-hidden="true" className="size-4 text-emerald-600 dark:text-emerald-400" />
            <span className="font-medium">Level. Mark your holes.</span>
          </>
        ) : (
          <span className="text-muted-foreground">Not yet. The bubble drifts to the high end, so lower that side.</span>
        )}
      </p>
      <ol className="mt-8 grid gap-2 text-sm sm:grid-cols-2">
        {STEPS.map((step, i) => (
          <li key={step} className={i === 1 ? "rounded-lg border p-3 font-medium" : "rounded-lg border p-3 text-muted-foreground"}>
            {i + 1}. {step}
          </li>
        ))}
      </ol>
    </div>
  )
}
