import { useEffect, useRef, useState } from "react";
import Pagination from "@/MuLearnComponents/Pagination/Pagination";
import Table from "@/MuLearnComponents/Table/Table";
import THead from "@/MuLearnComponents/Table/THead";
import TableTop from "@/MuLearnComponents/TableTop/TableTop";
import { deleteInterestGroups, getInterestGroups } from "./apis";
import { useNavigate } from "react-router-dom";
import {
    MuButton,
    PowerfulButton
} from "@/MuLearnComponents/MuButtons/MuButton";
import { AiOutlinePlusCircle } from "react-icons/ai";
import styles from "./InterestGroup.module.css";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import { Blank } from "@/MuLearnComponents/Table/Blank";
import CreateOrUpdateModal from "./CreateOrUpdateModal";
import MuModal from "@/MuLearnComponents/MuModal/MuModal";
import InterestGroupForm from "./InterestGroupForm";

interface IgDetails {
    igName: string;
    igCode: string;
    igIcon: string;
}

export type modalTypes = "edit" | "create" | null;

function InterestGroup() {
    const [data, setData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [perPage, setPerPage] = useState(20);
    const [sort, setSort] = useState("");
    const navigate = useNavigate();

    const firstFetch = useRef(true);
    const columnOrder = [
        { column: "name", Label: "Name", isSortable: true },
        { column: "members", Label: "Members", isSortable: true },
        { column: "updated_at", Label: "Updated On", isSortable: true },
        { column: "updated_by", Label: "Updated By", isSortable: true },
        { column: "created_by", Label: "Created By", isSortable: true },
        { column: "created_at", Label: "Created On", isSortable: true }
    ];

    const [currModal, setCurrModal] = useState<modalTypes>(null);
    const [currID, setCurrID] = useState<string>("");
    const InterestRef = useRef<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleNextClick = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        getInterestGroups(
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
        getInterestGroups(
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
            getInterestGroups(
                setData,
                1,
                perPage,
                setIsLoading,
                setTotalPages,
                "",
                ""
            );
        }
        firstFetch.current = false;
    }, []);

    useEffect(() => {
        if (currModal === null) {
            getInterestGroups(
                setData,
                1,
                perPage,
                setIsLoading,
                setTotalPages,
                "",
                ""
            );
        }
    }, [currModal]);

    const handleSearch = (search: string) => {
        setCurrentPage(1);
        getInterestGroups(
            setData,
            1,
            perPage,
            setIsLoading,
            setTotalPages,
            search,
            ""
        );
    };

    const handleEdit = async (id: string | number | boolean) => {
        setCurrID(id.toString());
        setCurrModal("edit");
        setIsModalOpen(true);
        // navigate("/dashboard/interest-groups/edit/" + id);
    };

    const handleDelete = (id: string | undefined) => {
        deleteInterestGroups(id);
        setTimeout(() => {
            getInterestGroups(
                setData,
                1,
                perPage,
                setIsLoading,
                setTotalPages,
                "",
                ""
            );
        }, 1000);
    };

    const handlePerPageNumber = (selectedValue: number) => {
        setCurrentPage(1);
        setPerPage(selectedValue);
        getInterestGroups(
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
            getInterestGroups(
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
            getInterestGroups(
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
            {currModal &&
                (() => {
                    if (currModal === "create")
                        return (
                            <MuModal
                                isOpen={currModal === "create"}
                                onClose={() => setCurrModal(null)}
                                title={`Create new IG`}
                                type={"success"}
                                body={`Enter the deatils of the IG`}
                                onDone={() =>
                                    InterestRef.current?.handleSubmitExternally()
                                }
                            >
                                <InterestGroupForm
                                    ref={InterestRef}
                                    isEditMode={false}
                                    id={""}
                                    closeModal={() => setCurrModal(null)}
                                />
                            </MuModal>
                        );

                    if (currModal === "edit")
                        return currID ? (
                            <MuModal
                                isOpen={currModal === "edit"}
                                onClose={() => setCurrModal(null)}
                                title={`Edit IG`}
                                type={"success"}
                                body={`Enter the deatils of the IG`}
                                onDone={() =>
                                    InterestRef.current?.handleSubmitExternally()
                                }
                            >
                                <InterestGroupForm
                                    ref={InterestRef}
                                    isEditMode={true}
                                    id={currID}
                                    closeModal={() => setCurrModal(null)}
                                />
                            </MuModal>
                        ) : null;
                })()}
            <div className={styles.createBtnContainer}>
                <PowerfulButton
                    className={styles.createBtn}
                    onClick={() => {
                        setCurrModal("create");
                    }}
                >
                    <AiOutlinePlusCircle />
                    Create
                </PowerfulButton>
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
                        <Blank />
                    </Table>
                </>
            )}
        </>
    );
}

export default InterestGroup;
