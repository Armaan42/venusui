/**
 * Site themes: base colors (shadcn's official palettes, from
 * ui.shadcn.com/r/colors/<name>.json), accent colors and corner radius.
 *
 * One source of truth for three things:
 * - src/styles/themes.css, generated from this file by `node scripts/themes.mts`
 * - the theme picker (header and /themes), which sets data attributes on <html>
 * - "Copy CSS", which turns the chosen theme into a globals.css block
 */

export type ThemeVars = Record<string, string>

export const BASE_COLORS = {
  neutral: {
    label: "Neutral",
    light: {
      background: "oklch(1 0 0)",
      foreground: "oklch(0.145 0 0)",
      card: "oklch(1 0 0)",
      "card-foreground": "oklch(0.145 0 0)",
      popover: "oklch(1 0 0)",
      "popover-foreground": "oklch(0.145 0 0)",
      primary: "oklch(0.205 0 0)",
      "primary-foreground": "oklch(0.985 0 0)",
      secondary: "oklch(0.97 0 0)",
      "secondary-foreground": "oklch(0.205 0 0)",
      muted: "oklch(0.97 0 0)",
      "muted-foreground": "oklch(0.556 0 0)",
      accent: "oklch(0.97 0 0)",
      "accent-foreground": "oklch(0.205 0 0)",
      destructive: "oklch(0.577 0.245 27.325)",
      border: "oklch(0.922 0 0)",
      input: "oklch(0.922 0 0)",
      ring: "oklch(0.708 0 0)",
      "chart-1": "oklch(0.87 0 0)",
      "chart-2": "oklch(0.556 0 0)",
      "chart-3": "oklch(0.439 0 0)",
      "chart-4": "oklch(0.371 0 0)",
      "chart-5": "oklch(0.269 0 0)",
      sidebar: "oklch(0.985 0 0)",
      "sidebar-foreground": "oklch(0.145 0 0)",
      "sidebar-primary": "oklch(0.205 0 0)",
      "sidebar-primary-foreground": "oklch(0.985 0 0)",
      "sidebar-accent": "oklch(0.97 0 0)",
      "sidebar-accent-foreground": "oklch(0.205 0 0)",
      "sidebar-border": "oklch(0.922 0 0)",
      "sidebar-ring": "oklch(0.708 0 0)",
    },
    dark: {
      background: "oklch(0.145 0 0)",
      foreground: "oklch(0.985 0 0)",
      card: "oklch(0.205 0 0)",
      "card-foreground": "oklch(0.985 0 0)",
      popover: "oklch(0.205 0 0)",
      "popover-foreground": "oklch(0.985 0 0)",
      primary: "oklch(0.922 0 0)",
      "primary-foreground": "oklch(0.205 0 0)",
      secondary: "oklch(0.269 0 0)",
      "secondary-foreground": "oklch(0.985 0 0)",
      muted: "oklch(0.269 0 0)",
      "muted-foreground": "oklch(0.708 0 0)",
      accent: "oklch(0.269 0 0)",
      "accent-foreground": "oklch(0.985 0 0)",
      destructive: "oklch(0.704 0.191 22.216)",
      border: "oklch(1 0 0 / 10%)",
      input: "oklch(1 0 0 / 15%)",
      ring: "oklch(0.556 0 0)",
      "chart-1": "oklch(0.87 0 0)",
      "chart-2": "oklch(0.556 0 0)",
      "chart-3": "oklch(0.439 0 0)",
      "chart-4": "oklch(0.371 0 0)",
      "chart-5": "oklch(0.269 0 0)",
      sidebar: "oklch(0.205 0 0)",
      "sidebar-foreground": "oklch(0.985 0 0)",
      "sidebar-primary": "oklch(0.488 0.243 264.376)",
      "sidebar-primary-foreground": "oklch(0.985 0 0)",
      "sidebar-accent": "oklch(0.269 0 0)",
      "sidebar-accent-foreground": "oklch(0.985 0 0)",
      "sidebar-border": "oklch(1 0 0 / 10%)",
      "sidebar-ring": "oklch(0.556 0 0)",
    },
  },
  zinc: {
    label: "Zinc",
    light: {
      background: "oklch(1 0 0)",
      foreground: "oklch(0.141 0.005 285.823)",
      card: "oklch(1 0 0)",
      "card-foreground": "oklch(0.141 0.005 285.823)",
      popover: "oklch(1 0 0)",
      "popover-foreground": "oklch(0.141 0.005 285.823)",
      primary: "oklch(0.21 0.006 285.885)",
      "primary-foreground": "oklch(0.985 0 0)",
      secondary: "oklch(0.967 0.001 286.375)",
      "secondary-foreground": "oklch(0.21 0.006 285.885)",
      muted: "oklch(0.967 0.001 286.375)",
      "muted-foreground": "oklch(0.552 0.016 285.938)",
      accent: "oklch(0.967 0.001 286.375)",
      "accent-foreground": "oklch(0.21 0.006 285.885)",
      destructive: "oklch(0.577 0.245 27.325)",
      border: "oklch(0.92 0.004 286.32)",
      input: "oklch(0.92 0.004 286.32)",
      ring: "oklch(0.705 0.015 286.067)",
      "chart-1": "oklch(0.871 0.006 286.286)",
      "chart-2": "oklch(0.552 0.016 285.938)",
      "chart-3": "oklch(0.442 0.017 285.786)",
      "chart-4": "oklch(0.37 0.013 285.805)",
      "chart-5": "oklch(0.274 0.006 286.033)",
      sidebar: "oklch(0.985 0 0)",
      "sidebar-foreground": "oklch(0.141 0.005 285.823)",
      "sidebar-primary": "oklch(0.21 0.006 285.885)",
      "sidebar-primary-foreground": "oklch(0.985 0 0)",
      "sidebar-accent": "oklch(0.967 0.001 286.375)",
      "sidebar-accent-foreground": "oklch(0.21 0.006 285.885)",
      "sidebar-border": "oklch(0.92 0.004 286.32)",
      "sidebar-ring": "oklch(0.705 0.015 286.067)",
    },
    dark: {
      background: "oklch(0.141 0.005 285.823)",
      foreground: "oklch(0.985 0 0)",
      card: "oklch(0.21 0.006 285.885)",
      "card-foreground": "oklch(0.985 0 0)",
      popover: "oklch(0.21 0.006 285.885)",
      "popover-foreground": "oklch(0.985 0 0)",
      primary: "oklch(0.92 0.004 286.32)",
      "primary-foreground": "oklch(0.21 0.006 285.885)",
      secondary: "oklch(0.274 0.006 286.033)",
      "secondary-foreground": "oklch(0.985 0 0)",
      muted: "oklch(0.274 0.006 286.033)",
      "muted-foreground": "oklch(0.705 0.015 286.067)",
      accent: "oklch(0.274 0.006 286.033)",
      "accent-foreground": "oklch(0.985 0 0)",
      destructive: "oklch(0.704 0.191 22.216)",
      border: "oklch(1 0 0 / 10%)",
      input: "oklch(1 0 0 / 15%)",
      ring: "oklch(0.552 0.016 285.938)",
      "chart-1": "oklch(0.871 0.006 286.286)",
      "chart-2": "oklch(0.552 0.016 285.938)",
      "chart-3": "oklch(0.442 0.017 285.786)",
      "chart-4": "oklch(0.37 0.013 285.805)",
      "chart-5": "oklch(0.274 0.006 286.033)",
      sidebar: "oklch(0.21 0.006 285.885)",
      "sidebar-foreground": "oklch(0.985 0 0)",
      "sidebar-primary": "oklch(0.488 0.243 264.376)",
      "sidebar-primary-foreground": "oklch(0.985 0 0)",
      "sidebar-accent": "oklch(0.274 0.006 286.033)",
      "sidebar-accent-foreground": "oklch(0.985 0 0)",
      "sidebar-border": "oklch(1 0 0 / 10%)",
      "sidebar-ring": "oklch(0.552 0.016 285.938)",
    },
  },
  slate: {
    label: "Slate",
    light: {
      background: "oklch(1 0 0)",
      foreground: "oklch(0.129 0.042 264.695)",
      card: "oklch(1 0 0)",
      "card-foreground": "oklch(0.129 0.042 264.695)",
      popover: "oklch(1 0 0)",
      "popover-foreground": "oklch(0.129 0.042 264.695)",
      primary: "oklch(0.208 0.042 265.755)",
      "primary-foreground": "oklch(0.984 0.003 247.858)",
      secondary: "oklch(0.968 0.007 247.896)",
      "secondary-foreground": "oklch(0.208 0.042 265.755)",
      muted: "oklch(0.968 0.007 247.896)",
      "muted-foreground": "oklch(0.554 0.046 257.417)",
      accent: "oklch(0.968 0.007 247.896)",
      "accent-foreground": "oklch(0.208 0.042 265.755)",
      destructive: "oklch(0.577 0.245 27.325)",
      border: "oklch(0.929 0.013 255.508)",
      input: "oklch(0.929 0.013 255.508)",
      ring: "oklch(0.704 0.04 256.788)",
      "chart-1": "oklch(0.646 0.222 41.116)",
      "chart-2": "oklch(0.6 0.118 184.704)",
      "chart-3": "oklch(0.398 0.07 227.392)",
      "chart-4": "oklch(0.828 0.189 84.429)",
      "chart-5": "oklch(0.769 0.188 70.08)",
      sidebar: "oklch(0.984 0.003 247.858)",
      "sidebar-foreground": "oklch(0.129 0.042 264.695)",
      "sidebar-primary": "oklch(0.208 0.042 265.755)",
      "sidebar-primary-foreground": "oklch(0.984 0.003 247.858)",
      "sidebar-accent": "oklch(0.968 0.007 247.896)",
      "sidebar-accent-foreground": "oklch(0.208 0.042 265.755)",
      "sidebar-border": "oklch(0.929 0.013 255.508)",
      "sidebar-ring": "oklch(0.704 0.04 256.788)",
    },
    dark: {
      background: "oklch(0.129 0.042 264.695)",
      foreground: "oklch(0.984 0.003 247.858)",
      card: "oklch(0.208 0.042 265.755)",
      "card-foreground": "oklch(0.984 0.003 247.858)",
      popover: "oklch(0.208 0.042 265.755)",
      "popover-foreground": "oklch(0.984 0.003 247.858)",
      primary: "oklch(0.929 0.013 255.508)",
      "primary-foreground": "oklch(0.208 0.042 265.755)",
      secondary: "oklch(0.279 0.041 260.031)",
      "secondary-foreground": "oklch(0.984 0.003 247.858)",
      muted: "oklch(0.279 0.041 260.031)",
      "muted-foreground": "oklch(0.704 0.04 256.788)",
      accent: "oklch(0.279 0.041 260.031)",
      "accent-foreground": "oklch(0.984 0.003 247.858)",
      destructive: "oklch(0.704 0.191 22.216)",
      border: "oklch(1 0 0 / 10%)",
      input: "oklch(1 0 0 / 15%)",
      ring: "oklch(0.551 0.027 264.364)",
      "chart-1": "oklch(0.488 0.243 264.376)",
      "chart-2": "oklch(0.696 0.17 162.48)",
      "chart-3": "oklch(0.769 0.188 70.08)",
      "chart-4": "oklch(0.627 0.265 303.9)",
      "chart-5": "oklch(0.645 0.246 16.439)",
      sidebar: "oklch(0.208 0.042 265.755)",
      "sidebar-foreground": "oklch(0.984 0.003 247.858)",
      "sidebar-primary": "oklch(0.488 0.243 264.376)",
      "sidebar-primary-foreground": "oklch(0.984 0.003 247.858)",
      "sidebar-accent": "oklch(0.279 0.041 260.031)",
      "sidebar-accent-foreground": "oklch(0.984 0.003 247.858)",
      "sidebar-border": "oklch(1 0 0 / 10%)",
      "sidebar-ring": "oklch(0.551 0.027 264.364)",
    },
  },
  stone: {
    label: "Stone",
    light: {
      background: "oklch(1 0 0)",
      foreground: "oklch(0.147 0.004 49.25)",
      card: "oklch(1 0 0)",
      "card-foreground": "oklch(0.147 0.004 49.25)",
      popover: "oklch(1 0 0)",
      "popover-foreground": "oklch(0.147 0.004 49.25)",
      primary: "oklch(0.216 0.006 56.043)",
      "primary-foreground": "oklch(0.985 0.001 106.423)",
      secondary: "oklch(0.97 0.001 106.424)",
      "secondary-foreground": "oklch(0.216 0.006 56.043)",
      muted: "oklch(0.97 0.001 106.424)",
      "muted-foreground": "oklch(0.553 0.013 58.071)",
      accent: "oklch(0.97 0.001 106.424)",
      "accent-foreground": "oklch(0.216 0.006 56.043)",
      destructive: "oklch(0.577 0.245 27.325)",
      border: "oklch(0.923 0.003 48.717)",
      input: "oklch(0.923 0.003 48.717)",
      ring: "oklch(0.709 0.01 56.259)",
      "chart-1": "oklch(0.869 0.005 56.366)",
      "chart-2": "oklch(0.553 0.013 58.071)",
      "chart-3": "oklch(0.444 0.011 73.639)",
      "chart-4": "oklch(0.374 0.01 67.558)",
      "chart-5": "oklch(0.268 0.007 34.298)",
      sidebar: "oklch(0.985 0.001 106.423)",
      "sidebar-foreground": "oklch(0.147 0.004 49.25)",
      "sidebar-primary": "oklch(0.216 0.006 56.043)",
      "sidebar-primary-foreground": "oklch(0.985 0.001 106.423)",
      "sidebar-accent": "oklch(0.97 0.001 106.424)",
      "sidebar-accent-foreground": "oklch(0.216 0.006 56.043)",
      "sidebar-border": "oklch(0.923 0.003 48.717)",
      "sidebar-ring": "oklch(0.709 0.01 56.259)",
    },
    dark: {
      background: "oklch(0.147 0.004 49.25)",
      foreground: "oklch(0.985 0.001 106.423)",
      card: "oklch(0.216 0.006 56.043)",
      "card-foreground": "oklch(0.985 0.001 106.423)",
      popover: "oklch(0.216 0.006 56.043)",
      "popover-foreground": "oklch(0.985 0.001 106.423)",
      primary: "oklch(0.923 0.003 48.717)",
      "primary-foreground": "oklch(0.216 0.006 56.043)",
      secondary: "oklch(0.268 0.007 34.298)",
      "secondary-foreground": "oklch(0.985 0.001 106.423)",
      muted: "oklch(0.268 0.007 34.298)",
      "muted-foreground": "oklch(0.709 0.01 56.259)",
      accent: "oklch(0.268 0.007 34.298)",
      "accent-foreground": "oklch(0.985 0.001 106.423)",
      destructive: "oklch(0.704 0.191 22.216)",
      border: "oklch(1 0 0 / 10%)",
      input: "oklch(1 0 0 / 15%)",
      ring: "oklch(0.553 0.013 58.071)",
      "chart-1": "oklch(0.869 0.005 56.366)",
      "chart-2": "oklch(0.553 0.013 58.071)",
      "chart-3": "oklch(0.444 0.011 73.639)",
      "chart-4": "oklch(0.374 0.01 67.558)",
      "chart-5": "oklch(0.268 0.007 34.298)",
      sidebar: "oklch(0.216 0.006 56.043)",
      "sidebar-foreground": "oklch(0.985 0.001 106.423)",
      "sidebar-primary": "oklch(0.488 0.243 264.376)",
      "sidebar-primary-foreground": "oklch(0.985 0.001 106.423)",
      "sidebar-accent": "oklch(0.268 0.007 34.298)",
      "sidebar-accent-foreground": "oklch(0.985 0.001 106.423)",
      "sidebar-border": "oklch(1 0 0 / 10%)",
      "sidebar-ring": "oklch(0.553 0.013 58.071)",
    },
  },
  gray: {
    label: "Gray",
    light: {
      background: "oklch(1 0 0)",
      foreground: "oklch(0.13 0.028 261.692)",
      card: "oklch(1 0 0)",
      "card-foreground": "oklch(0.13 0.028 261.692)",
      popover: "oklch(1 0 0)",
      "popover-foreground": "oklch(0.13 0.028 261.692)",
      primary: "oklch(0.21 0.034 264.665)",
      "primary-foreground": "oklch(0.985 0.002 247.839)",
      secondary: "oklch(0.967 0.003 264.542)",
      "secondary-foreground": "oklch(0.21 0.034 264.665)",
      muted: "oklch(0.967 0.003 264.542)",
      "muted-foreground": "oklch(0.551 0.027 264.364)",
      accent: "oklch(0.967 0.003 264.542)",
      "accent-foreground": "oklch(0.21 0.034 264.665)",
      destructive: "oklch(0.577 0.245 27.325)",
      border: "oklch(0.928 0.006 264.531)",
      input: "oklch(0.928 0.006 264.531)",
      ring: "oklch(0.707 0.022 261.325)",
      "chart-1": "oklch(0.646 0.222 41.116)",
      "chart-2": "oklch(0.6 0.118 184.704)",
      "chart-3": "oklch(0.398 0.07 227.392)",
      "chart-4": "oklch(0.828 0.189 84.429)",
      "chart-5": "oklch(0.769 0.188 70.08)",
      sidebar: "oklch(0.985 0.002 247.839)",
      "sidebar-foreground": "oklch(0.13 0.028 261.692)",
      "sidebar-primary": "oklch(0.21 0.034 264.665)",
      "sidebar-primary-foreground": "oklch(0.985 0.002 247.839)",
      "sidebar-accent": "oklch(0.967 0.003 264.542)",
      "sidebar-accent-foreground": "oklch(0.21 0.034 264.665)",
      "sidebar-border": "oklch(0.928 0.006 264.531)",
      "sidebar-ring": "oklch(0.707 0.022 261.325)",
    },
    dark: {
      background: "oklch(0.13 0.028 261.692)",
      foreground: "oklch(0.985 0.002 247.839)",
      card: "oklch(0.21 0.034 264.665)",
      "card-foreground": "oklch(0.985 0.002 247.839)",
      popover: "oklch(0.21 0.034 264.665)",
      "popover-foreground": "oklch(0.985 0.002 247.839)",
      primary: "oklch(0.928 0.006 264.531)",
      "primary-foreground": "oklch(0.21 0.034 264.665)",
      secondary: "oklch(0.278 0.033 256.848)",
      "secondary-foreground": "oklch(0.985 0.002 247.839)",
      muted: "oklch(0.278 0.033 256.848)",
      "muted-foreground": "oklch(0.707 0.022 261.325)",
      accent: "oklch(0.278 0.033 256.848)",
      "accent-foreground": "oklch(0.985 0.002 247.839)",
      destructive: "oklch(0.704 0.191 22.216)",
      border: "oklch(1 0 0 / 10%)",
      input: "oklch(1 0 0 / 15%)",
      ring: "oklch(0.551 0.027 264.364)",
      "chart-1": "oklch(0.488 0.243 264.376)",
      "chart-2": "oklch(0.696 0.17 162.48)",
      "chart-3": "oklch(0.769 0.188 70.08)",
      "chart-4": "oklch(0.627 0.265 303.9)",
      "chart-5": "oklch(0.645 0.246 16.439)",
      sidebar: "oklch(0.21 0.034 264.665)",
      "sidebar-foreground": "oklch(0.985 0.002 247.839)",
      "sidebar-primary": "oklch(0.488 0.243 264.376)",
      "sidebar-primary-foreground": "oklch(0.985 0.002 247.839)",
      "sidebar-accent": "oklch(0.278 0.033 256.848)",
      "sidebar-accent-foreground": "oklch(0.985 0.002 247.839)",
      "sidebar-border": "oklch(1 0 0 / 10%)",
      "sidebar-ring": "oklch(0.551 0.027 264.364)",
    },
  },
} satisfies Record<string, { label: string; light: ThemeVars; dark: ThemeVars }>

