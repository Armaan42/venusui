import { defineItem } from "../define.ts"

export default defineItem({
  name: "sortable-list",
  type: "registry:ui",
  title: "Sortable List",
  description: "A list you reorder by dragging a handle, with rows that slide aside and a full keyboard alternative.",
  version: "0.1.0",
  releasedAt: "2026-11-28",
  categories: ["interactive", "data-display"],
  dependencies: ["lucide-react"],
  files: [{ path: "registry/default/ui/sortable-list.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      {
        name: "items",
        type: "{ id: string; label: string; content: ReactNode }[]",
        description: "The rows, in order. `label` names the handle and the announcements. Required.",
      },
      {
        name: "onReorder",
        type: "(items: SortableItem[]) => void",
        description: "Called with the new order after each move, e.g. to save it.",
      },
      { name: "label", type: "string", description: 'Accessible name for the list, e.g. "Playlist". Required.' },
    ],
    extends: "All `<ol>` props except `children`.",
    requirements: ["`lucide-react` for the handle icon. The CLI installs it.", "React 19 and Tailwind CSS v4."],
    customization: [
      "Only the handle drags, so buttons and links inside a row keep working.",
      "Rows are cards with an 8px gap; change `GAP` and the row classes in the file.",
      "Add or remove items and the list keeps the current order for the rest.",
    ],
    accessibility: [
      "Each handle is a button, e.g. “Move Morning run”. Space or Enter picks the row up, the arrow keys move it, Space drops it and Escape puts it back.",
      "Every pick-up, move and drop is announced with the new position, e.g. “position 2 of 5”.",
      "With reduced motion, rows swap places without sliding.",
    ],
    troubleshooting: [
      {
        problem: "The page scrolls instead of the row moving on a phone.",
        solution: "Drag from the handle; the rest of the row scrolls the page as normal.",
      },
    ],
  },
})
