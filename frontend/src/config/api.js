import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "";

axios.defaults.baseURL = apiUrl;
