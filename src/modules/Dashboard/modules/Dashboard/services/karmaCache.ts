import { KarmaFeedItem } from './api';

class KarmaCache {
    private static instance: KarmaCache;
    private cache: KarmaFeedItem[] | null = null;
    private lastFetchTime: number = 0;
    private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

    private constructor() {}

    public static getInstance(): KarmaCache {
        if (!KarmaCache.instance) {
            KarmaCache.instance = new KarmaCache();
        }
        return KarmaCache.instance;
    }

    public setCache(data: KarmaFeedItem[]): void {
        this.cache = data;
        this.lastFetchTime = Date.now();
    }

    public getCache(): KarmaFeedItem[] | null {
        if (!this.cache || Date.now() - this.lastFetchTime > this.CACHE_DURATION) {
            return null;
        }
        return this.cache;
    }

    public clearCache(): void {
        this.cache = null;
        this.lastFetchTime = 0;
    }
}

export default KarmaCache; 