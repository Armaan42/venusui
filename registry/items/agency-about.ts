import { defineItem } from "../define.ts"

const files = ["", "-hero", "-mission", "-story", "-vision", "-team"]

export default defineItem({
  name: "agency-about",
  type: "registry:block",
  title: "Agency About",
  description:
    "An animated About page for a digital agency: a hero collage with live stat cards, a mission that lights up as you read, a timeline, a client chat that plays out, the team and a contact form.",
  version: "0.1.0",
  releasedAt: "2026-11-24",
  categories: ["templates"],
  // The navbar, motion helpers, contact section, footer and colours come from Agency Landing, so the two pages match.
  internalDependencies: ["agency-landing"],
  cssVars: {
    theme: { "animate-agency-bob": "agency-bob 6s ease-in-out infinite" },
  },
  css: {
    // The floating cards in the hero and vision sections drift up and down.
    "@keyframes agency-bob": {
      "0%, 100%": { transform: "translateY(0)" },
      "50%": { transform: "translateY(-10px)" },
    },
  },
  dependencies: ["lucide-react", "motion"],
  files: [
    ...files.map((suffix) => ({
      path: `registry/default/blocks/agency-about/components/agency-about${suffix}.tsx`,
      type: "registry:component" as const,
    })),
    { path: "registry/default/blocks/agency-about/components/agency-about-media.ts", type: "registry:component" },
  ],
  pageDocs: {
    props: [],
    extends:
      "No props. `agency-about.tsx` puts the sections in order; each section is its own `agency-about-*.tsx` file with its copy inside.",
    requirements: [
      "Agency Landing, which the CLI installs with it: the About page reuses its navbar, motion helpers, contact section, footer and colours.",
      "`lucide-react` and `motion`. The CLI installs them and adds the floating-card keyframes to your `globals.css`.",
      "React 19 and Tailwind CSS v4, with a `cn` helper at `@/lib/utils`.",
      "An internet connection for the sample photos, which load from a remote image CDN.",
    ],
    customization: [
      "Render `<AgencyAbout />` from `app/about/page.tsx`, next to `<AgencyLanding />` on your home page.",
      "The navbar links are set at the top of `agency-about.tsx`; the current page is marked with `current: true`.",
      "Arcwell, its clients, its people, its story and every figure are made up. Edit the copy and numbers in each section file.",
      "Photos are in `agency-about-media.ts` and the section files. Use photos of your own studio and team, and keep `alt` text accurate.",
      "The mission paragraph brightens word by word as it scrolls past. To change the text, edit `mission` in `agency-about-mission.tsx`.",
      "The client thread in `agency-about-vision.tsx` is a list of messages; change them, add more, or remove the section.",
    ],
    accessibility: [
      'One `h1` in the hero; every section is labelled by its own `h2`. The navbar marks the About link with `aria-current="page"`.',
      "The collage cards, the scroll-linked cards and the floating faces are decorative and hidden from screen readers.",
      "The word-by-word mission is read out as one sentence. The chat thread's full text is always available to screen readers, even while it plays out on screen.",
      "Everything follows the visitor’s reduced-motion setting: cards stop floating, the mission text shows in full colour and the thread appears at once.",
    ],
    troubleshooting: [
      {
        problem: "Imports from `agency-landing-*` files fail.",
        solution: "Agency About reuses Agency Landing. Install it with the CLI (it comes along automatically) or add Agency Landing first.",
      },
      {
        problem: "Photos don’t show up.",
        solution:
          "They load from `images.unsplash.com`. Check your network and any Content Security Policy (`img-src`), or replace them with local images.",
      },
      {
        problem: "Lint warns about `<img>` elements.",
        solution:
          "Next.js suggests `next/image`. The template uses `<img>` so it works in any React app; switch to `next/image` if you like.",
      },
    ],
  },
})