export type BaseColor = keyof typeof BASE_COLORS

/** Accent colors override the primary color and focus ring. Light mode uses a deeper shade with white text; dark mode a lighter shade with dark text. */
export const ACCENTS = {
  default: { label: "Default", light: {}, dark: {} },
  violet: {
    label: "Violet",
    light: { primary: "oklch(0.541 0.281 293.009)", "primary-foreground": "oklch(0.985 0 0)", ring: "oklch(0.702 0.183 293.541)" },
    dark: { primary: "oklch(0.702 0.183 293.541)", "primary-foreground": "oklch(0.205 0 0)", ring: "oklch(0.541 0.281 293.009)" },
  },
  blue: {
    label: "Blue",
    light: { primary: "oklch(0.546 0.245 262.881)", "primary-foreground": "oklch(0.985 0 0)", ring: "oklch(0.707 0.165 254.624)" },
    dark: { primary: "oklch(0.707 0.165 254.624)", "primary-foreground": "oklch(0.205 0 0)", ring: "oklch(0.546 0.245 262.881)" },
  },
  teal: {
    label: "Teal",
    light: { primary: "oklch(0.511 0.096 186.391)", "primary-foreground": "oklch(0.985 0 0)", ring: "oklch(0.777 0.152 181.912)" },
    dark: { primary: "oklch(0.777 0.152 181.912)", "primary-foreground": "oklch(0.205 0 0)", ring: "oklch(0.511 0.096 186.391)" },
  },
  green: {
    label: "Green",
    light: { primary: "oklch(0.527 0.154 150.069)", "primary-foreground": "oklch(0.985 0 0)", ring: "oklch(0.792 0.209 151.711)" },
    dark: { primary: "oklch(0.792 0.209 151.711)", "primary-foreground": "oklch(0.205 0 0)", ring: "oklch(0.527 0.154 150.069)" },
  },
  amber: {
    label: "Amber",
    light: { primary: "oklch(0.555 0.163 48.998)", "primary-foreground": "oklch(0.985 0 0)", ring: "oklch(0.828 0.189 84.429)" },
    dark: { primary: "oklch(0.828 0.189 84.429)", "primary-foreground": "oklch(0.205 0 0)", ring: "oklch(0.555 0.163 48.998)" },
  },
  orange: {
    label: "Orange",
    light: { primary: "oklch(0.553 0.195 38.402)", "primary-foreground": "oklch(0.985 0 0)", ring: "oklch(0.75 0.183 55.934)" },
    dark: { primary: "oklch(0.75 0.183 55.934)", "primary-foreground": "oklch(0.205 0 0)", ring: "oklch(0.553 0.195 38.402)" },
  },
  rose: {
    label: "Rose",
    light: { primary: "oklch(0.586 0.253 17.585)", "primary-foreground": "oklch(0.985 0 0)", ring: "oklch(0.712 0.194 13.428)" },
    dark: { primary: "oklch(0.712 0.194 13.428)", "primary-foreground": "oklch(0.205 0 0)", ring: "oklch(0.586 0.253 17.585)" },
  },
} satisfies Record<string, { label: string; light: ThemeVars; dark: ThemeVars }>

