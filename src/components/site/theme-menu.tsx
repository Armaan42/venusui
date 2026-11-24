"use client"

import Link from "next/link"
import { Palette } from "lucide-react"

import { ThemePanel } from "@/components/site/theme-customizer"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

/** The header's theme button: opens the theme customizer in a popover. */
export function ThemeMenu({ className }: { className?: string }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button type="button" variant="ghost" size="icon" aria-label="Customize theme" className={className}>
          <Palette aria-hidden="true" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="flex max-h-[min(80vh,44rem)] w-80 flex-col overflow-hidden p-0">
        <ThemePanel
          title="Theme"
          className="rounded-none border-0"
          aside={
            <Link href="/themes" className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
              All themes
            </Link>
          }
        />
      </PopoverContent>
    </Popover>
  )
}
