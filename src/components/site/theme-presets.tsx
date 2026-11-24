"use client"

import { Check, Shuffle } from "lucide-react"

import { setMode, setThemeConfig, useThemeState } from "@/components/site/theme-config"
import { Button } from "@/components/ui/button"
import { THEME_PRESETS, type ThemePreset } from "@/config/theme-presets"
import { sameTheme, themeVars } from "@/config/themes"
import { cn } from "@/lib/utils"

function apply(preset: ThemePreset) {
  setThemeConfig(preset.config)
  if (preset.mode) setMode(preset.mode)
}

/** A preset as a small picture of itself: page, card, chart and button in its own colors and corners. */
function PresetCard({ preset, active, mode }: { preset: ThemePreset; active: boolean; mode: "light" | "dark" }) {
  const vars = themeVars(preset.config)[preset.mode ?? mode]
  const radius = `${preset.config.radius}rem`
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={() => apply(preset)}
      className={cn(
        "group flex w-full flex-col overflow-hidden rounded-xl border bg-card text-left outline-none transition-shadow hover:shadow-md focus-visible:ring-3 focus-visible:ring-ring/50",
        active && "ring-2 ring-foreground ring-offset-2 ring-offset-background",
      )}
    >
      <span aria-hidden="true" className="relative block h-28 w-full p-3" style={{ background: vars.background }}>
        <span
          className="flex h-full flex-col justify-between border p-3 transition-transform duration-300 group-hover:-translate-y-0.5"
          style={{ background: vars.card, borderColor: vars.border, borderRadius: radius }}
        >
          <span className="block h-1.5 w-1/2 rounded-full" style={{ background: vars.muted }} />
          <span className="flex h-9 items-end gap-1">
            {[55, 85, 65, 100, 75].map((height, i) => (
              <span key={i} className="w-2.5 rounded-t-[2px]" style={{ height: `${height}%`, background: vars[`chart-${i + 1}`] }} />
            ))}
          </span>
        </span>
        <span
          className="absolute top-5 right-5 px-2.5 py-1 text-[10px] font-semibold"
          style={{ background: vars.primary, color: vars["primary-foreground"], borderRadius: `calc(${radius} * 0.8)` }}
        >
          Button
        </span>
      </span>
      <span className="flex items-center justify-between gap-2 border-t px-3 py-2.5">
        <span className="min-w-0">
          <span className="block text-sm font-medium">{preset.name}</span>
          <span className="block truncate text-xs text-muted-foreground">{preset.description}</span>
        </span>
        {active ? (
          <span className="inline-flex shrink-0 items-center gap-1 text-xs font-medium">
            <Check aria-hidden="true" className="size-3.5" />
            Applied
          </span>
        ) : null}
      </span>
    </button>
  )
}

/**
 * Ready-made themes: one click sets the base color, accent, tint, charts and
 * radius together (and dark mode for themes made for it). Shuffle picks one
 * at random. The customizer then shows the preset's settings to fine-tune.
 */
export function ThemePresets() {
  const theme = useThemeState()
  const current = THEME_PRESETS.find((preset) => sameTheme(preset.config, theme))

  const shuffle = () => {
    const others = THEME_PRESETS.filter((preset) => preset !== current)
    apply(others[Math.floor(Math.random() * others.length)])
  }

  return (
    <section aria-labelledby="presets" className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="presets" className="text-lg font-semibold tracking-tight">
            Ready-made themes
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">Complete looks in one click. Fine-tune any of them with the controls.</p>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={shuffle}>
          <Shuffle aria-hidden="true" />
          Shuffle
        </Button>
      </div>
      <ul className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {THEME_PRESETS.map((preset) => (
          <li key={preset.id}>
            <PresetCard preset={preset} active={current?.id === preset.id} mode={theme.mode} />
          </li>
        ))}
      </ul>
      <p role="status" className="sr-only">
        {current ? `${current.name} theme applied` : ""}
      </p>
    </section>
  )
}
