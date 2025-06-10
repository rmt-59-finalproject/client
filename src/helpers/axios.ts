import axios from "axios";

export const http = axios.create({
  baseURL: "https://stockify-api.hafizh.web.id/api",
  withCredentials: true,
});
