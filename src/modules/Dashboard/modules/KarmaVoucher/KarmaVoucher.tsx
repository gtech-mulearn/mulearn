import {
    MuButton,
    PowerfulButton
} from "@/MuLearnComponents/MuButtons/MuButton";
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
import { getKarmaVoucher } from "./service/api";

type Props = {};

const KarmaVoucher = (props: Props) => {
    const [data, setData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [perPage, setPerPage] = useState(5);
    const [sort, setSort] = useState("");
    const firstFetch = useRef(true);
    const navigate = useNavigate();
    const toast = useToast();

    const columnOrder: ColOrder[] = [
        { column: "user", Label: "User", isSortable: true },
        { column: "code", Label: "Code", isSortable: true },
        { column: "karma", Label: "Karma", isSortable: true },
        { column: "claimed", Label: "Claimed", isSortable: true },
        { column: "task", Label: "Task", isSortable: true },
        { column: "week", Label: "Week", isSortable: true },
        { column: "month", Label: "Month", isSortable: true },
        { column: "updated_by", Label: "Updated By", isSortable: true },
        { column: "updated_at", Label: "Updated On", isSortable: true },
        { column: "created_by", Label: "Created By", isSortable: false },
        { column: "created_at", Label: "Created On", isSortable: true }
    ];

    const handleError = () => {
        toast({
            title: "Oops",
            description: "Table fetch failed!",
            status: "error",
            duration: 5000,
            isClosable: true
        });
    };

    const handleNextClick = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        getKarmaVoucher(
            setData,
            nextPage,
            perPage,
            setIsLoading,
            setTotalPages,
            handleError,
            "",
            sort
        );
    };

    const handlePreviousClick = () => {
        const prevPage = currentPage - 1;
        setCurrentPage(prevPage);
        getKarmaVoucher(
            setData,
            prevPage,
            perPage,
            setIsLoading,
            setTotalPages,
            handleError,
            "",
            sort
        );
    };

    useEffect(() => {
        if (firstFetch.current) {
            getKarmaVoucher(
                setData,
                1,
                perPage,
                setIsLoading,
                setTotalPages,
                handleError,
                "",
                ""
            );
        }
        firstFetch.current = false;
    }, [data]);

    const handleSearch = (search: string) => {
        setCurrentPage(1);
        getKarmaVoucher(
            setData,
            1,
            perPage,
            setIsLoading,
            setTotalPages,
            handleError,
            search,
            ""
        );
    };

    const handlePerPageNumber = (selectedValue: number) => {
        setCurrentPage(1);
        setPerPage(selectedValue);
        getKarmaVoucher(
            setData,
            1,
            selectedValue,
            setIsLoading,
            setTotalPages,
            handleError,
            "",
            ""
        );
    };

    const handleIconClick = (column: string) => {
        if (sort === column) {
            setSort(`-${column}`);
            getKarmaVoucher(
                setData,
                1,
                perPage,
                setIsLoading,
                setTotalPages,
                handleError,
                "",
                `-${column}`
            );
        } else {
            setSort(column);
            getKarmaVoucher(
                setData,
                1,
                perPage,
                setIsLoading,
                setTotalPages,
                handleError,
                "",
                column
            );
        }

        //console.log(`Icon clicked for column: ${column}`);
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
                    onClick={() =>
                        navigate("/dashboard/karma-voucher/bulk-import")
                    }
                >
                    <AiOutlinePlusCircle />
                    Bulk Import
                </PowerfulButton>
            </div>

            {data && (
                <>
                    <TableTop
                        onSearchText={handleSearch}
                        onPerPageNumber={handlePerPageNumber}
                        CSV={dashboardRoutes.getKarmaVoucher + "import/"}
                    />
                    <Table
                        rows={data}
                        isloading={isLoading}
                        page={currentPage}
                        perPage={perPage}
                        columnOrder={columnOrder}
                        id={["id"]}
                        modalTypeContent="error"
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
                        {/*use <Blank/> when u don't need <THead /> or <Pagination inside <Table/> cause <Table /> needs atleast 2 children*/}
                    </Table>
                </>
            )}
        </>
    );
};

export default KarmaVoucher;
