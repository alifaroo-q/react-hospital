import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.baseURL = baseURL;
axios.defaults.timeout = 5000;
axios.defaults.headers.common["Content-Type"] = "application/json";
