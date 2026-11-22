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
]

export default defineItem({
  name: "agency-landing",
  type: "registry:block",
  title: "Agency Landing",
  description:
    "A complete site for a digital agency: a hero with tilted work cards, about, services, process, projects, client results, team, reviews, FAQ and contact.",
  version: "0.1.0",
  releasedAt: "2026-11-22",
  categories: ["templates"],
  // Brand purple, page and card surfaces, and the client strip's scroll.
  cssVars: {
    theme: {
      "color-agency-accent": "var(--agency-accent)",
      "color-agency-surface": "var(--agency-surface)",
      "color-agency-card": "var(--agency-card)",
      "animate-agency-marquee": "agency-marquee 28s linear infinite",
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
  },
  dependencies: ["lucide-react"],
  files: [
    ...files.map((suffix) => ({
      path: `registry/default/blocks/agency-landing/components/agency-landing${suffix}.tsx`,
      type: "registry:component" as const,
    })),
    { path: "registry/default/blocks/agency-landing/components/agency-landing-media.ts", type: "registry:component" },
  ],
  pageDocs: {
    props: [],
    extends:
      "No props. `agency-landing.tsx` puts the sections in order; each section is its own `agency-landing-*.tsx` file with its copy inside.",
    requirements: [
      "`lucide-react` for icons. The CLI installs it.",
      "React 19 and Tailwind CSS v4, with a `cn` helper at `@/lib/utils`. The CLI adds the template’s colours and the client strip animation to your `globals.css`.",
      "An internet connection for the sample photos, which load from a remote image CDN.",
    ],
    customization: [
      "Render `<AgencyLanding />` from `app/page.tsx`, or render single sections such as `<AgencyLandingServices />` on other pages.",
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
      "The client strip and the rotating badge stop moving when the visitor prefers reduced motion. The repeated half of the strip is hidden from screen readers.",
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
        solution: "Next.js suggests `next/image`. The template uses `<img>` so it works in any React app; switch to `next/image` if you like.",
      },
    ],
  },
})
