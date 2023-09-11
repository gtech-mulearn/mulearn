import Pagination from "@/MuLearnComponents/Pagination/Pagination";
import Table from "@/MuLearnComponents/Table/Table";
import THead from "@/MuLearnComponents/Table/THead";
import TableTop from "@/MuLearnComponents/TableTop/TableTop";
import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDepartments } from "./apis";

const Departments = () => {
    const navigate = useNavigate();
    const toast = useToast();

    const [departments, setDepartments] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [perPage, setPerPage] = useState(5);
    const [sort, setSort] = useState("");

    const columnOrder = [{ column: "title", Label: "Name", isSortable: true }];

    useEffect(() => {
        getDepartments({
            setDepartments: setDepartments
        });
    }, []);

    const handleSearch = (search: string) => {};

    const handlePerPageNumber = (selectedValue: number) => {};

    const handleEdit = async (id: string | number | boolean) => {};

    const handleDelete = (id: string | undefined) => {};

    const handleIconClick = (column: string) => {};

    const handleNextClick = () => {};

    const handlePreviousClick = () => {
        toast({ title: "Previous" });
    };

    return (
        <>
            {departments && (
                <>
                    <TableTop
                        onSearchText={handleSearch}
                        onPerPageNumber={handlePerPageNumber}
                        // CSV={dashboardRoutes.getIgList}
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
                            onIconClick={handleIconClick}
                            action={true}
                        />
                        <div>
                            {/* <div className={styles.tableFooter}> */}
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
