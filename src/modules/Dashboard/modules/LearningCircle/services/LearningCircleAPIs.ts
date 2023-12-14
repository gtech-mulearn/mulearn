import { AxiosError } from "axios";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import { SetStateAction } from "react";
import { NavigateFunction } from "react-router-dom";
import { dynamicRoute, lcRoutes } from "@/MuLearnServices/endpoints";

import { toast } from "react-hot-toast";

export const getUserLearningCircles = async (
    setCircleList: UseStateFunc<LcType[] | undefined>
) => {
    try {
        const response = await privateGateway.get(
            dashboardRoutes.getCampusLearningCircles + "user-list/"
        );
        const message: any = response?.data;
        setCircleList(message.response);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            throw error;
        }
    }
};

export const getUserOrg = (setOrg: {
    (value: SetStateAction<string | null>): void;
    (arg0: any): void;
}) => {
    privateGateway
        .get(dashboardRoutes.getUserProfile)
        .then(response => {
            const message: any = response?.data;
            setOrg(message.response.college_id);
        })
        .catch(error => {
            console.log(error);
        });
};

export const getCampusLearningCircles = async (
    setCircleList: UseStateFunc<LcType[]>,
    setIsLoading: (isLoading: boolean) => void,
    org?: string | null
) => {
    setIsLoading(true);
    try {
        const response = await privateGateway.post(
            dashboardRoutes.listLearningCircle,
            {
                org_id: org
            }
        );
        const message: any = response?.data;

        setCircleList(message.response);
        setIsLoading(false);
    } catch (err: unknown) {
        setIsLoading(false);
        const error = err as AxiosError;
        if (error?.response) {
            throw error;
        }
    }
};

export const createCircle = async (
    setId: React.Dispatch<SetStateAction<string>>,
    circleName: string,
    ig: string,
    navigate: NavigateFunction
) => {
    try {
        const response = await privateGateway.post(
            dashboardRoutes.createLearningCircle,
            {
                name: circleName,
                ig: ig
            }
        );
        const message: any = response?.data;
        setId(message.response.circle_id);
        toast.success("Learning Circle Created");
        setTimeout(() => {
            navigate(
                `/dashboard/learning-circle/dashboard/${message.response.circle_id}`
            );
        }, 2000);
    } catch (err) {
        const error: any = err as AxiosError;
        if (error?.response) {
            toast.error(`${error.response.data.message.non_field_errors}`);
        } else {
            toast.error(
                "Something went wrong, learning Circle was not created"
            );
            setTimeout(() => {
                navigate(`/dashboard/learning-circle/`);
            }, 2000);
        }
    }
};

