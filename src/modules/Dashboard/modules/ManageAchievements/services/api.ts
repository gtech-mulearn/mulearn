import { privateGateway } from "@/MuLearnServices/apiGateways"
import { qseverseRoutes } from "@/MuLearnServices/urls"
import toast from "react-hot-toast"
import { AchievementData } from "../ManageAchievementsInterface";

export const getAchievements = async (): Promise<AchievementData[] | undefined> => {
    try {
        const response = await privateGateway.get<{ response: AchievementData[] }>(
            qseverseRoutes.getAchievements
        );
        if (response.status === 200) {
            console.log(response, "achievement response")
            return response.data.response;
        }
    } catch (error) {
        console.error("Error fetching achievements:", error);
    }
};

/**
 * Helper function to build FormData from AchievementData
 * This handles file uploads and proper data formatting for the backend
 */
const buildAchievementFormData = (data: AchievementData): FormData => {
    const formData = new FormData();
    
    // Required fields
    formData.append("name", data.title || data.name || "");
    formData.append("description", data.description || "");
    formData.append("type", data.type || "");
    formData.append("has_vc", String(data.has_vc ?? data.vcToken ?? false));
    formData.append("tags", JSON.stringify(data.tags || []));
    
    // Optional fields
    if (data.level_id) {
        formData.append("level_id", data.level_id);
    }
    if (data.template_id) {
        formData.append("template_id", data.template_id);
    }
    
    // Icon handling: file upload takes priority over URL
    if (data.iconFile) {
        formData.append("icon", data.iconFile);
    } else if (data.icon) {
        formData.append("icon", data.icon);
    }
    
    return formData;
};

export const createAchievements = async (data: AchievementData): Promise<AchievementData | undefined> => {
    try {
        const formData = buildAchievementFormData(data);
        
        const response = await privateGateway.post<{ data: AchievementData }>(
            qseverseRoutes.createAchievements, 
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        if (response.status === 200) {
            //@ts-ignore
            return response.data.response;
        }
    } catch (error) {
        console.error("Error creating achievement:", error);
        toast.error("Failed to create achievement");
    }
};

export const updateAchievements = async (data: AchievementData | FormData, id?: string): Promise<AchievementData | undefined> => {
    try {
        const formData = buildAchievementFormData(data);
        
        const response = await privateGateway.put<{ data: AchievementData }>(
            qseverseRoutes.updateAchievements + `${data.id}`, 
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        if (response.status === 200) {
            //@ts-ignore
            return response.data.response;
        }
    } catch (error) {
        console.error("Error updating achievement:", error);
        toast.error("Failed to update achievement");
    }
};

export const deleteAchievements = async (id: string): Promise<void> => {
    try {
        const response = await privateGateway.delete(qseverseRoutes.deleteAchievements + `${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        });
        console.log("Deleting at URL:", qseverseRoutes.deleteAchievements + `${id}`);
        if (response.status === 200) {
            toast.success("Achievement deleted successfully");
        }
    } catch (error) {
        toast.error("Failed to delete achievement");
    }
};

