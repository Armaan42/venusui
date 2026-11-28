import { Combobox, type ComboboxOption } from "@/registry/default/ui/combobox"

export const meta = {
  title: "Invite people to a project",
  description: "Comboboxes in a project-sharing dialog: search teammates by name or email and pick several, then choose their role.",
}

// The people and emails are made up.
const people: ComboboxOption[] = [
  { value: "mateo", label: "Mateo Silva", description: "mateo@arcwell.example", group: "Design" },
  { value: "leo", label: "Leo Martins", description: "leo@arcwell.example", group: "Design" },
  { value: "rui", label: "Rui Costa", description: "rui@arcwell.example", group: "Design" },
  { value: "amara", label: "Amara Diallo", description: "amara@arcwell.example", group: "Engineering" },
  { value: "daniel", label: "Daniel Okoro", description: "daniel@arcwell.example", group: "Engineering" },
  { value: "hana", label: "Hana Sato", description: "hana@arcwell.example", group: "Strategy" },
  { value: "nina", label: "Nina Petrova", description: "nina@arcwell.example", group: "Strategy" },
  { value: "ines", label: "Inês Varga", description: "ines@arcwell.example", group: "Strategy", disabled: true },
]

const roles: ComboboxOption[] = [
  { value: "view", label: "Can view", description: "See the project and comment" },
  { value: "edit", label: "Can edit", description: "Change files and tasks" },
  { value: "admin", label: "Admin", description: "Manage people and billing" },
]

export default function TeamInvite() {
  return (
    <div className="grid min-h-svh place-items-start bg-muted/40 px-4 py-12 text-foreground sm:place-items-center">
      <section aria-labelledby="invite-title" className="w-full max-w-lg rounded-2xl border bg-background p-6 shadow-lg">
        <h1 id="invite-title" className="text-lg font-semibold tracking-tight">
          Share “Autumn campaign”
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">People you invite get an email with a link to the project.</p>
        <div className="mt-6 space-y-5">
          <Combobox
            label="People"
            options={people}
            multiple
            defaultValue={["amara"]}
            placeholder="Name or email…"
            emptyText="Nobody by that name"
          />
          <Combobox label="Role" options={roles} defaultValue="edit" />
        </div>
        <div className="mt-8 flex justify-end gap-2">
          <button
            type="button"
            className="rounded-lg px-4 py-2 text-sm font-medium outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground outline-none hover:opacity-90 focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            Send invites
          </button>
        </div>
      </section>
    </div>
  )
}
