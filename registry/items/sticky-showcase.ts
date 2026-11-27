import { defineItem } from "../define.ts"

export default defineItem({
  name: "sticky-showcase",
  type: "registry:ui",
  title: "Sticky Showcase",
  description: "A scrolling story: the steps scroll past while a pinned picture beside them changes to match the one in view.",
  version: "0.1.0",
  releasedAt: "2026-11-28",
  categories: ["animations", "data-display"],
  files: [{ path: "registry/default/ui/sticky-showcase.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      {
        name: "steps",
        type: "{ id: string; title: string; description: ReactNode; media: ReactNode }[]",
        description: "The steps, in order. `media` is the picture for each: an image, a video or any element. Required.",
      },
      { name: "onStepChange", type: "(index: number) => void", description: "Called when another step reaches the middle of the screen." },
    ],
    extends: "All `<div>` props.",
    requirements: ["React 19 and Tailwind CSS v4. No other packages."],
    customization: [
      "Each step is at least 75% of the screen tall on large screens, which sets the scrolling pace. Change `lg:min-h-[75svh]` in the file.",
      "The pinned picture is 76% of the screen tall and sits 12% from the top. Adjust `top-[12svh] h-[76svh]` if you have a fixed header.",
      "Images inside `media` are cropped to fill the frame. Use a video or a mock-up of your product just as easily.",
    ],
    accessibility: [
      "Steps are an ordered list of headings and text, readable in order by everyone.",
      'The step in view is marked with `aria-current="step"`; the pictures for other steps are hidden from screen readers.',
      "On small screens each picture sits inline above its step, so nothing depends on sticky positioning.",
      "With reduced motion, pictures crossfade without zooming.",
    ],
    troubleshooting: [
      {
        problem: "The picture doesn't stick.",
        solution:
          "Sticky positioning stops working inside a parent with `overflow: hidden` or `overflow: auto`. Remove it from the showcase's parents.",
      },
    ],
  },
})
