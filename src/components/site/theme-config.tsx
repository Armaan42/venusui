"use client"

import * as React from "react"

import {
  DEFAULT_THEME,
  overrideCss,
  parseThemeConfig,
  THEME_CONFIG_STORAGE_KEY,
  THEME_CSS_STORAGE_KEY,
  type ThemeConfig,
} from "@/config/themes"
import { THEME_OVERRIDES_ID } from "@/lib/theme"
import { THEME_STORAGE_KEY } from "@/lib/theme"

export type Mode = "light" | "dark"

export interface ThemeState extends ThemeConfig {
  mode: Mode
}

/** Fired on window when this page changes the theme, so every picker on the page stays in step. */
const CHANGE_EVENT = "venusui-theme-change"

function save(key: string, value: string) {
  try {
    localStorage.setItem(key, value)
  } catch {
    // Storage unavailable (private mode, blocked): the change still applies to this page view.
  }
}

/**
 * Writes the theme to <html>: data attributes for what src/styles/themes.css
 * covers, and a <style> element for the rest (custom color, tint, charts).
 * Returns that CSS so callers can remember it for the head script.
 */
function applyConfig(config: ThemeConfig) {
  const root = document.documentElement
  root.dataset.base = config.base
  root.dataset.accent = config.accent
  root.dataset.radius = config.radius
  root.dataset.color = config.color
  root.dataset.tint = config.tint
  root.dataset.chart = config.chart
  const css = overrideCss(config)
  let style = document.getElementById(THEME_OVERRIDES_ID)
  if (css && !style) {
    style = document.createElement("style")
    style.id = THEME_OVERRIDES_ID
    document.head.appendChild(style)
  }
  if (style) style.textContent = css
  root.toggleAttribute("data-custom", Boolean(css))
  return css
}

// The <html> element is the source of truth: the head script sets it before
// paint, and every change below writes to it. Snapshots are cached by value so
// useSyncExternalStore sees a stable object between changes.
let cachedKey = ""
let cachedState: ThemeState = { ...DEFAULT_THEME, mode: "light" }

function readState(): ThemeState {
  const root = document.documentElement
  const config = parseThemeConfig({ ...root.dataset })
  const mode: Mode = root.classList.contains("dark") ? "dark" : "light"
  const key = `${JSON.stringify(config)}|${mode}`
  if (key !== cachedKey) {
    cachedKey = key
    cachedState = { ...config, mode }
  }
  return cachedState
}

const serverState: ThemeState = { ...DEFAULT_THEME, mode: "light" }

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange)
  window.addEventListener("storage", onChange)
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange)
    window.removeEventListener("storage", onChange)
  }
}

/** Sets light or dark for the whole site and remembers it. */
export function setMode(mode: Mode) {
  document.documentElement.classList.toggle("dark", mode === "dark")
  save(THEME_STORAGE_KEY, mode)
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

/** Changes any part of the theme for the whole site and remembers it. */
export function setThemeConfig(next: Partial<ThemeConfig>) {
  // parseThemeConfig keeps only theme settings, so the light/dark mode is dropped here.
  const config = parseThemeConfig({ ...readState(), ...next })
  const css = applyConfig(config)
  save(THEME_CONFIG_STORAGE_KEY, JSON.stringify(config))
  save(THEME_CSS_STORAGE_KEY, css)
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

/** The current theme (every setting, and light or dark), updated live. */
export function useThemeState(): ThemeState {
  return React.useSyncExternalStore(subscribe, readState, () => serverState)
}

/**
 * Keeps this document in step when the theme changes in another one: other
 * tabs, and the preview iframes on component pages (same origin, so they get
 * `storage` events when the page changes the theme). Pages opened with
 * ?theme=light|dark keep the mode they were asked for.
 */
export function ThemeSync() {
  React.useEffect(() => {
    // The head script applied the CSS saved last time; rebuild it from the
    // settings so it always matches the current theme code.
    const css = applyConfig(parseThemeConfig(readState()))
    try {
      if (localStorage.getItem(THEME_CSS_STORAGE_KEY) !== css) save(THEME_CSS_STORAGE_KEY, css)
    } catch {
      // Storage unavailable: the page still shows the right theme.
    }
    const onStorage = (event: StorageEvent) => {
      if (event.key === THEME_CONFIG_STORAGE_KEY) {
        let value: unknown = {}
        try {
          value = JSON.parse(event.newValue ?? "{}")
        } catch {
          // Ignore malformed values; the defaults apply.
        }
        applyConfig(parseThemeConfig(value))
      }
      if (event.key === THEME_STORAGE_KEY && !new URLSearchParams(location.search).has("theme")) {
        document.documentElement.classList.toggle("dark", event.newValue === "dark")
      }
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])
  return null
}
