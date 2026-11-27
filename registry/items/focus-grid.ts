import { defineItem } from "../define.ts"

export default defineItem({
  name: "focus-grid",
  type: "registry:ui",
  title: "Focus Grid",
  description: "A grid that spotlights one item: the one you point at or tab to comes forward while the rest dim and soften.",
  version: "0.1.0",
  releasedAt: "2026-11-27",
  categories: ["interactive", "effects"],
  files: [{ path: "registry/default/ui/focus-grid.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      { name: "FocusGrid", type: "<ul>", description: "The grid. Set the columns with `className`, e.g. `grid-cols-2 lg:grid-cols-3`." },
      { name: "FocusGridItem", type: "<li>", description: "One item. Put a card, a link or a photo inside." },
    ],
    extends: "`FocusGrid` takes all `<ul>` props and `FocusGridItem` all `<li>` props.",
    requirements: ["React 19 and Tailwind CSS v4. No other packages."],
    customization: [
      "Dimmed items are 45% opacity with a 2px blur. Change the `data-[state=dimmed]` classes in the file for a lighter or stronger effect.",
      "Style items by state yourself with `data-[state=active]` and `data-[state=dimmed]`, e.g. to show a caption only on the item in focus.",
    ],
    accessibility: [
      "It's a list. Keyboard focus moving into an item spotlights it, so tabbing through links works the same as pointing.",
      "On touch screens a tap spotlights an item and a tap outside clears it.",
      "Dimming is only visual: every item stays readable by screen readers and reachable by keyboard.",
      "With reduced motion, items only fade; nothing scales or blurs.",
    ],
    troubleshooting: [
      {
        problem: "The spotlight sticks after the pointer leaves.",
        solution: "It stays while keyboard focus is inside the grid. Click elsewhere or Tab out to clear it.",
      },
    ],
  },
})
