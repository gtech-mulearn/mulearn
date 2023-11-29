import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes } from "@/MuLearnServices/urls";

import { ToastId, UseToastOptions } from "@chakra-ui/toast";
import { AxiosError } from "axios";

type CampusDataSet = {
    college_name: string;
    campus_lead: string;
    campus_code: string;
    campus_zone: string;
    total_karma: string;
    total_members: string;
    active_members: string;
    rank: string;
    lead: { campus_lead: string; enabler: string };
};
type studentData = UseStateFunc<any[]>;
type campusData = UseStateFunc<CampusDataSet>;

type studentLevelType = {
    level: number;
    students: number;
};

export const getStudentDetails = (
    setStudentData: studentData,
    page: number,
    selectedValue: number,
    setTotalPages?: UseStateFunc<number>,
    search?: string,
    sortID?: string,
    setNoOrg?: UseStateFunc<boolean>
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
        .then(
            (
                response: APIResponse<{
                    data: any;
                    pagination: { totalPages: number };
                }>
            ) => {
                //removing time from join date
                for (let i = 0; i < response.data.response.data.length; i++) {
                    response.data.response.data[i].join_date = new Date(
                        response.data.response.data[i].join_date
                    ).toLocaleDateString("en-GB");
                }

                setStudentData(response.data.response.data);
                if (setTotalPages)
                    setTotalPages(response.data.response.pagination.totalPages);
            }
        )
        .catch(error => {
            console.log(error);
            if (setNoOrg) setNoOrg(true);
        });
};
export const getCampusDetails = (setCampusData: campusData) => {
    privateGateway
        .get(dashboardRoutes.getCampusDetails)
        .then((response: APIResponse<CampusDataSet>) => {
            // console.log(response.data.response);
            setCampusData(response.data.response);
        })
        .catch(error => {
            console.log(error);
        });
};

export const getWeeklyKarma = async (errHandler: (err: string) => void) => {
    //data for barchart

    try {
        // const days = [
        //     ["MON"],
        //     ["TUE"],
        //     ["WED"],
        //     ["THU"],
        //     ["FRI"],
        //     ["SAT"],
        //     ["SUN"]
        // ];
        const response = await privateGateway.get(
            dashboardRoutes.getCampusWeeklyKarma
        );
        const { college_name, ...temp } = response.data.response;

        console.log(
            Object.keys(temp).map(key => {
                return [key, temp[key] === null ? 0 : temp[key]];
            })
        );

        return Object.keys(temp)
            .map(key => {
                return [key, temp[key] === null ? 0 : temp[key]];
            })
            .reverse();
        // let data: string[] = [];
        // if (!response.data.response.karma) data = Array(7).fill(0);
        // else data = Object.values(response.data.response.karma) as string[];
        // return days.map((day, index) => [day[0], data[index]]);
    } catch (err: any) {
        console.log(err);
        errHandler((err as AxiosError).message);
        return [];
    }
};

export const getStudentLevel = async (errHandler: (err: string) => void) => {
    try {
        //level data for pie chart
        const response = await privateGateway.get(
            dashboardRoutes.getStudentLevels
        );
        const data = response.data.response
            .sort(
                (a: studentLevelType, b: studentLevelType) => a.level - b.level
            )
            .map((data: studentLevelType) => [
                `Level ${data.level}`,
                data.students
            ]);

        return data;
    } catch (err: any) {
        console.log(err);
        errHandler((err as AxiosError).message);
        return [];
    }
};
