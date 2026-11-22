import { defineItem } from "../define.ts"

const files = [
  "",
  "-navbar",
  "-hero",
  "-about",
  "-services",
  "-process",
  "-projects",
  "-results",
  "-team",
  "-stats",
  "-testimonials",
  "-faq",
  "-cta",
  "-footer",
  "-logo",
  "-button",
  "-art",
  "-motion",
]

export default defineItem({
  name: "agency-landing",
  type: "registry:block",
  title: "Agency Landing",
  description:
    "A complete, animated site for a digital agency: a hero with tilted work cards, about, services, process, projects, client results, team, reviews, FAQ and contact.",
  version: "0.2.0",
  releasedAt: "2026-11-22",
  categories: ["templates"],
  // Brand purple, page and card surfaces, and the client strip's scroll.
  cssVars: {
    theme: {
      "color-agency-accent": "var(--agency-accent)",
      "color-agency-surface": "var(--agency-surface)",
      "color-agency-card": "var(--agency-card)",
      "animate-agency-marquee": "agency-marquee 28s linear infinite",
      "animate-agency-wheel": "agency-wheel 140s linear infinite",
      "animate-agency-flip": "agency-flip 18s ease-in-out infinite",
      "animate-agency-drift": "agency-drift 14s ease-in-out infinite alternate",
      "animate-agency-glow": "agency-glow 16s ease-in-out infinite alternate",
    },
    light: {
      "agency-accent": "oklch(0.56 0.24 290)",
      "agency-surface": "oklch(0.978 0.006 255)",
      "agency-card": "oklch(1 0 0)",
      "agency-muted": "oklch(0.5 0 0)",
    },
    dark: {
      "agency-accent": "oklch(0.56 0.22 290)",
      "agency-surface": "oklch(0.16 0.01 270)",
      "agency-card": "oklch(0.205 0.012 270)",
      "agency-muted": "oklch(0.72 0 0)",
    },
  },
  css: {
    "@keyframes agency-marquee": {
      from: { transform: "translateX(0)" },
      to: { transform: "translateX(-50%)" },
    },
    // The hero wheel turns right to left, a full circle every 140 seconds.
    "@keyframes agency-wheel": {
      from: { transform: "rotate(0deg)" },
      to: { transform: "rotate(-360deg)" },
    },
    // Each hero card shows its front, flips to its back, then flips home.
    "@keyframes agency-flip": {
      "0%, 58%": { transform: "rotateY(0deg)" },
      "64%, 80%": { transform: "rotateY(180deg)" },
      "86%, 100%": { transform: "rotateY(360deg)" },
    },
    "@keyframes agency-drift": {
      from: { transform: "scale(1.05) translate(0, 0)" },
      to: { transform: "scale(1.25) translate(-6%, 4%)" },
    },
    "@keyframes agency-glow": {
      from: { transform: "translate(0, 0) scale(1)" },
      to: { transform: "translate(18%, 12%) scale(1.2)" },
    },
    // FAQ answers slide open where the browser can animate to `auto` height.
    "@layer components": {
      ".agency-faq": { "interpolate-size": "allow-keywords" },
      ".agency-faq::details-content": {
        "block-size": "0",
        overflow: "hidden",
        transition: "block-size 0.35s ease, content-visibility 0.35s allow-discrete",
      },
      ".agency-faq[open]::details-content": { "block-size": "auto" },
      "@media (prefers-reduced-motion: reduce)": {
        ".agency-faq::details-content": { transition: "none" },
      },
    },
  },
  dependencies: ["lucide-react", "motion"],
  files: [
    ...files.map((suffix) => ({
      path: `registry/default/blocks/agency-landing/components/agency-landing${suffix}.tsx`,
      type: "registry:component" as const,
    })),
    {
      path: "registry/default/blocks/agency-landing/components/agency-landing-media.ts",
      type: "registry:component",
    },
  ],
  pageDocs: {
    props: [],
    extends:
      "No props. `agency-landing.tsx` puts the sections in order; each section is its own `agency-landing-*.tsx` file with its copy inside.",
    requirements: [
      "`lucide-react` for icons and `motion` for the animations. The CLI installs both.",
      "React 19 and Tailwind CSS v4, with a `cn` helper at `@/lib/utils`. The CLI adds the template’s colours, keyframes and the FAQ animation to your `globals.css`.",
      "An internet connection for the sample photos, which load from a remote image CDN.",
    ],
    customization: [
      "Render `<AgencyLanding />` from `app/page.tsx`, or render single sections such as `<AgencyLandingServices />` on other pages.",
      "Animations live in `agency-landing-motion.tsx`: `Reveal` and `RevealList` for scroll-in, `CountUp` for figures, `RevealWords` for the headline and `HeroWheel` for the turning, flipping cards. Tune the easing and timings there. If you render a section on its own, wrap it in `<AgencyLandingMotion>` so it follows reduced motion.",
      "Arcwell, its clients, its people and every figure on the page are made up. Change the name and mark in `agency-landing-logo.tsx`, then the copy and numbers in each section file.",
      "The abstract artwork is drawn with CSS gradients in `agency-landing-art.tsx`. Replace an `<AgencyLandingArt>` with an `<img>` of your own work wherever you have one.",
      "Client names are plain wordmarks. Replace them with your clients’ logos once you have permission to show them.",
      "The design pairs well with Inter Tight. In Next.js, load it with `next/font/google` and apply its class to the page.",
      "Team and review photos are listed in `agency-landing-media.ts` and the section files. Use your own photos, and keep `alt` text accurate.",
      "Colours are `--agency-accent` (purple), `--agency-surface` (page), `--agency-card` (cards) and `--agency-muted` (secondary text, a little darker than your theme’s so it stays readable on the tinted page) in your `globals.css`, with dark mode values. Change them there.",
    ],
    accessibility: [
      "One `h1` in the hero; every section is labelled by its own `h2`.",
      "The navbar collapses into a disclosure menu on small screens that closes on Escape and returns focus to its toggle.",
      "The tilted cards and the artwork are decorative and hidden from screen readers; the services section lists the same things as text.",
      "Every animation follows the visitor’s reduced-motion setting: sections appear without moving, figures show their final value, and the strip, badge, card wheel and glows stand still. The repeated half of the client strip is hidden from screen readers.",
      "Counting figures are hidden from screen readers while they count; the final value is always available as text.",
      "Star ratings are announced as “5 out of 5 stars”. Portraits have empty `alt` because the name is right next to them.",
      "FAQ items are native `<details>` elements.",
    ],
    troubleshooting: [
      {
        problem: "Photos don’t show up.",
        solution:
          "They load from `images.unsplash.com`. Check your network and any Content Security Policy (`img-src`), or replace them with local images.",
      },
      {
        problem: "Colours or the scrolling client strip are missing.",
        solution:
          "The CLI adds `--agency-*` variables, `--color-agency-*`, `--animate-agency-marquee` and the `agency-marquee` keyframes to `globals.css`. If you installed by hand, copy them from the registry JSON.",
      },
      {
        problem: "Lint warns about `<img>` elements.",
        solution:
          "Next.js suggests `next/image`. The template uses `<img>` so it works in any React app; switch to `next/image` if you like.",
      },
    ],
  },
})
