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
    response => response,
    async error => {
      if (error.response && error.response.data) {
        // Optionally, log the error details
        console.error("API error:", error.response.data);
        // Return the error data so your UI can use it directly.
        return Promise.reject(error.response.data);
      }
      return Promise.reject(error);
    }
  );
