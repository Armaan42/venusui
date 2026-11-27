import { defineItem } from "../define.ts"

export default defineItem({
  name: "image-parallax",
  type: "registry:ui",
  title: "Image Parallax",
  description: "A photo that drifts slower than the page as it scrolls past, so it seems to sit deeper than everything around it.",
  version: "0.1.0",
  releasedAt: "2026-11-28",
  categories: ["effects", "animations"],
  files: [{ path: "registry/default/ui/image-parallax.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      { name: "src", type: "string", description: "The photo. Required." },
      { name: "alt", type: "string", description: "Describes the photo. Required; use an empty string for a purely decorative one." },
      {
        name: "speed",
        type: "number",
        default: "0.18",
        description: "How far the photo drifts, as a share of the frame's height, from 0 (still) to 0.45.",
      },
      {
        name: "zoom",
        type: "boolean",
        default: "false",
        description: "Also eases the photo from slightly zoomed in to its natural size as it crosses the screen.",
      },
      { name: "children", type: "ReactNode", description: "Laid over the photo, such as a caption or a heading." },
    ],
    extends: "All `<div>` props.",
    requirements: ["React 19 and Tailwind CSS v4. No other packages."],
    customization: [
      "Size the frame with `className`, e.g. `aspect-[16/9] rounded-3xl` or `h-[70svh]`. The photo always fills it.",
      "The photo is taller than the frame by the drift on both sides, so no edge ever shows. Bigger `speed` values crop more of it.",
      "Put text over it with `children`, and add a gradient behind the text so it stays readable.",
    ],
    accessibility: [
      "It's an ordinary image with your `alt` text; the movement is purely visual.",
      "With reduced motion the photo stays still.",
      "It only listens to scrolling while the frame is on screen, and moves the photo without re-rendering.",
    ],
    troubleshooting: [
      {
        problem: "The photo doesn't move.",
        solution:
          "It follows the window's scroll. Inside a scrolling container of your own, the window doesn't scroll, so the drift stays at rest.",
      },
    ],
  },
})
