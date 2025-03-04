"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Flame, Star, Zap } from "lucide-react";
import style from "./GameProgressBar.module.css";
import karmaIcon from "../assets/karma-icon.png"
import { Img } from "@chakra-ui/react";

interface Level {
  tasks?: { completed: boolean; karma?: number }[];
  karma?: number;
}

export default function GameProgressBar({ levelData = [] }: { levelData: Level[] }) {
  // if (!levelData || levelData.length === 0) {
  //   return (
  //     <div className="flex flex-col items-center justify-center p-4">
  //       <p className="text-gray-500"></p>
  //     </div>
  //   );
  // }

  const totalKarmaEarned = useMemo(() => {
    return levelData.reduce((acc, level) => {
      const levelKarma = level.tasks?.reduce((taskAcc, task) => {
        return task.completed ? taskAcc + (task.karma || 0) : taskAcc;
      }, 0) || 0;
      return acc + levelKarma;
    }, 0);
  }, [levelData]);

  const [localTotalKarma, setLocalTotalKarma] = useState(totalKarmaEarned);

  useEffect(() => {
    setLocalTotalKarma(totalKarmaEarned);
  }, [totalKarmaEarned]);

  const pointsPerLevel = useMemo(() => levelData.map((level) => level.karma || 0), [levelData]);
  const maxLevel = levelData.length;

  const getLevelMetrics = useMemo(() => {
    let currentLevel = 1;
    let karmaInLevel = localTotalKarma;

    while (currentLevel < maxLevel && karmaInLevel >= pointsPerLevel[currentLevel - 1]) {
      karmaInLevel -= pointsPerLevel[currentLevel - 1];
      currentLevel += 1;
    }

    const totalRequired = pointsPerLevel[currentLevel - 1] || 100;
    let progress = totalRequired > 0 ? (karmaInLevel / totalRequired) * 100 : 0;

    if (currentLevel === maxLevel && karmaInLevel >= totalRequired) {
      progress = 100;
      karmaInLevel = totalRequired;
    }

    return { level: currentLevel, currentPoints: karmaInLevel, totalRequired, progress };
  }, [localTotalKarma, pointsPerLevel, maxLevel]);

  const { level: displayLevel, currentPoints: displayPoints, totalRequired, progress } = getLevelMetrics;
  const roundedPoints = Math.round(displayPoints);
  
  const icons: { [key: number]: JSX.Element } = {
    1: <Flame className="w-8 h-8 text-yellow-400" />, 
    2: <Star className="w-8 h-8 text-yellow-400" />, 
    3: <Zap className="w-8 h-8 text-yellow-400" />
  };
  
  const icon = icons[Math.min(displayLevel, 3)] || icons[1];

  return (
    <div className="w-full">
      <div className="flex items-center  h-9 mx-auto px-4 relative">
        <motion.div
          className={`${style.iconContainer} w-8 h-8 md:w-12 md:h-12 !flex !items-center !justify-center ring-2 ring-white rounded-full bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700`}
       
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <Img src={karmaIcon} className="w-6 h-6 !m-0"  />
          {/* <p className="text-white text-2xl text-center font-bold m-0">µ</p> */}
        </motion.div>

        <div className="flex flex-col flex-grow items-start justify-center !z-0">
          <div className="text-white text-[.5rem] md:text-xs  font-bold bg-blue-500 !px-6 py-1 rounded-tr-sm">
            Level {displayLevel}
          </div>
          <div
            className="relative h-4 md:h-6 w-24 md:w-36 rounded-full overflow-hidden mt-1"
            style={{ background: "rgba(30, 41, 59, 0.8)" }}
            role="progressbar"
            aria-valuenow={roundedPoints}
            aria-valuemin={0}
            aria-valuemax={totalRequired}
            aria-label={`Progress towards level ${displayLevel + 1}`}
          >
            <motion.div
              className="h-full w-xl rounded-full bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-500"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
            <div className="absolute inset-2 flex items-center justify-end pr-4">
              <span className="text-white font-medium text-[.7rem] md:text-xs">
                {roundedPoints}/{totalRequired}
              </span>
            </div>
          </div>
        </div>
      </div>

      <span className="sr-only">
        Level {displayLevel}, {roundedPoints} out of {totalRequired} karma towards level {displayLevel + 1}
      </span>
    </div>
  );
}
