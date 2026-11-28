"use client"

import * as React from "react"
import { Copy, Link2, Mail, MessageCircle } from "lucide-react"

import { BottomSheet } from "@/registry/default/ui/bottom-sheet"

const options = [
  { icon: Link2, label: "Copy link" },
  { icon: Mail, label: "Send by email" },
  { icon: MessageCircle, label: "Send as a message" },
  { icon: Copy, label: "Duplicate" },
]

export default function BottomSheetDemo() {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg border bg-background px-4 py-2 text-sm font-medium shadow-xs outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        Share this board
      </button>
      <BottomSheet open={open} onOpenChange={setOpen} title="Share" description="Anyone with the link can view the board.">
        <ul className="divide-y">
          {options.map((option) => (
            <li key={option.label}>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex w-full items-center gap-3 py-3.5 text-left text-sm outline-none hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <span className="grid size-9 place-items-center rounded-full bg-muted">
                  <option.icon aria-hidden="true" className="size-4" />
                </span>
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      </BottomSheet>
    </>
  )
}
