import { useEffect, useState } from "react";
import TableTop from "../../../../components/MuComponents/TableTop/TableTop";
import Table from "../../../../components/MuComponents/Table/Table";
import THead from "../../../../components/MuComponents/Table/THead";
import Pagination from "../../../../components/MuComponents/Pagination/Pagination";
import { hasRole } from "../../../../services/common_functions";
import { roles } from "../../../../services/types";
import { useNavigate } from "react-router-dom";
import { getTasks } from "./TaskApis";

type Props = {};

export const Tasks = (props: Props) => {

    const [data, setData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [sort, setSort] = useState("");
    const navigate = useNavigate();

    const columnOrder = [
        "title",
        "hashtag",
        "active",
        "channel",
        "karma",
        "usage_count",
        "variable_karma",
        "updated_by",
        "updated_at",
        "created_by",
        "created_at"
    ];

    const editableColumnNames = [
        "Title",
        "Hashtag",
        "Active",
        "Channel",
        "Karma",
        "Usage Count",
        "Variable Karma",
        "Updated By",
        "Updated On",
        "Created By",
        "Created On"
    ];

    const handleNextClick = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        getTasks(setData, nextPage, perPage);
    };

    const handlePreviousClick = () => {
        const prevPage = currentPage - 1;
        setCurrentPage(prevPage);
        getTasks(setData, prevPage, perPage);
    };

    useEffect(() => {
        if (!hasRole([roles.ADMIN, roles.FELLOW])) navigate("/404");

        getTasks(setData, 1, perPage, setTotalPages, "", "");
    }, []);

    const handleSearch = (search: string) => {
        setCurrentPage(1);
        getTasks(setData, 1, perPage, setTotalPages, search, "");
    };

    const handlePerPageNumber = (selectedValue: number) => {
        setCurrentPage(1);
        setPerPage(selectedValue);
        getTasks(setData, 1, selectedValue, setTotalPages, "", "");
    };

    const handleIconClick = (column: string) => {
        if (sort === column) {
            setSort(`-${column}`);
            getTasks(setData, 1, perPage, setTotalPages, "", `-${column}`);
        } else {
            setSort(column);
            getTasks(setData, 1, perPage, setTotalPages, "", column);
        }

        console.log(`Icon clicked for column: ${column}`);
    };

    return (
        <>
            <TableTop
                onSearchText={handleSearch}
                onPerPageNumber={handlePerPageNumber}
                CSV={"https://dev.muelarn.org/api/v1/dashboard/ig/csv"}
                // CSV={"http://localhost:8000/api/v1/dashboard/ig/csv"}
            />
            {data && (
                <Table
                    rows={data}
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
            )}
        </>
    );
};
