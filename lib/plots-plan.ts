// Faberland plot plan — schematic reconstruction of the Unreal top-down layout.
// Three sections across one district band, a plaza between facing rows,
// the entrance portal south of the band on the central road.
// Coordinates are map units (1000 x 1000 world, island centred at 500,500).

export const ISLAND = { cx: 500, cy: 500, r: 430 };
export const DISTRICT_BOX = { x: 196, y: 336, w: 740, h: 246 };
export const ROAD = { x: 486, y: 60, w: 28, h: 880 };
export const ENTRANCE = { x: 452, y: 592, w: 96, h: 74 };
export const OUR_STORE = 21;

export type PlotSize = 'Small' | 'Medium' | 'Large';

export const PRICES: Record<number, number> = {
  1:65,2:58,3:72,4:55,5:68,6:62,7:59,8:75,9:53,10:70,11:64,12:57,
  13:73,14:56,15:69,16:78,17:71,18:80,19:67,20:76,21:74,22:79,23:81,24:66,
  25:77,26:72,27:75,28:82,29:65,30:78,31:85,32:88,33:90,34:83,35:87,36:84,
  37:89,38:92,39:82,40:86,41:85,42:88,43:91,44:84,45:87,46:83,47:89,48:95
};

export const LEASED = [4, 7, 23, 30, 41];

// row: 'n' = north rank (facing the plaza from above), 's' = south rank
function block(ids: number[], x0: number, y0: number, w: number, h: number, gap: number) {
  return ids.map((id, i) => ({ id, x: x0 + i * (w + gap), y: y0, w, h }));
}

const NORTH_Y = 344, SOUTH_Y = 468, UNIT_H = 74;

export const PLOTS = [
  // Section C — west, plots 29-48
  ...block([37, 35, 33, 31], 200, NORTH_Y, 44, UNIT_H, 3),
  ...block([36, 34, 32, 30, 29], 200, NORTH_Y + 78, 36, 40, 3),
  ...block([48, 47, 45], 200, SOUTH_Y, 42, 50, 3),
  ...block([46, 44], 200, SOUTH_Y + 54, 66, 52, 3),
  ...block([43, 41, 39], 340, SOUTH_Y, 40, 50, 3),
  ...block([42, 40, 38], 340, SOUTH_Y + 54, 40, 52, 3),

  // Section B — middle, plots 13-28
  ...block([28, 27, 26, 25, 24, 23], 484, NORTH_Y, 42, UNIT_H + 44, 3),
  ...block([22, 21, 19, 17, 13], 484, SOUTH_Y, 44, 50, 3),
  ...block([20, 18, 16, 14, 15], 484, SOUTH_Y + 54, 44, 52, 3),

  // Section A — east, plots 1-12
  ...block([12, 10, 8, 6, 4, 2], 726, NORTH_Y, 30, UNIT_H + 44, 3),
  ...block([11, 9, 7, 5, 3, 1], 726, SOUTH_Y, 30, 106, 3)
].map(p => {
  const size: PlotSize = p.w * p.h > 4200 ? 'Large' : p.w * p.h > 2600 ? 'Medium' : 'Small';
  return {
    ...p,
    price: PRICES[p.id],
    leased: LEASED.includes(p.id),
    ours: p.id === OUR_STORE,
    size,
  };
});

export type Plot = (typeof PLOTS)[number];

// Only "Small = 2,500 sq ft" is documented in the brief. Medium and Large
// are left null rather than invented — the room HUD hides what it cannot cite.
export const SQFT: Record<PlotSize, number | null> = { Small: 2500, Medium: null, Large: null };

export const DISTRICT_OF = (id: number) =>
  id <= 12 ? 'Market' : id <= 28 ? 'Central' : 'Arts';
