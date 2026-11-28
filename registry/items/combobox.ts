import { defineItem } from "../define.ts"

export default defineItem({
  name: "combobox",
  type: "registry:ui",
  title: "Combobox",
  description: "A text field that filters a list as you type, with highlighted matches, groups and an optional multi-select with chips.",
  version: "0.1.0",
  releasedAt: "2026-11-28",
  categories: ["inputs", "forms"],
  dependencies: ["lucide-react"],
  files: [{ path: "registry/default/ui/combobox.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      {
        name: "options",
        type: "{ value: string; label: string; description?: string; group?: string; disabled?: boolean }[]",
        description: "The choices. Labels and descriptions are both searched. Required.",
      },
      { name: "label", type: "string", description: "Visible label above the field. Required." },
      { name: "multiple", type: "boolean", default: "false", description: "Pick several; chosen options show as removable chips." },
      { name: "value", type: "string | null, or string[] with multiple", description: "The choice, when you control it." },
      { name: "defaultValue", type: "string | null, or string[] with multiple", description: "The choice to begin with." },
      { name: "onValueChange", type: "(value) => void", description: "Called with the new choice." },
      { name: "placeholder", type: "string", default: '"Search…"', description: "Shown in the empty field." },
      { name: "emptyText", type: "string", default: '"No matches"', description: "Shown when nothing matches." },
      { name: "disabled", type: "boolean", default: "false", description: "Turns the field off." },
    ],
    extends: "All `<div>` props except `onChange` and `defaultValue`.",
    requirements: ["`lucide-react` for icons. The CLI installs it.", "React 19 and Tailwind CSS v4."],
    customization: [
      "Search ignores case and accents, so “creme” finds “Crème”. Change `fold` in the file for other rules.",
      "Give options a `group` to list them under headings, and a `description` for a second line.",
      "The list uses your `popover` and `accent` colours.",
    ],
    accessibility: [
      "Follows the ARIA combobox pattern: the field announces the highlighted option, arrow keys move, Home and End jump, Enter picks and Escape closes.",
      "Escape on a closed single-select field clears the choice. In multi-select, Backspace in an empty field removes the last chip, and each chip has a remove button.",
      "The number of matches is announced as you type.",
    ],
    troubleshooting: [
      {
        problem: "The list is cut off inside a card.",
        solution:
          "It opens below the field inside the combobox's own box. Remove `overflow: hidden` from the parent, or give it room below.",
      },
    ],
  },
})
