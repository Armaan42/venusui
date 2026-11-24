"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { ArrowUpRight, FileCode2, Monitor, Moon, RotateCcw, Smartphone, Sun, Tablet } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

import { CommandBlock } from "@/components/site/command-block"
import { CopyButton } from "@/components/site/copy-button"
import { useThemeState, type Mode } from "@/components/site/theme-config"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { AuroraBackground } from "@/registry/default/ui/aurora-background"
import { BorderBeam } from "@/registry/default/ui/border-beam"
import { SpotlightCard } from "@/registry/default/ui/spotlight-card"

const DottedGlobe = dynamic(() => import("@/registry/default/ui/dotted-globe").then((m) => m.DottedGlobe), {
  ssr: false,
  loading: () => (
    <div role="status" className="size-72 animate-pulse rounded-full bg-muted/50 motion-reduce:animate-none">
      <span className="sr-only">Loading globe</span>
    </div>
  ),
})

type Values = Record<string, number | string>

type Control =
  | { type: "range"; key: string; label: string; min: number; max: number; step: number; unit?: string }
  | { type: "swatch"; key: string; label: string; options: { label: string; value: string; preview: string }[] }

interface PlaygroundItem {
  name: string
  title: string
  component: string
  defaults: Values
  controls: Control[]
  render: (v: Values) => React.ReactNode
  /** The JSX the user would write, matching the preview exactly. */
  code: (v: Values) => string
}

const BEAM_COLORS = [
  { label: "Foreground", value: "var(--foreground)", preview: "var(--foreground)" },
  { label: "Violet", value: "oklch(0.65 0.22 290)", preview: "oklch(0.65 0.22 290)" },
  { label: "Sky", value: "oklch(0.75 0.14 230)", preview: "oklch(0.75 0.14 230)" },
  { label: "Emerald", value: "oklch(0.75 0.17 160)", preview: "oklch(0.75 0.17 160)" },
  { label: "Amber", value: "oklch(0.8 0.16 75)", preview: "oklch(0.8 0.16 75)" },
]

const AURORAS: Record<string, [string, string, string]> = {
  Northern: ["oklch(0.62 0.19 270)", "oklch(0.75 0.13 210)", "oklch(0.75 0.15 160)"],
  Sunset: ["oklch(0.68 0.2 30)", "oklch(0.78 0.15 70)", "oklch(0.62 0.22 350)"],
  Ocean: ["oklch(0.55 0.17 250)", "oklch(0.7 0.13 215)", "oklch(0.82 0.1 190)"],
  Orchid: ["oklch(0.6 0.22 310)", "oklch(0.7 0.18 340)", "oklch(0.65 0.2 280)"],
}

const SPOTLIGHTS = [
  { label: "Soft", value: "", preview: "color-mix(in oklch, var(--foreground) 35%, transparent)" },
  { label: "Violet", value: "oklch(0.65 0.22 290 / 0.3)", preview: "oklch(0.65 0.22 290)" },
  { label: "Sky", value: "oklch(0.75 0.14 230 / 0.3)", preview: "oklch(0.75 0.14 230)" },
  { label: "Emerald", value: "oklch(0.75 0.17 160 / 0.3)", preview: "oklch(0.75 0.17 160)" },
]

