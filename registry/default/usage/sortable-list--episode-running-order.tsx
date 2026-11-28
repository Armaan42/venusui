"use client"

import * as React from "react"

import { SortableList, type SortableItem } from "@/registry/default/ui/sortable-list"

export const meta = {
  title: "Podcast running order",
  description: "A sortable list for planning a podcast episode: drag segments into order and the start times and total length update.",
}

// The show and segments are made up.
const segments = [
  { id: "intro", title: "Cold open", minutes: 2 },
  { id: "news", title: "This week in design", minutes: 9 },
  { id: "guest", title: "Interview: Ana Ribeiro", minutes: 24 },
  { id: "mail", title: "Listener questions", minutes: 8 },
  { id: "picks", title: "Picks of the week", minutes: 5 },
]

const clock = (m: number) => `${Math.floor(m / 60)}:${String(m % 60).padStart(2, "0")}`

export default function EpisodeRunningOrder() {
  const [order, setOrder] = React.useState(segments.map((s) => s.id))
  const byId = new Map(segments.map((s) => [s.id, s]))
  const starts = new Map<string, number>()
  order.reduce((t, id) => {
    starts.set(id, t)
    return t + byId.get(id)!.minutes
  }, 0)

  const items: SortableItem[] = segments.map((s) => ({
    id: s.id,
    label: s.title,
    content: (
      <div className="flex items-center gap-3 text-sm">
        <span className="w-10 shrink-0 text-muted-foreground tabular-nums">{clock(starts.get(s.id) ?? 0)}</span>
        <span className="min-w-0 flex-1 truncate font-medium">{s.title}</span>
        <span className="shrink-0 text-muted-foreground tabular-nums">{s.minutes} min</span>
      </div>
    ),
  }))

  const total = segments.reduce((sum, s) => sum + s.minutes, 0)

  return (
    <div className="mx-auto min-h-svh max-w-xl bg-background px-4 py-10 text-foreground">
      <p className="text-sm text-muted-foreground">Field Notes · Episode 44</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">Running order</h1>
      <p className="mt-1 text-sm text-muted-foreground">Drag segments by their handle. Start times follow the order.</p>
      <SortableList items={items} label="Running order" onReorder={(next) => setOrder(next.map((i) => i.id))} className="mt-6" />
      <p className="mt-4 text-right text-sm">
        Total <span className="font-medium tabular-nums">{total} min</span>
      </p>
    </div>
  )
}
