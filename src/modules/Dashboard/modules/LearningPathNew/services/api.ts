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

// Simplified Task interface matching API response
export interface Task {
    level: any;
    title: string;
    task_name: string;
    task_description: string;
    discord_link: string | null;
    hashtag: string;
    completed: boolean;
    karma: number;
    ig?: string;
}

// Level interface for getUserLevels response
export interface Level {
    name: string;
    tasks: Task[];
    karma: number;
}

// ApiResponse for getUserLevels
export interface ApiResponse {
    hasError: boolean;
    statusCode: number;
    message: {
        general: string[];
    };
    response: Level[];
}

// New interface for getUserIgTasks response
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

// Simple cache for API responses
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
            console.error("Error fetching user levels:", error);
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
            
            const tasks = response.data.response.data || [];
            this.igTasksCache[usersIgid] = tasks;
            this.lastFetchTime[`igTasks_${usersIgid}`] = now;
            
            return tasks;
        } catch (error) {
            console.error(`Error fetching tasks for IG ID ${usersIgid}:`, error);
            return [];
        }
    }

    // Method to clear specific or all caches
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

// Simplified functions to get tasks directly from API
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
                        tasks: level.tasks.filter((task) => hashtags.includes(task.hashtag)),
                    }))
                    .filter((level) => level.tasks.length > 0),
            };
            return filteredResponse;
        }
        
        return response;
    } catch (error) {
        console.log(error);
        throw error as ApiError;
    }
}

export async function getUserIgTasks(usersIgids: string[]): Promise<Record<string, Task[]>> {
    const apiCache = ApiCache.getInstance();
    const taskObject: Record<string, Task[]> = {};

    // Fetch tasks for all IG IDs concurrently using cache
    await Promise.all(
        usersIgids.map(async (usersIgid) => {
            taskObject[usersIgid] = await apiCache.getIgTasks(usersIgid);
        })
    );

    return taskObject;
}