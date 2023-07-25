import { useEffect, useRef, useState } from "react";
import Pagination from "@/MuLearnComponents/Pagination/Pagination";
import Table from "@/MuLearnComponents/Table/Table";
import THead from "@/MuLearnComponents/Table/THead";
import TableTop from "@/MuLearnComponents/TableTop/TableTop";
import { deleteManageRoles, getManageRoles } from "./apis";
import { roles } from "@/MuLearnServices/types";
import { hasRole } from "@/MuLearnServices/common_functions";
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
    const [totalPages, setTotalPages] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [sort, setSort] = useState("");
    const navigate = useNavigate();
    const firstFetch = useRef(true)
    //Modal
    const [currRoleID,setCurrRoleID] = useState('')
    const [currModal,setCurrModal] = useState<null|'create'|'edit'>(null)

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
        if (firstFetch.current) {

            if (!hasRole([roles.ADMIN, roles.FELLOW])) navigate("/404");

            getManageRoles(setData, 1, perPage, setTotalPages, "", "");
        }
        firstFetch.current = false;
    }, []);

    useEffect(()=>{//refetch data when value is edited or created
        if (currModal===null){//refresh table when modal closes
            getManageRoles(setData, 1, perPage, setTotalPages, "", "");
        }
    },[currModal])

    const handleSearch = (search: string) => {
        setCurrentPage(1);
        getManageRoles(setData, 1, perPage, setTotalPages, search, "");
    };

    const handleEdit = (id: string | number | boolean) => {
        setCurrRoleID(id as string)
        setCurrModal('edit')
    };
	const toast = useToast();
    const handleDelete = (id: string | undefined) => {
        deleteManageRoles(id,toast);
        //navigate(`/manage-roles/delete/${id}`);
    };

    const handlePerPageNumber = (selectedValue: number) => {
        setCurrentPage(1);
        setPerPage(selectedValue);
        getManageRoles(setData, 1, selectedValue, setTotalPages, "", "");
    };

    const handleCreate = () => {
        setCurrModal('create')

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
            {currModal?
                (()=>{
                    if(currModal==='create') 
                    return(
                        <Modal 
                            onClose={setCurrModal}
                            icon="tick"
                            header="Create Role"
                            paragraph="Enter the values for the new role"
                        >
                            <ManageRolesCreateModal 
                                id={currRoleID}
                                onClose = {setCurrModal}
                            />
                        </Modal>)
                    if(currModal==='edit')
                        return(
                        <Modal 
                            onClose={setCurrModal}
                            icon="tick"
                            header="Edit Role"
                            paragraph="Enter the new values for this role"
                        >
                            <ManageRolesEditModal 
                                id={currRoleID}
                                onClose = {setCurrModal}
                            />
                        </Modal>)
                })()
                :''
            }
            
            
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
                    modalDeleteHeading="Delete"
                    modalTypeContent="error"
                    modalDeleteContent="Are you sure you want to delete this role ?"
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

export default ManageRoles;
