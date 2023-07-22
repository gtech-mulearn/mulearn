import { AxiosError } from "axios";
import { privateGateway } from "@/MuLearnServices/apiGateways"
import { dashboardRoutes } from "@/MuLearnServices/urls";
import { SetStateAction } from "react";
import { LcType } from "../pages/LearningCircleFind";
import { getUUID } from "../../Tasks/TaskApis";
import { createStandaloneToast, UseToastOptions } from "@chakra-ui/react";

const { toast } = createStandaloneToast();

export const getCampusLearningCircles = async (
    setCircleList: React.Dispatch<SetStateAction<LcType[]>>
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

export const createCircle = async(
    circleName:string,
    circleCode:string,
    ig:string
)=>{
    try{
        const response = await privateGateway.post(
            dashboardRoutes.createLearningCircle,
            {
                name:circleName,
                ig:ig,
                //note : circle_code required data unknown
                // circle_code: getUUID()
            }
        )

        console.log(response)
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
