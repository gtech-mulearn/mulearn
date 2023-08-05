import { useEffect, useRef, useState } from "react";
import Pagination from "@/MuLearnComponents/Pagination/Pagination";
import Table from "@/MuLearnComponents/Table/Table";
import THead from "@/MuLearnComponents/Table/THead";
import TableTop from "@/MuLearnComponents/TableTop/TableTop";
import { deleteManageRoles, getManageRoles } from "./apis";
import { useNavigate } from "react-router-dom";
import { MuButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { AiOutlinePlusCircle } from "react-icons/ai";
import styles from "./Manageroles.module.css";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import { useToast } from "@chakra-ui/react";
import Modal from "./components/Modal";
import ManageRolesEditModal from "./components/ManageRolesEditModal";
import ManageRolesCreateModal from "./components/ManageRolesCreateModal";

function ManageRoles() {
    const [data, setData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [perPage, setPerPage] = useState(5);
    const [sort, setSort] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const firstFetch = useRef(true);
    //Modal
    const [currRoleID, setCurrRoleID] = useState("");
    const [currModal, setCurrModal] = useState<null | "create" | "edit">(null);

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
        getManageRoles(
            setData,
            nextPage,
            perPage,
            setIsLoading,
            () => {},
            sort
        );
    };

    const handlePreviousClick = () => {
        const prevPage = currentPage - 1;
        setCurrentPage(prevPage);
        getManageRoles(
            setData,
            prevPage,
            perPage,
            setIsLoading,
            () => {},
            sort
        );
    };

    useEffect(() => {
        if (firstFetch.current) {

            getManageRoles(setData, 1, perPage, setIsLoading, setTotalPages, "", "");
        }
        firstFetch.current = false;
    }, []);

    useEffect(() => {
        //refetch data when value is edited or created
        if (currModal === null) {
            //refresh table when modal closes
            getManageRoles(setData, 1, perPage, setIsLoading, setTotalPages, "", "");
        }
    }, [currModal]);

    const handleSearch = (search: string) => {
        setCurrentPage(1);
        getManageRoles(setData, 1, perPage, setIsLoading, setTotalPages, search, "");
    };

    const handleEdit = (id: string | number | boolean) => {
        setCurrRoleID(id as string);
        setCurrModal("edit");
    };
    const toast = useToast();
    const handleDelete = (id: string | undefined) => {
        deleteManageRoles(id, toast);
        getManageRoles(setData, 1, perPage, setIsLoading, setTotalPages, "", "");
    };

    const handlePerPageNumber = (selectedValue: number) => {
        setCurrentPage(1);
        setPerPage(selectedValue);
        getManageRoles(setData, 1, selectedValue, setIsLoading, setTotalPages, "", "");
    };

    const handleCreate = () => {
        setCurrModal("create");
    };

    const handleIconClick = (column: string) => {
        if (sort === column) {
            setSort(`-${column}`);
            getManageRoles(
                setData,
                1,
                perPage,
                setIsLoading,
                setTotalPages,
                "",
                `-${column}`
            );
        } else {
            setSort(column);
            getManageRoles(setData, 1, perPage, setIsLoading, setTotalPages, "", column);
        }

        //console.log(`Icon clicked for column: ${column}`);
    };
    return (
        <>
            {currModal
                ? (() => {
                    if (currModal === "create")
                        return (
                            <Modal
                                onClose={setCurrModal}
                                icon="tick"
                                header="Create Role"
                                paragraph="Enter the values for the new role"
                            >
                                <ManageRolesCreateModal
                                    id={currRoleID}
                                    onClose={setCurrModal}
                                />
                            </Modal>
                        );
                    if (currModal === "edit")
                        return (
                            <Modal
                                onClose={setCurrModal}
                                icon="tick"
                                header="Edit Role"
                                paragraph="Enter the new values for this role"
                            >
                                <ManageRolesEditModal
                                    id={currRoleID}
                                    onClose={setCurrModal}
                                />
                            </Modal>
                        );
                })()
                : ""}

            <div className={styles.createBtnContainer}>
                <MuButton
                    className={styles.createBtn}
                    text={"Create"}
                    icon={<AiOutlinePlusCircle></AiOutlinePlusCircle>}
                    onClick={handleCreate}
                />
            </div>

            {data && (
                <>
                    <TableTop
                        onSearchText={handleSearch}
                        onPerPageNumber={handlePerPageNumber}
                        CSV={dashboardRoutes.getRolesList}
                    />
                    <Table
                        isloading={isLoading}
                        rows={data}
                        page={currentPage}
                        perPage={perPage}
                        columnOrder={columnOrder}
                        id={["id"]}
                        onEditClick={handleEdit}
                        onDeleteClick={handleDelete}
                        modalDeleteHeading="Delete"
                        modalTypeContent="error"
                        modalDeleteContent="Are you sure you want to delete this role ?"
                    >
                        <THead
                            columnOrder={columnOrder}
                            onIconClick={handleIconClick}
                            action={true}
                        />
                        <div>
                            {!isLoading &&
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    margin="10px 0"
                                    handleNextClick={handleNextClick}
                                    handlePreviousClick={handlePreviousClick}
                                    onPerPageNumber={handlePerPageNumber}
                                />
                            }
                        </div>
                        {/*use <Blank/> when u don't need <THead /> or <Pagination inside <Table/> cause <Table /> needs atleast 2 children*/}
                    </Table>
                </>
            )}
        </>
    );
}

export default ManageRoles;
