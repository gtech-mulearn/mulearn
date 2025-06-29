import { cdnUrl } from "@/modules/utils/cdn";

const level1 = cdnUrl("src/modules/Dashboard/utils/assets/levelBadges/Level1.webp");
const level2 = cdnUrl("src/modules/Dashboard/utils/assets/levelBadges/Level2.webp");
const level3 = cdnUrl("src/modules/Dashboard/utils/assets/levelBadges/Level3.webp");
const level4 = cdnUrl("src/modules/Dashboard/utils/assets/levelBadges/Level4.webp");
const level5 = cdnUrl("src/modules/Dashboard/utils/assets/levelBadges/Level5.webp");
const level6 = cdnUrl("src/modules/Dashboard/utils/assets/levelBadges/Level6.webp");
const level7 = cdnUrl("src/modules/Dashboard/utils/assets/levelBadges/Level7.webp");

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
