"use client";

import { CATEGORIES, type Category } from "@/data/locations";
import { CATEGORY_COLORS } from "@/lib/categoryColors";

import styles from "./CategoryFilter.module.css";

/**
 * CategoryFilterProps
 * The data and callbacks this panel needs from its parent.
 *
 * Note that the panel owns no state of its own. It is given the current
 * selection and told which functions to call -- the parent (Map.tsx) decides
 * what actually happens. This is the "controlled component" pattern, and it
 * matters here because the map and the panel must always agree on which
 * categories are showing. One owner of the truth, no chance of drift.
 */
interface CategoryFilterProps {
  /** The categories currently ticked, and therefore drawn on the map. */
  visibleCategories: Set<Category>;
  /** Called with a category when the user ticks or unticks its checkbox. */
  onToggleCategory: (category: Category) => void;
  /** Called when the user presses "Show all". */
  onShowAll: () => void;
  /** Called when the user presses "Hide all". */
  onHideAll: () => void;
  /** How many places are currently on the map. */
  visibleCount: number;
  /** How many places exist in total. */
  totalCount: number;
  /** How many places belong to each category, used for the per-row tally. */
  countsByCategory: Record<Category, number>;
}

/**
 * CategoryFilter
 * The control panel that floats over the map. It lists every category with
 * a coloured dot matching that category's pin, so it works as a legend and
 * a filter at the same time. Ticking a box shows that category's markers;
 * unticking hides them.
 */
export default function CategoryFilter({
  visibleCategories,
  onToggleCategory,
  onShowAll,
  onHideAll,
  visibleCount,
  totalCount,
  countsByCategory,
}: CategoryFilterProps) {
  return (
    <div className={styles.panel}>
      <h2 className={styles.heading}>Lagos Explorer</h2>
      <p className={styles.count}>
        Showing {visibleCount} of {totalCount} places
      </p>

      <div className={styles.list}>
        {/*
          One row per category. Wrapping everything in a <label> means
          clicking the text or the colour dot toggles the checkbox too,
          not just the small box itself.
        */}
        {CATEGORIES.map((category) => (
          <label key={category} className={styles.row}>
            <input
              type="checkbox"
              className={styles.checkbox}
              // `checked` is driven entirely by the parent's state, which is
              // what makes this a controlled component.
              checked={visibleCategories.has(category)}
              onChange={() => onToggleCategory(category)}
            />
            {/*
              The colour dot. Its colour comes from the same CATEGORY_COLORS
              object that colours the map pins, so the legend can never
              disagree with the map.
            */}
            <span
              className={styles.swatch}
              style={{ backgroundColor: CATEGORY_COLORS[category] }}
            />
            <span className={styles.label}>{category}</span>
            <span className={styles.tally}>{countsByCategory[category]}</span>
          </label>
        ))}
      </div>

      <div className={styles.buttons}>
        <button type="button" className={styles.button} onClick={onShowAll}>
          Show all
        </button>
        <button type="button" className={styles.button} onClick={onHideAll}>
          Hide all
        </button>
      </div>
    </div>
  );
}
