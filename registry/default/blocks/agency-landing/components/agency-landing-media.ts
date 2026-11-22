/**
 * Sample photos used by the template, loaded from a remote image CDN.
 * Replace them with photos of your own team and studio before you launch.
 */
function photo(id: string, width: number, height: number, faces = false) {
  const crop = faces ? "&crop=faces" : ""
  return `https://images.unsplash.com/photo-${id}?w=${width}&h=${height}&fit=crop${crop}&auto=format&q=80`
}

export function portrait(id: string, size = 160) {
  return photo(id, size, size, true)
}

export const photos = {
  meeting: {
    src: photo("1552664730-d307ca884978", 900, 1000),
    alt: "A team meeting in a bright office, with sticky notes on the wall",
  },
}

/** Faces next to the hero's "teams" line. */
export const heroAvatars = ["1531123897727-8f129e1688ce", "1500648767791-00dcc994a43e", "1544005313-94ddf0286df2"]
