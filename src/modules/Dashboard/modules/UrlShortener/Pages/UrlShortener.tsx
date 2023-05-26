import React, { useEffect, useState } from "react";
import styles from "./UrlShortener.module.css";
import { getCampusDetails, getStudentDetails } from "../Services/apis";

import { useNavigate } from "react-router-dom";
import TableTop from "../../../../../components/MuComponents/TableTop/TableTop";
import Table from "../../../../../components/MuComponents/Table/Table";
import THead from "../../../../../components/MuComponents/Table/THead";
import Pagination from "../../../../../components/MuComponents/Pagination/Pagination";
import { roles } from "../../../../../services/types";
import { hasRole } from "../../../../../services/common_functions";

type Props = {};

const UrlShortener = (props: Props) => {
    const columns = [];
    const [studentData, setStudentData] = useState<any[]>([]);
    const [perPage, setPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sort, setSort] = useState("");
    const navigate = useNavigate();

    const columnOrder = ["fullname", "email", "phone", "karma", "muid"];

    const editableColumnNames = ["Name", "Email", "Phone", "Karma", "MuId"];

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
        if (!hasRole([roles.ADMIN])) navigate("/404");

        getStudentDetails(setStudentData, 1, perPage, setTotalPages);
        getCampusDetails(setCampusData);
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
            <div className={styles.url_shortener_container}>
                <div className={styles.create_new_url}>
                    <form>
                        <input
                            className={styles.title}
                            type="text"
                            placeholder="Title"
                        />
                        <input
                            className={styles.long_url}
                            type="text"
                            placeholder="Paste long url"
                        />
                        <div className={styles.short_url_input}>
                            <input
                                className={styles.short_url}
                                type="text"
                                placeholder="Enter short url"
                            />
                            <input
                                className={styles.submit}
                                type="submit"
                                value="Shorten"
                            ></input>
                        </div>
                    </form>
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
                    editableColumnNames={editableColumnNames}
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
    );
};

export default UrlShortener;
