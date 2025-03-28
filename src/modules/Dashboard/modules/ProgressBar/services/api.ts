import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes } from "@/MuLearnServices/urls";

export interface LevelFeedResponse {
  level_order: number;
  level_name: string;
  level_karma: number;
  user_karma: number;
}

export async function getUserLevelFeed(): Promise<LevelFeedResponse | null> {
  try {
    const response = await privateGateway.get(dashboardRoutes.getUserLevelFeed);
    return response.data.response;
  } catch (error) {
    console.error("Failed to fetch user level feed:", error);
    
        if (isApiError(error)) {
          console.error("API Error Response:", {
            status: error.response.status,
            data: error.response.data
          });
        }
    
    function isApiError(error: unknown): error is { response: { status: number; data: any } } {
      return typeof error === "object" && error !== null && "response" in error;
    }
    return null;
  }
}