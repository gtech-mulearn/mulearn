import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getKarmaFeed, KarmaFeedItem } from "@/modules/Dashboard/modules/Dashboard/services/api";

export interface InterestGroup {
  id: string;
  name: string;
  karma: number;
}

export interface KarmaDistribution {
  task_type: string;
  karma: number;
}

export interface UserProfile {
  full_name: string;
  first_name: string;
  college_code: string;
  college_id: string;
  org_district_id: string;
  interest_groups: InterestGroup[];
  karma_distribution: KarmaDistribution[];
  gender: string;
  id: string;
  joined: string;
  karma: number;
  rank: number;
  muid: string;
  level: string;
  profile_pic: string;
  is_public: boolean;
  percentile: number;
  roles: string[];
}

interface UserStore {
  userProfile: UserProfile;
  userInfo: UserInfo; 
  setUserProfile: (profile: UserProfile) => void;
  setUserInfo: (info: UserInfo) => void;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  updateUserInfo: (updates: Partial<UserInfo>) => void;
  resetUserProfile: () => void;
  resetUserInfo: () => void;
}

const initialUserProfile: UserProfile = {
  full_name: "",
  first_name: "",
  college_code: "",
  college_id: "",
  org_district_id: "",
  interest_groups: [{ id: "", name: "", karma: 0 }],
  karma_distribution: [{ task_type: "", karma: 0 }],
  gender: "",
  id: "",
  joined: "",
  karma: 0,
  rank: 0,
  muid: "",
  level: "",
  profile_pic: "",
  is_public: false,
  percentile: 0,
  roles: [],
};

const initialUserInfo: UserInfo = {
  muid: "",
  full_name: "",
  email: "",
  mobile: "",
  gender: null,
  dob: null,
  active: false,
  interest_selected: "",
  joined: "",
  exist_in_guild: false,
  roles: [],
  dynamic_type: [],
  profile_pic: "",
  user_domains: [],
  user_endgoals: [],
};

export const useUserStore = create<UserStore>(
  //@ts-ignore
  persist(
    (set) => ({
      userProfile: initialUserProfile,
      userInfo: initialUserInfo,
      setUserProfile: (profile: UserProfile) => set({ userProfile: profile }),
      setUserInfo: (info: UserInfo) => set({ userInfo: info }),
      updateUserProfile: (updates: Partial<UserProfile>) =>
        set((state) => ({
          userProfile: { ...state.userProfile, ...updates },
        })),
      updateUserInfo: (updates: Partial<UserInfo>) =>
        set((state) => ({
          userInfo: { ...state.userInfo, ...updates },
        })),
      resetUserProfile: () => set({ userProfile: initialUserProfile }),
      resetUserInfo: () => set({ userInfo: initialUserInfo }),
    }),
    {
      name: "userStore",
      //@ts-ignore
      getStorage: () => localStorage,
    }
  )
);

interface StatStore {
  karmaFeed: KarmaFeedItem[] | null; // Store karmaFeed data
  isKarmaFeedLoading: boolean; // Track loading state
  fetchKarmaFeed: () => Promise<void>; // Function to fetch karmaFeed
}

export const useStatStore = create<StatStore>(
  //@ts-ignore
  persist(
    (set) => ({
      karmaFeed: null, // Initially null
      isKarmaFeedLoading: false, // Initially not loading

      // Fetch karma feed from the API and update the store
      fetchKarmaFeed: async () => {
        set({ isKarmaFeedLoading: true }); // Set loading to true
        try {
          const response = await getKarmaFeed(); // Fetch data from the API
          if (response) {
            set({ karmaFeed: response }); // Update the store with fetched data
          } else {
            set({ karmaFeed: [] }); // Fallback to an empty array
          }
        } catch (error) {
          console.error("Failed to fetch karma feed:", error);
          set({ karmaFeed: [] }); // Fallback to an empty array
        } finally {
          set({ isKarmaFeedLoading: false }); // Set loading to false
        }
      },
    }),
    {
      name: "statStore", // Name of the persisted store
      // @ts-ignore
      getStorage: () => localStorage, // Use localStorage for persistence
    }
  )
);