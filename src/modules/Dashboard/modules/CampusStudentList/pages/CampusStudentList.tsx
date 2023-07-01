import React, { useEffect, useRef, useState } from "react";
import styles from "./CampusStudentList.module.css";
import { getCampusDetails, getStudentDetails } from "../services/apis";
import TableTop from "../../../../../components/MuComponents/TableTop/TableTop";
import Table from "../../../../../components/MuComponents/Table/Table";
import THead from "../../../../../components/MuComponents/Table/THead";
import Pagination from "../../../../../components/MuComponents/Pagination/Pagination";
import { GridLoader } from "react-spinners";
import { titleCase } from "title-case";
import { hasRole } from "../../../../../services/common_functions";
import { roles } from "../../../../../services/types";
import { useNavigate } from "react-router-dom";

type Props = {};

const CampusStudentList = (props: Props) => {
    const columns = [];
    const [studentData, setStudentData] = useState<any[]>([]);
    const [perPage, setPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [sort, setSort] = useState("");
    const navigate = useNavigate();

    const columnOrder = [
        { column: "fullname", Label: "Name", isSortable: false },
        // { column: "email", Label: "Email", isSortable: false },
        { column: "karma", Label: "Karma", isSortable: false },
        { column: "level", Label: "Level", isSortable: false },
        { column: "muid", Label: "MuId", isSortable: false },
        { column: "created_at", Label: "Join Date", isSortable: false },
    ];

    const [campusData, setCampusData] = useState({
        collegeName: "",
        campusLead: "",
        campusCode: "",
        campusZone: "",
        totalKarma: "",
        totalMembers: "",
        activeMembers: "",
        rank: ""
    });
    const firstFetch = useRef(true)
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
            if (!hasRole([roles.CAMPUS_LEAD])) navigate("/404");
            getStudentDetails(setStudentData, 1, perPage, setTotalPages);
            getCampusDetails(setCampusData, setLoading);
        }
        firstFetch.current = false
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
            {loading ? (
                <div className={styles.loader_container}>
                    <GridLoader color="#014bb2" />
                </div>
            ) : (
                <>
                    <div className={styles.campus_student_list_container}>
                        <div className={styles.content}>
                            <div className={styles.sec1}>
                                <p className={styles.campus_code}>
                                    Campus code : {campusData.campusCode}
                                </p>
                                <h1 className={styles.clg_name}>
                                    {titleCase(
                                        campusData.collegeName.toLowerCase()
                                    )}
                                </h1>
                                <p className={styles.campus_lead}>
                                    Campus Lead : {campusData.campusLead}
                                </p>

                                <div className={styles.details_card}>
                                    <div className={styles.card}>
                                        <p>Karma points</p>
                                        <h1>
                                            {parseInt(campusData.totalKarma) >
                                                1000
                                                ? (
                                                    parseInt(
                                                        campusData.totalKarma
                                                    ) / 1000
                                                ).toPrecision(4) + "K"
                                                : campusData.totalKarma}
                                        </h1>
                                    </div>
                                    <div className={styles.card}>
                                        <p>Total Members</p>
                                        <h1>{campusData.totalMembers}</h1>
                                    </div>
                                    <div className={styles.card}>
                                        <p>Active Members</p>
                                        <h1>{campusData.activeMembers}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.sec2}>
                                <div className={styles.clg_rank_div}>
                                    <p className={styles.clg_rank}>
                                        {campusData.rank.toString().length === 1
                                            ? "0" + campusData.rank
                                            : campusData.rank}
                                    </p>
                                    <p className={styles.clg_rank_overlay}>
                                        RANK
                                    </p>
                                </div>
                                <div className={styles.level_div}>
                                    <h2>Campus Zone</h2>
                                    <p>{campusData.campusZone}</p>
                                </div>
                            </div>
                        </div>
                    </div>
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
