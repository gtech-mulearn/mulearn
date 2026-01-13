import { AxiosError } from "axios";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { skillRoutes } from "@/MuLearnServices/urls";
import toast from "react-hot-toast";
import { SkillData, SkillsResponse } from "../SkillInterface";

export const getSkills = async (
    page: number = 1,
    perPage: number = 20,
    search: string = "",
    sortBy: string = "name"
): Promise<SkillsResponse | null> => {
    try {
        const isAsc = !sortBy.startsWith("-");
        const sortField = isAsc ? sortBy : sortBy.slice(1);
        
        const response = await privateGateway.get(skillRoutes.getSkills, {
            params: {
                pageIndex: page,
                perPage: perPage,
                search: search,
                sortBy: sortField,
                isAsc: isAsc
            }
        });
        return response.data.response;
    } catch (err: unknown) {
        const error = err as AxiosError;
        console.error("Error fetching skills:", error);
        return null;
    }
};

export const getSkillDetail = async (skillId: string): Promise<SkillData | null> => {
    try {
        const response = await privateGateway.get(
            `${skillRoutes.getSkillDetail}${skillId}/`
        );
        return response.data.response;
    } catch (err: unknown) {
        const error = err as AxiosError;
        console.error("Error fetching skill detail:", error);
        return null;
    }
};

export const createSkill = async (data: Partial<SkillData>): Promise<SkillData | null> => {
    try {
        const response = await privateGateway.post(skillRoutes.createSkill, data);
        toast.success("Skill created successfully");
        return response.data.response;
    } catch (err: unknown) {
        const error = err as AxiosError;
        const errorMessage = (error.response?.data as any)?.message?.general_message || "Failed to create skill";
        toast.error(errorMessage);
        console.error("Error creating skill:", error);
        return null;
    }
};

export const updateSkill = async (
    skillId: string,
    data: Partial<SkillData>
): Promise<SkillData | null> => {
    try {
        const response = await privateGateway.put(
            `${skillRoutes.updateSkill}${skillId}/`,
            data
        );
        toast.success("Skill updated successfully");
        return response.data.response;
    } catch (err: unknown) {
        const error = err as AxiosError;
        const errorMessage = (error.response?.data as any)?.message?.general_message || "Failed to update skill";
        toast.error(errorMessage);
        console.error("Error updating skill:", error);
        return null;
    }
};

export const deleteSkill = async (skillId: string): Promise<boolean> => {
    try {
        await privateGateway.delete(`${skillRoutes.deleteSkill}${skillId}/`);
        toast.success("Skill deleted successfully");
        return true;
    } catch (err: unknown) {
        const error = err as AxiosError;
        const errorMessage = (error.response?.data as any)?.message?.general_message || "Failed to delete skill";
        toast.error(errorMessage);
        console.error("Error deleting skill:", error);
        return false;
    }
};

export const getSkillDropdown = async (): Promise<{ id: string; name: string; code: string }[]> => {
    try {
        const response = await privateGateway.get(skillRoutes.getSkillDropdown);
        return response.data.response || [];
    } catch (err: unknown) {
        const error = err as AxiosError;
        console.error("Error fetching skill dropdown:", error);
        return [];
    }
};
