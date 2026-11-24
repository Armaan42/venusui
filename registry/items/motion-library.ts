import { defineItem } from "../define.ts"

const files = ["", "-navbar", "-hero", "-wall", "-trail", "-assistant", "-faq", "-pricing", "-footer", "-logo", "-motion"]

// The page is dark by design, so light and dark share the same values.
const colors = {
  "ml-bg": "oklch(0.155 0.008 50)",
  "ml-card": "oklch(0.195 0.01 50)",
  "ml-chat": "oklch(0.24 0.012 50)",
  "ml-ink": "oklch(0.945 0.014 75)",
  "ml-muted": "oklch(0.72 0.014 70)",
  "ml-line": "oklch(0.945 0.014 75 / 0.12)",
  "ml-accent": "oklch(0.68 0.21 38)",
  "ml-on-accent": "oklch(0.16 0.02 40)",
  "ml-accent-ink": "oklch(0.48 0.16 38)",
  "ml-accent-soft": "oklch(0.82 0.12 52)",
  "ml-paper": "oklch(0.935 0.018 75)",
  "ml-paper-ink": "oklch(0.18 0.012 50)",
}

export default defineItem({
  name: "motion-library",
  type: "registry:block",
  title: "Motion Library",
  description:
    "A dark, motion-first landing page for a component library: a curved 3D wall of cards you can drag, smooth momentum scrolling, a cursor image trail, a scroll-driven assistant clip with a 3D ring carousel, scrambling headings, odometer pricing and a footer the page lifts away to reveal.",
  version: "0.1.0",
  releasedAt: "2026-11-24",
  categories: ["templates"],
  cssVars: {
    theme: {
      ...Object.fromEntries(Object.keys(colors).map((name) => [`color-${name}`, `var(--${name})`])),
      "animate-ml-pan": "ml-pan 9s ease-in-out infinite alternate",
      "animate-ml-float": "ml-float 6s ease-in-out infinite",
      "animate-ml-flash": "ml-flash 3.6s ease-in-out infinite",
      "animate-ml-blink": "ml-blink 1.1s steps(1) infinite",
      "animate-ml-orbit": "ml-orbit 8s linear infinite",
      "animate-ml-spin": "ml-spin 28s linear infinite",
      "animate-ml-drip": "ml-drip 2.2s cubic-bezier(0.65, 0, 0.35, 1) infinite",
    },
    light: colors,
    dark: colors,
  },
  css: {
    // Wall photos drift slowly inside their frames, as if filmed.
    "@keyframes ml-pan": {
      from: { transform: "scale(1.02) translate(0, 0)" },
      to: { transform: "scale(1.14) translate(-3%, 2%)" },
    },
    "@keyframes ml-float": {
      "0%, 100%": { transform: "translate(0, 0)" },
      "50%": { transform: "translate(10px, -6px)" },
    },
    "@keyframes ml-flash": {
      "0%, 70%, 100%": { opacity: "1" },
      "80%": { opacity: "0.35" },
    },
    "@keyframes ml-blink": {
      "0%, 100%": { opacity: "1" },
      "50%": { opacity: "0" },
    },
    "@keyframes ml-orbit": {
      to: { transform: "rotate(360deg)" },
    },
    // The ring carousel in the assistant clip turns right to left.
    "@keyframes ml-spin": {
      from: { transform: "rotateY(0deg)" },
      to: { transform: "rotateY(-360deg)" },
    },
    "@keyframes ml-drip": {
      "0%": { transform: "scaleY(0)", "transform-origin": "top" },
      "50%": { transform: "scaleY(1)", "transform-origin": "top" },
      "51%": { transform: "scaleY(1)", "transform-origin": "bottom" },
      "100%": { transform: "scaleY(0)", "transform-origin": "bottom" },
    },
    // Lenis's own stylesheet, for smooth scrolling.
    "@layer motion-library": {
      "html.lenis, html.lenis body": { height: "auto" },
      ".lenis:not(.lenis-autoToggle).lenis-stopped": { overflow: "clip" },
      ".lenis [data-lenis-prevent]": { "overscroll-behavior": "contain" },
      ".lenis.lenis-smooth iframe": { "pointer-events": "none" },
    },
  },
  dependencies: ["lucide-react", "motion", "lenis"],
  files: files
    .map((suffix) => ({
      path: `registry/default/blocks/motion-library/components/motion-library${suffix}.tsx`,
      type: "registry:component" as const,
    }))
    .concat([{ path: "registry/default/blocks/motion-library/components/motion-library-media.ts", type: "registry:component" }]),
  pageDocs: {
    props: [],
    extends:
      "No props. `motion-library.tsx` puts the sections in order; each section is its own `motion-library-*.tsx` file with its copy inside.",
    requirements: [
      "`motion` for the animations, `lenis` for smooth scrolling and `lucide-react` for icons. The CLI installs all three.",
      "React 19 and Tailwind CSS v4, with a `cn` helper at `@/lib/utils`. The CLI adds the template’s colours, keyframes and Lenis’s styles to your `globals.css`.",
      "An internet connection for the sample photos, which load from a remote image CDN.",
    ],
    customization: [
      "Render `<MotionLibrary />` from `app/page.tsx`. It is one long page with anchors for Library, Assistant, FAQ and Pricing.",
      "The wall's cards are a list at the top of `motion-library-wall.tsx`: photo cards, editorial pages, posters, split layouts, photo grids and type cards. Edit the copy and photos, or add your own kinds. `COLUMNS`, `PER_COLUMN`, `CARD` and `RADIUS` set the size and curve of the wall.",
      "The wall drifts, can be dragged with momentum, leans towards the pointer and spreads apart as you scroll the hero. One animation loop writes the transforms directly and pauses when the hero is off screen.",
      "The cursor trail in `motion-library-trail.tsx` uses `plates`, `SPACING` (pixels between images) and `LIFE` (how long each stays). When nobody points at it, a demo path draws a figure of eight so touch screens see it too.",
      "The assistant clip in `motion-library-assistant.tsx` is driven by scroll progress. `frameAt()` decides how much of the prompt is typed and which step shows; the `useTransform` ranges move the chat card and reveal the carousel.",
      "Headings marked with `<Scramble>` resolve out of random glyphs when they scroll into view; navbar links scramble on hover.",
      "Prices live in `plans` in `motion-library-pricing.tsx`; the digits roll like an odometer when the billing changes.",
      "Smooth scrolling is set up in `MotionLibraryMotion` in `motion-library-motion.tsx`. Remove it there if your app already has its own.",
      "Orrery, its components and its prices are made up. Change the name and mark in `motion-library-logo.tsx`, then the copy in each section file.",
      "Colours are `--ml-*` variables in your `globals.css`: `--ml-bg`, `--ml-card`, `--ml-ink`, `--ml-muted`, `--ml-accent` (orange), `--ml-paper` (the light panels) and a few more. The page is dark by design, so light and dark mode share them.",
      "The design pairs well with Instrument Sans and Geist Mono. In Next.js, load them with `next/font/google` and map them to `--font-sans` and `--font-mono`.",
    ],
    accessibility: [
      "Every animation follows the visitor’s reduced-motion setting: Lenis stops smoothing, the wall stops drifting and only moves when dragged, the trail demo stays off, the assistant clip shows its last frame without pinning, and headings never scramble.",
      "The wall, the trail and the live readout are decorative and hidden from screen readers. The hero has a real `h1`; every section is labelled by its own `h2`.",
      "Scrambling text keeps its real words available to screen readers the whole time.",
      "The ship-it options are tabs you can move between with the arrow keys. FAQ questions are buttons that say whether they are open. The billing switch uses toggle buttons, and price changes are announced.",
      "The navbar collapses into a disclosure menu on small screens that closes on Escape and returns focus to its toggle.",
    ],
    troubleshooting: [
      {
        problem: "Scrolling doesn’t feel smooth.",
        solution:
          "Check that `lenis` is installed and that the Lenis styles are in `globals.css`. If the visitor prefers reduced motion, smoothing is off on purpose.",
      },
      {
        problem: "Photos don’t show up.",
        solution:
          "They load from `images.unsplash.com`. Check your network and any Content Security Policy (`img-src`), or replace them with local images in `motion-library-media.ts`.",
      },
      {
        problem: "Lint warns about `<img>` elements.",
        solution:
          "Next.js suggests `next/image`. The template uses `<img>` so it works in any React app; switch to `next/image` if you like.",
      },
    ],
  },
})
