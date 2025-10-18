import { hostname } from "os";

const isDocker = hostname().includes("full_stack");
export const Backend_URL = "http://localhost:3333";
