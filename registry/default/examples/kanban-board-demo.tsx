import { KanbanBoard, type KanbanColumn } from "@/registry/default/ui/kanban-board"

const columns: KanbanColumn[] = [
  {
    id: "todo",
    title: "To do",
    cards: [
      { id: "brief", title: "Write the launch brief", content: "Due Friday" },
      { id: "photos", title: "Pick hero photos", content: "Shortlist of 12" },
      { id: "pricing", title: "Check pricing copy" },
    ],
  },
  {
    id: "doing",
    title: "In progress",
    cards: [{ id: "landing", title: "Build the landing page", content: "Hero and features done" }],
  },
  {
    id: "done",
    title: "Done",
    cards: [{ id: "logo", title: "Final logo files", content: "Sent to the printer" }],
  },
]

export default function KanbanBoardDemo() {
  return <KanbanBoard columns={columns} label="Launch board" className="w-full max-w-4xl" />
}
