"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const FocusGridContext = React.createContext<{
  active: string | null
  setActive: (id: string | null) => void
} | null>(null)

/**
 * A grid that puts one item in the spotlight. The item under the pointer, or
 * the one holding keyboard focus, comes forward while the others dim and
 * soften. On touch screens a tap does the same, and tapping outside clears it.
 * Set the columns with `className`, e.g. `grid-cols-2 lg:grid-cols-3`.
 */
function FocusGrid({ className, onPointerLeave, onBlur, ...props }: React.ComponentProps<"ul">) {
  const [active, setActive] = React.useState<string | null>(null)
  const ref = React.useRef<HTMLUListElement>(null)

  // A tap outside the grid clears the spotlight on touch screens.
  React.useEffect(() => {
    if (active === null) return
    const onDown = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) setActive(null)
    }
    document.addEventListener("pointerdown", onDown)
    return () => document.removeEventListener("pointerdown", onDown)
  }, [active])

  return (
    <FocusGridContext.Provider value={{ active, setActive }}>
      <ul
        ref={ref}
        data-slot="focus-grid"
        data-spotlight={active !== null ? "" : undefined}
        onPointerLeave={(event) => {
          onPointerLeave?.(event)
          if (event.pointerType === "mouse" && !ref.current?.contains(document.activeElement)) setActive(null)
        }}
        onBlur={(event) => {
          onBlur?.(event)
          if (!event.currentTarget.contains(event.relatedTarget)) setActive(null)
        }}
        className={cn("grid list-none gap-4 p-0", className)}
        {...props}
      />
    </FocusGridContext.Provider>
  )
}

function FocusGridItem({ className, onPointerEnter, onPointerDown, onFocus, ...props }: React.ComponentProps<"li">) {
  const context = React.use(FocusGridContext)
  if (!context) throw new Error("FocusGridItem must be used inside FocusGrid")
  const { active, setActive } = context
  const id = React.useId()
  const state = active === null ? "idle" : active === id ? "active" : "dimmed"

  return (
    <li
      data-slot="focus-grid-item"
      data-state={state}
      onPointerEnter={(event) => {
        onPointerEnter?.(event)
        if (event.pointerType === "mouse") setActive(id)
      }}
      onPointerDown={(event) => {
        onPointerDown?.(event)
        if (event.pointerType !== "mouse") setActive(active === id ? null : id)
      }}
      onFocus={(event) => {
        onFocus?.(event)
        setActive(id)
      }}
      className={cn(
        "relative transition-[opacity,filter,scale] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "data-[state=active]:z-10 data-[state=active]:scale-[1.03]",
        "data-[state=dimmed]:scale-[0.97] data-[state=dimmed]:opacity-45 data-[state=dimmed]:blur-[2px] data-[state=dimmed]:saturate-50",
        "motion-reduce:transition-opacity motion-reduce:data-[state=active]:scale-100 motion-reduce:data-[state=dimmed]:scale-100 motion-reduce:data-[state=dimmed]:blur-none",
        className,
      )}
      {...props}
    />
  )
}

export { FocusGrid, FocusGridItem }
