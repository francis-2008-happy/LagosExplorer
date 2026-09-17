/**
 * lib/categoryColors.ts
 * The colour assigned to each category, kept in its own file containing
 * nothing but plain data.
 *
 * Why separate from markerIcons.ts? Because markerIcons.ts imports Leaflet,
 * and Leaflet needs the browser. Two different things need these colours:
 * the map pins (browser-only) and the filter panel (ordinary HTML). Putting
 * the colours here means the filter panel can use them without importing
 * Leaflet at all.
 */

import type { Category } from "@/data/locations";

/**
 * CATEGORY_COLORS
 * One distinct colour per category. `Record<Category, string>` means
 * TypeScript forces this object to contain every category exactly once --
 * add an eighth category to the Category type and this file stops
 * compiling until a colour is chosen for it.
 */
export const CATEGORY_COLORS: Record<Category, string> = {
  Landmark: "#7c3aed", // violet
  Market: "#ea8c00", // orange
  Hospital: "#dc2626", // red
  Transit: "#2563eb", // blue
  "Tech Hub": "#0d9488", // teal
  Education: "#c2185b", // magenta
  Recreation: "#16a34a", // green
};
