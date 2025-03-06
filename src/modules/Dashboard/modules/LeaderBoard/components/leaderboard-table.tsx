import { ArrowUp, Triangle } from "lucide-react";
import styles from "../pages/leaderboard.module.css";
import dpm from "/assets/dpm.webp";
import { BsFillTriangleFill, BsTriangleFill } from "react-icons/bs";
import defaultImage from "../assets/third.webp"


interface TableProps {
  leaderboardData: {
    name: string;
    monthly?: number;
    overall?: number;
    category?: string;
  }[];
  filter: "monthly" | "overall";
}

export function LeaderboardTable({ leaderboardData, filter }: TableProps) {
  const sortedData = [...leaderboardData].sort((a, b) => (b[filter] ?? 0) - (a[filter] ?? 0));

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>{filter === "monthly" ? "Monthly Karma" : "Overall Karma"}</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((entry, index) => (
            <tr key={entry.name}>
              <td>{index + 4}</td>
              <td>
                <div className={styles.nameCell}>
                  <img
                    src={defaultImage}
                    alt=""
                    className={styles.tableAvatar}
                  />
                  <span>{entry.name}</span>
                </div>
              </td>
              {filter === "monthly" ? 
  <td><span className="flex items-center justify-center gap-2">{(entry[filter] ?? 0).toLocaleString()} <BsFillTriangleFill className="text-green-500"/></span></td> 
  : 
  <td>{(entry[filter] ?? 0).toLocaleString()}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}