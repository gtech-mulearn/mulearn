import { Option } from "@/MuLearnComponents/FormikComponents/FormikComponents";
import toast from "react-hot-toast";

export const DateConverter = (date: string) => {
    const parsedDate = new Date(date);
    const day = parsedDate.getDate().toString().padStart(2, "0");
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0");
    const year = parsedDate.getFullYear().toString();

    return `${day}/${month}/${year}`;
};

// Convert UTC Date to YYYY-MM-DD for date input
export const convertDateToYYYYMMDD = (dateString: any): any => {
    if (dateString !== undefined || null) {
        return String(dateString).split("T")[0];
    }
};

// Make First letter Upper Case
export const capitalizeFirstLetter = (str: any) => {
    if (typeof str !== "string" || str.length === 0) {
        return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
};

/* 
!TODO: Not used, found another way so delete if it wont be used
* Get id of the value for react select prefetching data
*/
export const getLocationIdByName = (
    locations: Option[],
    label: string | undefined
) => {
    if (typeof label !== "undefined") {
        const location = locations.find(
            loc => loc.label.toLowerCase() === label.toLowerCase()
        );
        // console.log(location?.value)
        return location ? location.value : null;
    }
    return label;
};

type ReactOption = {
    [K in "id" | "title"]: string;
};

/**
 * Generates React options from an array of ReactOption objects.
 *
 * @param {ReactOption[]} data - The array of ReactOption objects.
 * @return {Option[]} The array of Option objects.
 */
export const toReactOptions = (data: ReactOption[]): Option[] => {
    return data.map((item: any) => ({
        value: item.id,
        label: item.title
    }));
};

export const convertDateToDayAndMonth = (data: String) => {
    const day = data.split("-")[2];
    const month = getMonthName(data.split("-")[1]);
    return `${day} ${month}`;
};

export const getMonthName = (month: String) => {
    switch (month) {
        case "01":
            return "Jan";
        case "02":
            return "Feb";
        case "03":
            return "Mar";
        case "04":
            return "Apr";
        case "05":
            return "May";
        case "06":
            return "Jun";
        case "07":
            return "Jul";
        case "08":
            return "Aug";
        case "09":
            return "Sep";
        case "10":
            return "Oct";
        case "11":
            return "Nov";
        case "12":
            return "Dec";
        default:
            return "Jan";
    }
};


//! React Select Custom Style for Modal
export const customReactSelectStyles = {
    control: (provided: any) => ({
        ...provided,
        margin: 0,
        padding: 4,
        borderRadius: 8,
        backgroundColor: "#F3F3F4",
        border: "none",
        color: "black",
        width: "300px"
    }),
    menu: (provided: any) => ({
        ...provided,
        margin: 0,
        padding: 0
    }),
    // placeholder: (provided: any) => ({
    //     ...provided,
    //     color: "black"
    // }),
    option: (provided: any, state: { isSelected: any; isFocused: any }) => ({
        ...provided,
        color: state.isSelected ? "black" : state.isFocused ? "black" : "gray", // Color of the text
        backgroundColor: state.isSelected
            ? "rgba(184, 196, 234, 0.29)"
            : state.isFocused
            ? "lightgray"
            : null
    }),
    loadingIndicator: (base: any, state: any) => ({
        ...base,
        color: "#456ff6" // This sets the color of the loading indicator
    })
    // Add more components as needed
};


export const comingSoon = () => {
	toast("Feature coming soon!", {
        icon: "⌛"
    });
}