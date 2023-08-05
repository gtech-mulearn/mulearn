import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes } from "@/MuLearnServices/urls";

type CampusDataSet = 'college_name'| 'campus_lead'| 'campus_code'| 'campus_zone'| 'total_karma'| 'total_members'| 'active_members' | 'rank'
type studentData = UseStateFunc<any[]>
type campusData = UseStateFunc<{ [T in CampusDataSet]: string }>

export const getStudentDetails = (
    setStudentData: studentData,
    page: number,
    selectedValue: number,
    setTotalPages?: UseStateFunc<number>,
    search?: string,
    sortID?: string
) => {
    privateGateway
        .get(dashboardRoutes.getStudentDetails, {
            params: {
                perPage: selectedValue,
                pageIndex: page,
                search: search,
                sortBy: sortID
            }
        })
        .then((response: APIResponse<{data:any, pagination:{ totalPages:number }}>) => {
            // console.log(response.data.response);
            setStudentData(response.data.response.data);
            if (setTotalPages) setTotalPages(response.data.response.pagination.totalPages);
        })
        .catch(error => {
            console.log(error);
        });
};
export const getCampusDetails = (
    setCampusData: campusData
) => {
    privateGateway
        .get(dashboardRoutes.getCampusDetails)
        .then((response: APIResponse<{ [T in CampusDataSet]: string }>) => {
            // console.log(response.data.response);
            setCampusData(response.data.response);
        })
        .catch(error => {
            console.log(error);
        });
};
