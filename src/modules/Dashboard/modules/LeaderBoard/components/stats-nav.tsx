import { ChevronDown } from "lucide-react"
import styles from "../pages/leaderboard.module.css"

interface StatsNavProps {
  activeFilter: string
  setActiveFilter: (filter: string) => void
  activeQueue: string
  setActiveQueue: (queue: string) => void
}

export function StatsNav({ activeFilter, setActiveFilter, activeQueue, setActiveQueue }: StatsNavProps) {
  const filters = [
    { id: "24h", label: "24h" },
    { id: "7d", label: "7D" },
    { id: "30d", label: "30D" },
    { id: "seasonal", label: "Seasonal" },
  ]

  return (
    <nav className={styles.statsNav}>
      <div className={styles.filters}>
        {filters.map((filter) => (
          <button type="button"
            key={filter.id}
            className={`${styles.filterButton} ${activeFilter === filter.id ? styles.active : ""}`}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
        <button type="button" className={styles.queueButton}>
          Queue <ChevronDown size={16} />
        </button>
      </div>
      <button type="button" className={styles.showPlaceButton}>Show my place</button>
    </nav>
  )
}

