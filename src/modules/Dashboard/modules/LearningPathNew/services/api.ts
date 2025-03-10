import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import channelmap from "../data/channelmap"

interface AxiosResponse<T> {
    data: T;
    status: number;
    statusText: string;
    headers: Record<string, string>;
    config: any;
}

// Task interface for both APIs
interface Task {
    level: any;
    title: string;
    task_name: string;
    discord_link: string | null;
    hashtag: string;
    completed: boolean;
    karma: number;
    ig?: string;
}

// Level interface for getUserLevels response
interface Level {
    name: string;
    tasks: Task[];
    karma: number;
}

// ApiResponse for getUserLevels
interface ApiResponse {
    hasError: boolean;
    statusCode: number;
    message: {
        general: string[];
    };
    response: Level[];
}

// New interface for getUserIgTasks response
interface IgTaskApiResponse {
    hasError: boolean;
    statusCode: number;
    message: {
        general: string[];
    };
    response: {
        data: Task[];
    };
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

export interface Card {
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
    discord_link?: string;
    completed?: boolean;
    karma?: number;
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

interface LevelMetadata {
    title: string;
    subtitle: string;
}

const levelMetadata: Record<string, LevelMetadata> = {
    "lvl1": { title: "Level 1", subtitle: "Fundamentals and OnBoarding" },
    "lvl2": { title: "Level 2", subtitle: "Practice GRIT and Keep Going" },
    "lvl3": { title: "Level 3", subtitle: "Advanced Skills" },
    "lvl4": { title: "Level 4", subtitle: "Master UI Fundamentals with Figma" },
    "lvl5": { title: "Level 5", subtitle: "Build Complex UI Components" },
    "lvl6": { title: "Level 6", subtitle: "Create Advanced Prototypes and Interactions" },
    "lvl7": { title: "Level 7", subtitle: "Advanced Projects" },
};

function calculateLevelProgress(levels: Level[]): LevelProgress[] {
    return levels.map((level) => {
        const levelNum = parseInt(level.name.replace("lvl", ""));
        const earnedKarma = level.tasks
            .filter((task) => task.completed)
            .reduce((sum, task) => sum + task.karma, 0);
        const completedTasks = level.tasks.filter((task) => task.completed).length;
        const totalTasks = level.tasks.length;

        return {
            level: levelNum,
            requiredKarma: level.karma,
            earnedKarma,
            completedTasks,
            totalTasks,
        };
    });
}

async function fetchUserLevels(): Promise<ApiResponse> {
    try {
        const response: AxiosResponse<ApiResponse> = await privateGateway.get(dashboardRoutes.getUserLevels);
        return response.data;
    } catch (error) {
        console.error("Error fetching user levels:", error);
        throw error as ApiError;
    }
}

export async function formatTasksData(apiResponse: ApiResponse, userLevel: string): Promise<FormattedLevel[]> {
    const userLevelsData = await fetchUserLevels();
    const hashtagCompletedMap: Record<string, boolean> = {};
    userLevelsData.response.forEach((level) => {
        level.tasks.forEach((task) => {
            hashtagCompletedMap[task.hashtag] = task.completed;
        });
    });

    const levelProgress = calculateLevelProgress(apiResponse.response);
    const currentLevelNum = parseInt(userLevel.replace("Level ", "")) || 1;

    return apiResponse.response.map((level: Level) => {
        const levelNum = parseInt(level.name.replace("lvl", ""));
        const metadata = levelMetadata[level.name] || {
            title: `Level ${levelNum}`,
            subtitle: `Level ${levelNum} Tasks`,
        };
        const progress = levelProgress.find((p) => p.level === levelNum)!;

        const cards: Card[] = level.tasks.map((task: Task, index: number) => ({
            id: `${levelNum}-${index + 1}`,
            title: task.task_name,
            desc: `Earn ${task.karma} Karma Points`,
            brief: `Complete the ${task.task_name} task and share your progress with ${task.hashtag} to earn ${task.karma} Karma Points.`,
            hashtag: task.hashtag,
            ig: "General Task",
            icon: "",
            discord_link: channelmap["taskdrop-box"] || "https://discord.com/channels/771670169691881483/",
            skills: ["Skill Development"],
            publishedBy: "Community",
            publishedWhen: "3/02/25, 12:00 PM",
            prerequisites: ["Basic knowledge"],
            resources: task.discord_link ? [task.discord_link] : [],
            completed: hashtagCompletedMap[task.hashtag] || false,
            karma: task.karma, 
        }));

        return {
            level: levelNum,
            title: metadata.title,
            subtitle: metadata.subtitle,
            cards: cards,
            progress: progress,
            isUnlocked: levelNum <= currentLevelNum,
        };
    });
}

export async function getUserTasks(userLevel: string): Promise<FormattedLevel[]> {
    try {
        const response: AxiosResponse<ApiResponse> = await privateGateway.get(dashboardRoutes.getUserLevels);
        const apiData: ApiResponse = response.data;
        return await formatTasksData(apiData, userLevel);
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
            response: apiData.response
                .map((level) => ({
                    ...level,
                    tasks: level.tasks.filter((task) => hashtags.includes(task.hashtag)),
                }))
                .filter((level) => level.tasks.length > 0),
        };

        return await formatTasksData(filteredResponse, "Level 1");
    } catch (error) {
        console.log(error);
        throw error as ApiError;
    }
}

export function getLevelProgress(levels: FormattedLevel[], levelNum: number): LevelProgress {
    const level = levels.find((l) => l.level === levelNum);
    return (
        level?.progress || {
            level: levelNum,
            requiredKarma: 0,
            earnedKarma: 0,
            completedTasks: 0,
            totalTasks: 0,
        }
    );
}

export async function formatIGTasksDataTest(
    taskObject: Record<string, Task[]>,
    userLevel: number,
    includeLevelNull: boolean = false
): Promise<FormattedLevel[]> {
    const userLevelsData = await fetchUserLevels();
    const hashtagCompletedMap: Record<string, boolean> = {};
    userLevelsData.response.forEach((level) => {
        level.tasks.forEach((task) => {
            hashtagCompletedMap[task.hashtag] = task.completed;
        });
    });

    const levels: Record<number, Card[]> = {};

    Object.entries(taskObject).forEach(([igId, tasks]) => {
        tasks.forEach((task, index) => {
            const levelMatch = task.level?.match(/\d+/);
            const levelNum = levelMatch
                ? parseInt(levelMatch[0])
                : task.level === null && includeLevelNull
                ? 0
                : null;

            if ((levelNum === null || levelNum === 0 || levelNum === 1 || levelNum === 2 || levelNum === 3) && !includeLevelNull)
                return;

            const card: Card = {
                id: `${levelNum}-${index + 1}`,
                title: task.title || "Untitled Task",
                desc: `Earn ${task.karma || 0} Karma Points`,
                brief: `Complete the ${task.title || "task"} and share your progress with ${
                    task.hashtag || "#unknown"
                } to earn ${task.karma || 0} Karma Points.`,
                hashtag: task.hashtag || "#unknown",
                ig: task.ig || "General Task",
                icon: "",
                discord_link: channelmap[task.ig as keyof typeof channelmap] || "https://discord.com/channels/771670169691881483/",
                skills: ["Skill Development"],
                publishedBy: "µLearn Foundation",
                publishedWhen: "",
                prerequisites: ["Basic knowledge"],
                resources: task.discord_link ? [task.discord_link] : [],
                completed: hashtagCompletedMap[task.hashtag] || false,
                karma: task.karma, // Store karma for progress calculation
            };

            const effectiveLevel = levelNum === null ? 0 : levelNum;
            if (!levels[effectiveLevel]) {
                levels[effectiveLevel] = [];
            }
            levels[effectiveLevel].push(card);
        });
    });

    return Object.entries(levels).map(([levelNum, cards]) => ({
        level: parseInt(levelNum),
        title: `Level ${levelNum}`,
        subtitle: `Level ${levelNum} Tasks`,
        cards: cards,
        progress: {
            level: parseInt(levelNum),
            completedTasks: cards.filter((card) => card.completed).length,
            totalTasks: cards.length,
            earnedKarma: cards.filter((card) => card.completed).reduce((sum, card) => sum + (card.karma || 0), 0),
            requiredKarma: 0,
        } as LevelProgress,
        isUnlocked: parseInt(levelNum) <= userLevel,
    }));
}

export const getUserIGFormattedTasks = async (
    usersIgids: string[],
    userLevel: number,
    includeLevelNull: boolean = false
): Promise<Record<string, FormattedLevel[]>> => {
    try {
        const taskObject: Record<string, Task[]> = {};

        await Promise.all(
            usersIgids.map(async (usersIgid) => {
                try {
                    const response: AxiosResponse<IgTaskApiResponse> = await privateGateway.get(
                        dashboardRoutes.getUserIgTasks,
                        { params: { ig_id: usersIgid, perPage: 1000 } }
                    );
                    taskObject[usersIgid] = response.data.response.data || []; // Correctly access the data property
                } catch (error) {
                    console.error(`Error fetching tasks for IG ID ${usersIgid}:`, error);
                    taskObject[usersIgid] = [];
                }
            })
        );


        const formattedTasks: Record<string, FormattedLevel[]> = {};
        for (const igId of Object.keys(taskObject)) {
            formattedTasks[igId] = await formatIGTasksDataTest({ [igId]: taskObject[igId] }, userLevel, includeLevelNull);
        }

        console.log(formattedTasks, "formatted-tasks");
        return formattedTasks;
    } catch (error) {
        console.error(error);
        throw error as ApiError;
    }
};