"use client"

import * as React from "react"

import { SlidingPuzzle } from "@/registry/default/ui/sliding-puzzle"

export const meta = {
  title: "Children's museum game",
  description: "The sliding puzzle in a children's museum app: put the mountain picture back together to collect a sticker.",
}

// Sample photo. Swap in your own. The museum and gallery are made up.
const PHOTO = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop&auto=format&q=80"

export default function KidsMuseum() {
  const [moves, setMoves] = React.useState<number | null>(null)

  return (
    <div className="mx-auto grid max-w-4xl grid-cols-[minmax(0,1fr)] items-center gap-10 px-6 py-12 md:grid-cols-[auto_minmax(0,1fr)]">
      <SlidingPuzzle className="mx-auto" size={3} src={PHOTO} alt="Snowy peaks above a sea of cloud" onSolve={setMoves} />
      <div>
        <p className="text-sm text-muted-foreground">Brightwater Discovery Museum · Mountains gallery</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">Fix the mountain</h1>
        <p className="mt-2 text-muted-foreground">The picture got mixed up! Slide the pieces into the empty space until the mountain is back together.</p>
        <p role="status" className="mt-6 rounded-xl border bg-card p-5 text-sm">
          {moves === null ? (
            <span className="text-muted-foreground">Finish it to collect the Mountains sticker for your passport.</span>
          ) : (
            <span>
              <span className="font-medium">Solved in {moves} moves!</span> Show this screen at the desk for your sticker.
            </span>
          )}
        </p>
      </div>
    </div>
  )
}
