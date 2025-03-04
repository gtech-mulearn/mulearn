import styles from "../pages/leaderboard.module.css";

interface TableProps {
  leaderboardData: {
    name: string;
    avatar: string;
    monthly: number;
    yearly: number;
    overall: number;
  }[];
  filter: "monthly" | "yearly" | "overall";
}

export function LeaderboardTable({ leaderboardData, filter }: TableProps) {
  const sortedData = [...leaderboardData].sort((a, b) => b[filter] - a[filter]);

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Monthly Points</th>
            <th>Yearly Points</th>
            <th>Overall Points</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((entry, index) => (
            <tr key={entry.name}>
              <td>{index + 4}</td> {/* Starts at 4 since top 3 are in TopPlayers */}
              <td>
                <div className={styles.nameCell}>
                  <img
                    src={entry.avatar || "/placeholder.svg"}
                    alt=""
                    className={styles.tableAvatar}
                  />
                  <span>{entry.name}</span>
                </div>
              </td>
              <td>{entry.monthly.toLocaleString()}</td>
              <td>{entry.yearly.toLocaleString()}</td>
              <td>{entry.overall.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}