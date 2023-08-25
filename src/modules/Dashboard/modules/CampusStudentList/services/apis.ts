import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes } from "@/MuLearnServices/urls";

import { ToastId, UseToastOptions } from "@chakra-ui/toast";

type CampusDataSet = 'college_name'| 'campus_lead'| 'campus_code'| 'campus_zone'| 'total_karma'| 'total_members'| 'active_members' | 'rank'
type studentData = UseStateFunc<any[]>
type campusData = UseStateFunc<{ [T in CampusDataSet]: string }>

type studentLevelType = {
    level:number,
    students:number
} 

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

export const getWeeklyKarma = async () => {//data for barchart
    
    const days = [['MON'], ['TUE'], ['WED'], ['THU'], ['FRI'], ['SAT'], ['SUN']]
    const response = await privateGateway
                    .get(dashboardRoutes.getCampusWeeklyKarma)
    let data:string[]=[]
    if(!response.data.response.karma)
        data = Array(7).fill(0)
    else
        data = Object.values(response.data.response.karma) as string[]
    console.log(data)
    return(
        days.map((day,index)=>[day[0],data[index]])
    )
}

export const getStudentLevel = async () => {//level data for pie chart
    console.log('getStudentLevel')
    const response = await privateGateway
                    .get(dashboardRoutes.getStudentLevels)
    const data = response.data.response
                .map((data:studentLevelType)=>
                [`level ${data.level}`,data.students])
    return(data)
}