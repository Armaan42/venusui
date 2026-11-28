"use client"

import * as React from "react"
import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight, ChevronsUpDown, Search } from "lucide-react"

import { cn } from "@/lib/utils"

export interface DataTableColumn<T> {
  key: string
  header: string
  /** How to show the value. Defaults to `row[key]`. */
  cell?: (row: T) => React.ReactNode
  /** The value used for sorting and searching. Defaults to `row[key]`. */
  value?: (row: T) => string | number
  sortable?: boolean
  align?: "left" | "right"
  className?: string
}

interface DataTableProps<T> extends Omit<React.ComponentProps<"div">, "children"> {
  rows: T[]
  columns: DataTableColumn<T>[]
  getRowId: (row: T) => string
  /** The table's caption and accessible name. */
  label: string
  /** Shows a search box that filters every column. */
  searchable?: boolean
  searchPlaceholder?: string
  /** Adds a checkbox to each row. */
  selectable?: boolean
  onSelectionChange?: (ids: string[]) => void
  /** Rows per page. */
  pageSize?: number
  emptyText?: string
}

type Sort = { key: string; direction: "ascending" | "descending" } | null

const fold = (text: string) =>
  text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()

function Checkbox({ checked, indeterminate, ...props }: React.ComponentProps<"input"> & { indeterminate?: boolean }) {
  const ref = React.useRef<HTMLInputElement>(null)
  React.useEffect(() => {
    if (ref.current) ref.current.indeterminate = !!indeterminate
  }, [indeterminate])
  return (
    <input
      ref={ref}
      type="checkbox"
      checked={checked}
      className="size-4 cursor-pointer rounded border-input accent-primary outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      {...props}
    />
  )
}

/**
 * A table with search, sortable columns, row selection and pagination. Click
 * a column header to sort by it (again to reverse, a third time to clear).
 * The header stays put while the body scrolls, and narrow screens scroll the
 * table sideways.
 */
