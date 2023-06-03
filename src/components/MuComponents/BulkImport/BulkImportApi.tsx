import { AxiosError } from "axios";
import { privateGateway } from "../../../services/apiGateways";

export const bulkImport = async (data: any, path: string) => {
    try {
        const response = await privateGateway.post(path, data);
        const message: any = response?.data;
        console.log(message);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};