const ITEMS: PlaygroundItem[] = [
  {
    name: "dotted-globe",
    title: "Dotted Globe",
    component: "DottedGlobe",
    defaults: { dots: 1600, dotSize: 2, speed: 0.15 },
    controls: [
      { type: "range", key: "dots", label: "Dots", min: 300, max: 3000, step: 100 },
      { type: "range", key: "dotSize", label: "Dot size", min: 1, max: 4, step: 0.5, unit: "px" },
      { type: "range", key: "speed", label: "Speed", min: 0, max: 1, step: 0.05 },
    ],
    render: (v) => <DottedGlobe dots={Number(v.dots)} dotSize={Number(v.dotSize)} speed={Number(v.speed)} className="max-w-80" />,
    code: (v) => `<DottedGlobe\n  dots={${v.dots}}\n  dotSize={${v.dotSize}}\n  speed={${v.speed}}\n  className="h-96 w-full"\n/>`,
  },
  {
    name: "border-beam",
    title: "Border Beam",
    component: "BorderBeam",
    defaults: { duration: 6, color: BEAM_COLORS[0]!.value, borderWidth: 1.5, length: 12 },
    controls: [
      { type: "range", key: "duration", label: "Duration", min: 2, max: 14, step: 1, unit: "s" },
      { type: "range", key: "borderWidth", label: "Border width", min: 1, max: 4, step: 0.5, unit: "px" },
      { type: "range", key: "length", label: "Beam length", min: 4, max: 40, step: 1, unit: "%" },
      { type: "swatch", key: "color", label: "Color", options: BEAM_COLORS },
    ],
    render: (v) => (
      <div className="relative w-72 rounded-2xl border bg-card p-8">
        <p className="font-medium">Pro plan</p>
        <p className="mt-1 text-sm text-muted-foreground">A light runs around this card&apos;s border.</p>
        <BorderBeam duration={`${v.duration}s`} color={String(v.color)} borderWidth={Number(v.borderWidth)} length={Number(v.length)} />
      </div>
    ),
    code: (v) =>
      `<div className="relative rounded-2xl border p-8">\n  Your content\n  <BorderBeam\n    duration="${v.duration}s"\n    color="${v.color}"\n    borderWidth={${v.borderWidth}}\n    length={${v.length}}\n  />\n</div>`,
  },
  {
    name: "aurora-background",
    title: "Aurora Background",
    component: "AuroraBackground",
    defaults: { palette: "Northern", intensity: 0.35 },
    controls: [
      { type: "range", key: "intensity", label: "Intensity", min: 0.1, max: 1, step: 0.05 },
      {
        type: "swatch",
        key: "palette",
        label: "Palette",
        options: Object.entries(AURORAS).map(([label, colors]) => ({
          label,
          value: label,
          preview: `linear-gradient(135deg, ${colors.join(", ")})`,
        })),
      },
    ],
    render: (v) => (
      <AuroraBackground
        colors={AURORAS[String(v.palette)]}
        intensity={Number(v.intensity)}
        className="flex size-full items-center justify-center"
      >
        <p className="text-3xl font-semibold tracking-tight">Northern lights</p>
      </AuroraBackground>
    ),
    code: (v) =>
      `<AuroraBackground\n  colors={[\n${AURORAS[String(v.palette)]!.map((c) => `    "${c}",`).join("\n")}\n  ]}\n  intensity={${v.intensity}}\n  className="flex h-96 items-center justify-center"\n>\n  <h2>Northern lights</h2>\n</AuroraBackground>`,
  },
  {
    name: "spotlight-card",
    title: "Spotlight Card",
    component: "SpotlightCard",
    defaults: { radius: 320, spotlightColor: "" },
    controls: [
      { type: "range", key: "radius", label: "Radius", min: 100, max: 600, step: 20, unit: "px" },
      { type: "swatch", key: "spotlightColor", label: "Light", options: SPOTLIGHTS },
    ],
    render: (v) => (
      <SpotlightCard radius={Number(v.radius)} spotlightColor={String(v.spotlightColor) || undefined} className="w-80 p-6">
        <p className="font-medium">Move your pointer here</p>
        <p className="mt-1 text-sm text-muted-foreground">The light follows it across the card.</p>
      </SpotlightCard>
    ),
    code: (v) =>
      `<SpotlightCard\n  radius={${v.radius}}${v.spotlightColor ? `\n  spotlightColor="${v.spotlightColor}"` : ""}\n  className="p-6"\n>\n  Your content\n</SpotlightCard>`,
  },
]

