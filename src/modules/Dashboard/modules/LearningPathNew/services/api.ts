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

export interface Task {
    id: string; // Added 'id' property to Task interface
    level: any;
    title: string;
    task_name: string;
    task_description: string;
    discord_link: string | null;
    hashtag: string;
    completed: boolean;
    karma: number;
    ig?: string;
    active: boolean;
    interest_group: {
        id: string | null;
        name: string | null;
    };
    submission_channel: {
        id: string;
        name: string;
        discord_id: string | null;
    };
}

export interface Level {
    name: string;
    tasks: Task[];
    karma: number;
}

export interface ApiResponse {
    hasError: boolean;
    statusCode: number;
    message: {
        general: string[];
    };
    response: Level[];
}

export interface IgTaskApiResponse {
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

class ApiCache {
    private static instance: ApiCache;
    private userLevelsCache: ApiResponse | null = null;
    private igTasksCache: Record<string, Task[]> = {};
    private lastFetchTime: Record<string, number> = {};
    private CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache duration

    private constructor() {}

    public static getInstance(): ApiCache {
        if (!ApiCache.instance) {
            ApiCache.instance = new ApiCache();
        }
        return ApiCache.instance;
    }

    public async getUserLevels(): Promise<ApiResponse> {
        const now = Date.now();
        
        // Check if cache exists and is fresh
        if (this.userLevelsCache && now - (this.lastFetchTime['userLevels'] || 0) < this.CACHE_DURATION) {
            return this.userLevelsCache;
        }

        try {
            const response: AxiosResponse<ApiResponse> = await privateGateway.get(dashboardRoutes.getUserLevels);
            this.userLevelsCache = response.data;
            this.lastFetchTime['userLevels'] = now;
            return response.data;
        } catch (error) {
            throw error as ApiError;
        }
    }

    public async getIgTasks(usersIgid: string): Promise<Task[]> {
        const now = Date.now();
        
        // Check if cache exists and is fresh for this IG ID
        if (
            this.igTasksCache[usersIgid] && 
            now - (this.lastFetchTime[`igTasks_${usersIgid}`] || 0) < this.CACHE_DURATION
        ) {
            return this.igTasksCache[usersIgid];
        }

        try {
            const response: AxiosResponse<IgTaskApiResponse> = await privateGateway.get(
                dashboardRoutes.getUserIgTasks,
                { params: { ig_id: usersIgid, perPage: 1000 } }
            );
            
            // Filter to only include active tasks
            const allTasks = response.data.response.data || [];
            const tasks = allTasks.filter((task) => task.active === true);
            
            this.igTasksCache[usersIgid] = tasks;
            this.lastFetchTime[`igTasks_${usersIgid}`] = now;
            
            return tasks;
        } catch (error) {
            return [];
        }
    }

