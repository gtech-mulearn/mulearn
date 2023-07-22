import BulkImport from "@/MuLearnComponents/BulkImport/BulkImport";
import { convertToXLSX } from "./TaskApis";
import { SingleButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import { useState, useMemo, MouseEventHandler } from "react";
import { BiDownload } from "react-icons/bi";

type Props = {};

const TaskBulkImport = (props: Props) => {
    const [uploadResponse, setUploadResponse] = useState<any>(null);
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
            <SingleButton
                text={"Download Template"}
                onClick={handleClick}
                icon={<BiDownload />}
                link="https://drive.google.com/uc?export=download&id=1b2DUyj6zxDzY8q5pDTbL3NlZEL1J1dcq"
            />
            {!uploadResponse ? (
                <BulkImport
                    path={dashboardRoutes.getTasksData + "import/"}
                    onUpload={res => {
                        setUploadResponse(res);
                        console.log(res.response.Failed);
                    }}
                />
            ) : (
                <div>
                    <SingleButton
                        text="Download Success data"
                        onClick={memoizedSuccessDownload}
                    />
                    <SingleButton
                        text="Download Failure data"
                        onClick={memoizedFailureDownload}
                    />
                    <SingleButton
                        text="Upload Again"
                        onClick={() => setUploadResponse(null)}
                    />
                </div>
            )}
        </>
    );
};

export default TaskBulkImport;
