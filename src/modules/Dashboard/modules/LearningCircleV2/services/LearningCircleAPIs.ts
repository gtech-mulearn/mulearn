import { privateGateway, publicGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes, learningCircleRoutes } from "@/MuLearnServices/urls";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { CircleMeetupInfo, LCMeetCreate, LCMeetup, LCReportInfo, LearningCircleCreate, LearningCircleInfo, LearningCircleInfoBasic, MapResult } from "./LearningCircleInterface";

const openstreetmapurl =
    "https://nominatim.openstreetmap.org/search?format=json&q=";

export const getLcReportInfo = async (
    meet_id: string
): Promise<LCReportInfo | null> => {
    try {
        const response = await privateGateway.get(
            learningCircleRoutes.getLcReportInfo + meet_id
        );
        return response.data.response;
    } catch (err) {
        const error = err as AxiosError;
        toast.error(
            ((error?.response?.data as any)?.message?.general ?? [
                "Unexpected error occured."
            ])[0]
        );
        return null;
    }
};

export const submitLcReport = async (
    meet_id: string,
    report: string,
    attendees: Record<string, boolean>
): Promise<boolean> => {
    try {
        const response = await privateGateway.post(
            learningCircleRoutes.getLcReportInfo + meet_id,
            {
                report: report,
                attendees: attendees
            }
        );
        if (response.status === 200) {
            toast.success(
                [response.data?.message?.general ?? "Report Submited.."][0]
            );
            return true;
        }
        toast.error(
            (response.data?.message?.general ?? ["Unable to submit report."])[0]
        );
        return false;
    } catch (err) {
        const error = err as AxiosError;
        console.log(error);
        toast.error(
            ((error.response as any)?.data?.message?.general ?? [
                "Unable to join learning circle."
            ])[0]
        );
        return false;
    }
};

export const searchCoordinates = async (
    searchString: string
): Promise<MapResult[]> => {
    try {
        const url = openstreetmapurl + searchString;
        const response = await fetch(url);
        return await response.json();
    } catch (e) {
        console.log(e);
        return [];
    }
};

export const joinMeetup = async (
    meetId: string,
    meetCode: string | null = null
): Promise<boolean> => {
    try {
        const response = await privateGateway.post(
            learningCircleRoutes.joinMeetup + meetId,
            { meet_code: meetCode }
        );
        if (response.status === 200) {
            toast.success(
                [
                    response.data?.message?.general ??
                        "Joined learning circle successfully"
                ][0]
            );
            return true;
        }
        toast.error(
            (response.data?.message?.general ?? [
                "Unable to join learning circle."
            ])[0]
        );
        return false;
    } catch (err) {
        const error = err as AxiosError;
        console.log(error);
        toast.error(
            ((error.response as any)?.data?.message?.general ?? [
                "Unable to join learning circle."
            ])[0]
        );
        return false;
    }
};

export const unsaveMeetup = async (meetId: string): Promise<boolean> => {
    try {
        const response = await privateGateway.delete(
            learningCircleRoutes.joinMeetup + meetId
        );
        if (response.status === 200) {
            toast.success(
                [
                    response.data?.message?.general ??
                        "Unsaved learning circle successfully"
                ][0]
            );
            return true;
        }
        toast.error(
            (response.data?.message?.general ?? [
                "Unable to unsave learning circle."
            ])[0]
        );
        return false;
    } catch (err) {
        const error = err as AxiosError;
        console.log(error);
        toast.error(
            ((error.response as any)?.data?.message?.general ?? [
                "Unable to unsave learning circle."
            ])[0]
        );
        return false;
    }
};

export const getMeetups = async (
    category: string | null = null,
    saved: boolean = false,
    participated: boolean = false
): Promise<CircleMeetupInfo[]> => {
    try {
        const response = await privateGateway.get(
            learningCircleRoutes.getMeetups,
            {
                params: {
                    category: category,
                    saved: saved,
                    participated: participated
                }
            }
        );
        return response.data.response;
    } catch (err) {
        const error = err as AxiosError;
        console.log(error);
        return [];
    }
};

export const submitAttendeeReport = async ({
    meetId,
    data
}: {
    meetId: string;
    data: {
        report: string;
        report_link: string;
    };
}) => {
    try {
        const response = await privateGateway.post(
            learningCircleRoutes.submitAttendeeReport + meetId,
            data
        );
        return response.data;
    } catch (err) {
        const error = err as AxiosError;
        toast.error(
            ((error?.response as any)?.data?.message?.general ?? [
                "Unable to submit report."
            ])[0]
        );
        return false;
    }
};

export const getMeetupInfo = async (
    meetId: string
): Promise<LCMeetup | null> => {
    try {
        const response = await privateGateway.get(
            learningCircleRoutes.getMeetupInfo + meetId
        );
        return response.data.response;
    } catch (err) {
        const error = err as AxiosError;
        console.log(error);
        return null;
    }
};

export const getCreatedLearningCircles = async (): Promise<
    LearningCircleInfoBasic[]
> => {
    try {
        const response = await privateGateway.get(
            learningCircleRoutes.getCreatedLearningCircles
        );
        return response.data.response;
    } catch (err) {
        const error = err as AxiosError;
        toast.error(
            ((error?.response as any)?.data?.message?.general ?? [
                "Unable to fetch learning circles."
            ])[0]
        );
        return [];
    }
};

export const getLearningCircleInfo = async (
    circleId: string
): Promise<LearningCircleInfo | null> => {
    try {
        const response = await privateGateway.get(
            learningCircleRoutes.getLearningCircleInfo + circleId
        );
        return response.data.response;
    } catch (err) {
        const error = err as AxiosError;
        console.log(error);
        return null;
    }
};

export const createLearningCircle = async (
    params: LearningCircleCreate
): Promise<string |boolean> => {
    try {
        const response = await privateGateway.post(
            learningCircleRoutes.createLearningCircle,
            params
        );
        if (response.status === 200) {
            if (response.data?.response?.circle_id) {
                return response.data?.response?.circle_id;
            }
            toast.success(
                [
                    response.data?.message?.general ??
                        "Learning circle created successfully"
                ][0]
            );
            return true;
        }
        toast.error(
            (response.data?.message?.general ?? [
                "Unable to create learning circle."
            ])[0]
        );
        return false;
    } catch (err) {
        const error = err as AxiosError;
        console.log(error);
        return false;
    }
};

export const scheduleMeetup = async (
    params: LCMeetCreate
): Promise<boolean> => {
    try {
        const response = await privateGateway.post(
            learningCircleRoutes.scheduleMeetup,
            params
        );
        if (response.status === 200) {
            toast.success(
                [
                    response.data?.message?.general ??
                        "Meetup scheduled successfully"
                ][0]
            );
            return true;
        }
        toast.error(
            (response.data?.message?.general ?? [
                "Unable to schedule meetup."
            ])[0]
        );
        return false;
    } catch (err) {
        const error = err as AxiosError;
        console.log(error);
        return false;
    }
};

export const getInterestGroups = async () => {
    try {
        const response = (await privateGateway.get(dashboardRoutes.getCampusIg))
            ?.data?.response.interestGroup as { id: string; name: string }[];
        return response?.map(obj => ({
            value: obj.id,
            label: obj.name
        }));
    } catch (err) {
        const error = err as AxiosError;
        if (error?.response) {
            throw error;
        }
    }
};
