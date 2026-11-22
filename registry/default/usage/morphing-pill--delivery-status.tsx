import { Bike, MessageCircle, Phone } from "lucide-react"

import { MorphingPill } from "@/registry/default/ui/morphing-pill"

export const meta = {
  title: "Live delivery status",
  description: "The morphing pill at the top of a grocery app, showing the delivery countdown and opening up into the rider's details.",
}

// The shop, rider and order are made up.
export default function DeliveryStatus() {
  return (
    <div className="mx-auto max-w-md px-6 py-10">
      <div className="flex justify-center">
        <MorphingPill
          label="Your delivery: arriving in about 4 minutes"
          compact={
            <span className="flex items-center gap-2 px-3 text-sm">
              <Bike aria-hidden="true" className="size-4 text-emerald-400" />
              <span className="font-medium tabular-nums">4 min</span>
            </span>
          }
          expanded={
            <div className="w-[min(20rem,calc(100vw-3rem))] p-4">
              <p className="text-xs text-white/70">Arriving in about 4 minutes</p>
              <p className="mt-1 font-semibold">Carlos is on Rua da Prata</p>
              <p className="text-sm text-white/70">Green bike · 14 items · leave at the door</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button type="button" className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-white/10 text-sm hover:bg-white/15">
                  <MessageCircle aria-hidden="true" className="size-4" />
                  Message
                </button>
                <button type="button" className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-emerald-500 text-sm font-medium text-emerald-950 hover:bg-emerald-400">
                  <Phone aria-hidden="true" className="size-4" />
                  Call
                </button>
              </div>
            </div>
          }
        />
      </div>
      <h1 className="mt-10 text-2xl font-semibold tracking-tight">Good evening, Ana</h1>
      <p className="mt-1 text-muted-foreground">Halden Grocer · your usual Thursday shop is on its way.</p>
      <ul className="mt-6 divide-y border-y text-sm">
        {["Sourdough loaf", "Free-range eggs, 12", "Tomatoes on the vine", "Oat milk, 2 × 1 L"].map((item) => (
          <li key={item} className="py-3">
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-sm text-muted-foreground">+ 10 more items</p>
    </div>
  )
}
