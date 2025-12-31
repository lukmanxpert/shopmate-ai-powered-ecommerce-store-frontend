import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://shopmate-server.onrender.com/api/v1",
  withCredentials: true,
});
