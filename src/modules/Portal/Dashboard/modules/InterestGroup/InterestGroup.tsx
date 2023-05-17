import { useEffect, useState } from "react";
import Pagination from "../../../../../components/MuComponents/Pagination";
import Table from "../../../../../components/MuComponents/Table/Table";
import THead from "../../../../../components/MuComponents/Table/THead";
import TableTop from "../../../../../components/MuComponents/TableTop/TableTop";
import { getInterestGroups } from "./apis";

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

    const handleSearch = (search: string) => {
        getInterestGroups(setData, 1, setTotalPages, search);
    };

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
        getInterestGroups(setData, 1, perPage, setTotalPages, '', '');
    }, []);

<<<<<<< HEAD:src/modules/Portal/InterestGroup/pages/InterestGroup.tsx
		const handleSearch = (search: string) => {
			getInterestGroups(setData, 1, perPage, setTotalPages, search, '');
		}


		const handleSort = (sort: string) => {
			if (sort === '1') {
				getInterestGroups(setData, 1, perPage, setTotalPages, '', 'name');
			}
			if (sort === '2') {
				getInterestGroups(setData, 1, perPage, setTotalPages, '', '-name');
			}
		}

		const handlePerPageNumber = (selectedValue: number) => {
			setPerPage(selectedValue)
			getInterestGroups(setData, 1, selectedValue, setTotalPages, '', '')
		}

    return (
        <>
            <TableTop 
								onSearchText={handleSearch}
								onSortText={handleSort}
								onPerPageNumber={handlePerPageNumber}
						/>
=======
    return (
        <>
            <TableTop onSearchText={handleSearch}/>
>>>>>>> ce32864d22949f7863c64671bee070d480c1f8e6:src/modules/Portal/Dashboard/modules/InterestGroup/InterestGroup.tsx
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
