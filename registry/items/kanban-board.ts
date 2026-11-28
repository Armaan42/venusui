import { defineItem } from "../define.ts"

export default defineItem({
  name: "kanban-board",
  type: "registry:ui",
  title: "Kanban Board",
  description: "Columns of cards you drag between, with a card that follows the pointer, a drop placeholder and full keyboard moves.",
  version: "0.1.0",
  releasedAt: "2026-11-28",
  categories: ["interactive", "data-display"],
  files: [{ path: "registry/default/ui/kanban-board.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      {
        name: "columns",
        type: "{ id: string; title: string; cards: { id: string; title: string; content?: ReactNode }[] }[]",
        description: "The columns and their cards, in order. Required.",
      },
      {
        name: "onChange",
        type: "(columns: KanbanColumn[]) => void",
        description: "Called with every column after a card moves, e.g. to save it.",
      },
      { name: "label", type: "string", default: '"Board"', description: "Accessible name for the board." },
    ],
    extends: "All `<div>` props except `onChange`.",
    requirements: ["React 19 and Tailwind CSS v4. No other packages."],
    customization: [
      "Columns are `w-72`; the board scrolls sideways when they don't fit. Change the column width in the file.",
      "Put labels, avatars or due dates in a card's `content`.",
      "Empty columns show “Drop cards here”; change the text in the file.",
    ],
    accessibility: [
      "Columns are sections named by their heading; cards are buttons.",
      "Space or Enter picks a card up; Up and Down move it in its column, Left and Right to the next column; Space drops it and Escape puts it back.",
      "Every move is announced, e.g. “Write launch email, In progress, position 1 of 3”, and focus stays on the card.",
    ],
    troubleshooting: [
      {
        problem: "The board doesn't remember moves after a reload.",
        solution: "It keeps its own copy of the columns. Save them in `onChange` and pass the saved columns back in.",
      },
    ],
  },
})
