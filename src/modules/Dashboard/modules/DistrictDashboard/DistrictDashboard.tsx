import Pagination from "@/MuLearnComponents/Pagination/Pagination";
import THead from "@/MuLearnComponents/Table/THead";
import Table from "@/MuLearnComponents/Table/Table";
import TableTop from "@/MuLearnComponents/TableTop/TableTop";
import { useEffect, useRef, useState, useCallback } from "react";
import { BarChart, ColumnChart } from "../CampusStudentList/Components/Graphs";
import { getdistrictdashboard, getStudentLevels, getTopCampus } from "./apis";
import { columnsCampus, columnsStudent } from "./THeaders";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import TableTopTab from "./TableTopTab";
import styles from "./DistrictDashboard.module.css"; // Updated import
import { Blank } from "@/MuLearnComponents/Table/Blank";
import toast from "react-hot-toast";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";

function DistrictDashboard() {
    const [data, setData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [perPage, setPerPage] = useState(20);
    const [columns, setColumns] = useState(columnsStudent);
    const [activeTab, setActiveTab] = useState("Student management");
    const [sort, setSort] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Graph data
    const [colData, setColData] = useState<string[][] | null>(null);
    const [barData, setBarData] = useState<string[][] | null>(null);

    const errHandler = (err: any) => {
        toast.error("Data Fetch Failed");
        toast.error(err);
    };

    // Memoize the fetch functions
    const fetchDashboardData = useCallback(async () => {
        setIsLoading(true);
        try {
            await getdistrictdashboard(
                activeTab,
                setData,
                currentPage,
                perPage,
                setTotalPages,
                "",
                sort
            );
        } catch (error) {
            errHandler(error);
        } finally {
            setIsLoading(false);
        }
    }, [activeTab, currentPage, perPage, sort]);

    const fetchGraphData = useCallback(async () => {
        try {
            const [topCampus, studentLevels] = await Promise.all([
                getTopCampus(errHandler),
                getStudentLevels(errHandler)
            ]);
            setBarData(topCampus);
            setColData([
                ["Levels", "Level 1", "Level 2", "Level 3", "Level 4"]
            ].concat(studentLevels));
        } catch (error) {
            errHandler(error);
        }
    }, []);

    // Initial data fetch
    useEffect(() => {
        fetchDashboardData();
        fetchGraphData();
    }, []);

    // Handle tab changes
    useEffect(() => {
        setCurrentPage(1);
        fetchDashboardData();
    }, [activeTab]);

    // Handle pagination changes
    useEffect(() => {
        fetchDashboardData();
    }, [currentPage, perPage, sort]);

    const handleNextClick = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handlePreviousClick = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const handleSearch = (search: string) => {
        setCurrentPage(1);
        getdistrictdashboard(
            activeTab,
            setData,
            1,
            perPage,
            setTotalPages,
            search,
            sort
        );
    };

    const handlePerPageNumber = (selectedValue: number) => {
        setCurrentPage(1);
        setPerPage(selectedValue);
    };

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        setColumns(tab === "Student management" ? columnsStudent : columnsCampus);
    };

    const handleSort = (sortID: string) => {
        setSort(sortID);
    };

    const CSV = (tabname: string) => {
        if (
            activeTab === "Student management" &&
            tabname === "Student management"
        ) {
            return dashboardRoutes.districtStudentData;
        }
        if (
            activeTab === "Campus management" &&
            tabname === "Campus management"
        ) {
            return dashboardRoutes.districtCampusData;
        }
    };

    return (
        <div className={styles.container}>
            <TableTopTab activeTab={activeTab} onTabChange={handleTabChange} />
            <TableTop
                onSearchText={handleSearch}
                onPerPageNumber={handlePerPageNumber}
                onSort={handleSort}
            />
            {isLoading ? (
                <div className={styles.loadingContainer}>
                    <MuLoader />
                </div>
            ) : (
                <>
                    <Table
                        rows={data}
                        page={currentPage}
                        perPage={perPage}
                        columns={columns}
                        isCSV={true}
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
                </>
            )}
            <div className={styles.graphs}>
                <div className={styles.graph_container}>
                    <h2>Top 3 Campus</h2>
                    <BarChart
                        data={barData}
                        ylabel="Karma"
                        addOptions={{
                            legend: { position: "none" },
                            colors: ["#91ABFF"]
                        }}
                    />
                </div>
                <div className={styles.graph_container}>
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
                            onIconClick={handleSort}
                        />
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            margin="10px 0"
                            handleNextClick={handleNextClick}
                            handlePreviousClick={handlePreviousClick}
                            perPage={perPage}
                            setPerPage={handlePerPageNumber as any}
                        />
                        <Blank />
                    </Table>
                </>
            )}
        </div>
    );
}

export default DistrictDashboard;