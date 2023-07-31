import Pagination from "@/MuLearnComponents/Pagination/Pagination";
import THead from "@/MuLearnComponents/Table/THead";
import Table from "@/MuLearnComponents/Table/Table";
import TableTop from "@/MuLearnComponents/TableTop/TableTop";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { editUserRoleVerification, getUserRoleVerification } from "./apis";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";

function UsersRoleVerification() {
    const [data, setData] = useState<TData[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [perPage, setPerPage] = useState(5);
    const [sort, setSort] = useState("");
    const navigate = useNavigate();
    const firstFetch = useRef(true);

    const [loading, setLoading] = useState(false);
    type TData = {
        full_name: string,
        mu_id: string,
        discord_id: string,
        role_title: string,
        verified: boolean,
    }
    const columnOrder = [
        { column: "full_name", Label: "Full Name", isSortable: true },
        { column: "mu_id", Label: "Mu ID", isSortable: false },
        { column: "discord_id", Label: "Discord ID", isSortable: false },
        // { column: "id", Label: "ID", isSortable: false },
        // { column: "user_id", Label: "User ID", isSortable: false },
        { column: "role_title", Label: "Role Title", isSortable: false },
        // { column: "role_id", Label: "Role ID", isSortable: false },
        { column: "verified", Label: "Verified", isSortable: false }
    ];

    const handleNextClick = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        getUserRoleVerification(setData, nextPage, perPage);
    };

    const handlePreviousClick = () => {
        const prevPage = currentPage - 1;
        setCurrentPage(prevPage);
        getUserRoleVerification(setData, prevPage, perPage);
    };

    useEffect(() => {
        if (firstFetch.current) {

            getUserRoleVerification(setData, 1, perPage, setTotalPages, "", "");
        }
        firstFetch.current = false;
    }, []);

    const handleSearch = (search: string) => {
        setCurrentPage(1);
        getUserRoleVerification(setData, 1, perPage, setTotalPages, search, "");
    };

    const handleEdit = (id: string | number | boolean) => {
        //console.log(id);
        navigate(`/dashboard/user-role-verification/edit/${id}`);
    };
    // const handleEdit = (id: string | number | boolean) => {
    //     console.log(id);
    //     navigate(`/dashboard/user-role-verification/edit/${id}`);
    // };

    const handleDelete = (id: string | number | boolean) => {
        //console.log(id);
        navigate(`/dashboard//user-role-verification/delete/${id}`);
    };
    // const handleDelete = (id: string | number | boolean) => {
    //     console.log(id);
    //     navigate(`/dashboard/user-role-verification/delete/${id}`);
    // };

    const handlePerPageNumber = (selectedValue: number) => {
        setCurrentPage(1);
        setPerPage(selectedValue);
        getUserRoleVerification(
            setData,
            1,
            selectedValue,
            setTotalPages,
            "",
            ""
        );
    };

    const handleIconClick = (column: string) => {
        if (sort === column) {
            setSort(`-${column}`);
            getUserRoleVerification(
                setData,
                1,
                perPage,
                setTotalPages,
                "",
                `-${column}`
            );
        } else {
            setSort(column);
            getUserRoleVerification(
                setData,
                1,
                perPage,
                setTotalPages,
                "",
                column
            );
        }

        //console.log(`Icon clicked for column: ${column}`);
    };

    async function handleVerify(id: string | number | boolean) {
        setLoading(true);
        await editUserRoleVerification(true, id);

        getUserRoleVerification(setData, 1, perPage, setTotalPages, "", "");
        setLoading(false);
    }

    return (
        <>
            {!loading && data ? (
                <>
                    <TableTop
                        onSearchText={handleSearch}
                        onPerPageNumber={handlePerPageNumber}
                    />
                    <Table
                        rows={data}
                        page={currentPage}
                        perPage={perPage}
                        columnOrder={columnOrder}
                        id={["id"]}
                        onVerifyClick={handleVerify}
                        modalVerifyHeading="Verify"
                        modalVerifyContent="Are you sure you want to verify this user ?"
                    >
                        <THead
                            columnOrder={columnOrder}
                            onIconClick={handleIconClick}
                            verify={true}
                        />
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            margin="10px 0"
                            handleNextClick={handleNextClick}
                            handlePreviousClick={handlePreviousClick} onSearchText={handleSearch}
                            onPerPageNumber={handlePerPageNumber}
                        />
                    </Table>
                </>
            ) : (
                <>
                    <TableTop
                        onSearchText={handleSearch}
                        onPerPageNumber={handlePerPageNumber}
                    />
                    <MuLoader />
                </>
            )}
        </>
    );
}

export default UsersRoleVerification;
