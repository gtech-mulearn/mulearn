import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import Pagination from "@/MuLearnComponents/Pagination/Pagination";
import THead from "@/MuLearnComponents/Table/THead";
import Table from "@/MuLearnComponents/Table/Table";
import TableTop from "@/MuLearnComponents/TableTop/TableTop";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import { useToast } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import styles from "../InterestGroup/InterestGroup.module.css";
import { deleteTask, getTasks } from "./TaskApis";
import { Blank } from "@/MuLearnComponents/Table/Blank";

export const Tasks = () => {
    const [data, setData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [perPage, setPerPage] = useState(20);
    const [sort, setSort] = useState("");
    const firstFetch = useRef(true);
    const navigate = useNavigate();
    const toast = useToast();

    const columnOrder: ColOrder[] = [
        { column: "title", Label: "Title", isSortable: true },
        { column: "hashtag", Label: "Hashtag", isSortable: true },
        { column: "org", Label: "Organization", isSortable: true },
        { column: "active", Label: "Active", isSortable: true },
        { column: "karma", Label: "Karma", isSortable: true },
        { column: "usage_count", Label: "Usage Count", isSortable: true },
        {
            column: "variable_karma",
            Label: "Variable Karma",
            isSortable: true
        },
        { column: "description", Label: "Description", isSortable: true },
        { column: "updated_by", Label: "Updated By", isSortable: true },
        { column: "updated_at", Label: "Updated On", isSortable: true },
        { column: "created_by", Label: "Created By", isSortable: true },
        { column: "created_at", Label: "Created On", isSortable: true },
        { column: "ig", Label: "Interest Group", isSortable: true },
        { column: "level", Label: "Level", isSortable: true },
        { column: "channel", Label: "Channel", isSortable: true },
        { column: "event", Label: "Event", isSortable: true }
    ];
    console.log(data);
    const handleNextClick = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        getTasks(
            setData,
            nextPage,
            perPage,
            setIsLoading,
            setTotalPages,
            "",
            sort
        );
    };

    const handlePreviousClick = () => {
        const prevPage = currentPage - 1;
        setCurrentPage(prevPage);
        getTasks(
            setData,
            prevPage,
            perPage,
            setIsLoading,
            setTotalPages,
            "",
            sort
        );
    };

    useEffect(() => {
        if (firstFetch.current) {
            getTasks(setData, 1, perPage, setIsLoading, setTotalPages, "", "");
        }
        firstFetch.current = false;
    }, [data]);

    const handleSearch = (search: string) => {
        setCurrentPage(1);
        getTasks(setData, 1, perPage, setIsLoading, setTotalPages, search, "");
    };

    const handlePerPageNumber = (selectedValue: number) => {
        setCurrentPage(1);
        setPerPage(selectedValue);
        getTasks(
            setData,
            1,
            selectedValue,
            setIsLoading,
            setTotalPages,
            "",
            ""
        );
    };

    const handleIconClick = (column: string) => {
        if (sort === column) {
            setSort(`-${column}`);
            getTasks(
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
            getTasks(
                setData,
                1,
                perPage,
                setIsLoading,
                setTotalPages,
                "",
                column
            );
        }

        //console.log(`Icon clicked for column: ${column}`);
    };

    const handleEdit = (id: string | number | boolean) => {
        navigate(`/dashboard/tasks/edit/${id}`);
    };

    const handleDelete = (id: string | undefined) => {
        deleteTask(id, toast);
    };

    const handleCreate = () => {
        navigate("/dashboard/tasks/create");
    };

    return (
        <>
            <div
                className={styles.createBtnContainer}
                style={{
                    gap: "15px"
                }}
            >
                <PowerfulButton
                    variant="secondary"
                    onClick={() => navigate("/dashboard/tasks/bulk-import")}
                >
                    <AiOutlinePlusCircle />
                    Bulk Import
                </PowerfulButton>

                <PowerfulButton onClick={handleCreate}>
                    <AiOutlinePlusCircle />
                    Create
                </PowerfulButton>
            </div>

            {data && (
                <>
                    <TableTop
                        onSearchText={handleSearch}
                        onPerPageNumber={handlePerPageNumber}
                        CSV={dashboardRoutes.getTasksData + "csv/"}
                    />
                    <Table
                        rows={data}
                        isloading={isLoading}
                        page={currentPage}
                        perPage={perPage}
                        columnOrder={columnOrder}
                        id={["id"]}
                        onEditClick={handleEdit}
                        modalTypeContent="error"
                        onDeleteClick={handleDelete}
                        modalDeleteContent="Are you sure you want to delete ?"
                    >
                        <THead
                            columnOrder={columnOrder}
                            onIconClick={handleIconClick}
                        />
                        <div>
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
                        <Blank />
                    </Table>
                </>
            )}
        </>
    );
};