    public clearCache(type?: 'userLevels' | 'igTasks', key?: string) {
        if (type === 'userLevels') {
            this.userLevelsCache = null;
            delete this.lastFetchTime['userLevels'];
        } else if (type === 'igTasks' && key) {
            delete this.igTasksCache[key];
            delete this.lastFetchTime[`igTasks_${key}`];
        } else {
            this.userLevelsCache = null;
            this.igTasksCache = {};
            this.lastFetchTime = {};
        }
    }
}

export async function getUserTasks(hashtags?: string[]): Promise<ApiResponse> {
    try {
        const apiCache = ApiCache.getInstance();
        const response = await apiCache.getUserLevels();

        // Filter by hashtags if provided
        if (hashtags && hashtags.length > 0) {
            const filteredResponse = {
                ...response,
                response: response.response
                    .map((level) => ({
                        ...level,
                        tasks: level.tasks.filter((task) => hashtags.includes(task.hashtag) && task.active === true),
                    }))
                    .filter((level) => level.tasks.length > 0),
            };
            return filteredResponse;
        }
        
        // Filter all tasks to show only active ones
        const filteredResponse = {
            ...response,
            response: response.response
                .map((level) => ({
                    ...level,
                    tasks: level.tasks.filter((task) => task.active === true),
                }))
                .filter((level) => level.tasks.length > 0),
        };
        
        return filteredResponse;
    } catch (error) {
        throw error as ApiError;
    }
}

export async function getStartLearningTasks(): Promise<Level[]> {
    try {
        const response = await getUserTasks();
        

        const startLearningLevels = response.response.map(level => ({
            ...level,
            tasks: level.tasks.filter(task => {
                // Include tasks that don't have #cl- hashtags (general tasks)
                const hasClHashtag = task.hashtag && task.hashtag.startsWith('#cl-');
                const shouldInclude = !hasClHashtag;
                
              
                
                return shouldInclude;
            })
        })).filter(level => level.tasks.length > 0); // Only include levels that have tasks


        return startLearningLevels;
    } catch (error) {
        throw error;
    }
}

export async function getUserIgTasks(usersIgids: string[]): Promise<Record<string, Task[]>> {
    const apiCache = ApiCache.getInstance();
    const taskObject: Record<string, Task[]> = {};

    await Promise.all(
        usersIgids.map(async (usersIgid) => {
            taskObject[usersIgid] = await apiCache.getIgTasks(usersIgid);
        })
    );

    return taskObject;
}

export function getIgDisplayName(task: Task): string {
    // Use interest_group.name from API if available
    if (task.interest_group && task.interest_group.name) {
        return task.interest_group.name;
    }
    
    // Check if it's a general task (doesn't start with #cl-)
    if (!task.hashtag || !task.hashtag.startsWith('#cl-')) {
        return "General Tasks";
    }
    
    // For legacy tasks without interest_group data, extract from hashtag
    const match = task.hashtag.match(/^#cl-([^-]+)-/);
    if (!match) return "General Tasks";
    
    const identifier = match[1].toUpperCase();
    return `${identifier} Tasks`;
}

export async function getBecomeExpertTasks(userIGs: any[], selectedIgId?: string): Promise<Level[]> {
    try {
        const response = await getUserTasks();
        
        // Filter tasks that have #cl- hashtag (intermediate tasks)
        const allIgLevels = response.response.map(level => ({
            ...level,
            tasks: level.tasks.filter(task => {
                const hasClHashtag = task.hashtag && task.hashtag.startsWith('#cl-');
                return hasClHashtag;
            })
        })).filter(level => level.tasks.length > 0);
        
        // Get user IG IDs for filtering
        const userIgIds = userIGs.map(ig => ig.id);
        
        if (selectedIgId) {
            // Filter tasks for selected IG only
            return allIgLevels.map(level => ({
                ...level,
                tasks: level.tasks.filter(task => {
                    // Use the interest_group.id from the task
                    if (task.interest_group && task.interest_group.id) {
                        return task.interest_group.id === selectedIgId;
                    }
                    // If no interest_group data, don't show the task
                    return false;
                })
            })).filter(level => level.tasks.length > 0);
        }

        // Filter tasks for all user IGs
        return allIgLevels.map(level => ({
            ...level,
            tasks: level.tasks.filter(task => {
                // Use the interest_group.id from the task
                if (task.interest_group && task.interest_group.id) {
                    return userIgIds.includes(task.interest_group.id);
                }
                // If no interest_group data, don't show the task
                return false;
            })
        })).filter(level => level.tasks.length > 0);

    } catch (error) {
        throw error as ApiError;
    }
}

export async function getEventTasks(): Promise<Level[]> {
    try {
        const response = await getUserTasks();

        const eventLevels = response.response.map(level => ({
            ...level,
            tasks: level.tasks.filter(task => {
                const hashtags = [
                    "#cl-sp-webdev",
                    "#cl-sp-comicstrip",
                    "#cl-sp-hardware",
                    "#cl-sp-earthsc",
                    "#cl-sp-gamedev",
                    "#cl-sp-missiondesign",
                    "#cl-sp-education",
                    "#cl-sp-nasa"
                ];
                return hashtags.includes(task.hashtag);
            })
        })).filter(level => level.tasks.length > 0);

        return eventLevels;
    } catch (error) {
        throw error;
    }
}