import { Combobox, type ComboboxOption } from "@/registry/default/ui/combobox"

const cities: ComboboxOption[] = [
  { value: "lisbon", label: "Lisbon", description: "Portugal", group: "Europe" },
  { value: "porto", label: "Porto", description: "Portugal", group: "Europe" },
  { value: "malmo", label: "Malmö", description: "Sweden", group: "Europe" },
  { value: "zurich", label: "Zürich", description: "Switzerland", group: "Europe" },
  { value: "kyoto", label: "Kyoto", description: "Japan", group: "Asia" },
  { value: "seoul", label: "Seoul", description: "South Korea", group: "Asia" },
  { value: "montreal", label: "Montréal", description: "Canada", group: "Americas" },
  { value: "bogota", label: "Bogotá", description: "Colombia", group: "Americas" },
]

const skills: ComboboxOption[] = ["Design", "Illustration", "Motion", "Front-end", "Research", "Writing", "Photography"].map((s) => ({
  value: s.toLowerCase(),
  label: s,
}))

export default function ComboboxDemo() {
  return (
    <div className="grid w-full max-w-2xl gap-6 sm:grid-cols-2">
      <Combobox label="City" options={cities} placeholder="Search cities…" defaultValue="lisbon" />
      <Combobox label="Skills" options={skills} multiple defaultValue={["design", "motion"]} placeholder="Add skills…" />
    </div>
  )
}
