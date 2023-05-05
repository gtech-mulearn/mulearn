import axios, { AxiosRequestConfig } from "axios";
import { authRoutes } from "./urls";

export const publicGateway = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL as string,
  headers: {
    "Content-Type": "application/json",
  },
});

export const privateGateway = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL as string,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});

privateGateway.interceptors.response.use(
  function (response) {
    console.log(response);
    return response;
  },
  function (error) {
    console.log(error.response.data);

    if (error.response.data.statusCode === 1000) {
      publicGateway
        .post(authRoutes.getAccessToken, {
          refresh_token: localStorage.getItem("refreshToken"),
        })
        .then((response) => {
          localStorage.setItem(
            "accessToken",
            response.data.response.accessToken
          );

          //retry the original request
          const config = error.config;
          config.headers["Authorization"] = `Bearer ${localStorage.getItem(
            "accessToken"
          )}`;
          return new Promise((resolve, reject) => {
            privateGateway
              .request(config)
              .then((response) => {
                resolve(response);
              })
              .catch((error) => {
                reject(error);
              });
          });
        })
        .catch((error) => {
          
        });
    }

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
