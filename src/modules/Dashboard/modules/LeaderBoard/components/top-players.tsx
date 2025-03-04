import styles from "../pages/leaderboard.module.css";

interface TopPlayersProps {
  topPlayers: {
    name: string;
    avatar: string;
    monthly: number;
    yearly: number;
    overall: number;
  }[];
  activeFilter: "monthly" | "yearly" | "overall";
}

export function TopPlayers({ topPlayers, activeFilter }: TopPlayersProps) {
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
                <img
                  src={player.avatar || "/placeholder.svg"}
                  alt={player.name}
                  className={styles.avatar}
                />
                <div className={`${styles.trophy} ${styles[`trophy${position}`]}`}>🏆</div>
              </div>
              <h3 className={styles.playerName}>{player.name}</h3>
              <p className={styles.playerPoints}>
                {player[activeFilter].toLocaleString()} Karma pts
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