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

export function getDateDifference(targetDate: Date | string): string {
    const target = typeof targetDate === 'string' ? new Date(targetDate) : targetDate;
    
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    
    target.setHours(0, 0, 0, 0);
    
    const diffTime = target.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "In 1 day";
    if (diffDays === -1) return "1 day ago";
    if (diffDays > 0) return `In ${diffDays} days`;
    return `${Math.abs(diffDays)} days ago`;
}