export type Accent = keyof typeof ACCENTS
/** A named accent, or "custom" for any brand color (see `color`). */
export type AccentChoice = Accent | "custom"

export const RADII = ["0", "0.3", "0.5", "0.625", "0.75", "1"] as const
export type Radius = (typeof RADII)[number]

/** How strongly the page surfaces (background, cards, borders) lean towards the accent's hue. */
export const TINTS = { none: "None", subtle: "Subtle", strong: "Strong" } as const
export type Tint = keyof typeof TINTS

/** The five chart colors: the base palette's own, shades of the accent, or a fixed vivid or pastel set. */
export const CHART_PALETTES = { default: "Default", accent: "Accent", vivid: "Vivid", pastel: "Pastel" } as const
export type ChartPalette = keyof typeof CHART_PALETTES

export interface ThemeConfig {
  base: BaseColor
  accent: AccentChoice
  /** The custom accent color as #rrggbb, used when `accent` is "custom". */
  color: string
  radius: Radius
  tint: Tint
  chart: ChartPalette
}

export const DEFAULT_THEME: ThemeConfig = {
  base: "neutral",
  accent: "default",
  color: "#4f46e5",
  radius: "0.625",
  tint: "none",
  chart: "default",
}

/** localStorage key for the chosen theme (JSON). The light/dark mode has its own key in lib/theme. */
export const THEME_CONFIG_STORAGE_KEY = "venusui-theme"
/** localStorage key for the CSS of what the static stylesheet can't cover (custom color, tint, charts), so the head script applies it before paint. */
export const THEME_CSS_STORAGE_KEY = "venusui-theme-css"

