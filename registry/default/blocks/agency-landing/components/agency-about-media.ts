/**
 * Sample photos for the About page, loaded from a remote image CDN.
 * Replace them with photos of your own studio and team before you launch.
 */
function photo(id: string, width: number, height: number) {
  return `https://images.unsplash.com/photo-${id}?w=${width}&h=${height}&fit=crop&auto=format&q=80`
}

export const photos = {
  team: { src: photo("1522071820081-009f0129c71c", 900, 1100), alt: "Four people working on laptops around a wooden table" },
  studio: { src: photo("1497366754035-f200968a6e72", 1000, 760), alt: "Glass-walled meeting rooms along a polished corridor" },
  lounge: { src: photo("1524758631624-e2822e304c36", 800, 600), alt: "A light lounge with grey armchairs, a sofa and a black floor lamp" },
}
