import React, { useState } from "react";

import { dashboardRoutes } from "@/MuLearnServices/urls";
import BulkImport from "@/MuLearnComponents/BulkImport/BulkImport";
import { SingleButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { BiArrowBack, BiDownload } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const KarmaVoucherBulkImport = () => {
    const [uploadResponse, setUploadResponse] = useState(null);
    const navigate = useNavigate();
    const toast = useToast();
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
                        navigate("/dashboard/karma-voucher");
                    }}
                />
                <SingleButton
                    text={"Download Template"}
                    icon={<BiDownload />}
                    link="
                    https://docs.google.com/spreadsheets/d/1Mn4IcK1kV5JnlUXu74eWEVxG2fD3QvAc/export?format=xlsx&id=1Mn4IcK1kV5JnlUXu74eWEVxG2fD3QvAc"
                />
            </div>
            <div>
                <BulkImport
                    path={dashboardRoutes.getKarmaVoucher + "import/"}
                    onUpload={res => {
                        setUploadResponse(res);
                        toast({
                            title: "Success",
                            description: "CSV upload successful",
                            status: "success",
                            duration: 5000,
                            isClosable: true
                        });
                        navigate("/dashboard/karma-voucher");
                    }}
                    onError={err => {
                        console.log(err);
                        setUploadResponse(null);
                        toast({
                            title: "Error",
                            description: "CSV upload failed",
                            status: "error",
                            duration: 5000,
                            isClosable: true
                        });
                    }}
                />
            </div>
        </>
    );
};

export default KarmaVoucherBulkImport;
