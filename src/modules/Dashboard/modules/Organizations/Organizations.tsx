import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../../../components/MuComponents/Table/Table";
import THead from "../../../../components/MuComponents/Table/THead";
import TableTop from "../../../../components/MuComponents/TableTop/TableTop";
import Pagination from "../../../../components/MuComponents/Pagination/Pagination";
import { getInterestGroups } from "../InterestGroup/apis";
import { MuButtonLight } from "../../../../components/MuComponents/MuButtons/MuButton";
import PrimaryButton from "../../../../components/MuComponents/MuButtons/MuOutlinedButton";
import {
    columnsCollege,
    columnsCommunities,
    columnsCompanies
} from "./THeaders";
import TableTopTab from "./TableTopTab";

import "./Organizations.scss";

function Organizations() {
    const [data, setData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [columns, setColumns] = useState(columnsCollege);
    const [sort, setSort] = useState('');
    const [activeTab, setActiveTab] = useState("Colleges");

    const navigate = useNavigate();

	const columnOrder = [
		"name",
        "count",
        "updated_by",
        "created_by",
        "created_at",
    ];

    const editableColumnNames = [
		"NAME",
        "Members",
        "Updated By",
        "Created By",
        "Created On",
    ];

    const handleNextClick = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        getInterestGroups(setData, nextPage, perPage);
    };

    const handlePreviousClick = () => {
        const prevPage = currentPage - 1;
        setCurrentPage(prevPage);
        getInterestGroups(setData, prevPage, perPage);
    };

	const handleSearch = (search: string) => {
        setCurrentPage(1);
        getInterestGroups(setData, 1, perPage, setTotalPages, search, "");
    };

    const handlePerPageNumber = (selectedValue: number) => {
        setCurrentPage(1);
        setPerPage(selectedValue);
        getInterestGroups(setData, 1, selectedValue, setTotalPages, "", "");
    };

	const handleIconClick = (column: string) => {
		if(sort === column){
			setSort(`-${column}`);
			getInterestGroups(setData, 1, perPage, setTotalPages, "", sort);
		}
		else {
			setSort(column);
			getInterestGroups(setData, 1, perPage, setTotalPages, "", sort);
		}
		
        console.log(`Icon clicked for column: ${column}`);
    };

    const handleTabClick = (tab: string) => {
        if (tab === "Colleges") {
            setColumns(columnsCollege);
        } else if (tab === "Companies") {
            setColumns(columnsCompanies);
        } else if (tab === "Communities") {
            setColumns(columnsCommunities);
        } else {
            alert("Error to load Table Headers");
        }
        setActiveTab(tab);
    };

    return (
        <>
            <TableTopTab active={activeTab} onTabClick={handleTabClick} />
            <TableTop
                onSearchText={handleSearch}
                onPerPageNumber={handlePerPageNumber}
            />
            {data && (
                <Table
                    rows={data}
                    page={currentPage}
                    perPage={perPage}
                    columnOrder={columnOrder}
                >
                    <THead
                        columnOrder={columnOrder}
                        editableColumnNames={editableColumnNames}
                        onIconClick={handleIconClick}
                    />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        margin="10px 0"
                        handleNextClick={handleNextClick}
                        handlePreviousClick={handlePreviousClick}
                    />
                    {/*use <Blank/> when u don't need <THead /> or <Pagination inside <Table/> cause <Table /> needs atleast 2 children*/}
                </Table>
            )}
        </>
    );
}

export default Organizations;