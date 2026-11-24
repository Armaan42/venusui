/**
 * Sample photos, loaded from a remote image CDN. Each one is requested at a
 * single size wherever it appears, so the wall's repeats come from the cache.
 * Swap in your own work.
 */
export const photos = {
  dunes: "1473580044384-7ba9967e16a0",
  road: "1500530855697-b586d89ba3ee",
  sofa: "1578500494198-246f612d3b3d",
  chair: "1586023492125-27b2c045efd7",
  clay: "1610701596007-11502861dcfa",
  vases: "1565193566173-7a0ee3dbe261",
  leaf: "1504198266287-1659872e6590",
  lounge: "1618221195710-dd6b41faaea6",
  living: "1556228453-efd6c1ff04f6",
  house: "1600585154340-be6161a56a0c",
  coffee: "1495474472287-4d71bcdd2085",
  beans: "1447933601403-0c6688de566e",
  hangers: "1523381210434-271e8be1f52b",
  cabin: "1542718610-a1d656d1884c",
  resort: "1566073771259-6a8506099945",
  dining: "1517248135467-4c7edcad34c4",
  headphones: "1505740420928-5e560c06d30e",
  waves: "1558591710-4b4a1ae0f04d",
} as const

export type PhotoName = keyof typeof photos

/** One photo at a set size. The default 480 × 320 is shared by the wall, the trail and the carousel. */
export function photo(name: PhotoName, width = 480, height = 320) {
  return `https://images.unsplash.com/photo-${photos[name]}?w=${width}&h=${height}&fit=crop&auto=format&q=75`
}
