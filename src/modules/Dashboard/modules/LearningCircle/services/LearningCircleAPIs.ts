import { AxiosError } from "axios";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import { createStandaloneToast } from "@chakra-ui/react";

export const { toast } = createStandaloneToast();

export const getUserLearningCircles = async (
    setCircleList: UseStateFunc<LcType[] | undefined>
) => {
    try {
        const response = await privateGateway.get(
            dashboardRoutes.getCampusLearningCircles
        );
        const message: any = response?.data;
        console.log(message.response);
        setCircleList(message.response);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

export const getLcDetails = async (
    setCircleList: UseStateFunc<LcDetail | undefined>,
    id: string | undefined
) => {
    try {
        console.log("Sheyday");
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
            console.log(error.response);
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
        console.log(message.response);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
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
            console.log(error.response);
        }
    }
};

export const createCircle = async (
    setId: UseStateFunc<string>,
    circleName: string,
    circleCode: string,
    ig: string
) => {
    try {
        const response = await privateGateway.post(
            dashboardRoutes.createLearningCircle,
            {
                name: circleName,
                ig: ig,
                /*
                ! circle_code required data ith udayippu aanu back-end fix cheyanam contact aashish
				*/
                circle_code: `${
                    Math.floor(Math.random() * (999999999 - 1 + 1)) + 1
                }`
            }
        );
        const message: any = response?.data;
        console.log(message.response);
        console.log(response);
        setId(message.response);
        toast({
            title: "Learning Circle Created",
            description: "",
            status: "success",
            duration: 2000,
            isClosable: true
        });
    } catch (err) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
        toast({
            title: "Learning Circle not creating..",
            description: "",
            status: "error",
            duration: 2000,
            isClosable: true
        });
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
        console.log(message.response);
        console.log(response);
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
            console.log(error.response);
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

        console.log(response);
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
            console.log(error.response);
        }
        toast({
            title: "You cannot join the same Learning Circle again",
            description: "",
            status: "error",
            duration: 2000,
            isClosable: true
        });
    }
};

export const getInterestGroups = async () => {
    try {
        const response = (await privateGateway.get(dashboardRoutes.getTaskIGs))
            ?.data?.response;
        return response?.map((obj: any) => ({
            value: obj.id,
            label: obj.name
        }));
    } catch (err) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
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

        console.log(response);
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
            console.log(error.response);
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
