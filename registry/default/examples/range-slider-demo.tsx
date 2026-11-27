import { RangeSlider } from "@/registry/default/ui/range-slider"

const counts = [2, 5, 9, 14, 22, 31, 38, 41, 36, 30, 26, 21, 17, 13, 10, 8, 6, 4, 3, 2]

export default function RangeSliderDemo() {
  return (
    <div className="w-full max-w-md">
      <p className="mb-2 text-sm font-medium">Price per night</p>
      <RangeSlider
        label="Price per night"
        min={0}
        max={2000}
        step={10}
        minGap={50}
        defaultValue={[400, 1100]}
        histogram={counts}
        format={(v) => `€${v.toLocaleString("en-GB")}`}
      />
    </div>
  )
}
