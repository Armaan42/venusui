import { Theremin } from "@/registry/default/ui/theremin"

export const meta = {
  title: "Music museum interactive",
  description: "The theremin as a hands-on exhibit in a music museum's online gallery of electronic instruments.",
}

// The museum and gallery are made up.
export default function MusicMuseum() {
  return (
    <div className="dark min-h-[34rem] bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <p className="text-sm text-muted-foreground">The Engine Shed · Sound Gallery · Room 2</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">The instrument you never touch</h1>
        <p className="mt-2 text-muted-foreground">
          A theremin is played without contact: one hand sets the pitch, the other the volume. Move your pointer through the field to play it.
          Smooth, singing glides come easily; hitting an exact note is much harder.
        </p>
        <Theremin className="mt-8" />
        <p className="mt-6 text-sm text-muted-foreground">Headphones recommended. The sound starts when you first move in the field.</p>
      </div>
    </div>
  )
}