const HEX = /^#[0-9a-f]{6}$/i

/** Keeps only known values, falling back to the defaults. */
export function parseThemeConfig(value: unknown): ThemeConfig {
  const v = (value && typeof value === "object" ? value : {}) as Partial<Record<keyof ThemeConfig, unknown>>
  const pick = <T extends string>(x: unknown, allowed: readonly string[], fallback: T): T =>
    typeof x === "string" && allowed.includes(x) ? (x as T) : fallback
  return {
    base: pick(v.base, Object.keys(BASE_COLORS), DEFAULT_THEME.base),
    accent: pick(v.accent, [...Object.keys(ACCENTS), "custom"], DEFAULT_THEME.accent),
    color: typeof v.color === "string" && HEX.test(v.color) ? v.color.toLowerCase() : DEFAULT_THEME.color,
    radius: pick(v.radius, RADII, DEFAULT_THEME.radius),
    tint: pick(v.tint, Object.keys(TINTS), DEFAULT_THEME.tint),
    chart: pick(v.chart, Object.keys(CHART_PALETTES), DEFAULT_THEME.chart),
  }
}

/** True when two configs describe the same theme. */
export function sameTheme(a: ThemeConfig, b: ThemeConfig) {
  return (Object.keys(DEFAULT_THEME) as (keyof ThemeConfig)[]).every((key) =>
    key === "color" ? a.accent !== "custom" || a.color === b.color : a[key] === b[key],
  )
}

