import { useState } from "react";

import styles from "./PurchaseInventory.module.css";
import coin from "../assets/muCoin.svg";

import Pagination from "@/MuLearnComponents/Pagination/Pagination";
import THead from "@/MuLearnComponents/Table/THead";
import Table from "@/MuLearnComponents/Table/Table";
import TableTop from "@/MuLearnComponents/TableTop/TableTop";
import { Blank } from "@/MuLearnComponents/Table/Blank";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { BsCardImage } from "react-icons/bs";

type Props = {};

const PurchaseInventory = (props: Props) => {
    const [data, setData] = useState([
        {
            reward: "oruaward",
            desc: "oru award ",
            images: "image.png",
            price: "20",
            status: "Claimed"
        }
    ]);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [isLoading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);

    type ColOrderType = {
        isSortable: boolean;
        column: string;
        Label: string;
        wrap?: (data: string) => ReactJSXElement;
    };

    const columnOrder: ColOrderType[] = [
        { column: "reward", Label: "Reward", isSortable: true },
        { column: "desc", Label: "Description", isSortable: true },
        {
            column: "images",
            Label: "Images",
            isSortable: true,
            wrap: data => (
                <div className={styles.imgBox}>
                    <BsCardImage />
                    {data}
                </div>
            )
        },
        {
            column: "price",
            Label: "Price",
            isSortable: true,
            wrap: data => (
                <div style={{ display: "flex" }}>
                    {data}
                    <img src={coin} alt="" />
                </div>
            )
        },
        {
            column: "status",
            Label: "Status",
            isSortable: true,
            wrap: data => (
                <div
                    style={{
                        color: {
                            Claimed: "#26D157",
                            "Not Claimed": "##FF4646"
                        }[data]
                    }}
                >
                    {data}
                </div>
            )
        }
    ];

    const handleSearch = () => {};
    const handlePerPageNumber = () => {};
    const handleIconClick = () => {};
    const handleNextClick = () => {};
    const handlePreviousClick = () => {};

    return (
        <>
            <TableTop
                onSearchText={handleSearch}
                onPerPageNumber={handlePerPageNumber}

                // CSV={"http://localhost:8000/api/v1/dashboard/ig/csv"}
            />
            <Table
                rows={data}
                isloading={isLoading}
                page={currentPage}
                perPage={perPage}
                columnOrder={columnOrder}
                id={["id"]}
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
};

export default PurchaseInventory;
