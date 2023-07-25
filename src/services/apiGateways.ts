import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { authRoutes } from "./urls";
import { createStandaloneToast, UseToastOptions } from "@chakra-ui/react";

const { toast } = createStandaloneToast();

export const publicGateway = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL as string,
    headers: {
        "Content-Type": "application/json"
    }
});

// <--- Comment below code before PR, this is for backend testing
export const publicGatewayAuth = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL_AUTH as string,
    headers: {
        "Content-Type": "application/json"
    }
});
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

// Add a response interceptor
privateGateway.interceptors.response.use(
    function (response) {
        return response;
    },
    async function (error) {
        // TODO: if error occurs and status isn't 1000 nothing will happen

        if (error.response?.data?.statusCode === 1000) {
            // publicGatewayAuth
            try {
                const response = await publicGatewayAuth.post(
                    authRoutes.getAccessToken,
                    {
                        refreshToken: localStorage.getItem("refreshToken")
                    }
                );
                localStorage.setItem(
                    "accessToken",
                    response.data.response.accessToken
                );

                // Retry the original request
                const config = error.config;
                config.headers[
                    "Authorization"
                ] = `Bearer ${localStorage.getItem("accessToken")}`;
                return await new Promise((resolve, reject) => {
                    privateGateway
                        .request(config)
                        .then(response_1 => {
                            resolve(response_1);
                        })
                        .catch(error_1 => {
                            reject(error_1);
                        });
                });
            } catch (error_2) {
                console.log(error_2);
                toast.closeAll();
                toast({
                    title: "Your session has expired.",
                    description: "Please login again.",
                    status: "error",
                    duration: 5000,
                    isClosable: true
                });

                // Wait for 3 seconds
                setTimeout(() => {
                    localStorage.clear();
                    window.location.href = "/login";
                }, 3000);
                return await Promise.reject(error_2);
            }
        }

        // Any status codes that fall outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    }
);
