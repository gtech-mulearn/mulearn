import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Table from "@/MuLearnComponents/Table/Table";
import THead from "@/MuLearnComponents/Table/THead";
import TableTop from "@/MuLearnComponents/TableTop/TableTop";
import Pagination from "@/MuLearnComponents/Pagination/Pagination";
import { deleteOrganization, getOrganizations } from "./apis";
import { useToast } from "@chakra-ui/react";
import {
    columnsCollege,
    columnsCommunities,
    columnsCompanies
} from "./THeaders";
import TableTopTab from "./TableTopTab";
// import "./Organizations.scss"
import { organizationRoutes } from "@/MuLearnServices/urls";

function Organizations() {
    const ccc = ["College", "Company", "Community"] as const;
    type CCC = (typeof ccc)[number];

    const [data, setData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [perPage, setPerPage] = useState(20);
    const [columns, setColumns] = useState(columnsCollege);
    const [activeTab, setActiveTab] = useState<CCC>("College");
    const [sort, setSort] = useState("");
    const [popupStatus, setPopupStatus] = useState(false);
    const [activeTabName, setActiveTabName] = useState("College");
    const [isLoading, setIsLoading] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const firstFetch = useRef(true);
    const navigate = useNavigate();

    const toast = useToast();

    useEffect(() => {
        if (firstFetch.current || true) {
            getOrganizations(
                activeTab,
                setData,
                1,
                perPage,
                setIsLoading,
                setTotalPages,
                "",
                ""
            );
        }
        firstFetch.current = false;

        const storedActiveTab = localStorage.getItem("activeTab");

        if (storedActiveTab) {
            setActiveTab(storedActiveTab as CCC);
            handleTabClick(storedActiveTab as CCC);
        }
    }, [currentPage]);

    const handleNextClick = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        getOrganizations(
            activeTab,
            setData,
            nextPage,
            perPage,
            setIsLoading,
            setTotalPages,
            "",
            sort
        );
    };

    const handlePreviousClick = () => {
        const prevPage = currentPage - 1;
        setCurrentPage(prevPage);
        getOrganizations(
            activeTab,
            setData,
            prevPage,
            perPage,
            setIsLoading,
            setTotalPages,
            "",
            sort
        );
    };

    const handleSearch = (search: string) => {
        setCurrentPage(1);
        getOrganizations(
            activeTab,
            setData,
            1,
            perPage,
            setIsLoading,
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
            setIsLoading,
            setTotalPages,
            "",
            ""
        );
    };

    const handleTabClick = (tab: CCC) => {
        if (ccc.some(c => c === tab)) {
            switch (tab) {
                case "College":
                    setActiveTabName("college");
                    setColumns(columnsCollege);
                    break;
                case "Company":
                    setActiveTabName("Company");
                    setColumns(columnsCompanies);
                    break;
                case "Community":
                    setActiveTabName("Community");
                    setColumns(columnsCommunities);
                    break;
            }
            localStorage.setItem("activeTab", tab);

            getOrganizations(
                tab,
                setData,
                1,
                perPage,
                setIsLoading,
                setTotalPages,
                "",
                ""
            );
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
                setIsLoading,
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
                setIsLoading,
                setTotalPages,
                "",
                column
            );
        }
    };
    console.log(data);
    const handleEdit = (id: string | number | boolean) => {
        setIsEdit(true);
        console.log(id);
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
            <TableTopTab
                active={activeTab}
                onTabClick={handleTabClick as (tab: string) => void}
            />

            {data && (
                <>
                    <TableTop
                        onSearchText={handleSearch}
                        onPerPageNumber={handlePerPageNumber}
                        CSV={organizationRoutes.getOrgCsv('activeTabName')}
                    />
                    <Table
                        rows={data}
                        isloading={isLoading}
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
                        <div>
                            {!isLoading && (
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    margin="10px 0"
                                    handleNextClick={handleNextClick}
                                    handlePreviousClick={handlePreviousClick}
                                    onSearchText={handleSearch}
                                    onPerPageNumber={handlePerPageNumber}
                                    perPage={perPage}
                                    setPerPage={setPerPage}
                                />
                            )}
                        </div>
                        {/*use <Blank/> when u don't need <THead /> or <Pagination inside <Table/> cause <Table /> needs atleast 2 children*/}
                    </Table>
                </>
            )}
        </>
    );
}

export default Organizations;
