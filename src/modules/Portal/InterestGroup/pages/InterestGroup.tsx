import { useEffect, useState } from "react";
import { getInterestGroups } from "../services/apis";
import TableTop from "../../../../Components/MuComponents/TableTop/TableTop";
import Table from "../../../../Components/MuComponents/Table/Table";
import THead from "../../../../Components/MuComponents/Table/THead";
import Pagination from "../../../../Components/MuComponents/Pagination";

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
                    {/*use <Blank/> when u don't need <THead /> or <Pagination /> inside <Table/> cause <Table /> needs atleast 2 children*/}
                </Table>
            )}
        </>
    );
}

export default InterestGroup;
