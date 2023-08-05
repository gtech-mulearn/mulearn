import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import Pagination from "@/MuLearnComponents/Pagination/Pagination";
import THead from "@/MuLearnComponents/Table/THead";
import Table from "@/MuLearnComponents/Table/Table";
import TableTop from "@/MuLearnComponents/TableTop/TableTop";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { titleCase } from "title-case";
import { getCampusDetails, getStudentDetails } from "../services/apis";
import { PieChart, BarChart} from "../Components/Graphs";
import styles from "./CampusStudentList.module.css";
import CLIcon from '../assets/images/CampusLeadIcon.svg';


type Props = {};

//TODO: Change the styles to camelCase from snake_case'
//TODO: Move Logic to another file.

const CampusStudentList = (props: Props) => {
    const columns = [];
    const [studentData, setStudentData] = useState<any[]>([]);
    const [perPage, setPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [sort, setSort] = useState("");
    const navigate = useNavigate();

    const pieData = [['Level','UsersPerLevel'],['Level 1',10],['Level 2',20]]
    const barData = [['','Karma'],['MON',15],['TUE',5],['WED',25],['THU',5],['FRI',55],['SAT',25],['SUN',5]]
    const columnOrder = [
        { column: "fullname", Label: "Name", isSortable: false },
        // { column: "email", Label: "Email", isSortable: false },
        { column: "karma", Label: "Karma", isSortable: false },
        { column: "level", Label: "Level", isSortable: false },
        { column: "muid", Label: "MuId", isSortable: false },
        { column: "created_at", Label: "Join Date", isSortable: false }
    ];

    const [campusData, setCampusData] = useState({
        college_name: "",
        campus_lead: "",
        campus_code: "",
        campus_zone: "",
        total_karma: "",
        total_members: "",
        active_members: "",
        rank: ""
    });
    const firstFetch = useRef(true);
    const handleNextClick = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        getStudentDetails(setStudentData, nextPage, perPage);
    };
    const handlePreviousClick = () => {
        const prevPage = currentPage - 1;
        setCurrentPage(prevPage);
        getStudentDetails(setStudentData, prevPage, perPage);
    };
    useEffect(() => {
        if (firstFetch.current) {
            getStudentDetails(setStudentData, 1, perPage, setTotalPages);
            getCampusDetails(setCampusData);
        }
        firstFetch.current = false;
    }, []);

    const handleSearch = (search: string) => {
        setCurrentPage(1);
        getStudentDetails(
            setStudentData,
            1,
            perPage,
            setTotalPages,
            search,
            ""
        );
    };

    const handlePerPageNumber = (selectedValue: number) => {
        setPerPage(selectedValue);
        setCurrentPage(1);
        getStudentDetails(
            setStudentData,
            1,
            selectedValue,
            setTotalPages,
            "",
            ""
        );
    };

    const handleIconClick = (column: string) => {
        if (sort === column) {
            setSort(`-${column}`);
            getStudentDetails(
                setStudentData,
                1,
                perPage,
                setTotalPages,
                "",
                `-${column}`
            );
        } else {
            setSort(column);
            getStudentDetails(
                setStudentData,
                1,
                perPage,
                setTotalPages,
                "",
                column
            );
        }
        console.log(`Icon clicked for column: ${column}`);
    };

    return (
        <>
            <div className={styles.campus_student_list_container}>
                <div className={styles.content}>
                    <div className={styles.sec1}>
                        <h1 className={styles.clg_name}>
                            {campusData &&
                                campusData.college_name &&
                                titleCase(
                                    campusData?.college_name?.toLowerCase()
                                )
                            }
                            ({campusData.campus_code})
                        </h1>

                        <div className={styles.details_card}>
                            <div className={styles.card}>
                                
                                <h1>
                                    {parseInt(campusData.total_karma) > 1000
                                        ? (
                                              parseInt(campusData.total_karma) /
                                              1000
                                          ).toPrecision(4) + "K"
                                        : campusData.total_karma}
                                </h1>
                                <p>Karma</p>
                            </div>
                            <div className={styles.card}>
                                
                                <h1>{campusData.total_members}</h1>
                                <p>Total Members</p>
                            </div>
                            <div className={styles.card}>
                                
                                <h1>{campusData.active_members}</h1>
                                <p>Active Members<span>(30 Days)</span></p>
                                
                            </div>
                            <div className={styles.campus_lead_card}>
                                <img src={CLIcon} alt="" />
                                <h2>{campusData.campus_lead}</h2>
                                <p>Campus Lead</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.sec2}>
                        
                        <p className={styles.clg_rank}>
                            {campusData?.rank?.toString().length === 1
                                ? "0" + campusData.rank
                                : campusData.rank}
                        </p>
                        <p className={styles.clg_rank_overlay}>RANK</p>
                        
                        
                        <p className={styles.clg_zone}>{campusData.campus_zone} Zone</p>
                        
                    </div>
                </div>
            </div>
            <div className={styles.graphs}>
                <div className={styles.container}>
                    <h2>Weekly Karma Insights</h2>
                    <BarChart 
                        data={barData}
                        addOptions = {{
                            legend:{position:'none'},
                            colors:['#91ABFF']
                        }}
                    />
                </div>
                <div className={styles.container}>
                    <h2>Student Statistics</h2>
                    <PieChart 
                        data={pieData}
                        addOptions={{
                            // is3D:true,
                            pieSliceText: 'value',
                            colors:["#3B57B2","#456FF6","#A9BEFF","#6C8FFF","#A9BEFF"]
                        }}
                    />
                </div>
                
            </div>
            {studentData && (
                <>
                    <TableTop
                        onSearchText={handleSearch}
                        onPerPageNumber={handlePerPageNumber}
                    />
                    <Table
                        rows={studentData}
                        page={currentPage}
                        perPage={perPage}
                        columnOrder={columnOrder}
                    >
                        <THead
                            columnOrder={columnOrder}
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
                </>
            )}
        </>
    );
};

export default CampusStudentList;
