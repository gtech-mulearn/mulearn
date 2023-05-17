import React from "react";
import styles from "./CampusStudentList.module.css";
import Table from "../../../components/MuComponents/Table/Table";
import THead from "../../../components/MuComponents/Table/THead";
import { Blank } from "../../../components/MuComponents/Table/Blank";
import TableTop from "../../../components/MuComponents/TableTop/TableTop";
import Pagination from "../../../components/MuComponents/Pagination";

type Props = {};

const CampusStudentList = (props: Props) => {
    const columns = [
        "SI NO",
        "Name",
        "Karma",
        "Rank",
        "Level",
        "Year",
        "Status"
    ];
    const data = [
        {
            no: "1",
            name: "jovit",
            karma: "10k",
            rank: "13",
            level: "2",
            year: "2",
            status: "dead"
        },
        {
            no: "1",
            name: "jovit",
            karma: "10k",
            rank: "13",
            level: "2",
            year: "2",
            status: "dead"
        },
        {
            no: "1",
            name: "jovit",
            karma: "10k",
            rank: "13",
            level: "2",
            year: "2",
            status: "dead"
        }
    ];
    const handleSearch = (search: string) => {
        // getInterestGroups(setData, 1, setTotalPages, search);
    };
    return (
        <>
            <div className={styles.campus_student_list_container}>
                <div className={styles.content}>
                    <div className={styles.sec1}>
                        <p className={styles.campus_code}>
                            Campus code : SJCET
                        </p>
                        <h1 className={styles.clg_name}>
                            St. Joseph’s college of Engineering &
                            Technology,Palai
                        </h1>
                        <p className={styles.campus_lead}>
                            Campus Lead : Aswin Asok
                        </p>

                        <div className={styles.details_card}>
                            <div className={styles.card}>
                                <p>Karma points</p>
                                <h1>18927</h1>
                            </div>
                            <div className={styles.card}>
                                <p>Total Members</p>
                                <h1>3762</h1>
                            </div>
                            <div className={styles.card}>
                                <p>Active Members</p>
                                <h1>375</h1>
                            </div>
                        </div>
                    </div>
                    <div className={styles.sec2}>
                        <div className={styles.clg_rank_div}>
                            <p className={styles.clg_rank}>20</p>
                            <p className={styles.clg_rank_overlay}>RANK</p>
                        </div>
                        <div className={styles.level_div}>
                            <h2>Campus Zone</h2>
                            <p>Central</p>
                        </div>
                    </div>
                </div>
            </div>

            <TableTop onSearchText={handleSearch} />
            <Table rows={data}>
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
