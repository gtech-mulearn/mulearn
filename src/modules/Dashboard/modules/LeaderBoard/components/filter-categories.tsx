import styles from "../pages/leaderboard.module.css";

interface FilterBarProps {
  activeFilter: "monthly" | "yearly" | "overall";
  setActiveFilter: (filter: "monthly" | "yearly" | "overall") => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  filterOptions: ("monthly" | "yearly" | "overall")[];
  categoryOptions: { label: string; value: string }[];
}

export function FilterBarCategories({
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
          onChange={(e) => setActiveCategory(e.target.value)}
        >
          {categoryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button type="button" className={styles.buttonSecondary}>
          Show My Place
        </button>
      </div>
    </div>
  );
}