import axios from "axios";

export const axiosBaseURL = axios.create({
  baseURL: "https://voyanceapi.onrender.com/",
});

axiosBaseURL.defaults.withCredentials = true;
