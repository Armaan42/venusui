"use client"

import * as React from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"

import { cn } from "@/lib/utils"

export interface ComboboxOption {
  value: string
  label: string
  /** A second, quieter line. It's searched too. */
  description?: string
  /** Options with the same group are listed together under it. */
  group?: string
  disabled?: boolean
}

interface ComboboxBaseProps extends Omit<React.ComponentProps<"div">, "onChange" | "defaultValue"> {
  options: ComboboxOption[]
  /** Visible label above the field. */
  label: string
  placeholder?: string
  /** Shown when nothing matches what was typed. */
  emptyText?: string
  disabled?: boolean
}

interface ComboboxSingleProps extends ComboboxBaseProps {
  multiple?: false
  value?: string | null
  defaultValue?: string | null
  onValueChange?: (value: string | null) => void
}

interface ComboboxMultipleProps extends ComboboxBaseProps {
  multiple: true
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
}

type ComboboxProps = ComboboxSingleProps | ComboboxMultipleProps

/** Lowercase and strip accents, so "creme" finds "Crème". */
const fold = (text: string) =>
  text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()

/** Wraps the part of `text` that matches `query` in a highlight. */
function Highlight({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>
  const at = fold(text).indexOf(fold(query))
  if (at < 0) return <>{text}</>
  return (
    <>
      {text.slice(0, at)}
      <mark className="rounded-sm bg-primary/15 font-semibold text-inherit">{text.slice(at, at + query.length)}</mark>
      {text.slice(at + query.length)}
    </>
  )
}

/**
 * A text field that filters a list as you type. Matching letters are
 * highlighted, options can be grouped and described, and with `multiple`
 * the chosen options become removable chips. Follows the ARIA combobox
 * pattern: arrow keys move, Enter picks, Escape closes.
 */
function Combobox(props: ComboboxProps) {
  const { options, label, placeholder = "Search…", emptyText = "No matches", disabled, className, multiple, ...others } = props
  // Everything else goes on the wrapper, except the value props.
  const rest: Record<string, unknown> = { ...others }
  for (const key of ["value", "defaultValue", "onValueChange"]) delete rest[key]
  const id = React.useId()
  const listId = `${id}-list`
  const inputRef = React.useRef<HTMLInputElement>(null)
  const listRef = React.useRef<HTMLUListElement>(null)
  const rootRef = React.useRef<HTMLDivElement>(null)

  const initial = (props.defaultValue ?? (multiple ? [] : null)) as string[] | string | null
  const [uncontrolled, setUncontrolled] = React.useState(initial)
  const selected = (props.value !== undefined ? props.value : uncontrolled) as string[] | string | null
  const chosen: string[] = multiple ? ((selected as string[]) ?? []) : selected ? [selected as string] : []

  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [active, setActive] = React.useState(0)

  const single = !multiple ? options.find((o) => o.value === selected) : undefined
  // In single mode the field shows the chosen label until you start typing.
  const [typing, setTyping] = React.useState(false)
  const text = !multiple && !typing ? (single?.label ?? "") : query

  const matches = React.useMemo(() => {
    const q = fold(typing || multiple ? query : "")
    return options.filter((o) => !q || fold(o.label).includes(q) || (o.description && fold(o.description).includes(q)))
  }, [options, query, typing, multiple])
  const enabled = matches.filter((o) => !o.disabled)
  const current = enabled[Math.min(active, enabled.length - 1)]

  const commit = (next: string[] | string | null) => {
    setUncontrolled(next)
    ;(props.onValueChange as ((v: string[] | string | null) => void) | undefined)?.(next)
  }

  const choose = (option: ComboboxOption) => {
    if (option.disabled) return
    if (multiple) {
      commit(chosen.includes(option.value) ? chosen.filter((v) => v !== option.value) : [...chosen, option.value])
      // Options keep focus in the field (they cancel pointerdown), so you can keep typing.
      setQuery("")
    } else {
      commit(option.value)
      setTyping(false)
      setQuery("")
      setOpen(false)
    }
  }

  // Keep the highlighted option in view.
  React.useEffect(() => {
    if (!open || !current) return
    listRef.current?.querySelector(`[data-value="${CSS.escape(current.value)}"]`)?.scrollIntoView({ block: "nearest" })
  }, [open, current])

  // Close when focus or a click goes elsewhere.
  React.useEffect(() => {
    if (!open) return
    const onDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
        setTyping(false)
      }
    }
    document.addEventListener("pointerdown", onDown)
    return () => document.removeEventListener("pointerdown", onDown)
  }, [open])

  const groups = new Map<string, ComboboxOption[]>()
  for (const option of matches) {
    const key = option.group ?? ""
    groups.set(key, [...(groups.get(key) ?? []), option])
  }

  return (
    <div ref={rootRef} data-slot="combobox" className={cn("relative w-full", className)} {...(rest as React.ComponentProps<"div">)}>
      <label htmlFor={`${id}-input`} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      <div
        className={cn(
          "flex min-h-10 w-full flex-wrap items-center gap-1.5 rounded-lg border bg-background px-2.5 py-1.5 text-sm shadow-xs transition-[box-shadow,border-color] focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
          disabled && "pointer-events-none opacity-50",
        )}
        onPointerDown={(event) => {
          if (event.target === event.currentTarget) {
            event.preventDefault()
            inputRef.current?.focus()
            setOpen(true)
          }
        }}
      >
        {multiple
          ? chosen.map((v) => {
              const option = options.find((o) => o.value === v)
              return (
                <span key={v} className="inline-flex items-center gap-1 rounded-md bg-muted py-0.5 pr-1 pl-2 text-xs font-medium">
                  {option?.label ?? v}
                  <button
                    type="button"
                    onClick={() => commit(chosen.filter((x) => x !== v))}
                    aria-label={`Remove ${option?.label ?? v}`}
                    className="grid size-4 place-items-center rounded-sm text-muted-foreground outline-none hover:bg-background hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <X aria-hidden="true" className="size-3" />
                  </button>
                </span>
              )
            })
          : null}
        <input
          ref={inputRef}
          id={`${id}-input`}
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={open && current ? `${id}-${current.value}` : undefined}
          autoComplete="off"
          disabled={disabled}
          placeholder={multiple && chosen.length ? "" : placeholder}
          value={text}
          onChange={(event) => {
            setQuery(event.target.value)
            setTyping(true)
            setActive(0)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onClick={() => setOpen(true)}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown" || event.key === "ArrowUp") {
              event.preventDefault()
              if (!open) return setOpen(true)
              const step = event.key === "ArrowDown" ? 1 : -1
              setActive((i) => (Math.min(i, enabled.length - 1) + step + enabled.length) % Math.max(1, enabled.length))
            } else if (event.key === "Home" && open) {
              event.preventDefault()
              setActive(0)
            } else if (event.key === "End" && open) {
              event.preventDefault()
              setActive(enabled.length - 1)
            } else if (event.key === "Enter") {
              if (open && current) {
                event.preventDefault()
                choose(current)
              }
            } else if (event.key === "Escape") {
              if (open) {
                event.preventDefault()
                setOpen(false)
                setTyping(false)
              } else if (!multiple && selected) {
                commit(null)
              }
            } else if (event.key === "Backspace" && multiple && !query && chosen.length) {
              commit(chosen.slice(0, -1))
            } else if (event.key === "Tab") {
              setOpen(false)
              setTyping(false)
            }
          }}
          className="h-7 min-w-[6rem] flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
        />
        <ChevronsUpDown aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
      </div>

      {open ? (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          aria-label={label}
          aria-multiselectable={multiple || undefined}
          className="absolute inset-x-0 top-full z-50 mt-1.5 max-h-72 list-none overflow-y-auto rounded-lg border bg-popover p-1 text-popover-foreground shadow-lg"
        >
          {matches.length === 0 ? (
            <li role="presentation" className="px-3 py-6 text-center text-sm text-muted-foreground">
              {emptyText}
            </li>
          ) : (
            [...groups.entries()].map(([group, items]) => (
              <li key={group || "_"} role="presentation">
                {group ? <p className="px-2 pt-2 pb-1 text-xs font-medium text-muted-foreground">{group}</p> : null}
                <ul role="group" aria-label={group || undefined} className="list-none p-0">
                  {items.map((option) => {
                    const isSelected = chosen.includes(option.value)
                    const isActive = current?.value === option.value
                    return (
                      <li
                        key={option.value}
                        id={`${id}-${option.value}`}
                        data-value={option.value}
                        role="option"
                        aria-selected={isSelected}
                        aria-disabled={option.disabled || undefined}
                        onPointerDown={(event) => event.preventDefault()}
                        onPointerMove={() => {
                          const i = enabled.indexOf(option)
                          if (i >= 0 && i !== active) setActive(i)
                        }}
                        onClick={() => choose(option)}
                        className={cn(
                          "flex cursor-pointer items-start gap-2 rounded-md px-2 py-1.5 text-sm",
                          isActive && "bg-accent text-accent-foreground",
                          option.disabled && "cursor-not-allowed opacity-50",
                        )}
                      >
                        <Check aria-hidden="true" className={cn("mt-0.5 size-4 shrink-0", isSelected ? "opacity-100" : "opacity-0")} />
                        <span className="min-w-0">
                          <span className="block">
                            <Highlight text={option.label} query={typing || multiple ? query : ""} />
                          </span>
                          {option.description ? (
                            <span className="block text-xs text-muted-foreground">
                              <Highlight text={option.description} query={typing || multiple ? query : ""} />
                            </span>
                          ) : null}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </li>
            ))
          )}
        </ul>
      ) : null}
      <p aria-live="polite" className="sr-only">
        {open && (typing || multiple) && query ? `${matches.length} ${matches.length === 1 ? "result" : "results"}` : ""}
      </p>
    </div>
  )
}

export { Combobox }
