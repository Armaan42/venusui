import { defineItem } from "../define.ts"

export default defineItem({
  name: "file-dropzone",
  type: "registry:ui",
  title: "File Dropzone",
  description:
    "Drop or browse for files, checked against type, size and count, each uploading with its own progress bar, preview and retry.",
  version: "0.1.0",
  releasedAt: "2026-11-28",
  categories: ["inputs", "forms"],
  dependencies: ["lucide-react"],
  files: [{ path: "registry/default/ui/file-dropzone.tsx", type: "registry:ui" }],
  pageDocs: {
    props: [
      {
        name: "upload",
        type: "(file: File, onProgress: (p: number) => void, signal: AbortSignal) => Promise<void>",
        description:
          "Uploads one file. Report progress from 0 to 1, resolve when done, reject to show an error. `signal` aborts if the file is removed. Required.",
      },
      { name: "accept", type: "string", description: "Accepted types, like the `accept` attribute: `image/*,.pdf`." },
      { name: "maxSize", type: "number", description: "Largest file, in bytes." },
      { name: "maxFiles", type: "number", default: "10", description: "Most files at once." },
      {
        name: "onFilesChange",
        type: "(files: DroppedFile[]) => void",
        description: "Called whenever the list or a file's status changes.",
      },
      { name: "label", type: "string", default: '"Files"', description: "Visible label." },
      { name: "hint", type: "string", description: "Line under the prompt, e.g. what's allowed." },
    ],
    extends: "All `<div>` props except `onChange`.",
    requirements: ["`lucide-react` for icons. The CLI installs it.", "React 19 and Tailwind CSS v4."],
    customization: [
      "Report real progress with `XMLHttpRequest`'s `upload.onprogress`, or call `onProgress(1)` when a `fetch` finishes.",
      "Pass `signal` on to `fetch` so removing a file really cancels its upload.",
      "Images get a thumbnail from the file itself; other files get a document icon.",
    ],
    accessibility: [
      "The drop area is a button: Enter or Space opens the file browser, so dragging is never required.",
      "Rejected files are listed with the reason, and the number of files uploading is announced.",
      "Each file has a labelled progress bar, and labelled Retry and Remove (or Cancel) buttons.",
    ],
    troubleshooting: [
      {
        problem: "A file type I allowed is rejected.",
        solution: "Some systems report an empty type for less common files. Add the extension to `accept` too, e.g. `.heic`.",
      },
    ],
  },
})
