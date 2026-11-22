import { Radio } from "lucide-react"

import { NixieTubes } from "@/registry/default/ui/nixie-tubes"

export const meta = {
  title: "Community radio countdown",
  description: "Nixie tubes counting down on a community radio station's page to the next live show.",
}

// The station, show and hosts are made up.
export default function RadioStation() {
  return (
    <div className="dark bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-14 text-center">
        <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <Radio aria-hidden="true" className="size-4" />
          Ridgeway Community Radio · 97.3 FM
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Night Shift starts in</h1>
        <NixieTubes className="mx-auto mt-8" value="01:24:09" label="Hours, minutes and seconds until Night Shift" />
        <p className="mx-auto mt-8 max-w-md text-muted-foreground">
          Three hours of slow records and listeners&apos; stories, with Mei Lin and Jonas Keller. Call in from midnight on 210 000 973.
        </p>
      </div>
    </div>
  )
}
