import { defineItem } from "../define.ts"

export default defineItem({
  name: "date-range-picker",
  type: "registry:ui",
  title: "Date Range Picker",
  description: "A field that opens a two-month calendar with quick presets for picking a start and end date, fully usable by keyboard.",
  version: "0.1.0",
  releasedAt: "2026-11-28",
  categories: ["inputs", "forms"],
  dependencies: ["lucide-react"],
  files: [{ path: "registry/default/ui/date-range-picker.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      { name: "value", type: "{ from: Date; to: Date } | null", description: "The range, when you control it." },
      { name: "defaultValue", type: "{ from: Date; to: Date } | null", description: "The range to begin with." },
      { name: "onValueChange", type: "(range) => void", description: "Called when a range is picked or cleared." },
      { name: "label", type: "string", default: '"Dates"', description: "Visible label above the field." },
      { name: "placeholder", type: "string", default: '"Pick dates"', description: "Shown when no range is picked." },
      {
        name: "presets",
        type: "{ label: string; range: (today: Date) => DateRange }[]",
        default: "Today, Last 7 days, Last 30 days, This month, Last month",
        description: "Quick picks beside the calendars. Pass `[]` for none.",
      },
      { name: "min", type: "Date", description: "Earliest date that can be picked." },
      { name: "max", type: "Date", description: "Latest date that can be picked." },
      { name: "weekStartsOn", type: "0 | 1", default: "1", description: "0 for Sunday, 1 for Monday." },
      { name: "locale", type: "string", description: "Language for month and day names, e.g. `pt-PT`. Defaults to the browser's." },
    ],
    extends: "All `<div>` props except `defaultValue` and `onChange`.",
    requirements: ["`lucide-react` for icons. The CLI installs it.", "React 19 and Tailwind CSS v4."],
    customization: [
      "For bookings, set `min={new Date()}` and presets like “This weekend” that look forward.",
      "Phones show one month and wider screens two.",
      "Dates are local calendar days at midnight. Send them to your server as `YYYY-MM-DD` to avoid time-zone shifts.",
    ],
    accessibility: [
      "The field is a button that opens a dialog; Escape closes it and returns focus to the field.",
      "Each month is a grid: arrow keys move by day and week, Page Up and Down by month (with Shift, by year), Home and End to the ends of the week.",
      "Every day is read in full, e.g. “Thursday, 12 March 2027, today”, and days outside `min` and `max` are marked unavailable.",
      "The footer says what to do next (“Now pick the last day”) and how many days are selected.",
    ],
    troubleshooting: [
      {
        problem: "The range is off by a day on the server.",
        solution: "Turning a local midnight into UTC can move it to the previous day. Send the date parts, not `toISOString()`.",
      },
    ],
  },
})
