"use client"

import * as React from "react"

import { FileDropzone, type DroppedFile } from "@/registry/default/ui/file-dropzone"

export const meta = {
  title: "Job application",
  description:
    "A file dropzone in a job application form, taking a CV and portfolio pieces, with the submit button waiting until uploads finish.",
}

// The studio and role are made up. This pretends to upload; swap in your own `upload`.
function pretendUpload(file: File, onProgress: (p: number) => void, signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    let progress = 0
    const timer = window.setInterval(() => {
      progress += 0.1 + Math.random() * 0.1
      onProgress(Math.min(1, progress))
      if (progress >= 1) {
        window.clearInterval(timer)
        resolve()
      }
    }, 160)
    signal.addEventListener("abort", () => {
      window.clearInterval(timer)
      reject(new Error("Cancelled"))
    })
  })
}

export default function JobApplication() {
  const [files, setFiles] = React.useState<DroppedFile[]>([])
  const uploading = files.some((f) => f.status === "uploading")
  const ready = files.some((f) => f.status === "done") && !uploading

  return (
    <div className="mx-auto min-h-svh max-w-xl bg-background px-4 py-10 text-foreground">
      <p className="text-sm text-muted-foreground">Arcwell · Lisbon or remote</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">Apply: Product designer</h1>
      <form className="mt-8 space-y-6" onSubmit={(event) => event.preventDefault()}>
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
            Full name
          </label>
          <input
            id="name"
            autoComplete="name"
            className="h-10 w-full rounded-lg border bg-background px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          />
        </div>
        <FileDropzone
          upload={pretendUpload}
          accept=".pdf,image/*"
          maxSize={15 * 1024 * 1024}
          maxFiles={6}
          label="CV and portfolio"
          hint="PDF or images, up to 15 MB each, six files at most"
          onFilesChange={setFiles}
        />
        <button
          type="submit"
          disabled={!ready}
          className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground outline-none hover:opacity-90 focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-50"
        >
          {uploading ? "Waiting for uploads…" : "Send application"}
        </button>
      </form>
    </div>
  )
}
