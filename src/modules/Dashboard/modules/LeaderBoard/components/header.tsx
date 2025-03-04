import { BookmarkIcon, Clock } from "lucide-react"
import styles from "../pages/leaderboard.module.css"

export function Header() {
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.timer}>
        <Clock className={styles.clockIcon} />
        Leaderboard resets in: <span>2</span>:<span>1</span>:<span>5</span>:<span>2</span>
      </div>

      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.logoWrapper}>
            <img src="/placeholder.svg?height=80&width=80" alt="mulearn logo" className={styles.logo} />
          </div>
          <div className={styles.headerInfo}>
            <div className={styles.titleWrapper}>
              <h1 className={styles.title}>muLearn Community</h1>
              <button type="button" className={styles.bookmarkButton}>
                <BookmarkIcon size={20} />
              </button>
            </div>
            <p className={styles.subtitle}>Track learning progress and achievements across our community</p>
          </div>
        </div>
        <div className={styles.headerActions}>
          <button type="button" className={styles.buttonIcon}>
            <Clock size={16} />
            Upgrade my data
          </button>
          <button type="button" className={styles.buttonOutline}>Edit Profile</button>
          <button type="button" className={styles.buttonPrimary}>Invite Friends</button>
        </div>
      </header>
    </div>
  )
}

