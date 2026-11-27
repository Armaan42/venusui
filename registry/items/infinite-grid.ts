import { defineItem } from "../define.ts"

export default defineItem({
  name: "infinite-grid",
  type: "registry:ui",
  title: "Infinite Grid",
  description: "An endless wall of photos you pan in every direction: drag it and let it glide, scroll it, or use the arrow keys.",
  version: "0.1.0",
  releasedAt: "2026-11-27",
  categories: ["interactive", "data-display"],
  files: [{ path: "registry/default/ui/infinite-grid.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      {
        name: "items",
        type: "{ id: string; src: string; alt: string; title?: string; caption?: string }[]",
        description: "The tiles. They repeat forever in every direction. Required.",
      },
      {
        name: "onSelect",
        type: "(item: InfiniteGridItem) => void",
        description: "Makes each tile a button and calls this when one is chosen.",
      },
      { name: "cellWidth", type: "number", default: "220", description: "Tile width in pixels." },
      { name: "cellHeight", type: "number", default: "280", description: "Tile height in pixels." },
      { name: "gap", type: "number", default: "20", description: "Space between tiles in pixels." },
      { name: "label", type: "string", default: '"Photo wall"', description: "Accessible name for the wall." },
    ],
    extends: "All `<div>` props except `onSelect`.",
    requirements: ["React 19 and Tailwind CSS v4. No other packages."],
    customization: [
      "The wall is `h-[32rem]`. Set another height with `className`, e.g. `h-svh` for a full-screen gallery.",
      "Every other column sits half a tile lower. Remove the offset in the file for a straight grid.",
      "Change how long it glides after a throw with `FRICTION` (closer to 1 glides further).",
    ],
    accessibility: [
      "The wall is a focusable region; arrow keys move it one tile at a time.",
      "With `onSelect`, tiles are buttons named by their title and alt text. A tile reached with Tab slides fully into view.",
      "Without `onSelect`, tiles are figures with their alt text.",
      "With reduced motion, the wall stops as soon as you let go and arrow keys move it without easing.",
    ],
    troubleshooting: [
      {
        problem: "Scrolling over the wall doesn't scroll the page.",
        solution:
          "Wheel and trackpad pan the wall while the pointer is over it. Give it a height that leaves room around it, or use `h-svh` for a page of its own.",
      },
      {
        problem: "The same photo appears next to itself.",
        solution: "Use at least five items so each row can step through them differently.",
      },
    ],
  },
})
