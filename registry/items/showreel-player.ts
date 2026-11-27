import { defineItem } from "../define.ts"

export default defineItem({
  name: "showreel-player",
  type: "registry:ui",
  title: "Showreel Player",
  description: "A video player for a showreel: a silent preview behind a big play button, then a progress bar split into named chapters.",
  version: "0.1.0",
  releasedAt: "2026-11-27",
  categories: ["interactive", "data-display"],
  dependencies: ["lucide-react"],
  files: [{ path: "registry/default/ui/showreel-player.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      { name: "src", type: "string", description: "The video file. Required." },
      { name: "title", type: "string", description: "The reel's name, on the cover and as the player's accessible name. Required." },
      {
        name: "poster",
        type: "string",
        description: "Image shown before the video loads, and instead of the preview with reduced motion.",
      },
      { name: "description", type: "string", description: "A short line under the title on the cover." },
      {
        name: "chapters",
        type: "{ start: number; title: string }[]",
        description: "Start times in seconds. They split the progress bar and are listed under the player.",
      },
      {
        name: "preview",
        type: "boolean",
        default: "true",
        description: "Play the reel silently on a loop behind the cover until someone presses play.",
      },
      { name: "children", type: "ReactNode", description: "`<track>` elements for captions, passed into the `<video>`." },
    ],
    extends: "All `<div>` props except `title`.",
    requirements: [
      "`lucide-react` for icons. The CLI installs it.",
      "React 19 and Tailwind CSS v4.",
      "A video file the browser can play: MP4 (H.264) plays everywhere, WebM in modern browsers.",
    ],
    customization: [
      "The player is 16:9 with `aspect-video`. Change it in the file for a square or vertical reel.",
      "Controls hide after 2.6 seconds of stillness while playing. Change the delay in `wake()`.",
      "Leave out `chapters` for a single progress bar and no chapter list.",
    ],
    accessibility: [
      "The player is a region named by `title`. Play, Pause, Mute and Full screen are labelled buttons.",
      "The progress bar is a `slider` read as “0:12 of 0:23, About page”. Arrow keys skip 5 seconds, Page Up and Down a tenth, Home and End go to the ends.",
      "Shortcuts inside the player: K or Space plays and pauses, M mutes, F goes full screen.",
      "Controls stay visible while paused, while scrubbing and while keyboard focus is on them.",
      "With reduced motion, the cover shows the poster instead of the moving preview.",
      "If your reel has speech, pass a captions `<track>` as a child.",
    ],
    troubleshooting: [
      {
        problem: "The preview doesn't play.",
        solution:
          "Browsers only autoplay muted video, which the preview is. It also stays still if the visitor prefers reduced motion, or on low-power mode on some phones.",
      },
      {
        problem: "There's no full screen button on iPhone.",
        solution: "iOS doesn't allow full screen for elements other than the video itself, so the button is hidden there.",
      },
    ],
  },
})
