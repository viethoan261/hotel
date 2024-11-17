import axios from "axios";
import { BASE_URL } from "./consts";

const token = localStorage.getItem("token");

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    ...(token && { Authorization: `Bearer ${token}` }),
  },
});
