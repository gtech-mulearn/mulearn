import { useEffect, useState } from "react";
import styles from "./IssueAchievements.module.css";
import TableTop from "@/MuLearnComponents/TableTop/TableTop";
import Table from "@/MuLearnComponents/Table/Table";
import THead from "@/MuLearnComponents/Table/THead";
import Pagination from "@/MuLearnComponents/Pagination/Pagination";
import { MuButton } from "@/MuLearnComponents/MuButtons/MuButton";
import BulkIssueModal from "./components/BulkIssueModal";
import { bulkIssueAchievements, downloadBulkTemplate, getAchievementLogs, getAchievements } from "./services/api";
import { toast } from "react-hot-toast";
import { Blank } from "@/MuLearnComponents/Table/Blank";

const IssueAchievements = () => {
    const [achievements, setAchievements] = useState<any[]>([]);
    const [logs, setLogs] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [perPage, setPerPage] = useState(5);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const columnOrder = [
        { column: "muid", Label: "MUID", isSortable: false },
        { column: "user_name", Label: "User Name", isSortable: false },
        { column: "achievement", Label: "Achievement", isSortable: false },
        { column: "issued_by", Label: "Issued By", isSortable: false },
        { column: "issued_on", Label: "Issued On", isSortable: false },
    ];

    useEffect(() => {
        getAchievements(setAchievements);
    }, []);

    useEffect(() => {
        setIsLoading(true);
        getAchievementLogs(setLogs, currentPage, perPage, setTotalPages, search).finally(() => setIsLoading(false));
    }, [currentPage, perPage, search]);

    const handleBulkIssue = (values: any) => {
        const formData = new FormData();
        formData.append("achievement_id", values.achievement_id);
        formData.append("file", values.file);

        bulkIssueAchievements(formData, toast, () => {
            setIsModalOpen(false);
            getAchievementLogs(setLogs, currentPage, perPage, setTotalPages, search);
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Issue Achievements</h1>
                <MuButton
                    text="Bulk Issue"
                    onClick={() => setIsModalOpen(true)}
                    className={styles.bulkButton}
                />
            </div>

            <TableTop
                onSearchText={setSearch}
                onPerPageNumber={setPerPage}
            />

            <Table
                rows={logs}
                page={currentPage}
                isloading={isLoading}
                perPage={perPage}
                columnOrder={columnOrder}
                id={["id"]}
            >
                <THead
                    columnOrder={columnOrder}
                    onIconClick={() => { }}
                />

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    margin="10px 0"
                    handleNextClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    handlePreviousClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    perPage={perPage}
                    setPerPage={setPerPage}
                />
                <Blank />
            </Table>

            <BulkIssueModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                achievements={achievements}
                onSubmit={handleBulkIssue}
                onDownloadTemplate={downloadBulkTemplate}
            />
        </div>
    );
};

export default IssueAchievements;
