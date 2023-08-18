import Pagination from "@/MuLearnComponents/Pagination/Pagination";
import THead from "@/MuLearnComponents/Table/THead";
import Table from "@/MuLearnComponents/Table/Table";
import TableTop from "@/MuLearnComponents/TableTop/TableTop";
import { useToast } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, BarChart, ColumnChart } from "../CampusStudentList/Components/Graphs";
import { getdistrictdashboard, getStudentLevels, getTopCampus } from "./apis";
import { columnsCampus, columnsStudent } from "./THeaders";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import "./Organizations.css";
import "./DistricDashboard.scss";
import TableTopTab from "./TableTopTab";
import graphStyles from "../CampusStudentList/pages/CampusStudentList.module.css"

function DistrictDashboard() {
    const [data, setData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [perPage, setPerPage] = useState(5);
    const [columns, setColumns] = useState(columnsStudent);
    const [activeTab, setActiveTab] = useState("Student management");
    const [sort, setSort] = useState("");

    const firstFetch = useRef(true);

    const toast = useToast();

    //graph data
    const [colData,setColData] = useState<string[][]|null>(null)
    const [barData,setBarData] = useState<string[][]|null>(null)

    useEffect(() => {
        if (firstFetch.current) {
            
            
            getdistrictdashboard(
                activeTab,
                setData,
                1,
                perPage,
                setTotalPages,
                "",
                ""
            );

            (async()=>{
                try{
                    setBarData([['', '']].concat(await getTopCampus()))
                    setColData([['Colleges',"Level 1","Level 2","Level 3","Level 4"]].concat(await getStudentLevels()))
                    
                }catch(err){
                    toast({
                        title: "Data fetch failed",
                        status: "error",
                        duration: 3000,
                        isClosable: true
                    })
                }
                
                
            })()

        }
        firstFetch.current = false;
    }, []);

    const handleNextClick = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        getdistrictdashboard(activeTab, setData, nextPage, perPage);
    };

    const handlePreviousClick = () => {
        const prevPage = currentPage - 1;
        setCurrentPage(prevPage);
        getdistrictdashboard(activeTab, setData, prevPage, perPage);
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
            ""
        );
    };

    const handlePerPageNumber = (selectedValue: number) => {
        setCurrentPage(1);
        setPerPage(selectedValue);
        getdistrictdashboard(
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
            getdistrictdashboard(
                tab,
                setData,
                1,
                perPage,
                setTotalPages,
                "",
                ""
            );
        } else if (tab === "Campus management") {
            setColumns(columnsCampus);
            getdistrictdashboard(
                tab,
                setData,
                1,
                perPage,
                setTotalPages,
                "",
                ""
            );
        } else {
            alert("Error to load Table Headers");
        }
        setCurrentPage(1);
        setActiveTab(tab);
    };

    const handleIconClick = (column: string) => {
        if (sort === column) {
            setSort(`-${column}`);
            getdistrictdashboard(
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
            getdistrictdashboard(
                activeTab,
                setData,
                1,
                perPage,
                setTotalPages,
                "",
                sort
            );
        }

        //console.log(`Icon clicked for column: ${column}`);
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
    console.log(colData,barData)
    return (
        <>
            <TableTopTab active={activeTab} onTabClick={handleTabClick} />
            <div className={graphStyles.graphs}>
                <div className={graphStyles.container}>
                    <h2>Top 3 Campus</h2>
                    <BarChart
                        data={barData}
                        addOptions={{
                            legend: { position: 'none' },
                            colors: ['#91ABFF']
                        }}
                    />
                </div>
                <div className={graphStyles.container}>
                    <h2>Student Level Stats</h2>
                    <ColumnChart
                        data={colData}
                        addOptions={{
                            axes:{
                                y:{
                                    0:{label:"No of Students"}
                                }
                            },
                            pieSliceText: 'value',
                            colors: ["#3B57B2", "#456FF6", "#A9BEFF", "#6C8FFF", "#A9BEFF"]
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

export default DistrictDashboard;
