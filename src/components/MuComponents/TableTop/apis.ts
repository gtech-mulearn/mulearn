import { AxiosError } from "axios";
import { privateGateway } from "../../../services/apiGateways";
import { ToastId, UseToastOptions } from "@chakra-ui/react";

export const getCSV = async (
    CSV: any,
    setCsv: any,
    setIsLoading: (isLoading: boolean) => void,
    setHasError: (hasError: boolean) => void,
    toast: (options?: UseToastOptions | undefined) => ToastId,
) => {
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
        if (error?.response?.status === 500) {
            toast({
                title:"CSV doesn't exists!",
                status: "error",
                duration: 3000,
                isClosable: true
            });
        }
    }
};