/** Colors tags, attribute names and values; everything else stays plain. The playground sits on a dark stage. */
function HighlightedCode({ code }: { code: string }) {
  const parts = code.split(/(<\/?[A-Za-z]+|\b[a-zA-Z]+(?==)|"[^"\n]*"|\{[^{}\n]*\})/g)
  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null
        const className = part.startsWith("<")
          ? "text-sky-300"
          : part.startsWith('"')
            ? "text-emerald-300"
            : part.startsWith("{")
              ? "text-amber-300"
              : parts[i + 1]?.startsWith("=")
                ? "text-violet-300"
                : undefined
        return className ? (
          <span key={i} className={className}>
            {part}
          </span>
        ) : (
          part
        )
      })}
    </>
  )
}

/**
 * The code, line by line. Lines that changed since the last render flash in the
 * accent color, so you can see exactly what a prop change did to the code.
 */
function CodeLines({ code }: { code: string }) {
  const [state, setState] = React.useState<{ code: string; changed: Set<number>; version: number }>({
    code,
    changed: new Set(),
    version: 0,
  })
  if (state.code !== code) {
    const before = state.code.split("\n")
    const after = code.split("\n")
    const changed = new Set(after.flatMap((line, i) => (line !== before[i] ? [i] : [])))
    setState({ code, changed, version: state.version + 1 })
  }
  return (
    <>
      {code.split("\n").map((line, i) => (
        <span
          key={state.changed.has(i) ? `${i}-${state.version}` : i}
          className={cn("-mx-4 block px-4", state.changed.has(i) && "animate-code-flash motion-reduce:animate-none")}
        >
          <HighlightedCode code={line} />
          {"\n"}
        </span>
      ))}
    </>
  )
}

