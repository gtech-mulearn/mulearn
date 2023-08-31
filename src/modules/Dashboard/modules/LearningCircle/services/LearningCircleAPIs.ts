import { AxiosError } from "axios";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import { createStandaloneToast } from "@chakra-ui/react";
import { SetStateAction } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

export const { toast } = createStandaloneToast();

export const getUserLearningCircles = async (
    setCircleList: UseStateFunc<LcType[] | undefined>
) => {
    try {
        const response = await privateGateway.get(
            dashboardRoutes.getCampusLearningCircles
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
            dashboardRoutes.getCampusLearningCircles + id + "/"
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
export const updateLcNote = async (id: string | undefined, note: string) => {
    try {
        const response = await privateGateway.put(
            dashboardRoutes.getCampusLearningCircles + id + "/",
            {
                note: note
            }
        );
        const message: any = response;
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            throw error;
        }
    }
};

export const getCampusLearningCircles = async (
    setCircleList: UseStateFunc<LcType[]>
) => {
    try {
        const response = await privateGateway.get(
            dashboardRoutes.createLearningCircle
        );
        const message: any = response?.data;
        console.log(message.response);

        setCircleList(message.response);
    } catch (err: unknown) {
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
        const error = err as AxiosError;
        if (error?.response) {
            throw error;
        }
        toast({
            title: "Learning Circle not creating..",
            description: "",
            status: "error",
            duration: 2000,
            isClosable: true
        });
        setTimeout(() => {
            navigate(`/dashboard/learning-circle/`);
        }, 2000);
    }
};

export const setLCMeetTime = async (
    meetTime: string,
    meetPlace: string,
    day: number[],
    id: string | undefined
) => {
    try {
        const response = await privateGateway.patch(
            dashboardRoutes.setLCMeetTime + id + "/",
            {
                meet_time: `${meetTime}`,
                meet_place: meetPlace,
                day: `${day}`
            }
        );
        const message: any = response?.data;
        toast({
            title: "Successful",
            description: "",
            status: "success",
            duration: 2000,
            isClosable: true
        });
    } catch (err) {
        const error = err as AxiosError;
        if (error?.response) {
            throw error;
        }
        toast({
            title: "Try Again..",
            description: "",
            status: "error",
            duration: 2000,
            isClosable: true
        });
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
            throw error;
        }
        toast({
            title: "Cannot send another request at the moment",
            description: "",
            status: "error",
            duration: 2000,
            isClosable: true
        });
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
    status: string
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

        toast({
            title: status,
            description: "",
            status: "success",
            duration: 2000,
            isClosable: true
        });
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
