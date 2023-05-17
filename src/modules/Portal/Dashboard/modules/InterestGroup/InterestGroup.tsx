import { useEffect, useState } from "react";
import Pagination from "../../../../../components/MuComponents/Pagination"
import Table from "../../../../../components/MuComponents/Table/Table";
import THead from "../../../../../components/MuComponents/Table/THead";
import TableTop from "../../../../../components/MuComponents/TableTop/TableTop";
import { getInterestGroups } from "./apis";

function InterestGroup() {
    const [data, setData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const columns = [
        "ID",
        "NAME",
        "Updated By",
        "Updated On",
        "Created By",
        "Created On"
    ];

    const handleNextClick = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        getInterestGroups(setData, nextPage);
    };

    const handlePreviousClick = () => {
        const prevPage = currentPage - 1;
        setCurrentPage(prevPage);
        getInterestGroups(setData, prevPage);
    };

    useEffect(() => {
        getInterestGroups(setData, 1, setTotalPages);
    }, []);

    return (
        <>
            <TableTop />
            {data && (
                <Table rows={data}>
                    <THead columns={columns} />
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
}

export default InterestGroup;
