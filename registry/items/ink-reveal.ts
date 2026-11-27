import { defineItem } from "../define.ts"

export default defineItem({
  name: "ink-reveal",
  type: "registry:ui",
  title: "Ink Reveal",
  description: "A photo that appears like ink on paper: drops land, bleed outwards with rough edges and merge until it's all revealed.",
  version: "0.1.0",
  releasedAt: "2026-11-28",
  categories: ["effects", "animations"],
  files: [{ path: "registry/default/ui/ink-reveal.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      { name: "src", type: "string", description: "The photo. Required." },
      { name: "alt", type: "string", description: "Describes the photo. Required." },
      { name: "duration", type: "number", default: "1600", description: "How long the ink takes to cover the photo, in milliseconds." },
      {
        name: "delay",
        type: "number",
        default: "0",
        description: "Wait this long after it comes into view, in milliseconds. Stagger several reveals with it.",
      },
      { name: "children", type: "ReactNode", description: "Laid over the photo once it's revealed, e.g. a caption." },
    ],
    extends: "All `<div>` props except `children`.",
    requirements: ["React 19 and Tailwind CSS v4. No other packages."],
    customization: [
      "Size the frame with `className`, e.g. `aspect-[4/5] rounded-2xl`. The photo fills it.",
      "Move where the ink lands, or add drops, in the `DROPS` list in the file.",
      "Rougher or smoother edges: change `scale` on `feDisplacementMap` and `baseFrequency` on `feTurbulence`.",
      "The paper is your `muted` colour; change `bg-muted` on the frame.",
    ],
    accessibility: [
      "The photo is an `img` with your `alt` text from the start, before the ink spreads.",
      "It reveals once, when it's a third in view, and never moves again.",
      "With reduced motion the photo is shown straight away.",
    ],
    troubleshooting: [
      {
        problem: "The photo never appears.",
        solution:
          "It waits until it's on screen. Inside a page that never scrolls it to the viewport, set `duration` to 0 or render a plain image.",
      },
    ],
  },
})
