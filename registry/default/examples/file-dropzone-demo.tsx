import { FileDropzone } from "@/registry/default/ui/file-dropzone"

function pretendUpload(file: File, onProgress: (p: number) => void, signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    let progress = 0
    const timer = window.setInterval(() => {
      progress += 0.08 + Math.random() * 0.12
      onProgress(Math.min(1, progress))
      if (progress >= 1) {
        window.clearInterval(timer)
        resolve()
      }
    }, 180)
    signal.addEventListener("abort", () => {
      window.clearInterval(timer)
      reject(new Error("Cancelled"))
    })
  })
}

export default function FileDropzoneDemo() {
  return (
    <FileDropzone
      upload={pretendUpload}
      accept="image/*,.pdf"
      maxSize={10 * 1024 * 1024}
      maxFiles={5}
      label="Attachments"
      hint="Images or PDFs, up to 10 MB each"
      className="max-w-md"
    />
  )
}
