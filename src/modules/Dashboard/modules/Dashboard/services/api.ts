import { publicGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes, onboardingRoutes } from "@/MuLearnServices/urls";
import toast from "react-hot-toast";

interface ApiInterestGroup {
    id: string;
    name: string;
    icon: string;
    code: string;
    category: string;
    members: number;
    updated_by: string;
    updated_at: string;
    created_by: string;
    created_at: string;
}

interface APIKarmaFeedResponse {
    hasError: boolean;
    statusCode: number;
    message: {
        general: string[];
    };
    response: {
        top_user: {
            karma: number;
            full_name: string;
            muid: string;
        };
        top_college: {
            karma: number;
            name: string;
        };
    };
}

export interface KarmaFeedItem {
    karma: number;
    user: string;
    muid?: string;
    type: "user" | "college"; 
    date?: string; 
}

export async function getDomainBasedInterestGroups(domain: string): Promise<ApiInterestGroup[]> {
    try {
        const response = await publicGateway.get(onboardingRoutes.interestGroups);
        
        if (response && response.data && response.data.response && response.data.response.interestGroup) {
            const interestGroups = response.data.response.interestGroup
                .filter((group: { category: string }) => group.category === domain)
                .map((group: { category: string }) => group); 
            
            return interestGroups; 
        }
        
        console.log("No valid interest groups found in response");
        return []; 
    } catch (error) {
        console.error("Failed to fetch interest groups:", error);
        return []; 
    }
}

export async function getKarmaFeed(): Promise<KarmaFeedItem[]> {
    try {
        const response = await publicGateway.get<APIKarmaFeedResponse>(dashboardRoutes.getKarmaFeed);
        if (response && response.data) {
            console.log("Response data:", response);

            // Transform the nested response into an array of KarmaFeedItem
            const karmaFeed: KarmaFeedItem[] = [
                {
                    karma: response.data.response.top_user.karma,
                    user: response.data.response.top_user.full_name,
                    type: "user",
                    muid: response.data.response.top_user.muid,
                },
                {
                    karma: response.data.response.top_college.karma,
                    user: response.data.response.top_college.name, 
                    type: "college",
                },
            ];
            return karmaFeed;
        }
        console.log("No valid karma feed found in response");
        return [];
    } catch (error) {
        console.error("Failed to fetch karma feed:", error);
        toast.error("Failed to fetch karma feed");
        return [];
    }
}