import axios from "axios";

/*
TODO: Error Handling and Toasts
TODO: Make it Functional
*/

export const bulkImport = (data: any, path: string) => {
    axios
        .post(
            `${import.meta.env.VITE_BACKEND_URL}${
                path
            }`,
			data,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`,
                    "Content-Type": "multipart/form-data"
                }
            }
        )
        .then(response => {
            //console.log(response);
        })
        .catch(error => {
            console.log(error);
            // toast.error(error.response.data.message.general[0]);
        });
};
