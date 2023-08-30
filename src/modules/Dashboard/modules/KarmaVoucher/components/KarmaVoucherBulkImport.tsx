import React, { useState } from "react";

import { dashboardRoutes } from "@/MuLearnServices/urls";
import BulkImport from "@/MuLearnComponents/BulkImport/BulkImport";

const KarmaVoucherBulkImport = () => {
    const [uploadResponse, setUploadResponse] = useState(null);

    return (
        <div>
            <BulkImport
                path={dashboardRoutes.getKarmaVoucher + "import/"}
                onUpload={res => {
                    setUploadResponse(res);
                }}
                onError={err => {
                    console.log(err);
                    setUploadResponse(null);
                }}
            />
            {uploadResponse ? uploadResponse : ""}
        </div>
    );
};

export default KarmaVoucherBulkImport;
