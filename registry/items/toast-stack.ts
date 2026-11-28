import { defineItem } from "../define.ts"

export default defineItem({
  name: "toast-stack",
  type: "registry:ui",
  title: "Toast Stack",
  description: "Notifications that stack in the corner, fan out on hover, pause while you read and swipe away, with actions like Undo.",
  version: "0.1.0",
  releasedAt: "2026-11-28",
  categories: ["interactive", "animations"],
  dependencies: ["lucide-react"],
  files: [{ path: "registry/default/ui/toast-stack.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      {
        name: "Toaster",
        type: "component",
        description: "Wrap your app (or layout) in it once. Takes `className` for the corner it sits in.",
      },
      {
        name: "useToast()",
        type: "{ toast(options): number; dismiss(id): void }",
        description: "`toast()` shows a notification and returns its id; `dismiss(id)` closes it early.",
      },
      { name: "title", type: "string", description: "The main line. Required." },
      { name: "description", type: "string", description: "A second line." },
      {
        name: "variant",
        type: '"default" | "success" | "error"',
        default: '"default"',
        description: "Sets the icon; errors are announced straight away.",
      },
      {
        name: "action",
        type: "{ label: string; onClick: () => void }",
        description: "A button, e.g. Undo. The toast closes after it runs.",
      },
      {
        name: "duration",
        type: "number",
        default: "5000 (8000 with an action)",
        description: "Milliseconds before it closes. 0 keeps it until dismissed.",
      },
    ],
    extends: "Only the props above.",
    requirements: ["`lucide-react` for icons. The CLI installs it.", "React 19 and Tailwind CSS v4."],
    customization: [
      "It sits bottom right. Move it with `className` on `Toaster`, e.g. `right-auto left-4` or `bottom-auto top-4`.",
      "Three toasts show in the stack; older ones wait behind. Change `VISIBLE` in the file.",
      "Give actions enough time: toasts with an action stay 8 seconds by default.",
    ],
    accessibility: [
      "Each toast is a `status` (read politely) or, for errors, an `alert` (read straight away).",
      "Timers pause while the stack is hovered or focused and while the tab is hidden, so nobody loses a message mid-read.",
      "Alt+T moves focus to the newest toast. Every toast has a labelled close button; swiping is an extra, not the only way.",
      "With reduced motion, toasts fade instead of sliding and fanning.",
    ],
    troubleshooting: [
      {
        problem: "`useToast must be used inside Toaster`.",
        solution: "Put `Toaster` around the part of your app that calls `useToast()`, usually in your root layout.",
      },
    ],
  },
})
