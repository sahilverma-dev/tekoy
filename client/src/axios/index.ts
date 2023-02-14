import axios from "axios";

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
  // baseURL: "http://localhost:5000/api/v1",
});