export const joinCircle = async (circleCode: string) => {
    try {
        const response = await privateGateway.post(
            dashboardRoutes.joinLearningCircle + circleCode + "/"
        );

        toast.success("Waiting for approval");
    } catch (err) {
        const error = err as AxiosError;
        if (error?.response) {
            toast.error(`${error.response.data}`);
        }
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

export const leaveLc = async (
    circleId: string | undefined,
    memberId: string,
    navigate: NavigateFunction
) => {
    try {
        const response = await privateGateway.delete(
            dashboardRoutes.getCampusLearningCircles + circleId + "/"
        );

        toast.success("Learning Circle Left");
        navigate("/dashboard/learning-circle/");
    } catch (err) {
        const error = err as AxiosError;
        if (error?.response) {
            throw error;
        }

        toast.error("Something went wrong, learning Circle was not left");
    }
};

export const searchLearningCircleWithCircleCode = (
    setLc: UseStateFunc<LcType[]>,
    circleCode: string,
    lc: LcType[],
    setIsLoading: (isLoading: boolean) => void
) => {
    setIsLoading(true);
    if (circleCode === "") {
        if (lc.length === 1) {
            getCampusLearningCircles(setLc, setIsLoading);
        }
        toast.error("Enter circle code");
        return;
    }
    const regex = /[^a-zA-Z0-9]/g;
    const circleCodeStrippedCapitailize = circleCode
        .replace(regex, "")
        .toUpperCase();

    privateGateway
        .post(
            `${dashboardRoutes.searchLearningCircleWithCircleCode}${circleCodeStrippedCapitailize}/`
        )
        .then(res => res.data.response)
        .then(data => {
            setLc(data);
            setIsLoading(false); // Set isLoading to false
        })
        .catch(err => {
            for (let error of err.response?.data?.message?.general) {
                toast.error(error);
            }
            setIsLoading(false); // Set isLoading to false
        });
};

//! New LC APIs ---------------------------------------------------------------------------->
export const getLcDetails = async (
    setCircleList: UseStateFunc<LcDetail | undefined>,
    id: string | undefined
) => {
    try {
        const response = (await privateGateway.get(
            dynamicRoute(lcRoutes.getDetailsUpdateNote, id as string)
        )) as APIResponse<LcDetail & { day: string }>;

        const message = response.data.response;

        if (message.day) {
            const dayArray = message.day
                .split(",")
                .map((x: string) => parseInt(x));
            setCircleList({ ...message, day: dayArray });
        } else {
            setCircleList(message);
        }
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            throw error;
        }
    }
};

export const updateLcNote = async (data: LcNote) => {
    try {
        const response = await privateGateway.put(
            dynamicRoute(lcRoutes.getDetailsUpdateNote, data.id as string),
            data
        );
        const message: any = response;
        return message;
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            throw error;
        }
    }
};

export const setLCMeetTime = async (
    data: LcMeetSchedule,
    id: string | undefined
) => {
    try {
        const response = await privateGateway.put(
            dynamicRoute(lcRoutes.scheduleMeet, id as string),
            data
        );
        const message: any = response?.data;
        return message;
    } catch (err) {
        const error = err as AxiosError;
        if (error?.response) {
            throw error;
        }
    }
};

export const reportMeeting = async (id: string | undefined, data: FormData) => {
    try {
        const response = await privateGateway.post(
            dynamicRoute(lcRoutes.createReport, id as string),
            data,
            {
                maxBodyLength: Infinity,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );
        const message: any = response?.data;
        return message;
    } catch (err) {
        const error = err as AxiosError;
        if (error?.response) {
            throw error;
        }
    }
};

export const getLCMeetingReport = async (
    reportId: string | undefined,
    circleId: string | undefined
) => {
    try {
        const response = await privateGateway.get(
            dynamicRoute(
                lcRoutes.getReport,
                circleId as string,
                reportId as string
            )
        );
        const message: any = response?.data;
        return message.response;
    } catch (err) {
        const error = err as AxiosError;
        if (error?.response) {
            throw error;
        }
    }
};

export const transferLead = async (
    circleId: string | undefined,
    memberId: string,
    navigate?: any
) => {
    try {
        const response = await privateGateway.patch(
            dynamicRoute(lcRoutes.transferLead, circleId as string, memberId)
        );
        const message = response.data;
        return message;
    } catch (err) {
        const error = err as AxiosError;
        if (error?.response) {
            throw error;
        }
    }
};

export const approveLcUser = async (
    circleId: string | undefined,
    memberId: string,
    flag: number,
    message?: string
) => {
    try {
        const response = await privateGateway.patch(
            dynamicRoute(
                lcRoutes.approveRejectRemoveUser,
                circleId as string,
                memberId
            ),
            {
                is_accepted: flag
            }
        );
        const message = response.data;
        return message;
    } catch (err) {
        const error = err as AxiosError;
        if (error?.response) {
            throw error;
        }
    }
};

export const removeMember = async (
    circleId: string | undefined,
    memberId: string,
    navigate?: any
) => {
    try {
        const response = await privateGateway.post(
            dynamicRoute(
                lcRoutes.approveRejectRemoveUser,
                circleId as string,
                memberId
            )
        );
        const message = response.data;
        return message;
    } catch (err) {
        const error = err as AxiosError;
        if (error?.response) {
            throw error;
        }
    }
};