function DataTable<T>({
  rows,
  columns,
  getRowId,
  label,
  searchable = true,
  searchPlaceholder = "Search…",
  selectable = false,
  onSelectionChange,
  pageSize = 10,
  emptyText = "No results",
  className,
  ...props
}: DataTableProps<T>) {
  const [query, setQuery] = React.useState("")
  const [sort, setSort] = React.useState<Sort>(null)
  const [page, setPage] = React.useState(0)
  const [selected, setSelected] = React.useState<Set<string>>(new Set())
  const id = React.useId()

  const valueOf = React.useCallback(
    (row: T, column: DataTableColumn<T>) =>
      column.value?.(row) ?? ((row as Record<string, unknown>)[column.key] as string | number | undefined) ?? "",
    [],
  )

  const filtered = React.useMemo(() => {
    const q = fold(query.trim())
    if (!q) return rows
    return rows.filter((row) => columns.some((column) => fold(String(valueOf(row, column))).includes(q)))
  }, [rows, columns, query, valueOf])

  const sorted = React.useMemo(() => {
    if (!sort) return filtered
    const column = columns.find((c) => c.key === sort.key)
    if (!column) return filtered
    const dir = sort.direction === "ascending" ? 1 : -1
    const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" })
    return [...filtered].sort((a, b) => {
      const x = valueOf(a, column)
      const y = valueOf(b, column)
      return (typeof x === "number" && typeof y === "number" ? x - y : collator.compare(String(x), String(y))) * dir
    })
  }, [filtered, sort, columns, valueOf])

  const pages = Math.max(1, Math.ceil(sorted.length / pageSize))
  const current = Math.min(page, pages - 1)
  const visible = sorted.slice(current * pageSize, current * pageSize + pageSize)
  const visibleIds = visible.map(getRowId)
  const allOnPage = visibleIds.length > 0 && visibleIds.every((rowId) => selected.has(rowId))
  const someOnPage = visibleIds.some((rowId) => selected.has(rowId))

  const select = (next: Set<string>) => {
    setSelected(next)
    onSelectionChange?.([...next])
  }

  const toggleSort = (key: string) => {
    setSort((s) =>
      !s || s.key !== key ? { key, direction: "ascending" } : s.direction === "ascending" ? { key, direction: "descending" } : null,
    )
    setPage(0)
  }

  const from = sorted.length ? current * pageSize + 1 : 0
  const to = Math.min(sorted.length, (current + 1) * pageSize)

  return (
    <div data-slot="data-table" className={cn("w-full", className)} {...props}>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        {searchable ? (
          <div className="relative w-full max-w-xs">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="search"
              aria-label={`Search ${label.toLowerCase()}`}
              placeholder={searchPlaceholder}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                setPage(0)
              }}
              className="h-9 w-full rounded-lg border bg-background pr-3 pl-9 text-sm shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            />
          </div>
        ) : null}
        {selectable && selected.size ? (
          <div className="flex items-center gap-2 text-sm">
            <span>{selected.size} selected</span>
            <button
              type="button"
              onClick={() => select(new Set())}
              className="rounded-md px-2 py-1 font-medium outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              Clear
            </button>
          </div>
        ) : null}
      </div>

      {/* Scrolls sideways on narrow screens; focusable so keyboard users can scroll it too. */}
      <div
        role="region"
        aria-labelledby={`${id}-caption`}
        tabIndex={0}
        className="max-h-[32rem] overflow-auto rounded-xl border outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <table className="w-full border-collapse text-sm">
          <caption id={`${id}-caption`} className="sr-only">
            {label}
            {sort ? `, sorted by ${columns.find((c) => c.key === sort.key)?.header} ${sort.direction}` : ""}
          </caption>
          <thead className="sticky top-0 z-10 bg-muted/95 backdrop-blur">
            <tr>
              {selectable ? (
                <th scope="col" className="w-10 border-b px-3 py-2.5">
                  <Checkbox
                    aria-label="Select all rows on this page"
                    checked={allOnPage}
                    indeterminate={someOnPage && !allOnPage}
                    onChange={() => {
                      const next = new Set(selected)
                      visibleIds.forEach((rowId) => (allOnPage ? next.delete(rowId) : next.add(rowId)))
                      select(next)
                    }}
                  />
                </th>
              ) : null}
              {columns.map((column) => {
                const active = sort?.key === column.key
                return (
                  <th
                    key={column.key}
                    scope="col"
                    aria-sort={active ? sort!.direction : undefined}
                    className={cn(
                      "border-b px-3 py-2.5 font-medium whitespace-nowrap text-foreground/75",
                      column.align === "right" ? "text-right" : "text-left",
                    )}
                  >
                    {column.sortable ? (
                      <button
                        type="button"
                        onClick={() => toggleSort(column.key)}
                        className={cn(
                          "-mx-1.5 inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 outline-none hover:bg-background hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50",
                          active && "text-foreground",
                          column.align === "right" && "flex-row-reverse",
                        )}
                      >
                        {column.header}
                        {active ? (
                          sort!.direction === "ascending" ? (
                            <ArrowUp aria-hidden="true" className="size-3.5" />
                          ) : (
                            <ArrowDown aria-hidden="true" className="size-3.5" />
                          )
                        ) : (
                          <ChevronsUpDown aria-hidden="true" className="size-3.5 opacity-50" />
                        )}
                      </button>
                    ) : (
                      column.header
                    )}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-3 py-12 text-center text-muted-foreground">
                  {emptyText}
                </td>
              </tr>
            ) : (
              visible.map((row) => {
                const rowId = getRowId(row)
                const isSelected = selected.has(rowId)
                return (
                  <tr
                    key={rowId}
                    className={cn(
                      "border-b transition-colors last:border-b-0 hover:bg-muted/50",
                      isSelected && "bg-primary/5 hover:bg-primary/10",
                    )}
                  >
                    {selectable ? (
                      <td className="px-3 py-2.5">
                        <Checkbox
                          aria-label={`Select ${String(valueOf(row, columns[0]))}`}
                          checked={isSelected}
                          onChange={() => {
                            const next = new Set(selected)
                            if (isSelected) next.delete(rowId)
                            else next.add(rowId)
                            select(next)
                          }}
                        />
                      </td>
                    ) : null}
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={cn(
                          "px-3 py-2.5 whitespace-nowrap",
                          column.align === "right" && "text-right tabular-nums",
                          column.className,
                        )}
                      >
                        {column.cell ? column.cell(row) : String(valueOf(row, column))}
                      </td>
                    ))}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm">
        <p aria-live="polite" className="text-muted-foreground tabular-nums">
          {sorted.length ? `${from}–${to} of ${sorted.length}` : "0 results"}
        </p>
        {pages > 1 ? (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setPage(current - 1)}
              disabled={current === 0}
              aria-label="Previous page"
              className="grid size-8 place-items-center rounded-md border outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-40"
            >
              <ChevronLeft aria-hidden="true" className="size-4" />
            </button>
            <span className="px-2 tabular-nums">
              Page {current + 1} of {pages}
            </span>
            <button
              type="button"
              onClick={() => setPage(current + 1)}
              disabled={current === pages - 1}
              aria-label="Next page"
              className="grid size-8 place-items-center rounded-md border outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-40"
            >
              <ChevronRight aria-hidden="true" className="size-4" />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export { DataTable }
