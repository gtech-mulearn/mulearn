import { AxiosError } from "axios";
import { privateGateway } from "../../../services/apiGateways";

export const getCSV = async (CSV: any, setCsv: any, setIsLoading: (isLoading: boolean) => void) => {
    setIsLoading(true);
    try {
        const response = await privateGateway.get(CSV, {});
        // toast({
        //  title: "Interest Group created",
        // 	status: "success",
        // 	duration: 3000,
        // 	isClosable: true
        // });
        const message: any = response?.data;
        setCsv(message);
        setIsLoading(false);
    } catch (err: unknown) {
        setIsLoading(false);
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};
