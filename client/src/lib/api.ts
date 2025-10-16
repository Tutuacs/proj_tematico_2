import axios from "axios";
import { Backend_URL } from "@/lib/Constants"; // você já tem isso

export const api = axios.create({
  baseURL: Backend_URL,
});

// Ex.: api.get("/trainer/dashboard");  // depois que o endpoint existir