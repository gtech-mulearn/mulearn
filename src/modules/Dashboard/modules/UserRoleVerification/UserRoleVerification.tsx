import { useEffect, useState } from "react";
import Pagination from "../../../../components/MuComponents/Pagination/Pagination";
import Table from "../../../../components/MuComponents/Table/Table";
import THead from "../../../../components/MuComponents/Table/THead";
import TableTop from "../../../../components/MuComponents/TableTop/TableTop";
import { getUserRoleVerification } from "./apis";
import { Blank } from "../../../../components/MuComponents/Table/Blank";
import { roles } from "../../../../services/types";
import { hasRole } from "../../../../services/common_functions";
import { useNavigate } from "react-router-dom";
import { MuButton } from "../../../../components/MuComponents/MuButtons/MuButton";
import { AiOutlinePlusCircle } from "react-icons/ai";
import styles from "./UserRoleVerification.module.css";
import { dashboardRoutes } from "../../../../services/urls";

function UsersRoleVerification() {
    const [data, setData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [sort, setSort] = useState("");
    const navigate = useNavigate();

   
    const columnOrder = [
        { column: "full_name", Label: "Full Name", isSortable: true },
        { column: "mu_id", Label: "Mu ID", isSortable: false },
        { column: "discord_id", Label: "Discord ID", isSortable: false },
        // { column: "id", Label: "ID", isSortable: false },
        // { column: "user_id", Label: "User ID", isSortable: false },
        { column: "role_title", Label: "Role Title", isSortable: false },
        // { column: "role_id", Label: "Role ID", isSortable: false },
        { column: "Verified", Label: "Verified", isSortable: false }
    ];

    const editableColumnNames = [
        "First Name",
        "Last Name",
        "Mu ID",
        "Discord ID",
        "ID",
        "User Id",
        "Role Title",
        "Role ID",
        "Verified",
        
    ];

    const handleNextClick = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        getUserRoleVerification(setData, nextPage, perPage);
    };

    const handlePreviousClick = () => {
        const prevPage = currentPage - 1;
        setCurrentPage(prevPage);
        getUserRoleVerification(setData, prevPage, perPage);
    };

    useEffect(() => {
        if (!hasRole([roles.ADMIN, roles.FELLOW])) navigate("/404");

        getUserRoleVerification(setData, 1, perPage, setTotalPages, "", "");
    }, []);

    const handleSearch = (search: string) => {
        setCurrentPage(1);
        getUserRoleVerification(setData, 1, perPage, setTotalPages, search, "");
    };

    const handleEdit = (id: string | number | boolean) => {
        console.log(id);
        navigate(`/user-role-verification/edit/${id}`);
    };

    const handleDelete = (id: string | number | boolean) => {
        console.log(id);
        navigate(`/user-role-verification/delete/${id}`);
    };

    const handlePerPageNumber = (selectedValue: number) => {
        setCurrentPage(1);
        setPerPage(selectedValue);
        getUserRoleVerification(
            setData,
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
            getUserRoleVerification(
                setData,
                1,
                perPage,
                setTotalPages,
                "",
                `-${column}`
            );
        } else {
            setSort(column);
            getUserRoleVerification(
                setData,
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
            <TableTop
                onSearchText={handleSearch}
                onPerPageNumber={handlePerPageNumber}
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
                   
                </Table>
            )}
        </>
    );
}

export default UsersRoleVerification;
