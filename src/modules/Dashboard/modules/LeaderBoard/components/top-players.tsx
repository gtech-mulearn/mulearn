import styles from "../pages/leaderboard.module.css";
import { cdnUrl } from "@/modules/utils/cdn";

interface TopPlayersProps {
  topPlayers: {
    name: string;
    monthly?: number;
    overall?: number;
    campus?: number;
    zonal?: number;
    category?: string;
  }[];
  activeFilter: "monthly" | "overall" | "campus" | "zonal";
}

export function TopPlayers({ topPlayers, activeFilter }: TopPlayersProps) {
  const category = topPlayers[0]?.category;
  return (
    <div className={styles.topPlayersSection}>
      <div className={styles.topPlayers}>
        {topPlayers.map((player, index) => {
          const order = [1, 0, 2]; // For layout ordering
          const position = index === 0 ? "first" : index === 1 ? "second" : "third";
          const badge = index === 0 ? "Diamond" : index === 1 ? "Gold" : "Silver";

          return (
            <div
              key={player.name}
              className={`${styles.topPlayer} ${styles[position]}`}
              style={{ order: order[index] }}
            >
              <div className={styles.avatarWrapper}>
                {category === "student" && (
                  <img
                    src={cdnUrl("src/modules/Dashboard/modules/LeaderBoard/assets/first.webp")}
                    alt=""
                    className={styles.avatar}
                  />
                )}
                {(category === "campus" || (category === "wadhwani" && activeFilter === "campus")) && (
                  <img
                    src={cdnUrl("src/modules/Dashboard/modules/LeaderBoard/assets/campusFirst.webp")}
                    alt=""
                    className={styles.avatar}
                  />
                )}
                {category === "wadhwani" && activeFilter === "zonal" && (
                  <img
                    src={cdnUrl("src/modules/Dashboard/modules/LeaderBoard/assets/campusFirst.webp")}
                    alt=""
                    className={styles.avatar}
                  />
                )}
                <div className={`${styles.trophy} ${styles[`trophy${position}`]}`}>🏆</div>
              </div>
              <h3 className={styles.playerName}>{player.name}</h3>
              <p className={styles.playerPoints}>
                {(player[activeFilter] ?? 0).toLocaleString()} Karma pts
              </p>
              <span className={`${styles.badge} ${styles[badge.toLowerCase()]}`}>
                {badge}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}