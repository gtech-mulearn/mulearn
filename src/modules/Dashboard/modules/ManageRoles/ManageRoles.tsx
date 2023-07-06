import { useEffect, useState } from "react";
import Pagination from "../../../../components/MuComponents/Pagination/Pagination";
import Table from "../../../../components/MuComponents/Table/Table";
import THead from "../../../../components/MuComponents/Table/THead";
import TableTop from "../../../../components/MuComponents/TableTop/TableTop";
import { getManageRoles } from "./apis";
import { Blank } from "../../../../components/MuComponents/Table/Blank";
import { roles } from "../../../../services/types";
import { hasRole } from "../../../../services/common_functions";
import { useNavigate } from "react-router-dom";
import { MuButton } from "../../../../components/MuComponents/MuButtons/MuButton";
import { AiOutlinePlusCircle } from "react-icons/ai";
import styles from "./Manageroles.module.css";
import { dashboardRoutes } from "../../../../services/urls";

function ManageRoles() {
    const [data, setData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [sort, setSort] = useState("");
    const navigate = useNavigate();

    const columnOrder = [
        // { column: "id", Label: "ID", isSortable: true },
        { column: "title", Label: "Title", isSortable: false },
        { column: "description", Label: "Description", isSortable: false },
        { column: "users_with_role", Label: "Members", isSortable: false },
        { column: "updated_by", Label: "Updated By", isSortable: true },
        { column: "created_by", Label: "Created By", isSortable: false },
        { column: "created_at", Label: "Created On", isSortable: true }
    ];

    const handleNextClick = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        getManageRoles(setData, nextPage, perPage);
    };

    const handlePreviousClick = () => {
        const prevPage = currentPage - 1;
        setCurrentPage(prevPage);
        getManageRoles(setData, prevPage, perPage);
    };

    useEffect(() => {
        if (!hasRole([roles.ADMIN, roles.FELLOW])) navigate("/404");

        getManageRoles(setData, 1, perPage, setTotalPages, "", "");
    }, []);

    const handleSearch = (search: string) => {
        setCurrentPage(1);
        getManageRoles(setData, 1, perPage, setTotalPages, search, "");
    };

    const handleEdit = (id: string | number | boolean) => {
        //console.log(id);
        navigate(`/manage-roles/edit/${id}`);
    };

    const handleDelete = (id: string | number | boolean) => {
        //console.log(id);
        navigate(`/manage-roles/delete/${id}`);
    };

    const handlePerPageNumber = (selectedValue: number) => {
        setCurrentPage(1);
        setPerPage(selectedValue);
        getManageRoles(setData, 1, selectedValue, setTotalPages, "", "");
    };

    const handleCreate = () => {
        navigate("/manage-roles/create");
    };

    const handleIconClick = (column: string) => {
        if (sort === column) {
            setSort(`-${column}`);
            getManageRoles(
                setData,
                1,
                perPage,
                setTotalPages,
                "",
                `-${column}`
            );
        } else {
            setSort(column);
            getManageRoles(setData, 1, perPage, setTotalPages, "", column);
        }

        //console.log(`Icon clicked for column: ${column}`);
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
                CSV={dashboardRoutes.getRolesList}
                // CSV={"http://localhost:8000/api/v1/dashboard/ig/csv"}
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

export default ManageRoles;
