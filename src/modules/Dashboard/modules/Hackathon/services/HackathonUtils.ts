import { Data } from "@/MuLearnComponents/Table/Table";
import { ColumnDefinition, OriginalDataItem } from "./HackathonInterfaces";

const allColumnOrder: ColumnDefinition[] = [
    { column: "name", Label: "Name", isSortable: false },
    { column: "email", Label: "Email", isSortable: false },
    { column: "gender", Label: "Gender", isSortable: false },
    { column: "mobile", Label: "Mobile", isSortable: false },
    { column: "bio", Label: "Bio", isSortable: false },
    { column: "college", Label: "College", isSortable: false },
    { column: "experience", Label: "Experience", isSortable: false },
    { column: "github", Label: "GitHub", isSortable: false },
    { column: "linkedin", Label: "LinkedIn", isSortable: false }
];

export function transformData(originalData: OriginalDataItem[]): {
    transformedData: Data[];
    columnOrder: ColumnDefinition[];
} {
    const transformedData: Data[] = originalData.map(item => {
        const transformedItem: Data = {};

        for (const key in item.data) {
            if (item.data.hasOwnProperty(key)) {
                const value = item.data[key as keyof typeof item.data];
                if (value !== "") {
                    transformedItem[key] = value;
                }
            }
        }

        return transformedItem;
    });

    const usedColumns: string[] = [];
    transformedData.forEach(item => {
        Object.keys(item).forEach(key => {
            if (!usedColumns.includes(key)) {
                usedColumns.push(key);
            }
        });
    });

    const columnOrder: ColumnDefinition[] = allColumnOrder.filter(column =>
        usedColumns.includes(column.column as string)
    );

    return { transformedData, columnOrder };
}

export function formatErrorMessage(error: string): string {
    const fields = error
        .replace("The following fields are empty: ", "")
        .split(", ");
    // Convert the field names into a more readable format
    const formattedFields = fields.map(field => {
        // Split by underscore and capitalize each word
        return field
            .split("_")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    });
    // Construct the new message
    return "The following fields are empty: " + formattedFields.join(", ") + ".";
}

