import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes } from "@/MuLearnServices/urls";

interface AxiosResponse<T> {
    data: T;
    status: number;
    statusText: string;
    headers: Record<string, string>;
    config: any;
}

interface Task {
    task_name: string;
    discord_link: string | null;
    hashtag: string;
    completed: boolean;
    karma: number;
}

interface Level {
    name: string;
    tasks: Task[];
    karma: number;
}

interface ApiResponse {
    hasError: boolean;
    statusCode: number;
    message: {
        general: string[];
    };
    response: Level[];
}

interface ApiError {
    message: string;
}

interface LevelProgress {
    level: number;
    requiredKarma: number;
    earnedKarma: number;
    completedTasks: number;
    totalTasks: number;
}

interface Card {
    id: string;
    title: string;
    desc: string;
    brief: string;
    hashtag: string;
    ig: string;
    icon: string;
    skills: string[];
    publishedBy: string;
    publishedWhen: string;
    prerequisites: string[];
    resources: string[];
}

export interface FormattedLevel {
    level: number;
    title: string;
    subtitle: string;
    leveller?: Card;
    cards: Card[];
    progress: LevelProgress;
    isUnlocked: boolean; 
}

// Type for level metadata
interface LevelMetadata {
    title: string;
    subtitle: string;
}

interface IGHashtagMap {
    id: string;
    igName: string;
    hashtagIdentifier: string;
}

const levelMetadata: Record<string, LevelMetadata> = {
    "lvl1": { title: "Level 1", subtitle: "Fundamentals and OnBoarding" },
    "lvl2": { title: "Level 2", subtitle: "Practice GRIT and Keep Going" },
    "lvl3": { title: "Level 3", subtitle: "Advanced Skills" },
    "lvl4": { title: "Level 4", subtitle: "Master UI Fundamentals with Figma" },
    "lvl5": { title: "Level 5", subtitle: "Build Complex UI Components" },
    "lvl6": { title: "Level 6", subtitle: "Create Advanced Prototypes and Interactions" },
    "lvl7": { title: "Level 7", subtitle: "Advanced Projects" }
};

function calculateLevelProgress(levels: Level[]): LevelProgress[] {
    return levels.map((level) => {
        const levelNum = parseInt(level.name.replace("lvl", ""));
        const earnedKarma = level.tasks
            .filter(task => task.completed)
            .reduce((sum, task) => sum + task.karma, 0);
        const completedTasks = level.tasks.filter(task => task.completed).length;
        const totalTasks = level.tasks.length;

        return {
            level: levelNum,
            requiredKarma: level.karma,
            earnedKarma,
            completedTasks,
            totalTasks
        };
    });
}

export function formatTasksData(apiResponse: ApiResponse, userLevel: string): FormattedLevel[] {
    const levelProgress = calculateLevelProgress(apiResponse.response);
    const currentLevelNum = parseInt(userLevel.replace("Level ", "")) || 1;

    return apiResponse.response.map((level: Level) => {
        const levelNum = parseInt(level.name.replace("lvl", ""));
        const metadata = levelMetadata[level.name] || { 
            title: `Level ${levelNum}`, 
            subtitle: `Level ${levelNum} Tasks` 
        };
        const progress = levelProgress.find(p => p.level === levelNum)!;

        const cards: Card[] = level.tasks.map((task: Task, index: number) => ({
            id: `${levelNum}-${index + 1}`,
            title: task.task_name,
            desc: `Earn ${task.karma} Karma Points`,
            brief: `Complete the ${task.task_name} task and share your progress with ${task.hashtag} to earn ${task.karma} Karma Points.`,
            hashtag: task.hashtag,
            ig: "General Task",
            icon: "",
            skills: ["Skill Development"],
            publishedBy: "Community",
            publishedWhen: "3/02/25, 12:00 PM",
            prerequisites: ["Basic knowledge"],
            resources: task.discord_link ? [task.discord_link] : []
        }));

        return {
            level: levelNum,
            title: metadata.title,
            subtitle: metadata.subtitle,
            cards: cards,
            progress: progress,
            isUnlocked: levelNum <= currentLevelNum 
        };
    });
}

