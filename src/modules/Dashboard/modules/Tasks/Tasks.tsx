import { useEffect, useState } from "react";
import TableTop from "../../../../components/MuComponents/TableTop/TableTop";
import Table from "../../../../components/MuComponents/Table/Table";
import THead from "../../../../components/MuComponents/Table/THead";
import Pagination from "../../../../components/MuComponents/Pagination/Pagination";
import { hasRole } from "../../../../services/common_functions";
import { roles } from "../../../../services/types";
import { useNavigate } from "react-router-dom";
import { getTasks } from "./TaskApis";
import { dashboardRoutes } from "../../../../services/urls";
import styles from "../InterestGroup/InterestGroup.module.css";
import { MuButton } from "../../../../components/MuComponents/MuButtons/MuButton";
import { AiOutlinePlusCircle } from "react-icons/ai";

type Props = {};

export const Tasks = (props: Props) => {

    const [data, setData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [sort, setSort] = useState("");
    const navigate = useNavigate();

	const columnOrder = [
        { column: "title", Label: "Title", isSortable: true },
        { column: "hashtag", Label: "Hashtag", isSortable: false },
        { column: "org", Label: "Organization", isSortable: false },
        { column: "active", Label: "Active", isSortable: false },
        { column: "karma", Label: "Karma", isSortable: true },
        { column: "usage_count", Label: "Usage Count", isSortable: false },
        { column: "variable_karma",Label: "Variable Karma",isSortable: false},
        { column: "updated_by", Label: "Updated By", isSortable: true },
        { column: "updated_at", Label: "Updated On", isSortable: true },
        { column: "created_by", Label: "Created By", isSortable: false },
        { column: "created_at", Label: "Created On", isSortable: true }
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
		//console.log(data)
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

        //console.log(`Icon clicked for column: ${column}`);
    };

	const handleEdit = (id: string | number | boolean) => {
        navigate(`/tasks/edit/${id}`);
    };

    const handleDelete = (id: string | undefined) => {
        navigate(`/tasks/delete/${id}`);
    };

	const handleCreate = () => {
        navigate("/tasks/create");
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
                CSV={dashboardRoutes.getTasksData + "csv/"}
            />
            {data && (
                <Table
                    rows={data}
                    page={currentPage}
                    perPage={perPage}
                    columnOrder={columnOrder}
                    id={["id"]}
                    onEditClick={handleEdit}
                    modalTypeContent="error"
                    onDeleteClick={handleDelete}
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
            )}
        </>
    );
};
