import { KanbanBoard, type KanbanColumn } from "@/registry/default/ui/kanban-board"

export const meta = {
  title: "Sprint board",
  description: "A kanban board for a product team's two-week sprint, with labels and owners on each card.",
}

// The team, product and tasks are made up.
const label = (text: string, tone: string, owner: string) => (
  <span className="flex items-center justify-between gap-2">
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${tone}`}>{text}</span>
    <span className="text-xs">{owner}</span>
  </span>
)

const design = "bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-300"
const eng = "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300"
const bug = "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300"

const columns: KanbanColumn[] = [
  {
    id: "backlog",
    title: "Backlog",
    cards: [
      { id: "export", title: "Export reports as CSV", content: label("Feature", eng, "Daniel") },
      { id: "empty", title: "Empty states for new teams", content: label("Design", design, "Leo") },
    ],
  },
  {
    id: "sprint",
    title: "This sprint",
    cards: [
      { id: "invite", title: "Invite flow with roles", content: label("Feature", eng, "Amara") },
      { id: "timezone", title: "Dates show in the wrong time zone", content: label("Bug", bug, "Daniel") },
    ],
  },
  {
    id: "review",
    title: "In review",
    cards: [{ id: "onboarding", title: "Onboarding checklist", content: label("Design", design, "Rui") }],
  },
  { id: "shipped", title: "Shipped", cards: [] },
]

export default function ProductRoadmap() {
  return (
    <div className="min-h-svh bg-background px-4 py-10 text-foreground sm:px-8">
      <p className="text-sm text-muted-foreground">Pulsewise · Sprint 31 · 18 Nov – 2 Dec</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">Sprint board</h1>
      <KanbanBoard columns={columns} label="Sprint 31" className="mt-6" />
    </div>
  )
}
