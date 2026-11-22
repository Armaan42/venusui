"use client"

import * as React from "react"
import { Lock, LockOpen } from "lucide-react"

import { MorseKey } from "@/registry/default/ui/morse-key"

export const meta = {
  title: "Online escape room puzzle",
  description: "The Morse key as a puzzle in an online escape room: tap out the password to open the radio room door.",
}

// The game and puzzle are made up.
export default function EscapeRoom() {
  const [text, setText] = React.useState("")
  const open = text.replace(/\s/g, "").toUpperCase().includes("SOS")

  return (
    <div className="dark min-h-[34rem] bg-background text-foreground">
      <div className="mx-auto max-w-2xl px-6 py-12">
        <p className="text-sm text-muted-foreground">The Lighthouse Keeper · Room 3 of 5 · 18:42 left</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">The radio room</h1>
        <p className="mt-2 text-muted-foreground">
          Scratched into the desk: <span className="font-mono text-foreground">··· − − − ···</span>. Send it on the key and the door might listen.
        </p>
        <MorseKey className="mt-8" onValueChange={setText} />
        <p role="status" className="mt-6 flex items-center gap-2 text-sm">
          {open ? (
            <>
              <LockOpen aria-hidden="true" className="size-4 text-emerald-400" />
              <span className="font-medium">The door clicks open. On to the lamp room.</span>
            </>
          ) : (
            <>
              <Lock aria-hidden="true" className="size-4 text-muted-foreground" />
              <span className="text-muted-foreground">The door is locked.</span>
            </>
          )}
        </p>
      </div>
    </div>
  )
}
