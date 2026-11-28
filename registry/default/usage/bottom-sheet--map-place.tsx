"use client"

import * as React from "react"
import { Clock, MapPin, Navigation, Phone, Star } from "lucide-react"

import { BottomSheet } from "@/registry/default/ui/bottom-sheet"

export const meta = {
  title: "Place details on a map",
  description: "A bottom sheet in a city-guide app: tap a place on the map to see it half-open, drag it up for opening hours and reviews.",
}

// Kiln Corner and its details are made up.
export default function MapPlace() {
  const [open, setOpen] = React.useState(true)
  return (
    <div className="relative min-h-svh overflow-hidden bg-[#e8ece6] text-foreground dark:bg-[#1c211d]">
      {/* A simple drawn map: streets and a park. */}
      <svg aria-hidden="true" className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 400 800">
        <rect x="230" y="120" width="140" height="180" rx="16" className="fill-emerald-200/70 dark:fill-emerald-900/40" />
        <path
          d="M-10 240 L410 200 M60 -10 L120 810 M-10 520 L410 470 M300 -10 L260 810"
          className="stroke-white dark:stroke-neutral-700"
          strokeWidth="18"
          fill="none"
        />
        <path d="M-10 380 L410 360" className="stroke-amber-200 dark:stroke-amber-900/60" strokeWidth="26" fill="none" />
      </svg>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Kiln Corner, café"
        className="absolute top-[42%] left-[46%] grid size-11 -translate-1/2 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
      >
        <MapPin aria-hidden="true" className="size-5" />
      </button>

      <BottomSheet
        open={open}
        onOpenChange={setOpen}
        title="Kiln Corner"
        description="Café and bakery · 4 min walk"
        snapPoints={[0.42, 0.9]}
      >
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&h=500&fit=crop&auto=format&q=80"
          alt="Inside the café: wooden tables and warm lights"
          className="aspect-[16/9] w-full rounded-2xl object-cover"
        />
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            { icon: Navigation, label: "Directions" },
            { icon: Phone, label: "Call" },
          ].map((a) => (
            <button
              key={a.label}
              type="button"
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <a.icon aria-hidden="true" className="size-4" />
              {a.label}
            </button>
          ))}
        </div>
        <p className="mt-4 flex items-center gap-1.5 text-sm">
          <Star aria-hidden="true" className="size-4 fill-amber-400 text-amber-400" />
          <span className="font-medium">4.7</span>
          <span className="text-muted-foreground">from 312 reviews</span>
        </p>
        <h3 className="mt-6 flex items-center gap-2 font-medium">
          <Clock aria-hidden="true" className="size-4" />
          Opening hours
        </h3>
        <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-sm">
          {[
            ["Monday – Friday", "07:30 – 18:00"],
            ["Saturday", "08:00 – 18:00"],
            ["Sunday", "09:00 – 15:00"],
          ].map(([d, h]) => (
            <React.Fragment key={d}>
              <dt className="text-muted-foreground">{d}</dt>
              <dd>{h}</dd>
            </React.Fragment>
          ))}
        </dl>
        <h3 className="mt-6 font-medium">What people say</h3>
        <ul className="mt-2 space-y-3 text-sm">
          <li className="rounded-xl bg-muted/60 p-3">“The cardamom buns sell out by ten. Go early.”</li>
          <li className="rounded-xl bg-muted/60 p-3">“Quiet in the afternoons, good for working.”</li>
        </ul>
      </BottomSheet>
    </div>
  )
}
