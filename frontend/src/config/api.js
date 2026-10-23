import axios from "axios";

const configuredApiUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, "");
const apiUrl = configuredApiUrl || (import.meta.env.PROD ? "https://shopx-5t9h.onrender.com" : "");

axios.defaults.baseURL = apiUrl;
