"use client"

import * as React from "react"
import { Moon, RotateCcw, Sun } from "lucide-react"

import { CopyButton } from "@/components/site/copy-button"
import { setMode, setThemeConfig, useThemeState, type Mode } from "@/components/site/theme-config"
import {
  ACCENTS,
  BASE_COLORS,
  CHART_PALETTES,
  customAccent,
  DEFAULT_THEME,
  oklchToHex,
  parseOklch,
  RADII,
  sameTheme,
  themeCss,
  themeVars,
  TINTS,
  type Accent,
  type BaseColor,
  type ChartPalette,
  type Radius,
  type Tint,
} from "@/config/themes"
import { cn } from "@/lib/utils"

/** One choice in a group: a native radio styled as a pill, so arrow keys and screen readers work as usual. */
function Choice({
  name,
  value,
  checked,
  onSelect,
  swatch,
  children,
}: {
  name: string
  value: string
  checked: boolean
  onSelect: () => void
  swatch?: string
  children: React.ReactNode
}) {
  return (
    <label
      className={cn(
        "relative flex h-8 cursor-pointer items-center gap-2 rounded-md border px-2.5 text-xs text-muted-foreground transition-colors select-none hover:text-foreground",
        "has-checked:border-foreground/50 has-checked:bg-muted has-checked:text-foreground has-focus-visible:ring-3 has-focus-visible:ring-ring/50",
      )}
    >
      <input type="radio" name={name} value={value} checked={checked} onChange={onSelect} className="sr-only" />
      {swatch ? (
        <span aria-hidden="true" className="size-3.5 shrink-0 rounded-full border border-foreground/10" style={{ background: swatch }} />
      ) : null}
      {children}
    </label>
  )
}

function Group({ legend, children, className }: { legend: string; children: React.ReactNode; className?: string }) {
  return (
    <fieldset className="space-y-2">
      <legend className="text-xs font-medium">{legend}</legend>
      <div className={cn("grid gap-1.5", className)}>{children}</div>
    </fieldset>
  )
}

/** The rainbow swatch for "Custom" before a color is chosen. */
const RAINBOW =
  "conic-gradient(oklch(0.65 0.2 20), oklch(0.8 0.16 90), oklch(0.7 0.16 160), oklch(0.6 0.18 250), oklch(0.6 0.2 310), oklch(0.65 0.2 20))"

/**
 * The custom color: a color picker and a hex field, with how readable button
 * text is in light and dark. Shades are adjusted automatically when needed.
 */
