"use client";

import { motion } from "framer-motion";
import { Img } from "@chakra-ui/react";
import style from "./GameProgressBar.module.css";
import karmaIcon from "../assets/karma-icon.png";

interface Task {
  completed: boolean;
  karma?: number;
}

interface Level {
  name?: string;
  tasks?: Task[];
  karma: number;
}

interface LevelDataResult {
  currentLevel: number;
  currentPoints: number;
  karmaRequired: number;
  progress?: number;
}

export default function GameProgressBar({ 
  levelData = [], 
  userLevel 
}: { 
  levelData: Level[], 
  userLevel?: string 
}) {
  function transformToLevelData(levelData: Level[], userLevel: string = "lvl1"): LevelDataResult | string {
    const cleanedUserLevel = (userLevel || "lvl1").replace("lvl", "");

    if (!levelData || !Array.isArray(levelData) || levelData.length === 0) {
      console.error('Invalid or empty levelData provided:', levelData);
      return {
        currentLevel: 1,
        currentPoints: 0,
        karmaRequired: 0
      };
    }

    for (const level of levelData) {
      if (!level.name || level.name.replace("lvl", "") !== cleanedUserLevel) {
        console.log("User Leveled: ", level.name?.replace("lvl", ""));
        console.log("User Level: ", cleanedUserLevel);
        continue;
      }
      
      const currentLevel = Number(cleanedUserLevel) || 1;
      if (currentLevel === 7) {
        return "You've Made it!";
      }
      
      const karmaRequired = level.karma;
      const currentLevelKarma = level.tasks
        ?.filter(task => task.completed === true)
        .reduce((sum, task) => sum + (task.karma ?? 0), 0) || 0;

      return {
        currentLevel,
        currentPoints: currentLevelKarma,
        karmaRequired,
        progress: (currentLevelKarma / karmaRequired) * 100
      };
    }

    return {
      currentLevel: 1,
      currentPoints: 0,
      karmaRequired: 0
    };
  }

  // If userLevel is not yet available, show a loading state
  if (!userLevel) {
    return (
      <div className="w-full">
        <div className="flex items-center h-9 mx-auto px-4 relative">
          <motion.div
            className={`${style.iconContainer} w-8 h-8 md:w-12 md:h-12 !flex !items-center !justify-center ring-2 ring-white rounded-full bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700`}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          >
            <Img src={karmaIcon} className="w-6 h-6 !m-0" />
          </motion.div>
          <div className="flex flex-col flex-grow items-start justify-center !z-0">
            <div className="text-white text-[.5rem] md:text-xs font-bold bg-blue-500 !px-6 py-1 rounded-tr-sm">
              Loading...
            </div>
            <div
              className="relative h-4 md:h-6 w-24 md:w-36 rounded-full overflow-hidden mt-1"
              style={{ background: "rgba(30, 41, 59, 0.8)" }}
            >
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-500"
                initial={{ width: "0%" }}
                animate={{ width: "50%" }}
                transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const result = transformToLevelData(levelData, userLevel);

  if (typeof result === "string") {
    return (
      <div className="w-full">
        <div className="flex items-center h-9 mx-auto px-4 relative">
          <motion.div
            className={`${style.iconContainer} w-8 h-8 md:w-12 md:h-12 !flex !items-center !justify-center ring-2 ring-white rounded-full bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700`}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          >
            <Img src={karmaIcon} className="w-6 h-6 !m-0" />
          </motion.div>
          <div className="flex flex-col flex-grow items-start justify-center !z-0">
            <div className="text-white text-[.5rem] md:text-xs font-bold bg-blue-500 !px-6 py-1 rounded-tr-sm">
              Level 7
            </div>
            <div
              className="relative h-4 md:h-6 w-24 md:w-36 rounded-full overflow-hidden mt-1 flex items-center justify-center bg-green-500"
              
            >
              <span className="text-white font-medium text-[.7rem] md:text-xs">
                You've Made it!
              </span>
            </div>
          </div>
        </div>
        <span className="sr-only">Level 7 completed</span>
      </div>
    );
  }

  if (levelData && levelData.length > 0) {
    const { currentLevel, currentPoints, karmaRequired, progress } = result;

    return (
      <div className="w-full">
        <div className="flex items-center h-9 mx-auto px-4 relative">
          <motion.div
            className={`${style.iconContainer} w-8 h-8 md:w-12 md:h-12 !flex !items-center !justify-center ring-2 ring-white rounded-full bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700`}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          >
            <Img src={karmaIcon} className="w-6 h-6 !m-0" />
          </motion.div>
          <div className="flex flex-col flex-grow items-start justify-center !z-0">
            <div className="text-white text-[.5rem] md:text-xs font-bold bg-blue-500 !px-6 py-1 rounded-tr-sm">
              Level {currentLevel}
            </div>
            <div
              className="relative h-4 md:h-6 w-24 md:w-36 rounded-full overflow-hidden mt-1"
              style={{ background: "rgba(30, 41, 59, 0.8)" }}
              role="progressbar"
              aria-valuenow={currentPoints}
              aria-valuemin={0}
              aria-valuemax={karmaRequired}
              aria-label={`Progress towards level ${currentLevel + 1}`}
            >
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-500"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
              <div className="absolute inset-2 flex items-center justify-end pr-4">
                <span className="text-white font-medium text-[.7rem] md:text-xs">
                  {currentPoints}/{karmaRequired}
                </span>
              </div>
            </div>
          </div>
        </div>
        <span className="sr-only">
          Level {currentLevel}, {currentPoints} out of {karmaRequired} karma towards level {currentLevel + 1}
        </span>
      </div>
    );
  }

  return null;
}