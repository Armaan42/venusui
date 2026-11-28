import { SortableList, type SortableItem } from "@/registry/default/ui/sortable-list"

const tasks = [
  { id: "inbox", title: "Clear the inbox", time: "20 min" },
  { id: "review", title: "Review the homepage copy", time: "45 min" },
  { id: "call", title: "Call with the printer", time: "15 min" },
  { id: "invoices", title: "Send the November invoices", time: "30 min" },
  { id: "walk", title: "Walk before lunch", time: "25 min" },
]

const items: SortableItem[] = tasks.map((task) => ({
  id: task.id,
  label: task.title,
  content: (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="font-medium">{task.title}</span>
      <span className="shrink-0 text-muted-foreground tabular-nums">{task.time}</span>
    </div>
  ),
}))

export default function SortableListDemo() {
  return <SortableList items={items} label="Today's plan" className="w-full max-w-md" />
}
