import { defineItem } from "../define.ts"

export default defineItem({
  name: "page-wipe",
  type: "registry:ui",
  title: "Page Wipe",
  description:
    "A transition between pages or views: bands of colour sweep across the screen, the content changes underneath, then they sweep away.",
  version: "0.1.0",
  releasedAt: "2026-11-28",
  categories: ["animations", "navigation"],
  files: [{ path: "registry/default/ui/page-wipe.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      { name: "PageWipe", type: "component", description: "Wrap your layout (or one view) in it." },
      { name: "bands", type: "number", default: "5", description: "How many bands sweep across." },
      { name: "direction", type: '"up" | "left"', default: '"up"', description: "Bands rise from the bottom, or sweep in from the right." },
      { name: "duration", type: "number", default: "520", description: "Time each band takes to cross, in milliseconds." },
      {
        name: "contained",
        type: "boolean",
        default: "false",
        description: "Cover only the nearest positioned parent instead of the whole window.",
      },
      { name: "className", type: "string", description: "Classes for the bands, e.g. `bg-primary`." },
      { name: "labelClassName", type: "string", description: "Classes for the label, e.g. `text-primary-foreground`." },
      {
        name: "usePageWipe()",
        type: "{ wipe(change, label?): Promise<void>; wiping: boolean }",
        description: "Call `wipe()` with the change to make while the screen is covered. It can be async, like a route change.",
      },
    ],
    extends: "Only the props above.",
    requirements: ["React 19 and Tailwind CSS v4. No other packages."],
    customization: [
      "For route changes in Next.js, call `wipe(() => router.push(href))`. If you need to wait for the new page, resolve the promise once it has rendered.",
      'Show the destination while covered with the label: `wipe(change, "Work")`.',
      'Bands are `bg-foreground` with `text-background` labels. Pass `className="bg-primary"` and `labelClassName="text-primary-foreground"` for your brand colour.',
    ],
    accessibility: [
      "The bands are decorative and hidden from screen readers. The page underneath is `inert` while covered, so nothing can be clicked or focused mid-wipe.",
      "Move focus to the new heading once `wipe()` resolves: `wipe(change).then(() => heading.focus())`. While covered, the page is `inert`, so focus can't land there earlier.",
      "With reduced motion, the wipe becomes a short fade.",
    ],
    troubleshooting: [
      {
        problem: "The bands cover more than the area I want.",
        solution: "Set `contained` and give the wrapper's parent `position: relative`.",
      },
    ],
  },
})
