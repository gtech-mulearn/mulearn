import axios from "axios";
/*
TODO: Error Handling and Toasts
TODO: Make it Functional
*/

export const bulkImport = async (data: any, path: string) => {
    const val = await axios
        .post(`${import.meta.env.VITE_BACKEND_URL}${path}`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                "Content-Type": "multipart/form-data"
            }
        })
        .then(response => {
            console.log(response.data);
            return response.data;
        })
        .catch(error => {
            console.error(error);
            return error;
            // toast.error(error.response.data.message.general[0]);
        });
    return val;
};
