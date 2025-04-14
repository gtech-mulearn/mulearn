"use client";
import { motion } from "framer-motion";
import { Img } from "@chakra-ui/react";
import { useEffect, useState, useMemo } from "react";
import style from "./GameProgressBar.module.css";
import Level1 from "../../Profile/components/MuVoyage/assets/images/Level1.webp";
import Level2 from "../../Profile/components/MuVoyage/assets/images/Level2.webp";
import Level3 from "../../Profile/components/MuVoyage/assets/images/Level3.webp";
import Level4 from "../../Profile/components/MuVoyage/assets/images/Level4.webp";
import Level5 from "../../Profile/components/MuVoyage/assets/images/Level5.webp";
import Level6 from "../../Profile/components/MuVoyage/assets/images/Level6.webp";
import Level7 from "../../Profile/components/MuVoyage/assets/images/Level7.webp";
import { getUserLevelFeed, LevelFeedResponse } from "../services/api";

const ImageMap = [
  { level: 1, image: Level1 },
  { level: 2, image: Level2 },
  { level: 3, image: Level3 },
  { level: 4, image: Level4 },
  { level: 5, image: Level5 },
  { level: 6, image: Level6 },
  { level: 7, image: Level7 },
];

const LEVEL_REQUIREMENTS = {
  1: 20,
  2: 200,
  3: 800,
  4: 1600,
  5: 1600,
  6: 1600,
  7: 0,
};

const CACHE_KEY = "mulearn_level_data";
const CACHE_TIMESTAMP_KEY = "mulearn_level_data_timestamp";
const CACHE_DURATION = 60 * 60 * 1000;

export default function GameProgressBar() {
  const [levelData, setLevelData] = useState<LevelFeedResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const saveLevelDataToCache = (data: LevelFeedResponse) => {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
  };

  const getLevelDataFromCache = (): { data: LevelFeedResponse | null, isValid: boolean } => {
    try {
      const cachedData = localStorage.getItem(CACHE_KEY);
      const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);

      if (!cachedData || !timestamp) {
        return { data: null, isValid: false };
      }

      const isValid = Date.now() - parseInt(timestamp) < CACHE_DURATION;
      return { data: JSON.parse(cachedData), isValid };
    } catch (error) {
      console.error("Error reading from cache:", error);
      return { data: null, isValid: false };
    }
  };

  useEffect(() => {
    const fetchLevelData = async () => {
      setIsLoading(true);

      const { data: cachedData, isValid } = getLevelDataFromCache();

      if (cachedData && isValid) {
        console.log("Using cached level data");
        setLevelData(cachedData);
        setIsLoading(false);
        return;
      }

      try {
        console.log("Fetching fresh level data");
        const data = await getUserLevelFeed();
        if (data) {
          setLevelData(data);
          saveLevelDataToCache(data);
        }
      } catch (error) {
        console.error("Error fetching level data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLevelData();
  }, []);

  // Calculate level-related variables before any returns
  const currentLevel = levelData?.level_order ?? 1;
  const levelRequirement = LEVEL_REQUIREMENTS[currentLevel as keyof typeof LEVEL_REQUIREMENTS] || 0;

  // Memoize progress unconditionally
  const progress = useMemo(() => {
    if (!levelData || levelRequirement === 0) return 0;
    return Math.min((levelData.user_karma / levelRequirement) * 100, 100);
  }, [levelData, levelRequirement]);

  // Calculate imageIndex and nextLevel
  const imageIndex = Math.min(Math.max(currentLevel - 1, 0), 6);
  const nextLevel = currentLevel + 1;

  if (isLoading) {
    return (
      <div className={style.container}>
        <div className={style.wrapper}>
          <motion.div className={`${style.iconContainer} ${style.iconContainerLarge}`}>
            <Img src={ImageMap[0].image} className={style.image} />
          </motion.div>
          <div className={style.progressContainer}>
            <div className={style.progressTitle}>Loading...</div>
            <div className={`${style.progressBar} ${style.progressBarLarge}`}>
              <motion.div
                className={style.progressFill}
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

  if (currentLevel === 7) {
    return (
      <div className={style.container}>
        <div className={style.wrapper}>
          <motion.div className={`${style.iconContainer} ${style.iconContainerLarge}`}>
            <Img src={ImageMap[6].image} className={style.image} />
          </motion.div>
          <div className={style.progressContainer}>
            <div className={style.progressTitle}>Level 7</div>
            <div className={`${style.progressBar} ${style.progressBarLarge}`} style={{ background: "#22c55e" }}>
              <span className={style.progressText}>Max Level Reached!</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <motion.div className={`${style.iconContainer} ${style.iconContainerLarge}`}>
          <Img src={ImageMap[imageIndex].image} className={style.image} />
        </motion.div>
        <div className={style.progressContainer}>
          <div className={style.progressTitle}>
            Level {currentLevel} → {nextLevel}
          </div>
          <div className={`${style.progressBar} ${style.progressBarLarge}`}>
            <motion.div
              key={progress} // Reset animation only when progress changes
              className={style.progressFill}
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
            />
            <div className={style.progressText}>
              {levelData?.user_karma ?? 0}/{levelRequirement}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}