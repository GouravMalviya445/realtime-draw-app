import { config } from "@/config";
import axios from "axios";

const apiClient = axios.create({
  baseURL: `${config.backendUrl}/api/v1`,
  headers: {
    "Content-Type": "application/json"
  },
  // withCredentials: true
});

export { apiClient };