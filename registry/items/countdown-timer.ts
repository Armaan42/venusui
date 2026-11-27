import { defineItem } from "../define.ts"

export default defineItem({
  name: "countdown-timer",
  type: "registry:ui",
  title: "Countdown Timer",
  description: "Counts down to a date in days, hours, minutes and seconds, with each digit sliding in as it changes.",
  version: "0.1.0",
  releasedAt: "2026-11-28",
  categories: ["data-display", "animations"],
  files: [{ path: "registry/default/ui/countdown-timer.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      { name: "to", type: "Date | string | number", description: 'The moment to count down to, e.g. `"2027-03-12T17:00:00Z"`. Required.' },
      { name: "label", type: "string", default: '"Time remaining"', description: 'Accessible name, e.g. "Time until doors open".' },
      { name: "onComplete", type: "() => void", description: "Called once when the countdown reaches zero." },
      { name: "completed", type: "ReactNode", description: "Shown in place of the tiles once it's over." },
      {
        name: "units",
        type: "{ days: string; hours: string; minutes: string; seconds: string }",
        description: "Names under the tiles, e.g. for another language.",
      },
    ],
    extends: "All `<div>` props except `children`.",
    requirements: [
      "React 19 and Tailwind CSS v4. The digits slide in with the `starting:` variant (`@starting-style`); browsers without it just swap them.",
    ],
    customization: [
      "Give `to` a time with a time zone, such as `2027-03-12T17:00:00Z`, so everyone counts to the same moment.",
      "Tiles use your `card` colour. Change the classes on the tile for a darker or larger look.",
      "Every countdown on the page shares one timer that ticks on the second, so several stay in step.",
    ],
    accessibility: [
      "It's a `timer` named by `label`. Screen readers can read the time left in words, e.g. “3 days, 4 hours, 12 minutes, 5 seconds”, without it interrupting every second.",
      "It shows dashes until it has loaded, so the page never flashes a wrong time.",
      "With reduced motion, digits change without sliding.",
    ],
    troubleshooting: [
      {
        problem: "Visitors see different times.",
        solution: "A date without a time zone is read in each visitor's own zone. Add `Z` or an offset like `+01:00`.",
      },
    ],
  },
})
