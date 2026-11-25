import { defineItem } from "../define.ts"

const files = [
  "interaction-shelf",
  "interaction-shelf-scene",
  "interaction-shelf-book",
  "interaction-shelf-demo-drift",
  "interaction-shelf-demo-lens",
  "interaction-shelf-demo-ripple",
  "interaction-shelf-demo-stretch",
  "interaction-shelf-demo-toss",
  "interaction-shelf-demo-bloom",
]

export default defineItem({
  name: "interaction-shelf",
  type: "registry:block",
  title: "Interaction Shelf",
  description:
    "An interaction library in a small 3D room: pull the lamp cord to light it, pick a numbered book and it flies off the shelf and opens into a live demo, from an endless photo wall to prints you can throw. Six original demos, a real-time clock and moonlight through the window.",
  version: "0.1.0",
  releasedAt: "2026-11-25",
  categories: ["templates"],
  dependencies: ["three", "gsap", "motion", "lucide-react"],
  files: [
    ...files.map((name) => ({
      path: `registry/default/blocks/interaction-shelf/components/${name}.tsx`,
      type: "registry:component" as const,
    })),
    { path: "registry/default/blocks/interaction-shelf/components/interaction-shelf-data.ts", type: "registry:component" },
    { path: "registry/default/blocks/interaction-shelf/components/interaction-shelf-textures.ts", type: "registry:component" },
  ],
  pageDocs: {
    props: [],
    extends:
      "No props. `interaction-shelf.tsx` lays out the room and its text; the 3D room is `interaction-shelf-scene.tsx`, the open book is `interaction-shelf-book.tsx`, and each demo is its own `interaction-shelf-demo-*.tsx` file.",
    requirements: [
      "`three` for the room, `gsap` for its camera and book moves, `motion` for the open book and panels, and `lucide-react` for icons. The CLI installs all four.",
      "React 19 and Tailwind CSS v4, with a `cn` helper at `@/lib/utils`. The template is full-screen; render it as the whole page.",
      "A browser with WebGL. Without it, the index on the wall still opens every book.",
      "An internet connection for the sample photos, which load from a remote image CDN.",
    ],
    customization: [
      "The books live in `interaction-shelf-data.ts`: number, title, subtitle, notes, cloth color and ink color. The spines, covers and notes pages are drawn from it.",
      "Each demo is a self-contained component. Swap one for your own by changing `DEMOS` in `interaction-shelf-book.tsx`; it gets the whole right-hand page to fill.",
      "Everything in the room is built from simple shapes and canvas textures in `interaction-shelf-textures.ts` (spines, night sky, clock face, print, moonlight), so the template ships with no image or model files. Change colors and positions in `interaction-shelf-scene.tsx`.",
      "The lamp cord, the shade and the bulb all toggle the light; so does the Lamp button in the top bar. The room starts by moonlight; set `useState(true)` for `lampOn` to start lit.",
      "Camera framings for night, lamplight and portrait screens are in `views()` in the scene file.",
      "Night Shelf, its notes and its contact address are made up. Change the name in `interaction-shelf.tsx` and the copy in the data file.",
      "Photos are listed in `interaction-shelf-data.ts`. Use your own and keep `alt` text accurate where pictures carry meaning.",
    ],
    accessibility: [
      "The 3D room is decorative to screen readers. Every book is also a real button in the index on the wall (a row of chips on phones), and the lamp has a toggle button with its state announced.",
      "An open book is a modal dialog labelled by its title: focus moves to the close button, Tab stays inside, and Escape, the close button or a click outside puts it back, returning focus to where you were.",
      "Every demo has a keyboard path: arrow keys for the photo wall, the list and the reel; a Scatter button for the light table; and a Draw button for the drawn line.",
      "With reduced motion the room stops swaying, the camera and books move instantly, demos drop their momentum, and the cover opens without the long swing.",
    ],
    troubleshooting: [
      {
        problem: "The room stays dark or blank.",
        solution: "WebGL may be off or unavailable. The index on the wall still works. Check the browser console for a WebGL error.",
      },
      {
        problem: "Photos don't show up.",
        solution:
          "They load from `images.unsplash.com`. Check your network and any Content Security Policy (`img-src`), or use local images in the data file.",
      },
      {
        problem: "Lint warns about `<img>` elements.",
        solution: "Next.js suggests `next/image`. The template uses `<img>` so it works in any React app; switch if you like.",
      },
    ],
  },
})
