"use client";
import { useState } from "react";
import { TopPlayers } from "./top-players";
import { LeaderboardTable } from "./leaderboard-table";
import { FilterBar } from "./filter-bar";
import styles from "../pages/leaderboard.module.css";
import { FilterBarCategories } from "./filter-categories";


interface LeaderboardEntry {
  name: string;
  avatar: string;
  monthly: number;
  yearly: number;
  overall: number;
  category?: string;
}

interface LeaderboardProps {
  data: LeaderboardEntry[];
  filterOptions?: ("monthly" | "yearly" | "overall")[];
  leaderBoardOptions?: { label: string; value: string }[];
  categoryOptions?: { label: string; value: string }[];
  defaultFilter?: "monthly" | "yearly" | "overall";
  defaultCategory?: string;
  topPlayerCount?: number;
}

export default function Leaderboard({
  data = [], 
  filterOptions = ["monthly", "yearly", "overall"],
  leaderBoardOptions = [
    { label: "Main", value: "all" },
    { label: "Launchpad", value: "student" },
    { label: "YIP", value: "mentor" },
    { label: "Talent Accelerator", value: "campus" },
  ],
  categoryOptions = [
    { label: "All Categories", value: "all" },
    { label: "Student", value: "student" },
    { label: "Mentor", value: "mentor" },
    { label: "Campus", value: "campus" },
  ],
  defaultFilter = "monthly",
  defaultCategory = "all",
  topPlayerCount = 3,
}: LeaderboardProps) {
  const [activeFilter, setActiveFilter] = useState<"monthly" | "yearly" | "overall">(defaultFilter);
  const [activeCategory, setActiveCategory] = useState<string>(defaultCategory);


  const filteredByCategory = Array.isArray(data)
    ? activeCategory === "all"
      ? data
      : data.filter((entry) => entry.category === activeCategory)
    : [];


  const sortedData = [...filteredByCategory].sort((a, b) => b[activeFilter] - a[activeFilter]);
  const topPlayers = sortedData.slice(0, topPlayerCount);
  const remainingPlayers = sortedData.slice(topPlayerCount);

  return (
    <div className={styles.container}>
      <div className={styles.leaderboard}>
        <FilterBar
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          filterOptions={filterOptions}
          programOptions={leaderBoardOptions}
          categoryOptions={categoryOptions}
        />
        <TopPlayers topPlayers={topPlayers} activeFilter={activeFilter} />
        <LeaderboardTable leaderboardData={remainingPlayers} filter={activeFilter} />
      </div>
    </div>
  );
}