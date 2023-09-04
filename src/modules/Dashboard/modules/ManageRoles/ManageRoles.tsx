import { useEffect, useRef, useState } from "react";
import Pagination from "@/MuLearnComponents/Pagination/Pagination";
import Table from "@/MuLearnComponents/Table/Table";
import THead from "@/MuLearnComponents/Table/THead";
import TableTop from "@/MuLearnComponents/TableTop/TableTop";
import { deleteManageRoles, getManageRoles } from "./apis";
import { useNavigate } from "react-router-dom";
import { MuButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { AiOutlinePlusCircle, AiOutlineUser } from "react-icons/ai";
import styles from "./Manageroles.module.css";
import modalStyles from "./components/Modal.module.css";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import { useToast } from "@chakra-ui/react";
import Modal from "./components/Modal";
import ManageRolesEditModal from "./components/ManageRolesEditModal";
import ManageRolesCreateModal from "./components/ManageRolesCreateModal";
import { getRoles } from "../../../../modules/Common/Authentication/services/onboardingApis";
import ManageUsers from "./components/ManageUsers";

function ManageRoles() {
    const [data, setData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [perPage, setPerPage] = useState(100);
    const [sort, setSort] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const firstFetch = useRef(true);
    //Modal
    const [currRoleID, setCurrRoleID] = useState("");
    const [currModal, setCurrModal] = useState<
        null | "create" | "edit" | "users"
    >(null);
    const [roles, setRoles] = useState<any>();
    const icons = {
        user: (
            <div className={modalStyles.TickIcon}>
                <AiOutlineUser width="20" height="20" />
            </div>
        ),
        tick: (
            <div className={modalStyles.TickIcon}>
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M7.5 12L10.5 15L16.5 9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                        stroke="#039855"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </div>
        ),
        cross: (
            <div className={modalStyles.CrossIcon}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 50 50"
                    fill="none"
                >
                    <path
                        d="M45.3125 0H4.6875C2.09961 0 0 2.39955 0 5.35714V44.6429C0 47.6004 2.09961 50 4.6875 50H45.3125C47.9004 50 50 47.6004 50 44.6429V5.35714C50 2.39955 47.9004 0 45.3125 0ZM37.1484 32.4219C37.6172 32.9576 37.6172 33.8281 37.1484 34.3638L33.1934 38.8839C32.7246 39.4196 31.9629 39.4196 31.4941 38.8839L25 31.3951L18.5059 38.8839C18.0371 39.4196 17.2754 39.4196 16.8066 38.8839L12.8516 34.3638C12.3828 33.8281 12.3828 32.9576 12.8516 32.4219L19.4043 25L12.8516 17.5781C12.3828 17.0424 12.3828 16.1719 12.8516 15.6362L16.8066 11.1161C17.2754 10.5804 18.0371 10.5804 18.5059 11.1161L25 18.6049L31.4941 11.1161C31.9629 10.5804 32.7246 10.5804 33.1934 11.1161L37.1484 15.6362C37.6172 16.1719 37.6172 17.0424 37.1484 17.5781L30.5957 25L37.1484 32.4219Z"
                        fill="#F84545"
                    />
                </svg>
            </div>
        )
    };

    const columnOrder = [
        // { column: "id", Label: "ID", isSortable: true },
        { column: "title", Label: "Title", isSortable: true },
        { column: "description", Label: "Description", isSortable: false },
        { column: "users_with_role", Label: "Members", isSortable: true },
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
            getManageRoles(
                setData,
                1,
                perPage,
                setIsLoading,
                setTotalPages,
                "",
                ""
            );
            getRoles(val => console.log(val), setRoles);
        }

        firstFetch.current = false;
    }, []);

    useEffect(() => {
        if (firstFetch.current) return;
        if (currModal !== null) return;
        getManageRoles(
            setData,
            1,
            perPage,
            setIsLoading,
            setTotalPages,
            "",
            sort
        );
    }, [currModal]);

    const handleSearch = (search: string) => {
        setCurrentPage(1);
        getManageRoles(
            setData,
            1,
            perPage,
            setIsLoading,
            setTotalPages,
            search,
            ""
        );
    };

    const handleEdit = (id: string | number | boolean) => {
        setCurrRoleID(id as string);
        setCurrModal("edit");
    };
    const toast = useToast();
    const handleDelete = (id: string | undefined) => {
        deleteManageRoles(id, toast);
        getManageRoles(
            setData,
            1,
            perPage,
            setIsLoading,
            setTotalPages,
            "",
            ""
        );
    };

    const handlePerPageNumber = (selectedValue: number) => {
        setCurrentPage(1);
        setPerPage(selectedValue);
        getManageRoles(
            setData,
            1,
            selectedValue,
            setIsLoading,
            setTotalPages,
            "",
            ""
        );
    };

    const handleCreate = () => {
        setCurrModal("create");
    };
    const handleUsers = () => {
        setCurrModal("users");
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
            getManageRoles(
                setData,
                1,
                perPage,
                setIsLoading,
                setTotalPages,
                "",
                column
            );
        }
    };
    return (
        <>
            {currModal
                ? (() => {
                      if (currModal === "create")
                          return (
                              <Modal
                                  onClose={setCurrModal}
                                  icon={icons.tick}
                                  header="Create Role"
                                  paragraph="Enter the values for the new role"
                              >
                                  <ManageRolesCreateModal
                                      id={currRoleID}
                                      onClose={setCurrModal}
                                      values={roles.map(
                                          (obj: any) => obj.title
                                      )}
                                  />
                              </Modal>
                          );
                      if (currModal === "edit")
                          return (
                              <Modal
                                  onClose={setCurrModal}
                                  icon={icons.cross}
                                  header="Edit Role"
                                  paragraph="Enter the new values for this role"
                              >
                                  <ManageRolesEditModal
                                      id={currRoleID}
                                      onClose={setCurrModal}
                                      values={roles.map(
                                          (obj: any) => obj.title
                                      )}
                                  />
                              </Modal>
                          );
                      if (currModal === "users")
                          return (
                              <Modal
                                  onClose={setCurrModal}
                                  icon={icons.user}
                                  header="Edit User Roles"
                                  paragraph="Change users in current role"
                              >
                                  <ManageUsers
                                      onClose={setCurrModal}
                                      roles={roles}
                                  />
                              </Modal>
                          );
                  })()
                : ""}

            <div className={styles.createBtnContainer}>
                <MuButton
                    className={styles.createBtn}
                    text={"Users"}
                    icon={<AiOutlinePlusCircle></AiOutlinePlusCircle>}
                    onClick={handleUsers}
                />
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
                            {!isLoading && (
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    margin="10px 0"
                                    handleNextClick={handleNextClick}
                                    handlePreviousClick={handlePreviousClick}
                                    onPerPageNumber={handlePerPageNumber}
                                    perPage={perPage}
                                    setPerPage={setPerPage}
                                />
                            )}
                        </div>
                        {/*use <Blank/> when u don't need <THead /> or <Pagination inside <Table/> cause <Table /> needs atleast 2 children*/}
                    </Table>
                </>
            )}
        </>
    );
}

export default ManageRoles;
