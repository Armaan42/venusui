import { ShowreelPlayer } from "@/registry/default/ui/showreel-player"

const chapters = [
  { start: 0, title: "Studio site" },
  { start: 4.5, title: "Product launch" },
  { start: 9, title: "3D library" },
  { start: 13.5, title: "Motion wall" },
  { start: 18, title: "About page" },
]

export default function ShowreelPlayerDemo() {
  return (
    <ShowreelPlayer
      src="/media/venusui-showreel.webm"
      poster="/media/venusui-showreel-poster.jpg"
      title="Showreel 2026"
      description="Five sites, twenty-three seconds"
      chapters={chapters}
      className="max-w-3xl"
    />
  )
}
