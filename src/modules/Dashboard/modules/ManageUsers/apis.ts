import { AxiosError } from "axios";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import { ToastId, UseToastOptions } from "@chakra-ui/toast";
import { NavigateFunction } from "react-router-dom";
export const getManageUsers = async ({
    setData,
    page,
    selectedValue,
    setIsLoading,
    setTotalPages,
    search,
    sortID
}: {
    setData: UseStateFunc<any>;
    page: number;
    selectedValue: number;
    setIsLoading: UseStateFunc<boolean>;
    setTotalPages?: UseStateFunc<any>;
    search?: string;
    sortID?: string;
}) => {
    setIsLoading(true);
    try {
        const response = await privateGateway.get(
            dashboardRoutes.getUsersData,
            {
                params: {
                    perPage: selectedValue,
                    pageIndex: page,
                    search: search,
                    sortBy: sortID
                }
            }
        );
        const manageusers: any = response?.data;

        const datasuser = manageusers.response.data;
        for (let i = 0; i < datasuser.length; i++) {
            if (datasuser[i].college != null) {
            } else if (datasuser[i].company != null) {
                datasuser[i].college = datasuser[i].company;
            } else {
                //console.log(null);
            }
        }
        setData(datasuser);
        if (setTotalPages)
            setTotalPages(manageusers.response.pagination.totalPages);
        setIsLoading(false);
    } catch (err: unknown) {
        setIsLoading(false);
    }
};

export const createManageUsers = async (
    firstName: string,
    last_name: string,
    email: string,
    mobile: string,
    dob: string,
    gender: string
) => {
    try {
        const response = await privateGateway.post(
            dashboardRoutes.getUsersData,
            {
                first_name: firstName,
                last_name: last_name,
                email: email,
                mobile: mobile
            }
        );

        const message: any = response?.data;
        //console.log(message);
    } catch (err: unknown) {
        const error = err as AxiosError;
    }
};

export const editManageUsers = async (
    toast: (options?: UseToastOptions | undefined) => ToastId,
    navigate: NavigateFunction,
    id?: string,
    first_name?: string,
    last_name?: string,
    email?: string,
    mobile?: string,
    organizations?: string[],
    department?: string,
    graduation_year?: string,
    role?: string[],
    interest_groups?: string[],
) => {
    try {
        const response = await privateGateway.patch(
            dashboardRoutes.getUsersData + id + "/",
            {
                first_name: first_name,
                last_name: last_name,
                email: email,
                mobile: mobile,
                organizations: organizations,
                department: department,
                graduation_year: graduation_year,
                roles: role,
                interest_groups: interest_groups
            }
        );
        navigate('/dashboard/manage-users')
        //console.log(first_name, last_name, email);
        const message: any = response?.data;
        console.log(message)
        //console.log(message);
        toast({
            title: "Updated SuccessFully",
            status: "success",
            duration: 3000,
            isClosable: true
        });
    } catch (err: unknown) {
        const error = err as APIError;
        let errorMessage = "Some Error Occurred..";
        if (error?.response?.data?.message) {
            
        console.log(((
            error?.response?.data?.message as {
                code?: string[];
                general?: string[];
            }
        ))?.general?.[0]);
        }


        if (error?.response) {
            toast({
                title: errorMessage,
                description: "",
                status: "error",
                duration: 2000,
                isClosable: true
            });
        }
        }
    }
export const getManageUsersDetails = async (
    id: string | undefined,
    setData: UseStateFunc<UserData | undefined>
) => {
    try {
        const response = await privateGateway.get(
            dashboardRoutes.getUsersData + id + "/"
        );
        const message: any = response?.data;

        setData(message.response);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};
/*
export const getAllOrganisations = async (
    toast: (options?: UseToastOptions | undefined) => ToastId
)=>{
    try{
        const data:orgSelectType = {College:[],Community:[],Company:[]}
        const routes = [
            organizationRoutes.getCollege,
            organizationRoutes.getCommunity,
            organizationRoutes.getCompany
        ]
        const response = await Promise.all(
            routes.map(route=>privateGateway.get(
                route,
                {params:
                    {
                        perPage:route===organizationRoutes.getCollege?2000:100//HardCode 2000
                    }
                }
            ))
        )
        const responseData = response.map(route=>
            route.data.response.data.map((obj:any)=>{
                //replacing id,title key with value,label
                return {value:obj.id,label:obj.title}
            })
            ) 
        data.College=responseData[0]
        data.Community=responseData[1]
        data.Company=responseData[2]
        
        return data

    }catch(err){
        console.log(err)
        toast({
            title: "Error in org fetch",
            status: "error",
            duration: 3000,
            isClosable: true
        })
    }
}
*/
export const deleteManageUsers = async (
    id: string | undefined,
    toast: (options?: UseToastOptions | undefined) => ToastId
) => {
    try {
        const response = await privateGateway.delete(
            dashboardRoutes.getUsersData + id + "/"
        );
        toast({
            title: "User deleted",
            status: "success",
            duration: 3000,
            isClosable: true
        });
        const message: any = response?.data;
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            throw error;
        }
    }
};
