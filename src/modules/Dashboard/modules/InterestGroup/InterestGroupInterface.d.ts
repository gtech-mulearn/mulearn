interface IGData {
    name: string;
    code: string;
    icon: string;
    category: string;
}

interface InterestGroup {
    id: string;
    name: string;
    karma: number;
  }
  
  interface KarmaDistribution {
    task_type: string;
    karma: number;
  }
  
  interface IGUserInfo {
    college_code: string;
    college_id: string;
    full_name: string;
    gender: string | null;
    id: string;
    interest_groups: InterestGroup[];
    is_public: boolean;
    joined: string; // ISO date string, e.g. "2023-10-29T06:41:10Z"
    karma: number;
    karma_distribution: KarmaDistribution[];
    level: string;
    muid: string;
    org_district_id: string;
    percentile: number;
    profile_pic: string;
    rank: number;
    roles: string[];
  }
