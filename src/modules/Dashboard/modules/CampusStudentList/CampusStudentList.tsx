import React, { useEffect, useState } from "react";
import styles from "./CampusStudentList.module.css";
import { getCampusDetails, getStudentDetails } from "./apis";
import TableTop from "../../../../components/MuComponents/TableTop/TableTop";
import Table from "../../../../components/MuComponents/Table/Table";
import THead from "../../../../components/MuComponents/Table/THead";
import Pagination from "../../../../components/MuComponents/Pagination/Pagination";

type Props = {};

const CampusStudentList = (props: Props) => {
    const columns = ["SI NO", "Name", "Email", "Phone", "Karma", "Rank"];
    const [studentData, setStudentData] = useState([{}]);
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
    const handleSearch = (search: string) => {
        // getInterestGroups(setData, 1, setTotalPages, search);
    };
    useEffect(() => {
        getStudentDetails(setStudentData);
        getCampusDetails(setCampusData);
    }, []);

    return (
        <>
            <div className={styles.campus_student_list_container}>
                <div className={styles.content}>
                    <div className={styles.sec1}>
                        <p className={styles.campus_code}>
                            Campus code : {campusData.campusCode}
                        </p>
                        <h1 className={styles.clg_name}>
                            {campusData.collegeName}
                        </h1>
                        <p className={styles.campus_lead}>
                            Campus Lead : {campusData.campusLead}
                        </p>

                        <div className={styles.details_card}>
                            <div className={styles.card}>
                                <p>Karma points</p>
                                <h1>{campusData.totalKarma}</h1>
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
                            <p className={styles.clg_rank_overlay}>RANK</p>
                        </div>
                        <div className={styles.level_div}>
                            <h2>Campus Zone</h2>
                            <p>{campusData.campusZone}</p>
                        </div>
                    </div>
                </div>
            </div>
            <TableTop onSearchText={handleSearch} />
            <Table rows={studentData}>
                <THead columns={columns} />
                <Pagination
                    currentPage={1}
                    totalPages={1}
                    margin="10px 0"
                    // handleNextClick={handleNextClick}
                    // handlePreviousClick={handlePreviousClick}
                />
                {/*use <Blank/> when u don't need <THead /> or <Pagination inside <Table/> cause <Table /> needs atleast 2 children*/}
            </Table>
        </>
    );
};

export default CampusStudentList;
