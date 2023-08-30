import Pagination from "@/MuLearnComponents/Pagination/Pagination";
import THead from "@/MuLearnComponents/Table/THead";
import Table from "@/MuLearnComponents/Table/Table";
import TableTop from "@/MuLearnComponents/TableTop/TableTop";
import { useToast } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getzonaldashboard, getTopDistrict, getStudentLevels } from "./apis";
import { columnsStudent, columnsCampus } from "./THeaders";
import TableTopTab from "./TableTopTab";
import "./ZonalDashboard.css";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import { BarChart, ColumnChart } from "../CampusStudentList/Components/Graphs";
import graphStyles from "../CampusStudentList/pages/CampusStudentList.module.css";

function ZonalDashboard() {
    const [data, setData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [perPage, setPerPage] = useState(5);
    const [columns, setColumns] = useState(columnsStudent);
    const [activeTab, setActiveTab] = useState("Student management");
    const [sort, setSort] = useState("");
    const [popupStatus, setPopupStatus] = useState(false);
    const firstFetch = useRef(true);
    const [isCreate, setIsCreate] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    //graph data
    const [colData, setColData] = useState<string[][] | null>(null);
    const [barData, setBarData] = useState<string[][] | null>(null);

    const navigate = useNavigate();

    const toast = useToast();

    useEffect(() => {
        if (firstFetch.current) {
            (async () => {
                try {
                    setBarData([["", ""]].concat(await getTopDistrict()));
                    setColData(
                        [
                            [
                                "Colleges",
                                "Level 1",
                                "Level 2",
                                "Level 3",
                                "Level 4"
                            ]
                        ].concat(await getStudentLevels())
                    );
                } catch (err) {
                    toast({
                        title: "Data fetch failed",
                        status: "error",
                        duration: 3000,
                        isClosable: true
                    });
                }
            })();

            getzonaldashboard(
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
        getzonaldashboard(activeTab, setData, nextPage, perPage);
    };

    const handlePreviousClick = () => {
        const prevPage = currentPage - 1;
        setCurrentPage(prevPage);
        getzonaldashboard(activeTab, setData, prevPage, perPage);
    };

    const handleSearch = (search: string) => {
        setCurrentPage(1);
        getzonaldashboard(
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
        getzonaldashboard(
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
        if (tab === "Student management") {
            setColumns(columnsStudent);
            getzonaldashboard(tab, setData, 1, perPage, setTotalPages, "", "");
        } else if (tab === "Campus management") {
            setColumns(columnsCampus);
            getzonaldashboard(tab, setData, 1, perPage, setTotalPages, "", "");
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
            getzonaldashboard(
                activeTab,
                setData,
                1,
                perPage,
                setTotalPages,
                "",
                sort
            );
        } else {
            setSort(column);
            getzonaldashboard(
                activeTab,
                setData,
                1,
                perPage,
                setTotalPages,
                "",
                sort
            );
        }
    };

    const CSV = (tabname: string) => {
        if (
            activeTab === "Student management" &&
            tabname === "Student management"
        ) {
            return dashboardRoutes.zonalStudentData;
        }
        if (
            activeTab === "Campus management" &&
            tabname === "Campus management"
        ) {
            return dashboardRoutes.zonalCampusData;
        }
    };
    return (
        <>
            <div className={graphStyles.graphs}>
                <div className={graphStyles.container}>
                    <h2>Top 3 Districts</h2>
                    <BarChart
                        data={barData}
                        addOptions={{
                            legend: { position: "none" },
                            colors: ["#91ABFF"]
                        }}
                    />
                </div>
                <div className={graphStyles.container}>
                    <h2>Student Level Stats</h2>
                    <ColumnChart
                        data={colData}
                        addOptions={{
                            axes: {
                                y: {
                                    0: { label: "No of Students" }
                                }
                            },
                            pieSliceText: "value",
                            colors: [
                                "#3B57B2",
                                "#456FF6",
                                "#A9BEFF",
                                "#6C8FFF",
                                "#A9BEFF"
                            ]
                        }}
                    />
                </div>
            </div>
            <TableTopTab active={activeTab} onTabClick={handleTabClick} />

            {data && (
                <>
                    <TableTop
                        onSearchText={handleSearch}
                        onPerPageNumber={handlePerPageNumber}
                        CSV={CSV(activeTab)}
                    />
                    <Table
                        rows={data}
                        page={currentPage}
                        perPage={perPage}
                        columnOrder={columns}
                        id={["code"]}
                    >
                        <THead
                            columnOrder={columns}
                            onIconClick={handleIconClick}
                        />
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            margin="10px 0"
                            handleNextClick={handleNextClick}
                            handlePreviousClick={handlePreviousClick}
                            perPage={perPage}
                            setPerPage={setPerPage}
                        />
                        {/*use <Blank/> when u don't need <THead /> or <Pagination inside <Table/> cause <Table /> needs atleast 2 children*/}
                    </Table>
                </>
            )}
        </>
    );
}

export default ZonalDashboard;
