import { AxiosError } from "axios";
import axios from "axios";
import { privateGateway } from "../../../../services/apiGateways";
import { dashboardRoutes, organizationRoutes } from "../../../../services/urls";
import { ToastId, UseToastOptions } from "@chakra-ui/toast";

export const getOrganizations = async (
    activeTab:string,
    setData: any,
    page: number,
    selectedValue: number,
    setTotalPages?: any,
    search?: string,
    sortID?: string
) => {
    try {
        await privateGateway.get(organizationRoutes.getOrganizationsAll,{
            params: {
                perPage: selectedValue,
                pageIndex: page,
                search: search,
                sortBy: sortID
            }
        })
        .then(response=>{
            return response.data
        })
        .then(data => {
            if(activeTab === "Colleges"){
                setData(data.response.data.colleges);
                setTotalPages(data.response.pagination.colleges.totalPages);
            }else if (activeTab === "Companies"){
                setData(data.response.data.companies);
                setTotalPages(data.response.pagination.companies.totalPages);
            }else if(activeTab === "Communities"){
                setData(data.response.data.communities);
                setTotalPages(data.response.pagination.communities.totalPages);
            }else{
                alert("error to Load Data")
            }
        })
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

interface CountryProps {
    id: string;
    name: string;
    updated_at: string;
    created_at: string;
    updated_by: string;
    created_by: string;
}

export const getCountry = async (setCountryData:any) => {
    try {
        await privateGateway.get(organizationRoutes.getCountry)
        .then(response=>{
            return response.data
        })
        .then(data => {
            console.log("daaaata:",data.response.data)
            const countries:CountryProps[] = data.response.data;
            const countryNames = countries.map((country) => country.name);
            setCountryData(countryNames);
        })
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
}

// export const createInterestGroups = async (name:string, toast: (options?: UseToastOptions | undefined) => ToastId,) => {
// 	try {
//         const response = await privateGateway.post(dashboardRoutes.getIgData, {
// 			"name": name
// 		});
// 		toast({
// 			title: "Interest Group created",
// 			status: "success",
// 			duration: 3000,
// 			isClosable: true
// 		});
//         const message: any = response?.data;
// 		console.log(message);
//     } catch (err: unknown) {
//         const error = err as AxiosError;
//         if (error?.response) {
//             console.log(error.response);
//         }
//     }
// }