/* ------------------------------------------------------------------ color math (OKLCH and sRGB, contrast) */

export type Lch = { l: number; c: number; h: number }

const toLinear = (x: number) => (x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4)
const toGamma = (x: number) => (x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055)

/** #rrggbb to OKLCH (hue in degrees). */
export function hexToOklch(hex: string): Lch {
  const n = parseInt(hex.slice(1), 16)
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((x) => toLinear(x / 255))
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
  return { l: L, c: Math.hypot(A, B), h: ((Math.atan2(B, A) * 180) / Math.PI + 360) % 360 }
}

/** OKLCH to linear sRGB (may fall outside 0 to 1 when the color is out of gamut). */
function oklchToLinear({ l: L, c, h }: Lch): [number, number, number] {
  const A = c * Math.cos((h * Math.PI) / 180)
  const B = c * Math.sin((h * Math.PI) / 180)
  const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3
  const m = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3
  const s = (L - 0.0894841775 * A - 1.291485548 * B) ** 3
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ]
}

const inGamut = (rgb: number[]) => rgb.every((x) => x >= -0.0005 && x <= 1.0005)
const unit = (x: number) => Math.min(1, Math.max(0, x))

/** Lowers chroma until the color fits in sRGB, keeping lightness and hue. */
export function clampChroma(color: Lch): Lch {
  if (inGamut(oklchToLinear(color))) return color
  let lo = 0
  let hi = color.c
  for (let i = 0; i < 20; i++) {
    const mid = (lo + hi) / 2
    if (inGamut(oklchToLinear({ ...color, c: mid }))) lo = mid
    else hi = mid
  }
  return { ...color, c: lo }
}

