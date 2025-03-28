"use client";
import { useState } from "react";
import { TopPlayers } from "./top-players";
import { LeaderboardTable } from "./leaderboard-table";
import { FilterBar } from "./filter-bar";
import styles from "../pages/leaderboard.module.css";

interface LeaderboardEntry {
  name: string;
  monthly?: number;
  overall?: number;
  category?: string;
}

interface LeaderboardProps {
  leaderboards: {
    student: {
      overall: LeaderboardEntry[];
      monthly: LeaderboardEntry[];
    };
    campus: {
      overall: LeaderboardEntry[];
      monthly: LeaderboardEntry[];
    };
  };
  filterOptions?: ("monthly" | "overall")[];
  categoryOptions?: { label: string; value: string }[];
  defaultFilter?: "monthly" | "overall";
  defaultCategory?: string;
  topPlayerCount?: number;
  activeFilter: "monthly" | "overall";
  setActiveFilter: (filter: "monthly" | "overall") => void;
  activeCategory: "student" | "campus";
  setActiveCategory: (category: "student" | "campus") => void;
}

export default function Leaderboard({
  leaderboards,
  filterOptions = ["monthly", "overall"],
  categoryOptions = [
    { label: "Student", value: "student" },
    { label: "Campus", value: "campus" },
  ],
  defaultFilter = "monthly",
  defaultCategory = "student",
  topPlayerCount = 3,
  activeFilter,
  setActiveFilter,
  activeCategory,
  setActiveCategory,
}: LeaderboardProps) {
  // Select the current leaderboard based on active category and filter
  const currentLeaderboard = leaderboards[activeCategory]?.[activeFilter] || [];

  const topPlayers = currentLeaderboard.slice(0, topPlayerCount);
  const remainingPlayers = currentLeaderboard.slice(topPlayerCount);

  return (
    <div className={styles.container}>
      <div className={styles.leaderboard}>
        <FilterBar
          activeFilter={activeFilter || defaultFilter}
          setActiveFilter={setActiveFilter}
          activeCategory={activeCategory || defaultCategory}
          setActiveCategory={setActiveCategory}
          filterOptions={filterOptions}
          categoryOptions={categoryOptions}
        />
        <TopPlayers topPlayers={topPlayers} activeFilter={activeFilter} />
        <LeaderboardTable leaderboardData={remainingPlayers} filter={activeFilter} />
      </div>
    </div>
  );
}