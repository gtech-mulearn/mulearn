import Pagination from "@/MuLearnComponents/Pagination/Pagination";
import THead from "@/MuLearnComponents/Table/THead";
import Table from "@/MuLearnComponents/Table/Table";
import TableTop from "@/MuLearnComponents/TableTop/TableTop";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import { useToast } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteManageUsers, getManageUsers } from "./apis";

function ManageRoles() {
    const [data, setData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [perPage, setPerPage] = useState(5);
    const [sort, setSort] = useState("");
    const navigate = useNavigate();
    const firstFetch = useRef(true);

    const columnOrder = [
        { column: "first_name", Label: "First Name", isSortable: true },
        { column: "last_name", Label: "Last Name", isSortable: false },
        { column: "total_karma", Label: "Total Karma", isSortable: true },
        // { column: "mu_id", Label: "Mu ID", isSortable: false },
        { column: "email", Label: "Email", isSortable: true },
        { column: "mobile", Label: "Mobile", isSortable: false },
        { column: "dob", Label: "DOB", isSortable: false },
        { column: "gender", Label: "Gender", isSortable: false },

        { column: "college", Label: "Institute", isSortable: false },

        { column: "discord_id", Label: "Discord ID", isSortable: false },
        // { column: "id", Label: "ID", isSortable: false },
        { column: "active", Label: "Active", isSortable: false },
        { column: "created_at", Label: "Created On", isSortable: true }
    ];

    const handleNextClick = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        getManageUsers(
            setData,
            nextPage,
            perPage,
            "",
            sort
        );
    };

    const handlePreviousClick = () => {
        const prevPage = currentPage - 1;
        setCurrentPage(prevPage);
        getManageUsers(
            setData,
            prevPage,
            perPage,
            "",
            sort
        );
    };

    useEffect(() => {
        if (firstFetch.current) {

            getManageUsers(setData, 1, perPage, setTotalPages, "", "");
        }
        firstFetch.current = false;
    }, []);

    const handleSearch = (search: string) => {
        setCurrentPage(1);
        getManageUsers(setData, 1, perPage, setTotalPages, search, "");
    };

    const handleEdit = (id: string | number | boolean) => {
        //console.log(id);
        navigate(`/dashboard/manage-users/edit/${id}`);
    };

    const toast = useToast();

    const handleDelete = (id: string | undefined) => {
        deleteManageUsers(id, toast);
        getManageUsers(setData, 1, perPage, setTotalPages, "", "");
        navigate("/manage-users");
    };

    const handlePerPageNumber = (selectedValue: number) => {
        setCurrentPage(1);
        setPerPage(selectedValue);
        getManageUsers(setData, 1, selectedValue, setTotalPages, "", "");
    };

    // const handleCreate = () => {
    //     navigate("/manage-users/create");
    // };

    const handleIconClick = (column: string) => {
        if (sort === column) {
            setSort(`-${column}`);
            getManageUsers(
                setData,
                1,
                perPage,
                setTotalPages,
                "",
                `-${column}`
            );
        } else {
            setSort(column);
            getManageUsers(setData, 1, perPage, setTotalPages, "", column);
        }

        //console.log(`Icon clicked for column: ${column}`);
    };

    return (
        <>
            {/* <div className={styles.createBtnContainer}>
                <MuButton
                    className={styles.createBtn}
                    text={"Create"}
                    icon={<AiOutlinePlusCircle></AiOutlinePlusCircle>}
                    onClick={handleCreate}
                />
            </div> */}

            {data && (
                <>
                    <TableTop
                        onSearchText={handleSearch}
                        onPerPageNumber={handlePerPageNumber}
                        CSV={dashboardRoutes.getUsersList}
                    // CSV={"http://localhost:8000/api/v1/dashboard/ig/csv"}
                    />
                    <Table
                        rows={data}
                        page={currentPage}
                        perPage={perPage}
                        columnOrder={columnOrder}
                        id={["id"]}
                        onEditClick={handleEdit}
                        onDeleteClick={handleDelete}
                        modalDeleteHeading="Delete"
                        modalTypeContent="error"
                        modalDeleteContent="Are you sure you want to delete this user ?"
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
                            handlePreviousClick={handlePreviousClick} onSearchText={handleSearch}
                            onPerPageNumber={handlePerPageNumber}
                        />
                        {/*use <Blank/> when u don't need <THead /> or <Pagination inside <Table/> cause <Table /> needs atleast 2 children*/}
                    </Table>
                </>
            )}
        </>
    );
}

export default ManageRoles;
