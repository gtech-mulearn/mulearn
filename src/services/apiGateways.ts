import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { authRoutes } from "./urls";
import toast, { toast as Toast, Toaster } from "react-hot-toast";
import { fetchLocalStorage } from "./common_functions";

export const publicGateway = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL as string,
    headers: {
        "Content-Type": "application/json"
    }
});

// <--- Comment below code before PR, this is for backend testing
// export const publicGatewayAuth = axios.create({
//     baseURL: import.meta.env.VITE_BACKEND_URL_AUTH as string,
//     headers: {
//         "Content-Type": "application/json"
//     }
// });
// --->

export const privateGateway = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL as string,
    headers: {
        "Content-Type": "application/json"
    }
});

// Add a request interceptor
privateGateway.interceptors.request.use(
    function (config) {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }

        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Request Interceptor: Ensure that the URL ends with a trailing slash
// If the URL doesn't terminate with a slash, this interceptor appends one.
privateGateway.interceptors.request.use(
    function (config) {
        if (config.url) {
            if (!config.url.endsWith("/")) {
                config.url += "/";
            }
        }
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
privateGateway.interceptors.response.use(
    function (response) {
        return response;
    },
    async function (error) {
        // TODO: if error occurs and status isn't 1000 nothing will happen
        //console.log(error.response,error.response?.data?.statusCode === 1000)
        if (error.response?.data?.statusCode === 1000) {
            // publicGatewayAuth
            //console.log("inside",error.response,error.response?.data?.statusCode)
            //console.log("refresh",fetchLocalStorage<AllTokens["refreshToken"]>("refreshToken"))
            try {
                const response = await publicGateway.post(
                    authRoutes.getAccessToken,
                    {
                        refreshToken: localStorage.getItem("refreshToken") //fetchLocalStorage<AllTokens["refreshToken"]>("refreshToken")
                    }
                );
                localStorage.setItem(
                    "accessToken",
                    response.data.response.accessToken
                );
                //console.log('new access token',response.data.response.accessToken)
                // Retry the original request
                const { config } = error;
                config.headers["Authorization"] =
                    `Bearer ${localStorage.getItem("accessToken")}`;
                return await new Promise((resolve, reject) => {
                    privateGateway
                        .request(config)
                        .then(response_1 => {
                            resolve(response_1);
                        })
                        .catch(error_1 => {
                            //console.log("error_1",error_1)
                            reject(error_1);
                        });
                });
            } catch (error_2) {
                toast.error("Your session has expired. Please login again.");

                // Wait for 3 seconds
                setTimeout(() => {
                    //localStorage.clear();
                    //window.location.href = "/login";
                }, 3000);
                return await Promise.reject(error_2);
            }
        }
        //! This was causeing unwanted redirects during api testing please fix.
        //! Spend 2 hours to figure out this was causing the issue.
        // if (error.response?.status === 500) {
        //     // publicGatewayAuth
        //     //console.log("inside", error.response, error.response?.data?.statusCode)
        //     //Toast.error("A server error has occurred. Please try again later.");
        //     window.location.href = "/500";
        // }

        // Any status codes that fall outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    }
);
