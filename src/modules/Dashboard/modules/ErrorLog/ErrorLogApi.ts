import axios from "axios";
import {dashboardRoutes} from "@/MuLearnServices/urls";

export const getCSV = async () => {
  try {
    const response = await axios.get(

     dashboardRoutes.getErrorLog,  

    );
    console.log(response);
  } catch (err) {
    console.error("Error getting CSV:", err);
  }
};
