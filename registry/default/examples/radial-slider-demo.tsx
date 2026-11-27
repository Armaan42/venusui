import { RadialSlider } from "@/registry/default/ui/radial-slider"

export default function RadialSliderDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-12">
      <RadialSlider label="Focus" defaultValue={25} min={5} max={60} step={5} marks={[5, 15, 30, 45, 60]} format={(v) => `${v} min`} />
      <RadialSlider label="Brightness" defaultValue={70} sweep={300} format={(v) => `${v}%`} />
    </div>
  )
}
