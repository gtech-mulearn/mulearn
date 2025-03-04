import axios, { AxiosError } from "axios";
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

export const joinMeetup = async (meetId: string) => {
    try {
        const response = await privateGateway.post(
            dynamicRoute(dashboardRoutes.joinMeetup, meetId)
        );
        const message: any = response?.data;
        toast.success(message.message?.general[0] ?? "Failed to join meetup");
    } catch (err: unknown) {
        const error = err as AxiosError;
        toast.error(
            ((error?.response?.data as any).message?.general ?? [
                "Failed to join meetup"
            ])[0]
        );
        if (error?.response) {
            throw error;
        }
        toast.error("Failed to join meetup");
    }
};

export const interestedMeetup = async (
    meetId: string,
    undo: boolean = false
) => {
    try {
        if (undo) {
            const response = await privateGateway.delete(
                dynamicRoute(dashboardRoutes.interestedMeetup, meetId)
            );
            const message: any = response?.data;
            toast.success(
                message.message?.general[0] ?? "Failed to undo interest"
            );
            return;
        }
        const response = await privateGateway.post(
            dynamicRoute(dashboardRoutes.interestedMeetup, meetId)
        );
        const message: any = response?.data;
        toast.success(message.message?.general[0] ?? "Failed to show interest");
    } catch (err: unknown) {
        console.log(err);
        const error = err as AxiosError;
        toast.error(
            ((error?.response?.data as any).message?.general ?? [
                "Failed to show interest"
            ])[0]
        );
        if (error?.response) {
            throw error;
        }
        toast.error("Failed to show interest");
    }
};

export const getMeetupInfo = async (
    setMeetup:
        | UseStateFunc<LcMeetupInfo[] | undefined>
        | UseStateFunc<LcMeetupDetailInfo | undefined>,
    meetId: string
) => {
    try {
        console.log(meetId);
        const response = await privateGateway.get(
            dynamicRoute(dashboardRoutes.getMeetupInfo, meetId)
        );
        console.log(response);
        const message: any = response?.data;
        setMeetup(message.response);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            throw error;
        }
    }
};

export const submitAttendeeTaskImage = async (
    meetId: string,
    taskId: string,
    formData: FormData
) => {
    try {
        const response = await privateGateway.post(
            dynamicRoute(
                dashboardRoutes.submitAttendeeTaskImage,
                meetId,
                taskId
            ),
            formData,
            {
                headers: {
                    "content-type": "multipart/form-data"
                }
            }
        );
        console.log(response);
        const message: any = response?.data?.message?.general[0];
        toast.success(message);
        return true;
    } catch (err: unknown) {
        const error = err as AxiosError;
        if ((error?.response?.data as any)?.message?.general[0]) {
            toast.error((error?.response?.data as any)?.message?.general[0]);
        }
        console.log(error);
        return false;
    }
};

export const submitAttendeeReport = async (
    meetId: string,
    formData: FormData
) => {
    try {
        console.log(meetId);
        const response = await privateGateway.post(
            dynamicRoute(dashboardRoutes.submitAttendeeReport, meetId),
            formData
        );
        console.log(response);
        const message: any = response?.data;
        toast.success(message.message?.general[0] ?? "Failed to submit report");
    } catch (err: unknown) {
        const error = err as AxiosError;
        toast.error((error?.response?.data as any)?.message?.general[0]);
        if (error?.response) {
            throw error;
        }
    }
};
export const getMeetups = async (
    setMeetup:
        | UseStateFunc<LcMeetupInfo[] | undefined>
        | UseStateFunc<LcMeetupInfo | undefined>,
    meetId: string | undefined = undefined,
    userId: string | undefined = undefined,
    category: string | undefined = undefined
) => {
    try {
        console.log(meetId);
        const response = await privateGateway.get(
            dashboardRoutes.getMeetups + (userId ? userId : ""),
            {
                params: meetId
                    ? {
                          meet_id: meetId
                      }
                    : category
                    ? {
                          category: category
                      }
                    : {}
            }
        );
        console.log(response);
        const message: any = response?.data;
        setMeetup(message.response);
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

export const getMeetupAttendees = async (id: string | undefined) => {
    try {
        console.log(dynamicRoute(lcRoutes.getLcAttendees, id as string));
        const response = await privateGateway.get(
            dynamicRoute(lcRoutes.getLcAttendees, id as string)
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

export const getLcMeetups = async (id: string | undefined) => {
    try {
        const response = await privateGateway.get(
            dynamicRoute(lcRoutes.getLcMeetups, id as string)
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

export const createMeetup = async (data: LcMeetup, id: string) => {
    try {
        const response = await privateGateway.post(
            dynamicRoute(lcRoutes.createMeet, id as string),
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

export const getVerifiableMeetups = async () => {
    try {
        const response = await privateGateway.get(lcRoutes.verifyList);
        const message: any = response?.data;
        return message.response;
    } catch (err) {
        const error = err as AxiosError;
        toast.error("Failed to get list of meetups.");
        if (error?.response) {
            throw error;
        }
    }
};

export const fetchURLQRCode = async (setBlob: any, target_url: string) => {
    try {
        const url = `https://quickchart.io/qr?text=${target_url}&centerImageUrl=https://avatars.githubusercontent.com/u/98015594?s=88&v=4`;
        const response = await axios
            .get(url, {
                responseType: "arraybuffer"
            })
            .then(response => {
                const blob = new Blob([response.data], {
                    type: "image/png"
                });
                setBlob(URL.createObjectURL(blob));
            });
    } catch (error) {
        console.error(error);
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
