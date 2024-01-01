import MuTable from "@/MuLearnComponents/MuTable/MuTable";
import { getTestData } from "./TestApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {};

const Test = (props: Props) => {
    const columnOrder: TableHeader[] = [
        { column: "name", label: "Name", isSortable: true },
        { column: "members", label: "Members", isSortable: false },
        { column: "updated_at", label: "Updated On", isSortable: true },
        { column: "updated_by", label: "Updated By", isSortable: true },
        { column: "created_by", label: "Created By", isSortable: true },
        { column: "created_at", label: "Created On", isSortable: true }
    ];

    const [data, setData] = useState<TestData>();
    const [tableData, setTableData] = useState<TestDataBackendResponse>();

    const handleFetchDetails = async () => {
        try {
            const response = await getTestData(data);
            setTableData(response.response);
            console.log(tableData);
        } catch (error) {
            toast.error("Something went wrong, failed to load data");
        }
    };

    useEffect(() => {
        handleFetchDetails();
    }, []);
    return (
        <div>
            <MuTable tableHeader={columnOrder} tableData={tableData} />
        </div>
    );
};

export default Test;
