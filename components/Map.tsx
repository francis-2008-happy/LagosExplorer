"use client";

// Leaflet ships its own stylesheet. Without it, the tile images are
// positioned wrongly and the map looks like scattered broken squares.
import "leaflet/dist/leaflet.css";

import { useMemo, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import CategoryFilter from "@/components/CategoryFilter";
import LocationPopup from "@/components/LocationPopup";
import { CATEGORIES, locations, type Category } from "@/data/locations";
import { CATEGORY_ICONS } from "@/lib/markerIcons";

/** The geographic centre of Lagos, Nigeria, as [latitude, longitude]. */
const LAGOS_CENTER: [number, number] = [6.5244, 3.3792];

/**
 * The starting zoom level. Roughly: 0 shows the whole planet, 19 shows
 * individual buildings. 11 is wide enough to fit LASU in Ojo (far west) and
 * the Lekki Conservation Centre (far east) on screen at the same time.
 */
const INITIAL_ZOOM = 11;

/** Where the free OpenStreetMap tile images are fetched from. */
const TILE_URL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";

/** OpenStreetMap's licence requires crediting contributors on the map. */
const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

/**
 * countLocationsByCategory
 * Counts how many places belong to each category, so the filter panel can
 * show a tally beside every row. Runs once over the list and returns an
 * object like { Landmark: 4, Market: 4, ... }.
 */
function countLocationsByCategory(): Record<Category, number> {
  // Start every category at zero, so a category with no places still shows
  // "0" rather than "undefined".
  const counts = Object.fromEntries(
    CATEGORIES.map((category) => [category, 0]),
  ) as Record<Category, number>;

  for (const place of locations) {
    counts[place.category] += 1;
  }
  return counts;
}

/**
 * Map
 * Renders the Leaflet map plus the category filter panel, and owns the
 * state that connects them: which categories are currently visible.
 * This component must NEVER run on the server, because Leaflet reaches for
 * the browser's `window` object as soon as it loads.
 */
export default function Map() {
  /**
   * The set of categories currently ticked. A Set is used rather than an
   * array because the only question we ever ask is "is this category in
   * here?", which `Set.has()` answers directly. It starts as a copy of
   * CATEGORIES, so every category is visible on first load.
   */
  const [visibleCategories, setVisibleCategories] = useState<Set<Category>>(
    () => new Set(CATEGORIES),
  );

  /**
   * toggleCategory
   * Adds a category to the visible set if it is missing, removes it if it
   * is present.
   *
   * Note that we build a BRAND NEW Set rather than editing the existing
   * one. React decides whether to re-render by checking whether the state
   * value is a different object than before. Calling .delete() on the old
   * Set would change its contents but leave it the same object, so React
   * would see "no change" and the map would not update.
   */
  function toggleCategory(category: Category) {
    setVisibleCategories((previous) => {
      const next = new Set(previous);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  }

  /** Ticks every category, putting all markers back on the map. */
  function showAllCategories() {
    setVisibleCategories(new Set(CATEGORIES));
  }

  /** Unticks every category, clearing the map of markers. */
  function hideAllCategories() {
    setVisibleCategories(new Set());
  }

  /**
   * The places actually drawn right now: the full list narrowed to those
   * whose category is currently ticked. useMemo caches the result and only
   * recalculates when the visible set changes, so unrelated re-renders do
   * not filter all 26 places again.
   */
  const visibleLocations = useMemo(
    () => locations.filter((place) => visibleCategories.has(place.category)),
    [visibleCategories],
  );

  /** The per-category tallies never change, so calculate them only once. */
  const countsByCategory = useMemo(() => countLocationsByCategory(), []);

  return (
    // position: relative makes this box the reference point that the
    // absolutely-positioned filter panel sits inside.
    <div style={{ position: "relative", height: "100dvh", width: "100%" }}>
      <MapContainer
        center={LAGOS_CENTER}
        zoom={INITIAL_ZOOM}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer attribution={TILE_ATTRIBUTION} url={TILE_URL} />

        {/*
          Turn the filtered data into markers. One object in, one <Marker>
          out. `key` gives React a stable identity for each marker so it can
          update the list efficiently -- we use the location's id, never the
          array index, because indexes shift as the list is filtered.
        */}
        {visibleLocations.map((place) => (
          <Marker
            key={place.id}
            position={[place.lat, place.lng]}
            icon={CATEGORY_ICONS[place.category]}
          >
            <Popup>
              <LocationPopup place={place} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/*
        The filter panel is a sibling of the map, not a child, so Leaflet
        never treats clicks on it as clicks on the map.
      */}
      <CategoryFilter
        visibleCategories={visibleCategories}
        onToggleCategory={toggleCategory}
        onShowAll={showAllCategories}
        onHideAll={hideAllCategories}
        visibleCount={visibleLocations.length}
        totalCount={locations.length}
        countsByCategory={countsByCategory}
      />
    </div>
  );
}
