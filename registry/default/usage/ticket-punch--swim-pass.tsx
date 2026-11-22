"use client"

import * as React from "react"

import { TicketPunch } from "@/registry/default/ui/ticket-punch"

export const meta = {
  title: "Pool swim pass",
  description: "The ticket punch as a digital ten-swim pass in a public pool's app: each visit punches a hole, the tenth is free.",
}

// The pool and pass are made up.
export default function SwimPass() {
  const [full, setFull] = React.useState(false)

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <p className="text-sm text-muted-foreground">Tidewell Lido · Your passes</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">Ten-swim pass</h1>
      <p className="mt-2 text-muted-foreground">Show this at the desk. We punch one hole per swim, and the tenth swim is on us.</p>
      <TicketPunch
        className="mx-auto mt-8"
        title="Tidewell Lido"
        reward="Your tenth swim is on us."
        slots={10}
        defaultShape="circle"
        color="#0f766e"
        sound={false}
        onComplete={() => setFull(true)}
      />
      <p className="mt-6 text-center text-sm text-muted-foreground">
        {full ? "We've added a new pass to your account." : "Open 7am to 9pm. Lanes are quietest after 7pm."}
      </p>
    </div>
  )
}
