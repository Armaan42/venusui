import { defineItem } from "../define.ts"

export default defineItem({
  name: "announcement-bar",
  type: "registry:ui",
  title: "Announcement Bar",
  description: "A slim top bar that rotates through announcements, with arrows, pause and a dismissal it can remember.",
  version: "0.1.0",
  releasedAt: "2026-11-28",
  categories: ["navigation", "interactive"],
  dependencies: ["lucide-react"],
  files: [{ path: "registry/default/ui/announcement-bar.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      {
        name: "announcements",
        type: "{ id: string; content: ReactNode; href?: string; linkLabel?: string }[]",
        description: "The messages, each with an optional link. Required.",
      },
      {
        name: "interval",
        type: "number",
        default: "5000",
        description: "Time each message shows before the next, in milliseconds. 0 stops the rotation.",
      },
      { name: "dismissible", type: "boolean", default: "true", description: "Shows a close button." },
      {
        name: "storageKey",
        type: "string",
        description: "Remembers a dismissal in the browser under this key, so the bar stays closed on later visits.",
      },
      { name: "onDismiss", type: "() => void", description: "Called after the bar closes." },
      { name: "label", type: "string", default: '"Announcements"', description: "Accessible name for the bar." },
    ],
    extends: "All `<div>` props. `className` styles the bar itself.",
    requirements: ["`lucide-react` for icons. The CLI installs it.", "React 19 and Tailwind CSS v4."],
    customization: [
      'The bar is `bg-foreground text-background`. Pass `className="bg-primary text-primary-foreground"` for your brand colour.',
      "Change `storageKey` when you have a new message, so people who closed the old one see it.",
      "Keep messages short. On phones the arrows tuck away and a message can wrap onto two lines; on wider screens it stays on one.",
    ],
    accessibility: [
      "The bar is a region named by `label`. Only the message on show is read; the others are hidden and `inert`.",
      "The rotation is quiet for screen readers; after an arrow press, the new message is read out.",
      "It pauses while hovered or focused, has a pause button, and doesn't rotate with reduced motion.",
      "Dismissing collapses the bar smoothly and removes it.",
    ],
    troubleshooting: [
      {
        problem: "The bar shows again after closing it.",
        solution: "Without `storageKey` it only stays closed until the page reloads. Add a key to remember it.",
      },
    ],
  },
})
