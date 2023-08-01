import BulkImport from "@/MuLearnComponents/BulkImport/BulkImport";
import { convertToXLSX } from "./TaskApis";
import { SingleButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import { useState, useMemo, MouseEventHandler } from "react";
import { BiDownload, BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

type Props = {};

const CountCard = ({ title, count }: { title: string; count: number }) => {
    return (
        <div>
            <h3>{title}</h3>
            <h1>{count}</h1>
        </div>
    );
};

const TaskBulkImport = (props: Props) => {
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
                    onClick={handleClick}
                    icon={<BiDownload />}
                    link="https://drive.google.com/uc?export=download&id=1b2DUyj6zxDzY8q5pDTbL3NlZEL1J1dcq"
                />
            </div>

            <BulkImport
                path={dashboardRoutes.getTasksData + "import/"}
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

export default TaskBulkImport;
