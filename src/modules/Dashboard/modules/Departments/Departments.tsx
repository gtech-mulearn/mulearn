import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";

import Pagination from "@/MuLearnComponents/Pagination/Pagination";
import Table from "@/MuLearnComponents/Table/Table";
import THead from "@/MuLearnComponents/Table/THead";
import TableTop from "@/MuLearnComponents/TableTop/TableTop";
import { MuButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { AiOutlinePlusCircle } from "react-icons/ai";

import { deleteDepartment, getDepartments } from "./apis";
import styles from "./Departments.module.css";
import Modal from "../CollegeLevels/components/Modal";
import { modalTypes } from "../../utils/enums";
import CreateOrUpdateDepartmentModal from "./CreateOrUpdateDepartmentModal";

const Departments = () => {
    const toast = useToast();

    const [departments, setDepartments] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [perPage, setPerPage] = useState(5);
    const [sort, setSort] = useState("");

    const [choosenDeptId, setChoosenDeptId] = useState<string | null>(null);

    const [currModal, setCurrModal] = useState<modalTypes | null>(null);

    const columnOrder = [{ column: "title", Label: "Name", isSortable: true }];

    useEffect(() => {
        getDepartments({
            setDepartments: setDepartments,
            setIsLoading: setIsLoading
        });
    }, []);

    const handleSearch = (search: string) => {};

    const handlePerPageNumber = (selectedValue: number) => {};

    const handleEdit = async (id: string | number | boolean) => {
        setChoosenDeptId(id as string);
        setCurrModal(modalTypes.edit);
    };

    const handleDelete = async (id: string | undefined) => {
        if (!id) return;
        await deleteDepartment(id);
        getDepartments({
            setDepartments: setDepartments,
            setIsLoading: setIsLoading
        });
    };

    const handleIconClick = (column: string) => {};

    const handleNextClick = () => {};

    const handlePreviousClick = () => {
        toast({ title: "Previous" });
    };

    return (
        <>
            {currModal &&
                (() => {
                    if (currModal === modalTypes.create)
                        return CreateOrUpdateDepartmentModal({
                            setCurrModal: setCurrModal,
                            setDepartments: setDepartments,
                            setIsLoading: setIsLoading,
                            toast: toast
                        });
                    if (currModal === modalTypes.edit)
                        return choosenDeptId
                            ? CreateOrUpdateDepartmentModal({
                                  id: choosenDeptId!,
                                  setCurrModal: setCurrModal,
                                  setDepartments: setDepartments,
                                  setIsLoading: setIsLoading,
                                  toast: toast
                              })
                            : null;
                })()}
            <div className={styles.createBtnContainer}>
                <MuButton
                    className={styles.createBtn}
                    text={"Create"}
                    icon={<AiOutlinePlusCircle />}
                    onClick={() => setCurrModal(modalTypes.create)}
                />
            </div>
            {departments && (
                <>
                    {/* <TableTop
                        onSearchText={handleSearch}
                        onPerPageNumber={handlePerPageNumber}
                        // CSV={dashboardRoutes.getIgList}
                    /> */}
                    <Table
                        rows={departments}
                        isloading={isLoading}
                        page={currentPage}
                        perPage={perPage}
                        columnOrder={columnOrder}
                        id={["id"]}
                        onEditClick={handleEdit}
                        onDeleteClick={handleDelete}
                        modalDeleteHeading="Delete"
                        modalTypeContent="error"
                        modalDeleteContent="Are you sure you want to delete "
                    >
                        <THead
                            columnOrder={columnOrder}
                            onIconClick={handleIconClick}
                            action={true}
                        />
                        <div className={styles.tableFooter}>
                            {!isLoading && (
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    margin="10px 0"
                                    handleNextClick={handleNextClick}
                                    handlePreviousClick={handlePreviousClick}
                                    onSearchText={handleSearch}
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
};

export default Departments;
