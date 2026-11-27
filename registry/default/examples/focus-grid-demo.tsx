import { FocusGrid, FocusGridItem } from "@/registry/default/ui/focus-grid"

// Made-up people.
const people = [
  { name: "Mateo Silva", role: "Creative director", photo: "1507003211169-0a1dd7228f2d" },
  { name: "Hana Sato", role: "Brand strategy", photo: "1573496359142-b8d87734a5a2" },
  { name: "Leo Martins", role: "Product designer", photo: "1506794778202-cad84cf45f1d" },
  { name: "Amara Diallo", role: "Lead developer", photo: "1580489944761-15a19d654956" },
  { name: "Nina Petrova", role: "Growth lead", photo: "1494790108377-be9c29b29330" },
  { name: "Rui Costa", role: "Motion designer", photo: "1500648767791-00dcc994a43e" },
]

export default function FocusGridDemo() {
  return (
    <FocusGrid className="w-full max-w-3xl grid-cols-2 sm:grid-cols-3">
      {people.map((person) => (
        <FocusGridItem key={person.name}>
          <a href="#" className="block rounded-2xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
            <img
              src={`https://images.unsplash.com/photo-${person.photo}?w=480&h=600&fit=crop&crop=faces&auto=format&q=80`}
              alt=""
              className="aspect-[4/5] w-full rounded-2xl object-cover"
            />
            <span className="mt-3 block text-sm font-medium">{person.name}</span>
            <span className="block text-xs text-muted-foreground">{person.role}</span>
          </a>
        </FocusGridItem>
      ))}
    </FocusGrid>
  )
}
