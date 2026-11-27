import { defineItem } from "../define.ts"

export default defineItem({
  name: "range-slider",
  type: "registry:ui",
  title: "Range Slider",
  description: "A two-thumb slider for picking a range, with an optional histogram that lights up the values inside it.",
  version: "0.1.0",
  releasedAt: "2026-11-28",
  categories: ["inputs", "interactive"],
  files: [{ path: "registry/default/ui/range-slider.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      { name: "value", type: "[number, number]", description: "The range, when you control it." },
      { name: "defaultValue", type: "[number, number]", description: "The range to begin with. Defaults to the middle half." },
      { name: "onValueChange", type: "(value: [number, number]) => void", description: "Called as either thumb moves." },
      {
        name: "onValueCommit",
        type: "(value: [number, number]) => void",
        description: "Called when a drag ends or a key changes the range, e.g. to run a search.",
      },
      { name: "min", type: "number", default: "0", description: "Lowest value." },
      { name: "max", type: "number", default: "100", description: "Highest value." },
      { name: "step", type: "number", default: "1", description: "Value step." },
      { name: "minGap", type: "number", default: "0", description: "The smallest distance allowed between the thumbs." },
      { name: "label", type: "string", default: '"Range"', description: 'Accessible name for the control, e.g. "Price".' },
      { name: "thumbLabels", type: "[string, string]", default: '["Minimum", "Maximum"]', description: "Names of the two thumbs." },
      {
        name: "format",
        type: "(value: number) => string",
        description: "Formats values for the readout and screen readers, e.g. as prices.",
      },
      {
        name: "histogram",
        type: "number[]",
        description: "Counts for evenly spaced buckets from `min` to `max`, drawn as bars above the track.",
      },
    ],
    extends: "All `<div>` props except `onChange` and `defaultValue`.",
    requirements: ["React 19 and Tailwind CSS v4. No other packages."],
    customization: [
      "The range and the bars inside it use your `primary` colour; the bars outside are a light tint of `muted-foreground`.",
      "Pass `histogram` from your data, e.g. how many listings fall in each price band, so people see where the choices are.",
      "Use `onValueCommit` to filter results once the person lets go, rather than on every pixel of a drag.",
    ],
    accessibility: [
      "The control is a group named by `label`, with two `slider` thumbs, e.g. “Price, minimum” and “Price, maximum”.",
      "Arrow keys step, Page Up and Down move a tenth, Home and End go as far as the other thumb allows.",
      "Each thumb's allowed range is announced, so the minimum can never pass the maximum.",
      "Pressing the track moves the nearer thumb and focuses it.",
    ],
    troubleshooting: [
      {
        problem: "The thumbs won't come closer together.",
        solution: "`minGap` keeps them apart. Set it to 0 to let them meet.",
      },
    ],
  },
})