function CustomColor({ color }: { color: string }) {
  const id = React.useId()
  const [draft, setDraft] = React.useState(color)
  const [editing, setEditing] = React.useState(false)
  const shown = editing ? draft : color
  const valid = /^#[0-9a-f]{6}$/i.test(shown)
  const accent = customAccent(color)
  const adjusted = oklchToHex(parseOklch(accent.light.primary)) !== color.toLowerCase()

  const pick = (value: string) => setThemeConfig({ accent: "custom", color: value })

  return (
    <div className="space-y-3 rounded-lg border border-dashed bg-muted/40 p-3">
      <div className="flex items-center gap-2">
        <label
          className="relative size-9 shrink-0 cursor-pointer overflow-hidden rounded-md border shadow-xs has-focus-visible:ring-3 has-focus-visible:ring-ring/50"
          style={{ background: color }}
        >
          <span className="sr-only">Pick your color</span>
          <input
            type="color"
            value={color}
            onChange={(event) => pick(event.target.value)}
            className="absolute inset-0 size-full cursor-pointer opacity-0"
          />
        </label>
        <div className="min-w-0 flex-1">
          <label htmlFor={`${id}-hex`} className="sr-only">
            Hex color
          </label>
          <input
            id={`${id}-hex`}
            value={shown}
            spellCheck={false}
            autoComplete="off"
            maxLength={7}
            aria-invalid={!valid || undefined}
            aria-describedby={`${id}-hint`}
            onFocus={() => {
              setDraft(color)
              setEditing(true)
            }}
            onBlur={() => setEditing(false)}
            onChange={(event) => {
              let value = event.target.value.trim()
              if (value && !value.startsWith("#")) value = `#${value}`
              setDraft(value)
              if (/^#[0-9a-f]{6}$/i.test(value)) pick(value.toLowerCase())
            }}
            className="h-9 w-full rounded-md border bg-background px-2.5 font-mono text-xs outline-none focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive"
          />
        </div>
      </div>
      <dl className="grid grid-cols-[1fr_auto_auto] items-center gap-x-2.5 gap-y-1.5 text-xs">
        {(["light", "dark"] as const).map((mode) => (
          <React.Fragment key={mode}>
            <dt className="text-muted-foreground">{mode === "light" ? "Light" : "Dark"} · button text</dt>
            <dd aria-hidden="true">
              <span
                className="inline-flex h-5 items-center rounded px-1.5 text-[11px] font-semibold"
                style={{ background: accent[mode].primary, color: accent[mode]["primary-foreground"] }}
              >
                Aa
              </span>
            </dd>
            <dd className="font-medium text-foreground tabular-nums">
              {accent.contrast[mode].toFixed(1)} : 1 <span className="text-muted-foreground">AA</span>
            </dd>
          </React.Fragment>
        ))}
      </dl>
      <p id={`${id}-hint`} className="text-[11px] leading-4 text-muted-foreground">
        {!valid
          ? "Enter a hex color like #4f46e5."
          : adjusted
            ? "Light mode uses a deeper shade so button text stays readable."
            : "Shades are adjusted when needed so button text always reads clearly."}
      </p>
    </div>
  )
}

/**
 * Pick the site theme: light or dark, a base color, an accent (any color with
 * Custom), surface tint, chart colors and the corner radius. Every page,
 * preview and block follows it live, and it's remembered for the next visit.
 * "Copy CSS" gives the matching globals.css block.
 */
export function ThemeCustomizer({ className }: { className?: string }) {
  const theme = useThemeState()
  const id = React.useId()
  const isDefault = sameTheme(theme, DEFAULT_THEME)

  return (
    <div data-slot="theme-customizer" className={cn("flex flex-col gap-4", className)}>
      <Group legend="Mode" className="grid-cols-2">
        {(["light", "dark"] as Mode[]).map((mode) => (
          <Choice key={mode} name={`${id}-mode`} value={mode} checked={theme.mode === mode} onSelect={() => setMode(mode)}>
            {mode === "light" ? <Sun aria-hidden="true" className="size-3.5" /> : <Moon aria-hidden="true" className="size-3.5" />}
            {mode === "light" ? "Light" : "Dark"}
          </Choice>
        ))}
      </Group>

      <Group legend="Base color" className="grid-cols-3">
        {(Object.keys(BASE_COLORS) as BaseColor[]).map((base) => (
          <Choice
            key={base}
            name={`${id}-base`}
            value={base}
            checked={theme.base === base}
            onSelect={() => setThemeConfig({ base })}
            swatch={BASE_COLORS[base].light["muted-foreground"]}
          >
            {BASE_COLORS[base].label}
          </Choice>
        ))}
      </Group>

      <div className="space-y-2">
        <Group legend="Accent" className="grid-cols-3">
          {(Object.keys(ACCENTS) as Accent[]).map((accent) => (
            <Choice
              key={accent}
              name={`${id}-accent`}
              value={accent}
              checked={theme.accent === accent}
              onSelect={() => setThemeConfig({ accent })}
              swatch={accent === "default" ? "var(--foreground)" : ACCENTS[accent].light.primary}
            >
              {ACCENTS[accent].label}
            </Choice>
          ))}
          <Choice
            name={`${id}-accent`}
            value="custom"
            checked={theme.accent === "custom"}
            onSelect={() => setThemeConfig({ accent: "custom" })}
            swatch={theme.accent === "custom" ? theme.color : RAINBOW}
          >
            Custom
          </Choice>
        </Group>
        {theme.accent === "custom" ? <CustomColor color={theme.color} /> : null}
      </div>

      <Group legend="Surface tint" className="grid-cols-3">
        {(Object.keys(TINTS) as Tint[]).map((tint) => (
          <Choice key={tint} name={`${id}-tint`} value={tint} checked={theme.tint === tint} onSelect={() => setThemeConfig({ tint })}>
            {TINTS[tint]}
          </Choice>
        ))}
      </Group>

      <Group legend="Charts" className="grid-cols-2">
        {(Object.keys(CHART_PALETTES) as ChartPalette[]).map((chart) => {
          const vars = themeVars({ ...theme, chart })[theme.mode]
          const stops = [1, 2, 3, 4, 5].map((n) => vars[`chart-${n}`]).join(", ")
          return (
            <Choice
              key={chart}
              name={`${id}-chart`}
              value={chart}
              checked={theme.chart === chart}
              onSelect={() => setThemeConfig({ chart })}
              swatch={`linear-gradient(90deg, ${stops})`}
            >
              {CHART_PALETTES[chart]}
            </Choice>
          )
        })}
      </Group>

      <Group legend="Radius" className="grid-cols-3">
        {RADII.map((radius: Radius) => (
          <Choice
            key={radius}
            name={`${id}-radius`}
            value={radius}
            checked={theme.radius === radius}
            onSelect={() => setThemeConfig({ radius })}
          >
            <span className="w-full text-center font-mono">{radius}</span>
          </Choice>
        ))}
      </Group>

      <div className="flex items-center justify-between gap-2 border-t pt-3">
        <button
          type="button"
          onClick={() => setThemeConfig(DEFAULT_THEME)}
          disabled={isDefault}
          className="inline-flex h-8 items-center gap-1.5 rounded-md px-2 text-xs text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-40"
        >
          <RotateCcw aria-hidden="true" className="size-3.5" />
          Reset
        </button>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          Copy CSS
          <CopyButton value={themeCss(theme)} label="Copy theme CSS for globals.css" />
        </div>
      </div>
    </div>
  )
}
