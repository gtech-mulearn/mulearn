import { useEffect, useState } from "react";
import Pagination from "../../../../components/MuComponents/Pagination/Pagination";
import Table from "../../../../components/MuComponents/Table/Table";
import THead from "../../../../components/MuComponents/Table/THead";
import TableTop from "../../../../components/MuComponents/TableTop/TableTop";
import { getInterestGroups } from "./apis";
import { Blank } from "../../../../components/MuComponents/Table/Blank";
import styles from "./InterestGroup.module.css"

function InterestGroup() {
    const [data, setData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [perPage, setPerPage] = useState(5);

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
        getInterestGroups(setData, nextPage, perPage);
    };

    const handlePreviousClick = () => {
        const prevPage = currentPage - 1;
        setCurrentPage(prevPage);
        getInterestGroups(setData, prevPage, perPage);
    };

    useEffect(() => {
        getInterestGroups(setData, 1, perPage, setTotalPages, "", "");
    }, []);

    const handleSearch = (search: string) => {
        getInterestGroups(setData, 1, perPage, setTotalPages, search, "");
    };

    const handleSort = (sort: string) => {
        if (sort === "1") {
            getInterestGroups(setData, 1, perPage, setTotalPages, "", "name");
        }
        if (sort === "2") {
            getInterestGroups(setData, 1, perPage, setTotalPages, "", "-name");
        }
    };

    const handlePerPageNumber = (selectedValue: number) => {
        setPerPage(selectedValue);
        getInterestGroups(setData, 1, selectedValue, setTotalPages, "", "");
    };

    return (
        <>
            <TableTop
                onSearchText={handleSearch}
                onSortText={handleSort}
                onPerPageNumber={handlePerPageNumber}
            />
            {data && (
                <Table rows={data}>
                    <THead columns={columns} />
					<Blank/>
                    {/*use <Blank/> when u don't need <THead /> or <Pagination inside <Table/> cause <Table /> needs atleast 2 children*/}
                </Table>
            )}
			<div className={styles.pageContainer}>
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					margin="10px 0"
					handleNextClick={handleNextClick}
					handlePreviousClick={handlePreviousClick}
				/>
			</div>
        </>
    );
}

export default InterestGroup;