/** A number that rolls: the old value slides up and out while the new one slides in. */
function RollingValue({ value, unit }: { value: number | string; unit?: string }) {
  return (
    <span className="relative inline-flex overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={String(value)}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 520, damping: 34 }}
        >
          {value}
          {unit}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function RangeControl({
  control,
  value,
  onChange,
}: {
  control: Extract<Control, { type: "range" }>
  value: number
  onChange: (v: number) => void
}) {
  const id = React.useId()
  const percent = ((value - control.min) / (control.max - control.min)) * 100
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between text-sm">
        <label htmlFor={id}>{control.label}</label>
        <output htmlFor={id} className="font-mono text-xs text-muted-foreground tabular-nums">
          <RollingValue value={value} unit={control.unit} />
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={control.min}
        max={control.max}
        step={control.step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        style={{ "--fill": `${percent}%` } as React.CSSProperties}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-[linear-gradient(to_right,var(--primary)_var(--fill),var(--muted)_var(--fill))] outline-none focus-visible:ring-3 focus-visible:ring-ring/50 [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:bg-background [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:bg-background [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_color-mix(in_oklch,var(--primary)_25%,transparent)] [&::-webkit-slider-thumb]:transition-transform active:[&::-webkit-slider-thumb]:scale-110"
      />
    </div>
  )
}

function SwatchControl({
  control,
  value,
  onChange,
}: {
  control: Extract<Control, { type: "swatch" }>
  value: string
  onChange: (v: string) => void
}) {
  const name = React.useId()
  return (
    <fieldset className="space-y-2">
      <legend className="text-sm">{control.label}</legend>
      <div className="flex flex-wrap gap-2 pt-2">
        {control.options.map((option) => (
          <label
            key={option.label}
            className="relative flex cursor-pointer items-center gap-2 rounded-full border px-2.5 py-1 text-xs text-muted-foreground transition-colors has-checked:border-foreground/40 has-checked:bg-muted has-checked:text-foreground has-focus-visible:ring-3 has-focus-visible:ring-ring/50"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            <span aria-hidden="true" className="size-3 rounded-full border" style={{ background: option.preview }} />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  )
}

/** Preview widths. The preview is rendered in place, so these narrow its container (not the viewport). */
const WIDTHS = [
  { id: "full", label: "Full width", icon: Monitor, maxWidth: undefined },
  { id: "tablet", label: "Tablet width (600px)", icon: Tablet, maxWidth: 600 },
  { id: "phone", label: "Phone width (360px)", icon: Smartphone, maxWidth: 360 },
] as const

type WidthId = (typeof WIDTHS)[number]["id"]

const toolButton =
  "grid size-7 place-items-center rounded-md text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 aria-pressed:bg-background aria-pressed:text-foreground aria-pressed:shadow-xs"

/**
 * The live preview with its own width and light/dark switches (scoped to the
 * preview only). Switching component flips the stage over in 3D.
 */
function PreviewStage({ item, values }: { item: PlaygroundItem; values: Values }) {
  const site = useThemeState().mode
  const [width, setWidth] = React.useState<WidthId>("full")
  const [modeOverride, setModeOverride] = React.useState<Mode | null>(null)
  const mode = modeOverride ?? site
  const maxWidth = WIDTHS.find((w) => w.id === width)?.maxWidth

  return (
    <div className="flex min-w-0 flex-col overflow-hidden rounded-xl border bg-card shadow-[0_40px_80px_-40px_rgb(0_0_0/0.8)]">
      <div className="flex items-center justify-between gap-2 border-b px-2 py-1.5">
        <div role="group" aria-label="Preview width" className="flex items-center gap-0.5 rounded-lg bg-muted p-0.5">
          {WIDTHS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              aria-label={label}
              title={label}
              aria-pressed={width === id}
              onClick={() => setWidth(id)}
              className={toolButton}
            >
              <Icon aria-hidden="true" className="size-3.5" />
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {maxWidth ? <span className="font-mono text-[11px] text-muted-foreground tabular-nums">{maxWidth}px</span> : null}
          <div role="group" aria-label="Preview theme" className="flex items-center gap-0.5 rounded-lg bg-muted p-0.5">
            {(["light", "dark"] as const).map((m) => {
              const Icon = m === "light" ? Sun : Moon
              return (
                <button
                  key={m}
                  type="button"
                  aria-label={m === "light" ? "Light preview" : "Dark preview"}
                  title={m === "light" ? "Light preview" : "Dark preview"}
                  aria-pressed={mode === m}
                  onClick={() => setModeOverride(m === site ? null : m)}
                  className={toolButton}
                >
                  <Icon aria-hidden="true" className="size-3.5" />
                </button>
              )
            })}
          </div>
        </div>
      </div>
      {/* `light` / `dark` scope the theme variables (and the dark: variant) to the preview. */}
      <div
        className={cn(
          mode,
          "flex h-96 justify-center bg-muted bg-[repeating-linear-gradient(135deg,var(--border)_0_1px,transparent_1px_9px)] text-foreground [perspective:1400px]",
        )}
      >
        <div
          data-width={width}
          className="relative flex h-full w-full items-center justify-center overflow-hidden bg-background transition-[max-width] duration-300 ease-out data-[width=full]:border-x-0 motion-reduce:transition-none [&:not([data-width=full])]:border-x [&:not([data-width=full])]:border-dashed"
          style={{ maxWidth: maxWidth ?? "100%" }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={item.name}
              className="flex size-full items-center justify-center"
              initial={{ opacity: 0, rotateY: -24, scale: 0.94, filter: "blur(8px)" }}
              animate={{ opacity: 1, rotateY: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, rotateY: 18, scale: 0.96, filter: "blur(6px)" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {item.render(values)}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

/** One component's preview, props, code and install command. */
function PlaygroundPanel({
  item,
  values,
  command,
  onChange,
  onReset,
}: {
  item: PlaygroundItem
  values: Values
  command: string
  onChange: (key: string, value: number | string) => void
  onReset: () => void
}) {
  const code = `import { ${item.component} } from "@/components/ui/${item.name}"\n\n${item.code(values)}`
  const isDefault = item.controls.every((c) => values[c.key] === item.defaults[c.key])

  return (
    <div className="space-y-4">
      <div className="grid gap-4 [perspective:1600px] lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div data-pg-frame className="min-w-0">
          <PreviewStage item={item} values={values} />
        </div>

        <div data-pg-side className="flex flex-col gap-5 rounded-xl border bg-card/80 p-5 backdrop-blur">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">{item.title} props</h3>
            <button
              type="button"
              onClick={onReset}
              disabled={isDefault}
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-40"
            >
              <RotateCcw aria-hidden="true" className="size-3" />
              Reset
            </button>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={item.name}
              className="flex flex-col gap-5"
              initial="hidden"
              animate="shown"
              exit="hidden"
              variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.06 } } }}
            >
              {item.controls.map((control) => (
                <motion.div
                  key={control.key}
                  variants={{ hidden: { opacity: 0, x: 16 }, shown: { opacity: 1, x: 0 } }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  {control.type === "range" ? (
                    <RangeControl control={control} value={Number(values[control.key])} onChange={(v) => onChange(control.key, v)} />
                  ) : (
                    <SwatchControl control={control} value={String(values[control.key])} onChange={(v) => onChange(control.key, v)} />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
          <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 text-sm">
            <Link
              href={`/components/${item.name}#files`}
              className="inline-flex items-center gap-1 rounded-sm text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <FileCode2 aria-hidden="true" className="size-3.5" />
              View source
            </Link>
            <Link
              href={`/components/${item.name}`}
              className="inline-flex items-center gap-1 rounded-sm text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              Docs <ArrowUpRight aria-hidden="true" className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>

      <div data-pg-code className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="relative min-w-0 rounded-xl border bg-card/80 backdrop-blur">
          <CopyButton value={code} label={`Copy ${item.title} code`} className="absolute top-2 right-2" />
          <pre
            tabIndex={0}
            className="overflow-x-auto p-4 pr-12 font-mono text-[13px] leading-6 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset"
          >
            <code>
              <CodeLines code={code} />
            </code>
          </pre>
        </div>
        <div className="min-w-0 space-y-2">
          <p className="text-sm text-muted-foreground">Install it first:</p>
          <CommandBlock packageManagers={false} command={command} copyLabel={`Copy install command for ${item.title}`} />
        </div>
      </div>
    </div>
  )
}

/**
 * Pick a component, change its props, and see the live result and the exact
 * code for it. Values are kept per component while switching tabs. The panel
 * stays mounted while you switch, so the scroll entrance and the 3D flip of
 * the preview both apply to it; the active tab's pill slides between tabs.
 */
export function Playground({ commands }: { commands: Record<string, string> }) {
  const [active, setActive] = React.useState(ITEMS[0]!.name)
  const [values, setValues] = React.useState<Record<string, Values>>(() =>
    Object.fromEntries(ITEMS.map((item) => [item.name, { ...item.defaults }])),
  )
  const item = ITEMS.find((entry) => entry.name === active) ?? ITEMS[0]!

  return (
    <Tabs value={active} onValueChange={setActive} className="gap-5" data-pg-pin>
      <div className="max-w-full overflow-x-auto">
        <TabsList aria-label="Component to try" className="mx-auto flex h-10 w-max rounded-full border bg-card/70 p-1 backdrop-blur">
          {ITEMS.map((entry) => (
            <TabsTrigger
              key={entry.name}
              value={entry.name}
              className="relative rounded-full px-4 data-[state=active]:bg-transparent data-[state=active]:shadow-none dark:data-[state=active]:border-transparent dark:data-[state=active]:bg-transparent"
            >
              {active === entry.name ? (
                <motion.span
                  layoutId="playground-tab"
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 rounded-full bg-primary/15 ring-1 ring-primary/40"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              ) : null}
              <span className="relative">{entry.title}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      <TabsContent value={active} className="mt-0">
        <PlaygroundPanel
          item={item}
          values={values[item.name] ?? item.defaults}
          command={commands[item.name] ?? ""}
          onChange={(key, value) => setValues((all) => ({ ...all, [item.name]: { ...all[item.name], [key]: value } }))}
          onReset={() => setValues((all) => ({ ...all, [item.name]: { ...item.defaults } }))}
        />
      </TabsContent>
    </Tabs>
  )
}
