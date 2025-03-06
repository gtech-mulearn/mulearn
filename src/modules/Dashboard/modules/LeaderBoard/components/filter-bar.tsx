import styles from "../pages/leaderboard.module.css";

interface FilterBarProps {
  activeFilter: "monthly" | "overall";
  setActiveFilter: (filter: "monthly" | "overall") => void;
  activeCategory: "student" | "campus";
  setActiveCategory: (category: "student" | "campus") => void;
  filterOptions: ("monthly" | "overall")[];
  categoryOptions: { label: string; value: string }[];
}

export function FilterBar({
  activeFilter,
  setActiveFilter,
  activeCategory,
  setActiveCategory,
  filterOptions,
  categoryOptions,
}: FilterBarProps) {
  return (
    <div className={styles.filterBar}>
      <div className={styles.filterTabs}>
        {filterOptions.map((filter) => (
          <button
            key={filter}
            type="button"
            className={`${styles.filterTab} ${activeFilter === filter ? styles.active : ""}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      <div className={styles.filterActions}>
        <select
          className={styles.select}
          value={activeCategory}
          onChange={(e) => setActiveCategory(e.target.value as "student" | "campus")}
        >
          {categoryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}