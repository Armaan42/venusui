import { defineItem } from "../define.ts"

export default defineItem({
  name: "flick-cards",
  type: "registry:ui",
  title: "Flick Cards",
  description: "A stack of cards you throw left or right to sort them, with a quick flick, the buttons or the arrow keys, and an undo.",
  version: "0.1.0",
  releasedAt: "2026-11-27",
  categories: ["cards", "interactive"],
  dependencies: ["lucide-react"],
  files: [{ path: "registry/default/ui/flick-cards.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      {
        name: "cards",
        type: "{ id: string; label: string; content: ReactNode }[]",
        description: "The cards, top first. `label` is announced when a card is flicked. Required.",
      },
      {
        name: "onFlick",
        type: '(card: FlickCard, direction: "left" | "right") => void',
        description: "Called when a card has been flicked away.",
      },
      {
        name: "leftLabel",
        type: "string",
        default: '"Skip"',
        description: "What a flick to the left means. Used on the button, the stamp and in announcements.",
      },
      { name: "rightLabel", type: "string", default: '"Keep"', description: "What a flick to the right means." },
      {
        name: "loop",
        type: "boolean",
        default: "false",
        description: "Send flicked cards to the back of the stack instead of removing them.",
      },
      { name: "empty", type: "ReactNode", description: "Shown once every card has been flicked." },
    ],
    extends: "All `<div>` props except `children`.",
    requirements: ["`lucide-react` for icons. The CLI installs it.", "React 19 and Tailwind CSS v4."],
    customization: [
      "A card counts as flicked once it's dragged 30% of its width, or thrown quickly. Change `FLICK_DISTANCE` and `FLICK_SPEED` in the file.",
      "Three cards show in the stack. Change `VISIBLE` for a deeper pile.",
      "The stack is `max-w-xs` and 3:4; set a different width with `className` and the cards follow.",
    ],
    accessibility: [
      "The stack is a focusable group: Left and Right arrow keys flick the top card, and Ctrl or Cmd + Z undoes.",
      "Skip, Undo and Keep are buttons named with the current card, e.g. “Keep Kyoto”.",
      "Each flick is announced, e.g. “Keep: Kyoto”. Only the top card is reachable; the ones underneath are `inert`.",
      "With reduced motion, cards leave and return without flying.",
    ],
    troubleshooting: [
      {
        problem: "Links or buttons inside a card are hard to press.",
        solution:
          "The whole card is draggable. Keep a short tap still and it reaches the link; for many controls, put them under the stack instead.",
      },
      {
        problem: "The page scrolls instead of the card moving on a phone.",
        solution: "Vertical swipes scroll the page on purpose. Swipe sideways to flick.",
      },
    ],
  },
})
