import React from "react";
import { privateGateway } from "../../../../../services/apiGateways";
import { dashboardRoutes } from "../../../../../services/urls";

//TODO: Change to alias the services folder

type studentData = React.Dispatch<React.SetStateAction<any>>;
type campusData = React.Dispatch<React.SetStateAction<any>>;

export const getStudentDetails = (
    setStudentData: studentData,
    page: number,
    selectedValue: number,
    setTotalPages?: any,
    search?: string,
    sortID?: string,
    setLoading?: React.Dispatch<React.SetStateAction<boolean>>
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
        .then(response => {
            // console.log(response.data.response);
            setStudentData(response.data.response.data);
            setTotalPages(response.data.response.pagination.totalPages);
        })
        .catch(error => {
            console.log(error);
        });
};
export const getCampusDetails = (
    setCampusData: campusData,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
    privateGateway
        .get(dashboardRoutes.getCampusDetails)
        .then(response => {
            // console.log(response.data.response);
            setCampusData(response.data.response);
            setLoading(false);
        })
        .catch(error => {
            console.log(error);
        });
};
