import { defineItem } from "../define.ts"

export default defineItem({
  name: "bottom-sheet",
  type: "registry:ui",
  title: "Bottom Sheet",
  description: "A modal sheet that slides up from the bottom and rests at set heights; drag it between them or flick it down to close.",
  version: "0.1.0",
  releasedAt: "2026-11-28",
  categories: ["navigation", "interactive"],
  dependencies: ["lucide-react"],
  files: [{ path: "registry/default/ui/bottom-sheet.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      { name: "open", type: "boolean", description: "Whether the sheet is open. Required." },
      {
        name: "onOpenChange",
        type: "(open: boolean) => void",
        description: "Called when it asks to close (drag down, Escape, backdrop or the close button). Required.",
      },
      { name: "title", type: "string", description: "Heading at the top; also its accessible name. Required." },
      { name: "description", type: "string", description: "A line under the title." },
      { name: "snapPoints", type: "number[]", default: "[0.5, 0.92]", description: "Heights it rests at, as shares of the screen." },
      { name: "defaultSnap", type: "number", default: "0", description: "Which height it opens at." },
      { name: "children", type: "ReactNode", description: "The sheet's content. It scrolls inside the part that's on screen." },
    ],
    extends: "Only the props above, plus `className` for the sheet.",
    requirements: ["`lucide-react` for the close icon. The CLI installs it.", "React 19 and Tailwind CSS v4."],
    customization: [
      "Use one snap point, e.g. `[0.6]`, for a fixed-height sheet, or three for small, medium and full.",
      "On wider screens it becomes a centred sheet up to `max-w-lg`. Change that class in the file.",
      "Open it from any button: keep `open` in state and set it to true on click.",
    ],
    accessibility: [
      "It's a native modal `dialog`: focus moves to its title and stays inside, and the page behind can't be scrolled or clicked.",
      "Escape closes it. The handle is a button too: Enter or a tap moves it to the next height.",
      "Its title names the dialog and its description describes it.",
      "With reduced motion, it appears and resizes without sliding.",
    ],
    troubleshooting: [
      {
        problem: "Focus doesn't go back to my button after closing.",
        solution: "Focus the button in `onOpenChange` when it becomes false, or keep the button as the last thing focused before opening.",
      },
    ],
  },
})
