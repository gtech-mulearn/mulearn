import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import { Dispatch, SetStateAction } from "react";

export const getDepartments = async ({
    setDepartments,
    page = 1
}: {
    setDepartments: Dispatch<SetStateAction<any[]>>;
    page?: number;
}) => {
    try {
        const response = await privateGateway.get(dashboardRoutes.departments, {
            params: {
                pageIndex: page
            }
        });
        const departments: any = response?.data;
        console.log("getDepartments - data", departments.response);
        setDepartments(departments.response);
    } catch (err: unknown) {
        console.log(err);
    }
};
