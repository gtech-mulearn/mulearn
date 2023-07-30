import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Table from "@/MuLearnComponents/Table/Table";
import THead from "@/MuLearnComponents/Table/THead";
import TableTop from "@/MuLearnComponents/TableTop/TableTop";
import Pagination from "@/MuLearnComponents/Pagination/Pagination";
import { deleteOrganization, getOrganizations } from "./apis";
import { useToast } from "@chakra-ui/react";
import { hasRole } from "@/MuLearnServices/common_functions";
import { roles } from "@/MuLearnServices/types";
import {
    columnsCollege,
    columnsCommunities,
    columnsCompanies
} from "./THeaders";
import TableTopTab from "./TableTopTab";
// import "./Organizations.scss"
import { organizationRoutes } from "@/MuLearnServices/urls";

function Organizations() {
    const [data, setData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [perPage, setPerPage] = useState(5);
    const [columns, setColumns] = useState(columnsCollege);
    const [activeTab, setActiveTab] = useState("Colleges");
    const [sort, setSort] = useState("");
    const [popupStatus, setPopupStatus] = useState(false);
    const [activeTabName, setActiveTabName] = useState("college");

    const [isCreate, setIsCreate] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const firstFetch = useRef(true);
    const navigate = useNavigate();

    const toast = useToast();

    useEffect(() => {
        if (firstFetch.current) {
            if (!hasRole([roles.ADMIN, roles.FELLOW])) navigate("/404");

            getOrganizations(
                activeTab,
                setData,
                1,
                perPage,
                setTotalPages,
                "",
                ""
            );
        }
        firstFetch.current = false;
    }, []);

    const handleNextClick = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        getOrganizations(activeTab, setData, nextPage, perPage);
    };

    const handlePreviousClick = () => {
        const prevPage = currentPage - 1;
        setCurrentPage(prevPage);
        getOrganizations(activeTab, setData, prevPage, perPage);
    };

    const handleSearch = (search: string) => {
        setCurrentPage(1);
        getOrganizations(
            activeTab,
            setData,
            1,
            perPage,
            setTotalPages,
            search,
            ""
        );
    };

    const handlePerPageNumber = (selectedValue: number) => {
        setCurrentPage(1);
        setPerPage(selectedValue);
        getOrganizations(
            activeTab,
            setData,
            1,
            selectedValue,
            setTotalPages,
            "",
            ""
        );
    };

    const handleTabClick = (tab: string) => {
        if (tab === "Colleges") {
            setActiveTabName("college");
            setColumns(columnsCollege);
            getOrganizations(tab, setData, 1, perPage, setTotalPages, "", "");
        } else if (tab === "Companies") {
            setActiveTabName("company");
            setColumns(columnsCompanies);
            getOrganizations(tab, setData, 1, perPage, setTotalPages, "", "");
        } else if (tab === "Communities") {
            setActiveTabName("community");
            setColumns(columnsCommunities);
            getOrganizations(tab, setData, 1, perPage, setTotalPages, "", "");
        } else {
            alert("Error to load Table Headers");
        }
        setCurrentPage(1);
        setActiveTab(tab);
        setPopupStatus(false);
    };

    const handleIconClick = (column: string) => {
        if (sort === column) {
            setSort(`-${column}`);
            getOrganizations(
                activeTab,
                setData,
                1,
                perPage,
                setTotalPages,
                "",
                `-${column}`
            );
        } else {
            setSort(column);
            getOrganizations(
                activeTab,
                setData,
                1,
                perPage,
                setTotalPages,
                "",
                column
            );
        }

        //console.log(`Icon clicked for column: ${column}`);
    };

    const handleEdit = (id: string | number | boolean) => {
        //console.log(id);
        setIsEdit(true);
        navigate("/dashboard/organizations/edit", {
            state: {
                activeItem: activeTab,
                rowId: id
            }
        });
    };

    const handleDelete = (id: string | undefined) => {
        deleteOrganization(id, toast);
        setTimeout(() => {
            handleTabClick(activeTab);
        }, 1000);
    };

    return (
        <>
            <TableTopTab active={activeTab} onTabClick={handleTabClick} />

            {data && (
                <>
                    <TableTop
                        onSearchText={handleSearch}
                        onPerPageNumber={handlePerPageNumber}
                        CSV={`${organizationRoutes.getOrgCsv}/${activeTabName}/`}
                    />
                    <Table
                        rows={data}
                        page={currentPage}
                        perPage={perPage}
                        columnOrder={columns}
                        id={["code"]}
                        onEditClick={handleEdit}
                        modalTypeContent="error"
                        modalDeleteContent={`Are you sure you want to delete this organization?`}
                        onDeleteClick={handleDelete}
                    >
                        <THead
                            columnOrder={columns}
                            onIconClick={handleIconClick}
                            action={true}
                        />
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            margin="10px 0"
                            handleNextClick={handleNextClick}
                            handlePreviousClick={handlePreviousClick}
                            onSearchText={handleSearch}
                            onPerPageNumber={handlePerPageNumber}
                        />
                        {/*use <Blank/> when u don't need <THead /> or <Pagination inside <Table/> cause <Table /> needs atleast 2 children*/}
                    </Table>
                </>
            )}
        </>
    );
}

export default Organizations;
