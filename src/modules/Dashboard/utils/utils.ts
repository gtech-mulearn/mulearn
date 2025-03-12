import level1 from "./assets/levelBadges/Level1.webp";
import level2 from "./assets/levelBadges/Level2.webp";
import level3 from "./assets/levelBadges/Level3.webp";
import level4 from "./assets/levelBadges/Level4.webp";
import level5 from "./assets/levelBadges/Level5.webp";
import level6 from "./assets/levelBadges/Level6.webp";
import level7 from "./assets/levelBadges/Level7.webp";

const badge = [level1, level2, level3, level4, level5, level6, level7];
export const userLevelBadge = (level: number) => {
    return badge[level - 1];
};