/** OKLCH to #rrggbb (clamped into sRGB). */
export function oklchToHex(color: Lch): string {
  const channels = oklchToLinear(clampChroma(color)).map((x) => Math.round(unit(toGamma(unit(x))) * 255))
  return `#${channels.map((x) => x.toString(16).padStart(2, "0")).join("")}`
}

function luminance(color: Lch) {
  const [r, g, b] = oklchToLinear(clampChroma(color)).map(unit)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** WCAG contrast ratio between two colors. */
export function contrast(a: Lch, b: Lch) {
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p)
  return (x + 0.05) / (y + 0.05)
}

/** Formats a color as a CSS oklch() value. */
export const oklch = ({ l, c, h }: Lch) => `oklch(${+l.toFixed(3)} ${+c.toFixed(3)} ${+h.toFixed(3)})`

/** Reads an oklch(L C H) string back (for the named accents' hues). */
export function parseOklch(value: string): Lch {
  const [l, c, h] = value
    .replace(/oklch\(|\)/g, "")
    .trim()
    .split(/\s+/)
    .map(Number)
  return { l, c, h: h || 0 }
}

const LIGHT_TEXT: Lch = { l: 0.985, c: 0, h: 0 }
const DARK_TEXT: Lch = { l: 0.205, c: 0, h: 0 }
/** WCAG AA for normal text. */
export const AA = 4.5

