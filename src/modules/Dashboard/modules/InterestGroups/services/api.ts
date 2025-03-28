// src/services/api.ts
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import { AxiosResponse } from "axios";
import channelMap from "../../LearningPathNew/data/channelmap";

// Raw Task interface from your API response
interface RawTask {
    id: string;
    hashtag: string;
    title: string;
    description: string;
    karma: number;
    channel: string;
    type: string;
    variable_karma: boolean;
    level: string;
    ig: string;
    event: null | string;
}

// Formatted interfaces for the output
export interface Card {
    id: string;
    title: string;
    desc: string;
    brief: string;
    hashtag: string;
    ig: string;
    icon: string;
    discord_link: string;
    skills: string[];
    publishedBy: string;
    publishedWhen: string;
    prerequisites: string[];
    resources: string[];
    completed: boolean;
    karma: number;
}

interface LevelProgress {
    level: number;
    completedTasks: number;
    totalTasks: number;
    earnedKarma: number;
    requiredKarma: number;
}

export interface FormattedLevel {
    level: number;
    title: string;
    subtitle: string;
    cards: Card[];
    progress: LevelProgress;
    isUnlocked: boolean;
}

// Fetch IG Tasks from the API
export const getIGTasks = async (id: string): Promise<Record<string, RawTask[]>> => {
    const taskObject: Record<string, RawTask[]> = {};
    try {
        const response: AxiosResponse = await privateGateway.get(
            dashboardRoutes.getUserIgTasks,
            { params: { ig_id: id, perPage: 1000 } }
        );
        taskObject[id] = response.data.response.data || [];
    } catch (error) {
        console.error(`Error fetching tasks for IG ID ${id}:`, error);
        taskObject[id] = [];
    }
    return taskObject;
};

// Format the raw task data for any interest group
export const formatIGTasks = (
    rawData: { data: RawTask[] },
    includeLevelNull: boolean = false
): FormattedLevel[] => {
    const taskObject: Record<string, RawTask[]> = {
        "tasks": rawData.data // Generic key since we're not tying it to a specific IG here
    };

    const hashtagCompletedMap: Record<string, boolean> = {};
    const levels: Record<number, Card[]> = {};

    Object.entries(taskObject).forEach(([_, tasks]) => { // Changed igId to _ since it's not used
        tasks.forEach((task, index) => {
            const levelMatch = task.level?.match(/\d+/);
            const levelNum = levelMatch
                ? parseInt(levelMatch[0])
                : task.level === null && includeLevelNull
                ? 0
                : null;

            if ((levelNum === null || levelNum <= 3) && !includeLevelNull) {
                return;
            }

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
                discord_link: channelMap[task.ig as keyof typeof channelMap] || "https://discord.com/channels/771670169691881483/",
                skills: ["Skill Development"],
                publishedBy: "µLearn Foundation",
                publishedWhen: "",
                prerequisites: ["Basic knowledge"],
                resources: task.channel 
                    ? [`https://discord.com/channels/771670169691881483/${task.channel.toLowerCase().replace(/\s+/g, '-')}`] 
                    : [],
                completed: hashtagCompletedMap[task.hashtag] || false,
                karma: task.karma || 0,
            };

            const effectiveLevel = levelNum === null ? 0 : levelNum;
            if (!levels[effectiveLevel]) {
                levels[effectiveLevel] = [];
            }
            levels[effectiveLevel].push(card);
        });
    });

    return Object.entries(levels).map(([levelNum, cards]) => {
        const levelNumber = parseInt(levelNum);
        return {
            level: levelNumber,
            title: `Level ${levelNum}`,
            subtitle: `Level ${levelNum} Tasks`,
            cards: cards,
            progress: {
                level: levelNumber,
                completedTasks: cards.filter((card) => card.completed).length,
                totalTasks: cards.length,
                earnedKarma: cards.filter((card) => card.completed).reduce((sum, card) => sum + (card.karma || 0), 0),
                requiredKarma: 0,
            },
            isUnlocked: true,
        };
    });
};

// Process API data and return formatted levels
export const processApiData = (apiData: any): FormattedLevel[] => {
    const rawTasks = apiData.response.data;
    return formatIGTasks({ data: rawTasks });
};

// Combined function to fetch and format tasks in one go
export const fetchAndFormatIGTasks = async (id: string): Promise<FormattedLevel[]> => {
    const rawTasks = await getIGTasks(id);
    const tasksArray = rawTasks[id] || []; // Extract the tasks array for the given ID
    return formatIGTasks({ data: tasksArray });
};