import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { authRoutes } from "./urls";
import toast, { Toast as ToastType } from "react-hot-toast"; // Adjusted import for clarity
import { fetchLocalStorage } from "./common_functions";

export const publicGateway = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL as string,
    headers: {
        "Content-Type": "application/json",
    },
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
        "Content-Type": "application/json",
    },
});

// Request Interceptor: Add Authorization header with access token
privateGateway.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Request Interceptor: Ensure URL ends with a trailing slash
privateGateway.interceptors.request.use(
    (config) => {
        if (config.url && !config.url.endsWith("/")) {
            config.url += "/";
        }
        return config;
    },
    (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue: Array<{
    resolve: (token: string) => void;
    reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else if (token) {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

privateGateway.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
        const originalRequest = error.config;

     
        const isTokenExpired =
            (error.response?.data?.statusCode === 1000 &&
                error.response?.data?.message?.general?.includes("Token Expired or Invalid")) 
        if (isTokenExpired && !originalRequest._retry) {
            if (isRefreshing) {
                // Queue the request while refreshing
                return new Promise((resolve, reject) => {
                    failedQueue.push({
                        resolve: (token) => {
                            originalRequest.headers["Authorization"] = `Bearer ${token}`;
                            resolve(privateGateway(originalRequest));
                        },
                        reject,
                    });
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshToken = localStorage.getItem("refreshToken");
                if (!refreshToken) {
                    throw new Error("No refresh token available");
                }

                const refreshResponse = await publicGateway.post(authRoutes.getAccessToken, {
                    refreshToken,
                });

                const newAccessToken = refreshResponse.data.accessToken;
                if (!newAccessToken) {
                    throw new Error("No access token in refresh response");
                }

                localStorage.setItem("accessToken", newAccessToken);

                privateGateway.defaults.headers["Authorization"] = `Bearer ${newAccessToken}`;
                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

                // Process any queued requests
                processQueue(null, newAccessToken);
                isRefreshing = false;

                return privateGateway(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError);
                isRefreshing = false;

                localStorage.clear();
                toast.error("Session expired. Please log in again.");
                window.location.href = "/login"; 
                return Promise.reject(refreshError);
            }
        }

        if (error.response?.data) {
            console.error("API error:", error.response.data);
            return Promise.reject(error.response.data);
        }
        return Promise.reject(error);
    }
);

export const qSeversePrivateGateway = axios.create({
    baseURL: import.meta.env.VITE_QSEVERSE_URL as string,
    headers: {
        "Content-Type": "application/json",
    },
});


qSeversePrivateGateway.interceptors.request.use(
    (config) => {
        config.headers["Authorization"] = `ApiKey ${import.meta.env.VITE_QSEVERSE_API_KEY}`;
        return config;
    },
    (error) => Promise.reject(error)
);

qSeversePrivateGateway.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
        if (error.response?.data) {
            console.error("API error:", error.response.data);
            return Promise.reject(error.response.data);
        }
        return Promise.reject(error);
    }
);