export type CustomAccent = {
  light: ThemeVars
  dark: ThemeVars
  /** Button text contrast in each mode. */
  contrast: { light: number; dark: number }
}

/**
 * Turns any brand color into accent variables for light and dark. Light mode
 * keeps the color with white text when that reads clearly, puts dark text on a
 * light color, and otherwise darkens it until white text passes AA. Dark mode
 * lightens it until dark text passes AA, like shadcn's own accents.
 */
export function customAccent(hex: string): CustomAccent {
  const base = clampChroma(hexToOklch(HEX.test(hex) ? hex : DEFAULT_THEME.color))

  let light = base
  let lightText = LIGHT_TEXT
  if (contrast(base, LIGHT_TEXT) < AA) {
    if (base.l > 0.7 && contrast(base, DARK_TEXT) >= AA) lightText = DARK_TEXT
    else while (contrast(light, LIGHT_TEXT) < AA && light.l > 0.05) light = clampChroma({ ...base, l: light.l - 0.01 })
  }

  let dark = base
  while (contrast(dark, DARK_TEXT) < AA && dark.l < 0.98) dark = clampChroma({ ...base, l: dark.l + 0.01 })

  const ring = (c: Lch) => oklch(clampChroma({ ...c, l: Math.min(0.85, c.l + 0.15) }))
  const vars = (primary: Lch, text: Lch, ringValue: string): ThemeVars => ({
    primary: oklch(primary),
    "primary-foreground": oklch(text),
    ring: ringValue,
    "sidebar-primary": oklch(primary),
    "sidebar-primary-foreground": oklch(text),
    "sidebar-ring": ringValue,
  })
  return {
    light: vars(light, lightText, ring(light)),
    dark: vars(dark, DARK_TEXT, oklch(light)),
    contrast: { light: contrast(light, lightText), dark: contrast(dark, DARK_TEXT) },
  }
}

/** The accent's color (its hue and how colorful it is), for tints and accent charts. */
function accentColor(config: ThemeConfig): Lch {
  if (config.accent === "custom") return clampChroma(hexToOklch(config.color))
  if (config.accent !== "default") return parseOklch(ACCENTS[config.accent].light.primary)
  const base = parseOklch(BASE_COLORS[config.base].light["muted-foreground"])
  // Neutral has no hue of its own; tint it warm, like paper.
  return base.c < 0.005 ? { l: 0.5, c: 0, h: 85 } : base
}

/** Surfaces tinted towards the accent's hue. */
function tintVars(config: ThemeConfig): { light: ThemeVars; dark: ThemeVars } {
  if (config.tint === "none") return { light: {}, dark: {} }
  const k = config.tint === "strong" ? 2 : 1
  const h = accentColor(config).h
  const at = (l: number, c: number) => oklch({ l, c, h })
  const light: ThemeVars = {
    background: at(0.992 - 0.008 * k, 0.006 * k),
    card: at(0.998 - 0.004 * k, 0.003 * k),
    popover: at(0.998 - 0.004 * k, 0.003 * k),
    secondary: at(0.968 - 0.012 * k, 0.011 * k),
    muted: at(0.968 - 0.012 * k, 0.011 * k),
    accent: at(0.968 - 0.012 * k, 0.011 * k),
    "muted-foreground": at(0.53 - 0.03 * k, 0.012 * k),
    border: at(0.925 - 0.015 * k, 0.012 * k),
    input: at(0.925 - 0.015 * k, 0.012 * k),
    sidebar: at(0.985 - 0.01 * k, 0.008 * k),
    "sidebar-accent": at(0.968 - 0.012 * k, 0.011 * k),
    "sidebar-border": at(0.925 - 0.015 * k, 0.012 * k),
  }
  const dark: ThemeVars = {
    background: at(0.15 + 0.015 * k, 0.012 * k),
    card: at(0.2 + 0.015 * k, 0.014 * k),
    popover: at(0.2 + 0.015 * k, 0.014 * k),
    secondary: at(0.26 + 0.015 * k, 0.016 * k),
    muted: at(0.26 + 0.015 * k, 0.016 * k),
    accent: at(0.26 + 0.015 * k, 0.016 * k),
    "muted-foreground": at(0.72 + 0.01 * k, 0.01 * k),
    sidebar: at(0.2 + 0.015 * k, 0.014 * k),
    "sidebar-accent": at(0.26 + 0.015 * k, 0.016 * k),
  }
  return { light, dark }
}

