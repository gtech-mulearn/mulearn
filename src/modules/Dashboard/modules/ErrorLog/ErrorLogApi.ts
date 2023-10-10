import axios from "axios";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { Dispatch, SetStateAction } from "react";

export const getLog = async (
  logName: string,
  setErrorData: Dispatch<SetStateAction<string>>
) => {
  try {
    const response = await privateGateway.get(
      dashboardRoutes.getErrorLog + logName
    );
    setErrorData(response.data);
    
    // Download the response data
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${logName}`);
    document.body.appendChild(link);
    link.click();
    
  } catch (err) {
    console.error("Error getting CSV:", err);
  }
};
