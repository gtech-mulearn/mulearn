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
            
            // Filter to only include active tasks
            const allTasks = response.data.response.data || [];
            const tasks = allTasks.filter((task) => task.active === true);
            
            this.igTasksCache[usersIgid] = tasks;
            this.lastFetchTime[`igTasks_${usersIgid}`] = now;
            
            return tasks;
        } catch (error) {
            console.error(`Error fetching tasks for IG ID ${usersIgid}:`, error);
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
        console.log(error);
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
        console.error('getStartLearningTasks: Error fetching user tasks:', error);
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

export function extractIgIdentifiersFromTasks(levels: Level[]): string[] {
    const igIdentifiers = new Set<string>();
    
    levels.forEach(level => {
        level.tasks.forEach(task => {
            // Extract IG identifier from hashtag pattern #cl-{ig-identifier}-...
            const match = task.hashtag.match(/^#cl-([^-]+)-/);
            if (match) {
                igIdentifiers.add(match[1]);
            }
        });
    });
    
    return Array.from(igIdentifiers);
}

export function getIgDisplayName(hashtag: string): string {
    // Check if it's a general task (doesn't start with #cl-)
    if (!hashtag.startsWith('#cl-')) {
        return "General Tasks";
    }
    
    const match = hashtag.match(/^#cl-([^-]+)-/);
    if (!match) return "General Tasks";
    
    const identifier = match[1].toLowerCase();
    
    const identifierDisplayMap: Record<string, string> = {
        'cybersec': 'Cyber Security',
        'arvr': 'AR/VR',
        'ui': 'UI/UX',
        'ux': 'UI/UX',
        'vr': 'AR/VR',
        'muvi': 'MuVi Club',
        'pmp': 'Project Management',  // This is the key fix
        'hr': 'Human Resources',
        'entrp': 'Entrepreneurship',
        'sl': 'Strategic Leadership',
        'ds': 'Data Science',
        'web': 'Web Development',
        'react': 'Web Development',
        'cm': 'Comics',
        'sp': 'space',
        'ai': 'Artificial Intelligence',
        'da': 'Data Analytics',
        'dsa': 'Data Structures',
        'lowcode': 'No/Low Code',
        'unity-game-dev': 'Game Development',
        'game-dev': 'Game Development'
    };
    
    return identifierDisplayMap[identifier] || `${identifier.toUpperCase()} Tasks`;
}

export function getUserIgIdentifiers(userIGs: any[], availableIdentifiers: string[]): string[] {
    const userIdentifiers: string[] = [];
    
    const identifierToNameMap: Record<string, string[]> = {
        'cybersec': ['Cyber Security', 'cyber security', 'cybersecurity'],
        'arvr': ['AR/VR', 'ar/vr', 'ar vr', 'arvr'],
        'ui': ['UIUX', 'ui/ux', 'ui ux', 'uiux'],
        'ux': ['UIUX', 'ui/ux', 'ui ux', 'uiux'],
        'vr': ['AR/VR', 'ar/vr', 'ar vr', 'arvr', 'vr'],
        'muvi': ['MuVi Club', 'muvi club', 'muvi'],
        'pmp': ['Project Management', 'Others', 'others', 'pmp'],
        'hr': ['Human Resources', 'human resources', 'hr'],
        'entrp': ['Entrepreneurship', 'entrepreneurship', 'entrp'],
        'sl': ['Strategic Leadership', 'strategic leadership', 'sl'],
        'ds': ['Data Science', 'data science', 'ds'],
        'web': ['Web Development', 'web development', 'web dev', 'webdev'],
        'react': ['Web Development', 'web development', 'web dev', 'webdev', 'react'],
        'cm': ['Comics', 'comics'],
        'sp': ['space', 'space'],
        'ai': ['Artificial Intelligence', 'artificial intelligence', 'ai'],
        'da': ['Data Analytics', 'data analytics', 'da'],
        'dsa': ['Data Structures', 'data structures', 'dsa'],
        'lowcode': ['No/Low Code', 'no/low code', 'lowcode', 'no code', 'low code'],
        'unity-game-dev': ['Game Development', 'game development', 'game dev', 'gamedev', 'unity'],
        'game-dev': ['Game Development', 'game development', 'game dev', 'gamedev']
    };
    


    userIGs.forEach(ig => {
        const normalizedIgName = ig.name.toLowerCase().trim();
        
        availableIdentifiers.forEach(identifier => {
            const possibleNames = identifierToNameMap[identifier.toLowerCase()];
            if (possibleNames && possibleNames.some(name => 
                name.toLowerCase() === normalizedIgName ||
                normalizedIgName.includes(name.toLowerCase()) ||
                name.toLowerCase().includes(normalizedIgName)
            )) {
                if (!userIdentifiers.includes(identifier)) {
                    userIdentifiers.push(identifier);
                }
            }
        });
    });
    
    return userIdentifiers;
}

export async function getBecomeExpertTasks(userIGs: any[], selectedIgId?: string): Promise<Level[]> {
    try {
        const response = await getUserTasks();
        
        
        const allIgLevels = response.response.map(level => ({
            ...level,
            tasks: level.tasks.filter(task => {
                const hasClHashtag = task.hashtag && task.hashtag.startsWith('#cl-');
               
                
                return hasClHashtag;
            })
        })).filter(level => level.tasks.length > 0);
        
        const availableIdentifiers = extractIgIdentifiersFromTasks(allIgLevels);
        
        const userIdentifiers = getUserIgIdentifiers(userIGs, availableIdentifiers);
        
        if (selectedIgId) {
            const selectedIg = userIGs.find(ig => ig.id === selectedIgId);
            if (selectedIg) {
                const selectedIdentifiers = getUserIgIdentifiers([selectedIg], availableIdentifiers);
                
                return allIgLevels.map(level => ({
                    ...level,
                    tasks: level.tasks.filter(task => {
                        if (selectedIdentifiers.length === 0) {
                            return false; 
                        }
                        const matches = selectedIdentifiers.some(identifier => 
                            task.hashtag.startsWith(`#cl-${identifier}-`)
                        );
                        
                        return matches;
                    })
                })).filter(level => level.tasks.length > 0);
            }
            
            return [];
        }

        return allIgLevels.map(level => ({
            ...level,
            tasks: level.tasks.filter(task => {
                // Check if task matches user's IGs
                const matchesUserIGs = userIdentifiers.length > 0 && userIdentifiers.some(identifier => 
                    task.hashtag.startsWith(`#cl-${identifier}-`)
                );
                
                
                
                return matchesUserIGs;
            })
        })).filter(level => level.tasks.length > 0);

    } catch (error) {
        console.error("Error fetching become expert tasks:", error);
        throw error as ApiError;
    }
}