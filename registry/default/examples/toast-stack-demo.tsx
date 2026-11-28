"use client"

import { Toaster, useToast } from "@/registry/default/ui/toast-stack"

function Buttons() {
  const { toast } = useToast()
  const button =
    "rounded-lg border bg-background px-3.5 py-2 text-sm font-medium shadow-xs outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <button
        type="button"
        className={button}
        onClick={() => toast({ title: "Changes saved", description: "Your profile is up to date.", variant: "success" })}
      >
        Save profile
      </button>
      <button
        type="button"
        className={button}
        onClick={() =>
          toast({
            title: "Moved to Archive",
            description: "“Quarterly review.pdf”",
            action: { label: "Undo", onClick: () => toast({ title: "Moved back to Inbox" }) },
          })
        }
      >
        Archive file
      </button>
      <button
        type="button"
        className={button}
        onClick={() => toast({ title: "Couldn't send invite", description: "Check your connection and try again.", variant: "error" })}
      >
        Send invite
      </button>
    </div>
  )
}

export default function ToastStackDemo() {
  return (
    <Toaster>
      <Buttons />
    </Toaster>
  )
}
