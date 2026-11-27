import { defineItem } from "../define.ts"

export default defineItem({
  name: "glass-surface",
  type: "registry:ui",
  title: "Glass Surface",
  description: "A pane of frosted glass that blurs what's behind it, catches light on its edges and glints where the pointer moves.",
  version: "0.1.0",
  releasedAt: "2026-11-27",
  categories: ["effects", "cards"],
  files: [{ path: "registry/default/ui/glass-surface.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      {
        name: "tint",
        type: '"dark" | "light" | "clear"',
        default: '"dark"',
        description:
          "`dark` smokes the glass and uses white text, `light` frosts it and uses dark text, `clear` only blurs and keeps your colours.",
      },
      { name: "blur", type: "number", default: "18", description: "Backdrop blur in pixels." },
      { name: "glare", type: "boolean", default: "true", description: "A soft light that follows the pointer across the glass." },
    ],
    extends: "All `<div>` props.",
    requirements: ["React 19 and Tailwind CSS v4. No other packages."],
    customization: [
      "Glass needs something behind it: place it over a photo, a video or a colourful background, with `relative` on the parent if you position it.",
      "Change the corner radius and padding with `className`, e.g. `rounded-2xl p-6`.",
      'Use `tint="light"` over dark imagery when you want dark text, or `tint="clear"` to keep the text colour of your theme.',
    ],
    accessibility: [
      "It's a plain container: give it a heading or landmark inside if it holds a section of the page.",
      "Text on glass depends on the image behind it. Use `dark` or `light` so the tint keeps text readable, and check contrast on your busiest image.",
      "The glare only follows the pointer; it never moves on its own.",
    ],
    troubleshooting: [
      {
        problem: "The glass doesn't blur anything.",
        solution:
          "Backdrop blur only affects what's painted behind the pane. Make sure the image or colour sits behind it, not inside it, and that no parent has `overflow: hidden` with a transform that isolates it.",
      },
      {
        problem: "It looks flat on a white page.",
        solution: "Frosted glass shows its effect over colour and detail. Over a plain background, use a card instead.",
      },
    ],
  },
})
