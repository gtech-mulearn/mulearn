import MuModal from "@/MuLearnComponents/MuModal/MuModal";
import Pagination from "@/MuLearnComponents/Pagination/Pagination";
import Table from "@/MuLearnComponents/Table/Table";
import THead from "@/MuLearnComponents/Table/THead";
import TableTop from "@/MuLearnComponents/TableTop/TableTop";
import { useEffect, useState } from "react";
import { Label } from "recharts";
import { getUnverifiedOrganizations } from "./VerifyOrganizationAPIs";

export default function VerifyOrganizations() {
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [perPage, setPerPage] = useState(20);
    const columns = [
        { column: "title", Label: "Title", isSortable: false },
        { column: "org_type", Label: "Org Type", isSortable: false },
        { column: "created_by", Label: "Craeted By", isSortable: false },
        {
            column: "graduation_year",
            Label: "Graduation Year",
            isSortable: false
        },
        { column: "department", Label: "Department", isSortable: false },
        { column: "created_at", Label: "Created At", isSortable: false }
    ];
    useEffect(() => {
        getUnverifiedOrganizations(setData, setIsLoading);
    }, []);

    return (
        <>
            <MuModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={`Verify Organization`}
                type={"success"}
                onDone={() => {}}
            >
                Nothing
            </MuModal>
            {data && (
                <>
                    <Table
                        rows={data}
                        isloading={isLoading}
                        page={currentPage}
                        perPage={perPage}
                        columnOrder={columns}
                        id={["id"]}
                        modalVerifyContent="Are you sure you want to verify this organization?"
                        modalVerifyHeading="Verify Organization"
                        // modalTypeContent="error"
                        // modalDeleteContent={`Are you sure you want to delete this organization?`}
                        // onDeleteClick={handleDelete}
                    >
                        <THead
                            columnOrder={columns}
                            onIconClick={() => {}}
                            action={false}
                        />
                        <div></div>
                    </Table>
                </>
            )}
        </>
    );
}
