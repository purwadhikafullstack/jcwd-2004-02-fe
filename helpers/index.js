import axios from "axios";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const AxiosInstance = axios.create({
  baseURL: API_URL,
});

export const DateConverter = (date) => {
  let convertedDate = new Date(date);
  let month = convertedDate.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  let tanggal = convertedDate.getDate();
  let year = convertedDate.getFullYear();
  return `${year}-${month}-${tanggal}`;
};
