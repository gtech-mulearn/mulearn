import { privateGateway } from "../../../../../services/apiGateways";
import { manageLaunchpadRoutes } from "../../../../../services/urls";

export async function getCompanies(){
    try{
        const response = await privateGateway.get(manageLaunchpadRoutes.listCompanies);
        console.log("Companies fetched successfully:", response.data);
        return response;
    }
    catch (error) {
        console.error('Failed to fetch companies:', error);
        throw error;
    }
}

export async function verifyCompany(companyId: string): Promise<boolean> {
    try {
        const response = await privateGateway.post(manageLaunchpadRoutes.verifyCompany, { company_id: companyId });
        return response.data.statusCode === 200;
    } catch (error) {
        console.error('Failed to verify company:', error);
        return false;
    }
}

export async function getJobListings() {
    try {
        const response = await privateGateway.get(manageLaunchpadRoutes.listJobListings);
        console.log("Job listings fetched successfully:", response.data.response);
        return response.data.response;
    } catch (error) {
        console.error('Failed to fetch job listings:', error);
        throw error;
    }
}

export async function verifyLaunchpadTask(
  taskId: string,
  hashtag: string,
  isVerified: boolean
): Promise<boolean> {
  try {
    const response = await privateGateway.post(manageLaunchpadRoutes.verifyLaunchpadTask, {
      task_id: taskId,
      hashtag: hashtag,
      is_verified: isVerified,
    });
    return response.data.statusCode === 200;
  } catch (error) {
    console.error('Failed to verify launchpad task:', error);
    return false;
  }
}