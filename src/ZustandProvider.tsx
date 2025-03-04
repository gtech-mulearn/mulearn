import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  setUserProfile: (profile: UserProfile) => void;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  resetUserProfile: () => void;
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

export const useUserStore = create<UserStore>(
  //@ts-ignore
  persist(
    (set) => ({
      userProfile: initialUserProfile,
      setUserProfile: (profile: UserProfile) => set({ userProfile: profile }),
      updateUserProfile: (updates: Partial<UserProfile>) =>
        set((state) => ({
          userProfile: { ...state.userProfile, ...updates },
        })),
      resetUserProfile: () => set({ userProfile: initialUserProfile }),
    }),
    {
      name: "userStore", // key for localStorage
      //@ts-ignore
      getStorage: () => localStorage,
    }
  )
);
