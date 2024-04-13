import { AxiosError } from "axios";
import { privateGateway } from "../../../services/apiGateways";
import toast from "react-hot-toast";

/*
!: Not Working Properly
*/
const convertToCSV = (data: any) => {
    // Convert your data to CSV format here
    // You can use libraries like 'csv-writer' or 'papaparse' for complex data structures
    // For simplicity, let's assume you have a simple array of objects

    const headers = Object.keys(data[0]);
    const csvRows = [];
    csvRows.push(headers.join(","));

    for (const row of data) {
        const values = headers.map(header => row[header]);
        csvRows.push(values.join(","));
    }

    return csvRows.join("");
};

export const getCSV = async (
    CSV: any,
    setIsLoading: (isLoading: boolean) => void,
    setHasError: (hasError: boolean) => void
) => {
    setIsLoading(true);
    try {
        const containsOpenSheet = (CSV: string): boolean => {
            return CSV.includes("spreadsheets");
        };
        let response: any;

        if (containsOpenSheet(CSV)) {
            window.open(CSV, "_blank");
            setIsLoading(false);
            return;
        } else response = await privateGateway.get(CSV, {});

        const message: any = response?.data;

        if (message) {
            const csvContent = convertToCSV(message);
            // Create a temporary HTML element to trigger the download
            const element = document.createElement("a");
            const file = new Blob([csvContent], {
                type: "data:text/csv;charset=utf-8"
            });
            element.href = URL.createObjectURL(file);
            element.download = "Table_data.csv";
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        }
        setIsLoading(false);
    } catch (err: unknown) {
        setIsLoading(false);
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
        if (error?.response?.status === 500) {
            toast.error("CSV doesn't exists!");
        }
    }
};
