import { useRef, useState } from "react";
import {
    Box,
    Button,
    HStack,
    Input,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useToast
} from "@chakra-ui/react";
import MuModal from "@/MuLearnComponents/MuModal/MuModal";
import { importMediaContent } from "../services/api";
import { BulkImportResult, MediaContentError } from "../services/types";

interface BulkImportModalProps {
    isOpen: boolean;
    onClose: () => void;
    onImported: () => void;
}

// Columns accepted by the bulk-import endpoint (see media-api.md CSV structure).
const TEMPLATE_HEADERS = [
    "content_type",
    "title",
    "topic",
    "date",
    "performer",
    "designation",
    "description",
    "link",
    "interest_groups",
    "poster_thumbnail",
    "campus",
    "zone"
];

// One example row per content type. Office Hours uses DD/MM/YYYY; the episode
// types use YYYY-MM-DD. interest_groups is a comma-separated list inside one cell.
const TEMPLATE_ROWS: string[][] = [
    [
        "office_hours",
        "Intro to REST APIs",
        "",
        "15/09/2025",
        "Alice Thomas",
        "Senior Developer",
        "A hands-on session on DRF best practices.",
        "https://meet.google.com/xyz-abc",
        "web-development,ai",
        "https://cdn.example.com/poster.jpg",
        "",
        ""
    ],
    [
        "salt_mango_tree",
        "",
        "AI in Agriculture",
        "2025-10-05",
        "",
        "",
        "How students use AI to solve farming challenges.",
        "https://youtube.com/live/smt-ep15",
        "",
        "",
        "Kerala Agricultural University",
        "south"
    ],
    [
        "inspiration_station",
        "",
        "Women in Tech",
        "2025-11-01",
        "",
        "",
        "Female founders share their stories.",
        "https://youtube.com/live/is-ep20",
        "",
        "",
        "Model Engineering College",
        "central"
    ]
];

const escapeCsv = (value: string) =>
    /[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;

const buildTemplateCsv = () => {
    const lines = [TEMPLATE_HEADERS, ...TEMPLATE_ROWS].map(row =>
        row.map(escapeCsv).join(",")
    );
    return lines.join("\n");
};

const downloadTemplate = () => {
    const blob = new Blob([buildTemplateCsv()], {
        type: "text/csv;charset=utf-8;"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "media_content_import_template.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
};

const reasonToText = (reason: BulkImportResult["failed_rows"][number]["reason"]) => {
    if (typeof reason === "string") return reason;
    return Object.entries(reason)
        .map(([field, msgs]) => `${field}: ${msgs.join(" ")}`)
        .join("; ");
};

const BulkImportModal = ({
    isOpen,
    onClose,
    onImported
}: BulkImportModalProps) => {
    const toast = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [result, setResult] = useState<BulkImportResult | null>(null);

    const reset = () => {
        setFile(null);
        setResult(null);
        setIsUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    const handleUpload = async () => {
        if (!file) {
            toast({
                title: "No file selected",
                description: "Choose a .csv file to import.",
                status: "warning",
                duration: 4000,
                isClosable: true
            });
            return;
        }
        setIsUploading(true);
        setResult(null);
        try {
            const res = await importMediaContent(file);
            setResult(res);
            toast({
                title: "Import completed",
                description: `${res.success_count} imported, ${res.failed_count} failed.`,
                status: res.failed_count > 0 ? "warning" : "success",
                duration: 5000,
                isClosable: true
            });
            // Refresh the underlying table even on partial success.
            onImported();
        } catch (error: any) {
            const message =
                error instanceof MediaContentError
                    ? error.message
                    : error?.message || "Import failed.";
            toast({
                title: "Import failed",
                description: message,
                status: "error",
                duration: 6000,
                isClosable: true
            });
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <MuModal
            isOpen={isOpen}
            onClose={handleClose}
            title="Bulk Import Media Content"
            type="success"
            showButton={false}
        >
            <Box textAlign="left">
                <Text fontSize="sm" color="gray.600" mb={2}>
                    Upload a <b>.csv</b> file. Each row is routed by its{" "}
                    <b>content_type</b> column (<code>office_hours</code>,{" "}
                    <code>salt_mango_tree</code>, <code>inspiration_station</code>
                    ). Office Hours dates use <b>DD/MM/YYYY</b>; the other types use{" "}
                    <b>YYYY-MM-DD</b>.
                </Text>

                <Button
                    variant="link"
                    colorScheme="blue"
                    size="sm"
                    mb={3}
                    onClick={downloadTemplate}
                >
                    ⬇ Download CSV template
                </Button>

                <Input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv"
                    p={1}
                    mb={3}
                    onChange={e => {
                        setResult(null);
                        setFile(e.target.files?.[0] ?? null);
                    }}
                />

                {result && (
                    <Box mb={3}>
                        <Text fontWeight="600" mb={1}>
                            Imported: {result.success_count} · Failed:{" "}
                            {result.failed_count}
                        </Text>
                        {result.failed_count > 0 && (
                            <TableContainer
                                maxH="220px"
                                overflowY="auto"
                                border="1px solid"
                                borderColor="gray.200"
                                borderRadius="md"
                            >
                                <Table size="sm">
                                    <Thead>
                                        <Tr>
                                            <Th>Row</Th>
                                            <Th>Title</Th>
                                            <Th>Reason</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {result.failed_rows.map((r, i) => (
                                            <Tr key={`${r.row}-${i}`}>
                                                <Td>{r.row}</Td>
                                                <Td>{r.title || "-"}</Td>
                                                <Td>{reasonToText(r.reason)}</Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        )}
                    </Box>
                )}

                <HStack justify="flex-end" spacing={3} mt={2}>
                    <Button variant="ghost" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        colorScheme="blue"
                        isLoading={isUploading}
                        loadingText="Uploading"
                        onClick={handleUpload}
                    >
                        Upload
                    </Button>
                </HStack>
            </Box>
        </MuModal>
    );
};

export default BulkImportModal;
