import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Pagination from "@/MuLearnComponents/Pagination/Pagination";
import Table from "@/MuLearnComponents/Table/Table";
import THead from "@/MuLearnComponents/Table/THead";
import TableTop from "@/MuLearnComponents/TableTop/TableTop";
import { createInterestGroups, deleteInterestGroups, getIGDetails, getInterestGroups } from "./apis";
import { roles } from "@/MuLearnServices/types";
import { hasRole } from "@/MuLearnServices/common_functions";
import { useNavigate } from "react-router-dom";
import { MuButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { AiOutlinePlusCircle } from "react-icons/ai";
import styles from "./InterestGroup.module.css";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import { useToast } from "@chakra-ui/react";
import InterestGroupEditModal from "./InterestGroupEditModal";

export type modalStatesType = 'edit' | 'create' | null

function InterestGroup() {
    const [data, setData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [perPage, setPerPage] = useState(5);
    const [sort, setSort] = useState("");
    const navigate = useNavigate();
    const toast = useToast();
    const firstFetch = useRef(true);
    const columnOrder = [
        { column: "name", Label: "Name", isSortable: true },
        { column: "user_ig_link_ig", Label: "Members", isSortable: false },
        { column: "updated_by", Label: "Updated By", isSortable: false },
        { column: "created_by", Label: "Created By", isSortable: false },
        { column: "created_at", Label: "Created On", isSortable: false }
    ];

    const [openModal, setOpenModal] = useState<modalStatesType>(null);
    const [openMuModal, setOpenMuModal] = useState(false);
    const [currID, setCurrID] = useState<string>('')
    const [input, setInput] = useState<string>("");

    const handleNextClick = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        getInterestGroups(setData, nextPage, perPage);
    };

    const handlePreviousClick = () => {
        const prevPage = currentPage - 1;
        setCurrentPage(prevPage);
        getInterestGroups(setData, prevPage, perPage);
    };

    useEffect(() => {
        if (firstFetch.current) {
            if (!hasRole([roles.ADMIN, roles.FELLOW])) {
                navigate("/404");
            }
            getInterestGroups(setData, 1, perPage, setTotalPages, "", "");
        }
        firstFetch.current = false;
    }, []);

    useEffect(() => {
        if (openModal === null) {
            getInterestGroups(setData, 1, perPage, setTotalPages, "", "");
        }
    }, [openModal])

    const handleSearch = (search: string) => {
        setCurrentPage(1);
        getInterestGroups(setData, 1, perPage, setTotalPages, search, "");
    };

    const handleEdit = async (id: string | number | boolean) => {
        await getIGDetails(id as string, setInput);
        setCurrID(id as string)
        setOpenModal('edit')
    };

    const handleDelete = (id: string | undefined) => {
        deleteInterestGroups(id, toast);
        setTimeout(() => {
            getInterestGroups(setData, 1, perPage, setTotalPages, "", "");
        }, 1000);
    };

    const handlePerPageNumber = (selectedValue: number) => {
        setCurrentPage(1);
        setPerPage(selectedValue);
        getInterestGroups(setData, 1, selectedValue, setTotalPages, "", "");
    };

    const handleIconClick = (column: string) => {
        if (sort === column) {
            setSort(`-${column}`);
            getInterestGroups(
                setData,
                1,
                perPage,
                setTotalPages,
                "",
                `-${column}`
            );
        } else {
            setSort(column);
            getInterestGroups(setData, 1, perPage, setTotalPages, "", column);
        }
    };

    return (
        <>
            <InterestGroupEditModal
                isOpen={openModal}
                onClose={setOpenModal}
                id={currID}
                defaultValue={input}
            />
            <div className={styles.createBtnContainer}>
                <MuButton
                    className={styles.createBtn}
                    text={"Create"}
                    icon={<AiOutlinePlusCircle></AiOutlinePlusCircle>}
                    onClick={() => {
						navigate("/dashboard/interest-groups/create");
					}}
                />
            </div>

            {data && (
                <>
                    <TableTop
                        onSearchText={handleSearch}
                        onPerPageNumber={handlePerPageNumber}
                        CSV={dashboardRoutes.getIgList}
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
                        modalDeleteContent="Are you sure you want to delete "
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
                </>
            )}
        </>
    );
}

export default InterestGroup;
