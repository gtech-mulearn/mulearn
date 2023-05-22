import { AxiosError } from "axios";
import { privateGateway } from "../../../services/apiGateways";
import { campusRoutes } from "../../../services/urls";

export const getCSV = async (setCsv: any) => {
    try {
        const response = await privateGateway.get(
            campusRoutes.getStudentsList,
            {}
        );
        // toast({
        // 	title: "Interest Group created",
        // 	status: "success",
        // 	duration: 3000,
        // 	isClosable: true
        // });
        const message: any = response?.data;
        console.log(message);
        setCsv(message);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};
