// ManageAchievements.tsx
import Pagination from "@/MuLearnComponents/Pagination/Pagination";
import THead from "@/MuLearnComponents/Table/THead";
import Table from "@/MuLearnComponents/Table/Table";
import TableTop from "@/MuLearnComponents/TableTop/TableTop";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Blank } from "@/MuLearnComponents/Table/Blank";
import MuModal from "@/MuLearnComponents/MuModal/MuModal";
import AchievementForm from "./AchievementForm";
import CreateAchievementForm from "./CreateAchievementForm";
import { deleteAchievements, getAchievements } from "./services/api";
import { AchievementData } from "./ManageAchievementsInterface";

function ManageAchievements() {
    const [data, setData] = useState<AchievementData[]>([]);
    const [selectedAchievement, setSelectedAchievement] = useState<AchievementData | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [perPage, setPerPage] = useState(20);
    const [sort, setSort] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const firstFetch = useRef(true);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [id, setId] = useState("");
    const AchievementFormRef = useRef<any>(null);
    const CreateAchievementFormRef = useRef<any>(null);
    const [formData, setFormData] = useState<AchievementData>({
        title: "",
        levelBased: false,
        description: "",
        vcToken: false,
        tags: [],
        type: "",
        icon: "",
        template_id: "" 
    });

    const columnOrder = [
        { column: "icon", Label: "Icon", isSortable: false },
        { column: "name", Label: "Title", isSortable: true },
        { column: "levelBased", Label: "Level Based", isSortable: true },
        { column: "description", Label: "Description", isSortable: false },
        { column: "vcToken", Label: "VC Token", isSortable: true },
        { column: "tags", Label: "Tags", isSortable: false },
        { column: "type", Label: "Type", isSortable: true },
        { column: "created_at", Label: "Created On", isSortable: true },
        { column: "updated_at", Label: "Updated On", isSortable: true },
        { column: "updated_by", Label: "Updated By", isSortable: false },
        { column: "created_by", Label: "Created By", isSortable: false },
        { column: "level_id", Label: "Level ID", isSortable: true },
        { column: "template_id", Label: "Template ID", isSortable: true } 
    ];

    const fetchAchievements = async () => {
        setIsLoading(true);
        try {
            const achievements = await getAchievements();
            if (achievements) {
                const transformedData = achievements.map(achievement => ({
                    ...achievement,
                    id: achievement.id,
                    name: achievement.name,
                    title: achievement.name || "",  // Ensure title is set
                    levelBased: achievement.level_based ?? false,
                    level_based: achievement.level_based ?? false,  // Keep both for consistency
                    vcToken: achievement.has_vc ?? false,
                    has_vc: achievement.has_vc ?? false,  // Keep both for consistency
                    template_id: achievement.template_id || "",
                    level_id: achievement.level_id || ""  // Ensure level_id is included
                }));
                setData(transformedData);
                setTotalPages(Math.ceil(transformedData.length / perPage));
            } else {
                setData([]);
                setTotalPages(1);
            }
        } catch (error) {
            console.error("Error fetching achievements:", error);
            setData([]);
            setTotalPages(1);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        if (firstFetch.current) {
            fetchAchievements();
        }
        firstFetch.current = false;
    }, [selectedAchievement]);


    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox"
                ? (e.target as HTMLInputElement).checked
                : name === "tags"
                    ? value.split(",").map(tag => tag.trim())
                    : value
        } as AchievementData));
    };

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
        if (search.trim() === "") {
            fetchAchievements();
        } else {
            const filteredData = data.filter(item =>
                (item.title?.toLowerCase() ?? "").includes(search.toLowerCase()) ||
                item.description.toLowerCase().includes(search.toLowerCase()) ||
                item.template_id?.toLowerCase().includes(search.toLowerCase())
            );
            setData(filteredData);
            setTotalPages(Math.ceil(filteredData.length / perPage));
        }
    };


    const handleEdit = (id: string | Number | Boolean) => {
        const achievement = data.find((item) => item.id === id); 
        if (achievement) {
            // Make sure all necessary fields are properly prepared
            const preparedAchievement = {
                ...achievement,
                title: achievement.name || achievement.title || "",
                level_based: achievement.level_based ?? achievement.levelBased ?? false,
                has_vc: achievement.has_vc ?? achievement.vcToken ?? false,
                level_id: achievement.level_id || ""  // Ensure level_id is included
            };
            setSelectedAchievement(preparedAchievement);
            setIsEditModalOpen(true); 
        }
    };


    const handleAchievementUpdated = async (updatedAchievement: AchievementData) => {
        setIsLoading(true); 
        await fetchAchievements(); 
        setIsEditModalOpen(false); 
    };
    
    const handleDelete = async (id: string | undefined) => {
        if (id) {
            try {
                await deleteAchievements(id);
                setData(prev => {
                    const newData = prev.filter(item => item.id !== id);
                    setTotalPages(Math.ceil(newData.length / perPage));
                    return newData;
                });
                navigate("/dashboard/management/manage-achievements");
            } catch (error) {
                console.error("Delete failed, refetching achievements:", error);
                await fetchAchievements();
            }
        }
    };

    const handlePerPageNumber = (selectedValue: number) => {
        setPerPage(selectedValue);
        setCurrentPage(1);
        setTotalPages(Math.ceil(data.length / selectedValue));
    };

    const handleIconClick = (column: string) => {
        const newSort = sort === column ? `-${column}` : column;
        setSort(newSort);
        const sortedData = [...data].sort((a, b) => {
            const key = newSort.startsWith("-") ? newSort.slice(1) : newSort;
            const aValue = a[key as keyof AchievementData];
            const bValue = b[key as keyof AchievementData];
            if (newSort.startsWith("-")) {
                return bValue > aValue ? 1 : -1;
            }
            return aValue > bValue ? 1 : -1;
        });
        setData(sortedData);
    };

    const handleCreateAchievement = () => {
        setIsCreateModalOpen(true);
    };

    const handleCreateSubmit = () => {
        CreateAchievementFormRef.current?.handleSubmitExternally();

    };

    const handleEditSubmit = () => {
        AchievementFormRef.current?.handleSubmitExternally();
    };

    const handleAchievementCreated = (newAchievement: AchievementData) => {
        setData(prev => [...prev, newAchievement]);
        setTotalPages(Math.ceil((data.length + 1) / perPage));
    };

    return (
        <>
            <TableTop
                onSearchText={handleSearch}
                onPerPageNumber={handlePerPageNumber}
                extraButtons={[
                    {
                        text: "Create Achievement",
                        onClick: handleCreateAchievement,
                        style: { marginRight: "5px", padding: "5px 10px", background: '#556ff1', borderRadius: 10, color: '#FFFFFF' }
                    }
                ]}
            />
            <MuModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Edit Achievement"
                type="success"
                body="Enter the details of the achievement."
                onDone={() => AchievementFormRef.current?.handleSubmitExternally()}

            >
                {selectedAchievement && (
                    <AchievementForm
                        ref={AchievementFormRef}
                        achievement={selectedAchievement}
                        onsuccess={handleAchievementUpdated}
                        closeModal={() => setIsEditModalOpen(false)}
                    />
                )}
            </MuModal>
            <MuModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="Create Achievement"
                type="success"
                body="Enter the details for the new achievement."
                onDone={handleCreateSubmit}
            >
                <CreateAchievementForm
                    ref={CreateAchievementFormRef}
                    closeModal={() => setIsCreateModalOpen(false)}
                    onSuccess={handleAchievementCreated}
                />
            </MuModal>
            <Table
                rows={data}
                isloading={isLoading}
                page={currentPage}
                perPage={perPage}
                columnOrder={columnOrder}
                id={["id"]}
                onEditClick={handleEdit}
                onDeleteClick={handleDelete}
                modalDeleteHeading="Delete Achievement"
                modalTypeContent="error"
                modalDeleteContent="Are you sure you want to delete this achievement?"
                customCellRender={(column: any, row: any) => {
                    if (column === "icon") {
                        if (!row || !row.icon) {
                            return <div style={{ width: "50px", height: "50px" }}>-</div>;
                        }
                        return (
                            <div style={{ width: "50px", height: "50px" }}>
                                {row.icon.startsWith("http") ? (
                                    <img
                                        src={row.icon}
                                        alt="Achievement Icon"
                                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                    />
                                ) : (
                                    <span style={{ fontSize: "24px" }}>{row.icon}</span>
                                )}
                            </div>
                        );
                    }
                    if (column === "level_id") {
                        return <div>{row.level_id || (row.levelBased ? "Not set" : "-")}</div>;
                    }
                    if (column === "tags") {
                        return (
                            <div>
                                {Array.isArray(row.tags) && row.tags.length > 0
                                    ? row.tags.join(", ")
                                    : "-"}
                            </div>
                        );
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

export default ManageAchievements;