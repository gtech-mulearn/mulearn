import { AxiosError } from "axios";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import { ToastId, UseToastOptions } from "@chakra-ui/toast";
export const getManageUsers = async (
    setData: UseStateFunc<any>,
    page: number,
    selectedValue: number,
    setIsLoading: UseStateFunc<boolean>,
    setTotalPages?: UseStateFunc<any>,
    search?: string,
    sortID?: string
) => {
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
        if (setTotalPages) setTotalPages(manageusers.response.pagination.totalPages);
        setIsLoading(false);
    } catch (err: unknown) {
        setIsLoading(false);
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
    last_name?: string,
    email?: string,
    mobile?: string,
    discord_id?: string,
    mu_id?: string,
    role?: string,
    orgaanizations?: OrgData[],
    // toast: any,

    college?: string,
    company?: string,
    department?: string,
    graduation_year?: string
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
    setData: UseStateFunc<UserData | undefined>
) => {
    try {
        const response = await privateGateway.get(
            dashboardRoutes.getUsersEditData + id + "/"
        );
        const message: any = response?.data;
        console.log(message.response);

        let role = message.response.role;
        // console.log(message.response.users);
        const newOrganizations = message.response.organizations;
        // console.log(newOrganizations);
        for (let i = 0; i < newOrganizations.length; i++) {
            // console.log(newOrganizations[i].org_type);
            if (newOrganizations[i].org_type == "Community") {
                // console.log("community");
            }
            if (role == null) {
                // console.log("Company");
            } else {
                // console.log("college");
            }
        }
        setData(message.response);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

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
