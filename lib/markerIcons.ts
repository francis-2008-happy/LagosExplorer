/**
 * lib/markerIcons.ts
 * Builds one coloured map pin per category.
 *
 * IMPORTANT: this file imports Leaflet, which needs the browser's `window`
 * object. It must therefore only ever be imported by a component that is
 * itself loaded with `ssr: false` (our Map.tsx). Importing it from a Server
 * Component would bring back the "window is not defined" crash.
 */

import L from "leaflet";

import { CATEGORIES, type Category } from "@/data/locations";
import { CATEGORY_COLORS } from "@/lib/categoryColors";

/**
 * buildPinSvg
 * Returns the SVG source for a teardrop map pin filled with the given
 * colour. Drawing the pin ourselves means no image files to download and
 * no external service to depend on -- the colour is just a string we drop
 * into the `fill` attribute.
 */
function buildPinSvg(color: string): string {
  return `
    <svg width="28" height="40" viewBox="0 0 28 40" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14 1C7.4 1 2 6.4 2 13c0 8.9 12 26 12 26s12-17.1 12-26c0-6.6-5.4-12-12-12z"
        fill="${color}" stroke="#ffffff" stroke-width="2"
      />
      <circle cx="14" cy="13" r="4.5" fill="#ffffff" />
    </svg>
  `;
}

/**
 * createCategoryIcon
 * Wraps the SVG above in a Leaflet "divIcon" -- a marker made of real HTML
 * rather than a downloaded image file, so we can style it freely.
 */
function createCategoryIcon(color: string): L.DivIcon {
  return L.divIcon({
    html: buildPinSvg(color),
    // Leaflet's built-in "leaflet-div-icon" class draws a white box with a
    // border around the marker. Passing an empty className removes it so
    // only our pin shows.
    className: "",
    iconSize: [28, 40],
    // The pin's point is at the bottom-centre of the 28x40 box, so anchor
    // there: that exact pixel sits on the location's coordinates.
    iconAnchor: [14, 40],
    // Open popups just above the pin's tip rather than on top of it.
    popupAnchor: [0, -38],
  });
}

/**
 * CATEGORY_ICONS
 * A ready-made icon for every category, built once when this module first
 * loads rather than on every render. Twenty-six markers therefore share
 * seven icon objects instead of creating twenty-six.
 */
export const CATEGORY_ICONS: Record<Category, L.DivIcon> = CATEGORIES.reduce(
  (icons, category) => {
    icons[category] = createCategoryIcon(CATEGORY_COLORS[category]);
    return icons;
  },
  {} as Record<Category, L.DivIcon>,
);
