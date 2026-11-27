import { defineItem } from "../define.ts"

export default defineItem({
  name: "deck-slider",
  type: "registry:ui",
  title: "Deck Slider",
  description: "A carousel that fans its slides like a deck of cards, one in front and the rest tilted behind it on both sides.",
  version: "0.1.0",
  releasedAt: "2026-11-27",
  categories: ["interactive", "cards"],
  dependencies: ["lucide-react"],
  files: [{ path: "registry/default/ui/deck-slider.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      {
        name: "slides",
        type: "{ id: string; label: string; content: ReactNode }[]",
        description: "The slides. `label` names the dots and is announced when the slide comes to the front. Required.",
      },
      { name: "index", type: "number", description: "The slide in front, when you control it." },
      { name: "defaultIndex", type: "number", default: "0", description: "The slide in front to begin with." },
      { name: "onIndexChange", type: "(index: number) => void", description: "Called when another slide comes to the front." },
      { name: "loop", type: "boolean", default: "true", description: "Go from the last slide back to the first." },
      {
        name: "autoPlay",
        type: "number",
        default: "0",
        description: "Move on every this many milliseconds. Adds a pause button, and pauses on hover and focus.",
      },
      { name: "label", type: "string", default: '"Slides"', description: "Accessible name for the carousel." },
    ],
    extends: "All `<div>` props except `children`.",
    requirements: ["`lucide-react` for icons. The CLI installs it.", "React 19 and Tailwind CSS v4."],
    customization: [
      "Change how far apart the cards fan with `STEP`, and how many show with `REACH`, at the top of the file.",
      "Cards are `w-[min(72%,20rem)]` and the stage is `h-[26rem]`. Change both in the file for wider or taller slides.",
      "Put anything in a slide: a photo with a caption, a quote, a product card.",
    ],
    accessibility: [
      "It's a carousel region; each slide is a group named “2 of 6: Oak lounge chair”. Only the slide in front is reachable, the rest are `inert`.",
      "Previous and Next buttons, a dot button per slide (the current one marked), and Left and Right arrow keys anywhere inside.",
      "The slide in front is announced as it changes, except while it plays by itself.",
      "Auto play pauses on hover and focus, has a pause button, and is off with reduced motion.",
    ],
    troubleshooting: [
      {
        problem: "A card jumps instead of sliding when it wraps around.",
        solution:
          "That's deliberate: a card wrapping from one end to the other moves behind the fan rather than sweeping across the front.",
      },
      {
        problem: "The side cards are cut off on a phone.",
        solution: "The stage clips sideways so the page never scrolls horizontally. Fewer cards show on narrow screens.",
      },
    ],
  },
})
