import Pagination from "@/MuLearnComponents/Pagination/Pagination";
import Table, { Data } from "@/MuLearnComponents/Table/Table";
import THead from "@/MuLearnComponents/Table/THead";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { ReactElement, useEffect, useState } from "react";
import { getVerifiableMeetups } from "../../services/LearningCircleAPIs";

const LcAdmin = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [perPage, setPerPage] = useState(20);
    const [sort, setSort] = useState("");

    useEffect(() => {
        setIsLoading(true);
        getVerifiableMeetups().then(res => {
            console.log(res);
            setData(res);
            setIsLoading(false);
        });
    }, []);

    const columnOrder: {
        column: string;
        Label: string;
        isSortable: boolean;
        wrap?: (
            data: string | ReactElement,
            id: string,
            row: Data
        ) => ReactJSXElement;
    }[] = [
        {
            column: "learning_circle",
            Label: "Learning Circle",
            isSortable: false
        },
        { column: "title", Label: "Meetup Title", isSortable: false },
        { column: "join_count", Label: "Join Count", isSortable: false },
        {
            column: "interested_count",
            Label: "Interest Count",
            isSortable: false
        },
        {
            column: "report_submitted_attendees",
            Label: "Report Submitted Attendees",
            isSortable: false
        },
        {
            column: "held_on",
            Label: "Started At",
            isSortable: false
        }
    ];
    return (
        <>
            <Table
                isloading={isLoading}
                rows={data}
                page={currentPage}
                perPage={perPage}
                columnOrder={columnOrder}
                id={["id"]}
                onVerifyClick={() => {}}
            >
                <THead columnOrder={columnOrder} onIconClick={() => {}} />
                <div>
                    {!isLoading && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            margin="10px 0"
                            handleNextClick={() => {}}
                            handlePreviousClick={() => {}}
                            onSearchText={() => {}}
                            onPerPageNumber={() => {}}
                            perPage={perPage}
                            setPerPage={setPerPage}
                        />
                    )}
                </div>
                {/*use <Blank/> when u don't need <THead /> or <Pagination inside <Table/> cause <Table /> needs atleast 2 children*/}
            </Table>
        </>
    );
};

export default LcAdmin;
