import axios, { AxiosRequestConfig } from "axios";

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
    //check for a specific status code that indicates that the acess token has expired
    if (response.status === 401) {
      //if the access token has expired, get a new one with refersh token and retry the request
      const originalRequest = response.config;

      //if access token is expired, get a new one with refresh token by senting the refesh token to this url
      const refresh_token = localStorage.getItem("refreshToken");
      // api/v1/token/refresh/
      
    }

    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
