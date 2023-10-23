import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import Pagination from "@/MuLearnComponents/Pagination/Pagination";
import THead from "@/MuLearnComponents/Table/THead";
import Table from "@/MuLearnComponents/Table/Table";
import TableTop from "@/MuLearnComponents/TableTop/TableTop";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { titleCase } from "title-case";
import {
    getCampusDetails,
    getStudentDetails,
    getStudentLevel,
    getWeeklyKarma
} from "../services/apis";
import { PieChart, BarChart } from "../Components/Graphs";
import styles from "./CampusStudentList.module.css";
import CLIcon from "../assets/images/CampusLeadIcon.svg";
import { useToast } from "@chakra-ui/react";
import { convertDateToDayAndMonth } from "../../../utils/common";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { Counter } from "@/AnimatedComponents/Counter";

type Props = {};

//TODO: Change the styles to camelCase from snake_case'
//TODO: Move Logic to another file.

const CampusStudentList = (props: Props) => {
    const toast = useToast();

    const columns = [];
    const [studentData, setStudentData] = useState<any[]>([]);
    const [perPage, setPerPage] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [noOrg, setNoOrg] = useState(false);
    const [sort, setSort] = useState("");
    const navigate = useNavigate();

    //graph data
    const [pieData, setPieData] = useState<string[][] | null>(null);
    const [barData, setBarData] = useState<string[][] | null>(null);

    const errHandler = (err: any) => {
        toast({
            title: "Data fetch failed",
            description: err,
            status: "error",
            duration: 3000,
            isClosable: true
        });
    };

    const columnOrder = [
        { column: "fullname", Label: "Name", isSortable: true },
        // { column: "email", Label: "Email", isSortable: false },
        { column: "karma", Label: "Karma", isSortable: true },
        { column: "level", Label: "Level", isSortable: true },
        { column: "rank", Label: "Rank", isSortable: false },
        { column: "muid", Label: "MuId", isSortable: true },
        { column: "join_date", Label: "Join Date", isSortable: false }
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
            getStudentDetails(
                setStudentData,
                1,
                perPage,
                setTotalPages,
                "",
                "",
                setNoOrg
            );
            getCampusDetails(setCampusData);
            (async () => {
                let weeklyKarma = await getWeeklyKarma(errHandler);
                let formatedData = weeklyKarma.map((item: any) => [
                    convertDateToDayAndMonth(item[0]),
                    item[1]
                ]);

                setBarData([["", "Karma"]].concat(formatedData));
                setPieData(
                    [["Level", "UsersPerLevel"]].concat(
                        await getStudentLevel(errHandler)
                    )
                );
            })();
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
        if (column === "fullname") {
            column = "first_name"; //TODO: Change this when backend is ready
        }
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
        //console.log(`Icon clicked for column: ${column}`);
    };
    //console.log(perPage, currentPage);
    return (
        <>
            {noOrg ? (
                <div className={styles.no_org}>
                    <p className={styles.no_org_heading}>
                        No Organisation Found
                    </p>
                    <p className={styles.no_org_tagline}>
                        Kindly, raise a support ticket by typing
                        '/support-ticket' in the discord to add one.
                    </p>
                    <PowerfulButton
                        children="Go Back"
                        onClick={() => navigate("/dashboard/college")}
                    />
                </div>
            ) : (
                <>
                    {!campusData.campus_code ? (
                        <MuLoader />
                    ) : (
                        <div className={styles.campus_student_list_container}>
                            <div className={styles.content}>
                                <div className={styles.sec1}>
                                    <div className={styles.sec_clg}>
                                        <h1 className={styles.clg_name}>
                                            {campusData &&
                                                campusData.college_name &&
                                                titleCase(
                                                    campusData?.college_name?.toLowerCase()
                                                )}
                                            ({campusData.campus_code})
                                        </h1>
                                    </div>

                                    <div className={styles.details_card}>
                                        <div className={styles.card_one}>
                                            <div className={styles.card}>
                                                <Counter type="h1">
                                                    {campusData.total_karma}
                                                </Counter>
                                                <p>Karma</p>
                                            </div>
                                            <div className={styles.card}>
                                                <Counter type="h1">
                                                    {campusData.total_members}
                                                </Counter>
                                                <p>Total Members</p>
                                            </div>
                                        </div>
                                        <div className={styles.card_one}>
                                            <div className={styles.card}>
                                                <Counter type="h1">
                                                    {campusData.active_members}
                                                </Counter>
                                                <p>Active Members</p>
                                            </div>
                                            <div className={styles.card}>
                                                <div
                                                    className={
                                                        styles.campus_lead_card
                                                    }
                                                >
                                                    <img src={CLIcon} alt="" />
                                                    <h2>
                                                        {campusData.campus_lead}
                                                    </h2>
                                                    <p>Campus Lead</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.sec2}>
                                    <Counter
                                        type="p"
                                        className={styles.clg_rank}
                                    >
                                        {campusData?.rank}
                                    </Counter>
                                    <p className={styles.clg_rank_overlay}>
                                        RANK
                                    </p>

                                    <p className={styles.clg_zone}>
                                        {campusData.campus_zone} Zone
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className={styles.graphs}>
                        <div className={styles.container}>
                            <h2>Weekly Karma Insights</h2>

                            <BarChart
                                data={barData}
                                ylabel="Karma"
                                addOptions={{
                                    legend: { position: "none" },
                                    colors: ["#91ABFF"]
                                }}
                            />
                        </div>
                        <div className={styles.container}>
                            <h2>Student Statistics</h2>
                            <BarChart data={pieData} />
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
                                    onPerPageNumber={handlePerPageNumber}
                                    perPage={perPage}
                                    setPerPage={setPerPage}
                                />

                                {/*use <Blank/> when u don't need <THead /> or <Pagination inside <Table/> cause <Table /> needs atleast 2 children*/}
                            </Table>
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default CampusStudentList;
