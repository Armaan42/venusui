import { InfiniteGrid, type InfiniteGridItem } from "@/registry/default/ui/infinite-grid"

const photos: [string, string, string][] = [
  ["1464822759023-fed622ff2c3b", "Wide valley", "A mountain valley with snowy peaks and pine forest"],
  ["1470071459604-3b5ec3a7fe05", "Green cliffs", "Green cliffs and mist at sunrise"],
  ["1476610182048-b716b8518aae", "Falls", "A tall waterfall falling from a green cliff"],
  ["1501785888041-af3ef285b470", "Still water", "A rowing boat on a turquoise mountain lake"],
  ["1490806843957-31f4c9a91c65", "Snow cap", "A snow-capped volcano framed by cherry blossom"],
  ["1506905925346-21bda4d32df4", "Above the clouds", "Mountain peaks above a sea of clouds"],
  ["1507525428034-b723cf961d3e", "Low tide", "Waves on a sandy beach at sunset"],
  ["1510798831971-661eb04b3739", "First snow", "A wooden cabin lit up among snowy pines"],
  ["1542718610-a1d656d1884c", "Last light", "A small house at the edge of a forest at sunset"],
  ["1473580044384-7ba9967e16a0", "Dunes", "Rippled sand dunes under a hazy sun"],
  ["1504893524553-b855bce32c67", "Gorge", "A river running through a deep green gorge"],
  ["1531366936337-7c912a4589a7", "Night sky", "Green and violet northern lights over snow"],
]

const items: InfiniteGridItem[] = photos.map(([id, title, alt]) => ({
  id,
  title,
  alt,
  src: `https://images.unsplash.com/photo-${id}?w=440&h=560&fit=crop&auto=format&q=75`,
}))

export default function InfiniteGridDemo() {
  return <InfiniteGrid items={items} label="Landscapes" className="h-[30rem]" />
}
