import { AxiosError } from "axios";
import { privateGateway } from "../../../services/apiGateways";

export const getCSV = async (CSV: string, setCsv: any) => {
    try {
        const response = await privateGateway.get(CSV, {});
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
