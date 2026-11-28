"use client"

import * as React from "react"
import { CircleAlert, CircleCheck, FileText, RotateCcw, UploadCloud, X } from "lucide-react"

import { cn } from "@/lib/utils"

type Status = "uploading" | "done" | "error"

export interface DroppedFile {
  id: string
  file: File
  status: Status
  /** 0 to 1. */
  progress: number
  error?: string
  /** An object URL for image previews. */
  preview?: string
}

interface FileDropzoneProps extends Omit<React.ComponentProps<"div">, "onChange"> {
  /**
   * Uploads one file. Report progress (0 to 1) with `onProgress`; resolve when
   * done, reject to show an error. The `signal` aborts when the file is removed.
   */
  upload: (file: File, onProgress: (progress: number) => void, signal: AbortSignal) => Promise<void>
  /** File types to accept, like the `accept` attribute: `image/*,.pdf`. */
  accept?: string
  /** Largest file in bytes. */
  maxSize?: number
  /** Most files at once. */
  maxFiles?: number
  /** Called whenever the list or a file's status changes. */
  onFilesChange?: (files: DroppedFile[]) => void
  /** Visible label, e.g. "Project files". */
  label?: string
  /** Line under the label, e.g. what's allowed. */
  hint?: string
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

/** Matches a file against an `accept` list: extensions, exact types or `type/*`. */
function accepts(file: File, accept?: string) {
  if (!accept) return true
  return accept.split(",").some((rule) => {
    const r = rule.trim().toLowerCase()
    if (r.startsWith(".")) return file.name.toLowerCase().endsWith(r)
    if (r.endsWith("/*")) return file.type.startsWith(r.slice(0, -1))
    return file.type === r
  })
}

/**
 * Drop files here, or press it to browse. Each file is checked against
 * `accept`, `maxSize` and `maxFiles`, then uploaded with your `upload`
 * function, showing its own progress bar, a retry button if it fails and
 * a preview for images.
 */
function FileDropzone({
  upload,
  accept,
  maxSize,
  maxFiles = 10,
  onFilesChange,
  label = "Files",
  hint,
  className,
  ...props
}: FileDropzoneProps) {
  const [files, setFiles] = React.useState<DroppedFile[]>([])
  const [over, setOver] = React.useState(false)
  const [rejected, setRejected] = React.useState<string[]>([])
  const inputRef = React.useRef<HTMLInputElement>(null)
  const controllers = React.useRef(new Map<string, AbortController>())
  const depth = React.useRef(0)
  const id = React.useId()

  const update = React.useCallback((fileId: string, patch: Partial<DroppedFile>) => {
    setFiles((all) => all.map((f) => (f.id === fileId ? { ...f, ...patch } : f)))
  }, [])

  // Tell the parent about every change to the list, once per change.
  const onChange = React.useRef(onFilesChange)
  React.useEffect(() => {
    onChange.current = onFilesChange
  })
  const first = React.useRef(true)
  React.useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    onChange.current?.(files)
  }, [files])

  const start = (item: DroppedFile) => {
    const controller = new AbortController()
    controllers.current.set(item.id, controller)
    update(item.id, { status: "uploading", progress: 0, error: undefined })
    upload(item.file, (progress) => update(item.id, { progress: Math.min(1, Math.max(0, progress)) }), controller.signal)
      .then(() => {
        if (!controller.signal.aborted) update(item.id, { status: "done", progress: 1 })
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        update(item.id, { status: "error", error: error instanceof Error ? error.message : "Upload failed" })
      })
  }

  const add = (list: FileList | File[]) => {
    const problems: string[] = []
    const room = Math.max(0, maxFiles - files.length)
    const incoming = Array.from(list)
    if (incoming.length > room) problems.push(`Only ${maxFiles} files at a time; ${incoming.length - room} not added.`)
    const fresh: DroppedFile[] = []
    for (const file of incoming.slice(0, room)) {
      if (!accepts(file, accept)) problems.push(`${file.name} isn't an accepted file type.`)
      else if (maxSize && file.size > maxSize) problems.push(`${file.name} is larger than ${formatSize(maxSize)}.`)
      else
        fresh.push({
          id: `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2, 7)}`,
          file,
          status: "uploading",
          progress: 0,
          preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
        })
    }
    setRejected(problems)
    if (!fresh.length) return
    setFiles((all) => [...all, ...fresh])
    fresh.forEach(start)
  }

  const remove = (item: DroppedFile) => {
    controllers.current.get(item.id)?.abort()
    controllers.current.delete(item.id)
    if (item.preview) URL.revokeObjectURL(item.preview)
    setFiles((all) => all.filter((f) => f.id !== item.id))
  }

  // Abort uploads and free previews when the dropzone goes away.
  React.useEffect(() => {
    const live = controllers.current
    return () => live.forEach((c) => c.abort())
  }, [])

  const busy = files.filter((f) => f.status === "uploading").length

  return (
    <div data-slot="file-dropzone" className={cn("w-full", className)} {...props}>
      <p id={`${id}-label`} className="mb-1.5 text-sm font-medium">
        {label}
      </p>
      <div
        role="button"
        tabIndex={0}
        aria-labelledby={`${id}-label ${id}-cta`}
        aria-describedby={hint ? `${id}-hint` : undefined}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            inputRef.current?.click()
          }
        }}
        onDragEnter={(event) => {
          event.preventDefault()
          depth.current++
          setOver(true)
        }}
        onDragOver={(event) => {
          event.preventDefault()
          event.dataTransfer.dropEffect = "copy"
        }}
        onDragLeave={() => {
          depth.current = Math.max(0, depth.current - 1)
          if (!depth.current) setOver(false)
        }}
        onDrop={(event) => {
          event.preventDefault()
          depth.current = 0
          setOver(false)
          add(event.dataTransfer.files)
        }}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-[border-color,background-color,scale] duration-200 outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
          over ? "scale-[1.01] border-primary bg-primary/5" : "border-border hover:border-foreground/30 hover:bg-muted/40",
        )}
      >
        <span
          className={cn(
            "grid size-12 place-items-center rounded-full bg-muted transition-transform duration-300",
            over && "-translate-y-1",
          )}
        >
          <UploadCloud aria-hidden="true" className="size-5" />
        </span>
        <p id={`${id}-cta`} className="text-sm">
          <span className="font-medium">{over ? "Drop to upload" : "Drop files here"}</span>{" "}
          {over ? null : <span className="text-muted-foreground">or click to browse</span>}
        </p>
        {hint ? (
          <p id={`${id}-hint`} className="text-xs text-muted-foreground">
            {hint}
          </p>
        ) : null}
        <input
          ref={inputRef}
          type="file"
          multiple={maxFiles > 1}
          accept={accept}
          tabIndex={-1}
          aria-hidden="true"
          className="hidden"
          onChange={(event) => {
            if (event.target.files) add(event.target.files)
            event.target.value = ""
          }}
        />
      </div>

      <div aria-live="polite" className="text-sm">
        {rejected.length ? (
          <ul className="mt-3 space-y-1 text-red-700 dark:text-red-400">
            {rejected.map((problem) => (
              <li key={problem} className="flex items-start gap-1.5">
                <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                {problem}
              </li>
            ))}
          </ul>
        ) : null}
        <p className="sr-only">{busy ? `Uploading ${busy} ${busy === 1 ? "file" : "files"}` : ""}</p>
      </div>

      {files.length ? (
        <ul className="mt-4 space-y-2" aria-label={`${label}: ${files.length} ${files.length === 1 ? "file" : "files"}`}>
          {files.map((item) => (
            <li key={item.id} className="flex items-center gap-3 rounded-xl border bg-card p-2.5 pr-3 text-card-foreground">
              {item.preview ? (
                <img src={item.preview} alt="" className="size-10 shrink-0 rounded-lg object-cover" />
              ) : (
                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-muted">
                  <FileText aria-hidden="true" className="size-4" />
                </span>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <p className="truncate font-medium">{item.file.name}</p>
                  <p className="shrink-0 text-xs text-muted-foreground tabular-nums">
                    {item.status === "uploading" ? `${Math.round(item.progress * 100)}%` : formatSize(item.file.size)}
                  </p>
                </div>
                {item.status === "error" ? (
                  <p className="mt-1 text-xs text-red-700 dark:text-red-400">{item.error}</p>
                ) : (
                  <div
                    role="progressbar"
                    aria-label={`Uploading ${item.file.name}`}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(item.progress * 100)}
                    className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted"
                  >
                    <div
                      className={cn(
                        "h-full rounded-full transition-[width,background-color] duration-300 motion-reduce:transition-none",
                        item.status === "done" ? "bg-emerald-500" : "bg-primary",
                      )}
                      style={{ width: `${item.progress * 100}%` }}
                    />
                  </div>
                )}
              </div>
              {item.status === "done" ? (
                <span className="shrink-0">
                  <CircleCheck aria-hidden="true" className="size-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="sr-only">Uploaded</span>
                </span>
              ) : null}
              {item.status === "error" ? (
                <button
                  type="button"
                  onClick={() => start(item)}
                  aria-label={`Retry ${item.file.name}`}
                  className="grid size-8 shrink-0 place-items-center rounded-lg outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <RotateCcw aria-hidden="true" className="size-4" />
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => remove(item)}
                aria-label={`${item.status === "uploading" ? "Cancel" : "Remove"} ${item.file.name}`}
                className="grid size-8 shrink-0 place-items-center rounded-lg text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <X aria-hidden="true" className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export { FileDropzone }
