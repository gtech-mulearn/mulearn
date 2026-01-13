// ManageSkills.tsx
import Pagination from "@/MuLearnComponents/Pagination/Pagination";
import THead from "@/MuLearnComponents/Table/THead";
import Table from "@/MuLearnComponents/Table/Table";
import TableTop from "@/MuLearnComponents/TableTop/TableTop";
import { useEffect, useRef, useState } from "react";
import { Blank } from "@/MuLearnComponents/Table/Blank";
import MuModal from "@/MuLearnComponents/MuModal/MuModal";
import SkillForm from "./SkillForm";
import { deleteSkill, getSkills, createSkill, updateSkill } from "./services/api";
import { SkillData } from "./SkillInterface";

function ManageSkills() {
    const [data, setData] = useState<SkillData[]>([]);
    const [selectedSkill, setSelectedSkill] = useState<SkillData | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [perPage, setPerPage] = useState(20);
    const [sort, setSort] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const firstFetch = useRef(true);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const SkillFormRef = useRef<any>(null);

    const columnOrder = [
        { column: "name", Label: "Name", isSortable: true },
        { column: "code", Label: "Code", isSortable: true },
        { column: "description", Label: "Description", isSortable: false },
        { column: "task_count", Label: "Tasks", isSortable: true },
        { column: "is_active", Label: "Active", isSortable: true },
        { column: "created_at", Label: "Created On", isSortable: true }
    ];

    const fetchSkills = async (search = "") => {
        setIsLoading(true);
        try {
            const response = await getSkills(currentPage, perPage, search, sort);
            if (response && response.skills) {
                setData(response.skills);
                setTotalPages(response.pagination?.totalPages || 1);
            } else {
                setData([]);
                setTotalPages(1);
            }
        } catch (error) {
            console.error("Error fetching skills:", error);
            setData([]);
            setTotalPages(1);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (firstFetch.current) {
            fetchSkills();
        }
        firstFetch.current = false;
    }, []);

    useEffect(() => {
        if (!firstFetch.current) {
            fetchSkills();
        }
    }, [currentPage, perPage, sort]);

    const handleNextClick = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handlePreviousClick = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const handleSearch = (search: string) => {
        setCurrentPage(1);
        fetchSkills(search);
    };

    const handleEdit = (id: string | Number | Boolean) => {
        const skill = data.find((item) => item.id === id);
        if (skill) {
            setSelectedSkill(skill);
            setIsEditModalOpen(true);
        }
    };

    const handleDelete = async (id: string | undefined) => {
        if (id) {
            try {
                await deleteSkill(id);
                fetchSkills();
            } catch (error) {
                console.error("Delete failed:", error);
            }
        }
    };

    const handlePerPageNumber = (selectedValue: number) => {
        setPerPage(selectedValue);
        setCurrentPage(1);
    };

    const handleIconClick = (column: string) => {
        const isAsc = sort === column;
        setSort(isAsc ? `-${column}` : column);
    };

    const handleCreateSkill = () => {
        setSelectedSkill(null);
        setIsCreateModalOpen(true);
    };

    const handleFormSubmit = async (skillData: Partial<SkillData>) => {
        try {
            if (selectedSkill) {
                await updateSkill(selectedSkill.id, skillData);
            } else {
                await createSkill(skillData);
            }
            fetchSkills();
            setIsEditModalOpen(false);
            setIsCreateModalOpen(false);
        } catch (error) {
            console.error("Error saving skill:", error);
        }
    };

    return (
        <>
            <TableTop
                onSearchText={handleSearch}
                onPerPageNumber={handlePerPageNumber}
                extraButtons={[
                    {
                        text: "Add Skill",
                        onClick: handleCreateSkill,
                        style: {
                            marginRight: "5px",
                            padding: "5px 10px",
                            background: '#556ff1',
                            borderRadius: 10,
                            color: '#FFFFFF'
                        }
                    }
                ]}
            />
            <MuModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Edit Skill"
                type="success"
                body="Update the skill details."
                onDone={() => SkillFormRef.current?.handleSubmitExternally()}
            >
                {selectedSkill && (
                    <SkillForm
                        ref={SkillFormRef}
                        skill={selectedSkill}
                        onSubmit={handleFormSubmit}
                        closeModal={() => setIsEditModalOpen(false)}
                    />
                )}
            </MuModal>
            <MuModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="Create Skill"
                type="success"
                body="Enter the details for the new skill."
                onDone={() => SkillFormRef.current?.handleSubmitExternally()}
            >
                <SkillForm
                    ref={SkillFormRef}
                    skill={null}
                    onSubmit={handleFormSubmit}
                    closeModal={() => setIsCreateModalOpen(false)}
                />
            </MuModal>
            <Table
                rows={data as any}
                isloading={isLoading}
                page={currentPage}
                perPage={perPage}
                columnOrder={columnOrder}
                id={["id"]}
                onEditClick={handleEdit}
                onDeleteClick={handleDelete}
                modalDeleteHeading="Delete Skill"
                modalTypeContent="error"
                modalDeleteContent="Are you sure you want to delete this skill? This cannot be undone."
                customCellRender={(column: any, row: any) => {
                    if (column === "is_active") {
                        return (
                            <span style={{
                                color: row.is_active ? "#22c55e" : "#ef4444",
                                fontWeight: "500"
                            }}>
                                {row.is_active ? "Active" : "Inactive"}
                            </span>
                        );
                    }
                    if (column === "task_count") {
                        return <span>{row.task_count ?? 0}</span>;
                    }
                    return null;
                }}
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
    );
}

export default ManageSkills;
