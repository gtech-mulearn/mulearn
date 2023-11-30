import { AxiosError } from "axios";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import { createStandaloneToast } from "@chakra-ui/react";
import { SetStateAction } from "react";
import { NavigateFunction } from "react-router-dom";
export const { toast } = createStandaloneToast();

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

export const getLcDetails = async (
    setCircleList: UseStateFunc<LcDetail | undefined>,
    id: string | undefined
) => {
    try {
        const response = (await privateGateway.get(
            dashboardRoutes.lc + id + "/details/"
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
            dashboardRoutes.lc + data.id + "/details/",
            data
        );
        const message: any = response;
		return message
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
        toast({
            title: "Learning Circle Created",
            description: "",
            status: "success",
            duration: 2000,
            isClosable: true
        });
        setTimeout(() => {
            navigate(
                `/dashboard/learning-circle/details/${message.response.circle_id}`
            );
        }, 2000);
    } catch (err) {
        const error: any = err as AxiosError;
        if (error?.response) {
            toast({
                title: `${error.response.data.message.non_field_errors}`,
                description: "",
                status: "error",
                duration: 2000,
                isClosable: true
            });
            console.log(error.response.data);
        } else {
            toast({
                title: "Something went wrong, learning Circle was not created",
                description: "",
                status: "error",
                duration: 2000,
                isClosable: true
            });
            setTimeout(() => {
                navigate(`/dashboard/learning-circle/`);
            }, 2000);
        }
    }
};

export const setLCMeetTime = async (data: LcMeetSchedule, id: string | undefined) => {
    try {
        const response = await privateGateway.put(
            dashboardRoutes.lc + id + "/schedule-meet/",
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

export const joinCircle = async (circleCode: string) => {
    try {
        const response = await privateGateway.post(
            dashboardRoutes.joinLearningCircle + circleCode + "/"
        );

        toast({
            title: "Wait for approval",
            description: "",
            status: "warning",
            duration: 2000,
            isClosable: true
        });
    } catch (err) {
        const error = err as AxiosError;
        if (error?.response) {
            toast({
                title: `${error.response.data}`,
                description: "",
                status: "error",
                duration: 2000,
                isClosable: true
            });
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

export const approveLcUser = async (
    circleId: string | undefined,
    memberId: string,
    flag: number,
    message?: string
) => {
    try {
        const response = await privateGateway.patch(
            dashboardRoutes.getCampusLearningCircles +
                circleId +
                "/" +
                memberId +
                "/",
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

export const leaveLc = async (
    circleId: string | undefined,
    memberId: string,
    navigate: NavigateFunction
) => {
    try {
        const response = await privateGateway.delete(
            dashboardRoutes.getCampusLearningCircles + circleId + "/"
        );
        toast({
            title: "Success",
            description: "",
            status: "success",
            duration: 2000,
            isClosable: true
        });
        navigate("/dashboard/learning-circle/");
    } catch (err) {
        const error = err as AxiosError;
        if (error?.response) {
            throw error;
        }
        toast({
            title: "Something went wrong",
            description: "",
            status: "error",
            duration: 2000,
            isClosable: true
        });
    }
};

export const removeMember = async (
    circleId: string | undefined,
    memberId: string,
    navigate?: NavigateFunction
) => {
    try {
        const response = await privateGateway.post(
            dashboardRoutes.getCampusLearningCircles +
                circleId +
                "/" +
                memberId +
                "/"
        );
		const message = response.data;
		return message
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
    navigate: NavigateFunction
) => {
    try {
        const response = await privateGateway.patch(
            dashboardRoutes.getLearningCirclesLead +
                circleId +
                "/" +
                memberId +
                "/"
        );
        toast({
            title: "Success",
            description: "",
            status: "success",
            duration: 2000,
            isClosable: true
        });
        window.location.reload();
       
    } catch (err) {
        const error = err as AxiosError;
        if (error?.response) {
            throw error;
        }
        toast({
            title: "Something went wrong",
            description: "",
            status: "error",
            duration: 2000,
            isClosable: true
        });
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
        toast({
            title: "Enter circle code",
            status: "info",
            duration: 2000,
            isClosable: true
        });
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
                toast({
                    description: error,
                    status: "error",
                    duration: 2000,
                    isClosable: true
                });
            }
            setIsLoading(false); // Set isLoading to false
        });
};



export const reportMeeting = async (id: string | undefined, data: {
    agenda: string;
    attendees: string;
    day: string;
    meet_time: string;
}) => {
    try {
        const response = await privateGateway.post(
            dashboardRoutes.lc + id + "/report/create/",
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

export const getLCMeetingReport = async (reportId: string | undefined, circleId: string | undefined) => {
    try {
        const response = await privateGateway.get(
            dashboardRoutes.lc + circleId + "/report/" + reportId + "/show/",
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