const VIVID = {
  light: [
    "oklch(0.646 0.222 41.116)",
    "oklch(0.6 0.118 184.704)",
    "oklch(0.398 0.07 227.392)",
    "oklch(0.828 0.189 84.429)",
    "oklch(0.769 0.188 70.08)",
  ],
  dark: [
    "oklch(0.488 0.243 264.376)",
    "oklch(0.696 0.17 162.48)",
    "oklch(0.769 0.188 70.08)",
    "oklch(0.627 0.265 303.9)",
    "oklch(0.645 0.246 16.439)",
  ],
}

function chartVars(config: ThemeConfig): { light: ThemeVars; dark: ThemeVars } {
  const pack = (values: string[]) => Object.fromEntries(values.map((value, i) => [`chart-${i + 1}`, value]))
  switch (config.chart) {
    case "default":
      return { light: {}, dark: {} }
    case "vivid":
      return { light: pack(VIVID.light), dark: pack(VIVID.dark) }
    case "pastel": {
      const hues = [350, 75, 160, 220, 290]
      return {
        light: pack(hues.map((h) => oklch(clampChroma({ l: 0.82, c: 0.1, h })))),
        dark: pack(hues.map((h) => oklch(clampChroma({ l: 0.78, c: 0.1, h })))),
      }
    }
    case "accent": {
      const { c, h } = accentColor(config)
      const ramp = [0.85, 0.72, 0.6, 0.5, 0.4].map((l) => oklch(clampChroma({ l, c: c * (1 - Math.abs(l - 0.6)), h })))
      return { light: pack(ramp), dark: pack([...ramp].reverse()) }
    }
  }
}

/**
 * The variables the static stylesheet (src/styles/themes.css) can't express:
 * a custom accent, surface tint and chart palette. Applied at runtime.
 */
export function overrideVars(config: ThemeConfig): { light: ThemeVars; dark: ThemeVars } {
  const custom = config.accent === "custom" ? customAccent(config.color) : { light: {}, dark: {} }
  const tint = tintVars(config)
  const charts = chartVars(config)
  return { light: { ...custom.light, ...tint.light, ...charts.light }, dark: { ...custom.dark, ...tint.dark, ...charts.dark } }
}

const declare = (vars: ThemeVars) =>
  Object.entries(vars)
    .map(([name, value]) => `  --${name}: ${value};`)
    .join("\n")

/**
 * The runtime overrides as CSS. The doubled attribute keeps every selector one
 * step more specific than the generated theme rules, so these always win, and
 * like those rules they reach `.light` and `.dark` sections inside the page.
 */
export function overrideCss(config: ThemeConfig): string {
  const { light, dark } = overrideVars(config)
  if (!Object.keys(light).length && !Object.keys(dark).length) return ""
  const a = "[data-custom][data-custom]"
  return `:root${a},\n${a} .light {\n${declare(light)}\n}\n:root${a}.dark,\n${a} .dark {\n${declare(dark)}\n}\n`
}

/** The CSS variables for a theme, light and dark. */
export function themeVars(config: ThemeConfig): { light: ThemeVars; dark: ThemeVars } {
  const base = BASE_COLORS[config.base]
  const named = config.accent === "custom" ? ACCENTS.default : ACCENTS[config.accent]
  const light: ThemeVars = { ...base.light, ...named.light, radius: `${config.radius}rem` }
  const dark: ThemeVars = { ...base.dark, ...named.dark }
  if (config.accent !== "default" && config.accent !== "custom") {
    for (const [mode, vars] of [
      ["light", light],
      ["dark", dark],
    ] as const) {
      vars["sidebar-primary"] = ACCENTS[config.accent][mode].primary
      vars["sidebar-primary-foreground"] = ACCENTS[config.accent][mode]["primary-foreground"]
      vars["sidebar-ring"] = ACCENTS[config.accent][mode].ring
    }
  }
  const overrides = overrideVars(config)
  return { light: { ...light, ...overrides.light }, dark: { ...dark, ...overrides.dark } }
}

/** The theme as a block to paste into globals.css (replacing :root and .dark). */
export function themeCss(config: ThemeConfig): string {
  const { light, dark } = themeVars(config)
  return `:root {\n${declare(light)}\n}\n\n.dark {\n${declare(dark)}\n}\n`
}
