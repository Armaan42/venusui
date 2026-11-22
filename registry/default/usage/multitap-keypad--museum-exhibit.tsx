"use client"

import * as React from "react"

import { MultitapKeypad } from "@/registry/default/ui/multitap-keypad"

export const meta = {
  title: "Museum interactive exhibit",
  description: "The multitap keypad in a technology museum's exhibit, inviting visitors to send a text the way people did in 2003.",
}

// The museum and exhibit are made up.
export default function MuseumExhibit() {
  const [text, setText] = React.useState("")

  return (
    <div className="mx-auto grid max-w-4xl grid-cols-[minmax(0,1fr)] items-center gap-10 px-6 py-12 md:grid-cols-[auto_minmax(0,1fr)]">
      <MultitapKeypad className="mx-auto" maxLength={160} onValueChange={setText} />
      <div>
        <p className="text-sm text-muted-foreground">The Engine Shed · Gallery 4 · Pocket phones</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">Text like it&apos;s 2003</h1>
        <p className="mt-2 text-muted-foreground">
          Before touchscreens, each key held three or four letters. Press 4 twice for H, wait, then 4 three times for I. Try writing
          &ldquo;see you at 8&rdquo;.
        </p>
        <p role="status" className="mt-6 rounded-xl border bg-card p-5 text-sm">
          {text.length === 0 ? (
            <span className="text-muted-foreground">Messages were capped at 160 characters. Anything longer was sent as two.</span>
          ) : (
            <span>
              <span className="font-medium">{text.length} of 160 characters.</span>{" "}
              <span className="text-muted-foreground">Still fits in one message.</span>
            </span>
          )}
        </p>
      </div>
    </div>
  )
}
