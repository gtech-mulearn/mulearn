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
  campus?: number;
  zonal?: number;
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
    wadhwani: {
      campus: LeaderboardEntry[];
      zonal: LeaderboardEntry[];
    };
  };
  filterOptions: ("monthly" | "overall" | "campus" | "zonal")[];
  categoryOptions: { label: string; value: string }[];
  defaultFilter: "monthly" | "overall" | "campus" | "zonal";
  defaultCategory: string;
  topPlayerCount?: number;
  activeFilter: "monthly" | "overall" | "campus" | "zonal";
  setActiveFilter: (filter: "monthly" | "overall" | "campus" | "zonal") => void;
  activeCategory: "student" | "campus" | "wadhwani";
  setActiveCategory: (category: "student" | "campus" | "wadhwani") => void;
}

export default function Leaderboard({
  leaderboards,
  filterOptions,
  categoryOptions,
  defaultFilter = "monthly",
  defaultCategory = "student",
  topPlayerCount = 3,
  activeFilter,
  setActiveFilter,
  activeCategory,
  setActiveCategory,
}: LeaderboardProps) {
  let currentLeaderboard: LeaderboardEntry[] = [];

  if (activeCategory === "student") {
    currentLeaderboard = leaderboards.student[activeFilter as "monthly" | "overall"] || [];
  } else if (activeCategory === "campus") {
    currentLeaderboard = leaderboards.campus[activeFilter as "monthly" | "overall"] || [];
  } else if (activeCategory === "wadhwani") {
    if (activeFilter === "campus" || activeFilter === "zonal") {
      currentLeaderboard = leaderboards.wadhwani[activeFilter];
    }
  }

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
        {activeFilter !== "zonal" &&
          <LeaderboardTable leaderboardData={remainingPlayers} filter={activeFilter} />
        }
      </div>
    </div>
  );
}