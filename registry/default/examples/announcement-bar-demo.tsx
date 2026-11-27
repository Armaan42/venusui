import { AnnouncementBar } from "@/registry/default/ui/announcement-bar"

const announcements = [
  { id: "shipping", content: "Free delivery on orders over €60", href: "#", linkLabel: "Details" },
  { id: "sale", content: "Winter sale: up to 30% off throws and cushions", href: "#", linkLabel: "Shop the sale" },
  { id: "returns", content: "Changed your mind? Returns are free for 60 days" },
]

export default function AnnouncementBarDemo() {
  return (
    <div className="w-full max-w-3xl overflow-hidden rounded-2xl border">
      <AnnouncementBar announcements={announcements} />
      <div className="flex items-center justify-between border-b px-5 py-4">
        <span className="font-semibold tracking-tight">Hearth &amp; Grain</span>
        <span className="text-sm text-muted-foreground">Basket (0)</span>
      </div>
      <div className="h-40 bg-muted/40" />
    </div>
  )
}
