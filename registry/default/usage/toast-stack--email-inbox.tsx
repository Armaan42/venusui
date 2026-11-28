"use client"

import * as React from "react"
import { Archive } from "lucide-react"

import { Toaster, useToast } from "@/registry/default/ui/toast-stack"

export const meta = {
  title: "Email inbox",
  description: "Toasts in an inbox: archiving a message shows an Undo toast, and a failed send shows an error that stays until dismissed.",
}

// The messages and senders are made up.
const start = [
  { id: "1", from: "Hana Sato", subject: "Notes from Tuesday's workshop" },
  { id: "2", from: "Kiln Corner", subject: "Your table for Friday is booked" },
  { id: "3", from: "Leo Martins", subject: "New homepage mock-ups" },
  { id: "4", from: "Tidewell Audio", subject: "Launch day timings" },
]

function Inbox() {
  const { toast } = useToast()
  const [messages, setMessages] = React.useState(start)

  const archive = (message: (typeof start)[number]) => {
    setMessages((all) => all.filter((m) => m.id !== message.id))
    toast({
      title: "Conversation archived",
      description: message.subject,
      action: {
        label: "Undo",
        onClick: () => setMessages((all) => [...all, message].sort((a, b) => a.id.localeCompare(b.id))),
      },
    })
  }

  return (
    <div className="mx-auto min-h-svh max-w-2xl bg-background px-4 py-10 text-foreground">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Inbox</h1>
        <button
          type="button"
          onClick={() =>
            toast({
              title: "Message not sent",
              description: "We couldn't reach the mail server. Your draft is saved.",
              variant: "error",
              duration: 0,
            })
          }
          className="rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground outline-none hover:opacity-90 focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          Send draft
        </button>
      </div>
      <ul className="mt-6 divide-y rounded-xl border">
        {messages.map((message) => (
          <li key={message.id} className="flex items-center gap-3 px-4 py-3">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{message.from}</p>
              <p className="truncate text-sm text-muted-foreground">{message.subject}</p>
            </div>
            <button
              type="button"
              onClick={() => archive(message)}
              aria-label={`Archive “${message.subject}”`}
              className="grid size-9 place-items-center rounded-lg text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <Archive aria-hidden="true" className="size-4" />
            </button>
          </li>
        ))}
        {messages.length === 0 ? <li className="px-4 py-10 text-center text-sm text-muted-foreground">All caught up.</li> : null}
      </ul>
    </div>
  )
}

export default function EmailInbox() {
  return (
    <Toaster>
      <Inbox />
    </Toaster>
  )
}
