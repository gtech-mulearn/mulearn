import { useEffect, useState } from "react";
import {
    Badge,
    Select,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import Table from "@/MuLearnComponents/Table/Table";
import THead from "@/MuLearnComponents/Table/THead";
import { Blank } from "@/MuLearnComponents/Table/Blank";
import TableTop from "@/MuLearnComponents/TableTop/TableTop";
import Pagination from "@/MuLearnComponents/Pagination/Pagination";
import MuModal from "@/MuLearnComponents/MuModal/MuModal";
import styles from "../ManageWeeklyTwitches.module.css";
import {
    ContentTypeConfig,
    MediaContentError,
    MediaContentRecord,
    MediaContentStatus,
    Zone
} from "../services/types";
import {
    createMediaContent,
    deleteMediaContent,
    exportMediaContent,
    listMediaContent,
    updateMediaContent
} from "../services/api";
import MediaContentForm, {
    buildInitialValues,
    buildSubmitBody
} from "./MediaContentForm";

export interface MediaContentTabProps {
    config: ContentTypeConfig;
    // Bumped by the page when a bulk import completes, to trigger a refetch.
    refreshKey?: number;
}

const statusColor: Record<MediaContentStatus, string> = {
    upcoming: "blue",
    ongoing: "green",
    completed: "gray"
};

const MediaContentTab = ({ config, refreshKey }: MediaContentTabProps) => {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isExporting, setIsExporting] = useState(false);

    const [rows, setRows] = useState<MediaContentRecord[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pageIndex, setPageIndex] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [status, setStatus] = useState<MediaContentStatus | "">("");
    const [zone, setZone] = useState<Zone | "">("");

    const [editingId, setEditingId] = useState<string | null>(null);
    const [formValues, setFormValues] = useState<Record<string, any>>(
        buildInitialValues(config)
    );
    const [formErrors, setFormErrors] = useState<Record<string, string[]>>({});
    const [isSaving, setIsSaving] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const result = await listMediaContent(config.route, {
                pageIndex,
                perPage,
                search,
                sortBy,
                status,
                zone: config.hasZoneFilter ? zone : ""
            });
            setRows(result.data);
            setTotalPages(result.pagination.totalPages || 1);
        } catch (error: any) {
            setRows([]);
            setTotalPages(1);
            toast({
                title: "Error",
                description:
                    error?.message || "Failed to load content.",
                status: "error",
                duration: 5000,
                isClosable: true
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, perPage, search, sortBy, status, zone, refreshKey]);

    const handleExport = async () => {
        if (isExporting) return;
        setIsExporting(true);
        try {
            await exportMediaContent(config.contentType);
        } catch (error: any) {
            toast({
                title: "Export failed",
                description: error?.message || "Could not export CSV.",
                status: "error",
                duration: 5000,
                isClosable: true
            });
        } finally {
            setIsExporting(false);
        }
    };

    const handleSearch = (value: string) => {
        setPageIndex(1);
        setSearch(value);
    };

    const handlePerPage = (value: number) => {
        setPageIndex(1);
        setPerPage(value);
    };

    const handleSort = (column: string) => {
        setSortBy(prev => (prev === column ? `-${column}` : column));
    };

    const openCreate = () => {
        setEditingId(null);
        setFormValues(buildInitialValues(config));
        setFormErrors({});
        onOpen();
    };

    const openEdit = (id: string | number | boolean) => {
        const record = rows.find(r => r.id === String(id));
        if (!record) return;
        setEditingId(record.id);
        setFormValues(buildInitialValues(config, record));
        setFormErrors({});
        onOpen();
    };

    const handleFieldChange = (name: string, value: any) => {
        setFormValues(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        setFormErrors({});
        try {
            const body = buildSubmitBody(config, formValues);
            if (editingId) {
                await updateMediaContent(config.route, editingId, body);
            } else {
                await createMediaContent(config.route, body);
            }
            toast({
                title: editingId ? "Updated" : "Created",
                description: `${config.label} ${
                    editingId ? "updated" : "created"
                } successfully.`,
                status: "success",
                duration: 3000,
                isClosable: true
            });
            onClose();
            fetchData();
        } catch (error: any) {
            if (error instanceof MediaContentError) {
                setFormErrors(error.fieldErrors);
            }
            toast({
                title: "Error",
                description: error?.message || "Save failed.",
                status: "error",
                duration: 5000,
                isClosable: true
            });
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string | undefined) => {
        if (!id) return;
        try {
            await deleteMediaContent(config.route, id);
            toast({
                title: "Deleted",
                description: `${config.label} deleted.`,
                status: "success",
                duration: 3000,
                isClosable: true
            });
            fetchData();
        } catch (error: any) {
            toast({
                title: "Error",
                description: error?.message || "Delete failed.",
                status: "error",
                duration: 5000,
                isClosable: true
            });
        }
    };

    return (
        <div className={styles.tab}>
            <div className={styles.toolbar}>
                <TableTop
                    onSearchText={handleSearch}
                    onPerPageNumber={handlePerPage}
                    extraButtons={[
                        {
                            text: isExporting ? "Exporting…" : "⬇ Export CSV",
                            onClick: handleExport,
                            style: {
                                background: "#fff",
                                color: "#456FF1",
                                border: "1px solid #456FF1",
                                padding: "8px 16px",
                                borderRadius: "8px",
                                cursor: isExporting ? "not-allowed" : "pointer"
                            }
                        },
                        {
                            text: "+ Add New",
                            onClick: openCreate,
                            style: {
                                background: "#456FF1",
                                color: "#fff",
                                padding: "8px 16px",
                                borderRadius: "8px"
                            }
                        }
                    ]}
                />
                <div className={styles.filters}>
                    <Select
                        placeholder="All statuses"
                        value={status}
                        onChange={e => {
                            setPageIndex(1);
                            setStatus(e.target.value as MediaContentStatus | "");
                        }}
                        maxW="180px"
                    >
                        <option value="upcoming">Upcoming</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                    </Select>
                    {config.hasZoneFilter && (
                        <Select
                            placeholder="All zones"
                            value={zone}
                            onChange={e => {
                                setPageIndex(1);
                                setZone(e.target.value as Zone | "");
                            }}
                            maxW="180px"
                        >
                            <option value="north">North</option>
                            <option value="central">Central</option>
                            <option value="south">South</option>
                        </Select>
                    )}
                </div>
            </div>

            <MuModal
                isOpen={isOpen}
                onClose={onClose}
                title={editingId ? `Edit ${config.label}` : `Add ${config.label}`}
                type="success"
                body={`Enter the details below.`}
                onDone={isSaving ? undefined : handleSave}
            >
                <MediaContentForm
                    config={config}
                    values={formValues}
                    errors={formErrors}
                    onChange={handleFieldChange}
                />
            </MuModal>

            <Table
                rows={rows as any}
                isloading={isLoading}
                page={pageIndex}
                perPage={perPage}
                columnOrder={config.columns}
                id={["id"]}
                onEditClick={openEdit}
                onDeleteClick={handleDelete}
                modalDeleteHeading={`Delete ${config.label}`}
                modalTypeContent="error"
                modalDeleteContent="Are you sure you want to delete this item?"
                // @ts-ignore - customCellRender typing in Table is loose
                customCellRender={(column: string, row: MediaContentRecord) => {
                    if (column === "status") {
                        return (
                            <Badge colorScheme={statusColor[row.status]}>
                                {row.status}
                            </Badge>
                        );
                    }
                    if (column === "interest_groups") {
                        return (
                            <span>
                                {Array.isArray(row.interest_groups) &&
                                row.interest_groups.length
                                    ? row.interest_groups.join(", ")
                                    : "-"}
                            </span>
                        );
                    }
                    if (column === "link") {
                        return row.link ? (
                            <a
                                href={row.link}
                                target="_blank"
                                rel="noreferrer"
                                style={{ color: "#456FF1" }}
                            >
                                Open
                            </a>
                        ) : (
                            <span>-</span>
                        );
                    }
                    if (column === "zone") {
                        return <span>{row.zone || "-"}</span>;
                    }
                    return null;
                }}
            >
                <THead
                    columnOrder={config.columns}
                    onIconClick={handleSort}
                    action={true}
                />
                <div>
                    {!isLoading && (
                        <Pagination
                            currentPage={pageIndex}
                            totalPages={totalPages}
                            margin="10px 0"
                            handleNextClick={() =>
                                pageIndex < totalPages &&
                                setPageIndex(pageIndex + 1)
                            }
                            handlePreviousClick={() =>
                                pageIndex > 1 && setPageIndex(pageIndex - 1)
                            }
                            onSearchText={handleSearch}
                            onPerPageNumber={handlePerPage}
                            perPage={perPage}
                            setPerPage={setPerPage}
                        />
                    )}
                </div>
                <Blank />
            </Table>
        </div>
    );
};

export default MediaContentTab;
