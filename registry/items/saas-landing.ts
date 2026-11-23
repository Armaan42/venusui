import { defineItem } from "../define.ts"

const files = [
  "",
  "-navbar",
  "-hero",
  "-dashboard",
  "-logos",
  "-features",
  "-mockups",
  "-customers",
  "-pricing",
  "-faq",
  "-cta",
  "-footer",
  "-logo",
  "-heading",
  "-motion",
]

export default defineItem({
  name: "saas-landing",
  type: "registry:block",
  title: "SaaS Landing",
  description:
    "A spacious, animated marketing site for a product analytics startup: a dark, glowing hero whose dashboard settles into place, feature spotlights with live mockups, a customer story, pricing, FAQ and footer.",
  version: "0.3.0",
  releasedAt: "2026-11-12",
  categories: ["templates"],
  registryDependencies: ["button", "input"],
  // The template's brand colors: indigo and emerald, lighter in dark mode.
  cssVars: {
    theme: {
      "color-saas-primary": "var(--saas-primary)",
      "color-saas-accent": "var(--saas-accent)",
      "animate-saas-marquee": "saas-marquee 40s linear infinite",
      "animate-saas-marquee-slow": "saas-marquee 70s linear infinite",
      "animate-saas-marquee-reverse": "saas-marquee 70s linear infinite reverse",
      "animate-saas-beam": "saas-beam 8s linear infinite",
      "animate-saas-glow": "saas-glow 8s ease-in-out infinite alternate",
    },
    light: { "saas-primary": "oklch(0.511 0.262 276.966)", "saas-accent": "oklch(0.596 0.145 163.225)" },
    dark: { "saas-primary": "oklch(0.673 0.182 276.935)", "saas-accent": "oklch(0.765 0.177 163.223)" },
  },
  css: {
    "@keyframes saas-marquee": {
      from: { transform: "translateX(0)" },
      to: { transform: "translateX(-50%)" },
    },
    // A streak of light travelling down a grid line in the hero.
    "@keyframes saas-beam": {
      from: { transform: "translateY(0)" },
      to: { transform: "translateY(calc(100vh + 24rem))" },
    },
    // The glow behind the hero dashboard breathes slowly.
    "@keyframes saas-glow": {
      from: { opacity: "0.55", scale: "0.95" },
      to: { opacity: "1", scale: "1.05" },
    },
    // FAQ answers slide open where the browser can animate to `auto` height.
    "@layer saas-landing": {
      ".saas-faq": { "interpolate-size": "allow-keywords" },
      ".saas-faq::details-content": {
        "block-size": "0",
        overflow: "hidden",
        transition: "block-size 0.35s ease, content-visibility 0.35s allow-discrete",
      },
      ".saas-faq[open]::details-content": { "block-size": "auto" },
      "@media (prefers-reduced-motion: reduce)": {
        ".saas-faq::details-content": { transition: "none" },
      },
    },
  },
  dependencies: ["lucide-react", "motion"],
  files: [
    ...files.map((suffix) => ({
      path: `registry/default/blocks/saas-landing/components/saas-landing${suffix}.tsx`,
      type: "registry:component" as const,
    })),
    { path: "registry/default/blocks/saas-landing/components/saas-landing-media.ts", type: "registry:component" },
  ],
  pageDocs: {
    props: [],
    extends:
      "No props. `saas-landing.tsx` puts the sections in order; each section is its own `saas-landing-*.tsx` file with its copy inside.",
    requirements: [
      "shadcn `button` and `input`, `lucide-react` and `motion`. The CLI installs them.",
      "React 19 and Tailwind CSS v4, with a `cn` helper at `@/lib/utils`. The CLI adds the template’s two brand colors, the scrolling keyframes and the FAQ animation to your `globals.css`.",
      "An internet connection for the sample photos, which load from a remote image CDN.",
    ],
    customization: [
      "Render `<SaasLanding />` from `app/page.tsx`, or render single sections such as `<SaasLandingPricing />` on other pages.",
      "Pulsewise and its customers are made up. Change the name and mark in `saas-landing-logo.tsx`, then the copy in each section file.",
      "The feature mockups live in `saas-landing-mockups.tsx` and the hero dashboard in `saas-landing-dashboard.tsx`. They are HTML, so they follow your theme; swap them for screenshots of your product when you have them.",
      "Animations live in `saas-landing-motion.tsx`: `Reveal` and `RevealList` for scroll-in, `CountUp` for figures, `HeroScreen` for the dashboard that settles flat as you scroll, and `GrowBar` for the funnel bars. If you render a section on its own, wrap it in `<SaasLandingMotion>` so it follows reduced motion.",
      "The sample photos are listed in `saas-landing-media.ts`. Swap in your own photos there, and keep the `alt` text accurate.",
      "To serve photos through `next/image`, add `images.unsplash.com` to `images.remotePatterns` in `next.config.ts`, or move your own photos into `public/`.",
      "The hero dashboard (`saas-landing-dashboard.tsx`) is HTML, so it follows your theme. Replace it with a screenshot of your product when you have one.",
      "Plans and prices are in `saas-landing-pricing.tsx`. Prices are per month in USD, with a yearly price per plan.",
      "Brand colors are `--saas-primary` (indigo) and `--saas-accent` (emerald) in your `globals.css`, with lighter values for dark mode. Change them there; everything else follows your theme.",
    ],
    accessibility: [
      "Every animation follows the visitor’s reduced-motion setting: sections appear without moving, figures show their final value, and the logo and testimonial strips, the hero's light beams and its glow stand still. Repeated copies in the strips are hidden from screen readers.",
      "One `h1` in the hero; every section is labelled by its own `h2`.",
      "The navbar collapses into a disclosure menu on small screens that closes on Escape and returns focus to its toggle.",
      "The dashboard and feature mockups are announced as one image with a text description, not as dozens of numbers.",
      "The billing switch uses `aria-pressed`, FAQ items are native `<details>` elements, and the newsletter field has a visible label.",
      "Testimonial photos have empty `alt` text because the person’s name is right next to them; the case study photo is described.",
    ],
    troubleshooting: [
      {
        problem: "Photos don’t show up.",
        solution:
          "They load from `images.unsplash.com`. Check your network and any Content Security Policy (`img-src`), or replace them with local images.",
      },
      {
        problem: "The indigo and emerald accents are missing.",
        solution:
          "The CLI adds `--saas-primary` and `--saas-accent` to `globals.css`, plus `--color-saas-*` in `@theme inline`. If you installed by hand, copy them from the registry JSON.",
      },
      {
        problem: "Lint warns about `<img>` elements.",
        solution:
          "Next.js suggests `next/image`. The template uses `<img>` so it works in any React app; switch to `next/image` if you like (see Customization).",
      },
    ],
  },
})
