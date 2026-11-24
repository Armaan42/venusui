import {
  ACCENTS,
  BASE_COLORS,
  CHART_PALETTES,
  DEFAULT_THEME,
  RADII,
  THEME_CONFIG_STORAGE_KEY,
  THEME_CSS_STORAGE_KEY,
  TINTS,
} from "@/config/themes"

export const THEME_STORAGE_KEY = "theme"

/** The <style> element holding the theme CSS that themes.css can't express (custom color, tint, charts). */
export const THEME_OVERRIDES_ID = "venusui-theme-overrides"

/**
 * The site was called kanakui until Nov 2026. Saved settings move to the new
 * keys once, in the head script below, so returning visitors keep them.
 */
const RENAMED_STORAGE_KEYS = [
  ["kanakui-theme", "venusui-theme"],
  ["kanakui-items-view", "venusui-items-view"],
] as const

/**
 * Runs in <head> before the first paint, so there's no flash of the wrong theme.
 *
 * Light/dark: the server always renders light (the default). Dark is applied when
 * - the URL has ?theme=dark (used by preview iframes to force a theme), or
 * - the visitor chose dark earlier (localStorage).
 * ?theme=light forces light regardless of the stored choice.
 *
 * Theme: read from localStorage and set as data attributes on <html>
 * (data-base, data-accent, data-radius, data-color, data-tint, data-chart);
 * src/styles/themes.css does the rest. A custom color, tint or chart palette
 * also has CSS saved alongside, which goes into a <style> element here so it
 * applies before paint too. Unknown values fall back to the defaults.
 * See Next.js "Preventing flash before hydration": Themes.
 */
export const themeScript = `(function(){try{var m=${JSON.stringify(RENAMED_STORAGE_KEYS)};for(var i=0;i<m.length;i++){var o=localStorage.getItem(m[i][0]);if(o!==null){if(localStorage.getItem(m[i][1])===null)localStorage.setItem(m[i][1],o);localStorage.removeItem(m[i][0])}}}catch(e){}try{var d=document.documentElement;var q=new URLSearchParams(location.search).get("theme");var t=q==="light"||q==="dark"?q:localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});if(t==="dark")d.classList.add("dark");var c={};try{c=JSON.parse(localStorage.getItem(${JSON.stringify(
  THEME_CONFIG_STORAGE_KEY,
)})||"{}")||{}}catch(e){}var ok=function(v,list,f){return list.indexOf(v)>-1?v:f};d.dataset.base=ok(c.base,${JSON.stringify(
  Object.keys(BASE_COLORS),
)},${JSON.stringify(DEFAULT_THEME.base)});d.dataset.accent=ok(c.accent,${JSON.stringify([...Object.keys(ACCENTS), "custom"])},${JSON.stringify(
  DEFAULT_THEME.accent,
)});d.dataset.radius=ok(c.radius,${JSON.stringify(RADII)},${JSON.stringify(DEFAULT_THEME.radius)});d.dataset.tint=ok(c.tint,${JSON.stringify(
  Object.keys(TINTS),
)},${JSON.stringify(DEFAULT_THEME.tint)});d.dataset.chart=ok(c.chart,${JSON.stringify(Object.keys(CHART_PALETTES))},${JSON.stringify(
  DEFAULT_THEME.chart,
)});d.dataset.color=/^#[0-9a-f]{6}$/i.test(c.color)?c.color:${JSON.stringify(DEFAULT_THEME.color)};var s=localStorage.getItem(${JSON.stringify(
  THEME_CSS_STORAGE_KEY,
)});if(s){var e=document.createElement("style");e.id=${JSON.stringify(THEME_OVERRIDES_ID)};e.textContent=s;document.head.appendChild(e);d.setAttribute("data-custom","")}}catch(e){}})()`
