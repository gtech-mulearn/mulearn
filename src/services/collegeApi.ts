import { privateGateway } from "./apiGateways";
import toast from "react-hot-toast";

export const updateCollege = async (college_code: string) => {
    try {
        const response = await privateGateway.patch(
            "/api/v1/dashboard/college/change-college",
            { college_code }
        );
        if (response.status === 200 && !response.data.hasError) {
            toast.success("College updated successfully!");
            return true;
        } else {
            toast.error("Failed to update college.");
            return false;
        }
    } catch (error: any) {
        toast.error("An error occurred while updating college.");
        console.error("College Update Error:", error);
        return false;
    }
};
