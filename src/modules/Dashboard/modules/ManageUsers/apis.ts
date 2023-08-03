import { AxiosError } from "axios";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes,organizationRoutes } from "@/MuLearnServices/urls";
import { ToastId, UseToastOptions } from "@chakra-ui/toast";
import { Dispatch, SetStateAction } from "react";
import { OrgData, UserData } from "./ManageUsersInterface";
import { orgSelectType } from "./ManageUsersEdit";
export const getManageUsers = async (
    setData: any,
    page: number,
    selectedValue: number,
    setTotalPages?: any,
    search?: string,
    sortID?: string
) => {
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
        //console.log(datasuser);
        for (let i = 0; i < datasuser.length; i++) {
            if (datasuser[i].college != null) {
                //console.log(datasuser[i].college);
            } else if (datasuser[i].company != null) {
                //console.log(datasuser[i].company);
                datasuser[i].college = datasuser[i].company;
            } else {
                //console.log(null);
            }
        }
        setData(datasuser);
        setTotalPages(manageusers.response.pagination.totalPages);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
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
        if (error?.response) {
            console.log(error.response);
        }
    }
};

export const editManageUsers = async (
    id?: string,
    first_name?: string,
    last_name?: string ,
    email?: string ,
    mobile?: string ,
    discord_id?: string ,
    mu_id?: string ,
    role?: string ,
    orgaanizations?: string[],
    // toast: any,

    college?: string | undefined,
    company?: string | undefined,
    department?: string | undefined,
    graduation_year?: string | undefined
) => {
    try {
        const response = await privateGateway.patch(
            dashboardRoutes.getUsersData + id + "/",
            {
                first_name: first_name,
                last_name: last_name,
                email: email,
                mobile: mobile,
                discord_id: discord_id,
                mu_id: mu_id,
                college: college,
                company: company,
                department: department,
                graduation_year: graduation_year
            }
        );
        //console.log(first_name, last_name, email);
        const message: any = response?.data;
        //console.log(message);
        // toast({
        //     title: "User created",
        //     status: "success",
        //     duration: 3000,
        //     isClosable: true
        // });
    } catch (err: unknown) {
        const error = err as AxiosError;

        if (error?.response) {
            console.log(error.response);
        }
    }
};

export const getManageUsersDetails = async (
    id: string | undefined,
    setData: React.Dispatch<SetStateAction<UserData|undefined>>
) => {
    try {
        const response = await privateGateway.get(
            dashboardRoutes.getUsersEditData + id + "/"
        );
        const message: any = response?.data;
        console.log(message.response);

        // let role = message.response.role;
        // // console.log(message.response.users);
        // const newOrganizations = message.response.organizations;
        // // console.log(newOrganizations);
        // for (let i = 0; i < newOrganizations.length; i++) {
        //     // console.log(newOrganizations[i].org_type);
        //     if (newOrganizations[i].org_type == "Community") {
        //         // console.log("community");
        //     }
        //     if (role == null) {
        //         // console.log("Company");
        //     } else {
        //         // console.log("college");
        //     }
        // }
        setData(message.response);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

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
                        perPage:2000//HardCode 2000
                    }
                }
            ))
        )
        const responseData = response.map(route=>
            route.data.response.data.map((obj:any)=>{
                //replacing id,title key with value,label
                return {value:obj.id,label:obj.title,...obj}
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
        console.log(message);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};
