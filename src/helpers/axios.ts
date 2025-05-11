import axios from "axios";

export const http = axios.create({
  baseURL: "https://stockify-rest.zen-geohub.tech/api",
  withCredentials: true,
});
