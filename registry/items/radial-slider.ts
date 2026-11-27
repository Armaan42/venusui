import { defineItem } from "../define.ts"

export default defineItem({
  name: "radial-slider",
  type: "registry:ui",
  title: "Radial Slider",
  description: "A circular slider: drag the thumb around the ring, with the value in the middle and optional marks.",
  version: "0.1.0",
  releasedAt: "2026-11-27",
  categories: ["inputs", "interactive"],
  files: [{ path: "registry/default/ui/radial-slider.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      { name: "value", type: "number", description: "The value, when you control it." },
      { name: "defaultValue", type: "number", default: "50", description: "The value to begin with." },
      { name: "onValueChange", type: "(value: number) => void", description: "Called as the value changes." },
      {
        name: "onValueCommit",
        type: "(value: number) => void",
        description: "Called when a drag ends or a key changes the value, for saving.",
      },
      { name: "min", type: "number", default: "0", description: "Lowest value." },
      { name: "max", type: "number", default: "100", description: "Highest value." },
      { name: "step", type: "number", default: "1", description: "Value step." },
      { name: "label", type: "string", default: '"Value"', description: "Accessible name and the caption under the value." },
      {
        name: "format",
        type: "(value: number) => string",
        description: "Formats the value for the readout, the marks and screen readers.",
      },
      {
        name: "sweep",
        type: "number",
        default: "270",
        description: "How much of the circle the track covers, in degrees. The gap sits at the bottom.",
      },
      { name: "size", type: "number", default: "224", description: "Diameter in pixels." },
      { name: "thickness", type: "number", default: "14", description: "Track thickness in pixels." },
      { name: "marks", type: "number[]", description: "Values to mark with a tick and a small label around the ring." },
      { name: "children", type: "ReactNode", description: "Replaces the value and caption in the middle." },
    ],
    extends: "All `<div>` props except `onChange`, `defaultValue` and `children`.",
    requirements: ["React 19 and Tailwind CSS v4. No other packages."],
    customization: [
      "The filled track uses your `primary` colour and the empty track `muted`. Change `stroke-primary` and `stroke-muted` in the file.",
      "Use `sweep={360}` for a full circle, or a smaller sweep like `180` for a gauge.",
      "Pass `children` to put your own readout in the middle, such as an icon with the value.",
    ],
    accessibility: [
      "The thumb is a `slider` with its value read through `format`, e.g. “70%”. Arrow keys step, Page Up and Down move a tenth, Home and End go to the ends.",
      "Pressing anywhere on the ring moves the thumb there and focuses it.",
      "A drag never jumps from one end of the track to the other across the gap.",
      "The readout in the middle is hidden from screen readers because the slider already announces the value.",
    ],
    troubleshooting: [
      {
        problem: "Marks overlap the value.",
        solution: "Marks sit outside the ring, which shrinks it a little. Use fewer marks or a larger `size`.",
      },
    ],
  },
})
