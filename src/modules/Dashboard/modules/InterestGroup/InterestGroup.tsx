import { useEffect, useRef, useState } from "react";
import Pagination from "../../../../components/MuComponents/Pagination/Pagination";
import Table from "../../../../components/MuComponents/Table/Table";
import THead from "../../../../components/MuComponents/Table/THead";
import TableTop from "../../../../components/MuComponents/TableTop/TableTop";
import { getInterestGroups } from "./apis";
import { Blank } from "../../../../components/MuComponents/Table/Blank";
import { roles } from "../../../../services/types";
import { hasRole } from "../../../../services/common_functions";
import { useNavigate } from "react-router-dom";
import { MuButton } from "../../../../components/MuComponents/MuButtons/MuButton";
import { AiOutlinePlusCircle } from "react-icons/ai";
import styles from "./InterestGroup.module.css";
import { dashboardRoutes } from "../../../../services/urls";

function InterestGroup() {
    const [data, setData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [sort, setSort] = useState("");
    const navigate = useNavigate();
    const firstFetch = useRef(true)
    const columnOrder = [
        { column: "name", Label: "Name", isSortable: true },
        { column: "user_ig_link_ig", Label: "Members", isSortable: false },
        { column: "updated_by", Label: "Updated By", isSortable: true },
        { column: "created_by", Label: "Created By", isSortable: false },
        { column: "created_at", Label: "Created On", isSortable: true }
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
        if (firstFetch.current) {
            if (!hasRole([roles.ADMIN, roles.FELLOW])) {
				navigate("/404")
			}
            getInterestGroups(setData, 1, perPage, setTotalPages, "", "");
        }
        firstFetch.current = false;
    }, []);

    const handleSearch = (search: string) => {
        setCurrentPage(1);
        getInterestGroups(setData, 1, perPage, setTotalPages, search, "");
    };

    const handleEdit = (id: string | number | boolean) => {
        console.log(id);
        navigate(`/interest-groups/edit/${id}`);
    };

    const handleDelete = (id: string | number | boolean) => {
        console.log(id);
        navigate(`/interest-groups/delete/${id}`);
    };

    const handlePerPageNumber = (selectedValue: number) => {
        setCurrentPage(1);
        setPerPage(selectedValue);
        getInterestGroups(setData, 1, selectedValue, setTotalPages, "", "");
    };

    const handleCreate = () => {
        navigate("/interest-groups/create");
    };

    const handleIconClick = (column: string) => {
        if (sort === column) {
            setSort(`-${column}`);
            getInterestGroups(
                setData,
                1,
                perPage,
                setTotalPages,
                "",
                `-${column}`
            );
        } else {
            setSort(column);
            getInterestGroups(setData, 1, perPage, setTotalPages, "", column);
        }

        console.log(`Icon clicked for column: ${column}`);
    };

    return (
        <>
            <div className={styles.createBtnContainer}>
                <MuButton
                    className={styles.createBtn}
                    text={"Create"}
                    icon={<AiOutlinePlusCircle></AiOutlinePlusCircle>}
                    onClick={handleCreate}
                />
            </div>
            <TableTop
                onSearchText={handleSearch}
                onPerPageNumber={handlePerPageNumber}
                CSV={dashboardRoutes.getIgList}
            />
            {data && (
                <Table
                    rows={data}
                    page={currentPage}
                    perPage={perPage}
                    columnOrder={columnOrder}
                    id={["id"]}
                    onEditClick={handleEdit}
                    onDeleteClick={handleDelete}
                >
                    <THead
                        columnOrder={columnOrder}
                        onIconClick={handleIconClick}
                        action={true}
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
}

export default InterestGroup;
