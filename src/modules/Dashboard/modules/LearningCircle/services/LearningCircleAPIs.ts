import { AxiosError } from "axios";
import { privateGateway } from "@/MuLearnServices/apiGateways"
import { dashboardRoutes } from "@/MuLearnServices/urls";
import { SetStateAction } from "react";
import { LcType } from "./LearningCircleInterface";
import { createStandaloneToast } from "@chakra-ui/react";
import { LcDetail } from "./LearningCircleInterface";



const { toast } = createStandaloneToast();


export const getUserLearningCircles = async (
    setCircleList: React.Dispatch<SetStateAction<LcType[] | undefined>>
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
    setCircleList: React.Dispatch<SetStateAction<LcDetail | undefined>>,
    id: string | undefined
) => {
    try {
        const response = await privateGateway.get(
            dashboardRoutes.getCampusLearningCircles + id + "/"
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
export const updateLcNote = async (
    id: string | undefined,
    note: string
) => {
    try {
        const response = await privateGateway.put(
            dashboardRoutes.getCampusLearningCircles + id + "/",
            {
                note: note
            }
        );
        const message: any = response?.data;
        console.log(message.response);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

export const getCampusLearningCircles = async (
    setCircleList: React.Dispatch<SetStateAction<LcType[]>>
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



export const createCircle = async(
    setId: React.Dispatch<SetStateAction<string>>,
    circleName:string,
    circleCode:string,
    ig:string
    )=>{
        
        try{
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
        console.log(response)
        setId(message.response);
        toast({
            title: "Learning Circle Created",
            description: "",
            status: "success",
            duration: 2000,
            isClosable: true
        });
       
        
    }catch(err){
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

}

export const setLCMeetTime = async(
        meetTime: string,
        meetPlace: string,
        day: string,
        id: string|undefined
    )=>{
        
        try{
            const response = await privateGateway.patch(
            dashboardRoutes.setLCMeetTime + id + '/',
            {
                meet_time: meetTime,
                meet_place: meetPlace,
                day: day
            }
        );
        const message: any = response?.data;
        console.log(message.response);
        console.log(response)
        toast({
            title: "Successful",
            description: "",
            status: "success",
            duration: 2000,
            isClosable: true
        });
       
        
    }catch(err){
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

}

export const joinCircle = async (
    circleCode: string,
) => {
    try {
        const response = await privateGateway.post(
            dashboardRoutes.joinLearningCircle + circleCode + '/',
        );

        console.log(response);
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

export const getInterestGroups = async (
)=>{
    try{
        const response = (await privateGateway.get(
            dashboardRoutes.getTaskIGs
        ))?.data?.response
        return response?.map((obj:any)=>({value:obj.id,label:obj.name}))
    }catch(err){
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        } 
    }
}

export const approveLcUser = async (
    circleId: string | undefined,
    memberId: string,
	flag: boolean
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
            title: "Member Approved",
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
