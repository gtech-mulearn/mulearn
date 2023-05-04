import axios, { AxiosRequestConfig } from "axios";

const publicGateway = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL as string,
  headers: {
    "Content-Type": "application/json",
  },
});

export default publicGateway;
