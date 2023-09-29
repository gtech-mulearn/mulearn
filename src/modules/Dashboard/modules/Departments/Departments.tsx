import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";

import Pagination from "@/MuLearnComponents/Pagination/Pagination";
import Table from "@/MuLearnComponents/Table/Table";
import THead from "@/MuLearnComponents/Table/THead";
import TableTop from "@/MuLearnComponents/TableTop/TableTop";
import { MuButton, PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { AiOutlinePlusCircle } from "react-icons/ai";

import { deleteDepartment, getDepartments } from "./apis";
import styles from "./Departments.module.css";
import { modalTypes } from "../../utils/enums";
import CreateOrUpdateDepartmentModal from "./CreateOrUpdateDepartmentModal";

const Departments = () => {
    const toast = useToast();

    const [departments, setDepartments] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [perPage, setPerPage] = useState(10);
    const [sort, setSort] = useState("");

    const [choosenDeptId, setChoosenDeptId] = useState<string | null>(null);

    const [currModal, setCurrModal] = useState<modalTypes | null>(null);

    const columnOrder = [{ column: "title", Label: "Name", isSortable: true }];

    useEffect(() => {
        setCurrentPage(1);
        getDepartments({
            setDepartments: setDepartments,
            setIsLoading: setIsLoading,
            setTotalPages: setTotalPages
        });
    }, []);

    const handleSearch = (search: string) => {
        setCurrentPage(1);
        return getDepartments({
            setDepartments: setDepartments,
            setIsLoading: setIsLoading,
            search: search,
            setTotalPages: setTotalPages,
            sortBy: sort
        });
    };

    const handlePerPageNumber = (selectedValue: number) => {
        setCurrentPage(1);
        setPerPage(selectedValue);
        getDepartments({
            setDepartments: setDepartments,
            setIsLoading: setIsLoading,
            perPage: selectedValue,
            setTotalPages: setTotalPages,
            sortBy: sort
        });
    };

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

    const handleSortIconClick = (column: string) => {
        setCurrentPage(1);
        const sortBy = sort === column ? `-${column}` : column;
        setSort(sortBy);
        getDepartments({
            setDepartments: setDepartments,
            setIsLoading: setIsLoading,
            sortBy: sortBy
        });
    };

    const handleNextClick = () => {
        if (currentPage >= totalPages) return;
        setCurrentPage(currentPage + 1);
        getDepartments({
            setDepartments: setDepartments,
            setIsLoading: setIsLoading,
            page: currentPage + 1,
            sortBy: sort
        });
    };

    const handlePreviousClick = () => {
        if (currentPage <= 1) return;
        setCurrentPage(currentPage - 1);
        getDepartments({
            setDepartments: setDepartments,
            setIsLoading: setIsLoading,
            page: currentPage - 1,
            sortBy: sort
        });
    };

    return (
        <>
            {currModal &&
                (() => {
                    if (currModal === modalTypes.create)
                        return CreateOrUpdateDepartmentModal({
                            setCurrModal: setCurrModal,
                            setDepartments: setDepartments,
                            loading: isLoading,
                            setIsLoading: setIsLoading,
                            toast: toast
                        });
                    if (currModal === modalTypes.edit)
                        return choosenDeptId
                            ? CreateOrUpdateDepartmentModal({
                                  id: choosenDeptId!,
                                  setCurrModal: setCurrModal,
                                  setDepartments: setDepartments,
                                  loading: isLoading,
                                  setIsLoading: setIsLoading,
                                  toast: toast
                              })
                            : null;
                })()}
            <div className={styles.createBtnContainer}>
                <PowerfulButton
                    className={styles.createBtn}
                    onClick={() => setCurrModal(modalTypes.create)}
                >
                    <AiOutlinePlusCircle />
                    Create
                </PowerfulButton>
            </div>
            {departments && (
                <>
                    <TableTop
                        onSearchText={handleSearch}
                        onPerPageNumber={handlePerPageNumber}
                        // CSV={}
                    />
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
                            onIconClick={handleSortIconClick}
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
