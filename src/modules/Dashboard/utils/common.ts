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

export const convertToFormatedDate = (input: string): string => {
    // Parse the input string into a Date object
    const date = new Date(input);

    // Extract the day, month, and year
    const day = date.getUTCDate().toString().substring(0, 2).padStart(2, "0");
    const month = date.getUTCMonth();
    const year = date.getUTCFullYear();

    // Format the date
    return `${day} ${getMonthName(String(month + 1), true)} ${year}`;
};

export const convertDateToDayAndMonthAndYear = (data: string) => {
    // Extract the date part (before the space)
    const datePart = data.split(" ")[0];

    // Now proceed as before
    const [year, month, day] = datePart.split("-");
    const monthName = getMonthName(month, true);
    return `${day} ${monthName} ${year}`;
};

export const getMonthName = (month: String, flag: boolean = false) => {
    switch (month) {
        case "01":
            return flag ? "January" : "Jan";
        case "02":
            return flag ? "February" : "Feb";
        case "03":
            return flag ? "March" : "Mar";
        case "04":
            return flag ? "April" : "Apr";
        case "05":
            return flag ? "May" : "May";
        case "06":
            return flag ? "June" : "Jun";
        case "07":
            return flag ? "July" : "Jul";
        case "08":
            return flag ? "August" : "Aug";
        case "09":
            return flag ? "September" : "Sep";
        case "10":
            return flag ? "October" : "Oct";
        case "11":
            return flag ? "November" : "Nov";
        case "12":
            return flag ? "December" : "Dec";
        default:
            return flag ? "January" : "Jan";
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
};

export const getLocalDateTimeObject = (utcDateString: string) => {
    const utcDate = new Date(utcDateString);
    const localYear = utcDate.getFullYear();
    const localMonth = utcDate.getMonth();
    const localDay = utcDate.getDate();
    const localHour = utcDate.getHours();
    const localMinute = utcDate.getMinutes();
    return new Date(localYear, localMonth, localDay, localHour, localMinute);
};

export function getLocalDateTimeFormatted(utcDateString: string) {
    var utc = new Date(utcDateString);
    const localYear = utc.getFullYear();
    const localMonth = String(utc.getMonth() + 1).padStart(2, "0"); // Month is zero-indexed, so add 1
    const localDay = String(utc.getDate()).padStart(2, "0");
    const localHour = String(utc.getHours()).padStart(2, "0");
    const localMinute = String(utc.getMinutes()).padStart(2, "0");
    return `${localYear}-${localMonth}-${localDay}T${localHour}:${localMinute}`;
}
