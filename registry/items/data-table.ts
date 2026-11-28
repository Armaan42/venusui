import { defineItem } from "../define.ts"

export default defineItem({
  name: "data-table",
  type: "registry:ui",
  title: "Data Table",
  description: "A table with search, sortable columns, row selection, pagination and a sticky header.",
  version: "0.1.0",
  releasedAt: "2026-11-28",
  categories: ["data-display"],
  dependencies: ["lucide-react"],
  files: [{ path: "registry/default/ui/data-table.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      { name: "rows", type: "T[]", description: "The data. Required." },
      {
        name: "columns",
        type: '{ key: string; header: string; cell?: (row) => ReactNode; value?: (row) => string | number; sortable?: boolean; align?: "left" | "right" }[]',
        description: "The columns. `value` is what's sorted and searched; `cell` is what's shown. Both default to `row[key]`. Required.",
      },
      { name: "getRowId", type: "(row: T) => string", description: "A stable id for each row. Required." },
      { name: "label", type: "string", description: "The table's caption and accessible name. Required." },
      { name: "searchable", type: "boolean", default: "true", description: "Shows a search box that filters every column." },
      { name: "selectable", type: "boolean", default: "false", description: "Adds a checkbox to each row and a select-all for the page." },
      { name: "onSelectionChange", type: "(ids: string[]) => void", description: "Called with the selected row ids." },
      { name: "pageSize", type: "number", default: "10", description: "Rows per page." },
      { name: "emptyText", type: "string", default: '"No results"', description: "Shown when nothing matches." },
    ],
    extends: "All `<div>` props except `children`.",
    requirements: ["`lucide-react` for icons. The CLI installs it.", "React 19 and Tailwind CSS v4."],
    customization: [
      "Return badges, avatars or links from `cell`, and keep `value` plain so sorting and search still work.",
      'Use `align: "right"` for numbers; they get tabular figures so the digits line up.',
      "The scroll area is `max-h-[32rem]`; change it in the file for a taller or shorter table.",
    ],
    accessibility: [
      "It's a real `table` with a caption. Sortable headers are buttons, and the column's `aria-sort` says how it's sorted.",
      "Search, sorting and paging announce the rows on show, e.g. “1–10 of 42”.",
      "Checkboxes are labelled with each row's first column; the select-all shows a partial state when only some rows are picked.",
      "On narrow screens the table scrolls sideways inside a focusable region, so keyboard users can scroll it too.",
    ],
    troubleshooting: [
      {
        problem: "A column sorts 1, 10, 2.",
        solution: "Return a number from `value` for numeric columns, or keep numbers as numbers in your data.",
      },
      {
        problem: "It's slow with thousands of rows.",
        solution:
          "It sorts and filters in the browser. For very large data, sort, search and page on your server and pass in one page at a time.",
      },
    ],
  },
})
