import { defineItem } from "../define.ts"

export default defineItem({
  name: "zoom-lightbox",
  type: "registry:ui",
  title: "Zoom Lightbox",
  description: "A photo grid whose photos grow out of their thumbnails into a full-screen viewer you can zoom into and pan around.",
  version: "0.1.0",
  releasedAt: "2026-11-28",
  categories: ["interactive", "data-display"],
  dependencies: ["lucide-react"],
  files: [{ path: "registry/default/ui/zoom-lightbox.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      {
        name: "images",
        type: "{ src: string; alt: string; caption?: string; thumbnail?: string }[]",
        description: "The photos. `thumbnail` is a smaller copy for the grid; the viewer loads `src`. Required.",
      },
      { name: "thumbnailClassName", type: "string", description: "Classes for each thumbnail, e.g. `aspect-square`." },
    ],
    extends: "All `<ul>` props except `children`. Set the grid's columns with `className`, e.g. `grid-cols-2 md:grid-cols-4`.",
    requirements: ["`lucide-react` for icons. The CLI installs it.", "React 19 and Tailwind CSS v4."],
    customization: [
      'Thumbnails are 4:3 by default. Pass `thumbnailClassName="aspect-square"` or any other ratio.',
      "A click zooms to 2.5×, and the wheel goes up to 4×. Change `CLICK_ZOOM` and `MAX_ZOOM` in the file.",
      "Pass a `thumbnail` for each photo so the grid loads small files and the viewer loads the large one.",
    ],
    accessibility: [
      "Thumbnails are buttons, e.g. “Open A sunlit living room”. The viewer is a modal dialog that keeps focus inside it.",
      "Escape or Close shrinks the photo back into its thumbnail, and focus returns to that thumbnail.",
      "Left and Right arrows move between photos; + and − zoom; 0 resets. Captions are announced as they change.",
      "On touch screens, swipe sideways to move between photos, and tap to zoom in or out.",
      "With reduced motion, the photo opens and closes in place without growing.",
    ],
    troubleshooting: [
      {
        problem: "The photo jumps instead of growing out of the thumbnail.",
        solution: "The animation starts once the full photo has loaded. Very large files take a moment; use a sensibly sized `src`.",
      },
      {
        problem: "Pinch to zoom doesn't work.",
        solution: "Tap to zoom in where you tapped, then drag to look around. Tap again to zoom out.",
      },
    ],
  },
})
