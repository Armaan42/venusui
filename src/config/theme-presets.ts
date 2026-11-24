import { DEFAULT_THEME, type ThemeConfig } from "@/config/themes"

export type ThemePreset = {
  id: string
  name: string
  description: string
  config: ThemeConfig
  /** Themes designed for one mode switch the site to it. */
  mode?: "light" | "dark"
}

const preset = (id: string, name: string, description: string, config: Partial<ThemeConfig>, mode?: ThemePreset["mode"]): ThemePreset => ({
  id,
  name,
  description,
  config: { ...DEFAULT_THEME, ...config },
  mode,
})

/** Ready-made themes: each sets every option at once, and any of them can be fine-tuned afterwards. */
export const THEME_PRESETS: ThemePreset[] = [
  preset("paper", "Paper", "Warm off-white, ink buttons", { base: "stone", tint: "subtle", radius: "0.3" }),
  preset(
    "midnight",
    "Midnight",
    "Navy depths, indigo light",
    { base: "slate", accent: "custom", color: "#5b5bd6", tint: "subtle", chart: "vivid", radius: "0.75" },
    "dark",
  ),
  preset("forest", "Forest", "Moss green on warm stone", {
    base: "stone",
    accent: "custom",
    color: "#2f7a4f",
    tint: "subtle",
    chart: "accent",
    radius: "0.5",
  }),
  preset("ocean", "Ocean", "Cool blues, soft corners", {
    base: "slate",
    accent: "custom",
    color: "#1f7fb8",
    tint: "subtle",
    chart: "accent",
    radius: "1",
  }),
  preset("sunset", "Sunset", "Coral and warm light", {
    base: "neutral",
    accent: "custom",
    color: "#e2583a",
    tint: "subtle",
    chart: "vivid",
    radius: "1",
  }),
  preset("graphite", "Graphite", "Sharp, quiet, neutral", { base: "zinc", radius: "0" }),
  preset("lavender", "Lavender", "Soft violet, round corners", {
    base: "zinc",
    accent: "custom",
    color: "#8a63d2",
    tint: "subtle",
    chart: "pastel",
    radius: "1",
  }),
  preset("clay", "Clay", "Terracotta and stone", {
    base: "stone",
    accent: "custom",
    color: "#b4532f",
    tint: "subtle",
    chart: "accent",
    radius: "0.5",
  }),
  preset("mint", "Mint", "Fresh and light", {
    base: "neutral",
    accent: "custom",
    color: "#1b9e83",
    tint: "subtle",
    chart: "pastel",
    radius: "0.75",
  }),
  preset("berry", "Berry", "Bold magenta", { base: "neutral", accent: "custom", color: "#c0267a", tint: "subtle", chart: "vivid" }),
  preset("sand", "Sand", "Golden amber on stone", {
    base: "stone",
    accent: "custom",
    color: "#a86b12",
    tint: "strong",
    chart: "accent",
    radius: "0.5",
  }),
  preset("cobalt", "Cobalt", "Crisp blue, tight corners", { base: "gray", accent: "blue", chart: "vivid", radius: "0.3" }),
]
