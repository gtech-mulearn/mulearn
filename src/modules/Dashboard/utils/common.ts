export const DateConverter = (date:string) => {
    const parsedDate = new Date(date);
    const day = parsedDate.getDate().toString().padStart(2, "0");
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0");
    const year = parsedDate.getFullYear().toString();

    return `${day}-${month}-${year}`;
};


// Convert UTC Date to YYYY-MM-DD for date input
export const convertDateToYYYYMMDD = (dateString: string) => {
    return dateString.split("T")[0];
};

// Make First letter Upper Case
export const capitalizeFirstLetter = (str: any) => {
    if (typeof str !== "string" || str.length === 0) {
        return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}