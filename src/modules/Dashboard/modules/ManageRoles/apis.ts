import { AxiosError } from "axios";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import { ToastId, UseToastOptions } from "@chakra-ui/toast";

export const getManageRoles = async (
    setData?: UseStateFunc<any>,
    page?: number,
    selectedValue?: number,
    setIsLoading?: UseStateFunc<boolean>,
    setTotalPages?: UseStateFunc<any>,
    search?: string,
    sortID?: string
) => {
    if(setIsLoading)setIsLoading(true);
    try {
        const response = await privateGateway.get(
            dashboardRoutes.getRolesData,
            {
                params: {
                    perPage: selectedValue,
                    pageIndex: page,
                    search: search,
                    sortBy: sortID
                }
            }
        );
        const interestGroups: any = response?.data;
        if(setData && setIsLoading){
            setData(interestGroups.response.data);
            if (setTotalPages) setTotalPages(interestGroups.response.pagination.totalPages);
            setIsLoading(false);
        }else{
            return(interestGroups.response.data) 
        }
        
    } catch (err: unknown) {
        if(setIsLoading)setIsLoading(false);
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

export const createManageRoles = async (title: string, description: string) => {
    try {
        const response = await privateGateway.post(
            dashboardRoutes.getRolesData,
            {
                title: title,
                description: description
            }
        );

        const message: any = response?.data;
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

export const editManageRoles = async (
    id: string | undefined,
    title: string,
    description: string,
    toast: any
) => {
    try {
        const response = await privateGateway.patch(
            dashboardRoutes.getRolesData + id + "/",
            {
                title: title,
                description: description
            }
        );
        const message: any = response?.data;
        toast({
            title: "Role edited",
            status: "success",
            duration: 3000,
            isClosable: true
        });
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};
interface IData {
    title: string;
    description: string;
}
export const getManageRolesDetails = async (
    id: string | undefined,
    setData?: UseStateFunc<IData>
) => {
    try {
        const response = await privateGateway.patch(
            dashboardRoutes.getRolesData + id + "/"
        );
        const message: any = response?.data;
        if(setData)
            setData(message.response.data);
        else
            return(message.response.data)
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

export const deleteManageRoles = async (
    id: string | undefined,
    toast: (options?: UseToastOptions | undefined) => ToastId
) => {
    try {
        const response = await privateGateway.delete(
            dashboardRoutes.getRolesData + id + "/"
        );
        toast({
            title: "Role deleted",
            status: "success",
            duration: 3000,
            isClosable: true
        });
        const message: any = response?.data;
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

//return true if rolename not used before and is available
export const isRoleUnique =  (roleName:string,roles:string[]):boolean =>{
    return (roles.includes(roleName))

}

export const deleteUser = async (userId:string,roleId:string)=>{
    console.log(userId,roleId)
}

export const addUsers = async (userId:string[],roleId:string)=>{
    console.log(userId,roleId)
}

export const getUser = async (byRole="")=>{
    //byRole to get users of certain role o.w all users
    //temp values right now change when api routes are available
    if(!!byRole){
        return [
            {
                value:'1',
                label:'hello world yeah',
                role:"068e3829-c9cf-4c50-8d79-e6947a15fc29"
            },
            {
                value:'2',
                label:'2',
                role:"068e3829-c9cf-4c50-8d79-e6947a15fc29"
            }
        ]
    }
        
    
    await new Promise((res,rej)=>{
        try {
            setTimeout(res,1000)
        } catch (error) {
            rej(error)
        }
        
    })
    return( [
        {
            value:'1',
            label:'hello world yeah',
            role:"068e3829-c9cf-4c50-8d79-e6947a15fc29"
        },
        {
            value:'2',
            label:'2',
            role:"068e3829-c9cf-4c50-8d79-e6947a15fc29"
        },
        {
            value:'3',
            label:'3',
            role:"1f105cde-4592-4e74-8e86-6c90beeb1e3a"
        },
        {
            value:'4',
            label:'4',
            role:"1f105cde-4592-4e74-8e86-6c90beeb1e3a"
        },
        {
            value:'5',
            label:'5',
            role:"5851b609-bef2-44a2-b11c-f2663fb0a041"
        },
    ])
}