export async function getUserTasks(userLevel: string): Promise<FormattedLevel[]> {
    try {
        const response: AxiosResponse<ApiResponse> = await privateGateway.get(dashboardRoutes.getUserLevels);
        const apiData: ApiResponse = response.data;
        return formatTasksData(apiData, userLevel);
    } catch (error) {
        console.log(error);
        throw error as ApiError;
    }
}

export async function getFilteredUserTasks(hashtags: string[]): Promise<FormattedLevel[]> {
    try {
        const response: AxiosResponse<ApiResponse> = await privateGateway.get(dashboardRoutes.getUserLevels);
        const apiData: ApiResponse = response.data;

        const filteredResponse = {
            ...apiData,
            response: apiData.response.map(level => ({
                ...level,
                tasks: level.tasks.filter(task => hashtags.includes(task.hashtag))
            })).filter(level => level.tasks.length > 0) 
        };

        return formatTasksData(filteredResponse, "Level 1");
    } catch (error) {
        console.log(error);
        throw error as ApiError;
    }
}

export function getLevelProgress(levels: FormattedLevel[], levelNum: number): LevelProgress {
    const level = levels.find(l => l.level === levelNum);
    return level?.progress || {
        level: levelNum,
        requiredKarma: 0,
        earnedKarma: 0,
        completedTasks: 0,
        totalTasks: 0
    };
}


export function formatIGTasksData(apiResponse: ApiResponse, userLevel: string, igHashtagMap: IGHashtagMap[]): FormattedLevel[] {
    const levelProgress = calculateLevelProgress(apiResponse.response);
    const currentLevelNum = parseInt(userLevel.replace("Level ", "")) || 1;

    return apiResponse.response.map((level: Level) => {
        const levelNum = parseInt(level.name.replace("lvl", ""));
        const progress = levelProgress.find(p => p.level === levelNum)!;

        // Filter tasks based on whether a specific IG is selected
        const filteredTasks = igHashtagMap.length === 1
            ? level.tasks.filter(task => task.hashtag.startsWith(igHashtagMap[0].hashtagIdentifier))
            : level.tasks;
        const cards: Card[] = filteredTasks.map((task: Task, index: number) => {
            const matchingIG = igHashtagMap.find(ig => task.hashtag.startsWith(ig.hashtagIdentifier));
            return {
                id: `${levelNum}-${index + 1}`,
                title: task.task_name,
                desc: `Earn ${task.karma} Karma Points`,
                brief: `Complete the ${task.task_name} task and share your progress with ${task.hashtag} to earn ${task.karma} Karma Points.`,
                hashtag: task.hashtag,
                ig: matchingIG ? matchingIG.igName : "General Task",
                icon: "",
                skills: ["Skill Development"],
                publishedBy: "Community",
                publishedWhen: "3/02/25, 12:00 PM",
                prerequisites: ["Basic knowledge"],
                resources: task.discord_link ? [task.discord_link] : [],
                igID: matchingIG ? matchingIG.id : undefined,
                igName: matchingIG ? matchingIG.igName : undefined
            };
        });

        return {
            level: levelNum,
            title: `Level ${levelNum}`,
            subtitle: `Level ${levelNum} Tasks`,
            cards: cards,
            progress: progress,
            isUnlocked: levelNum <= currentLevelNum 
        };
    });
}

export const getIGLevelTasks = async (levels: number[], igHashtagMap: IGHashtagMap[]): Promise<FormattedLevel[]> => {
    try {
        const response: AxiosResponse<ApiResponse> = await privateGateway.get(dashboardRoutes.getUserLevels);
        const apiData: ApiResponse = response.data;

        const filteredResponse = {
            ...apiData,
            response: apiData.response.filter(level => {
                const levelNum = parseInt(level.name.replace("lvl", ""));
                return levels.includes(levelNum); 
            })
        };

        return formatIGTasksData(filteredResponse, "Level 4", igHashtagMap);
    } catch (error) {
        console.log(error);
        throw error as ApiError;
    }
};
