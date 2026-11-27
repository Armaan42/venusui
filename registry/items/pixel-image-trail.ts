import { defineItem } from "../define.ts"

export default defineItem({
  name: "pixel-image-trail",
  type: "registry:ui",
  title: "Pixel Image Trail",
  description: "Photos pop out along the pointer's path, each starting as big pixels and sharpening into focus before it fades.",
  version: "0.1.0",
  releasedAt: "2026-11-28",
  categories: ["effects", "interactive"],
  files: [{ path: "registry/default/ui/pixel-image-trail.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      { name: "images", type: "string[]", description: "Photo URLs, shown in turn along the trail. Required." },
      { name: "spacing", type: "number", default: "110", description: "Pointer travel, in pixels, between one photo and the next." },
      { name: "size", type: "number", default: "180", description: "Photo width in pixels." },
      { name: "ratio", type: "number", default: "1.25", description: "Photo height as a share of its width." },
      { name: "lifetime", type: "number", default: "900", description: "How long each photo stays before it fades, in milliseconds." },
      { name: "children", type: "ReactNode", description: "Your content, which sits on top of the trail." },
    ],
    extends: "All `<div>` props.",
    requirements: ["React 19 and Tailwind CSS v4. No other packages."],
    customization: [
      "Give the area a size with `className`, e.g. `h-[70svh]`; the trail stays inside it.",
      "Change how blocky photos start and how fast they sharpen with `STEPS` and `STEP_MS` in the file.",
      "Use small copies of your photos (around 400 pixels wide): they load faster and look the same at trail size.",
    ],
    accessibility: [
      "The trail is decorative and hidden from screen readers. Put anything people need to read in `children`.",
      "It doesn't move unless the pointer does, and it's off with reduced motion.",
      "At most nine photos show at once, so it never covers the page.",
    ],
    troubleshooting: [
      {
        problem: "No photos appear.",
        solution: "Photos appear once they've loaded. Check the URLs, and that your Content Security Policy allows them in `img-src`.",
      },
    ],
  },
})
