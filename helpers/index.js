import axios from "axios";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const AxiosInstance = axios.create({
  baseURL: API_URL,
});
