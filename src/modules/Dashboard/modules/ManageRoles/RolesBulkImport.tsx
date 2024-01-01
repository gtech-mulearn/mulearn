import BulkImport from "@/MuLearnComponents/BulkImport/BulkImport";
import { convertToXLSX } from "./apis";
import { SingleButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import { useState, useMemo } from "react";
import { BiDownload, BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { getRolesTemplate } from "./apis";
export const CountCard = ({
    title,
    count
}: {
    title: string;
    count: number;
}) => {
    return (
        <div>
            <h3>{title}</h3>
            <h1>{count}</h1>
        </div>
    );
};

const RolesBulkImport = () => {
    const [uploadResponse, setUploadResponse] = useState<any>(null);
    const navigate = useNavigate();
    const handleClick = () => {
        //console.log("worked")
    };
    const successDownload = () => {
        convertToXLSX(uploadResponse.response.Success, "Success.xlsx");
    };
    const failureDownload = () => {
        convertToXLSX(uploadResponse.response.Failed, "Failed.xlsx");
    };
    const memoizedSuccessDownload = useMemo(
        () => successDownload,
        [uploadResponse]
    );
    const memoizedFailureDownload = useMemo(
        () => failureDownload,
        [uploadResponse]
    );
    console.log(uploadResponse);
    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    alignItems: "center"
                }}
            >
                <SingleButton
                    text={"Go Back"}
                    icon={<BiArrowBack />}
                    style={{
                        display: "flex",
                        justifyContent: "start",
                        width: "100%",
                        alignItems: "center"
                    }}
                    onClick={() => {
                        navigate("/dashboard/tasks");
                    }}
                />
                <SingleButton
                    text={"Download Template"}
                    onClick={() => getRolesTemplate()}
                    icon={<BiDownload />}
                />
            </div>

            <BulkImport
                path={dashboardRoutes.getRolesData + "bulk-assign-excel/"}
                fileName="roles_list"
                onUpload={res => {
                    setUploadResponse(res);
                }}
                onError={err => {
                    console.log(err);
                    setUploadResponse(null);
                }}
            />
            {uploadResponse && (
                <>
                    <div
                        style={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "10rem"
                        }}
                    >
                        <CountCard
                            title="Success"
                            count={uploadResponse.response.Success.length}
                        />
                        <CountCard
                            title="Failed"
                            count={uploadResponse.response.Failed.length}
                        />
                    </div>
                    <div
                        style={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "center",
                            gap: "1rem"
                        }}
                    >
                        <SingleButton
                            text="Download Success data"
                            onClick={memoizedSuccessDownload}
                            style={{ width: "initial" }}
                        />
                        <SingleButton
                            text="Download Failed data"
                            onClick={memoizedFailureDownload}
                            style={{ width: "initial" }}
                        />
                    </div>
                </>
            )}
        </>
    );
};

export default RolesBulkImport;
