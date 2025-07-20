import { privateGateway } from "../../../../../services/apiGateways";
import { manageLaunchpadRoutes } from "../../../../../services/urls";

export async function getJobInvites() {
  try {
    const response = await privateGateway.get(manageLaunchpadRoutes.getJobInvites);
    return response.data.response;
  } catch (error) {
    console.error("Error fetching job invites:", error);
    throw error;
  }
}

export async function applyToJob(
  application_id: string,
  resume_link: string,
  linkedin_link: string,
  portfolio_link: string,
  cover_letter: string,
  other_link: string
) {
  try {
    const response = await privateGateway.post(manageLaunchpadRoutes.applyToJob, {
      application_id,
      resume_link,
      linkedin_link,
      portfolio_link,
      cover_letter,
      other_link,
    });
    return response.data;
  } catch (error) {
    console.error("Error applying to job:", error);
    throw error;
  }
}