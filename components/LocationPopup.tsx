"use client";

import type { LagosLocation } from "@/data/locations";
import { CATEGORY_COLORS } from "@/lib/categoryColors";

import styles from "./LocationPopup.module.css";

/**
 * LocationPopupProps
 * The single place whose details this popup should display.
 */
interface LocationPopupProps {
  place: LagosLocation;
}

/**
 * LocationPopup
 * The contents of the bubble that opens when a marker is clicked: the
 * place's name, a coloured category badge, a short description and its
 * address.
 *
 * This lives in its own component rather than inline inside Map.tsx for two
 * reasons: it keeps the marker loop short enough to read at a glance, and
 * it means the popup's appearance can be changed without touching any
 * mapping code.
 */
export default function LocationPopup({ place }: LocationPopupProps) {
  return (
    <article className={styles.popup}>
      <h3 className={styles.name}>{place.name}</h3>

      {/* The badge colour is looked up from the same object that colours the
          map pins, so the badge always matches the pin you just clicked. */}
      <span
        className={styles.badge}
        style={{ backgroundColor: CATEGORY_COLORS[place.category] }}
      >
        {place.category}
      </span>

      <p className={styles.description}>{place.description}</p>

      <p className={styles.address}>
        {/* aria-hidden hides the decorative pin emoji from screen readers,
            which would otherwise announce it as "round pushpin". */}
        <span aria-hidden="true">📍</span>
        <span>{place.address}</span>
      </p>
    </article>
  );
}
