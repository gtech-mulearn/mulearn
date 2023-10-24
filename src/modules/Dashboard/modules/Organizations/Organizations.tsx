import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Table from "@/MuLearnComponents/Table/Table";
import THead from "@/MuLearnComponents/Table/THead";
import TableTop from "@/MuLearnComponents/TableTop/TableTop";
import Pagination from "@/MuLearnComponents/Pagination/Pagination";
import { deleteOrganization, getOrganizations } from "./OrganizationApis";
import {
    columnsCollege,
    columnsCommunities,
    columnsCompanies
} from "./THeaders";
import TableTopTab from "./TableTopTab";
import { organizationRoutes } from "@/MuLearnServices/urls";
import MuModal from "@/MuLearnComponents/MuModal/MuModal";
import OrgForm from "./OrgForm";
import toast from "react-hot-toast";

function Organizations() {
    const ccc = ["College", "Company", "Community"] as const;
    type CCC = (typeof ccc)[number];
    const [data, setData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [perPage, setPerPage] = useState(20);
    const [columns, setColumns] = useState(columnsCollege);
    const [activeTab, setActiveTab] = useState<CCC>("College");
    const [sort, setSort] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const firstFetch = useRef(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const orgFormRef = useRef<any>(null); //! Use for modal and form button connectivity

    useEffect(() => {
        if (firstFetch.current || isModalOpen === false) {
            getOrganizations(
                activeTab,
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

        const storedActiveTab = localStorage.getItem("activeTab");

        if (storedActiveTab) {
            setActiveTab(storedActiveTab as CCC);
            handleTabClick(storedActiveTab as CCC);
        }
    }, [currentPage, isModalOpen]);

    const handleNextClick = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        getOrganizations(
            activeTab,
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
        getOrganizations(
            activeTab,
            setData,
            prevPage,
            perPage,
            setIsLoading,
            setTotalPages,
            "",
            sort
        );
    };

    const handleSearch = (search: string) => {
        setCurrentPage(1);
        getOrganizations(
            activeTab,
            setData,
            1,
            perPage,
            setIsLoading,
            setTotalPages,
            search,
            ""
        );
    };

    const handlePerPageNumber = (selectedValue: number) => {
        setCurrentPage(1);
        setPerPage(selectedValue);
        getOrganizations(
            activeTab,
            setData,
            1,
            selectedValue,
            setIsLoading,
            setTotalPages,
            "",
            ""
        );
    };

    const handleTabClick = (tab: CCC) => {
        if (ccc.some(c => c === tab)) {
            switch (tab) {
                case "College":
                    setColumns(columnsCollege);
                    break;
                case "Company":
                    setColumns(columnsCompanies);
                    break;
                case "Community":
                    setColumns(columnsCommunities);
                    break;
            }
            localStorage.setItem("activeTab", tab);

            getOrganizations(
                tab,
                setData,
                1,
                perPage,
                setIsLoading,
                setTotalPages,
                "",
                ""
            );
        } else {
            alert("Error to load Table Headers");
        }
        setCurrentPage(1);
        setActiveTab(tab);
    };

    const handleIconClick = (column: string) => {
        if (sort === column) {
            setSort(`-${column}`);
            getOrganizations(
                activeTab,
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
            getOrganizations(
                activeTab,
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
    console.log(data);

	const [itemId, setItemId] = useState("")
    const handleEdit = (id: string | number | boolean) => {
		setItemId(String(id))
		setIsModalOpen(true);
    };

    const handleDelete = (id: string | undefined) => {
        
		toast.promise(deleteOrganization(id as string), {
            loading: "Deleting...",
            success: () => {
                return <b>Organization deleted.</b>;
            },
            error: <b>Failed to delete organization</b>
        });
        setTimeout(() => {
            handleTabClick(activeTab);
        }, 1000);
    };
    return (
        <>
            <TableTopTab
                active={activeTab}
                onTabClick={handleTabClick as (tab: string) => void}
            />
            <MuModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={`Edit ${activeTab}`}
                type={"success"}
                body={`Enter the deatils of the ${activeTab} to edit.`}
                onDone={() => orgFormRef.current?.handleSubmitExternally()}
            >
                <OrgForm
                    ref={orgFormRef}
                    type={activeTab}
                    isEditMode={true}
                    itemId={itemId}
                    closeModal={() => setIsModalOpen(false)}
                />
            </MuModal>
            {data && (
                <>
                    <TableTop
                        onSearchText={handleSearch}
                        onPerPageNumber={handlePerPageNumber}
                        CSV={organizationRoutes.getOrgCsv(activeTab)}
                    />
                    <Table
                        rows={data}
                        isloading={isLoading}
                        page={currentPage}
                        perPage={perPage}
                        columnOrder={columns}
                        id={["code"]}
                        onEditClick={handleEdit}
                        modalTypeContent="error"
                        modalDeleteContent={`Are you sure you want to delete this organization?`}
                        onDeleteClick={handleDelete}
                    >
                        <THead
                            columnOrder={columns}
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
                        {/*use <Blank/> when u don't need <THead /> or <Pagination inside <Table/> cause <Table /> needs atleast 2 children*/}
                    </Table>
                </>
            )}
        </>
    );
}

export default Organizations;
