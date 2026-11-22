"use client"

import * as React from "react"

import { PaperShredder } from "@/registry/default/ui/paper-shredder"

export const meta = {
  title: "Delete an old document",
  description: "The paper shredder in a document storage app, making it clear that deleting an old bank statement is for good.",
}

// The app and statement are made up.
export default function DocumentCleanup() {
  const [shredded, setShredded] = React.useState(false)

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <p className="text-sm text-muted-foreground">Tidewell Vault · Documents · 2019</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">Delete this statement for good?</h1>
      <p className="mt-2 text-muted-foreground">
        You only need to keep bank statements for six years. Once it&apos;s shredded, we delete every copy, including backups.
      </p>
      <PaperShredder className="mx-auto mt-8" strips={10} onShred={() => setShredded(true)}>
        <p className="font-serif text-base font-semibold">Brightwater Bank</p>
        <p className="mt-1 text-xs text-neutral-500">Statement · March 2019 · Account ending 4417</p>
        <div className="mt-4 space-y-1.5 text-xs">
          <p className="flex justify-between">
            <span>Opening balance</span>
            <span>€2,310.40</span>
          </p>
          <p className="flex justify-between">
            <span>Money in</span>
            <span>€1,850.00</span>
          </p>
          <p className="flex justify-between">
            <span>Money out</span>
            <span>€1,622.15</span>
          </p>
          <p className="flex justify-between border-t pt-1.5 font-semibold">
            <span>Closing balance</span>
            <span>€2,538.25</span>
          </p>
        </div>
      </PaperShredder>
      <p role="status" className="mt-6 text-center text-sm text-muted-foreground">
        {shredded ? "Gone. It will disappear from your backups within 24 hours." : "Feed the sheet in to delete it."}
      </p>
    </div>
  )
}
